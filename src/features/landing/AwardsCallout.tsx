import { Trophy, Sparkles } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { SpringFadeIn } from '@/components/motion/SpringFadeIn'

interface Award {
  title: string
  event: string
  season: string
  icon: typeof Trophy
  accentColor: string
}

const AWARDS: Award[] = [
  {
    title: 'Control Award Finalist',
    event: 'FTC State Championship',
    season: '2025–26 INTO THE DEEP',
    icon: Trophy,
    accentColor: '#FFD700', // Gold
  },
  {
    title: '3rd Place Alliance',
    event: 'FTC State Championship',
    season: '2025–26 INTO THE DEEP',
    icon: Sparkles,
    accentColor: '#C0C0C0', // Silver
  },
]

/**
 * Awards callout — showcases Innovate Winner + Inspire Finalist
 * with glassmorphism cards and staggered spring entrance.
 */
export function AwardsCallout() {
  return (
    <section id="awards-callout" className="relative z-10 py-40">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <SpringFadeIn>
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.3em] text-brand-electric">
              Recognition
            </span>
            <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">
              Awards & Honors
            </h2>
          </div>
        </SpringFadeIn>

        {/* Awards Grid */}
        <div className="mx-auto flex max-w-3xl flex-col gap-6 md:flex-row">
          {AWARDS.map((award, i) => (
            <SpringFadeIn key={award.title} delay={i * 0.15} className="flex-1">
              <GlassCard
                className="group relative overflow-hidden px-8 py-10 text-center transition-transform duration-300 hover:scale-[1.02]"
                glowColor={award.accentColor}
              >
                {/* Gradient glow (top edge) */}
                <div
                  className="absolute inset-x-0 top-0 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${award.accentColor}80, transparent)`,
                  }}
                />

                {/* Icon */}
                <div
                  className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: `${award.accentColor}15` }}
                >
                  <award.icon
                    className="h-7 w-7"
                    style={{ color: award.accentColor }}
                    aria-hidden="true"
                  />
                </div>

                <h3 className="mb-2 text-lg font-bold text-white">{award.title}</h3>
                <p className="mb-1 text-sm text-text-muted">{award.event}</p>
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-electric/60">
                  {award.season}
                </span>
              </GlassCard>
            </SpringFadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
