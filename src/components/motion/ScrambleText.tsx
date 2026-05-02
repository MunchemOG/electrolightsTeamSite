import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const CYPHERS = 'ABCDEF0123456789!<>_\\/[]{}—=+*^?'

interface ScrambleTextProps {
  text: string
  className?: string
  delay?: number
}

/**
 * Technical scrambling text reveal effect.
 * Randomly swaps characters with hex/symbols before settling on the real string.
 */
export function ScrambleText({ text, className = '', delay = 0 }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced || !isInView) return

    let frames = 0
    const queue: { from: string; to: string; start: number; end: number; char?: string }[] = []
    
    for (let i = 0; i < text.length; i++) {
      const from = text[i] || ''
      const to = text[i] || ''
      const start = Math.floor(Math.random() * 15)
      const end = start + Math.floor(Math.random() * 15)
      queue.push({ from, to, start, end })
    }

    let animationFrame: number

    const update = () => {
      let output = ''
      let complete = 0
      
      for (let i = 0, n = queue.length; i < n; i++) {
        const { from, to, start, end } = queue[i]!
        let { char } = queue[i]!
        
        if (frames >= end) {
          complete++
          output += to
        } else if (frames >= start) {
          if (!char || Math.random() < 0.28) {
            char = CYPHERS[Math.floor(Math.random() * CYPHERS.length)]
            queue[i]!.char = char
          }
          output += `<span class="opacity-50">${char}</span>`
        } else {
          output += from
        }
      }

      setDisplayText(output)
      
      if (complete === queue.length) {
        cancelAnimationFrame(animationFrame)
      } else {
        frames++
        animationFrame = requestAnimationFrame(update)
      }
    }

    const timeout = setTimeout(() => {
      animationFrame = requestAnimationFrame(update)
    }, delay * 1000)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(animationFrame)
    }
  }, [text, isInView, prefersReduced, delay])

  if (prefersReduced) {
    return <span className={className}>{text}</span>
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      dangerouslySetInnerHTML={{ __html: displayText }}
    />
  )
}
