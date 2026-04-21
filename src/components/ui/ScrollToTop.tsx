import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Ensures the browser window snaps back to the absolute top seamlessly
 * whenever the user navigates between different URL paths.
 */
export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    })
  }, [pathname])

  return null
}
