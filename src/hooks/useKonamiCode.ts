import { useEffect, useState } from 'react'

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

/**
 * Tracks whether the user has entered the Konami code.
 * Great for triggering "Overdrive" or dev Easter eggs.
 */
export function useKonamiCode() {
  const [success, setSuccess] = useState(false)
  const [inputBuffer, setInputBuffer] = useState<string[]>([])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const key = e.key
      // Update buffer
      const newBuffer = [...inputBuffer, key].slice(-KONAMI_CODE.length)
      setInputBuffer(newBuffer)

      // Check match
      if (newBuffer.join(',') === KONAMI_CODE.join(',')) {
        setSuccess(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [inputBuffer])

  return success
}
