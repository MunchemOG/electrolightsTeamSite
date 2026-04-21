import { PageMeta } from '@/components/seo/PageMeta'

export default function ContactPage() {
  return (
    <>
      <PageMeta
        title="Contact"
        description="Reach out to Electrolights FTC 30686 for sponsorship inquiries, mentorship collaboration, or general questions. We'd love to connect."
        ogUrl="https://electrolights30686.com/contact"
        ogImage="/og/og-contact.jpg"
      />
      <div className="flex h-screen items-center justify-center text-white">
        <h1 className="text-2xl">ContactPage Stub</h1>
      </div>
    </>
  )
}
