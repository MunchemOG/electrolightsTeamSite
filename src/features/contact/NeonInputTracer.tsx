import { useRef, useState, useEffect, type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface NeonInputTracerProps {
  children: ReactNode
  className?: string
  color?: string
}

/**
 * Wraps an input field with an animated SVG neon border trace.
 * On focus within, a glowing stroke races around the field perimeter.
 */
export function NeonInputTracer({
  children,
  className = '',
  color = '#00d4ff',
}: NeonInputTracerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [dims, setDims] = useState({ w: 0, h: 0 })

  useEffect(() => {
    if (!wrapperRef.current) return
    const observe = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDims({
          w: entry.contentRect.width,
          h: entry.contentRect.height,
        })
      }
    })
    observe.observe(wrapperRef.current)
    return () => observe.disconnect()
  }, [])

  const perimeter = 2 * (dims.w + dims.h)
  const rx = 16 // matches rounded-2xl

  return (
    <div
      ref={wrapperRef}
      className={`relative ${className}`}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={() => setIsFocused(false)}
    >
      {/* SVG trace overlay */}
      {dims.w > 0 && (
        <svg
          className="pointer-events-none absolute inset-0 z-20"
          width={dims.w}
          height={dims.h}
          viewBox={`0 0 ${dims.w} ${dims.h}`}
          fill="none"
          aria-hidden
        >
          <motion.rect
            x={1}
            y={1}
            width={dims.w - 2}
            height={dims.h - 2}
            rx={rx}
            ry={rx}
            stroke={color}
            strokeWidth={2}
            strokeDasharray={perimeter}
            initial={{ strokeDashoffset: perimeter, opacity: 0 }}
            animate={{
              strokeDashoffset: isFocused ? 0 : perimeter,
              opacity: isFocused ? 1 : 0,
            }}
            transition={{
              strokeDashoffset: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.3 },
            }}
            style={{
              filter: `drop-shadow(0 0 6px ${color}80) drop-shadow(0 0 20px ${color}40)`,
            }}
          />
        </svg>
      )}

      {/* Ambient glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl"
        animate={{
          boxShadow: isFocused
            ? `0 0 30px ${color}25, 0 0 60px ${color}10, inset 0 0 30px ${color}08`
            : '0 0 0px transparent',
        }}
        transition={{ duration: 0.4 }}
      />

      {children}
    </div>
  )
}
