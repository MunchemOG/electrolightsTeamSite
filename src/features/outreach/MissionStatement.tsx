import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// ─────────────────────────────────────────────────────────────────────────────
// MISSION STATEMENT -- Cinematic scroll-driven word reveal
//
// Each word of the statement fades in from blur as the user scrolls.
// Key phrases get oversized gradient treatments.  The entire section
// is viewport-height so it acts as a scroll "scene" the user passes
// through, like a film title sequence.
// ─────────────────────────────────────────────────────────────────────────────

interface WordDef {
  text: string
  hero?: boolean          // oversized gradient word
  gradient?: string       // custom gradient for hero words
  break?: boolean         // force line break after this word
}

const WORDS: WordDef[] = [
  { text: 'We' },
  { text: 'build' },
  { text: 'robots.' , hero: true, gradient: 'linear-gradient(135deg, #0044ff 0%, #00d4ff 100%)', break: true },
  { text: 'But' },
  { text: 'our' },
  { text: 'real' },
  { text: 'engineering' },
  { text: 'happens', break: true },
  { text: 'when' },
  { text: 'we' },
  { text: 'hand' },
  { text: 'the' },
  { text: 'tools', hero: true, gradient: 'linear-gradient(135deg, #ff5e00 0%, #ff9d00 100%)' },
  { text: 'to', break: true },
  { text: 'someone' },
  { text: 'who\'s' },
  { text: 'never' },
  { text: 'held' },
  { text: 'them', break: true },
  { text: 'before.', hero: true, gradient: 'linear-gradient(135deg, #a78bfa 0%, #c4b5fd 60%, #00d4ff 100%)' },
]

// Bottom stats that float in after the reveal
const PROOF_POINTS = [
  { value: '15+', label: 'FLL Teams Launched' },
  { value: '700+', label: 'Students Reached' },
  { value: '2,400', label: 'Volunteer Hours' },
  { value: '$0', label: 'Cost to Students' },
]

function ScrollWord({
  word,
  index,
  prefersReduced,
}: {
  word: WordDef
  index: number
  prefersReduced: boolean
}) {
  const baseClass = word.hero
    ? 'inline-block font-display font-black'
    : 'inline-block font-display font-medium'

  const baseStyle = word.hero
    ? {
        fontSize: 'clamp(2.4rem, 5.5vw, 5rem)' as const,
        lineHeight: 1.05,
        background: word.gradient,
        WebkitBackgroundClip: 'text' as const,
        WebkitTextFillColor: 'transparent' as const,
        backgroundClip: 'text' as const,
      }
    : {
        fontSize: 'clamp(1.4rem, 3vw, 2.8rem)' as const,
        lineHeight: 1.2,
        color: 'rgba(255,255,255,0.55)',
      }

  const spacer = word.break
    ? <br />
    : <span className="inline-block" style={{ width: 'clamp(0.4rem, 0.8vw, 0.9rem)' }} />

  if (prefersReduced) {
    return (
      <>
        <span className={baseClass} style={baseStyle}>{word.text}</span>
        {spacer}
      </>
    )
  }

  return (
    <>
      <motion.span
        className={baseClass}
        style={baseStyle}
        initial={{ opacity: 0.06, y: 10, filter: 'blur(5px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{
          duration: 0.5,
          delay: index * 0.06,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {word.text}
      </motion.span>
      {spacer}
    </>
  )
}

export function MissionStatement() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end start'],
  })

  // Ambient horizontal lines that drift with scroll
  const lineX1 = useTransform(scrollYProgress, [0, 1], [-120, 120])
  const lineX2 = useTransform(scrollYProgress, [0, 1], [80, -80])
  const lineOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 0.4, 0.4, 0])

  return (
    <section
      id="mission"
      aria-label="Mission statement"
      ref={containerRef}
      className="relative"
    >
      {/* Ambient drifting lines */}
      {!prefersReduced && (
        <>
          <motion.div
            className="pointer-events-none absolute top-[20%] left-0 right-0 h-px"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(0,68,255,0.3), transparent)',
              x: lineX1,
              opacity: lineOpacity,
            }}
            aria-hidden
          />
          <motion.div
            className="pointer-events-none absolute top-[65%] left-0 right-0 h-px"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.2), transparent)',
              x: lineX2,
              opacity: lineOpacity,
            }}
            aria-hidden
          />
        </>
      )}

      {/* Top label */}
      <motion.div
        className="mb-10"
        initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-3">
          <div className="h-px w-6 bg-[#0044ff] opacity-60" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#0044ff]">
            Our Mission
          </span>
        </div>
      </motion.div>

      {/* Word grid */}
      <div className="max-w-4xl">
        {WORDS.map((word, i) => (
          <ScrollWord
            key={i}
            word={word}
            index={i}
            prefersReduced={prefersReduced}
          />
        ))}
        </div>

        {/* Proof-point strip */}
        <motion.div
          className="mt-16 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4"
          initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {PROOF_POINTS.map((pt) => (
            <div key={pt.label} className="relative">
              <div
                className="absolute -top-3 left-0 h-px w-8"
                style={{
                  background: 'linear-gradient(to right, rgba(0,68,255,0.5), transparent)',
                }}
              />
              <div className="font-display text-2xl font-black text-white sm:text-3xl">
                {pt.value}
              </div>
              <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30">
                {pt.label}
              </div>
            </div>
          ))}
        </motion.div>
    </section>
  )
}
