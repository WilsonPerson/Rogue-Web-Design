import { useEffect, useRef } from 'react'

export function ParticleField({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let particles = []

    const palette = ['#00f6ff', '#8b5cf6', '#a78bfa', '#22d3ee']

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const { clientWidth, clientHeight } = canvas
      canvas.width = Math.floor(clientWidth * dpr)
      canvas.height = Math.floor(clientHeight * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const area = clientWidth * clientHeight
      const count = Math.min(140, Math.max(48, Math.floor(area / 14000)))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * clientWidth,
        y: Math.random() * clientHeight,
        r: Math.random() * 1.6 + 0.35,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        a: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.012,
        color: palette[(Math.random() * palette.length) | 0],
        pulse: Math.random() * Math.PI * 2,
      }))
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    const tick = (t) => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.a += p.spin
        p.pulse += 0.02

        if (p.x < -4) p.x = w + 4
        if (p.x > w + 4) p.x = -4
        if (p.y < -4) p.y = h + 4
        if (p.y > h + 4) p.y = -4

        const flicker = 0.45 + Math.sin(p.pulse) * 0.2
        ctx.save()
        ctx.globalAlpha = flicker * 0.55
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      ctx.save()
      ctx.globalAlpha = 0.08
      ctx.strokeStyle = '#00f6ff'
      ctx.lineWidth = 1
      const step = 88
      const offset = (t * 0.012) % step
      for (let x = -step + offset; x < w + step; x += step) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x + h * 0.35, h)
        ctx.stroke()
      }
      ctx.restore()

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  )
}
