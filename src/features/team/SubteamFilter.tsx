import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import type { Subteam } from '@/lib/constants'

interface SubteamFilterProps {
  active: Subteam | 'All'
  onChange: (filter: Subteam | 'All') => void
  counts: Record<Subteam | 'All', number>
}

const FILTERS: (Subteam | 'All')[] = ['All', 'Hardware', 'Software', 'Outreach', 'Mentor']

const SUBTEAM_COLOR: Record<Subteam | 'All', string> = {
  All: '#ffffff',
  Hardware: '#0044ff',
  Software: '#ff5e00',
  Outreach: '#00aa66',
  Mentor: '#6600cc',
}

/**
 * SubteamFilter — Pill filter buttons with a gooey SVG morph filter.
 * The active indicator uses Framer Motion layoutId for smooth transitions.
 * An SVG feGaussianBlur + feColorMatrix gooey filter is applied to the container.
 */
export function SubteamFilter({ active, onChange, counts }: SubteamFilterProps) {
  return (
    <div
      className="flex flex-col items-center gap-4"
      role="group"
      aria-label="Filter team by subteam"
    >


      {/* Filter pills */}
      <div className="relative flex flex-wrap justify-center gap-2 p-2">
        <LayoutGroup>
          {FILTERS.map((filter) => {
            const isActive = active === filter
            const color = SUBTEAM_COLOR[filter]
            const count = counts[filter] ?? 0

            return (
              <motion.button
                key={filter}
                className="relative rounded-full px-5 py-2 text-sm font-bold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
                style={{
                  color: isActive ? (filter === 'All' ? '#0f0f1a' : '#fff') : `${color}99`,
                  ['--tw-ring-color' as any]: color,
                }}
                onClick={() => onChange(filter)}
                aria-pressed={isActive}
                id={`filter-${filter.toLowerCase()}`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                {/* Active background pill (layoutId for gooey morph) */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: color }}
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </AnimatePresence>

                {/* Inactive background */}
                {!isActive && (
                  <span
                    className="absolute inset-0 rounded-full border border-white/10 bg-white/5"
                    aria-hidden
                  />
                )}

                {/* Label + count */}
                <span className="relative z-10 flex items-center gap-1.5">
                  {filter}
                  {count > 0 && (
                    <span
                      className="rounded-full px-1.5 py-0.5 text-[10px] font-black"
                      style={{
                        backgroundColor: isActive 
                          ? (filter === 'All' ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.25)') 
                          : `${color}25`,
                        color: isActive 
                          ? (filter === 'All' ? '#0f0f1a' : '#fff') 
                          : color,
                      }}
                    >
                      {count}
                    </span>
                  )}
                </span>
              </motion.button>
            )
          })}
        </LayoutGroup>
      </div>
    </div>
  )
}
