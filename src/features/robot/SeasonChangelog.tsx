import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { GitBranch, Clock, ChevronRight, Cpu, Wrench, Zap } from 'lucide-react'
import { SpringFadeIn } from '@/components/motion/SpringFadeIn'

interface ChangelogVersion {
  tag: string
  label: string
  date: string
  headline: string
  changes: string[]
  accentColor: string
  icon: typeof Cpu
  statLabel: string
  statValue: string
}

const VERSIONS: ChangelogVersion[] = [
  {
    tag: 'V1.0',
    label: 'Genesis',
    date: 'Sep 2024',
    headline: 'The First Build',
    accentColor: '#666680',
    icon: Wrench,
    statLabel: 'Drive wheels',
    statValue: '4',
    changes: [
      'Basic 4-wheel drive chassis — polycarb frame',
      'Manual intake with single roller',
      'Fixed launcher angle (no adjustment)',
      'Simple tele-op-only control loop',
    ],
  },
  {
    tag: 'V2.0',
    label: 'Reinforced',
    date: 'Nov 2024',
    headline: 'Structural Overhaul',
    accentColor: '#00d4ff',
    icon: Cpu,
    statLabel: 'Weight reduction',
    statValue: '−40%',
    changes: [
      'Aluminum extrusion frame — 40% weight reduction',
      'Dual roller V-shaped intake (99% pick-up rate)',
      'Adjustable launcher angles via servo',
      'Field-centric drive mode with gyro correction',
      'RoadRunner path following integration',
    ],
  },
  {
    tag: 'VECTAIR',
    label: 'Current Season',
    date: 'Jan 2026',
    headline: 'Shoot-on-the-Move',
    accentColor: '#ff5e00',
    icon: Zap,
    statLabel: 'Auto balls',
    statValue: '21',
    changes: [
      'Dual-flywheel launcher with PID velocity control',
      'Shoot-on-the-move: trajectory correction mid-launch',
      '21-ball autonomous with real-time OpenCV ball detection',
      'Dead-wheel odometry (3-wheel) for precision localization',
      'YOLO-based game element detection at 30fps on Control Hub',
    ],
  },
]

export function SeasonChangelog() {
  const [active, setActive] = useState(VERSIONS.length - 1)

  return (
    <section
      id="season-changelog"
      className="relative z-10 py-24"
      aria-label="Season build changelog"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden />

      <div className="container mx-auto px-6">
        <SpringFadeIn>
          <div className="mb-14 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.35em] text-white/40">
              Engineering History
            </span>
            <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
              V1 → V2 → Vectair
            </h2>
            <p className="mt-3 text-text-muted max-w-lg mx-auto">
              Every major revision — what broke, what we fixed, and what we shipped.
            </p>
          </div>
        </SpringFadeIn>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          {/* Version selector tabs */}
          <SpringFadeIn direction="left">
            <div className="flex flex-row gap-3 lg:flex-col">
              {VERSIONS.map((v, i) => {
                const Icon = v.icon
                const isActive = i === active
                return (
                  <button
                    key={v.tag}
                    onClick={() => setActive(i)}
                    id={`changelog-tab-${v.tag.toLowerCase()}`}
                    aria-selected={isActive}
                    aria-controls={`changelog-panel-${v.tag.toLowerCase()}`}
                    className="relative flex flex-1 lg:flex-none items-center gap-4 rounded-2xl border px-4 py-4 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2"
                    style={{
                      borderColor: isActive ? v.accentColor + '50' : 'rgba(255,255,255,0.06)',
                      background: isActive
                        ? `linear-gradient(135deg, ${v.accentColor}0f, rgba(15,23,42,0.9))`
                        : 'rgba(15,23,42,0.5)',
                      backdropFilter: 'blur(16px)',
                      boxShadow: isActive ? `0 0 28px ${v.accentColor}14` : 'none',
                    }}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="tab-indicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-full"
                        style={{ height: '60%', background: v.accentColor }}
                      />
                    )}
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        background: `${v.accentColor}18`,
                        border: `1px solid ${v.accentColor}30`,
                      }}
                    >
                      <Icon className="h-4 w-4" style={{ color: v.accentColor }} aria-hidden />
                    </div>
                    <div className="hidden lg:block">
                      <p
                        className="text-xs font-black uppercase tracking-widest"
                        style={{ color: isActive ? v.accentColor : 'rgba(255,255,255,0.3)' }}
                      >
                        {v.tag}
                      </p>
                      <p className="text-[11px] text-white/30">{v.date}</p>
                    </div>
                    <span className="lg:hidden text-xs font-black" style={{ color: isActive ? v.accentColor : 'rgba(255,255,255,0.3)' }}>
                      {v.tag}
                    </span>
                  </button>
                )
              })}

              {/* Connecting timeline line (desktop only) */}
              <div
                className="hidden lg:block mx-auto w-px flex-1"
                style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.05), transparent)', minHeight: 32 }}
                aria-hidden
              />
            </div>
          </SpringFadeIn>

          {/* Panel */}
          <div>
            <AnimatePresence mode="wait">
              {VERSIONS.map((v, i) => {
                if (i !== active) return null
                const Icon = v.icon
                return (
                  <motion.div
                    key={v.tag}
                    id={`changelog-panel-${v.tag.toLowerCase()}`}
                    role="region"
                    aria-labelledby={`changelog-tab-${v.tag.toLowerCase()}`}
                    initial={{ opacity: 0, x: 24, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: -24, filter: 'blur(4px)' }}
                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-2xl border overflow-hidden"
                    style={{
                      borderColor: v.accentColor + '25',
                      background: `linear-gradient(145deg, ${v.accentColor}06 0%, rgba(15,23,42,0.95) 60%)`,
                      backdropFilter: 'blur(24px)',
                      boxShadow: `0 0 60px ${v.accentColor}0a, inset 0 1px 0 ${v.accentColor}15`,
                    }}
                  >
                    {/* Top accent */}
                    <div
                      className="h-[2px]"
                      style={{ background: `linear-gradient(90deg, ${v.accentColor}, ${v.accentColor}00)` }}
                      aria-hidden
                    />

                    <div className="p-8">
                      {/* Header row */}
                      <div className="flex items-start justify-between gap-4 mb-6">
                        <div className="flex items-center gap-4">
                          <div
                            className="flex h-12 w-12 items-center justify-center rounded-2xl"
                            style={{ background: `${v.accentColor}18`, border: `1px solid ${v.accentColor}35` }}
                          >
                            <Icon className="h-5 w-5" style={{ color: v.accentColor }} aria-hidden />
                          </div>
                          <div>
                            <h3 className="text-xl font-black text-white">{v.headline}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <GitBranch className="h-3 w-3" style={{ color: v.accentColor }} aria-hidden />
                              <span className="text-xs font-bold" style={{ color: v.accentColor }}>{v.tag}</span>
                              <span className="text-white/20">·</span>
                              <Clock className="h-3 w-3 text-white/20" aria-hidden />
                              <span className="text-xs text-white/30">{v.date} · {v.label}</span>
                            </div>
                          </div>
                        </div>

                        {/* Stat badge */}
                        <div
                          className="hidden md:flex flex-col items-center rounded-2xl border px-5 py-3 text-center"
                          style={{
                            borderColor: v.accentColor + '30',
                            background: `${v.accentColor}08`,
                          }}
                        >
                          <span className="text-2xl font-black" style={{ color: v.accentColor }}>{v.statValue}</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-white/30">{v.statLabel}</span>
                        </div>
                      </div>

                      {/* Change list */}
                      <ul className="space-y-3">
                        {v.changes.map((change, ci) => (
                          <motion.li
                            key={ci}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: ci * 0.06, duration: 0.3 }}
                            className="flex items-start gap-3 text-sm text-white/60"
                          >
                            <ChevronRight
                              className="mt-0.5 h-4 w-4 shrink-0"
                              style={{ color: v.accentColor + '80' }}
                              aria-hidden
                            />
                            {change}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
