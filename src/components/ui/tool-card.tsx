"use client";

import { useState } from "react";
import Link from "next/link";
import { FlippingCard } from "./flipping-card";
import { PricingBadge, type PricingTier } from "./pricing-badge";

export type Pricing = "Free" | "Freemium" | "Paid" | "Open Source";

export interface ToolCardProps {
  name: string;
  description: string;
  category: string;
  pricing: Pricing;
  slug: string;
  logoUrl?: string;
  matchScore?: number;
}

function toTier(pricing: Pricing): PricingTier {
  if (pricing === "Free" || pricing === "Open Source") return "free";
  if (pricing === "Freemium") return "freemium";
  return "paid";
}

// ─── Floating logo — no box, just the image with a soft glow ─────────────────

function FloatingLogo({
  logoUrl,
  name,
  size = 56,
}: {
  logoUrl?: string;
  name: string;
  size?: number;
}) {
  const [error, setError] = useState(false);
  const show = !!logoUrl && !error;

  if (show) {
    return (
      <div
        className="flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoUrl}
          alt={name}
          onError={() => setError(true)}
          width={size}
          height={size}
          className="object-contain"
          style={{
            width: size,
            height: size,
            filter:
              "drop-shadow(0 0 12px rgba(255,255,255,0.22)) drop-shadow(0 0 28px rgba(255,255,255,0.10))",
          }}
        />
      </div>
    );
  }

  // Initials fallback — soft pill, no hard border box
  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.3,
        background:
          "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.12), rgba(255,255,255,0.04) 70%)",
        boxShadow: "0 0 20px rgba(255,255,255,0.06)",
      }}
    >
      <span
        className="font-headline font-black text-white/80 select-none"
        style={{ fontSize: size * 0.34, letterSpacing: "-0.02em" }}
      >
        {name.substring(0, 2).toUpperCase()}
      </span>
    </div>
  );
}

// ─── Front face ───────────────────────────────────────────────────────────────

function ToolCardFront({
  name,
  description,
  logoUrl,
  matchScore,
}: {
  name: string;
  description: string;
  pricing: Pricing;
  logoUrl?: string;
  matchScore?: number;
}) {
  return (
    <div className="relative flex flex-col h-full w-full overflow-hidden rounded-[inherit]">
      {/* Match score badge — top-right corner */}
      {matchScore !== undefined && (
        <div
          className="absolute top-3 right-3 z-20 font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.70)",
          }}
        >
          {Math.round(matchScore * 100)}% match
        </div>
      )}

      {/* Logo area — fills the upper portion */}
      <div className="flex-1 flex items-center justify-center min-h-0">
        <FloatingLogo logoUrl={logoUrl} name={name} size={64} />
      </div>

      {/* Bottom name + description strip with shimmer */}
      <div
        className="relative shrink-0 px-4 pb-4 pt-3 overflow-hidden"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.0) 100%)",
        }}
      >
        {/* Shimmer sweep over the bottom strip */}
        <div className="card-shimmer absolute inset-0 w-2/5 pointer-events-none" />

        <h3
          className="font-headline text-[14px] font-bold leading-snug mb-1 relative z-10"
          style={{
            color: "rgba(255,255,255,0.92)",
            textShadow:
              "0 0 18px rgba(255,255,255,0.35), 0 0 40px rgba(255,255,255,0.12)",
          }}
        >
          {name}
        </h3>
        <p className="text-[11.5px] text-white/75 leading-relaxed line-clamp-2 relative z-10">
          {description}
        </p>
      </div>
    </div>
  );
}

// ─── Back face ────────────────────────────────────────────────────────────────

function ToolCardBack({
  name,
  description,
  category,
  pricing,
  slug,
  logoUrl,
}: {
  name: string;
  description: string;
  category: string;
  pricing: Pricing;
  slug: string;
  logoUrl?: string;
}) {
  return (
    <Link href={`/tools/${slug}`} className="block h-full">
      <div className="flex flex-col items-center justify-between h-full w-full px-5 py-5 gap-3">
        {/* Top: logo + name */}
        <div className="flex flex-col items-center gap-2 shrink-0">
          <FloatingLogo logoUrl={logoUrl} name={name} size={40} />
          <h3
            className="font-headline text-[13px] font-bold text-white text-center leading-tight"
            style={{
              textShadow: "0 0 16px rgba(255,255,255,0.25)",
            }}
          >
            {name}
          </h3>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
            {category}
          </span>
        </div>

        {/* Middle: description */}
        <p className="text-[11.5px] text-white/50 text-center leading-relaxed line-clamp-3 flex-1 flex items-center">
          {description}
        </p>

        {/* Bottom: pricing + CTA */}
        <div className="flex flex-col items-center gap-2.5 w-full shrink-0">
          <PricingBadge tier={toTier(pricing)} />
          <button
            className="w-full max-w-[150px] h-8 rounded-lg text-[12px] font-semibold flex items-center justify-center transition-colors"
            style={{
              background: "rgba(255,255,255,0.92)",
              color: "#050505",
            }}
          >
            View Tool →
          </button>
        </div>
      </div>
    </Link>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export function ToolCard({
  name,
  description,
  category,
  pricing,
  slug,
  logoUrl,
  matchScore,
}: ToolCardProps): React.JSX.Element {
  return (
    <FlippingCard
      fill
      frontContent={
        <ToolCardFront
          name={name}
          description={description}
          pricing={pricing}
          logoUrl={logoUrl}
          matchScore={matchScore}
        />
      }
      backContent={
        <ToolCardBack
          name={name}
          description={description}
          category={category}
          pricing={pricing}
          slug={slug}
          logoUrl={logoUrl}
        />
      }
    />
  );
}
