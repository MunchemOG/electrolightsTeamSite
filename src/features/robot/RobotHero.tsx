import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ROBOT_NAME, SEASON, SEASON_YEAR, TEAM_STATS } from '@/lib/constants'
import { Cpu, Zap, Target } from 'lucide-react'
import { KineticBackground } from '@/features/landing/KineticBackground'

const HERO_STATS = [
  { label: 'OPR', value: TEAM_STATS.opr, unit: 'pts', icon: Zap, color: '#00d4ff' },
  { label: 'High Score', value: TEAM_STATS.highScore, unit: 'pts', icon: Target, color: '#ff5e00' },
  { label: 'Auto Avg', value: TEAM_STATS.autoAvg, unit: 'pts', icon: Cpu, color: '#0044ff' },
]

export function RobotHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={containerRef}
      id="robot-hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{ perspective: '1200px' }}
      aria-label="Vectair robot hero section"
    >
      {/* Landing-style kinetic particle network background */}
      <KineticBackground />

      {/* Subtle gradient overlay for text readability — lets KineticBackground show through */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-bg-base/40 via-transparent to-bg-base pointer-events-none" aria-hidden />



      {/* Grid floor */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: `
            linear-gradient(rgba(0,212,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
          transform: 'perspective(800px) rotateX(55deg)',
          transformOrigin: 'bottom',
        }}
        aria-hidden
      />

      {/* Content */}
      <motion.div style={{ y, opacity }} className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Season badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
          style={{
            borderColor: 'rgba(0,212,255,0.3)',
            background: 'rgba(0,212,255,0.06)',
            backdropFilter: 'blur(12px)',
            color: '#00d4ff',
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#00d4ff] pulse-ring inline-block" />
          FTC 30686 · {SEASON} Season {SEASON_YEAR}
        </motion.div>

        {/* Main title — 3D depth stack */}
        <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
          {/* Shadow layer */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.85, rotateX: 25 }}
            animate={{ opacity: 0.35, scale: 1, rotateX: 0 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 select-none text-[clamp(5rem,16vw,14rem)] font-black uppercase leading-none tracking-tighter text-[#0044ff]"
            style={{ transform: 'translateZ(-12px) translateX(6px) translateY(4px)', filter: 'blur(2px)' }}
            aria-hidden
          >
            {ROBOT_NAME}
          </motion.h1>
          {/* Main text */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.85, rotateX: 25 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative text-[clamp(5rem,16vw,14rem)] font-black uppercase leading-none tracking-tighter text-white"
            style={{ transform: 'translateZ(0px)', textShadow: '0 0 80px rgba(0,212,255,0.3), 0 0 120px rgba(0,68,255,0.2)' }}
          >
            {ROBOT_NAME}
          </motion.h1>

        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="mt-4 max-w-xl text-sm font-medium uppercase tracking-[0.3em] text-white/40"
        >
          Dual-Flywheel · Shoot-on-the-Move · 21-Ball Auto
        </motion.p>

        {/* Floating stat pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          {HERO_STATS.map(({ label, value, unit, icon: Icon, color }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-2xl border px-5 py-3"
              style={{
                borderColor: color + '30',
                background: `linear-gradient(135deg, ${color}08, rgba(15,23,42,0.9))`,
                backdropFilter: 'blur(20px)',
                boxShadow: `0 0 24px ${color}18, inset 0 1px 0 ${color}15`,
              }}
            >
              <Icon className="h-4 w-4 shrink-0" style={{ color }} aria-hidden />
              <div className="text-left">
                <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: color + 'aa' }}>{label}</p>
                <p className="text-lg font-black text-white leading-none">{value}<span className="ml-1 text-xs font-normal text-white/40">{unit}</span></p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-16 flex flex-col items-center gap-2"
          aria-hidden
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Scroll to explore</span>
          <div className="h-10 w-px bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}
