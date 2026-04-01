"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";

const HeroWebGPU = dynamic(() => import("./hero-webgpu"), {
  ssr: false,
  loading: () => null,
});

class WebGPUErrorBoundary extends Component<
  { children: ReactNode },
  { crashed: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { crashed: false };
  }

  static getDerivedStateFromError() {
    return { crashed: true };
  }

  render() {
    if (this.state.crashed) return null;
    return this.props.children;
  }
}

export function HeroWebGPUBackground(): React.JSX.Element {
  return (
    <WebGPUErrorBoundary>
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 brightness-150 contrast-110">
        <HeroWebGPU />
      </div>
    </WebGPUErrorBoundary>
  );
}
