import { type ReactNode } from 'react'
import { canUseWebGL } from '@/lib/utils'
import { Monitor } from 'lucide-react'

interface WebGLFallbackProps {
  /** The Three.js / WebGL component to render when GPU is available */
  children: ReactNode
  /** Static fallback content when WebGL is unavailable */
  fallback?: ReactNode
}

/**
 * Wraps any WebGL/Three.js component and renders a graceful static
 * fallback when the browser/GPU does not support WebGL.
 *
 * Uses the `canUseWebGL()` utility from lib/utils.ts — result is cached
 * at component init time so the DOM is only queried once.
 */
const webglSupported = canUseWebGL()

const DefaultFallback = () => (
  <div
    role="img"
    aria-label="3D visualization unavailable — WebGL is not supported on this device"
    className="flex flex-col items-center justify-center gap-4 rounded-xl border border-glass bg-bg-surface/60 px-8 py-12 text-center backdrop-blur-md"
  >
    <Monitor className="h-10 w-10 text-text-muted" aria-hidden="true" />
    <p className="text-sm font-medium text-text-muted">
      3D visualization requires WebGL, which is not available on this device.
    </p>
    <p className="text-xs text-text-muted/60">
      Try opening this page in a modern browser with hardware acceleration enabled.
    </p>
  </div>
)

export function WebGLFallback({ children, fallback }: WebGLFallbackProps) {
  if (!webglSupported) {
    return fallback ? <>{fallback}</> : <DefaultFallback />
  }
  return <>{children}</>
}
