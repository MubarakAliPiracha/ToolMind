"use client";

import { FloatingPaths } from "./background-paths";

/**
 * Fixed full-screen background from 21st.dev/r/kokonutd/background-paths.
 * Renders on every page via layout.tsx.
 */
export function GlobalBackground(): React.JSX.Element {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]"
      aria-hidden="true"
    >
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  );
}
