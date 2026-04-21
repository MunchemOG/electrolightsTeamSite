import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  href?: string
}

/**
 * A wrapper that pulls the button slightly towards the cursor using framer-motion physics.
 * Great premium UX interaction for CTAs.
 */
export function MagneticButton({ children, className, href }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReduced || !ref.current) return
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current.getBoundingClientRect()
    
    // Calculate distance from center of element
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    
    // Move element towards mouse (damping by 0.3)
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  const Wrapper = href ? motion.a : motion.div

  return (
    <Wrapper
      href={href}
      ref={ref as any}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </Wrapper>
  )
}
