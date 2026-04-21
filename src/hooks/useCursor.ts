import { useEffect, useState } from 'react'

/**
 * Tracks exact mouse coordinates globally to feed into the dynamic spotlight shader in the layouts.
 * Also tracks if the user is hovering over interactive elements (links/buttons) to expand the spotlight intensity.
 */
export function useCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    // SSR Safe
    if (typeof window === 'undefined') return

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    
    // Expand the radial spotlight when hovering over actionable targets
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' || 
        target.closest('a') || 
        target.closest('button')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', updatePosition)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', updatePosition)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return { position, isHovering }
}
