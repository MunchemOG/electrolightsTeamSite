import { useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { ToolBadges } from './ToolBadges'
import { ChevronDown } from 'lucide-react'
import type { TeamMember } from '@/lib/constants'

// ─────────────────────────────────────────────────────────────────────────────
// Text Glitch Effect
// ─────────────────────────────────────────────────────────────────────────────

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#|Σ∆◈'

function useGlitch(text: string) {
  const [display, setDisplay] = useState(text)
  const frameRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const iterRef = useRef(0)

  const trigger = useCallback(() => {
    if (frameRef.current) clearInterval(frameRef.current)
    iterRef.current = 0

    frameRef.current = setInterval(() => {
      iterRef.current += 1
      const progress = iterRef.current / 8

      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i / text.length < progress) return char
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          })
          .join(''),
      )

      if (iterRef.current >= 8) {
        clearInterval(frameRef.current!)
        setDisplay(text)
      }
    }, 50)
  }, [text])

  return { display, trigger }
}

// ─────────────────────────────────────────────────────────────────────────────
// Elastic Cursor-Following Tooltip
// ─────────────────────────────────────────────────────────────────────────────

function ElasticTooltip({
  member,
  visible,
  anchorRef,
}: {
  member: TeamMember
  visible: boolean
  anchorRef: React.RefObject<HTMLDivElement | null>
}) {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const springX = useSpring(rawX, { stiffness: 150, damping: 20 })
  const springY = useSpring(rawY, { stiffness: 150, damping: 20 })

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!anchorRef.current) return
      const rect = anchorRef.current.getBoundingClientRect()
      rawX.set(e.clientX - rect.left - rect.width / 2)
      rawY.set(e.clientY - rect.top - rect.height / 2)
    },
    [anchorRef, rawX, rawY],
  )

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center"
          onMouseMove={onMouseMove}
          aria-hidden
        >
          <motion.div
            className="absolute rounded-xl border border-white/10 bg-[#0a0a10]/95 px-5 py-4 shadow-2xl backdrop-blur-2xl"
            style={{
              x: springX,
              y: springY,
              translateX: '-50%',
              translateY: 'calc(-100% - 14px)',
              top: '50%',
              left: '50%',
              minWidth: '220px',
              maxWidth: '280px',
            }}
            initial={{ opacity: 0, scale: 0.85, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <p className="mb-2 text-[11px] font-black uppercase tracking-[0.2em] text-brand-electric">
              Fun Fact
            </p>
            <p className="text-sm font-medium leading-relaxed text-white/95">{member.funFact}</p>
            {member.grade && (
              <p className="mt-3 text-[11px] font-bold text-white/40">Grade {member.grade}</p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MemberCard
// ─────────────────────────────────────────────────────────────────────────────

interface MemberCardProps {
  member: TeamMember
  onSelect?: () => void
}

const SUBTEAM_COLOR: Record<string, string> = {
  Hardware: '#0044ff',
  Software: '#ff5e00',
  Outreach: '#00aa66',
  Mentor: '#6600cc',
}

/**
 * MemberCard — Full-featured team member card with:
 * - 3D tilt-glare (custom mouse math, no external lib)
 * - X-Ray photo swap on hover (CSS clip-path crossfade)
 * - Elastic cursor-following tooltip (fun fact)
 * - Text glitch effect on role title
 * - Animated accordion bio (smooth height transition)
 */
export function MemberCard({ member, onSelect }: MemberCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [bioOpen, setBioOpen] = useState(false)
  const [tooltipVisible, setTooltipVisible] = useState(false)

  // ── 3D Tilt math ──
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)

  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 30 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)

    rotateX.set(-dy * 10)
    rotateY.set(dx * 10)
    glareX.set(((e.clientX - rect.left) / rect.width) * 100)
    glareY.set(((e.clientY - rect.top) / rect.height) * 100)
  }, [rotateX, rotateY, glareX, glareY])

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
    glareX.set(50)
    glareY.set(50)
    setIsHovered(false)
    setTooltipVisible(false)
  }, [rotateX, rotateY, glareX, glareY])

  const { display: glitchedRole, trigger: triggerGlitch } = useGlitch(member.role)
  const accentColor = SUBTEAM_COLOR[member.subteam] ?? '#0044ff'

  return (
    <motion.div
      ref={cardRef}
      className="relative"
      style={{
        perspective: '800px',
        transformStyle: 'preserve-3d',
        cursor: onSelect ? 'pointer' : 'default',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true)
        setTooltipVisible(true)
        triggerGlitch()
      }}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
    >
      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: 'preserve-3d',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
      >
        <GlassCard
          className="relative overflow-hidden"
          glowColor={accentColor}
          id={`member-card-${member.id}`}
        >
          {/* ── Glare overlay ── */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.15 : 0,
              background: `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(255,255,255,0.9) 0%, transparent 60%)`,
            }}
            aria-hidden
          />

          {/* ── Top accent line ── */}
          <div
            className="absolute inset-x-0 top-0 h-[2px] z-10"
            style={{
              background: `linear-gradient(90deg, transparent, ${accentColor}90, transparent)`,
            }}
            aria-hidden
          />

          {/* ── Photo block (X-Ray hover) ── */}
          <div className="relative h-52 w-full overflow-hidden bg-bg-surface">
            {/* Primary photo */}
            <img
              src={member.photo}
              alt={`${member.name} primary photo`}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />

            {/* Alt / X-Ray photo — clip-path crossfade */}
            <motion.img
              src={member.altPhoto}
              alt={`${member.name} alternate photo`}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{
                clipPath: isHovered ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
              }}
              transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
              aria-hidden={!isHovered}
            />

            {/* Subteam badge */}
            <div className="absolute top-3 right-3 z-20">
              <span
                className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest"
                style={{
                  backgroundColor: `${accentColor}25`,
                  color: accentColor,
                  border: `1px solid ${accentColor}50`,
                }}
              >
                {member.subteam}
              </span>
            </div>
          </div>

          {/* ── Info block ── */}
          <div className="p-5">
            {/* Name */}
            <h3 className="mb-0.5 text-lg font-black tracking-tight text-white">
              {member.name}
            </h3>

            {/* Role — with glitch effect */}
            <p
              className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest"
              style={{ color: accentColor }}
              aria-label={member.role}
            >
              {glitchedRole}
            </p>

            {/* Tool badges */}
            <ToolBadges tools={member.tools} limit={3} />

            {/* Bio accordion */}
            <div className="mt-4">
              <button
                className="flex w-full items-center justify-between text-left text-xs font-semibold uppercase tracking-wider text-white/40 transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric/50"
                onClick={() => setBioOpen((o) => !o)}
                aria-expanded={bioOpen}
                aria-controls={`bio-${member.id}`}
                id={`bio-toggle-${member.id}`}
              >
                <span>{bioOpen ? 'Hide' : 'Read'} Bio</span>
                <motion.div
                  animate={{ rotate: bioOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ChevronDown className="h-4 w-4" aria-hidden />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {bioOpen && (
                  <motion.div
                    id={`bio-${member.id}`}
                    role="region"
                    aria-labelledby={`bio-toggle-${member.id}`}
                    key="bio"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 text-xs leading-relaxed text-white/60">
                      {member.bio}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Elastic tooltip (fun fact) ── */}
          <ElasticTooltip
            member={member}
            visible={tooltipVisible}
            anchorRef={cardRef}
          />
        </GlassCard>
      </motion.div>
    </motion.div>
  )
}
