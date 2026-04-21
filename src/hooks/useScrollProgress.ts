import { useState, useEffect, useCallback, type RefObject } from 'react'

/**
 * Returns a 0→1 scroll progress value.
 *
 * If a `ref` is provided, tracks that element's visibility within the viewport.
 * Otherwise tracks the entire page scroll.
 */
export function useScrollProgress(ref?: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0)

  const handleScroll = useCallback(() => {
    if (ref?.current) {
      const el = ref.current
      const rect = el.getBoundingClientRect()
      const total = el.scrollHeight - window.innerHeight
      const raw = -rect.top / (total || 1)
      setProgress(Math.max(0, Math.min(1, raw)))
    } else {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0)
    }
  }, [ref])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial measurement
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return progress
}
