import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SpringFadeIn } from '@/components/motion/SpringFadeIn'
import { GlassCard } from '@/components/ui/GlassCard'
import { Download, ExternalLink } from 'lucide-react'

export function MagneticCADButton() {
  const btnRef = useRef<HTMLDivElement>(null)
  const magnetRef = useRef({ x: 0, y: 0 })
  const animRef = useRef<number | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = btnRef.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const radius = 120
      if (dist < radius) {
        const pull = (1 - dist / radius) * 0.45
        magnetRef.current = { x: dx * pull, y: dy * pull }
      } else {
        magnetRef.current = { x: 0, y: 0 }
      }
    }

    const animate = () => {
      const btn = el.querySelector<HTMLButtonElement>('#cad-download-btn')
      if (btn) {
        const cur = {
          x: parseFloat(btn.style.getPropertyValue('--mx') || '0'),
          y: parseFloat(btn.style.getPropertyValue('--my') || '0'),
        }
        const nx = cur.x + (magnetRef.current.x - cur.x) * 0.12
        const ny = cur.y + (magnetRef.current.y - cur.y) * 0.12
        btn.style.setProperty('--mx', `${nx}`)
        btn.style.setProperty('--my', `${ny}`)
        btn.style.transform = `translate(${nx}px, ${ny}px)`
      }
      animRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    animRef.current = requestAnimationFrame(animate)
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  // Trigger in-view once
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.3 })
    if (btnRef.current) obs.observe(btnRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="cad-download" className="relative z-10 py-24" aria-label="CAD download section">
      <div className="container mx-auto px-6">
        <SpringFadeIn>
          <GlassCard
            glowColor="#00d4ff"
            className="relative overflow-hidden py-20"
            interactive={false}
          >
            {/* Ambient glow orbs */}
            <div
              className="pointer-events-none absolute left-1/4 top-1/2 -translate-y-1/2 h-64 w-64 rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, #0044ff, transparent)' }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute right-1/4 top-1/2 -translate-y-1/2 h-48 w-48 rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, #ff5e00, transparent)' }}
              aria-hidden
            />

            <div className="relative z-10 flex flex-col items-center text-center gap-8">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
                style={{ borderColor: 'rgba(0,212,255,0.25)', color: '#00d4ff', background: 'rgba(0,212,255,0.06)' }}
              >
                OnShape Public Access
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl font-black tracking-tight text-white md:text-5xl max-w-xl"
              >
                Full CAD Available
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="max-w-md text-sm text-text-muted leading-relaxed"
              >
                Vectair's complete assembly is publicly available on OnShape.
                Every component, tolerance, and mate — open for inspection.
              </motion.p>

              {/* Magnetic button zone */}
              <div ref={btnRef} className="relative flex h-32 w-full max-w-xs items-center justify-center">
                <button
                  id="cad-download-btn"
                  className="group relative flex items-center gap-3 rounded-2xl px-8 py-4 font-bold text-white transition-all duration-200"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,68,255,0.25), rgba(0,212,255,0.15))',
                    border: '1px solid rgba(0,212,255,0.35)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 0 40px rgba(0,68,255,0.2), 0 0 80px rgba(0,212,255,0.08), inset 0 1px 0 rgba(255,255,255,0.1)',
                    willChange: 'transform',
                  }}
                  aria-label="Open Vectair CAD on OnShape"
                  onClick={() => window.open('https://cad.onshape.com', '_blank', 'noopener')}
                >
                  {/* Inner glow on hover */}
                  <span
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.15), transparent)' }}
                    aria-hidden
                  />
                  <Download className="h-5 w-5 shrink-0 text-[#00d4ff]" aria-hidden />
                  <span className="text-sm">Open in OnShape</span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-white/30" aria-hidden />
                </button>
              </div>

              {/* Secondary info row */}
              <div className="flex flex-wrap justify-center gap-6 text-xs text-white/25">
                <span>OnShape public document</span>
                <span aria-hidden>·</span>
                <span>350+ parts / 18 assemblies</span>
                <span aria-hidden>·</span>
                <span>No account required</span>
              </div>
            </div>
          </GlassCard>
        </SpringFadeIn>
      </div>
    </section>
  )
}
