import { useRef, useCallback, type MouseEvent } from 'react'
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion'
import { SOCIALS } from '@/lib/constants'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface SocialLink {
  label: string
  href: string
  svgPath: string
  color: string
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Instagram',
    href: SOCIALS.instagram,
    svgPath:
      'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
    color: '#E4405F',
  },
  {
    label: 'YouTube',
    href: SOCIALS.youtube,
    svgPath:
      'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
    color: '#FF0000',
  },
  {
    label: 'GitHub',
    href: SOCIALS.github,
    svgPath:
      'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
    color: '#f8fafc',
  },
  {
    label: 'Email',
    href: `mailto:${SOCIALS.email}`,
    svgPath:
      'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
    color: '#00d4ff',
  },
]

const MAGNETIC_RADIUS = 120

function MagneticIcon({ link }: { link: SocialLink }) {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLAnchorElement>(null)

  const motionX = useMotionValue(0)
  const motionY = useMotionValue(0)
  const springX = useSpring(motionX, { stiffness: 150, damping: 15 })
  const springY = useSpring(motionY, { stiffness: 150, damping: 15 })

  const glowOpacity = useTransform(
    [springX, springY],
    ([x, y]: number[]) => {
      const dist = Math.sqrt(x * x + y * y)
      return Math.min(dist / 20, 1) * 0.6
    }
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (prefersReduced || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < MAGNETIC_RADIUS) {
        const pull = 1 - dist / MAGNETIC_RADIUS
        motionX.set(dx * pull * 0.4)
        motionY.set(dy * pull * 0.4)
      }
    },
    [prefersReduced, motionX, motionY]
  )

  const handleMouseLeave = useCallback(() => {
    motionX.set(0)
    motionY.set(0)
  }, [motionX, motionY])

  return (
    <motion.a
      ref={ref}
      href={link.href}
      target={link.href.startsWith('mailto') ? undefined : '_blank'}
      rel="noopener noreferrer"
      aria-label={link.label}
      className="group relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-sm transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.06]"
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.92 }}
    >
      {/* Glow ring */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          opacity: glowOpacity,
          boxShadow: `0 0 30px ${link.color}40, inset 0 0 20px ${link.color}10`,
        }}
      />
      <svg
        className="h-6 w-6 transition-colors duration-300"
        style={{ color: link.color }}
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path d={link.svgPath} />
      </svg>
      {/* Label tooltip */}
      <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/80 px-2.5 py-1 text-[11px] font-medium text-white/70 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1 backdrop-blur-sm border border-white/10">
        {link.label}
      </span>
    </motion.a>
  )
}

/**
 * Magnetic social icons that dynamically translate toward cursor proximity.
 * Each icon has a unique brand color glow and spring-physics pull.
 */
export function MagneticSocials() {
  return (
    <div className="flex items-center gap-5">
      {SOCIAL_LINKS.map((link) => (
        <MagneticIcon key={link.label} link={link} />
      ))}
    </div>
  )
}
