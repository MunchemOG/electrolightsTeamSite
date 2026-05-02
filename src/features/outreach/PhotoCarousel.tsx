import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const PHOTOS = [
  { id: 'p1', caption: 'Fall STEM Workshop at Lincoln Middle School', date: 'Oct 2024', accent: '#0044ff', icon: 'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5' },
  { id: 'p2', caption: 'Robot Building Day with Middle Schoolers', date: 'Oct 2024', accent: '#ff5e00', icon: 'M11.42 15.17l-5.25-3.34m5.25 3.34V21m0-5.83l5.25-3.34m-10.5 0L4.5 8.63v6.74L11.42 19m0-5.83l5.25-3.34M21 8.63l-6.75 4.2v5.34L21 14.37V8.63z' },
  { id: 'p3', caption: 'FLL Regional Qualifier Volunteer Team', date: 'Jan 2025', accent: '#a78bfa', icon: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z' },
  { id: 'p4', caption: 'Coding Workshop at Emmons Elementary', date: 'Dec 2024', accent: '#34d399', icon: 'M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5' },
  { id: 'p5', caption: 'Girls in STEM Day at Barrington D220', date: 'Mar 2025', accent: '#f472b6', icon: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5' },
  { id: 'p6', caption: 'Engineering Design Sprint for FLL State', date: 'Feb 2025', accent: '#22d3ee', icon: 'M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42' },
]

// ─────────────────────────────────────────────────────────────────────────────
// INFINITE CAROUSEL LOGIC
// ─────────────────────────────────────────────────────────────────────────────

const CARD_WIDTH = 340
const GAP = 24

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

// Duplicate photos to ensure total width covers any realistic screen size
const EXTENDED_PHOTOS = [
  ...PHOTOS.map((p) => ({ ...p, uid: p.id + '-1' })),
  ...PHOTOS.map((p) => ({ ...p, uid: p.id + '-2' })),
]

function CarouselCard({
  photo,
  index,
  xVal,
  containerWidth,
  prefersReduced,
}: {
  photo: (typeof PHOTOS)[number]
  index: number
  xVal: ReturnType<typeof useMotionValue>
  containerWidth: number
  prefersReduced: boolean
}) {
  const W = CARD_WIDTH + GAP
  const totalWidth = EXTENDED_PHOTOS.length * W
  const centerOffset = containerWidth / 2 - CARD_WIDTH / 2

  const getScreenX = (latest: any) => {
    const l = typeof latest === 'string' ? parseFloat(latest) : (latest as number)
    const p = l + centerOffset + index * W
    return wrap(-W, totalWidth - W, p)
  }

  const cardX = useTransform(xVal, (latest: any) => {
    const l = typeof latest === 'string' ? parseFloat(latest) : (latest as number)
    return getScreenX(l) - l
  })

  const scale = useTransform(xVal, (latest: any) => {
    const l = typeof latest === 'string' ? parseFloat(latest) : (latest as number)
    const sX = getScreenX(l)
    const cardCenter = sX + CARD_WIDTH / 2
    const containerCenter = containerWidth / 2
    const dist = Math.abs(cardCenter - containerCenter)
    if (dist > W) return 0.85
    return 1 - (dist / W) * 0.15
  })

  const opacity = useTransform(xVal, (latest: any) => {
    const l = typeof latest === 'string' ? parseFloat(latest) : (latest as number)
    const sX = getScreenX(l)
    const cardCenter = sX + CARD_WIDTH / 2
    const containerCenter = containerWidth / 2
    const dist = Math.abs(cardCenter - containerCenter)
    if (dist > W * 1.5) return 0.3
    return 1 - (dist / (W * 1.5)) * 0.7
  })

  return (
    <motion.div
      className="absolute top-0 left-0 flex-shrink-0 select-none overflow-hidden rounded-2xl"
      style={{
        width: CARD_WIDTH,
        height: 380,
        x: prefersReduced ? centerOffset + index * W : cardX,
        scale: prefersReduced ? 1 : scale,
        opacity: prefersReduced ? 1 : opacity,
        zIndex: useTransform(scale, (s) => Math.round(s * 100)),
      }}
    >
      <img
        src="/teamLogo.jpg"
        alt={photo.caption}
        className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-screen transition-opacity duration-500 group-hover:opacity-80"
        style={{ filter: 'grayscale(100%) contrast(1.2)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080812] via-[#080812]/40 to-transparent" />
      
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 pt-16">
        <div
          className="mb-1 text-[10px] font-bold uppercase tracking-[0.3em]"
          style={{ color: photo.accent }}
        >
          {photo.date}
        </div>
        <p className="text-sm font-semibold leading-snug text-white/90">
          {photo.caption}
        </p>
      </div>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-0 right-0 h-px bg-white/[0.04] scanline" />
      </div>
    </motion.div>
  )
}

export function PhotoCarousel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const prefersReduced = useReducedMotion()

  const x = useMotionValue(0)

  useEffect(() => {
    const unsub = x.on('change', (latest) => {
      const W = CARD_WIDTH + GAP
      const shift = Math.round(-latest / W)
      const idx = ((shift % PHOTOS.length) + PHOTOS.length) % PHOTOS.length
      setActiveIndex(idx)
    })
    return unsub
  }, [x])

  useEffect(() => {
    if (!containerRef.current) return
    const obs = new ResizeObserver(([entry]) => {
      if (entry) setContainerWidth(entry.contentRect.width)
    })
    obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])

  const handleDragEnd = useCallback(
    (_: any, info: any) => {
      const W = CARD_WIDTH + GAP
      const currentX = typeof x.get() === 'string' ? parseFloat(x.get() as any) : (x.get() as number)
      const projectedX = currentX + info.velocity.x * 0.3
      const snapX = Math.round(projectedX / W) * W
      animate(currentX, snapX, {
        type: 'spring',
        stiffness: 300,
        damping: 40,
        mass: 0.8,
        onUpdate: (v) => x.set(v),
      })
    },
    [x]
  )

  const goToDot = useCallback(
    (dotIndex: number) => {
      const W = CARD_WIDTH + GAP
      const currentX = typeof x.get() === 'string' ? parseFloat(x.get() as any) : (x.get() as number)
      const currentShift = Math.round(-currentX / W)
      const currentIdx = ((currentShift % PHOTOS.length) + PHOTOS.length) % PHOTOS.length
      let diff = dotIndex - currentIdx

      if (diff > PHOTOS.length / 2) diff -= PHOTOS.length
      if (diff < -PHOTOS.length / 2) diff += PHOTOS.length

      const targetShift = currentShift + diff
      animate(currentX, -targetShift * W, {
        type: 'spring',
        stiffness: 300,
        damping: 40,
        mass: 0.8,
        onUpdate: (v) => x.set(v),
      })
    },
    [x]
  )

  const handleNext = useCallback(() => {
    const W = CARD_WIDTH + GAP
    const currentX = typeof x.get() === 'string' ? parseFloat(x.get() as any) : (x.get() as number)
    const currentShift = Math.round(-currentX / W)
    animate(currentX, -(currentShift + 1) * W, {
      type: 'spring',
      stiffness: 300,
      damping: 40,
      mass: 0.8,
      onUpdate: (v) => x.set(v),
    })
  }, [x])

  const handlePrev = useCallback(() => {
    const W = CARD_WIDTH + GAP
    const currentX = typeof x.get() === 'string' ? parseFloat(x.get() as any) : (x.get() as number)
    const currentShift = Math.round(-currentX / W)
    animate(currentX, -(currentShift - 1) * W, {
      type: 'spring',
      stiffness: 300,
      damping: 40,
      mass: 0.8,
      onUpdate: (v) => x.set(v),
    })
  }, [x])

  return (
    <div className="relative overflow-hidden" ref={containerRef}>
      {containerWidth > 0 && (
        <>
          {/* Navigation arrows */}
          <div className="absolute top-1/2 left-0 right-0 z-[200] flex -translate-y-1/2 justify-between px-2 pointer-events-none">
            <button
              onClick={handlePrev}
              className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0a0a1a]/80 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-4 w-4 text-white/60" />
            </button>
            <button
              onClick={handleNext}
              className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0a0a1a]/80 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10"
              aria-label="Next photo"
            >
              <ChevronRight className="h-4 w-4 text-white/60" />
            </button>
          </div>

          {/* Carousel track */}
          <motion.div
            className="relative h-[380px] w-full cursor-grab active:cursor-grabbing"
            style={{ x: prefersReduced ? undefined : x }}
            drag={prefersReduced ? false : 'x'}
            dragElastic={0}
            onDragEnd={handleDragEnd}
          >
            {EXTENDED_PHOTOS.map((photo, i) => (
              <CarouselCard
                key={photo.uid}
                photo={photo}
                index={i}
                xVal={x}
                containerWidth={containerWidth}
                prefersReduced={prefersReduced}
              />
            ))}
          </motion.div>

          {/* Dot indicators */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {PHOTOS.map((_, i) => (
              <button
                key={i}
                onClick={() => goToDot(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? 'w-8 bg-[#00d4ff]'
                    : 'w-1.5 bg-white/15 hover:bg-white/25'
                }`}
                aria-label={`Go to photo ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
