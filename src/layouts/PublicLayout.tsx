import { Outlet, Link } from 'react-router-dom'
import { Rocket } from 'lucide-react'
import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { useCursor } from '@/hooks/useCursor'
import { PrivacyNotice } from '@/components/ui/PrivacyNotice'

export function PublicLayout() {
  const { position, isHovering } = useCursor()

  // Initialize Lenis Smooth Scroll on Mount
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  // Procedural SVG Noise (No external image file required!)
  const noiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`

  return (
    <div className="relative min-h-screen bg-bg-base text-text-main">
      
      {/* 1. Dynamic Spotlight Cursor */}
      <div 
        className="pointer-events-none fixed inset-0 z-[45] transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 600px at ${position.x}px ${position.y}px, rgba(0, 68, 255, ${isHovering ? '0.12' : '0.04'}), transparent 80%)`,
        }}
      />

      {/* 2. Procedural Noise Overlay */}
      <div 
        className="pointer-events-none fixed inset-0 z-[100] opacity-[0.04] mix-blend-overlay" 
        style={{ backgroundImage: noiseSvg }}
      />
      
      {/* 3. FluidMenu NavBar */}
      <header className="fixed top-0 z-50 w-full border-b border-glass bg-bg-surface/50 backdrop-blur-xl transition-all duration-300">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2 font-bold tracking-tight text-white transition-colors hover:text-brand-electric">
            <Rocket className="h-5 w-5 text-brand-electric" />
            ELECTROLIGHTS<span className="text-text-muted">//</span>30686
          </Link>
          
          {/* Top Pill-Shaped Fluid Navigation */}
          <nav aria-label="Primary navigation" className="hidden items-center rounded-full border border-glass bg-bg-base/40 px-6 py-2 backdrop-blur-md md:flex gap-6 text-sm font-medium text-text-muted">
            <Link to="/team" className="transition-colors hover:text-white">Team</Link>
            <Link to="/robot" className="transition-colors hover:text-white">Robot</Link>
            <Link to="/outreach" className="transition-colors hover:text-white">Outreach</Link>
            <Link to="/matches" className="transition-colors hover:text-white">Matches</Link>
            <Link to="/sponsors" className="transition-colors hover:text-white">Sponsors</Link>
            <div className="mx-1 h-4 w-px bg-glass"></div>
            <Link to="/portal" className="text-brand-orange transition-colors hover:text-white">Portal Login</Link>
          </nav>
        </div>
      </header>

      {/* Main Content Rendered Here */}
      <main className="min-h-screen pt-16">
        <Outlet />
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-40 border-t border-glass bg-bg-surface py-8 text-center text-sm text-text-muted">
        <p>© {new Date().getFullYear()} Electrolights FTC 30686. Built for the endgame.</p>
      </footer>

      {/* Privacy / Analytics Notice (shown once, dismissed via localStorage) */}
      <PrivacyNotice />
    </div>
  )
}
