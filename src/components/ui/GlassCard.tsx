import { type ReactNode, type HTMLAttributes, useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  glowColor?: string
  noBorder?: boolean
  interactive?: boolean
}

/**
 * Glassmorphism container with optional interactive mouse-tracking spotlight.
 */
export function GlassCard({
  children,
  className,
  glowColor,
  noBorder = false,
  interactive = true,
  style,
  ...rest
}: GlassCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    if (!interactive || prefersReduced) return
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const highlightClass = noBorder ? '' : 'border border-glass'

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn(
        'group relative overflow-hidden rounded-2xl bg-bg-surface/50 backdrop-blur-xl transition-all duration-500',
        interactive && 'hover:-translate-y-1 hover:shadow-2xl',
        highlightClass,
        className,
      )}
      style={{
        ...(glowColor ? { boxShadow: `0 0 40px ${glowColor}15, inset 0 1px 0 ${glowColor}10` } : {}),
        ...style,
      }}
      {...rest}
    >
      {/* Interactive mouse spotlight overlay */}
      {interactive && !prefersReduced && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                rgba(255,255,255,0.05),
                transparent 40%
              )
            `,
          }}
        />
      )}
      {/* Content wrapper to stay above the spotlight */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}
