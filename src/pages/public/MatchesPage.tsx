import { PageMeta } from '@/components/seo/PageMeta'

export default function MatchesPage() {
  return (
    <>
      <PageMeta
        title="Match Data"
        description="Live OPR, season score trends, autonomous path diagrams, and full match results for Electrolights FTC 30686 — powered by FTCScout."
        ogUrl="https://electrolights30686.com/matches"
        ogImage="/og/og-matches.jpg"
      />
      <div className="flex h-screen items-center justify-center text-white">
        <h1 className="text-2xl">MatchesPage Stub</h1>
      </div>
    </>
  )
}
