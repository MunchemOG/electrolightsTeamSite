import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { OUTREACH_TIMELINE, type OutreachEvent } from '@/lib/constants'

// ─────────────────────────────────────────────────────────────────────────────
// IMPACT TIMELINE
// Mechanical lock-in scroll timeline. Each milestone triggers a visual lock
// with a CLACK audio cue via Web Audio API when scrolled into view.
// ─────────────────────────────────────────────────────────────────────────────

const TYPE_ICONS: Record<string, string> = {
  workshop: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25',
  mentoring: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z',
  camp: 'M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5z',
  competition: 'M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.003 6.003 0 01-5.54 0',
  milestone: 'M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5',
}

const TYPE_COLORS: Record<string, string> = {
  workshop: '#00d4ff',
  mentoring: '#0044ff',
  camp: '#34d399',
  competition: '#ff5e00',
  milestone: '#a78bfa',
}


// ─────────────────────────────────────────────────────────────────────────────
// TIMELINE ENTRY COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function TimelineEntry({
  event,
  index,
  isLast,
}: {
  event: OutreachEvent
  index: number
  isLast: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' })
  const prefersReduced = useReducedMotion()
  const isRight = index % 2 === 1
  const color = TYPE_COLORS[event.type] || '#0044ff'
  const iconPath = TYPE_ICONS[event.type] || TYPE_ICONS.workshop


  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00')
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  return (
    <div
      ref={ref}
      className={`relative flex ${isRight ? 'flex-row-reverse' : ''} items-start gap-6 md:gap-12`}
    >
      {/* Card */}
      <motion.div
        className={`relative w-full overflow-hidden rounded-2xl md:w-[calc(50%-32px)] ${
          isRight ? 'text-right md:text-left' : ''
        }`}
        style={{
          background: `linear-gradient(135deg, ${color}08 0%, transparent 60%), #080812`,
          border: `1px solid ${color}18`,
          boxShadow: isInView ? `0 0 30px ${color}08` : 'none',
        }}
        initial={
          prefersReduced
            ? { opacity: 0 }
            : { opacity: 0, x: isRight ? 60 : -60, scale: 0.95 }
        }
        animate={
          isInView
            ? { opacity: 1, x: 0, scale: 1 }
            : prefersReduced
              ? { opacity: 0 }
              : { opacity: 0, x: isRight ? 60 : -60, scale: 0.95 }
        }
        transition={{
          duration: 0.6,
          delay: 0.1,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {/* Top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: `linear-gradient(to right, transparent, ${color}, transparent)`,
            opacity: isInView ? 1 : 0,
            transition: 'opacity 0.5s',
          }}
        />

        <div className="p-5 sm:p-6">
          {/* Header row */}
          <div className="mb-3 flex items-center gap-3">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
              style={{
                background: `${color}15`,
                border: `1px solid ${color}25`,
              }}
            >
              <svg
                className="h-4 w-4"
                style={{ color }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={iconPath!} />
              </svg>
            </div>
            <div>
              <div
                className="text-[9px] font-black uppercase tracking-[0.4em]"
                style={{ color }}
              >
                {event.type}
              </div>
              <div className="font-mono text-[10px] text-white/25">
                {formatDate(event.date)}
              </div>
            </div>
            {event.metric && (
              <div
                className="ml-auto rounded-full px-3 py-1"
                style={{
                  background: `${color}10`,
                  border: `1px solid ${color}20`,
                }}
              >
                <span className="text-[10px] font-bold" style={{ color }}>
                  {event.metric}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <h3 className="mb-2 text-base font-black text-white sm:text-lg">
            {event.title}
          </h3>
          <p className="text-xs leading-relaxed text-white/40 sm:text-sm">
            {event.description}
          </p>
        </div>

        {/* Lock-in flash effect */}
        {isInView && !prefersReduced && (
          <motion.div
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ background: `${color}10` }}
          />
        )}
      </motion.div>

      {/* Center dot + connector line (desktop timeline spine) */}
      <div className="absolute left-1/2 hidden -translate-x-1/2 md:flex md:flex-col md:items-center">
        {/* Dot */}
        <motion.div
          className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full"
          style={{
            background: isInView ? color : 'rgba(255,255,255,0.08)',
            boxShadow: isInView ? `0 0 16px ${color}50` : 'none',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="h-2 w-2 rounded-full bg-white/80" />
          {/* Pulse ring on lock-in */}
          {isInView && !prefersReduced && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: `2px solid ${color}` }}
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            />
          )}
        </motion.div>

        {/* Vertical line to next */}
        {!isLast && (
          <div
            className="w-px flex-1"
            style={{
              background: `linear-gradient(to bottom, ${color}30, rgba(255,255,255,0.05))`,
              minHeight: 60,
            }}
          />
        )}
      </div>

      {/* Spacer for opposite side (desktop) */}
      <div className="hidden w-[calc(50%-32px)] md:block" />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// IMPACT TIMELINE CONTAINER
// ─────────────────────────────────────────────────────────────────────────────

export function ImpactTimeline() {
  return (
    <div className="relative">
      {/* Vertical spine (desktop only) */}
      <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 hidden w-px -translate-x-1/2 md:block">
        <div className="h-full w-full bg-gradient-to-b from-white/5 via-white/5 to-transparent" />
      </div>

      <div className="space-y-8 md:space-y-0">
        {OUTREACH_TIMELINE.map((event, i) => (
          <TimelineEntry
            key={event.id}
            event={event}
            index={i}
            isLast={i === OUTREACH_TIMELINE.length - 1}
          />
        ))}
      </div>
    </div>
  )
}
