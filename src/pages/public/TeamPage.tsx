import { PageMeta } from '@/components/seo/PageMeta'
import { SpringFadeIn } from '@/components/motion/SpringFadeIn'
import { TeamOrigins } from '@/features/team/TeamOrigins'
import { RosterGrid } from '@/features/team/RosterGrid'
import { TEAM_NAME, TEAM_NUMBER, OUTREACH_STATS } from '@/lib/constants'

const HERO_STATS = [
  { label: 'Team Members', value: 10 },
  { label: 'FLL Teams Mentored', value: `${OUTREACH_STATS.fllTeamsMentored}+` },
  { label: 'Students Reached', value: `${OUTREACH_STATS.studentsReached}+` },
  { label: 'Seasons Active', value: 1 },
]

export default function TeamPage() {
  return (
    <>
      <PageMeta
        title="The Team"
        description="Meet the engineers, programmers, and outreach leads behind Electrolights FTC 30686. Bios, subteams, tool proficiencies, and our season story."
        ogUrl="https://electrolights30686.com/team"
        ogImage="/og/og-team.jpg"
      />

      {/* ═══════════════════════════════════════════
          HERO — Team page header
          ═══════════════════════════════════════════ */}
      <section
        id="team-hero"
        className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden bg-bg-base px-6 pt-32 pb-16 text-center"
        aria-label="Team page hero"
      >
        {/* Radial glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          aria-hidden
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 0%, #0044ff20 0%, transparent 70%)',
          }}
        />

        {/* Grid lines decoration */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          aria-hidden
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-3xl">
          <SpringFadeIn>
            <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.4em] text-brand-electric">
              FTC {TEAM_NUMBER}
            </span>
          </SpringFadeIn>

          <SpringFadeIn delay={0.08}>
            <h1 className="mb-4 text-5xl font-black tracking-tight text-white md:text-6xl lg:text-7xl">
              The{' '}
              <span className="bg-gradient-to-r from-brand-electric via-[#00d4ff] to-brand-orange bg-clip-text text-transparent">
                {TEAM_NAME}
              </span>
            </h1>
          </SpringFadeIn>

          <SpringFadeIn delay={0.16}>
            <p className="mx-auto max-w-lg text-base leading-relaxed text-text-muted md:text-lg">
              10 team members. Three robots. Countless iterations. Meet the engineers,
              coders, and outreach leaders who make{' '}
              <span className="font-semibold text-white/80">{TEAM_NAME}</span>{' '}
              what it is.
            </p>
          </SpringFadeIn>
        </div>

        {/* Quick stats */}
        <div className="relative z-10 mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {HERO_STATS.map((stat, i) => (
            <SpringFadeIn key={stat.label} delay={0.24 + i * 0.07}>
              <div className="rounded-2xl border border-white/8 bg-white/4 px-5 py-4 text-center backdrop-blur-sm">
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-text-muted">
                  {stat.label}
                </div>
              </div>
            </SpringFadeIn>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ORIGINS — History narrative timeline
          ═══════════════════════════════════════════ */}
      <TeamOrigins />

      {/* ═══════════════════════════════════════════
          ROSTER — Filtered member card grid
          ═══════════════════════════════════════════ */}
      <RosterGrid />
    </>
  )
}
