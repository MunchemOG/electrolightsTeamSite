import { useState, useEffect } from 'react'
import { X, BarChart2 } from 'lucide-react'

const STORAGE_KEY = 'el-cookie-consent'

/**
 * Minimal, on-brand cookie / privacy notice tied to Plausible Analytics.
 *
 * Plausible is privacy-first (no cookies, no personal data), so this notice
 * is informational only — no opt-in required by GDPR. We still show it for
 * full transparency.
 *
 * Consent state is stored in localStorage so it only shows once.
 */
export function PrivacyNotice() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      // Small delay so it doesn't pop immediately on first paint
      const timer = setTimeout(() => setVisible(true), 2500)
      return () => clearTimeout(timer)
    }
  }, [])

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, 'dismissed')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Privacy notice"
      className="animate-slide-up fixed bottom-6 left-1/2 z-[200] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 rounded-2xl border border-glass bg-bg-surface/90 p-4 shadow-2xl backdrop-blur-xl sm:w-auto"
    >
      <div className="flex items-start gap-4">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-electric/10">
          <BarChart2 className="h-4 w-4 text-brand-electric" aria-hidden="true" />
        </div>

        <div className="flex-1">
          <p className="text-sm font-semibold text-text-main">Analytics Notice</p>
          <p className="mt-1 text-xs leading-relaxed text-text-muted">
            We use{' '}
            <a
              href="https://plausible.io"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-brand-electric"
            >
              Plausible Analytics
            </a>{' '}
            — a privacy-first tool that collects <strong>zero personal data</strong>, uses no
            cookies, and is fully GDPR-compliant. No tracking, no profiling, ever.
          </p>
        </div>

        <button
          id="privacy-notice-dismiss"
          onClick={dismiss}
          aria-label="Dismiss privacy notice"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-bg-base hover:text-white"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
