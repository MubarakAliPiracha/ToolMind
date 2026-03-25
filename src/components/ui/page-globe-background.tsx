"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const Globe = dynamic(() => import("./wireframe-dotted-globe"), {
  ssr: false,
  loading: () => null,
});

/** Shows the rotating Earth globe as a fixed background on every page except the home page (/). */
export function PageGlobeBackground(): React.JSX.Element | null {
  const pathname = usePathname();

  // Home page uses the WebGPU animation inside HeroSection instead
  if (pathname === "/") return null;

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center"
      aria-hidden="true"
    >
      <Globe className="opacity-55" />
    </div>
  );
}
