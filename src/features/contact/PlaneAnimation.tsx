import { useRef, useCallback, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface PlaneAnimationProps {
  onLaunch: () => void
  isSubmitting: boolean
  isSuccess: boolean
  disabled?: boolean
}

/**
 * Paper airplane slingshot submit button.
 * On click: the button text morphs, pulls back like a slingshot,
 * then transforms into a paper airplane SVG that arcs off-screen.
 */
export function PlaneAnimation({
  onLaunch,
  isSubmitting,
  isSuccess,
  disabled = false,
}: PlaneAnimationProps) {
  const prefersReduced = useReducedMotion()
  const btnRef = useRef<HTMLButtonElement>(null)
  const [hasLaunched, setHasLaunched] = useState(false)

  // Magnetic pull
  const motionX = useMotionValue(0)
  const motionY = useMotionValue(0)
  const springX = useSpring(motionX, { stiffness: 200, damping: 20 })
  const springY = useSpring(motionY, { stiffness: 200, damping: 20 })

  // Glow intensity from distance
  const glowOpacity = useTransform(
    [springX, springY],
    ([x, y]: number[]) => {
      const dist = Math.sqrt(x * x + y * y)
      return Math.min(dist / 30, 0.6)
    }
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (prefersReduced || !btnRef.current || disabled) return
      const rect = btnRef.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 150) {
        const pull = 1 - dist / 150
        motionX.set(dx * pull * 0.3)
        motionY.set(dy * pull * 0.3)
      }
    },
    [prefersReduced, disabled, motionX, motionY]
  )

  const handleMouseLeave = useCallback(() => {
    motionX.set(0)
    motionY.set(0)
  }, [motionX, motionY])

  const handleClick = () => {
    if (disabled || isSubmitting || hasLaunched) return
    setHasLaunched(true)
    onLaunch()
  }

  // Determine visual state
  const getLabel = () => {
    if (isSuccess) return 'Sent'
    if (isSubmitting) return 'Sending...'
    return 'Send Message'
  }

  return (
    <div className="relative">
      {/* Airplane that flies away on success */}
      {isSuccess && !prefersReduced && (
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
          animate={{
            x: [0, -20, 600],
            y: [0, 10, -300],
            opacity: [1, 1, 0],
            rotate: [0, -15, -45],
            scale: [1, 1.2, 0.5],
          }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#00d4ff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" />
          </svg>
        </motion.div>
      )}

      <motion.button
        ref={btnRef}
        type="submit"
        disabled={disabled || isSubmitting}
        onClick={handleClick}
        className="group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-[#0044ff]/20 to-[#00d4ff]/20 px-8 py-4 text-base font-semibold text-white tracking-wide transition-all duration-300 hover:border-brand-electric/40 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ x: springX, y: springY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileTap={!disabled && !isSubmitting ? { scale: 0.96 } : undefined}
      >
        {/* Liquid fill on hover */}
        <div className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-t from-brand-electric/30 to-transparent transition-transform duration-500 ease-out group-hover:translate-y-0" />

        {/* Glow */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            opacity: glowOpacity,
            boxShadow: '0 0 40px rgba(0,68,255,0.3), inset 0 0 30px rgba(0,68,255,0.1)',
          }}
        />

        {/* Scanline */}
        {!prefersReduced && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl" aria-hidden>
            <div
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-electric/40 to-transparent scanline"
            />
          </div>
        )}

        <span className="relative z-10 flex items-center justify-center gap-3">
          {isSubmitting && (
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}

          {isSuccess && (
            <svg className="h-5 w-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}

          {!isSubmitting && !isSuccess && (
            <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          )}

          {getLabel()}
        </span>
      </motion.button>
    </div>
  )
}
