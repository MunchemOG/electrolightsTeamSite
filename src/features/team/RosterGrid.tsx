import { useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SubteamFilter } from './SubteamFilter'
import { MemberCard } from './MemberCard'
import { MemberModal } from './MemberModal'
import { ROSTER, type Subteam, type TeamMember } from '@/lib/constants'

type FilterValue = Subteam | 'All'

function buildCounts(members: TeamMember[]): Record<FilterValue, number> {
  const counts: Record<FilterValue, number> = {
    All: members.length,
    Hardware: 0,
    Software: 0,
    Outreach: 0,
    Mentor: 0,
  }
  for (const m of members) {
    counts[m.subteam] = (counts[m.subteam] ?? 0) + 1
  }
  return counts
}

// Staggered spring container variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

// Individual card entrance — spring physics
const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 280,
      damping: 26,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -10,
    transition: { duration: 0.2, ease: 'easeIn' as const },
  },
}

/**
 * RosterGrid — Team member card grid with subteam filtering and
 * staggered spring physics entrance (Framer Motion).
 */
export function RosterGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>('All')
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const counts = useMemo(() => buildCounts(ROSTER), [])

  const filtered = useMemo(
    () =>
      activeFilter === 'All'
        ? ROSTER
        : ROSTER.filter((m) => m.subteam === activeFilter),
    [activeFilter],
  )

  return (
    <section
      id="roster"
      className="relative z-10 py-16"
      aria-label="Team roster"
    >
      <div className="container mx-auto px-6">
        {/* Filter bar */}
        <div className="mb-12">
          <SubteamFilter
            active={activeFilter}
            onChange={setActiveFilter}
            counts={counts}
          />
        </div>

        {/* Card grid — AnimatePresence for exit animations */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeFilter}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            aria-live="polite"
            aria-label={`Showing ${filtered.length} ${activeFilter === 'All' ? 'team members' : activeFilter + ' members'}`}
          >
            {filtered.map((member) => (
              <motion.div
                key={member.id}
                variants={cardVariants}
                layout
              >
                <MemberCard member={member} onSelect={() => setSelectedMember(member)} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="py-20 text-center text-white/30">
            <p className="text-lg font-semibold">No members in this subteam.</p>
          </div>
        )}
      </div>

      {/* Member detail modal */}
      <MemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />
    </section>
  )
}
