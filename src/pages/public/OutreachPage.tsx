import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown } from 'lucide-react'
import { PageMeta } from '@/components/seo/PageMeta'
import { ScrambleText } from '@/components/motion/ScrambleText'
import { KineticBackground } from '@/features/landing/KineticBackground'
import { MissionStatement } from '@/features/outreach/MissionStatement'
import { PhotoCarousel } from '@/features/outreach/PhotoCarousel'
import { ImpactTimeline } from '@/features/outreach/ImpactTimeline'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import {
  TEAM_NUMBER,
  OUTREACH_STATS,
  CURRICULUM_MODULES,
} from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger)

// ─── Hero stats ───────────────────────────────────────────────────────────────
const HERO_STATS = [
  { label: 'FLL Teams Mentored', value: `${OUTREACH_STATS.fllTeamsMentored}+` },
  { label: 'Students Reached', value: `${OUTREACH_STATS.studentsReached}+` },
  { label: 'Volunteer Hours', value: OUTREACH_STATS.volunteerHours.toLocaleString() },
  { label: 'Workshops Run', value: OUTREACH_STATS.workshopsRun },
]

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({
  label,
  title,
  subtitle,
  accent = '#0044ff',
}: {
  label: string
  title: string
  subtitle?: string
  accent?: string
}) {
  return (
    <div className="mb-10">
      <div className="mb-2 flex items-center gap-3">
        <div className="h-px w-6 opacity-60" style={{ background: accent }} />
        <span
          className="font-mono text-[11px] uppercase tracking-[0.3em]"
          style={{ color: accent }}
        >
          {label}
        </span>
      </div>
      <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
        <ScrambleText text={title} />
      </h2>
      {subtitle && (
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/40">
          {subtitle}
        </p>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO — matching team page hero with KineticBackground
// ─────────────────────────────────────────────────────────────────────────────

function OutreachHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const numberRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(numberRef.current, {
        yPercent: -30,
        opacity: 0.15,
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

      gsap.to(statsRef.current, {
        yPercent: -12,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '35% top',
          end: '85% top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReduced])

  return (
    <section
      ref={sectionRef}
      id="outreach-hero"
      aria-label="Outreach page hero"
      className="relative flex min-h-[calc(100dvh-8dvh)] flex-col items-center justify-center overflow-hidden"
    >
      {/* KineticBackground canvas — same as team page */}
      <KineticBackground />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-bg-base/50 via-transparent to-bg-base" />

      {/* Ghost number watermark */}
      <div
        ref={numberRef}
        className="absolute inset-0 z-[2] flex select-none items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <span
          className="whitespace-nowrap font-black leading-none tracking-tighter"
          style={{
            fontSize: 'clamp(10rem, 22vw, 26rem)',
            background:
              'linear-gradient(180deg, rgba(0,68,255,0.14) 0%, rgba(255,94,0,0.05) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          30686
        </span>
      </div>

      {/* Main heading */}
      <div
        ref={headingRef}
        className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center sm:px-8"
      >
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-electric/30 bg-brand-electric/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-brand-electric backdrop-blur-sm">
            FTC {TEAM_NUMBER} -- Community Impact
          </span>
        </motion.div>

        <motion.h1
          initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 font-display text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          OUTREACH
          <span
            style={{
              background: 'linear-gradient(135deg, #0044ff, #00d4ff, #ff5e00)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {' '}HUB
          </span>
        </motion.h1>

        <motion.p
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-3 max-w-xl text-base font-medium text-text-muted sm:text-lg"
        >
          Mentoring {OUTREACH_STATS.fllTeamsMentored}+ FLL teams, hosting STEM workshops,
          and running summer camps across Lake County, IL.
        </motion.p>

        <motion.p
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-sm font-semibold text-brand-orange/80"
        >
          {OUTREACH_STATS.studentsReached}+ Students -- {OUTREACH_STATS.volunteerHours.toLocaleString()} Hours -- {OUTREACH_STATS.workshopsRun} Workshops
        </motion.p>
      </div>

      {/* Stats HUD */}
      <div
        ref={statsRef}
        className="relative z-10 mt-14 w-full max-w-4xl px-6 sm:px-8"
      >
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {HERO_STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.03] px-5 py-4 text-center backdrop-blur-sm"
            >
              <div className="text-2xl font-black text-white">{stat.value}</div>
              <div className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-white/40">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
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

// ─────────────────────────────────────────────────────────────────────────────
// CURRICULUM BREAKDOWN SECTION
// ─────────────────────────────────────────────────────────────────────────────

function CurriculumSection() {
  return (
    <section id="curriculum" aria-label="Mentoring curriculum breakdown">
      <SectionHeader
        label="Curriculum"
        title="What We Teach"
        subtitle="Our structured mentoring curriculum covers five core modules delivered across a 14-week semester to middle school students."
        accent="#a78bfa"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CURRICULUM_MODULES.map((mod, i) => (
          <motion.div
            key={mod.id}
            className="group relative overflow-hidden rounded-2xl p-5"
            style={{
              background: `linear-gradient(135deg, ${mod.color}08 0%, transparent 60%), #080812`,
              border: `1px solid ${mod.color}18`,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.5,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{
              y: -4,
              boxShadow: `0 0 30px ${mod.color}12`,
              transition: { duration: 0.3 },
            }}
          >
            {/* Top accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: `linear-gradient(to right, transparent, ${mod.color}, transparent)` }}
            />

            <div className="mb-3 flex items-center justify-between">
              <span
                className="text-[9px] font-black uppercase tracking-[0.4em]"
                style={{ color: mod.color }}
              >
                Module {i + 1}
              </span>
              <span className="rounded-full border border-white/8 bg-white/[0.03] px-2 py-0.5 font-mono text-[9px] text-white/30">
                {mod.weeks}wk / Grades {mod.gradeLevel}
              </span>
            </div>

            <h3 className="mb-3 text-lg font-black text-white">{mod.title}</h3>

            <ul className="space-y-1.5">
              {mod.topics.map((topic) => (
                <li key={topic} className="flex items-center gap-2 text-xs text-white/45">
                  <div
                    className="h-1 w-1 rounded-full"
                    style={{ background: mod.color }}
                  />
                  {topic}
                </li>
              ))}
            </ul>

            {/* Shimmer on hover */}
            <div className="pointer-events-none absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/[0.02] to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ECONOMIC IMPACT SECTION
// ─────────────────────────────────────────────────────────────────────────────

function ImpactMetrics() {
  const metrics = [
    { label: 'Estimated Local Impact', value: `$${(OUTREACH_STATS.economicImpact / 1000).toFixed(0)}K`, accent: '#00d4ff', desc: 'Estimated value of volunteer labor, equipment access, and educational programming provided to the Lake County community.' },
    { label: 'Summer Camp Students', value: OUTREACH_STATS.summerCampStudents, accent: '#ff5e00', desc: 'Students enrolled in our summer STEM camp program covering robotics fundamentals, coding, and competitive strategy.' },
  ]

  return (
    <section id="impact-metrics" aria-label="Economic impact metrics">
      <SectionHeader
        label="Impact"
        title="By the Numbers"
        subtitle="Measuring our community footprint beyond just team count."
        accent="#ff5e00"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            className="relative overflow-hidden rounded-2xl p-6 sm:p-8"
            style={{
              background: `linear-gradient(135deg, ${m.accent}06 0%, transparent 50%), #080812`,
              border: `1px solid ${m.accent}15`,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: `linear-gradient(to right, transparent, ${m.accent}, transparent)` }}
            />
            <span
              className="text-[9px] font-black uppercase tracking-[0.4em]"
              style={{ color: m.accent }}
            >
              {m.label}
            </span>
            <div className="mt-2 text-5xl font-black text-white sm:text-6xl">
              {m.value}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-white/35">{m.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SUMMER CAMP CTA
// ─────────────────────────────────────────────────────────────────────────────

function SummerCampCTA() {
  return (
    <section id="summer-camp" aria-label="Summer STEM camp">
      <motion.div
        className="relative overflow-hidden rounded-3xl p-8 text-center md:p-12"
        style={{
          background:
            'linear-gradient(135deg, rgba(0,68,255,0.09) 0%, rgba(0,212,255,0.04) 50%, rgba(255,94,0,0.07) 100%)',
          border: '1px solid rgba(0,212,255,0.12)',
          boxShadow: '0 0 50px rgba(0,68,255,0.06)',
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #00d4ff, transparent 70%)' }}
          aria-hidden
        />

        <span className="mb-4 inline-block rounded-full border border-[#00d4ff]/18 bg-[#00d4ff]/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.4em] text-[#00d4ff]">
          Summer 2026
        </span>

        <h2 className="mt-4 text-3xl font-black text-white md:text-4xl">
          STEM Camp Registration
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/50 md:text-base">
          Our annual summer robotics camp is open for registration. Two weeks of
          hands-on engineering, coding, and competition prep for students in
          grades 5-8. Limited to 30 seats.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="mailto:outreach@electrolights30686.com"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/10 px-8 py-3.5 text-sm font-bold uppercase tracking-[0.2em] text-[#00d4ff] transition-all duration-300 hover:bg-[#00d4ff]/20 hover:shadow-[0_0_30px_rgba(0,212,255,0.15)]"
          >
            Register Interest
            <div className="pointer-events-none absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
          </a>
        </div>
      </motion.div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE ASSEMBLY
// ─────────────────────────────────────────────────────────────────────────────

export default function OutreachPage() {
  return (
    <>
      <PageMeta
        title="Outreach"
        description="Electrolights FTC 30686 mentors 15+ FLL teams, hosts STEM workshops, and runs summer camps. See our community impact mapped and visualized."
        ogUrl="https://electrolights30686.com/outreach"
        ogImage="/og/og-outreach.jpg"
      />

      <div className="min-h-screen">
        {/* Hero */}
        <OutreachHero />

        {/* Main content */}
        <div className="mx-auto max-w-5xl space-y-24 px-6 pb-24 sm:px-8">
          {/* 1 -- Mission Statement */}
          <MissionStatement />

          {/* 2 -- Curriculum Breakdown */}
          <CurriculumSection />

          {/* 3 -- Impact Timeline */}
          <section id="impact-timeline" aria-label="Outreach event timeline">
            <SectionHeader
              label="Timeline"
              title="Season Impact Log"
              subtitle="Scroll-triggered mechanical timeline of every major outreach event this season. Each entry locks into place with an audible click."
              accent="#a78bfa"
            />
            <ImpactTimeline />
          </section>

          {/* 4 -- Photo Carousel */}
          <section id="photo-gallery" aria-label="Workshop photo gallery">
            <SectionHeader
              label="Gallery"
              title="Workshop Moments"
              subtitle="Drag to browse. Snap-physics with rubber-band inertia on the edges."
              accent="#ff5e00"
            />
            <PhotoCarousel />
          </section>

          {/* 5 -- Impact Metrics */}
          <ImpactMetrics />

          {/* 6 -- Summer Camp CTA */}
          <SummerCampCTA />
        </div>
      </div>
    </>
  )
}
