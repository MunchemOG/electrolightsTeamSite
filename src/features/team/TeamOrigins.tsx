import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Zap, Cpu, Globe, Trophy } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { SpringFadeIn } from '@/components/motion/SpringFadeIn'
import { TEAM_NAME, TEAM_NUMBER, ROBOT_NAME, SEASON } from '@/lib/constants'

interface Chapter {
  year: string
  label: string
  icon: typeof Zap
  iconColor: string
  heading: string
  body: string
  accent: string
}

const CHAPTERS: Chapter[] = [
  {
    year: '2023',
    label: 'Origin',
    icon: Zap,
    iconColor: '#0044ff',
    accent: '#0044ff',
    heading: 'A Team Is Born',
    body: `${TEAM_NAME} FTC ${TEAM_NUMBER} was founded in 2023 by a group of students who refused to build a "good enough" robot. From day one, the mandate was clear: compete at the highest level, document everything, and teach the next generation how to do it better.`,
  },
  {
    year: '2024',
    label: 'First Season',
    icon: Cpu,
    iconColor: '#00d4ff',
    accent: '#00d4ff',
    heading: 'Hardware Meets Code',
    body: `Our first competition season forced rapid growth. We shipped V1 — a simple but reliable drivetrain — and learned that the gap between "it works in the shop" and "it survives an FTC match" is enormous. V2 followed two weeks later with reinforced intake mounts and a new control architecture.`,
  },
  {
    year: '2025',
    label: 'Breakthrough',
    icon: Globe,
    iconColor: '#ff5e00',
    accent: '#ff5e00',
    heading: 'Outreach at Scale',
    body: `We expanded beyond competition. Mentoring 15+ FLL teams and running summer STEM camps, we reached 400+ students across the district. Building robots became a platform for teaching — and the community response changed everything about how we see this team's purpose.`,
  },
  {
    year: '2026',
    label: `${SEASON}`,
    icon: Trophy,
    iconColor: '#FFD700',
    accent: '#FFD700',
    heading: `${ROBOT_NAME} — Engineered to Dominate`,
    body: `${ROBOT_NAME} is the culmination of everything we've learned. A dual-flywheel launcher that fires on the move. A 21-ball autonomous with real-time trajectory correction. And a website built like a product, not an afterthought. This is what happens when students refuse to settle.`,
  },
]

/** Animated vertical timeline line */
function TimelineLine({ active }: { active: boolean }) {
  return (
    <motion.div
      className="absolute left-[22px] top-0 w-[2px] rounded-full"
      style={{ backgroundColor: '#0044ff30', height: '100%' }}
      aria-hidden
    >
      <motion.div
        className="w-full rounded-full"
        style={{ backgroundColor: '#0044ff', originY: 0 }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: active ? 1 : 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  )
}

/** Single chapter row */
function ChapterItem({ chapter, index }: { chapter: Chapter; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-6 pl-14"
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Node dot */}
      <motion.div
        className="absolute left-0 top-1 flex h-11 w-11 items-center justify-center rounded-full border border-white/10"
        style={{ backgroundColor: `${chapter.accent}18` }}
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.12 + 0.15, type: 'spring', stiffness: 260, damping: 20 }}
        aria-hidden
      >
        <chapter.icon
          className="h-5 w-5"
          style={{ color: chapter.iconColor }}
          aria-hidden
        />
      </motion.div>

      {/* Card */}
      <GlassCard className="mb-6 flex-1 px-6 py-6 transition-all duration-300 hover:scale-[1.01]" glowColor={chapter.accent}>
        {/* Top line */}
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${chapter.accent}60, transparent)`,
          }}
        />

        <div className="mb-2 flex items-center gap-3">
          <span
            className="text-xs font-black uppercase tracking-[0.3em]"
            style={{ color: chapter.accent }}
          >
            {chapter.year}
          </span>
          <span className="h-px flex-1 bg-white/10" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
            {chapter.label}
          </span>
        </div>

        <h3 className="mb-2 text-lg font-black text-white tracking-tight">{chapter.heading}</h3>
        <p className="text-sm leading-relaxed text-white/60">{chapter.body}</p>
      </GlassCard>
    </motion.div>
  )
}

/**
 * TeamOrigins — History narrative block for the Team page.
 * Renders a vertical animated timeline of the team's story from founding to current season.
 */
export function TeamOrigins() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const sectionInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      id="team-origins"
      ref={sectionRef}
      className="relative z-10 py-24 overflow-hidden"
      aria-label="Team history and origins"
    >
      {/* Subtle radial bg glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 20% 50%, #0044ff18 0%, transparent 70%)',
        }}
      />

      <div className="container mx-auto px-6">
        {/* Section header */}
        <SpringFadeIn>
          <div className="mb-16 max-w-2xl">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.3em] text-brand-electric">
              Our Story
            </span>
            <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl lg:text-5xl">
              Built from{' '}
              <span className="bg-gradient-to-r from-brand-electric to-brand-orange bg-clip-text text-transparent">
                the ground up.
              </span>
            </h2>
            <p className="mt-4 text-text-muted leading-relaxed max-w-xl">
              Every iteration of this team — from our first rickety prototype to{' '}
              {ROBOT_NAME}'s shoot-on-the-move auto — is documented here. This is the full picture.
            </p>
          </div>
        </SpringFadeIn>

        {/* Timeline */}
        <div className="relative ml-0 md:ml-8 max-w-2xl">
          {/* Vertical line behind chapters */}
          <div className="absolute left-[22px] top-0 bottom-0 w-[2px] rounded-full bg-white/5" aria-hidden />
          <TimelineLine active={sectionInView} />

          {CHAPTERS.map((chapter, i) => (
            <ChapterItem key={chapter.year} chapter={chapter} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
