import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useMatchResults, useTeamQuickStats } from '@/hooks/useMatches'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { TEAM_STATS } from '@/lib/constants'

// ─────────────────────────────────────────────────────────────────────────────
// ODOMETER — animates a number from 0 to target on mount
// ─────────────────────────────────────────────────────────────────────────────

function Odometer({
  value,
  decimals = 0,
  duration = 1800,
  delay = 0,
}: {
  value: number
  decimals?: number
  duration?: number
  delay?: number
}) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (!isInView) return
    if (prefersReduced) {
      setDisplay(value)
      return
    }

    let startTime: number | null = null
    let rafId: number

    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime - delay

      if (elapsed < 0) {
        rafId = requestAnimationFrame(tick)
        return
      }

      const progress = Math.min(elapsed / duration, 1)
      // Ease out expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setDisplay(eased * value)

      if (progress < 1) {
        rafId = requestAnimationFrame(tick)
      } else {
        setDisplay(value)
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [isInView, value, duration, delay, prefersReduced])

  const formatted =
    decimals > 0
      ? display.toFixed(decimals)
      : Math.round(display).toLocaleString()

  return <span ref={ref}>{formatted}</span>
}

// ─────────────────────────────────────────────────────────────────────────────
// STAT TILE
// ─────────────────────────────────────────────────────────────────────────────

interface StatTileProps {
  label: string
  value: number
  decimals?: number
  unit?: string
  rank?: number
  color: string
  delay?: number
  isLive?: boolean
}

function StatTile({
  label,
  value,
  decimals = 0,
  unit,
  rank,
  color,
  delay = 0,
  isLive = false,
}: StatTileProps) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border bg-[#030712]/80 p-6 backdrop-blur-xl"
      style={{ borderColor: `${color}25` }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Corner glow */}
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20 blur-2xl transition-all duration-700 group-hover:opacity-40"
        style={{ background: color }}
      />

      {/* Scanline sweep on hover */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div
          className="scanline absolute h-[2px] w-full opacity-20"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        />
      </div>

      {/* Live indicator */}
      {isLive && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative flex h-2 w-2">
            <span
              className="pulse-ring absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ background: color }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ background: color }}
            />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
            Live
          </span>
        </div>
      )}

      {/* Label */}
      <div className="mb-1 font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">
        {label}
      </div>

      {/* Value */}
      <div className="flex items-end gap-1.5">
        <span
          className="font-display text-4xl font-bold leading-none tabular-nums"
          style={{ color }}
        >
          <Odometer value={value} decimals={decimals} delay={delay * 1000} />
        </span>
        {unit && (
          <span className="mb-1 font-mono text-sm text-white/30">{unit}</span>
        )}
      </div>

      {/* Rank badge */}
      {rank !== undefined && (
        <div className="mt-3 flex items-center gap-1.5">
          <div
            className="h-px flex-1 opacity-20"
            style={{ background: color }}
          />
          <span className="font-mono text-[10px] text-white/30">
            RANK #{rank}
          </span>
        </div>
      )}
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function OPRDisplay() {
  const { data, isLoading, isError } = useTeamQuickStats()
  const { data: matches } = useMatchResults()

  const stats = data?.teamByNumber?.quickStats
  const fallback = TEAM_STATS

  // Use live data if available, fall back to hardcoded constants
  // In 2025 schema, 'tot' is the total OPR/expected points
  const opr = stats?.tot?.value ?? fallback.opr
  const autoOpr = stats?.auto?.value ?? fallback.autoAvg
  const dcOpr = stats?.dc?.value ?? (fallback.totalPoints - fallback.autoAvg)
  
  const oprRank = stats?.tot?.rank
  const autoRank = stats?.auto?.rank

  // Use the actual number of matches we've fetched for the count
  const matchesCount = matches?.length ?? fallback.matchesPlayed ?? 36

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="mb-1 font-mono text-[11px] uppercase tracking-[0.3em] text-white/30">
            Season Telemetry / 2025–26 DECODE
          </div>
          <h2 className="font-display text-3xl font-bold text-white">
            Performance Analytics
          </h2>
        </div>

        {/* API status badge */}
        <div
          className="flex items-center gap-2 rounded-full border px-3 py-1.5"
          style={{
            borderColor: isError ? '#8B000040' : '#0044ff30',
            background: isError ? '#8B000010' : '#0044ff08',
          }}
        >
          {isLoading ? (
            <>
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/30" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
                Fetching
              </span>
            </>
          ) : isError ? (
            <>
              <div className="h-1.5 w-1.5 rounded-full bg-destructive-base" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
                Cached
              </span>
            </>
          ) : (
            <>
              <div className="relative flex h-1.5 w-1.5">
                <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-brand-electric opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-electric" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-brand-electric/70">
                FTCScout Live
              </span>
            </>
          )}
        </div>
      </div>

      {/* Stat grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile
          label="OPR (Total)"
          value={opr}
          decimals={2}
          rank={oprRank}
          color="#0044ff"
          delay={0}
          isLive={!isError && !isLoading}
        />
        <StatTile
          label="Auto OPR"
          value={autoOpr}
          decimals={2}
          rank={autoRank}
          color="#00d4ff"
          delay={0.1}
          isLive={!isError && !isLoading}
        />
        <StatTile
          label="Teleop OPR"
          value={dcOpr}
          decimals={2}
          color="#ff5e00"
          delay={0.2}
          isLive={!isError && !isLoading}
        />
        <StatTile
          label="Matches Played"
          value={matchesCount}
          color="#7c3aed"
          delay={0.3}
          isLive={!isError && !isLoading}
        />
      </div>
    </div>
  )
}
