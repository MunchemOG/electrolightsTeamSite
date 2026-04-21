import { type ReactNode } from 'react'

/**
 * Temporarily a passthrough component for Phase 1.
 * Later, this will check Supabase auth state and force a redirect to /portal/login if unauthenticated.
 */
export function AuthGuard({ children }: { children: ReactNode }) {
  // TODO: Sprint 5.1 -> Wire to useAuth() hook
  const isAuthenticated = true 

  if (!isAuthenticated) {
    // return <Navigate to="/portal/login" replace />
  }

  return children
}
