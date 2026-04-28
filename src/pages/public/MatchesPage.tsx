import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown, Zap } from 'lucide-react'
import { PageMeta } from '@/components/seo/PageMeta'
import { OPRDisplay } from '@/features/matches/OPRDisplay'
import { MatchCard } from '@/features/matches/MatchCard'
import { BezierChart } from '@/features/matches/BezierChart'
import { FieldDiagram } from '@/features/matches/FieldDiagram'
import { VideoEmbed } from '@/features/matches/VideoEmbed'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'
import { ScrambleText } from '@/components/motion/ScrambleText'
import { KineticBackground } from '@/features/landing/KineticBackground'
import { useMatchResults, useSeasonSummary, exportMatchesCSV } from '@/hooks/useMatches'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────────────────────
// SECTION HEADER — reusable section label treatment
// ─────────────────────────────────────────────────────────────────────────────

function SectionHeader({
  label,
  title,
  subtitle,
  accent = '#0044ff',
}: {
  label: string
  title: string
  subtitle?: string
  accent?: string
}) {
  return (
    <div className="mb-10">
      <div className="mb-2 flex items-center gap-3">
        <div className="h-px w-6 opacity-60" style={{ background: accent }} />
        <span
          className="font-mono text-[11px] uppercase tracking-[0.3em]"
          style={{ color: accent }}
        >
          {label}
        </span>
      </div>
      <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
        <ScrambleText text={title} />
      </h2>
      {subtitle && (
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/40">
          {subtitle}
        </p>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// WIN-LOSS RECORD DISPLAY
// ─────────────────────────────────────────────────────────────────────────────

function WLTRecord({
  wins,
  losses,
  ties,
  winRate,
}: {
  wins: number
  losses: number
  ties: number
  winRate: number
}) {
  const total = wins + losses + ties
  const winPct = total > 0 ? (wins / total) * 100 : 0
  const lossPct = total > 0 ? (losses / total) * 100 : 0

  return (
    <div className="flex items-center gap-6">
      {/* W/L/T numerics */}
      <div className="flex items-baseline gap-2">
        <span className="font-display text-4xl font-bold tabular-nums text-[#00d4ff]">
          {wins}
        </span>
        <span className="font-mono text-lg text-white/20">-</span>
        <span className="font-display text-4xl font-bold tabular-nums text-[#ff5e00]">
          {losses}
        </span>
        {ties > 0 && (
          <>
            <span className="font-mono text-lg text-white/20">-</span>
            <span className="font-display text-4xl font-bold tabular-nums text-white/40">
              {ties}
            </span>
          </>
        )}
      </div>

      {/* Bar */}
      <div className="min-w-[120px] flex-1">
        <div className="flex h-2 overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="h-full bg-[#00d4ff]"
            initial={{ width: 0 }}
            animate={{ width: `${winPct}%` }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          />
          <motion.div
            className="h-full bg-[#ff5e00]"
            initial={{ width: 0 }}
            animate={{ width: `${lossPct}%` }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          />
        </div>
        <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/25">
          {winRate}% win rate
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MATCHES LIST SECTION
// ─────────────────────────────────────────────────────────────────────────────

function MatchListSection() {
  const { data: matches, isLoading, isError } = useMatchResults()
  const summary = useSeasonSummary(matches)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadDone, setDownloadDone] = useState(false)

  const handleExport = () => {
    if (!matches || isDownloading) return
    setIsDownloading(true)
    // Brief delay for terminal typewriter effect
    setTimeout(() => {
      exportMatchesCSV(matches)
      setIsDownloading(false)
      setDownloadDone(true)
      setTimeout(() => setDownloadDone(false), 3000)
    }, 800)
  }

  const [currentPage, setCurrentPage] = useState(1)
  const matchesPerPage = 7
  const displayMatches = matches ?? []
  
  const totalPages = Math.ceil(displayMatches.length / matchesPerPage)
  const startIndex = (currentPage - 1) * matchesPerPage
  const paginatedMatches = displayMatches.slice(startIndex, startIndex + matchesPerPage)

  // Reset to page 1 if data changes significantly
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1)
    }
  }, [totalPages, currentPage])

  return (
    <section id="matches-list" aria-label="Match results timeline">
      <SectionHeader
        label="Season Record"
        title="Match Results"
        subtitle="All matches from the 2025-26 DECODE season. Live data pulled from FTCScout and cached client-side."
        accent="#00d4ff"
      />

      {/* W/L/T Record */}
      {(matches || isLoading) && (
        <div className="mb-8 rounded-2xl border border-white/6 bg-[#030712]/60 p-6 backdrop-blur-xl">
          {isLoading ? (
            <div className="flex gap-4">
              <SkeletonLoader className="h-10 w-40" />
              <SkeletonLoader className="h-10 flex-1" />
            </div>
          ) : (
            <WLTRecord
              wins={summary.wins}
              losses={summary.losses}
              ties={summary.ties}
              winRate={summary.winRate}
            />
          )}
        </div>
      )}

      {/* Error state */}
      {isError && displayMatches.length === 0 && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-destructive-base/30 bg-destructive-base/10 px-4 py-3">
          <div className="h-1.5 w-1.5 rounded-full bg-destructive-base" />
          <span className="font-mono text-xs text-white/40">
            FTCScout API unavailable — displaying cached season data
          </span>
        </div>
      )}

      {/* Loading skeletons */}
      {isLoading && (
        <div className="space-y-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <SkeletonLoader key={i} className="h-16 w-full" />
          ))}
        </div>
      )}

      {/* Match list with Pagination */}
      {!isLoading && paginatedMatches.length > 0 && (
        <>
          <div className="space-y-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-2"
              >
                {paginatedMatches.map((match, i) => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    index={i}
                    isSelected={selectedId === match.id}
                    onClick={() =>
                      setSelectedId((prev) => (prev === match.id ? null : match.id))
                    }
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex h-9 items-center gap-2 rounded-lg border border-white/8 bg-white/5 px-4 font-mono text-[10px] uppercase tracking-widest text-white/50 transition-all hover:bg-white/10 disabled:opacity-20 active:scale-95"
                >
                  Prev
                </button>
                <div className="flex gap-1.5">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={cn(
                        'h-1.5 rounded-full transition-all duration-300',
                        currentPage === i + 1
                          ? 'w-6 bg-[#00d4ff]'
                          : 'w-1.5 bg-white/10 hover:bg-white/20'
                      )}
                      aria-label={`Go to page ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="flex h-9 items-center gap-2 rounded-lg border border-white/8 bg-white/5 px-4 font-mono text-[10px] uppercase tracking-widest text-white/50 transition-all hover:bg-white/10 disabled:opacity-20 active:scale-95"
                >
                  Next
                </button>
              </div>

              <div className="font-mono text-[10px] uppercase tracking-widest text-white/20">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          )}
        </>
      )}

      {/* Empty state when API returns nothing */}
      {!isLoading && displayMatches.length === 0 && (
        <div className="py-20 text-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/20">
            No match data available
          </div>
        </div>
      )}

      {/* CSV Export */}
      {!isLoading && displayMatches.length > 0 && (
        <div className="mt-6 flex justify-end">
          <button
            id="csv-export-btn"
            aria-label="Export match data as CSV"
            onClick={handleExport}
            disabled={isDownloading}
            className="group relative overflow-hidden rounded-xl border border-white/8 bg-[#030712]/80 px-5 py-3 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.04] active:scale-98"
          >
            {/* Shimmer on hover */}
            <div className="pointer-events-none absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />

            <div className="flex items-center gap-3">
              {/* Terminal icon */}
              <svg
                className="h-3.5 w-3.5 text-white/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>

              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50 transition-colors group-hover:text-white/80">
                {isDownloading
                  ? 'Preparing...'
                  : downloadDone
                    ? 'Downloaded_'
                    : 'Export CSV'}
              </span>

              {/* Blinking cursor when done */}
              {downloadDone && (
                <span className="cursor-blink font-mono text-[11px] text-white/50">
                  |
                </span>
              )}
            </div>
          </button>
        </div>
      )}
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHART SECTION
// ─────────────────────────────────────────────────────────────────────────────

function ChartSection() {
  const { data: matches, isLoading } = useMatchResults()
  const ref = useRef<HTMLElement>(null)

  return (
    <section ref={ref} id="score-chart" aria-label="Season score trajectory chart">
      <SectionHeader
        label="Score Analytics"
        title="Season Arc"
        subtitle="Score trajectory across all qualification matches. Each point represents a single match result."
        accent="#0044ff"
      />

      <div className="overflow-hidden rounded-2xl border border-white/6 bg-[#030712]/80 p-6 backdrop-blur-xl">
        {isLoading && (
          <div className="space-y-3">
            <SkeletonLoader className="h-4 w-48" />
            <SkeletonLoader className="h-[280px] w-full" />
          </div>
        )}

        {!isLoading && matches && matches.length > 0 && (
          <BezierChart matches={matches} />
        )}

        {!isLoading && (!matches || matches.length === 0) && (
          <div className="flex h-[280px] items-center justify-center">
            <span className="font-mono text-xs text-white/20">
              Awaiting match data
            </span>
          </div>
        )}

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center gap-6 border-t border-white/5 pt-4">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-6 rounded-full bg-[#00d4ff] opacity-80" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
              Win
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-6 rounded-full bg-[#ff5e00] opacity-80" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
              Loss
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full border border-white/20" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
              Tie
            </span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="h-px w-6 border-t border-dashed border-[#ff5e00]/50" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
              Season Avg
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FIELD DIAGRAM SECTION
// ─────────────────────────────────────────────────────────────────────────────

function FieldSection() {
  return (
    <section id="field-diagram" aria-label="Autonomous strategy cards">
      <SectionHeader
        label="Autonomous Strategy"
        title="Auto Routines"
        subtitle="Four distinct autonomous strategies tuned for different field positions and intake configurations. Engineered by the Electrolights Software Team."
        accent="#7c3aed"
      />

      <div className="overflow-hidden rounded-2xl border border-white/6 bg-[#030712]/80 backdrop-blur-xl">
        {/* Header bar */}
        <div className="flex items-center gap-3 border-b border-white/5 px-5 py-3">
          <div className="h-2 w-2 rounded-full bg-[#7c3aed]" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
            Strategy Playbook / DECODE 2025-26
          </span>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-[#00d4ff]" />
            <span className="font-mono text-[9px] text-white/20">
              Electrolights Software Team / Autonomous
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <FieldDiagram />
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// VIDEO SECTION
// ─────────────────────────────────────────────────────────────────────────────

function FootageSection() {
  return (
    <section id="match-footage" aria-label="Competition video footage">
      <SectionHeader
        label="Competition Footage"
        title="Match Footage"
        subtitle="Match footage recorded by Electrolights Media. All rights reserved."
        accent="#ff5e00"
      />
      <VideoEmbed />
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE HERO — telemetry-style hero banner
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// MATCHES HERO — full landing-page treatment
// KineticBackground canvas + GSAP scroll parallax + ghost number watermark
// ─────────────────────────────────────────────────────────────────────────────

function MatchesHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const numberRef  = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const subRef     = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  // GSAP scroll-driven parallax — identical to HeroSection
  useEffect(() => {
    if (prefersReduced || !sectionRef.current) return

    const ctx = gsap.context(() => {
      // Ghost number drifts up and fades on scroll
      gsap.to(numberRef.current, {
        yPercent: -30,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Main heading fades out slightly faster
      gsap.to(headingRef.current, {
        yPercent: -20,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '20% top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // OPR HUD sub-section follows behind
      gsap.to(subRef.current, {
        yPercent: -12,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '35% top',
          end: '85% top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReduced])

  return (
    <section
      ref={sectionRef}
      id="matches-hero"
      aria-label="Match data hero"
      className="relative flex min-h-[calc(100dvh-8dvh)] flex-col items-center justify-center overflow-hidden"
    >
      {/* ── KineticBackground canvas — same component as landing page ── */}
      <KineticBackground />

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-bg-base/50 via-transparent to-bg-base pointer-events-none" />

      {/* ── Ghost number watermark ── */}
      <div
        ref={numberRef}
        className="absolute inset-0 z-[2] flex select-none items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <span
          className="whitespace-nowrap font-black leading-none tracking-tighter"
          style={{
            fontSize: 'clamp(10rem, 22vw, 26rem)',
            background: 'linear-gradient(180deg, rgba(0,68,255,0.14) 0%, rgba(255,94,0,0.05) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          30686
        </span>
      </div>

      {/* ── Main heading block ── */}
      <div
        ref={headingRef}
        className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center sm:px-8"
      >
        {/* Season badge */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-electric/30 bg-brand-electric/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-brand-electric backdrop-blur-sm">
            <Zap className="h-3 w-3" aria-hidden="true" />
            FTCScout Live — Season 2025-26
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 font-display text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          MATCH
          <span
            style={{
              background: 'linear-gradient(135deg, #0044ff, #00d4ff, #ff5e00)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {' '}DATA
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-3 max-w-xl text-base font-medium text-text-muted sm:text-lg"
        >
          Live OPR analytics, score trajectories, autonomous breakdowns,
          and full match results — streamed from FTCScout.
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-sm font-semibold text-brand-orange/80"
        >
          OPR 91.58 &bull; High Score 253 &bull; 21-Ball Autonomous
        </motion.p>
      </div>

      {/* ── OPR / Stats HUD ── pulled slightly lower to avoid watermark clash ── */}
      <div
        ref={subRef}
        className="relative z-10 mt-14 w-full max-w-5xl px-6 sm:px-8"
      >
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <OPRDisplay />
        </motion.div>
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
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE ASSEMBLY
// ─────────────────────────────────────────────────────────────────────────────

export default function MatchesPage() {
  return (
    <>
      <PageMeta
        title="Match Data"
        description="Live OPR analytics, season score arc, autonomous path diagrams, and full match results for Electrolights FTC Team 30686 — powered by FTCScout."
        ogUrl="https://electrolights30686.com/matches"
        ogImage="/og/og-matches.jpg"
      />

      <div className="min-h-screen">
        {/* Hero + OPR telemetry HUD */}
        <MatchesHero />

        {/* Main content column */}
        <div className="mx-auto max-w-5xl space-y-24 px-6 pb-24 sm:px-8">
          {/* 1 — Match results timeline */}
          <MatchListSection />

          {/* 2 — Score arc bezier chart */}
          <ChartSection />

          {/* 3 — Field diagram */}
          <FieldSection />

          {/* 4 — Video footage */}
          <FootageSection />
        </div>
      </div>
    </>
  )
}
