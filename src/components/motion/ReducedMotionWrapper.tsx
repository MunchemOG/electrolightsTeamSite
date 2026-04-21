import { type ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface ReducedMotionWrapperProps {
  children: ReactNode
  /**
   * Optional class applied to the wrapper div.
   * When reduced motion is active, the `reduce-motion` class is also added,
   * which CSS can target to globally kill transitions and animations.
   */
  className?: string
}

/**
 * Global wrapper that injects a `reduce-motion` data attribute and class
 * when the OS `prefers-reduced-motion: reduce` setting is active.
 *
 * All animated components should query `useReducedMotion()` independently,
 * but this wrapper ensures that CSS-only animations (transitions, keyframes)
 * are also killed site-wide via the `.reduce-motion` class on the root.
 */
export function ReducedMotionWrapper({ children, className }: ReducedMotionWrapperProps) {
  const prefersReduced = useReducedMotion()

  return (
    <div
      className={[className, prefersReduced ? 'reduce-motion' : ''].filter(Boolean).join(' ')}
      data-reduced-motion={prefersReduced ? 'true' : 'false'}
    >
      {children}
    </div>
  )
}
