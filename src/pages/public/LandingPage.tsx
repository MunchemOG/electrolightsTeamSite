import { PageMeta } from '@/components/seo/PageMeta'
import { HeroSection } from '@/features/landing/HeroSection'
import { StatsBar } from '@/features/landing/StatsBar'
import { CountdownTimer } from '@/features/landing/CountdownTimer'
import { AwardsCallout } from '@/features/landing/AwardsCallout'
import { TechDivider } from '@/features/landing/TechDivider'
import { CyberGrid } from '@/features/landing/CyberGrid'
import { SpringFadeIn } from '@/components/motion/SpringFadeIn'
import { ScrambleText } from '@/components/motion/ScrambleText'

export default function LandingPage() {
  return (
    <>
      <PageMeta
        title="Home"
        description="Electrolights FTC Team 30686 — engineering excellence meets kinetic design. Follow our journey through the 2025-26 INTO THE DEEP season with Vectair."
        ogUrl="https://electrolights30686.com/"
        ogImage="/og/og-landing.jpg"
      />

      {/* ═══════════════════════════════════════════
          HERO — Full viewport, GLSL background, parallax
          ═══════════════════════════════════════════ */}
      <HeroSection />

      {/* ═══════════════════════════════════════════
          STATS BAR — Odometer counters on scroll-enter
          ═══════════════════════════════════════════ */}
      <StatsBar />

      <TechDivider label="SECURE DATALINK // ACTIVE" />

      {/* ═══════════════════════════════════════════
          CYBER GRID WRAPPER 
          ═══════════════════════════════════════════ */}
      <div className="relative overflow-hidden">
        <CyberGrid />

        {/* ═══════════════════════════════════════════
            COUNTDOWN — Next event ticker
            ═══════════════════════════════════════════ */}
        <section className="relative z-10 py-24">
          <div className="container mx-auto px-6">
            <SpringFadeIn>
              <div className="mb-10 text-center">
                <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.3em] text-brand-orange drop-shadow-md">
                  Upcoming
                </span>
                <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl text-shadow-sm">
                  Next Mission
                </h2>
              </div>
            </SpringFadeIn>

            <SpringFadeIn delay={0.15}>
              <CountdownTimer />
            </SpringFadeIn>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            AWARDS — Innovate Winner, Inspire Finalist
            ═══════════════════════════════════════════ */}
        <AwardsCallout />
      </div>

      <TechDivider label="SYS.NODE.30686 // READY" />

      {/* ═══════════════════════════════════════════
          CLOSING CTA
          ═══════════════════════════════════════════ */}
      <section className="relative z-10 py-32 bg-bg-base">
        <div className="container mx-auto px-6 text-center">
          <SpringFadeIn>
            <h2 className="mx-auto mb-6 max-w-2xl text-3xl font-black tracking-tight text-white md:text-5xl text-shadow-md">
              Built by students.{' '}
              <span className="inline-block bg-gradient-to-r from-[#0044ff] to-[#ff5e00] bg-clip-text text-transparent">
                Engineered for competition.
              </span>
            </h2>
          </SpringFadeIn>

          <SpringFadeIn delay={0.15}>
            <p className="mx-auto mb-10 max-w-lg text-text-muted">
              We mentor 15+ FLL teams, push the limits of autonomous robotics, and build digital
              experiences that prove our engineering runs deeper than hardware.
            </p>
          </SpringFadeIn>

          <SpringFadeIn delay={0.25}>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="/sponsors"
                className="inline-flex items-center gap-2 rounded-full bg-brand-electric px-8 py-3.5 font-bold text-white shadow-[0_0_30px_rgba(0,68,255,0.35)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(0,68,255,0.55)] active:scale-95"
              >
                Become a Sponsor
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-glass px-8 py-3.5 font-bold text-text-muted transition-all hover:border-white/20 hover:bg-bg-surface/40 hover:text-white active:scale-95 bg-bg-surface/20 backdrop-blur-sm"
              >
                Get in Touch
              </a>
            </div>
          </SpringFadeIn>
        </div>
      </section>
    </>
  )
}
