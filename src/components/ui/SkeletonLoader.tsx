import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

/**
 * Base skeleton shimmer used as the Suspense fallback across the app.
 * Automatically adapts gracefully based on the className dimensions passed in.
 */
export function SkeletonLoader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md border border-glass bg-bg-surface',
        className
      )}
      {...props}
    />
  )
}
