import { useState, useEffect } from 'react'

/**
 * Hook to constantly listen for system-level 'prefers-reduced-motion' settings.
 * If this returns true, we will mathematically disable all 3D or heavy GSAP animations in the components.
 */
export function useReducedMotion() {
  const [matches, setMatches] = useState(() => {
    // SSR safe check
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
    return false
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = () => setMatches(mediaQuery.matches)

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return matches
}
