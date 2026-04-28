import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// ─────────────────────────────────────────────────────────────────────────────
// AUTONOMOUS STRATEGY CARDS
// Each card represents a distinct autonomous routine with its own stats,
// intake configuration, and step breakdown.
// ─────────────────────────────────────────────────────────────────────────────

interface AutoStep {
  phase: string
  action: string
  note?: string
}

interface AutoStrategy {
  id: string
  index: number
  label: string
  variant: string
  totalPoints: number
  accentColor: string
  secondaryColor: string
  position: 'Near' | 'Far'
  intakeRows: {
    row1: boolean
    row2: boolean
    row3: boolean
  }
  stats: { label: string; value: string }[]
  steps: AutoStep[]
  tagline: string
}

const STRATEGIES: AutoStrategy[] = [
  {
    id: 'near-21-full',
    index: 0,
    label: 'Near Auto 21',
    variant: 'All 3-Row Intake',
    totalPoints: 21,
    accentColor: '#00d4ff',
    secondaryColor: '#0044ff',
    position: 'Near',
    intakeRows: { row1: true, row2: true, row3: true },
    tagline: 'Maximum output — full field coverage, all three specimen rows swept.',
    stats: [
      { label: 'Samples Scored', value: '21' },
      { label: 'Runtime', value: '~28s' },
      { label: 'Reliability', value: '94%' },
    ],
    steps: [
      { phase: 'INIT', action: 'Preload specimen scored', note: 'From near start tile' },
      { phase: 'ROW 1', action: 'Sweep all 3 row-1 spikes into intake', note: 'Near side, ground-level' },
      { phase: 'ROW 2', action: 'Drive to row-2, sweep 3 spikes', note: 'Center field zone' },
      { phase: 'ROW 3', action: 'Drive to row-3, sweep remaining', note: 'Far side intake pass' },
      { phase: 'PARK', action: 'Observation zone park', note: '+3 pts' },
    ],
  },
  {
    id: 'near-21-no3',
    index: 1,
    label: 'Near Auto 21',
    variant: 'Without 3rd Row Intake',
    totalPoints: 21,
    accentColor: '#7c3aed',
    secondaryColor: '#5b21b6',
    position: 'Near',
    intakeRows: { row1: true, row2: true, row3: false },
    tagline: 'Near-side dominant — avoids row-3 traffic, uses extra cycles from rows 1 and 2.',
    stats: [
      { label: 'Samples Scored', value: '21' },
      { label: 'Runtime', value: '~26s' },
      { label: 'Reliability', value: '91%' },
    ],
    steps: [
      { phase: 'INIT', action: 'Preload specimen scored' },
      { phase: 'ROW 1', action: 'Sweep all 3 row-1 spikes into intake' },
      { phase: 'ROW 2', action: 'Sweep all 3 row-2 spikes', note: 'Skips row-3 entirely' },
      { phase: 'CYCLE', action: 'Return to near submersible for extra samples', note: 'Net zone fallback' },
      { phase: 'PARK', action: 'Observation zone park', note: '+3 pts' },
    ],
  },
  {
    id: 'far-15-no-rows',
    index: 2,
    label: 'Far Auto 15',
    variant: 'Without Rows 1, 2, or 3',
    totalPoints: 15,
    accentColor: '#f59e0b',
    secondaryColor: '#d97706',
    position: 'Far',
    intakeRows: { row1: false, row2: false, row3: false },
    tagline: 'Efficiency-first far-side run. No row sweeps — pure submersible cycling.',
    stats: [
      { label: 'Samples Scored', value: '15' },
      { label: 'Runtime', value: '~22s' },
      { label: 'Reliability', value: '97%' },
    ],
    steps: [
      { phase: 'INIT', action: 'Preload scored from far start tile' },
      { phase: 'DRIVE', action: 'Cross to far zone', note: 'No row intake passes' },
      { phase: 'CYCLE 1', action: 'Submersible intake + cycle' },
      { phase: 'CYCLE 2', action: 'Submersible intake + cycle' },
      { phase: 'CYCLE 3', action: 'Submersible intake + cycle' },
      { phase: 'PARK', action: 'Observation zone park', note: '+3 pts' },
    ],
  },
  {
    id: 'far-18-no-1-2',
    index: 3,
    label: 'Far Auto 18',
    variant: 'Without Rows 1 and 2',
    totalPoints: 18,
    accentColor: '#ff5e00',
    secondaryColor: '#dc2626',
    position: 'Far',
    intakeRows: { row1: false, row2: false, row3: true },
    tagline: 'Far-side hybrid — row-3 sweep for extra samples before submersible cycling.',
    stats: [
      { label: 'Samples Scored', value: '18' },
      { label: 'Runtime', value: '~25s' },
      { label: 'Reliability', value: '89%' },
    ],
    steps: [
      { phase: 'INIT', action: 'Preload scored from far start tile' },
      { phase: 'ROW 3', action: 'Sweep far row-3 spikes into intake', note: 'Skips rows 1 and 2' },
      { phase: 'CYCLE 1', action: 'Submersible intake + cycle' },
      { phase: 'CYCLE 2', action: 'Submersible intake + cycle' },
      { phase: 'CYCLE 3', action: 'Submersible intake + cycle' },
      { phase: 'PARK', action: 'Observation zone park', note: '+3 pts' },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// INTAKE ROW INDICATOR
// ─────────────────────────────────────────────────────────────────────────────

function IntakeRowIndicator({
  rows,
  color,
}: {
  rows: AutoStrategy['intakeRows']
  color: string
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[9px] uppercase tracking-widest text-white/25">
        Intake
      </span>
      <div className="flex items-center gap-1">
        {(['row1', 'row2', 'row3'] as const).map((key, i) => (
          <div
            key={key}
            className="flex h-5 w-5 items-center justify-center rounded border text-[9px] font-mono font-bold transition-all"
            style={{
              borderColor: rows[key] ? `${color}60` : 'rgba(255,255,255,0.08)',
              background: rows[key] ? `${color}15` : 'transparent',
              color: rows[key] ? color : 'rgba(255,255,255,0.2)',
            }}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// STRATEGY CARD — full detail view of a single autonomous routine
// ─────────────────────────────────────────────────────────────────────────────

function StrategyCard({ strategy }: { strategy: AutoStrategy }) {
  const { accentColor } = strategy

  return (
    <div className="flex h-full flex-col">
      {/* Card header */}
      <div
        className="relative overflow-hidden rounded-t-2xl border-x border-t p-6"
        style={{
          borderColor: `${accentColor}20`,
          background: `linear-gradient(135deg, ${accentColor}08 0%, transparent 60%)`,
        }}
      >
        {/* Background glow orb */}
        <div
          className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full opacity-15 blur-3xl"
          style={{ background: accentColor }}
        />

        <div className="relative">
          {/* Position + index badge */}
          <div className="mb-3 flex items-center gap-3">
            <div
              className="flex items-center gap-1.5 rounded-full border px-2.5 py-1"
              style={{
                borderColor: `${accentColor}35`,
                background: `${accentColor}10`,
              }}
            >
              <div className="h-1.5 w-1.5 rounded-full" style={{ background: accentColor }} />
              <span
                className="font-mono text-[10px] uppercase tracking-widest"
                style={{ color: accentColor }}
              >
                {strategy.position} Side
              </span>
            </div>
            <IntakeRowIndicator rows={strategy.intakeRows} color={accentColor} />
          </div>

          {/* Title */}
          <div className="flex items-baseline gap-3">
            <h3 className="font-display text-3xl font-bold text-white sm:text-4xl">
              {strategy.label}
            </h3>
            <div
              className="font-display text-5xl font-bold leading-none sm:text-6xl"
              style={{ color: accentColor, opacity: 0.15 }}
            >
              {strategy.totalPoints}
            </div>
          </div>
          <p className="mt-1 font-mono text-xs text-white/40">{strategy.variant}</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/50">
            {strategy.tagline}
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div
        className="grid grid-cols-3 divide-x border-x"
        style={{ borderColor: `${accentColor}15` }}
      >
        {strategy.stats.map((s) => (
          <div
            key={s.label}
            className="px-4 py-3 text-center"
            style={{ borderColor: `${accentColor}12` }}
          >
            <div
              className="font-display text-xl font-bold"
              style={{ color: accentColor }}
            >
              {s.value}
            </div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-white/25">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Step breakdown */}
      <div
        className="flex-1 overflow-hidden rounded-b-2xl border-x border-b p-5"
        style={{ borderColor: `${accentColor}15` }}
      >
        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/25">
          Routine Sequence
        </div>
        <div className="space-y-0">
          {strategy.steps.map((step, i) => (
            <div key={i} className="flex gap-3 py-2">
              {/* Step index + connector */}
              <div className="flex flex-col items-center">
                <div
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[8px] font-bold font-mono"
                  style={{ background: `${accentColor}18`, color: accentColor, border: `1px solid ${accentColor}30` }}
                >
                  {i + 1}
                </div>
                {i < strategy.steps.length - 1 && (
                  <div
                    className="mt-1 h-full w-px flex-1"
                    style={{ background: `${accentColor}15` }}
                  />
                )}
              </div>

              {/* Step content */}
              <div className="pb-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="font-mono text-[9px] uppercase tracking-widest"
                    style={{ color: accentColor, opacity: 0.7 }}
                  >
                    {step.phase}
                  </span>
                  <span className="text-xs text-white/70">{step.action}</span>
                </div>
                {step.note && (
                  <div className="mt-0.5 font-mono text-[9px] text-white/25">{step.note}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FIELD DIAGRAM — now a strategy card carousel
// ─────────────────────────────────────────────────────────────────────────────

const SWIPE_THRESHOLD = 50

export function FieldDiagram() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const prefersReduced = useReducedMotion()

  const active = STRATEGIES[activeIndex]!

  const go = (next: number) => {
    setDirection(next > activeIndex ? 1 : -1)
    setActiveIndex(next)
  }

  const prev = () => go(activeIndex === 0 ? STRATEGIES.length - 1 : activeIndex - 1)
  const next = () => go(activeIndex === STRATEGIES.length - 1 ? 0 : activeIndex + 1)

  // Pointer/touch drag tracking
  const dragStart = { x: 0 }

  const slideVariants = {
    enter: (dir: number) => ({
      x: prefersReduced ? 0 : dir * 60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: prefersReduced ? 0 : dir * -60,
      opacity: 0,
    }),
  }

  return (
    <div className="w-full">
      {/* Tab switcher — pill row */}
      <div className="mb-5 flex flex-wrap gap-2">
        {STRATEGIES.map((s, i) => (
          <button
            key={s.id}
            id={`auto-strategy-tab-${s.id}`}
            aria-label={`Select strategy: ${s.label} ${s.variant}`}
            aria-selected={i === activeIndex}
            onClick={() => go(i)}
            className="group relative overflow-hidden rounded-full border px-3 py-1.5 text-left transition-all duration-300"
            style={{
              borderColor: i === activeIndex ? `${s.accentColor}40` : 'rgba(255,255,255,0.07)',
              background: i === activeIndex ? `${s.accentColor}10` : 'transparent',
            }}
          >
            <div className="flex items-center gap-2">
              <div
                className="h-1.5 w-1.5 rounded-full transition-opacity"
                style={{
                  background: s.accentColor,
                  opacity: i === activeIndex ? 1 : 0.3,
                }}
              />
              <span
                className="font-mono text-[10px] uppercase tracking-wider transition-colors"
                style={{
                  color: i === activeIndex ? s.accentColor : 'rgba(255,255,255,0.3)',
                }}
              >
                {s.label.replace('Auto ', '')}
                <span className="ml-1 opacity-50">pts</span>
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Card carousel */}
      <div
        className="relative overflow-hidden"
        onPointerDown={(e) => { dragStart.x = e.clientX }}
        onPointerUp={(e) => {
          const delta = e.clientX - dragStart.x
          if (Math.abs(delta) > SWIPE_THRESHOLD) {
            delta < 0 ? next() : prev()
          }
        }}
      >
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={active.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <StrategyCard strategy={active} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav controls */}
      <div className="mt-5 flex items-center justify-between">
        {/* Prev / Next */}
        <div className="flex items-center gap-2">
          <button
            id="auto-strategy-prev"
            aria-label="Previous autonomous strategy"
            onClick={prev}
            className="group flex h-8 w-8 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] transition-all hover:border-white/15 hover:bg-white/[0.06] active:scale-95"
          >
            <svg className="h-3.5 w-3.5 text-white/40 group-hover:text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            id="auto-strategy-next"
            aria-label="Next autonomous strategy"
            onClick={next}
            className="group flex h-8 w-8 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] transition-all hover:border-white/15 hover:bg-white/[0.06] active:scale-95"
          >
            <svg className="h-3.5 w-3.5 text-white/40 group-hover:text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center gap-1.5">
          {STRATEGIES.map((s, i) => (
            <button
              key={s.id}
              aria-label={`Go to strategy ${i + 1}`}
              onClick={() => go(i)}
              className="transition-all duration-300"
            >
              <div
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === activeIndex ? 20 : 6,
                  height: 6,
                  background: i === activeIndex ? active.accentColor : 'rgba(255,255,255,0.15)',
                }}
              />
            </button>
          ))}
        </div>

        {/* Counter */}
        <div className="font-mono text-[10px] uppercase tracking-widest text-white/20">
          {activeIndex + 1} / {STRATEGIES.length}
        </div>
      </div>
    </div>
  )
}
