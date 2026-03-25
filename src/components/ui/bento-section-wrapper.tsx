"use client";

import dynamic from "next/dynamic";

// PixelCanvas uses HTMLElement (web component API) — must skip SSR
const BentoSectionDynamic = dynamic(
  () => import("@/components/ui/bento-section").then((m) => ({ default: m.BentoSection })),
  { ssr: false }
);

export function BentoSectionWrapper(): React.JSX.Element {
  return <BentoSectionDynamic />;
}
