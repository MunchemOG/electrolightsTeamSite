import { Link } from 'react-router-dom'
import { Cpu, Home } from 'lucide-react'
import { PageMeta } from '@/components/seo/PageMeta'

export default function NotFoundPage() {
  return (
    <>
      <PageMeta
        title="404 — Signal Lost"
        description="The sector you're looking for doesn't exist in our timeline. Navigate back to Electrolights FTC 30686."
        noIndex={true}
      />
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      
      <div className="relative mb-8">
        {/* Glowing Engine Aura */}
        <div className="absolute inset-0 animate-pulse rounded-full bg-brand-electric opacity-20 blur-[50px]"></div>
        <Cpu className="relative h-28 w-28 text-brand-electric/80" strokeWidth={1} />
      </div>
      
      <h1 className="mb-2 text-7xl font-black tracking-tighter text-white md:text-9xl drop-shadow-2xl">
        404
      </h1>
      <h2 className="mb-6 text-xl font-bold tracking-[0.2em] text-brand-electric uppercase">
        Signal Lost in the Void
      </h2>
      
      <p className="mx-auto mb-12 max-w-md text-text-muted leading-relaxed">
        Our autonomous routines couldn't lock onto the coordinates you requested. 
        This sector may have been moved, deleted, or never existed in this timeline.
      </p>

      <Link
        to="/"
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-brand-electric px-8 py-3.5 font-bold text-white shadow-[0_0_20px_rgba(0,68,255,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(0,68,255,0.6)] active:scale-95"
      >
        <Home className="h-5 w-5" />
        <span>Return to Base</span>
      </Link>
    </div>
    </>
  )
}
