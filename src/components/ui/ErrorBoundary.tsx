import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Critical UI Error Caught:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
          <div className="w-full max-w-md rounded-xl border border-glass bg-bg-surface p-8 shadow-2xl backdrop-blur-md">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive-base/20">
              <AlertTriangle className="h-8 w-8 text-destructive-base" />
            </div>
            <h1 className="mb-2 text-2xl font-bold tracking-tight text-white">System Malfunction</h1>
            <p className="mb-8 text-sm text-text-muted">
              {this.state.error?.message || 'A critical rendering error occurred in the front-end application.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-md border border-brand-electric/50 bg-brand-electric/20 px-6 py-2.5 text-sm font-semibold text-brand-electric backdrop-blur-sm transition-all hover:bg-brand-electric hover:text-white"
            >
              Reboot System
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
