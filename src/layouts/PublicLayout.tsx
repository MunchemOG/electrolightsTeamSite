import { Outlet, Link, useLocation } from 'react-router-dom'

import teamLogo from '@/assets/logos/teamLogo.jpg'
import { useEffect, useState, memo } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)
import { useCursor } from '@/hooks/useCursor'
import { PrivacyNotice } from '@/components/ui/PrivacyNotice'

const navLinks = [
  { path: '/team', label: 'Team' },
  { path: '/robot', label: 'Robot' },
  { path: '/outreach', label: 'Outreach' },
  { path: '/matches', label: 'Matches' },
  { path: '/sponsors', label: 'Sponsors' }
]

const FluidMenu = memo(function FluidMenu() {
  const location = useLocation()
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 200) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  })

  return (
    <header className="fixed top-6 z-50 w-full px-6 flex justify-center pointer-events-none">
      <motion.div 
        className="pointer-events-auto flex items-center justify-between rounded-full border border-white/10 bg-black/40 px-4 py-2 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:bg-black/50 md:w-auto w-full max-w-4xl"
        animate={{ 
          y: isScrolled ? -10 : 0,
          boxShadow: isScrolled ? "0 10px 40px -10px rgba(0,255,255,0.1)" : "0 10px 40px -10px rgba(0,0,0,0.5)" 
        }}
      >
        <Link to="/" className="mr-8 flex items-center gap-2 font-bold tracking-tight text-white transition-transform hover:scale-105 active:scale-95 group">
          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-white/10">
            <img src={teamLogo} alt="Electrolights Logo" className="h-full w-full object-cover" />
          </div>
          <span className="hidden sm:inline">ELECTROLIGHTS</span>
        </Link>
        
        <nav className="relative flex items-center gap-1 hidden md:flex">
          {navLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}`}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white/10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            )
          })}
          <div className="mx-2 h-4 w-px bg-white/20"></div>
          <Link 
            to="/portal" 
            className="group relative overflow-hidden rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-1.5 text-sm font-medium text-brand-orange transition-all hover:border-brand-orange hover:bg-brand-orange/20 hover:shadow-[0_0_15px_rgba(255,87,34,0.3)]"
          >
            <span className="relative z-10">Team Login</span>
          </Link>
        </nav>

        {/* Mobile menu button placeholder */}
        <div className="md:hidden">
           <Link 
            to="/portal" 
            className="group relative overflow-hidden rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-1.5 text-sm font-medium text-brand-orange transition-all hover:border-brand-orange hover:bg-brand-orange/20"
          >
            <span className="relative z-10">Team</span>
          </Link>
        </div>
      </motion.div>
    </header>
  )
})

const PremiumFooter = memo(function PremiumFooter() {
  return (
    <footer className="w-full px-4 sm:px-6 pb-6 mt-auto flex justify-center z-40 pointer-events-none">
      <div className="pointer-events-auto flex w-full max-w-4xl flex-col sm:flex-row items-center justify-between rounded-3xl sm:rounded-full border border-white/10 bg-black/40 px-6 py-3 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:bg-black/50 gap-4 sm:gap-0">
        
        {/* Left: Copyright & Logo */}
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 text-xs text-white/50 hover:text-white font-medium tracking-wide transition-all hover:scale-105 active:scale-95 group">
           <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full border border-white/10 opacity-70 group-hover:opacity-100 transition-opacity">
             <img src={teamLogo} alt="Electrolights Logo" className="h-full w-full object-cover" />
           </div>
           <span className="hidden md:inline">© {new Date().getFullYear()}</span>
           <span>Electrolights 30686</span>
        </Link>

        {/* Center: Utility Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-medium text-white/60">
           <Link to="/team" className="hover:text-white transition-colors">Team</Link>
           <Link to="/robot" className="hover:text-white transition-colors">Robot</Link>
           <Link to="/outreach" className="hover:text-white transition-colors">Outreach</Link>
           <Link to="/matches" className="hover:text-white transition-colors">Matches</Link>
           <Link to="/sponsors" className="hover:text-white transition-colors">Sponsors</Link>
           <div className="h-3 w-px bg-white/20 mx-1"></div>
           <Link to="/portal" className="text-brand-orange hover:text-brand-orange/80 transition-colors font-semibold tracking-wide">Team Login</Link>
        </nav>

        {/* Right: Socials */}
        <div className="flex items-center gap-4">
           <div className="hidden lg:flex items-center gap-3">
             <a href="#" className="text-white/40 hover:text-brand-electric transition-all hover:scale-110 active:scale-95">
               <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
             </a>
             <a href="https://ftcscout.org/teams/30686" target="_blank" rel="noopener noreferrer" title="FTC Scout" className="text-white/40 hover:text-brand-electric transition-all hover:scale-110 active:scale-95">
               <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
             </a>
             <a href="#" className="text-white/40 hover:text-brand-electric transition-all hover:scale-110 active:scale-95">
               <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
             </a>
           </div>
        </div>

      </div>
    </footer>
  )
})

export function PublicLayout() {
  const { position, isHovering } = useCursor()

  // Initialize Lenis Smooth Scroll on Mount and sync with GSAP
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true,
    })

    // Synchronize Lenis scrolling with GSAP's ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Add Lenis's requestAnimationFrame to GSAP's ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    
    // Disable GSAP lag smoothing to prevent jitter with Lenis
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
      lenis.destroy()
    }
  }, [])

  // Procedural SVG Noise (No external image file required!)
  const noiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`

  return (
    <div className="relative min-h-screen bg-bg-base text-text-main flex flex-col">
      
      {/* 1. Dynamic Spotlight Cursor */}
      <div 
        className="pointer-events-none fixed inset-0 z-[45] mix-blend-screen transition-opacity duration-300"
      >
        <div 
          className="absolute inset-0 transition-transform duration-75 ease-out"
          style={{
            background: `radial-gradient(circle 350px at ${position.x}px ${position.y}px, rgba(255, 255, 255, ${isHovering ? '0.05' : '0.02'}), transparent 100%)`,
          }}
        />
      </div>

      {/* 2. Procedural Noise Overlay */}
      <div 
        className="pointer-events-none fixed inset-0 z-[100] opacity-[0.04] mix-blend-overlay" 
        style={{ backgroundImage: noiseSvg }}
      />
      
      {/* 3. FluidMenu NavBar */}
      <FluidMenu />

      {/* Main Content Rendered Here */}
      <main className="min-h-screen flex-grow pt-16">
        <Outlet />
      </main>

      {/* Minimal Footer */}
      <PremiumFooter />

      {/* Privacy / Analytics Notice (shown once, dismissed via localStorage) */}
      <PrivacyNotice />
    </div>
  )
}
