import { useRef, useState } from 'react'
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Code2,
  LayoutTemplate,
  Loader2,
  MessageSquare,
  Rocket,
  Sparkles,
} from 'lucide-react'
import { Navbar } from './components/Navbar.jsx'
import { ParticleField } from './components/ParticleField.jsx'
import { Reveal } from './components/Reveal.jsx'
import { ContactConfigError, submitContact } from './lib/submitContact.js'

const services = [
  {
    title: 'Lua gameplay systems',
    body: 'Server/client scripts for movement, combat, objectives, progression, and server-authoritative state.',
    icon: Rocket,
  },
  {
    title: 'Custom Roblox scripts',
    body: 'Responsive in-game logic, remote handling, and UI integration built cleanly for Roblox Studio.',
    icon: LayoutTemplate,
  },
  {
    title: 'Monetization & live ops scripts',
    body: 'Gamepass, developer product, and event scripting that supports growth without sacrificing performance.',
    icon: Code2,
  },
]

const steps = [
  { title: 'Concept', body: 'Define your place, core loop, and player experience before any Roblox builds start.' },
  { title: 'Prototype', body: 'Validate mechanics, UI flow, and monetization with a playable Roblox test world.' },
  { title: 'Polish', body: 'Refine visuals, audio, and performance so your game feels premium on Roblox.', },
  { title: 'Launch', body: 'Release support, analytics setup, and update guidance for sustained player growth.' },
]

export default function App() {
  const quoteFormRef = useRef(null)
  const [quoteStatus, setQuoteStatus] = useState('idle')
  const [quoteError, setQuoteError] = useState('')
  const [quoteErrorIsConfig, setQuoteErrorIsConfig] = useState(false)
  const [quoteMethod, setQuoteMethod] = useState(null)

  const quoteSending = quoteStatus === 'loading'
  const quoteSuccess = quoteStatus === 'success'

  async function handleQuoteSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const username = String(fd.get('username') ?? '').trim()
    const email = ''
    const message = String(fd.get('message') ?? '').trim()

    setQuoteError('')
    setQuoteErrorIsConfig(false)
    setQuoteStatus('loading')

    try {
      const result = await submitContact({ name: username, email, message })
      setQuoteMethod(result.method)
      setQuoteStatus('success')
      form.reset()
    } catch (err) {
      setQuoteStatus('idle')
      setQuoteErrorIsConfig(err instanceof ContactConfigError)
      setQuoteError(
        err instanceof Error ? err.message : 'Something went wrong. Try again.',
      )
    }
  }

  function resetQuoteFlow() {
    setQuoteStatus('idle')
    setQuoteError('')
    setQuoteErrorIsConfig(false)
    setQuoteMethod(null)
    quoteFormRef.current?.reset()
  }

  return (
    <div id="top" className="min-h-svh bg-dark-bg text-slate-200">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-90"
            style={{
              background:
                'radial-gradient(ellipse 80% 55% at 50% -10%, rgba(139,92,246,0.35), transparent 55%), radial-gradient(ellipse 60% 50% at 100% 0%, rgba(0,246,255,0.12), transparent 50%), radial-gradient(ellipse 50% 40% at 0% 20%, rgba(139,92,246,0.15), transparent 55%)',
            }}
          />
          <div className="absolute inset-0 opacity-40">
            <ParticleField className="h-full w-full" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-neon-blue/90">
              Roblox scripting &amp; system design
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
              Build Roblox games with{' '}
              <span className="text-gradient">clean, playable scripts.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-400 sm:text-xl">
              I write Roblox Lua scripts for gameplay, UI, monetization, and server-authoritative systems
              so your place works smoothly for players.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_40px_-8px_rgba(0,246,255,0.65)] transition hover:brightness-110"
              >
                View scripting work
                <ArrowRight className="size-4" aria-hidden />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:border-white/25 hover:bg-white/10"
              >
                Discuss scripting
              </a>
            </div>
          </div>

          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-bg to-transparent"
            aria-hidden
          />
        </section>

        {/* Services */}
        <section id="services" className="relative z-10 scroll-mt-24 px-4 py-24 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Roblox scripting services for creators and teams.
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                From gameplay systems and custom scripts to monetization and server logic,
                these services are built for Roblox scripting success.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {services.map((s, i) => {
                const Icon = s.icon
                return (
                  <Reveal
                    key={s.title}
                    as="article"
                    className="glass rounded-2xl p-6 sm:p-8"
                    delay={i * 90}
                  >
                    <div className="mb-5 inline-flex rounded-xl border border-white/10 bg-gradient-to-br from-neon-blue/15 to-neon-purple/15 p-3 text-neon-blue">
                      <Icon className="size-6" aria-hidden />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.body}</p>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section
          id="portfolio"
          className="relative z-10 scroll-mt-24 px-4 py-24 sm:px-6"
        >
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Featured Roblox work.
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                Snapshots of polished UI, place layouts, and experience mechanics from past Roblox projects.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {[
                {
                  title: 'Procedurally generated world demo',
                  description: 'A Roblox test place showcasing server-side procedural generation and client prediction for smooth player movement.',
                  src: '/Terrain.mp4',
                },
                {
                  title: 'Gameplay preview',
                  description: 'Responsive movement and combat behavior scripted for multiplayer experiences.',
                  src: '/for portfolio.mp4',
                },
                {
                  title: 'Fully finished Roblox experience',
                  description: 'Fully playable Roblox place with custom UI, gameplay systems, and polished visuals built for myself as a personal project.',
                  src: '/My-Game.mp4',
                },
              ].map((item, i) => (
                <Reveal
                  key={item.title}
                  as="article"
                  className="glass rounded-3xl p-6 sm:p-8"
                  delay={i * 90}
                >
                  <div className="mb-5 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70">
                    <video
                      controls
                      playsInline
                      className="h-full w-full rounded-3xl bg-slate-800"
                    >
                      <source src={item.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section
          id="process"
          className="relative scroll-mt-24 border-y border-white/5 bg-slate-950/40 px-4 py-24 sm:px-6"
        >
          <div className="mx-auto max-w-6xl">
            <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  A clear path from script idea to launch.
                </h2>
                <p className="mt-3 max-w-xl text-slate-400">
                  Transparent phases, testing-focused workflows, and clean Lua delivery
                  for Roblox Studio.
                </p>
              </div>
            </Reveal>

            <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, i) => (
                <Reveal key={step.title} as="li" className="relative" delay={i * 80}>
                  <div className="glass h-full rounded-2xl p-6">
                    <span className="text-xs font-semibold uppercase tracking-widest text-neon-purple">
                      Step {i + 1}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm text-slate-400">{step.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-24 px-4 py-24 sm:px-6">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Tell me about your Roblox scripting need.
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                Whether you need scripting help, polished UI, or a full Roblox experience,
                share the scope of your place and I&apos;ll help make it playable.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-slate-300">
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-neon-blue" aria-hidden />
                  Fast responses for Lua scripting, testing, and iteration.
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-neon-blue" aria-hidden />
                  Clear scripting scope and Roblox-friendly implementation.
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-neon-blue" aria-hidden />
                  Ideal for gameplay systems, shop logic, and multiplayer flows.
                </li>
              </ul>
            </Reveal>

            <Reveal className="glass rounded-2xl p-6 sm:p-8" delay={120}>
              {quoteSuccess ? (
                <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
                  <MessageSquare className="size-10 text-neon-blue" aria-hidden />
                  <p className="text-lg font-medium text-white">Thanks—we&apos;ll be in touch.</p>
                  <p className="text-sm text-slate-400">
                    {quoteMethod === 'mailto'
                      ? 'Your email app should open with your message ready to send. If it did not, check that a mail client is set up on this device.'
                      : 'Your message was delivered successfully.'}
                  </p>
                  <button
                    type="button"
                    className="mt-2 text-sm font-medium text-neon-blue underline-offset-4 hover:underline"
                    onClick={resetQuoteFlow}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  ref={quoteFormRef}
                  className="space-y-5"
                  onSubmit={handleQuoteSubmit}
                  aria-busy={quoteSending}
                >
                  {quoteError ? (
                    <div
                      role="alert"
                      className="flex gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100"
                    >
                      <AlertCircle className="mt-0.5 size-4 shrink-0 text-rose-300" aria-hidden />
                      <div className="min-w-0 text-left">
                        <p className="font-medium text-rose-50">
                          {quoteErrorIsConfig ? 'Form not wired yet' : 'Could not send'}
                        </p>
                        {quoteErrorIsConfig ? (
                          <>
                            <p className="mt-1 text-rose-100/90">
                              Copy <code className="rounded bg-black/30 px-1">.env.example</code> to{' '}
                              <code className="rounded bg-black/30 px-1">.env</code> and set{' '}
                              <code className="rounded bg-black/30 px-1">VITE_FORMSPREE_URL</code>,{' '}
                              <code className="rounded bg-black/30 px-1">
                                VITE_WEB3FORMS_ACCESS_KEY
                              </code>
                              , or <code className="rounded bg-black/30 px-1">VITE_CONTACT_EMAIL</code>
                              . Restart <code className="rounded bg-black/30 px-1">npm run dev</code>{' '}
                              after saving.
                            </p>
                            <p className="mt-2 text-xs text-rose-200/80">{quoteError}</p>
                          </>
                        ) : (
                          <p className="mt-1 text-rose-100/90">{quoteError}</p>
                        )}
                      </div>
                    </div>
                  ) : null}

                  <div>
                    <label
                      htmlFor="quote-name"
                      className="text-xs font-medium uppercase tracking-wider text-slate-500"
                    >
                      Roblox username
                    </label>
                    <input
                      id="quote-name"
                      required
                      name="username"
                      autoComplete="nickname"
                      disabled={quoteSending}
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none ring-neon-blue/40 placeholder:text-slate-600 focus:ring-2 disabled:opacity-50"
                      placeholder="BuilderGuy123"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="quote-message"
                      className="text-xs font-medium uppercase tracking-wider text-slate-500"
                    >
                      Project summary
                    </label>
                    <textarea
                      id="quote-message"
                      required
                      name="message"
                      rows={4}
                      disabled={quoteSending}
                      className="mt-1.5 w-full resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none ring-neon-blue/40 placeholder:text-slate-600 focus:ring-2 disabled:opacity-50"
                      placeholder="Goals, timeline, links to inspiration…"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={quoteSending}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple py-3 text-sm font-semibold text-slate-950 transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {quoteSending ? (
                      <>
                        <Loader2 className="size-4 animate-spin" aria-hidden />
                        Sending…
                      </>
                    ) : (
                      'Send inquiry'
                    )}
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} RogueRBX. Roblox developer portfolio site.
          </p>
          <a
            href="#top"
            className="text-sm font-medium text-neon-blue hover:text-white"
          >
            Back to top
          </a>
        </div>
      </footer>
    </div>
  )
}
