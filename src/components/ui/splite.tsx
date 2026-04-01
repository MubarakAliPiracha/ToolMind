'use client'

import { Component, Suspense, lazy } from 'react'
import type { ReactNode, ErrorInfo } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  onLoad?: () => void
}

interface ErrorBoundaryState {
  hasError: boolean
}

/** Catches Spline load failures (network timeout, asset 404, WebGL error) silently */
class SplineErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Log to console in dev but don't propagate — prevents page crash
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[SplineScene] Failed to load 3D scene:', error.message, info)
    }
  }

  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

export function SplineScene({ scene, className, onLoad }: SplineSceneProps) {
  const fallback = (
    <div
      className="w-full h-full"
      style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(255,255,255,0.04) 0%, transparent 70%)' }}
    />
  )

  return (
    <SplineErrorBoundary fallback={fallback}>
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <span className="loader" />
          </div>
        }
      >
        <Spline scene={scene} className={className} onLoad={onLoad} />
      </Suspense>
    </SplineErrorBoundary>
  )
}
