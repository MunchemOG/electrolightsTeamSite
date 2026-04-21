import { PageMeta } from '@/components/seo/PageMeta'

export default function LandingPage() {
  return (
    <>
      <PageMeta
        title="Home"
        description="Electrolights FTC Team 30686 — engineering excellence meets kinetic design. Follow our journey through the 2024-25 FTC season with Vectair."
        ogUrl="https://electrolights30686.com/"
        ogImage="/og/og-landing.jpg"
      />
      <div className="flex h-screen items-center justify-center text-white">
        <h1 className="text-2xl">LandingPage Stub</h1>
      </div>
    </>
  )
}
