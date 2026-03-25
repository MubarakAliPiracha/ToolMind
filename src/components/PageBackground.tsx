'use client'

import { Lightning } from '@/components/ui/hero-odyssey'

export function PageBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Lightning beam — pure WebGL, single context */}
      <Lightning hue={225} xOffset={0} speed={1.2} intensity={0.55} size={2.2} />

      {/* Radial vignette — keeps center readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_35%,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.5)_55%,transparent_100%)]" />

      {/* Ambient glow orb — matches lightning hue */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-b from-blue-600/10 to-indigo-800/5 blur-3xl" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black to-transparent" />
    </div>
  )
}
