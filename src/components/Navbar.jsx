import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#services', label: 'Services' },
  { href: '#quote', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? 'border-white/10 bg-dark-bg/80 backdrop-blur-xl'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <a
          href="#top"
          className="text-lg font-semibold tracking-tight text-white"
        >
          RogueRBX<span className="text-neon-blue">.</span>
        </a>

        <ul className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="transition-colors hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#quote"
          className="hidden rounded-full bg-gradient-to-r from-neon-blue to-neon-purple px-4 py-2 text-sm font-semibold text-dark-bg shadow-[0_0_24px_-4px_rgba(0,246,255,0.55)] transition hover:brightness-110 md:inline-flex"
        >
          Let&apos;s build
        </a>

        <button
          type="button"
          className="inline-flex rounded-lg border border-white/10 bg-white/5 p-2 text-white md:hidden"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-white/10 bg-dark-bg/95 px-4 py-6 backdrop-blur-xl md:hidden">
          <ul className="flex flex-col gap-4 text-base font-medium text-slate-200">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="block py-1"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#quote"
                className="mt-2 inline-flex rounded-full bg-gradient-to-r from-neon-blue to-neon-purple px-4 py-2.5 text-sm font-semibold text-dark-bg"
                onClick={() => setOpen(false)}
              >
                Start a project
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  )
}
