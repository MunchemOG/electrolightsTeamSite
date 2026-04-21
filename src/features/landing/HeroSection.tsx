import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ChevronDown, Zap } from 'lucide-react'
import { MagneticButton } from '@/components/motion/MagneticButton'
import { KineticBackground } from '@/features/landing/KineticBackground'

gsap.registerPlugin(ScrollTrigger)

/**
 * Full-viewport Hero section.
 *
 * Features:
 * - Kinetic GLSL background (mouse-reactive)
 * - Massive "30686" typography with gradient mask
 * - Team name, season theme, rookie call-out
 * - GSAP ScrollTrigger driven parallax + fade-out on scroll
 * - Scroll-down chevron indicator
 */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLDivElement>(null)
  const numberRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  // ── GSAP scroll-driven parallax & fade ──
  useEffect(() => {
    if (prefersReduced || !sectionRef.current) return

    const ctx = gsap.context(() => {
      // ... same as before
      gsap.to(numberRef.current, {
        yPercent: -30,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to(headingRef.current, {
        yPercent: -20,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '20% top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to(subRef.current, {
        yPercent: -15,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '30% top',
          end: '80% top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReduced])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden"
    >
      {/* Kinetic GLSL Background */}
      <KineticBackground />

      {/* Dark gradient overlay for text readability against global background */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-bg-base/40 via-transparent to-bg-base pointer-events-none" />

      {/* ── Big Number (Background typography) ── */}
      <div
        ref={numberRef}
        className="absolute inset-0 z-[2] flex select-none items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <span
          className="whitespace-nowrap pb-4 pr-10 text-[24vw] font-black leading-none tracking-tighter md:text-[20vw]"
          style={{
            background: 'linear-gradient(180deg, rgba(0,68,255,0.18) 0%, rgba(255,94,0,0.06) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          30686
        </span>
      </div>

      {/* ── Main content ── */}
      <div ref={headingRef} className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Season badge */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-electric/30 bg-brand-electric/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-brand-electric backdrop-blur-sm">
            <Zap className="h-3 w-3" aria-hidden="true" />
            2025–26 DECODE
          </span>
        </motion.div>

        {/* Team Name */}
        <motion.h1
          initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 text-5xl font-black tracking-tight text-white md:text-7xl lg:text-8xl"
        >
          ELECTRO
          <span
            style={{
              background: 'linear-gradient(135deg, #0044ff, #00a2ff, #ff5e00)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            LIGHTS
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-3 max-w-xl text-lg font-medium text-text-muted md:text-xl"
        >
          FTC Team 30686 — Gooning to femboys, one nut at a time.
        </motion.p>

        {/* Rookie highlight */}
        <motion.p
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-sm font-semibold text-brand-orange/80"
        >
          Rookie Season &bull; Innovate Award Winner &bull; 21-Ball Autonomous
        </motion.p>
      </div>

      {/* ── CTA area ── */}
      <div ref={subRef} className="relative z-10 mt-10 flex flex-col items-center gap-6 sm:flex-row">
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <MagneticButton
            href="/robot"
            className="group inline-flex items-center gap-2 rounded-full bg-brand-electric px-8 py-3.5 font-bold text-white shadow-[0_0_30px_rgba(0,68,255,0.35)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(0,68,255,0.55)] active:scale-95"
          >
            Meet Vectair
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </MagneticButton>
        </motion.div>
        
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          <MagneticButton
            href="/team"
            className="inline-flex items-center gap-2 rounded-full border border-glass px-8 py-3.5 font-bold text-text-muted transition-all hover:border-white/20 hover:bg-bg-surface/40 hover:text-white active:scale-95"
          >
            Our Team
          </MagneticButton>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={prefersReduced ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted/50">
          Scroll
        </span>
        <ChevronDown className="h-4 w-4 animate-bounce text-text-muted/40" aria-hidden="true" />
      </motion.div>
    </section>
  )
}
