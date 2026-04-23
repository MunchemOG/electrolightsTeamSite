import { PageMeta } from '@/components/seo/PageMeta'
import { SpringFadeIn } from '@/components/motion/SpringFadeIn'
import { SponsorBento } from '@/features/sponsors/SponsorBento'
import { SponsorMarquee } from '@/features/sponsors/SponsorMarquee'
import { LiquidButton } from '@/features/sponsors/LiquidButton'
import { SPONSORS, FTC_MENTOR_TEAMS, TEAM_NAME, TEAM_NUMBER } from '@/lib/constants'
import { motion } from 'framer-motion'
import { FileText, Mail, ClipboardCheck, Check, Sparkles, ArrowDown } from 'lucide-react'

// ─── Hero stats ───────────────────────────────────────────────────────────────
const HERO_STATS = [
  { label: 'Active Sponsors', value: SPONSORS.filter((s) => s.active).length },
  { label: 'Community Partners', value: FTC_MENTOR_TEAMS.length },
  { label: 'Students Reached', value: '400+' },
  { label: 'Seasons Active', value: 1 },
]

// ─── 501c3 benefit tiers ──────────────────────────────────────────────────────
const BENEFITS = [
  {
    tier: 'Platinum',
    color: '#a78bfa',
    amount: '$1,000+',
    perks: [
      'Logo on robot & drive team shirts',
      'Full-page feature in competition program',
      'Top placement on website + social media',
      'Direct access to engineering team',
      'Annual impact report',
    ],
  },
  {
    tier: 'Gold',
    color: '#FFCE00',
    amount: '$500–$999',
    perks: [
      'Logo on robot',
      'Website sponsor section feature',
      'Shout-out in competition program',
      'Semi-annual impact update',
    ],
  },
  {
    tier: 'Silver',
    color: '#94a3b8',
    amount: '$250–$499',
    perks: [
      'Logo on team website',
      'Social media acknowledgment',
      'End-of-season impact letter',
    ],
  },
  {
    tier: 'Bronze',
    color: '#b45309',
    amount: 'Up to $249',
    perks: [
      'Name on team website',
      'Thank-you in program materials',
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────

export default function SponsorsPage() {
  return (
    <>
      <PageMeta
        title="Sponsors"
        description="The organizations powering Electrolights FTC 30686. Sponsor tiers, partnership benefits, and how to join our growing sponsor network."
        ogUrl="https://electrolights30686.com/sponsors"
        ogImage="/og/og-sponsors.jpg"
      />

      {/* ═══════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════ */}
      <section
        id="sponsors-hero"
        className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-16 text-center"
        aria-label="Sponsors page hero"
      >
        {/* Radial glow */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(0,212,255,0.09) 0%, transparent 70%)',
          }}
        />

        {/* Grid decoration */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          aria-hidden
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-3xl">
          <SpringFadeIn>
            <span className="mb-4 inline-block text-xs font-black uppercase tracking-[0.45em] text-[#00d4ff]">
              FTC {TEAM_NUMBER} — Partners
            </span>
          </SpringFadeIn>

          <SpringFadeIn delay={0.08}>
            <h1 className="mb-4 text-5xl font-black tracking-tight text-white md:text-6xl lg:text-7xl">
              Fueling{' '}
              <span className="bg-gradient-to-r from-[#00d4ff] via-[#0044ff] to-[#ff5e00] bg-clip-text text-transparent">
                {TEAM_NAME}
              </span>
            </h1>
          </SpringFadeIn>

          <SpringFadeIn delay={0.16}>
            <p className="mx-auto max-w-lg text-base leading-relaxed text-white/55 md:text-lg">
              Our sponsors don't just write checks — they invest in the{' '}
              <span className="font-semibold text-white/80">
                next generation of engineers
              </span>
              . Every dollar funds competition travel, machining tools, and
              our collaboration with peer robotics teams across our region.
            </p>
          </SpringFadeIn>

          <SpringFadeIn delay={0.24}>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <LiquidButton
                href="mailto:sponsors@electrolights30686.com"
                icon={<Sparkles className="h-4 w-4" aria-hidden />}
              >
                Become a Sponsor
              </LiquidButton>
              <a
                href="/ElectrolightsSponsorDeck.pdf"
                download
                className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-8 py-3.5 text-sm font-bold uppercase tracking-[0.2em] text-white/55 transition-all duration-300 hover:border-white/25 hover:text-white/85"
              >
                <ArrowDown className="h-4 w-4" aria-hidden />
                Download Pitch Deck
              </a>
            </div>
          </SpringFadeIn>
        </div>

        {/* Quick stats */}
        <div className="relative z-10 mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {HERO_STATS.map((stat, i) => (
            <SpringFadeIn key={stat.label} delay={0.3 + i * 0.07}>
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] px-5 py-4 text-center backdrop-blur-sm">
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-white/40">
                  {stat.label}
                </div>
              </div>
            </SpringFadeIn>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MARQUEE — dual-lane infinite strip
          ═══════════════════════════════════════════ */}
      <SponsorMarquee />

      {/* ═══════════════════════════════════════════
          BENTO + MENTOR TEAMS — tiered sponsor grid
          ═══════════════════════════════════════════ */}
      <SponsorBento />

      {/* ═══════════════════════════════════════════
          BENEFIT TIERS
          ═══════════════════════════════════════════ */}
      <section
        id="sponsor-tiers"
        aria-label="Sponsor benefit tiers"
        className="mx-auto w-full max-w-5xl px-6 py-20"
      >
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#00d4ff]">
            Partnership Levels
          </span>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-white md:text-5xl">
            What You Get
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/50">
            Every tier comes with real, tangible visibility at competitions, on
            our robot, and across our digital platforms.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.tier}
              className="relative flex flex-col gap-4 overflow-hidden rounded-2xl p-6"
              style={{
                border: `1px solid ${b.color}28`,
                background: `linear-gradient(160deg, ${b.color}0c 0%, transparent 50%), #080812`,
                boxShadow: `0 0 18px ${b.color}08`,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{
                  background: `linear-gradient(to right, transparent, ${b.color}, transparent)`,
                }}
                aria-hidden
              />

              <span
                className="text-[10px] font-black uppercase tracking-[0.4em]"
                style={{ color: b.color }}
              >
                {b.tier}
              </span>

              <div>
                <p className="text-2xl font-black text-white">{b.amount}</p>
                <p className="text-xs text-white/35">per season</p>
              </div>

              <ul className="space-y-2" aria-label={`${b.tier} sponsor perks`}>
                {b.perks.map((perk) => (
                  <li
                    key={perk}
                    className="flex items-start gap-2 text-xs text-white/60"
                  >
                    <Check className="h-4 w-4 shrink-0" style={{ color: b.color }} aria-hidden />
                    {perk}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          501(c)(3) INFO BLOCK
          ═══════════════════════════════════════════ */}
      <section
        id="nonprofit-info"
        aria-label="Non-profit information"
        className="mx-auto w-full max-w-4xl px-6 py-8"
      >
        <motion.div
          className="relative overflow-hidden rounded-3xl p-8 text-center md:p-12"
          style={{
            background:
              'linear-gradient(135deg, rgba(0,68,255,0.09) 0%, rgba(0,212,255,0.04) 50%, rgba(255,94,0,0.07) 100%)',
            border: '1px solid rgba(0,212,255,0.12)',
            boxShadow: '0 0 50px rgba(0,68,255,0.06)',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          {/* Corner glow */}
          <div
            className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full opacity-15"
            style={{
              background: 'radial-gradient(circle, #00d4ff, transparent 70%)',
            }}
            aria-hidden
          />

          <span className="mb-4 inline-block rounded-full border border-[#00d4ff]/18 bg-[#00d4ff]/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.4em] text-[#00d4ff]">
            501(c)(3) Non-Profit
          </span>

          <h2 className="mt-4 text-3xl font-black text-white md:text-4xl">
            Your Donation is Tax-Deductible
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/50 md:text-base">
            {TEAM_NAME} FTC Team {TEAM_NUMBER} operates under a registered
            501(c)(3) non-profit organization. All contributions are fully
            tax-deductible to the extent permitted by law. We provide official
            donation receipts and annual impact reports.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: <FileText className="h-6 w-6" />, label: 'Tax ID / EIN', value: 'Available on request' },
              {
                icon: <Mail className="h-6 w-6" />,
                label: 'Contact',
                value: 'sponsors@electrolights30686.com',
              },
              {
                icon: <ClipboardCheck className="h-6 w-6" />,
                label: 'Non-Profit Status',
                value: '501(c)(3) Verified',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/[0.05] bg-white/[0.025] px-4 py-4"
              >
                <div className="text-xl">{item.icon}</div>
                <div className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-white/35">
                  {item.label}
                </div>
                <div className="mt-1 text-xs font-semibold text-white/70">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          PITCH DECK CTA
          ═══════════════════════════════════════════ */}
      <section
        id="pitch-deck"
        aria-label="Download our sponsorship pitch deck"
        className="mx-auto w-full max-w-3xl px-6 pb-28 pt-8 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-2 text-[11px] font-black uppercase tracking-[0.5em] text-white/35">
            Ready to partner?
          </p>
          <h2 className="mb-6 text-3xl font-black text-white md:text-4xl">
            Get Our Full Sponsorship Deck
          </h2>
          <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-white/45">
            Our pitch deck covers team stats, competition results, outreach
            impact, and all partnership benefit details — one PDF, zero fluff.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <LiquidButton
              href="/ElectrolightsSponsorDeck.pdf"
              icon={<ArrowDown className="h-4 w-4" aria-hidden />}
            >
              Download Deck (PDF)
            </LiquidButton>
            <LiquidButton
              href="mailto:sponsors@electrolights30686.com"
              icon={<Mail className="h-4 w-4" aria-hidden />}
            >
              Contact Us
            </LiquidButton>
          </div>
        </motion.div>
      </section>
    </>
  )
}
