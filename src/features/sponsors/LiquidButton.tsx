/**
 * LiquidButton.tsx
 * CTA button — cyan liquid fills from the bottom on hover.
 * Uses onMouseEnter/Leave + inline styles to guarantee the text color
 * never goes dark before the liquid fill has visibly arrived.
 */
import { useState } from 'react'

interface LiquidButtonProps {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  icon?: React.ReactNode
  className?: string
}

export function LiquidButton({
  href,
  onClick,
  children,
  icon,
  className = '',
}: LiquidButtonProps) {
  const [hovered, setHovered] = useState(false)
  const Tag = href ? 'a' : 'button'

  const props = href
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : { type: 'button' as const, onClick }

  return (
    <Tag
      {...props}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#00d4ff] px-8 py-3.5 text-sm font-bold uppercase tracking-[0.2em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712] ${className}`}
      style={{
        color: hovered ? '#030712' : '#00d4ff',
        transition: 'color 0.3s ease',
      }}
    >
      {/* Liquid fill layer */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '9999px',
          background: '#00d4ff',
          clipPath: hovered
            ? 'ellipse(100% 170% at 50% 100%)'
            : 'ellipse(60% 0% at 50% 100%)',
          transition: 'clip-path 0.5s ease-out',
          pointerEvents: 'none',
        }}
      />

      {icon && (
        <span
          style={{
            position: 'relative',
            zIndex: 10,
            transform: hovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.3s ease',
          }}
        >
          {icon}
        </span>
      )}
      <span style={{ position: 'relative', zIndex: 10 }}>{children}</span>
    </Tag>
  )
}
