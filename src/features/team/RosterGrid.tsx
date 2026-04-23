import { useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SubteamFilter } from './SubteamFilter'
import { MemberCard } from './MemberCard'
import { MemberModal } from './MemberModal'
import { ROSTER, type Subteam, type TeamMember } from '@/lib/constants'

type FilterValue = Subteam | 'All'
export type BentoVariant = 'lg' | 'tall' | 'sm'

/**
 * Exact 11-item bento that fills a perfect 4-col × 4-row rectangle.
 * Cell counts: 1 lg(2×2)=4  +  2 tall(1×2)=4  +  8 sm(1×1)=8  →  16 cells total.
 * Verified layout (rows top→bottom, dense flow):
 *   Row 1: [lg][lg][sm ][tall]
 *   Row 2: [lg][lg][sm ][tall]
 *   Row 3: [sm][sm][tall][sm ]
 *   Row 4: [sm][sm][tall][sm ]
 */
const BENTO_ALL: Array<{ variant: BentoVariant; spanClass: string }> = [
  { variant: 'lg',   spanClass: 'col-span-2 row-span-2' }, // 0 — 4 cells
  { variant: 'sm',   spanClass: 'col-span-1 row-span-1' }, // 1 — 1 cell
  { variant: 'tall', spanClass: 'col-span-1 row-span-2' }, // 2 — 2 cells
  { variant: 'sm',   spanClass: 'col-span-1 row-span-1' }, // 3 — 1 cell
  { variant: 'sm',   spanClass: 'col-span-1 row-span-1' }, // 4 — 1 cell
  { variant: 'sm',   spanClass: 'col-span-1 row-span-1' }, // 5 — 1 cell
  { variant: 'tall', spanClass: 'col-span-1 row-span-2' }, // 6 — 2 cells
  { variant: 'sm',   spanClass: 'col-span-1 row-span-1' }, // 7 — 1 cell
  { variant: 'sm',   spanClass: 'col-span-1 row-span-1' }, // 8 — 1 cell
  { variant: 'sm',   spanClass: 'col-span-1 row-span-1' }, // 9 — 1 cell
  { variant: 'sm',   spanClass: 'col-span-1 row-span-1' }, // 10 — 1 cell
  // ── Total: 16 cells, 4 cols → exactly 4 rows, zero gaps ──
]

function getBento(index: number, isAll: boolean) {
  if (isAll && index < BENTO_ALL.length) return BENTO_ALL[index]
  // Filtered views: every card is equal-sized sm, grid handles wrapping
  return { variant: 'sm' as BentoVariant, spanClass: 'col-span-1 row-span-1' }
}

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

        {/* Bento card grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeFilter}
            className={
              activeFilter === 'All'
                ? 'grid grid-cols-4 grid-flow-dense gap-4'
                : 'grid grid-cols-3 gap-4'
            }
            style={{ gridAutoRows: '240px' }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            aria-live="polite"
            aria-label={`Showing ${filtered.length} ${activeFilter === 'All' ? 'team members' : activeFilter + ' members'}`}
          >
            {filtered.map((member, index) => {
              const { variant, spanClass } = getBento(index, activeFilter === 'All')
              return (
                <motion.div
                  key={member.id}
                  className={`${spanClass} h-full`}
                  variants={cardVariants}
                  layout
                >
                  <MemberCard member={member} onSelect={() => setSelectedMember(member)} variant={variant} />
                </motion.div>
              )
            })}
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
