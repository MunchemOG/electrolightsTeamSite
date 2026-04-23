/**
 * SponsorCard.tsx  (formerly FlipCoin3D.tsx — file kept to avoid import changes)
 * Premium glassmorphic card for Platinum sponsors.
 * Hover: animated border sweep + shine glide across the face.
 */
import { motion } from 'framer-motion'
import type { Sponsor } from '@/lib/constants'

interface SponsorCardProps {
  sponsor: Sponsor
}

export function FlipCoin3D({ sponsor }: SponsorCardProps) {
  return (
    <motion.a
      href={sponsor.website !== '#' ? sponsor.website : undefined}
      target={sponsor.website !== '#' ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="sponsor-glass-card group relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-3xl p-8 text-center"
      style={{
        width: 200,
        height: 200,
        background: `radial-gradient(ellipse 80% 70% at 40% 30%, ${sponsor.color_hex}18, transparent 70%), #0c0c1e`,
        border: `1px solid ${sponsor.color_hex}33`,
        boxShadow: `0 0 40px ${sponsor.color_hex}18`,
      }}
      whileHover={{ scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 340, damping: 24 }}
      aria-label={`${sponsor.name} — Platinum Sponsor`}
    >
      {/* Sweeping shine on hover */}
      <div
        className="shine-sweep pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.12) 50%, transparent 65%)',
          transform: 'translateX(-100%)',
          animation: 'none',
        }}
        aria-hidden
      />

      {/* Animated top edge glow */}
      <div
        className="absolute top-0 left-1/2 h-px w-0 -translate-x-1/2 transition-all duration-500 group-hover:w-3/4"
        style={{
          background: `linear-gradient(to right, transparent, ${sponsor.color_hex}, transparent)`,
        }}
        aria-hidden
      />

      {/* Label and Logo Row */}
      <div className="flex items-center gap-3">
        {/* Sponsor logo area */}
        <div
          className="flex h-10 w-10 shrink-0 overflow-hidden items-center justify-center rounded-xl text-xl font-black"
          style={{
            background: `${sponsor.color_hex}1a`,
            border: `1px solid ${sponsor.color_hex}40`,
            color: sponsor.color_hex,
          }}
        >
          {sponsor.logo_url ? (
            <img
              src={sponsor.logo_url}
              alt={sponsor.name}
              className="h-full w-full object-contain p-1.5"
            />
          ) : (
            sponsor.name.slice(0, 2).toUpperCase()
          )}
        </div>
        <span
          className="text-[10px] font-black uppercase tracking-[0.4em]"
          style={{ color: sponsor.color_hex }}
        >
          PLATINUM
        </span>
      </div>

      <h3 className="text-xl font-bold text-white leading-tight">{sponsor.name}</h3>

      <style>{`
        .sponsor-glass-card:hover .shine-sweep {
          opacity: 1;
          animation: shine-slide 0.55s ease-in-out forwards;
        }
        @keyframes shine-slide {
          from { transform: translateX(-100%); }
          to   { transform: translateX(200%); }
        }
      `}</style>
    </motion.a>
  )
}
