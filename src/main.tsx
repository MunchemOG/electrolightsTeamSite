import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from './components/ui/ErrorBoundary.tsx'
import { SkeletonLoader } from './components/ui/SkeletonLoader.tsx'

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
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<SkeletonLoader className="min-h-screen w-full rounded-none border-none bg-bg-base" />}>
          <App />
        </Suspense>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
)
