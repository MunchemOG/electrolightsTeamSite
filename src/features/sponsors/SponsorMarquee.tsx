/**
 * SponsorMarquee.tsx
 * Infinite velocity marquee of sponsors AND FTC mentor teams.
 * Highlights the hovered lane with sponsor colors.
 * Two lanes: top = sponsors, bottom = mentor teams (opposite direction).
 */
import { useState } from 'react'
import { SPONSORS, FTC_MENTOR_TEAMS } from '@/lib/constants'
import { Sparkles, Diamond } from 'lucide-react'

// Duplicate the lists many times to ensure a seamless infinite loop on ultra-wide monitors.
// One half of the container must be wider than the screen width for translateX(-50%) to be seamless.
const SPONSOR_ITEMS = Array(12).fill(SPONSORS).flat()
const MENTOR_ITEMS = Array(12).fill(FTC_MENTOR_TEAMS).flat()

export function SponsorMarquee() {
  const [hoveredSponsors, setHoveredSponsors] = useState(false)
  const [hoveredMentors, setHoveredMentors] = useState(false)

  // With 12 array copies (6x the original distance), the duration must be 6x longer to maintain the same physical speed.
  const speed = '168s'
  const speedReverse = '204s'

  return (
    <section
      id="sponsor-marquee"
      aria-label="Sponsor and partner team marquee"
      className="relative w-full overflow-hidden border-y border-white/[0.06] py-0"
      style={{ background: '#04040f' }}
    >
      {/* Edge fades */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28"
        style={{ background: 'linear-gradient(to right, #04040f, transparent)' }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28"
        style={{ background: 'linear-gradient(to left, #04040f, transparent)' }}
        aria-hidden
      />

      {/* ── Lane 1 — Sponsors (left) ─────────────────────────────────────── */}
      <div
        className="flex w-max border-b border-white/[0.04] py-4"
        style={{
          animation: `marquee-ltr ${speed} linear infinite`,
          willChange: 'transform',
        }}
        onMouseEnter={() => setHoveredSponsors(true)}
        onMouseLeave={() => setHoveredSponsors(false)}
        aria-hidden
      >
        {SPONSOR_ITEMS.map((s, i) => (
          <span
            key={`${s.id}-${i}`}
            className="mx-7 flex items-center gap-2.5 whitespace-nowrap"
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{
                background: s.color_hex,
                boxShadow: hoveredSponsors ? `0 0 8px ${s.color_hex}` : 'none',
                transition: 'box-shadow 0.2s ease',
              }}
            />
            <span
              className="text-[11px] font-bold uppercase tracking-[0.22em] transition-colors duration-200"
              style={{ color: hoveredSponsors ? s.color_hex : 'rgba(255,255,255,0.38)' }}
            >
              {s.name}
            </span>
            <Sparkles className="ml-3 h-3 w-3 text-white/10" aria-hidden />
          </span>
        ))}
      </div>

      {/* ── Lane 2 — FTC Mentor Teams (right, opposite direction) ───────── */}
      <div
        className="flex w-max py-4"
        style={{
          animation: `marquee-rtl ${speedReverse} linear infinite`,
          willChange: 'transform',
        }}
        onMouseEnter={() => setHoveredMentors(true)}
        onMouseLeave={() => setHoveredMentors(false)}
        aria-hidden
      >
        {MENTOR_ITEMS.map((t, i) => (
          <span
            key={`${t.id}-${i}`}
            className="mx-7 flex items-center gap-2.5 whitespace-nowrap"
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{
                background: t.color_hex,
                boxShadow: hoveredMentors ? `0 0 8px ${t.color_hex}` : 'none',
                transition: 'box-shadow 0.2s ease',
              }}
            />
            <span
              className="text-[11px] font-bold uppercase tracking-[0.22em] transition-colors duration-200"
              style={{ color: hoveredMentors ? t.color_hex : 'rgba(255,255,255,0.28)' }}
            >
              {t.name}
            </span>
            <Diamond className="ml-3 h-3 w-3 text-white/10" aria-hidden />
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee-ltr {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-rtl {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </section>
  )
}
