import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown, GitBranch, Clock } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { SpringFadeIn } from '@/components/motion/SpringFadeIn'

interface ChangelogVersion {
  tag: string
  label: string
  date: string
  headline: string
  changes: string[]
  image?: string
  accentColor: string
}

const VERSIONS: ChangelogVersion[] = [
  {
    tag: 'V1.0',
    label: 'Genesis',
    date: 'Sep 2024',
    headline: 'The First Build',
    accentColor: '#666680',
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
    changes: [
      'Dual-flywheel launcher with PID velocity control',
      'Shoot-on-the-move: trajectory correction mid-launch',
      '21-ball autonomous with real-time OpenCV ball detection',
      'Dead-wheel odometry (3-wheel) for precision localization',
      'YOLO-based game element detection at 30fps on Control Hub',
    ],
  },
]

interface EntryProps {
  version: ChangelogVersion
  index: number
}

function ChangelogEntry({ version, index }: EntryProps) {
  const [open, setOpen] = useState(index === VERSIONS.length - 1)

  return (
    <SpringFadeIn delay={index * 0.12} direction="left">
      <GlassCard className="mb-4" glowColor={version.accentColor}>
        {/* Top accent */}
        <div
          className="absolute inset-x-0 top-0 h-[2px]"
          style={{
            background: `linear-gradient(90deg, ${version.accentColor}80, transparent)`,
          }}
          aria-hidden
        />

        <button
          className="flex w-full items-center justify-between px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric/50"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          id={`changelog-btn-${version.tag.toLowerCase()}`}
          aria-controls={`changelog-panel-${version.tag.toLowerCase()}`}
        >
          <div className="flex items-center gap-4">
            <span
              className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-widest"
              style={{
                backgroundColor: `${version.accentColor}20`,
                color: version.accentColor,
                border: `1px solid ${version.accentColor}40`,
              }}
            >
              <GitBranch className="h-3 w-3" aria-hidden />
              {version.tag}
            </span>
            <div>
              <p className="text-sm font-bold text-white">{version.headline}</p>
              <p className="flex items-center gap-1 text-[11px] text-white/30">
                <Clock className="h-3 w-3" aria-hidden />
                {version.date} · {version.label}
              </p>
            </div>
          </div>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronDown className="h-5 w-5 text-white/30" aria-hidden />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={`changelog-panel-${version.tag.toLowerCase()}`}
              role="region"
              aria-labelledby={`changelog-btn-${version.tag.toLowerCase()}`}
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="overflow-hidden"
            >
              <ul className="space-y-2 px-6 pb-6">
                {version.changes.map((change, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: version.accentColor }}
                      aria-hidden
                    />
                    {change}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </SpringFadeIn>
  )
}

/**
 * SeasonChangelog — V1 → V2 → Vectair build progression accordion.
 * Used on the Team page to show robot evolution with animated height transitions.
 */
export function SeasonChangelog() {
  return (
    <section
      id="season-changelog"
      className="relative z-10 py-16"
      aria-label="Season build changelog"
    >
      <div className="container mx-auto px-6">
        <SpringFadeIn>
          <div className="mb-10">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.3em] text-brand-electric">
              Engineering History
            </span>
            <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">
              V1 → V2 → Vectair
            </h2>
            <p className="mt-3 max-w-lg text-text-muted">
              Every major revision documented — what broke, what we fixed, and what we shipped.
            </p>
          </div>
        </SpringFadeIn>

        <div className="max-w-2xl">
          {VERSIONS.map((version, i) => (
            <ChangelogEntry key={version.tag} version={version} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
