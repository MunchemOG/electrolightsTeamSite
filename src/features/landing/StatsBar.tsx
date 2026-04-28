import { useRef, useEffect, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useTeamQuickStats, useMatchResults } from '@/hooks/useMatches'
import { TEAM_STATS } from '@/lib/constants'

interface StatItem {
  label: string
  value: number | string
  suffix?: string
  prefix?: string
}

function useOdometer(target: number, isVisible: boolean, duration = 2000) {
  const [current, setCurrent] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!isVisible || typeof target !== 'number') return

    const startTime = performance.now()
    const isDecimal = target % 1 !== 0

    function tick() {
      const elapsed = performance.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const value = eased * target

      setCurrent(isDecimal ? parseFloat(value.toFixed(1)) : Math.floor(value))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isVisible, target, duration])

  return current
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const odometerValue = useOdometer(typeof stat.value === 'number' ? stat.value : 0, isVisible)
  const displayed = typeof stat.value === 'string' 
    ? stat.value 
    : (prefersReduced ? stat.value : odometerValue)

  return (
    <div
      ref={ref}
      className="group relative flex flex-col items-center gap-2 px-6 py-8 text-center"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {index > 0 && (
        <div className="absolute left-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-glass md:block" />
      )}

      <span 
        className={`font-black tracking-tight text-white ${
          typeof displayed === 'string' ? 'text-xl md:text-2xl' : 'text-4xl md:text-5xl'
        }`}
        style={{ textShadow: '0 0 30px rgba(0, 162, 255, 0.4)' }}
      >
        {stat.prefix}
        {typeof displayed === 'number' 
          ? (displayed % 1 !== 0 ? displayed.toFixed(1) : displayed.toLocaleString()) 
          : displayed}
        {stat.suffix && <span className="ml-1 text-lg font-semibold text-brand-electric">{stat.suffix}</span>}
      </span>

      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
        {stat.label}
      </span>
    </div>
  )
}

export function StatsBar() {
  const { data: quickStats } = useTeamQuickStats()
  const { data: matches } = useMatchResults()
  
  const stats = quickStats?.teamByNumber?.quickStats
  const fallback = TEAM_STATS

  const dynamicStats: StatItem[] = [
    { 
      label: 'OPR', 
      value: stats?.tot?.value ?? fallback.opr, 
      prefix: '' 
    },
    { 
      label: 'Premier Event', 
      value: 'Michiana 2026', 
      prefix: '' 
    },
    { 
      label: 'Matches Played', 
      value: matches?.length ?? fallback.matchesPlayed, 
      prefix: '' 
    },
    { 
      label: 'Autonomous Record', 
      value: 21, 
      suffix: '-ball auto' 
    },
  ]

  return (
    <section
      id="stats-bar"
      className="relative z-10 border-y border-glass bg-bg-surface/40 backdrop-blur-xl"
    >
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4">
        {dynamicStats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>
    </section>
  )
}
