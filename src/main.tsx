import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from './components/ui/ErrorBoundary.tsx'
import { SkeletonLoader } from './components/ui/SkeletonLoader.tsx'
import { ReducedMotionWrapper } from './components/motion/ReducedMotionWrapper.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Cache requests for 5 minutes by default
      refetchOnWindowFocus: false, // Don't refetch on tab switch to save API calls
      retry: 1, // Only retry once on failure
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* HelmetProvider: enables react-helmet-async for per-page <head> management */}
    <HelmetProvider>
      {/* ReducedMotionWrapper: adds .reduce-motion class when OS setting is active */}
      <ReducedMotionWrapper className="contents">
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <Suspense fallback={<SkeletonLoader className="min-h-screen w-full rounded-none border-none bg-bg-base" />}>
              <App />
            </Suspense>
          </QueryClientProvider>
        </ErrorBoundary>
      </ReducedMotionWrapper>
    </HelmetProvider>
  </StrictMode>,
)
