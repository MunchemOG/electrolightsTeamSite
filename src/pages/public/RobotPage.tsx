import { lazy, Suspense } from 'react'
import { PageMeta } from '@/components/seo/PageMeta'
import { RobotHero } from '@/features/robot/RobotHero'
import { SeasonChangelog } from '@/features/robot/SeasonChangelog'
import { SpecSheet } from '@/features/robot/SpecSheet'
import { SubsystemShowcase, AutoScrubSection } from '@/features/robot/SubsystemShowcase'
import { MagneticCADButton } from '@/features/robot/MagneticCADButton'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'

// Lazy-load the Three.js viewer to keep initial bundle lean
const VectairViewer = lazy(() =>
  import('@/features/robot/VectairViewer').then((m) => ({ default: m.VectairViewer }))
)

export default function RobotPage() {
  return (
    <>
      <PageMeta
        title="Vectair — Our Robot | FTC 30686 Electrolights"
        description="An in-depth look at our 2025-26 FTC robot. Drivetrain specs, intake tolerances, launcher math, OpenCV vision pipeline, and our high-fidelity 21-ball autonomous."
        ogUrl="https://electrolights30686.com/robot"
        ogImage="/og/og-robot.jpg"
      />

      {/* Full dark background for this page */}
      <div
        className="relative min-h-screen overflow-x-hidden"
        style={{ background: 'linear-gradient(180deg, #030712 0%, #050a1a 50%, #030712 100%)' }}
      >
        {/* 1. Cinematic 3D hero */}
        <RobotHero />

        {/* 2. Season build timeline — V1 → V2 → Vectair */}
        <SeasonChangelog />

        {/* 3. Interactive Three.js 3D model viewer */}
        <Suspense
          fallback={
            <div className="container mx-auto px-6 py-24">
              <SkeletonLoader className="h-[600px] rounded-2xl" />
            </div>
          }
        >
          <VectairViewer />
        </Suspense>

        {/* 4. Subsystem breakdown with self-drawing SVG blueprints */}
        <SubsystemShowcase />

        {/* 5. Technical spec sheet per subsystem */}
        <SpecSheet />

        {/* 6. 21-ball auto scrub video */}
        <div className="container mx-auto px-6">
          <AutoScrubSection />
        </div>

        {/* 7. Magnetic CAD download CTA */}
        <MagneticCADButton />

        {/* Bottom fade */}
        <div
          className="h-32 w-full pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #030712)' }}
          aria-hidden
        />
      </div>
    </>
  )
}
