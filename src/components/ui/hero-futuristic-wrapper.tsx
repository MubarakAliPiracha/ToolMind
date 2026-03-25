"use client";

import dynamic from "next/dynamic";

const HeroFuturistic = dynamic(
  () => import("@/components/ui/hero-futuristic"),
  {
    ssr: false,
    loading: () => <div className="h-[100vh] min-h-[600px] bg-[#050505]" />,
  }
);

export function HeroFuturisticSection(): React.JSX.Element {
  return <HeroFuturistic />;
}
