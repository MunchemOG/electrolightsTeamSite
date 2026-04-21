import { PageMeta } from '@/components/seo/PageMeta'

export default function TeamPage() {
  return (
    <>
      <PageMeta
        title="The Team"
        description="Meet the engineers, programmers, and outreach leads behind Electrolights FTC 30686. Bios, subteams, tool proficiencies, and our season story."
        ogUrl="https://electrolights30686.com/team"
        ogImage="/og/og-team.jpg"
      />
      <div className="flex h-screen items-center justify-center text-white">
        <h1 className="text-2xl">TeamPage Stub</h1>
      </div>
    </>
  )
}
