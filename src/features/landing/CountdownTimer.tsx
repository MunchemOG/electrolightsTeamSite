import { useState, useEffect, useMemo } from 'react'
import { CalendarClock, MapPin } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'

/** Next upcoming event (hardcoded for Phase 1, Supabase in Phase 3) */
const NEXT_EVENT = {
  name: 'FTC World Championship',
  location: 'Houston, TX',
  date: new Date('2026-04-22T09:00:00-05:00'),
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calcTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now())
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl font-black tabular-nums tracking-tight text-white md:text-4xl lg:text-5xl">
        {String(value).padStart(2, '0')}
      </span>
      <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.25em] text-text-muted">
        {label}
      </span>
    </div>
  )
}

/**
 * "Next Event" countdown timer.
 * Ticks every second. Collapses to a single "LIVE NOW" badge if event has started.
 */
export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calcTimeLeft(NEXT_EVENT.date))

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calcTimeLeft(NEXT_EVENT.date))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const isLive = useMemo(
    () => timeLeft.days + timeLeft.hours + timeLeft.minutes + timeLeft.seconds === 0,
    [timeLeft],
  )

  return (
    <GlassCard className="mx-auto w-full max-w-2xl px-8 py-8" glowColor="#0044ff">
      {/* Header */}
      <div className="mb-6 flex flex-col items-center gap-2 text-center">
        <div className="flex items-center gap-2 text-brand-electric">
          <CalendarClock className="h-4 w-4" aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-[0.3em]">Next Event</span>
        </div>
        <h3 className="text-lg font-bold text-white md:text-xl">{NEXT_EVENT.name}</h3>
        <div className="flex items-center gap-1.5 text-xs text-text-muted">
          <MapPin className="h-3 w-3" aria-hidden="true" />
          {NEXT_EVENT.location}
        </div>
      </div>

      {/* Countdown or LIVE badge */}
      {isLive ? (
        <div className="flex justify-center">
          <span className="animate-pulse rounded-full bg-brand-orange/20 px-6 py-2 text-sm font-bold uppercase tracking-widest text-brand-orange">
            🔴 Live Now
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-4 md:gap-8">
          <TimeBlock value={timeLeft.days} label="Days" />
          <span className="mt-[-1rem] text-2xl font-light text-text-muted/40">:</span>
          <TimeBlock value={timeLeft.hours} label="Hrs" />
          <span className="mt-[-1rem] text-2xl font-light text-text-muted/40">:</span>
          <TimeBlock value={timeLeft.minutes} label="Min" />
          <span className="mt-[-1rem] text-2xl font-light text-text-muted/40">:</span>
          <TimeBlock value={timeLeft.seconds} label="Sec" />
        </div>
      )}
    </GlassCard>
  )
}
