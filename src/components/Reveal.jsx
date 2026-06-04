import { useLayoutEffect, useRef, useState } from 'react'

function isElementInViewport(el) {
  const r = el.getBoundingClientRect()
  const vh = window.innerHeight || document.documentElement.clientHeight
  const vw = window.innerWidth || document.documentElement.clientWidth
  return r.bottom > 0 && r.top < vh && r.right > 0 && r.left < vw
}

export function Reveal({ as: Tag = 'div', className = '', children, delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const markVisible = () => {
      queueMicrotask(() => setVisible(true))
    }

    const reduceMotion = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    )?.matches
    if (reduceMotion) {
      markVisible()
      return
    }

    if (isElementInViewport(el)) {
      markVisible()
      return
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          markVisible()
          obs.disconnect()
        }
      },
      { root: null, rootMargin: '0px 0px 15% 0px', threshold: 0 },
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`.trim()}
      style={visible ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
