/** Thrown when no contact backend is configured in env. */
export class ContactConfigError extends Error {
  constructor() {
    super('No contact integration is configured.')
    this.name = 'ContactConfigError'
  }
}

/**
 * Sends a quote request using the first available integration:
 * 1. Formspree — set VITE_FORMSPREE_URL to your form endpoint (https://formspree.io/f/…)
 * 2. Web3Forms — set VITE_WEB3FORMS_ACCESS_KEY (https://web3forms.com)
 * 3. FormSubmit — falls back to direct POST to roganshype@gmail.com if no backend is configured.
 * 4. Mailto — opens the visitor's mail app if direct submission cannot be completed.
 */
export async function submitContact({ name, email, discord, message }) {
  const formspreeUrl = import.meta.env.VITE_FORMSPREE_URL?.trim()
  const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim()
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL?.trim() || 'roganshype@gmail.com'

  if (formspreeUrl) {
    const res = await fetch(formspreeUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        discord,
        message,
        _subject: `Website quote — ${name}`,
        _replyto: email,
      }),
    })

    let data = {}
    try {
      data = await res.json()
    } catch {
      /* ignore */
    }

    if (!res.ok) {
      const msg =
        typeof data.error === 'string'
          ? data.error
          : data.errors?.map((e) => e.message).filter(Boolean).join(' ') ||
            data.message ||
            `Could not send (${res.status}).`
      throw new Error(msg)
    }

    return { method: 'formspree' }
  }

  if (web3Key) {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: web3Key,
        subject: `Website quote — ${name}`,
        from_name: name,
        email,
        discord,
        message,
      }),
    })

    const data = await res.json().catch(() => ({}))
    if (!res.ok || data.success === false) {
      throw new Error(
        typeof data.message === 'string' ? data.message : 'Could not send your message.',
      )
    }

    return { method: 'web3forms' }
  }

  if (contactEmail) {
    try {
      const res = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(contactEmail)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name,
            discord,
            message,
            _subject: `Roblox scripting inquiry — ${name}`,
            _replyto: email,
            _captcha: 'false',
          }),
        },
      )

      const data = await res.json().catch(() => ({}))
      if (res.ok && data.success !== false) {
        return { method: 'formsubmit' }
      }
    } catch (_err) {
      // fall back to mailto below
    }

    const subject = encodeURIComponent(`Roblox scripting inquiry — ${name}`)
    const body = encodeURIComponent(
      `Roblox username: ${name}\nDiscord username: ${discord}\n\nProject details:\n${message}\n`,
    )
    window.location.href = `mailto:${encodeURIComponent(contactEmail)}?subject=${subject}&body=${body}`
    return { method: 'mailto' }
  }

  throw new ContactConfigError()
}
