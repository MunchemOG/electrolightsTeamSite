import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { SpringFadeIn } from '@/components/motion/SpringFadeIn'
import { GlassCard } from '@/components/ui/GlassCard'
import { Play, Pause, SkipBack, FastForward, Rewind } from 'lucide-react'
import autoVideo from '@/assets/media/auto21.mp4'

interface SubsystemBlock {
  id: string
  label: string
  sub: string
  description: string
  accent: string
  stats: { key: string; value: string }[]
  imagePath: string
}

const SUBSYSTEMS: SubsystemBlock[] = [
  {
    id: 'intake',
    label: 'Intake System',
    sub: 'V-Shaped Dual Roller',
    description:
      'The intake uses two counter-rotating TPU rollers in a V-configuration, funneling game elements into the transfer channel with 99% reliability. 12 prototypes were tested before landing on this geometry.',
    accent: '#ff5e00',
    stats: [
      { key: 'Pick-up Rate', value: '99%' },
      { key: 'Cycle Time', value: '<200 ms' },
      { key: 'Roller Speed', value: '2,400 RPM' },
    ],
    imagePath: '/teamLogo.jpg',
  },
  {
    id: 'transfer',
    label: 'Transfer Mechanism',
    sub: 'Gravity-Assist Channel',
    description:
      'Elements captured by the intake ride a gravity-assist transfer tube into the launcher hopper. The angled channel maintains ring orientation throughout the handoff for consistent launch geometry.',
    accent: '#00d4ff',
    stats: [
      { key: 'Handoff Angle', value: '37°' },
      { key: 'Capacity', value: '3 rings queued' },
      { key: 'Sensor', value: 'Distance interrupt' },
    ],
    imagePath: '/teamLogo.jpg',
  },
  {
    id: 'launcher',
    label: 'Launcher',
    sub: 'Dual-Flywheel PID',
    description:
      'Two foam-contact flywheels spun by GoBILDA motors with a PIDF velocity controller. The controller stabilizes velocity within ±50 RPM before firing, enabling the shoot-on-the-move algorithm.',
    accent: '#0044ff',
    stats: [
      { key: 'Target RPM', value: '3,200' },
      { key: 'Accuracy', value: '94%' },
      { key: 'Angle Range', value: '35°–55°' },
    ],
    imagePath: '/teamLogo.jpg',
  },
]

function SubsystemCard({ block, index }: { block: SubsystemBlock; index: number }) {
  const [hover, setHover] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    setMouse({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 })
  }

  return (
    <SpringFadeIn delay={index * 0.12} direction={index % 2 === 0 ? 'left' : 'right'}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => { setHover(false); setMouse({ x: 0, y: 0 }) }}
        animate={{ rotateY: hover ? mouse.x * 10 : 0, rotateX: hover ? -mouse.y * 8 : 0 }}
        transition={{ type: 'spring', stiffness: 160, damping: 18 }}
        style={{ transformStyle: 'preserve-3d', perspective: 900 }}
      >
        <GlassCard glowColor={block.accent} className="p-0 overflow-hidden">
          {/* Top stripe */}
          <div className="h-1" style={{ background: `linear-gradient(90deg, ${block.accent}, ${block.accent}00)` }} aria-hidden />

          <div className="flex flex-col md:flex-row gap-0">
            {/* Image panel */}
            <div
              className="relative flex shrink-0 items-center justify-center p-4 md:w-52 md:p-6"
              style={{
                background: `radial-gradient(circle at center, ${block.accent}08 0%, transparent 70%)`,
                borderRight: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <img
                src={block.imagePath}
                alt={`${block.label} render`}
                className="h-full w-full object-contain drop-shadow-2xl transition-transform duration-500 ease-out"
                style={{
                  filter: `drop-shadow(0 0 12px ${block.accent}40)`,
                  transform: hover ? 'scale(1.05)' : 'scale(1)',
                }}
              />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-6">
              <span
                className="mb-1 text-[10px] font-bold uppercase tracking-widest"
                style={{ color: block.accent }}
              >
                {block.sub}
              </span>
              <h3 className="mb-3 text-lg font-black text-white">{block.label}</h3>
              <p className="mb-5 text-sm text-white/50 leading-relaxed">{block.description}</p>

              {/* Stats row */}
              <div className="mt-auto flex flex-wrap gap-4">
                {block.stats.map((s) => (
                  <div key={s.key} className="min-w-[80px]">
                    <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: block.accent + 'aa' }}>
                      {s.key}
                    </p>
                    <p className="text-base font-black text-white">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </SpringFadeIn>
  )
}

/** Apple-style scroll-scrub video player for the 21-ball auto */
export function AutoScrubSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })
  const [playing, setPlaying] = useState(false)
  const [videoProgress, setVideoProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  // sync playhead progress via scroll
  const progress = useTransform(scrollYProgress, [0.1, 0.9], [0, 100])

  useMotionValueEvent(progress, "change", (latest) => {
    if (videoRef.current && !playing && !isDragging) {
      const dur = videoRef.current.duration
      if (dur) {
        videoRef.current.currentTime = (latest / 100) * dur
      }
    }
  })

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (playing) {
      video.play().catch(() => setPlaying(false))
    } else {
      video.pause()
    }
  }, [playing])

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const curr = videoRef.current.currentTime
      const dur = videoRef.current.duration
      setCurrentTime(curr)
      if (dur) setVideoProgress((curr / dur) * 100)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const seek = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(Math.max(0, videoRef.current.currentTime + seconds), videoRef.current.duration || 0)
    }
  }

  const handleScrub = (clientX: number) => {
    if (!progressBarRef.current || !videoRef.current) return
    const rect = progressBarRef.current.getBoundingClientRect()
    const x = Math.min(Math.max(0, clientX - rect.left), rect.width)
    const percentage = x / rect.width
    const targetTime = percentage * (videoRef.current.duration || 0)
    videoRef.current.currentTime = targetTime
  }

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setPlaying(false)
    handleScrub(e.clientX)
  }

  useEffect(() => {
    if (!isDragging) return
    
    const onMouseMove = (e: MouseEvent) => handleScrub(e.clientX)
    const onMouseUp = () => setIsDragging(false)
    
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [isDragging])

  return (
    <div ref={containerRef} className="relative py-16" id="auto-scrub">
      <GlassCard glowColor="#ff5e00" className="overflow-hidden p-0">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff5e00]">
              21-Ball Autonomous
            </span>
            <h3 className="text-sm font-bold text-white">Scroll to Scrub · Full Auto Sequence</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => seek(-10)}
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/5"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              aria-label="Rewind 10 seconds"
            >
              <Rewind className="h-4 w-4 text-white/60" />
            </button>
            <button
              onClick={() => setPlaying(!playing)}
              className="flex h-11 w-11 items-center justify-center rounded-full transition-all hover:scale-105 active:scale-95"
              style={{ background: 'rgba(255,94,0,0.15)', border: '1px solid rgba(255,94,0,0.3)', boxShadow: playing ? '0 0 20px rgba(255,94,0,0.2)' : 'none' }}
              aria-label={playing ? 'Pause auto video' : 'Play auto video'}
            >
              {playing ? <Pause className="h-5 w-5 text-[#ff5e00]" /> : <Play className="h-5 w-5 text-[#ff5e00] ml-0.5" />}
            </button>
            <button
              onClick={() => seek(10)}
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/5"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              aria-label="Fast forward 10 seconds"
            >
              <FastForward className="h-4 w-4 text-white/60" />
            </button>
            <div className="w-px h-6 bg-white/10 mx-1" />
            <button
              onClick={() => {
                if (videoRef.current) videoRef.current.currentTime = 0
                setPlaying(false)
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/5"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              aria-label="Reset auto video"
            >
              <SkipBack className="h-4 w-4 text-white/40" />
            </button>
          </div>
        </div>

        {/* Video Player */}
        <div
          className="relative flex h-64 items-center justify-center overflow-hidden md:h-[500px]"
          style={{
            background: '#000',
          }}
        >
          <video
            ref={videoRef}
            src={autoVideo}
            className="h-full w-full object-cover opacity-80"
            muted
            playsInline
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />

          {/* Overlay grid for tech feel */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
            aria-hidden
          />

          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none" />

          {/* Scanning SVG path overlay — remains as a "ghost" of the route */}
          <svg
            className="absolute inset-0 h-full w-full pointer-events-none opacity-40"
            viewBox="0 0 600 400"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <defs>
              <filter id="neon-glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <motion.path
              d="M 50 350 L 150 200 L 250 280 L 350 120 L 450 200 L 550 80"
              fill="none"
              stroke="#00d4ff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="12 6"
              filter="url(#neon-glow)"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
        </div>

        {/* Scrub bar */}
        <div className="px-6 py-5">
          <div 
            ref={progressBarRef}
            className="progress-bar-container relative h-2 w-full cursor-pointer rounded-full bg-white/8 group/bar"
            onMouseDown={onMouseDown}
          >
            {/* Progress fill */}
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full z-10"
              style={{
                width: videoProgress + '%',
                background: 'linear-gradient(90deg, #ff5e00, #ff8c00)',
                boxShadow: '0 0 12px rgba(255,94,0,0.6)',
              }}
            />
            {/* Hover ghost bar */}
            <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover/bar:opacity-100 transition-opacity" />
            
            {/* Draggable handle */}
            <motion.div 
              className="absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white shadow-2xl z-20 border-2 border-[#ff5e00] transition-transform duration-200"
              style={{ 
                left: `calc(${videoProgress}% - 10px)`,
                scale: isDragging ? 1.2 : 1
              }}
            />
          </div>
          <div className="mt-3 flex justify-between text-[11px] font-bold text-white/40 font-mono tracking-wider">
            <span className="text-[#ff5e00]">{Math.floor(currentTime / 60) + ':' + Math.floor(currentTime % 60).toString().padStart(2, '0')}</span>
            <span className="uppercase text-white/10 tracking-[0.2em]">Drag to scrub · Scroll to advance</span>
            <span>{Math.floor(duration / 60) + ':' + Math.floor(duration % 60).toString().padStart(2, '0')}</span>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}


export function SubsystemShowcase() {
  return (
    <section id="subsystem-showcase" className="relative z-10 py-24" aria-label="Robot subsystem showcase">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent" aria-hidden />

      <div className="container mx-auto px-6">
        <SpringFadeIn>
          <div className="mb-14 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.35em] text-brand-orange">
              Mechanical Architecture
            </span>
            <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
              Subsystem Breakdown
            </h2>
            <p className="mt-3 text-text-muted max-w-lg mx-auto">
              Three precision-engineered subsystems working in millisecond harmony.
            </p>
          </div>
        </SpringFadeIn>

        <div className="space-y-5">
          {SUBSYSTEMS.map((block, i) => (
            <SubsystemCard key={block.id} block={block} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
