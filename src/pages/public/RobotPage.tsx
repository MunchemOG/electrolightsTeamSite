import { PageMeta } from '@/components/seo/PageMeta'

export default function RobotPage() {
  return (
    <>
      <PageMeta
        title="Vectair — Our Robot"
        description="An in-depth look at our 2025-26 FTC robot. Drivetrain specs, intake tolerances, launcher math, OpenCV vision pipeline, and our high-fidelity autonomous."
        ogUrl="https://electrolights30686.com/robot"
        ogImage="/og/og-robot.jpg"
      />
      <div className="flex h-screen items-center justify-center text-white">
        <h1 className="text-2xl">RobotPage Stub</h1>
      </div>
    </>
  )
}
