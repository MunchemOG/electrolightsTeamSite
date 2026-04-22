import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * A 3D perspective grid background.
 * Creates an endless "Tron" style landscape scrolling towards the user.
 */
export function CyberGrid() {
  const prefersReduced = useReducedMotion()

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-bg-base perspective-[800px]">
      {/* Dark overlay to fade to black at the horizon */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-bg-base via-transparent to-bg-base" />

      {/* Grid Plane */}
      <div
        className={`absolute bottom-[-50%] left-[-50%] right-[-50%] top-0 z-0
          bg-[linear-gradient(rgba(0,162,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(0,162,255,0.3)_1px,transparent_1px)]
          bg-[size:60px_60px] [transform:rotateX(65deg)]
          ${prefersReduced ? '' : 'animate-[grid-scroll_1.5s_linear_infinite]'}
        `}
      />

      {/* Center glowing horizon light */}
      <div className="absolute left-1/2 top-[70%] h-64 w-full max-w-6xl -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-brand-electric/20 blur-[120px] opacity-60" />
      <div className="absolute left-1/2 top-[70%] h-1 w-full bg-gradient-to-r from-transparent via-brand-electric/50 to-transparent blur-sm" />
    </div>
  )
}
