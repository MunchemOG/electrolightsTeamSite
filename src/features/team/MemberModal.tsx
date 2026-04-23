import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles } from 'lucide-react'
import { ToolBadges } from './ToolBadges'
import type { TeamMember } from '@/lib/constants'

const SUBTEAM_COLOR: Record<string, string> = {
  Hardware: '#0044ff',
  Software: '#ff5e00',
  Outreach: '#00aa66',
  Mentor: '#6600cc',
}

interface MemberModalProps {
  member: TeamMember | null
  onClose: () => void
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const panelVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 32 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 340, damping: 30 },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    y: 24,
    transition: { duration: 0.2, ease: 'easeIn' as const },
  },
}

/**
 * MemberModal — Full-screen modal that expands a team member card.
 * Opens on card click; closes via ✕ button, Escape key, or backdrop click.
 */
export function MemberModal({ member, onClose }: MemberModalProps) {
  const accentColor = member ? (SUBTEAM_COLOR[member.subteam] ?? '#0044ff') : '#0044ff'

  // Close on Escape key
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    // Lock body scroll while modal is open
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  return (
    <AnimatePresence>
      {member && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            aria-hidden
          />

          {/* Panel */}
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label={`${member.name} profile`}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a10] shadow-2xl sm:flex-row"
            >
              {/* Top accent line */}
              <div
                className="absolute inset-x-0 top-0 h-[2px]"
                style={{
                  background: `linear-gradient(90deg, transparent, ${accentColor}90, transparent)`,
                }}
                aria-hidden
              />

              {/* ── Photo column ── */}
              <div className="relative h-64 w-full shrink-0 overflow-hidden bg-bg-surface sm:h-auto sm:w-56">
                <img
                  src={member.photo}
                  alt={`${member.name} photo`}
                  className="h-full w-full object-cover"
                />
                {/* Gradient overlay on photo */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(10,10,16,0.6) 0%, transparent 60%)',
                  }}
                  aria-hidden
                />
                {/* Subteam badge */}
                <span
                  className="absolute bottom-4 left-4 rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-widest"
                  style={{
                    backgroundColor: `${accentColor}30`,
                    color: accentColor,
                    border: `1px solid ${accentColor}50`,
                  }}
                >
                  {member.subteam}
                </span>
              </div>

              {/* ── Content column ── */}
              <div className="flex flex-col gap-5 overflow-y-auto p-7">
                {/* Name & role */}
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                    {member.name}
                  </h2>
                  <p
                    className="mt-1 font-mono text-xs font-bold uppercase tracking-[0.25em]"
                    style={{ color: accentColor }}
                  >
                    {member.role}
                  </p>
                  {member.grade && (
                    <p className="mt-1 text-xs text-white/30">Grade {member.grade}</p>
                  )}
                </div>

                {/* Bio */}
                <p className="text-sm leading-relaxed text-white/75">{member.bio}</p>

                {/* Tools */}
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                    Tools & Skills
                  </p>
                  <ToolBadges tools={member.tools} />
                </div>

                {/* Fun fact */}
                <div
                  className="flex items-start gap-3 rounded-xl border px-4 py-3"
                  style={{
                    borderColor: `${accentColor}30`,
                    backgroundColor: `${accentColor}08`,
                  }}
                >
                  <Sparkles
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: accentColor }}
                    aria-hidden
                  />
                  <div>
                    <p className="mb-1 text-[10px] font-black uppercase tracking-[0.25em] text-white/40">
                      Fun Fact
                    </p>
                    <p className="text-sm font-medium text-white/90">{member.funFact}</p>
                  </div>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric/50"
                aria-label="Close member profile"
                id="member-modal-close"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
