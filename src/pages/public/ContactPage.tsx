import { PageMeta } from '@/components/seo/PageMeta'
import { SpringFadeIn } from '@/components/motion/SpringFadeIn'
import { ContactForm } from '@/features/contact/ContactForm'
import { MagneticSocials } from '@/features/contact/MagneticSocials'
import { TEAM_NAME, SOCIALS } from '@/lib/constants'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { KineticBackground } from '@/features/landing/KineticBackground'
import { GlassCard } from '@/components/ui/GlassCard'
import { ChevronDown } from 'lucide-react'

/* ────────────────────────────────────────────────────────────
   Orbital Ring — decorative rings orbiting the hero section
   ──────────────────────────────────────────────────────────── */
function OrbitalRings() {
  const prefersReduced = useReducedMotion()
  if (prefersReduced) return null

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden" aria-hidden>
      {[280, 400, 540].map((r, i) => (
        <motion.div
          key={r}
          className="absolute rounded-full border border-white/[0.03]"
          style={{ width: r, height: r }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40 + i * 20, repeat: Infinity, ease: 'linear' }}
        >
          {/* Orbiting dot */}
          <div
            className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full"
            style={{
              background: i === 0 ? '#00d4ff' : i === 1 ? '#0044ff' : '#ff5e00',
              boxShadow: `0 0 12px ${i === 0 ? '#00d4ff' : i === 1 ? '#0044ff' : '#ff5e00'}80`,
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}


/* ────────────────────────────────────────────────────────────
   Info Cards — workshop location + quick contact details
   ──────────────────────────────────────────────────────────── */
function InfoCards() {
  const cards = [
    {
      title: 'Workshop HQ',
      lines: ['Lake Zurich, Illinois', 'United States'],
      accent: '#00d4ff',
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
    },
    {
      title: 'Response Time',
      lines: ['Usually within 24 hours', 'Mon - Fri'],
      accent: '#0044ff',
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Direct Line',
      lines: [SOCIALS.email],
      accent: '#ff5e00',
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      {cards.map((card, i) => (
        <SpringFadeIn key={card.title} delay={0.1 + i * 0.08} className="h-full">
          <GlassCard
            glowColor={card.accent}
            className="px-5 py-5 h-full bg-white/[0.02] hover:bg-white/[0.04]"
          >
            {/* Accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-px opacity-40"
              style={{ background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)` }}
            />

            <div className="flex items-center gap-3 mb-3">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03]"
                style={{ color: card.accent }}
              >
                {card.icon}
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-white/50">
                {card.title}
              </span>
            </div>
            {card.lines.map((line) => (
              <p key={line} className="text-sm text-white/70 leading-relaxed">{line}</p>
            ))}
          </GlassCard>
        </SpringFadeIn>
      ))}
    </div>
  )
}


/* ═══════════════════════════════════════════════════════════
   CONTACT PAGE — Main export
   ═══════════════════════════════════════════════════════════ */
export default function ContactPage() {
  const prefersReduced = useReducedMotion()

  return (
    <>
      <PageMeta
        title="Contact"
        description="Get in touch with Electrolights FTC 30686 for sponsorships, outreach, or general inquiries."
        ogUrl="https://electrolights30686.com/contact"
        ogImage="/og/og-contact.jpg"
      />

      {/* ═══════════════════════════════════════════
          HERO — Kinetic GLSL background
          ═══════════════════════════════════════════ */}
      <section
        id="contact-hero"
        className="relative flex min-h-[calc(100dvh-8dvh)] flex-col items-center justify-center overflow-hidden bg-bg-base px-6 pt-32 pb-32 text-center"
        aria-label="Contact page hero"
      >
        {/* Kinetic GLSL Background */}
        <KineticBackground />

        {/* Dark gradient overlay for text readability against global background */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-bg-base/40 via-transparent to-bg-base pointer-events-none" />

        {/* ── Big Number (Background typography) ── */}
        <div
          className="absolute inset-0 z-[2] flex select-none items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <span
            className="whitespace-nowrap pb-4 pr-10 text-[24vw] font-black leading-none tracking-tighter md:text-[20vw] opacity-30"
            style={{
              background: 'linear-gradient(180deg, rgba(0,68,255,0.18) 0%, rgba(255,94,0,0.06) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            30686
          </span>
        </div>

        {/* Orbital rings */}
        <OrbitalRings />

        <div className="relative z-10 max-w-3xl">
          <SpringFadeIn delay={0.08}>
            <h1 className="mb-4 text-5xl font-black tracking-tight text-white md:text-6xl lg:text-7xl">
              Contact{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #0044ff, #00a2ff, #ff5e00)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Us
              </span>
            </h1>
          </SpringFadeIn>

          <SpringFadeIn delay={0.16}>
            <p className="mx-auto max-w-lg text-base leading-relaxed text-text-muted md:text-lg">
              Whether you are a potential sponsor, a fellow robotics team, or
              simply curious about{' '}
              <span className="font-semibold text-white/80">{TEAM_NAME}</span>
              {' '}-- we are listening. Send your message and we will get back
              to you.
            </p>
          </SpringFadeIn>

        </div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted/50">
            Scroll
          </span>
          <ChevronDown className="h-4 w-4 animate-bounce text-text-muted/40" aria-hidden="true" />
        </motion.div>
      </section>
      {/* ═══════════════════════════════════════════
          FORM — Main contact form w/ all effects
          ═══════════════════════════════════════════ */}
      <section
        id="contact-form"
        className="relative bg-bg-base px-6 pb-20"
        aria-label="Contact form"
      >
        {/* Section divider line */}
        <div className="mx-auto mb-16 max-w-6xl">
          <div className="relative h-px w-full bg-white/[0.06]">
            <motion.div
              className="absolute top-0 h-px w-24 bg-gradient-to-r from-transparent via-brand-electric to-transparent"
              animate={{ left: ['-10%', '110%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_320px]">
            {/* Left: Form */}
            <div>
              <SpringFadeIn>
                <div className="mb-8">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.3em] text-brand-electric/60">
                    Contact Form
                  </span>
                  <h2 className="text-3xl font-black text-white md:text-4xl">
                    Send a Message
                  </h2>
                </div>
              </SpringFadeIn>

              <ContactForm />
            </div>

            {/* Right: Socials + extra info */}
            <div className="flex flex-col gap-8">
              <SpringFadeIn delay={0.2}>
                <div>
                  <span className="mb-4 block text-xs font-bold uppercase tracking-[0.3em] text-white/40">
                    Connect Directly
                  </span>
                  <MagneticSocials />
                </div>
              </SpringFadeIn>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />

              <SpringFadeIn delay={0.3}>
                <div>
                  <span className="mb-4 block text-xs font-bold uppercase tracking-[0.3em] text-white/40">
                    Contact Info
                  </span>
                  <InfoCards />
                </div>
              </SpringFadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
