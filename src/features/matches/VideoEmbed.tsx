import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// Competition YouTube footage — update these IDs with real match videos
const VIDEOS = [
  {
    id: 'v1',
    youtubeId: 'dQw4w9WgXcQ', // placeholder — replace with real match footage
    title: 'Texas State Championship — Q35',
    event: 'TX State',
    label: 'State Finals',
    highlight: '21-Ball Auto',
    color: '#0044ff',
  },
  {
    id: 'v2',
    youtubeId: 'dQw4w9WgXcQ', // placeholder
    title: 'Lone Star Regional — Semifinal 2',
    event: 'Lone Star Regional',
    label: 'Innovate Award',
    highlight: 'Shoot-on-the-Move',
    color: '#00d4ff',
  },
  {
    id: 'v3',
    youtubeId: 'dQw4w9WgXcQ', // placeholder
    title: 'Michiana Qualifier — Q18',
    event: 'Michiana QE',
    label: 'High Score: 253',
    highlight: 'Season Record',
    color: '#ff5e00',
  },
]

interface VideoTabProps {
  video: (typeof VIDEOS)[number]
  isActive: boolean
  onClick: () => void
}

function VideoTab({ video, isActive, onClick }: VideoTabProps) {
  return (
    <button
      id={`video-tab-${video.id}`}
      aria-label={`Select video: ${video.title}`}
      aria-selected={isActive}
      role="tab"
      onClick={onClick}
      className="group relative w-full overflow-hidden rounded-xl border p-3 text-left transition-all duration-300"
      style={{
        borderColor: isActive ? `${video.color}40` : 'rgba(255,255,255,0.06)',
        background: isActive
          ? `${video.color}0a`
          : 'rgba(3,7,18,0.6)',
      }}
    >
      {/* Active indicator line */}
      {isActive && (
        <motion.div
          layoutId="video-tab-indicator"
          className="absolute inset-y-0 left-0 w-0.5 rounded-full"
          style={{ background: video.color }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        />
      )}

      <div className="pl-2">
        <div
          className="mb-0.5 font-mono text-[10px] uppercase tracking-widest transition-colors"
          style={{ color: isActive ? video.color : 'rgba(255,255,255,0.3)' }}
        >
          {video.label}
        </div>
        <div
          className="text-xs font-medium leading-snug transition-colors"
          style={{ color: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)' }}
        >
          {video.event}
        </div>
        <div className="mt-1.5 inline-flex items-center gap-1 rounded-md px-2 py-0.5"
          style={{
            background: `${video.color}15`,
            border: `1px solid ${video.color}25`,
          }}
        >
          <span
            className="font-mono text-[9px] uppercase tracking-widest"
            style={{ color: video.color }}
          >
            {video.highlight}
          </span>
        </div>
      </div>
    </button>
  )
}

export function VideoEmbed() {
  const [activeId, setActiveId] = useState(VIDEOS[0]!.id)
  const prefersReduced = useReducedMotion()
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const active = VIDEOS.find((v) => v.id === activeId)!

  const handleSelect = (id: string) => {
    if ('startViewTransition' in document && !prefersReduced) {
      ;(document as Document & { startViewTransition: (fn: () => void) => void }).startViewTransition(
        () => setActiveId(id),
      )
    } else {
      setActiveId(id)
    }
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_220px]">
        {/* Main video player */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={prefersReduced ? {} : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={prefersReduced ? {} : { opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-2xl border"
              style={{ borderColor: `${active.color}25` }}
            >
              {/* Video meta header */}
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: `1px solid ${active.color}15`, background: `${active.color}06` }}
              >
                <div>
                  <div
                    className="font-mono text-[10px] uppercase tracking-widest"
                    style={{ color: active.color }}
                  >
                    {active.label}
                  </div>
                  <div className="font-medium text-sm text-white/70">{active.title}</div>
                </div>
              </div>

              {/* 16:9 iframe container */}
              <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                <iframe
                  ref={iframeRef}
                  src={`https://www.youtube.com/embed/${active.youtubeId}?rel=0&modestbranding=1&color=white`}
                  title={active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Video selector tabs */}
        <div className="flex flex-col gap-2 lg:pt-0">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/25">
            Competition Footage
          </div>
          {VIDEOS.map((v) => (
            <VideoTab
              key={v.id}
              video={v}
              isActive={v.id === activeId}
              onClick={() => handleSelect(v.id)}
            />
          ))}

          {/* Attribution note */}
          <div className="mt-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
            <p className="font-mono text-[9px] leading-relaxed text-white/20">
              Match footage recorded by Electrolights Media. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
