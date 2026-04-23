/**
 * SponsorBento.tsx
 * Bento grid for 5 sponsors (1 Platinum, 2 Gold, 2 Silver) +
 * a separate FTC Mentor Teams section below.
 *
 * Platinum → large card centered with the glassmorphic FlipCoin3D card
 * Gold     → medium card, col-span-2
 * Silver   → standard card, col-span-1
 *
 * Each card border glows with the sponsor's color_hex.
 */
import { motion } from 'framer-motion'
import { FlipCoin3D } from './FlipCoin3D'
import { SPONSORS, FTC_MENTOR_TEAMS } from '@/lib/constants'
import type { Sponsor, SponsorTier } from '@/lib/constants'

// ─────────────────────────────────────────────────────────────────────────────

const TIER_LABEL: Record<SponsorTier, string> = {
  Platinum: 'PLATINUM PARTNER',
  Gold: 'GOLD PARTNER',
  Silver: 'SILVER PARTNER',
  Bronze: 'COMMUNITY SUPPORTER',
}

// ─────────────────────────────────────────────────────────────────────────────

interface CardProps {
  sponsor: Sponsor
  index: number
  className?: string
}

// Platinum — hero-width card with the glassmorphic FlipCoin3D
function PlatinumCard({ sponsor, index }: CardProps) {
  return (
    <motion.div
      className="col-span-full flex flex-col items-center gap-8 overflow-hidden rounded-3xl p-10 md:flex-row md:gap-12 md:p-14"
      style={{
        background: `radial-gradient(ellipse 60% 80% at 20% 50%, ${sponsor.color_hex}14 0%, transparent 65%), #0a0a1e`,
        border: `1px solid ${sponsor.color_hex}30`,
        boxShadow: `0 0 60px ${sponsor.color_hex}14`,
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      aria-label={`${sponsor.name} — Platinum Sponsor`}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent 0%, ${sponsor.color_hex} 50%, transparent 100%)`,
        }}
        aria-hidden
      />

      {/* Glass card widget */}
      <div className="shrink-0">
        <FlipCoin3D sponsor={sponsor} />
      </div>

      {/* Text content */}
      <div className="text-center md:text-left">
        <span
          className="text-[10px] font-black uppercase tracking-[0.45em]"
          style={{ color: sponsor.color_hex }}
        >
          {TIER_LABEL.Platinum}
        </span>
        <h3 className="mt-2 text-3xl font-black tracking-tight text-white md:text-4xl">
          {sponsor.name}
        </h3>
        {sponsor.tagline && (
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/50">
            {sponsor.tagline}
          </p>
        )}
        {sponsor.website !== '#' && (
          <a
            href={sponsor.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors duration-200"
            style={{ color: `${sponsor.color_hex}99` }}
            onMouseEnter={(e) => (e.currentTarget.style.color = sponsor.color_hex)}
            onMouseLeave={(e) => (e.currentTarget.style.color = `${sponsor.color_hex}99`)}
          >
            Visit website <span aria-hidden>→</span>
          </a>
        )}
      </div>
    </motion.div>
  )
}

// Gold — wide card, col-span-2
function GoldCard({ sponsor, index }: CardProps) {
  return (
    <motion.a
      href={sponsor.website !== '#' ? sponsor.website : undefined}
      target={sponsor.website !== '#' ? '_blank' : undefined}
      rel="noopener noreferrer"
      className={`group relative flex items-center gap-5 overflow-hidden rounded-2xl p-6 col-span-full lg:col-span-3`}
      style={{
        background: `linear-gradient(135deg, ${sponsor.color_hex}0e 0%, transparent 55%), #0a0a1a`,
        border: `1px solid ${sponsor.color_hex}28`,
        boxShadow: `0 0 24px ${sponsor.color_hex}0c`,
      }}
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.012 }}
      aria-label={`${sponsor.name} — Gold Sponsor`}
    >
      {/* Left color bar */}
      <div
        className="absolute left-0 top-0 h-full w-0.5 rounded-l-2xl"
        style={{
          background: `linear-gradient(to bottom, ${sponsor.color_hex}, ${sponsor.color_hex}33)`,
        }}
        aria-hidden
      />

      {/* Logo area */}
      <div
        className="ml-2 flex h-14 w-14 shrink-0 overflow-hidden items-center justify-center rounded-xl text-xl font-black"
        style={{
          background: `${sponsor.color_hex}16`,
          border: `1px solid ${sponsor.color_hex}30`,
          color: sponsor.color_hex,
        }}
      >
        {sponsor.logo_url ? (
          <img
            src={sponsor.logo_url}
            alt={sponsor.name}
            className="h-full w-full object-contain p-2.5"
          />
        ) : (
          sponsor.name.slice(0, 2).toUpperCase()
        )}
      </div>

      <div className="min-w-0 flex-1">
        <span
          className="text-[9px] font-black uppercase tracking-[0.4em]"
          style={{ color: sponsor.color_hex }}
        >
          {TIER_LABEL.Gold}
        </span>
        <h3 className="text-lg font-bold text-white">{sponsor.name}</h3>
        {sponsor.tagline && (
          <p className="truncate text-sm text-white/45">{sponsor.tagline}</p>
        )}
      </div>

      <span className="shrink-0 text-white/20 transition-colors duration-200 group-hover:text-white/60">
        →
      </span>
    </motion.a>
  )
}

// Silver — standard 1-col card
function SilverCard({ sponsor, index, className = '' }: CardProps) {
  return (
    <motion.a
      href={sponsor.website !== '#' ? sponsor.website : undefined}
      target={sponsor.website !== '#' ? '_blank' : undefined}
      rel="noopener noreferrer"
      className={`group relative flex flex-col gap-3 overflow-hidden rounded-2xl p-5 ${className}`}
      style={{
        background: '#0a0a1a',
        border: `1px solid ${sponsor.color_hex}22`,
        boxShadow: `0 0 12px ${sponsor.color_hex}08`,
      }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        scale: 1.02,
        boxShadow: `0 0 26px ${sponsor.color_hex}22`,
      }}
      aria-label={`${sponsor.name} — Silver Sponsor`}
    >
      {/* Glow dot */}
      <div
        className="absolute right-4 top-4 h-2 w-2 rounded-full"
        style={{
          background: sponsor.color_hex,
          boxShadow: `0 0 8px ${sponsor.color_hex}`,
          opacity: 0.75,
        }}
        aria-hidden
      />

      <div className="flex items-center gap-3">
        {sponsor.logo_url && (
          <div 
            className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded bg-white/5"
            style={{ border: `1px solid ${sponsor.color_hex}20` }}
          >
            <img 
              src={sponsor.logo_url} 
              alt={sponsor.name} 
              className="h-full w-full object-contain p-1.5"
            />
          </div>
        )}
        <span
          className="text-[9px] font-black uppercase tracking-[0.4em]"
          style={{ color: sponsor.color_hex }}
        >
          {TIER_LABEL.Silver}
        </span>
      </div>
      <h3 className="text-base font-bold text-white">{sponsor.name}</h3>
      {sponsor.tagline && (
        <p className="text-xs leading-relaxed text-white/40">{sponsor.tagline}</p>
      )}
      <span className="mt-auto text-xs text-white/25 transition-colors duration-200 group-hover:text-white/55">
        Visit →
      </span>
    </motion.a>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

export function SponsorBento() {
  const platinum = SPONSORS.filter((s) => s.tier === 'Platinum' && s.active)
  const gold = SPONSORS.filter((s) => s.tier === 'Gold' && s.active)
  const silver = SPONSORS.filter((s) => s.tier === 'Silver' && s.active)

  return (
    <>
      {/* ── SPONSOR GRID ─────────────────────────────────────────────────── */}
      <section
        id="sponsor-bento"
        aria-label="Our Sponsors"
        className="mx-auto w-full max-w-5xl px-6 py-16"
      >
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#00d4ff]">
            Our Partners
          </span>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-white md:text-5xl">
            Sponsor Network
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/50">
            These organizations fund our competition travel, tools, and the
            mentorship of FTC teams across the region. Every partnership has a
            direct, measurable impact.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-6 lg:gap-6">
          {/* Platinum — full width */}
          {platinum.map((s, i) => (
            <PlatinumCard key={s.id} sponsor={s} index={i} />
          ))}

          {/* Gold — 2 cols on tablet, 3 cols (half width) on desktop */}
          {gold.map((s, i) => (
            <GoldCard key={s.id} sponsor={s} index={i} />
          ))}

          {/* Silver — 1 col on tablet, 2 cols (one third width) on desktop */}
          {silver.map((s, i) => {
            const isLastOdd = silver.length % 2 !== 0 && i === silver.length - 1
            const spanClass = isLastOdd
              ? 'col-span-full lg:col-span-2'
              : 'col-span-1 lg:col-span-2'

            return (
              <SilverCard
                key={s.id}
                sponsor={s}
                index={i}
                className={spanClass}
              />
            )
          })}
        </div>
      </section>

      {/* ── COMMUNITY PARTNER TEAMS ─────────────────────────────────────────────── */}
      <section
        id="mentor-teams"
        aria-label="Teams that support us"
        className="mx-auto w-full max-w-5xl px-6 pb-20"
      >
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#ff5e00]">
            Our Mentors
          </span>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-white md:text-5xl">
            Community Partners
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/50">
            Electrolights is incredibly grateful for the support of these FTC and FRC
            peer teams — they share code, strategy, and invaluable engineering
            knowledge that helped us get to where we are today.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FTC_MENTOR_TEAMS.map((team, i) => (
            <motion.a
              key={team.id}
              href={team.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl p-6"
              style={{
                background: `linear-gradient(145deg, ${team.color_hex}0e 0%, transparent 55%), #0a0a1a`,
                border: `1px solid ${team.color_hex}28`,
                boxShadow: `0 0 20px ${team.color_hex}0a`,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ scale: 1.025 }}
              aria-label={`Visit ${team.name} website`}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(to right, transparent, ${team.color_hex}, transparent)`,
                }}
                aria-hidden
              />

              {/* Team number + program badge */}
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 shrink-0 overflow-hidden items-center justify-center rounded-xl text-xs font-black"
                  style={{
                    background: `${team.color_hex}1a`,
                    border: `1px solid ${team.color_hex}40`,
                    color: team.color_hex,
                  }}
                >
                  {team.logo_url ? (
                    <img
                      src={team.logo_url}
                      alt={team.name}
                      className="h-full w-full object-contain p-2"
                    />
                  ) : (
                    `#${team.teamNumber}`
                  )}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span
                    className="text-[9px] font-black uppercase tracking-[0.35em]"
                    style={{ color: team.color_hex }}
                  >
                    {team.program} Team
                  </span>
                  <span className="text-[9px] font-semibold uppercase tracking-widest text-white/30">
                    {team.location}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold leading-tight text-white">
                  {team.name}
                </h3>
                <p className="mt-1 text-xs text-white/40">{team.location}</p>
              </div>

              <p className="flex-1 text-xs leading-relaxed text-white/55">
                {team.tagline}
              </p>

              <span className="mt-auto text-xs font-semibold tracking-widest text-white/25 transition-colors duration-200 group-hover:text-white/55">
                Visit team →
              </span>
            </motion.a>
          ))}
        </div>
      </section>
    </>
  )
}
