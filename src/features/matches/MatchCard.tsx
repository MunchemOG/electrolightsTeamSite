import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { type MatchResult } from '@/lib/ftcscout'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

interface MatchCardProps {
  match: MatchResult
  index: number
  isSelected: boolean
  onClick: () => void
}

const OUTCOME_CONFIG = {
  W: {
    label: 'WIN',
    color: '#00d4ff',
    bg: 'rgba(0,212,255,0.06)',
    border: 'rgba(0,212,255,0.2)',
    glow: '0 0 30px rgba(0,212,255,0.15)',
  },
  L: {
    label: 'LOSS',
    color: '#ff5e00',
    bg: 'rgba(255,94,0,0.06)',
    border: 'rgba(255,94,0,0.2)',
    glow: '0 0 30px rgba(255,94,0,0.12)',
  },
  T: {
    label: 'TIE',
    color: '#94a3b8',
    bg: 'rgba(148,163,184,0.06)',
    border: 'rgba(148,163,184,0.15)',
    glow: 'none',
  },
} as const

// Thin segmented progress bar showing score breakdown
function ScoreBar({
  auto,
  teleop,
  endgame,
  total,
  color,
}: {
  auto: number
  teleop: number
  endgame: number
  total: number
  color: string
}) {
  const autoPct = total > 0 ? (auto / total) * 100 : 0
  const telePct = total > 0 ? (teleop / total) * 100 : 0
  const endgamePct = total > 0 ? (endgame / total) * 100 : 0

  return (
    <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-white/5">
      <motion.div
        className="h-full"
        style={{ background: color, opacity: 0.9 }}
        initial={{ width: 0 }}
        animate={{ width: `${autoPct}%` }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="h-full w-px bg-black/50" />
      <motion.div
        className="h-full"
        style={{ background: color, opacity: 0.6 }}
        initial={{ width: 0 }}
        animate={{ width: `${telePct}%` }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="h-full w-px bg-black/50" />
      <motion.div
        className="h-full"
        style={{ background: color, opacity: 0.35 }}
        initial={{ width: 0 }}
        animate={{ width: `${endgamePct}%` }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}

export function MatchCard({ match, index, isSelected, onClick }: MatchCardProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })
  const prefersReduced = useReducedMotion()

  const cfg = OUTCOME_CONFIG[match.outcome]
  const ourData = match.ourAlliance === 'red' ? match.red : match.blue
  const scoreDelta = match.ourScore - match.theirScore

  const alliancePartner =
    match.ourAlliance === 'red'
      ? match.red.team1?.number === 30686
        ? match.red.team2
        : match.red.team1
      : match.blue.team1?.number === 30686
        ? match.blue.team2
        : match.blue.team1

  // View Transitions API — graceful no-op if unsupported
  const handleClick = () => {
    if ('startViewTransition' in document && !prefersReduced) {
      ;(document as Document & { startViewTransition: (fn: () => void) => void }).startViewTransition(onClick)
    } else {
      onClick()
    }
  }

  return (
    <motion.button
      ref={ref}
      id={`match-card-${match.id}`}
      aria-label={`Match ${match.matchNum} — ${cfg.label} ${match.ourScore}-${match.theirScore}`}
      onClick={handleClick}
      className={cn(
        'group relative w-full overflow-hidden rounded-2xl border text-left transition-all duration-300',
        isSelected && 'ring-1',
      )}
      style={{
        borderColor: isSelected ? cfg.color : cfg.border,
        background: isSelected ? cfg.bg : 'rgba(3,7,18,0.7)',
        boxShadow: isSelected ? cfg.glow : 'none',
      }}
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.4), ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {/* Hover shimmer line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${cfg.color}60, transparent)` }}
      />

      <div className="flex items-center gap-4 px-4 py-3">
        {/* Match info: Number & Event */}
        <div className="w-16 shrink-0 text-left">
          <div className="font-display text-lg font-bold leading-none text-white/80">
            #{match.matchNum}
          </div>
          <div className="mt-1 font-mono text-[9px] uppercase tracking-wider text-white/20">
            {match.eventCode}
          </div>
        </div>

        {/* Vertical divider */}
        <div className="h-10 w-px shrink-0 bg-white/8" />
        {/* Outcome badge */}
        <div
          className="flex h-8 w-12 shrink-0 items-center justify-center rounded-lg"
          style={{ background: `${cfg.color}15`, border: `1px solid ${cfg.color}30` }}
        >
          <span
            className="font-mono text-xs font-bold tracking-wider"
            style={{ color: cfg.color }}
          >
            {cfg.label}
          </span>
        </div>

        {/* Score delta */}
        <div className="shrink-0 text-center">
          <div
            className="font-display text-2xl font-bold tabular-nums leading-none"
            style={{ color: cfg.color }}
          >
            {scoreDelta > 0 ? '+' : ''}{scoreDelta}
          </div>
          <div className="font-mono text-[9px] uppercase tracking-widest text-white/20">
            Margin
          </div>
        </div>

        {/* Score breakdown */}
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex items-baseline gap-1.5">
            <span className="font-display text-xl font-bold tabular-nums text-white">
              {match.ourScore}
            </span>
            <span className="font-mono text-xs text-white/30">vs</span>
            <span className="font-mono text-sm tabular-nums text-white/40">
              {match.theirScore}
            </span>
          </div>
          <ScoreBar
            auto={ourData.auto}
            teleop={ourData.teleop}
            endgame={ourData.endgame}
            total={match.ourScore}
            color={cfg.color}
          />
          <div className="mt-1.5 flex gap-3 font-mono text-[9px] uppercase tracking-widest text-white/20">
            <span>A {ourData.auto}</span>
            <span>T {ourData.teleop}</span>
            <span>E {ourData.endgame}</span>
          </div>
        </div>

        {/* Alliance partner */}
        <div className="hidden shrink-0 text-right sm:block">
          <div className="font-mono text-[9px] uppercase tracking-widest text-white/20">
            Partner
          </div>
          <div className="font-mono text-xs text-white/50">
            {alliancePartner ? `#${alliancePartner.number}` : '—'}
          </div>
        </div>

        {/* Alliance indicator */}
        <div className="shrink-0 flex flex-col items-center gap-1 opacity-40">
          <div className="font-mono text-[8px] uppercase tracking-tighter">
            {match.ourAlliance}
          </div>
          <div
            className="h-2 w-2 rounded-full"
            style={{
              background: match.ourAlliance === 'red' ? '#ef4444' : '#3b82f6',
              boxShadow: `0 0 6px ${match.ourAlliance === 'red' ? '#ef4444' : '#3b82f6'}`,
            }}
          />
        </div>
      </div>

      {/* Opponent teams — shown on select */}
      {isSelected && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="border-t px-4 py-3"
          style={{ borderColor: `${cfg.color}15` }}
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="mb-1.5 font-mono text-[9px] uppercase tracking-widest text-white/25">
                Red Alliance
              </div>
              <div className="space-y-0.5">
                {[match.red.team1, match.red.team2].filter(Boolean).map((t) => (
                  <div
                    key={t!.number}
                    className={cn(
                      'font-mono text-xs',
                      t!.number === 30686
                        ? 'font-bold text-white'
                        : 'text-white/40',
                    )}
                  >
                    #{t!.number} {t!.name}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-1.5 font-mono text-[9px] uppercase tracking-widest text-white/25">
                Blue Alliance
              </div>
              <div className="space-y-0.5">
                {[match.blue.team1, match.blue.team2].filter(Boolean).map((t) => (
                  <div
                    key={t!.number}
                    className={cn(
                      'font-mono text-xs',
                      t!.number === 30686
                        ? 'font-bold text-white'
                        : 'text-white/40',
                    )}
                  >
                    #{t!.number} {t!.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.button>
  )
}
