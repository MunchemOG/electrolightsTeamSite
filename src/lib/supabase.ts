import { createClient } from '@supabase/supabase-js'

// Strip trailing /rest/v1/ if present (the env var was set for direct REST usage)
const rawUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '')
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

/**
 * Shared Supabase client — anon key only.
 * Used for public-facing operations (contact form rate-limiting, read-only queries).
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
