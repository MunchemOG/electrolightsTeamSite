import { useCallback, useRef, useEffect } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  size: number
  rotation: number
  rotationSpeed: number
  gravity: number
  drag: number
  opacity: number
  shape: 'rect' | 'circle' | 'triangle'
}

const COLORS = [
  '#00d4ff', // cyan
  '#0044ff', // brand electric
  '#ff5e00', // brand orange
  '#f8fafc', // white
  '#00ffaa', // mint
  '#ff00aa', // pink
]

/**
 * Physics-based confetti cannon that fires from a given origin point.
 * Uses Canvas API for high-performance particle rendering.
 */
export function ConfettiCannon({
  fire,
  originRef,
}: {
  fire: boolean
  originRef: React.RefObject<HTMLElement | null>
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)
  const prefersReduced = useReducedMotion()

  const spawnParticles = useCallback(() => {
    if (prefersReduced) return

    const el = originRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2

    const particles: Particle[] = []
    const count = 80

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.8
      const velocity = 8 + Math.random() * 14
      const shapes: Particle['shape'][] = ['rect', 'circle', 'triangle']
      particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - Math.random() * 6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 3 + Math.random() * 6,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        gravity: 0.15 + Math.random() * 0.1,
        drag: 0.97 + Math.random() * 0.02,
        opacity: 1,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      })
    }

    particlesRef.current = particles
  }, [originRef, prefersReduced])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = particlesRef.current
    if (particles.length === 0) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]
      p.x += p.vx
      p.y += p.vy
      p.vy += p.gravity
      p.vx *= p.drag
      p.vy *= p.drag
      p.rotation += p.rotationSpeed
      p.opacity -= 0.008

      if (p.opacity <= 0 || p.y > canvas.height + 50) {
        particles.splice(i, 1)
        continue
      }

      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rotation)
      ctx.globalAlpha = p.opacity
      ctx.fillStyle = p.color

      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
      } else if (p.shape === 'circle') {
        ctx.beginPath()
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
        ctx.fill()
      } else {
        ctx.beginPath()
        ctx.moveTo(0, -p.size / 2)
        ctx.lineTo(p.size / 2, p.size / 2)
        ctx.lineTo(-p.size / 2, p.size / 2)
        ctx.closePath()
        ctx.fill()
      }

      ctx.restore()
    }

    if (particles.length > 0) {
      rafRef.current = requestAnimationFrame(animate)
    }
  }, [])

  useEffect(() => {
    if (fire) {
      spawnParticles()
      rafRef.current = requestAnimationFrame(animate)
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [fire, spawnParticles, animate])

  if (prefersReduced) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[200]"
      aria-hidden
    />
  )
}
