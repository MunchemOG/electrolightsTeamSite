// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface ContactPayload {
  name: string
  email: string
  subject: string
  message: string
}

export type ContactResult =
  | { ok: true }
  | { ok: false; code: 'RATE_LIMITED'; retryAfterMs: number }
  | { ok: false; code: 'EMAIL_ERROR'; message: string }
  | { ok: false; code: 'NETWORK_ERROR'; message: string }

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

// Supabase project ref extracted from the URL env var
const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string).replace(/\/rest\/v1\/?$/, '')
const EDGE_FN_URL = `${SUPABASE_URL}/functions/v1/send-contact-email`
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string

// ─────────────────────────────────────────────────────────────────────────────
// Client fingerprint (lightweight, cookie-free)
// ─────────────────────────────────────────────────────────────────────────────

function getClientFingerprint(): string {
  return [
    navigator.language,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    screen.width,
    screen.height,
    navigator.hardwareConcurrency ?? 0,
  ].join('|')
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Submits a contact form message via a Supabase Edge Function.
 *
 * The Edge Function handles:
 *  1. Rate limiting (20/hour per client fingerprint) against Supabase DB
 *  2. Email delivery via Resend (server-side, no CORS issues)
 *  3. Persisting the submission record
 */
export async function submitContactForm(payload: ContactPayload): Promise<ContactResult> {
  try {
    const res = await fetch(EDGE_FN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        ...payload,
        fingerprint: getClientFingerprint(),
      }),
    })

    const data = await res.json().catch(() => ({}))

    if (res.status === 429) {
      return {
        ok: false,
        code: 'RATE_LIMITED',
        retryAfterMs: data.retryAfterMs ?? 3_600_000,
      }
    }

    if (!res.ok) {
      return {
        ok: false,
        code: 'EMAIL_ERROR',
        message: data.detail ?? data.error ?? `HTTP ${res.status}`,
      }
    }

    return { ok: true }
  } catch (err) {
    return {
      ok: false,
      code: 'NETWORK_ERROR',
      message: String(err),
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Utility: format ms remaining as a human-readable string (e.g. "47 min")
// ─────────────────────────────────────────────────────────────────────────────

export function formatRetryTime(ms: number): string {
  const minutes = Math.ceil(ms / 60_000)
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const rem = minutes % 60
  return rem > 0 ? `${hours}h ${rem}m` : `${hours}h`
}
