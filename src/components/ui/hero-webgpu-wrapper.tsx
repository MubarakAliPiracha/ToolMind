"use client";

import dynamic from "next/dynamic";

const HeroWebGPU = dynamic(() => import("./hero-webgpu"), {
  ssr: false,
  loading: () => null,
});

export function HeroWebGPUBackground(): React.JSX.Element {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 brightness-150 contrast-110">
      <HeroWebGPU />
    </div>
  );
}
