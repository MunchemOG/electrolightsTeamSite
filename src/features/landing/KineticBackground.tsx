import { useEffect, useRef, useCallback } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useKonamiCode } from '@/hooks/useKonamiCode'

export function KineticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const prefersReduced = useReducedMotion()
  const isOverdrive = useKonamiCode()

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY }
  }, [])

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -1000, y: -1000 }
  }, [])

  useEffect(() => {
    if (prefersReduced || !canvasRef.current) return

    const canvas = canvasRef.current
    const rawCtx = canvas.getContext('2d')
    if (!rawCtx) return
    const ctx = rawCtx as CanvasRenderingContext2D

    let width = 0
    let height = 0
    let particles: Particle[] = []

    const colors = ['#0044ff', '#00a2ff', '#002288', '#ff5e00']

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      color: string
      baseVx: number
      baseVy: number

      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.baseVx = (Math.random() - 0.5) * 0.5
        this.baseVy = (Math.random() - 0.5) * 0.5
        this.vx = this.baseVx
        this.vy = this.baseVy
        this.radius = Math.random() * 2 + 0.5
        this.color = colors[Math.floor(Math.random() * colors.length)]!
      }

      update(overdriveMode: boolean) {
        const speedMult = overdriveMode ? 5.0 : 1.0
        
        // Gentle mouse repel
        const dx = mouseRef.current.x - this.x
        const dy = mouseRef.current.y - this.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        if (dist < 150) {
          const force = (150 - dist) / 150
          this.vx -= (dx / dist) * force * 0.05
          this.vy -= (dy / dist) * force * 0.05
        } else {
          // Return to base velocity slowly
          this.vx += (this.baseVx * speedMult - this.vx) * 0.02
          this.vy += (this.baseVy * speedMult - this.vy) * 0.02
        }

        this.x += this.vx
        this.y += this.vy

        // Wrap edges
        if (this.x < 0) this.x = width
        if (this.x > width) this.x = 0
        if (this.y < 0) this.y = height
        if (this.y > height) this.y = 0
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    function init() {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height

      // Number of particles scales with screen size
      const count = Math.floor((width * height) / 15000)
      particles = []
      for (let i = 0; i < count; i++) {
        particles.push(new Particle())
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height)
      
      // Draw gradient bg directly if desired, but we let CSS handle it
      
      const connectDistance = isOverdrive ? 200 : 120

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]!
        p1.update(isOverdrive)
        p1.draw()

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]!
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < connectDistance) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            const opacity = 1 - (dist / connectDistance)
            
            // Mix color based on particles or just use a tech grid color
            ctx.strokeStyle = isOverdrive 
                ? `rgba(255, 94, 0, ${opacity * 0.3})`
                : `rgba(0, 68, 255, ${opacity * 0.15})`
                
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
        
        // Connect to mouse
        const mouseDx = p1.x - mouseRef.current.x
        const mouseDy = p1.y - mouseRef.current.y
        const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy)
        
        if (mouseDist < 180) {
           ctx.beginPath()
           ctx.moveTo(p1.x, p1.y)
           ctx.lineTo(mouseRef.current.x, mouseRef.current.y)
           ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - mouseDist / 180) * 0.2})`
           ctx.lineWidth = 1
           ctx.stroke()
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    init()
    window.addEventListener('resize', init)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    
    animate()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', init)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [prefersReduced, handleMouseMove, handleMouseLeave, isOverdrive])

  // Static CSS fallback
  if (prefersReduced) {
    return (
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(0,68,255,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(255,94,0,0.08) 0%, transparent 50%), #030712',
        }}
      />
    )
  }

  return (
    <div className="absolute inset-0 z-0 bg-[#02050A]">
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        aria-hidden="true"
      />
    </div>
  )
}
