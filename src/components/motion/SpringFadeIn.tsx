import { type ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface SpringFadeInProps {
  children: ReactNode
  className?: string
  /** Delay before animation begins (seconds) */
  delay?: number
  /** Direction to enter from */
  direction?: 'up' | 'down' | 'left' | 'right'
  /** Distance to translate from (px) */
  distance?: number
}

const directionMap = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
}

/**
 * Staggered spring entrance wrapper.
 * Fades in + translates from the specified direction with spring physics.
 * Respects prefers-reduced-motion.
 */
export function SpringFadeIn({
  children,
  className,
  delay = 0,
  direction = 'up',
  distance = 40,
}: SpringFadeInProps) {
  const prefersReduced = useReducedMotion()
  const dir = directionMap[direction]

  const variants: Variants = {
    hidden: prefersReduced
      ? { opacity: 0 }
      : {
          opacity: 0,
          x: dir.x * distance,
          y: dir.y * distance,
        },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: prefersReduced
        ? { duration: 0.01 }
        : {
            type: 'spring',
            damping: 25,
            stiffness: 120,
            delay,
          },
    },
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}
