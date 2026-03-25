"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowSquareOut } from "@phosphor-icons/react";
import { Footer } from "@/components/ui/footer";
import { PricingBadge, type PricingTier } from "@/components/ui/pricing-badge";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import type { ResolvedTool, SimilarTool } from "@/lib/tool-slug";
import type { CategoryKey } from "@/lib/data/categories";
import { cn } from "@/lib/utils";

function toTier(pricing: string): PricingTier {
  if (pricing === "free") return "free";
  if (pricing === "paid") return "paid";
  return "freemium";
}

const CATEGORY_COLOR: Record<string, { ring: string; glow: string; text: string; bg: string; hex: string }> = {
  writing:      { ring: "border-blue-500/30",    glow: "rgba(59,130,246,0.15)",  text: "text-blue-400",    bg: "bg-blue-500/8",    hex: "#3b82f6" },
  coding:       { ring: "border-white/30",        glow: "rgba(255,255,255,0.12)", text: "text-white",       bg: "bg-white/8",       hex: "#ffffff" },
  image:        { ring: "border-violet-500/30",   glow: "rgba(139,92,246,0.15)",  text: "text-violet-400",  bg: "bg-violet-500/8",  hex: "#8b5cf6" },
  video:        { ring: "border-rose-500/30",     glow: "rgba(244,63,94,0.15)",   text: "text-rose-400",    bg: "bg-rose-500/8",    hex: "#f43f5e" },
  audio:        { ring: "border-amber-500/30",    glow: "rgba(245,158,11,0.15)",  text: "text-amber-400",   bg: "bg-amber-500/8",   hex: "#f59e0b" },
  research:     { ring: "border-cyan-500/30",     glow: "rgba(6,182,212,0.15)",   text: "text-cyan-400",    bg: "bg-cyan-500/8",    hex: "#06b6d4" },
  productivity: { ring: "border-emerald-500/30",  glow: "rgba(16,185,129,0.15)",  text: "text-emerald-400", bg: "bg-emerald-500/8", hex: "#10b981" },
  data:         { ring: "border-orange-500/30",   glow: "rgba(249,115,22,0.15)",  text: "text-orange-400",  bg: "bg-orange-500/8",  hex: "#f97316" },
  marketing:    { ring: "border-pink-500/30",     glow: "rgba(236,72,153,0.15)",  text: "text-pink-400",    bg: "bg-pink-500/8",    hex: "#ec4899" },
  support:      { ring: "border-indigo-500/30",   glow: "rgba(99,102,241,0.15)",  text: "text-indigo-400",  bg: "bg-indigo-500/8",  hex: "#6366f1" },
};

const fallbackColor = { ring: "border-white/20", glow: "rgba(255,255,255,0.08)", text: "text-white/60", bg: "bg-white/[0.04]", hex: "#ffffff" };

// ─── Orbital Logo ─────────────────────────────────────────────────────────────

function OrbitalLogo({
  initials,
  logoUrl,
  categoryKey,
}: {
  initials: string;
  logoUrl?: string;
  categoryKey: CategoryKey;
}): React.JSX.Element {
  const [imgError, setImgError] = useState(false);
  const palette = CATEGORY_COLOR[categoryKey] ?? fallbackColor;
  const showLogo = !!logoUrl && !imgError;

  return (
    <div className="relative w-36 h-36 flex items-center justify-center">
      {/* Background ambient glow */}
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-20 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${palette.hex}, transparent 70%)` }}
      />

      {/* Outer ring — slow orbit */}
      <motion.div
        className={cn("absolute inset-0 rounded-full border", palette.ring)}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <motion.div
          className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
          style={{ background: palette.hex, boxShadow: `0 0 8px ${palette.hex}` }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Inner ring — counter-orbit */}
      <motion.div
        className={cn("absolute inset-4 rounded-full border border-dashed", palette.ring)}
        style={{ opacity: 0.35 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        <motion.div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
          style={{ background: palette.hex, opacity: 0.6 }}
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </motion.div>

      {/* Glow pulse */}
      <motion.div
        className="absolute inset-6 rounded-full"
        style={{ background: `radial-gradient(circle, ${palette.glow}, transparent 70%)` }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Core — logo or initials */}
      <motion.div
        className={cn(
          "relative z-10 w-24 h-24 rounded-2xl border bg-[#080808] flex items-center justify-center overflow-hidden",
          palette.ring
        )}
        style={{
          boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)`,
        }}
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.15 }}
      >
        {showLogo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoUrl}
            alt={initials}
            onError={() => setImgError(true)}
            width={48}
            height={48}
            className="object-contain"
            style={{ width: 48, height: 48 }}
          />
        ) : (
          <span className={cn("font-mono text-2xl font-black tracking-tighter select-none", palette.text)}>
            {initials}
          </span>
        )}
      </motion.div>
    </div>
  );
}

// ─── Tilt Card ────────────────────────────────────────────────────────────────

function TiltCard({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);

  function handleMouse(e: React.MouseEvent<HTMLDivElement>): void {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave(): void {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className={cn("relative rounded-xl border border-white/[0.06] p-[1px] group/card", className)}
    >
      <GlowingEffect
        spread={50}
        glow={false}
        disabled={false}
        proximity={100}
        inactiveZone={0.01}
        borderWidth={2}
        variant="lime"
      />
      <div className="relative h-full rounded-[inherit] bg-[#0a0a0a] overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
}

// ─── Similar Tool Mini Card ───────────────────────────────────────────────────

function SimilarToolCard({ tool }: { tool: SimilarTool }): React.JSX.Element {
  const [imgError, setImgError] = useState(false);
  const showLogo = !!tool.logoUrl && !imgError;
  const initials = tool.name.substring(0, 2).toUpperCase();

  return (
    <Link href={`/tools/${tool.slug}`} className="block shrink-0 w-44 group/similar">
      <div
        className="relative h-full rounded-xl border border-white/[0.07] overflow-hidden p-4 space-y-3 transition-all duration-300 group-hover/similar:border-white/20"
        style={{
          background: "rgba(8,8,8,0.6)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.03)",
        }}
      >
        {/* Top edge shine */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.12) 50%, transparent 90%)" }}
        />

        {/* Logo */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden shrink-0"
          style={{
            background: "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
            border: "1px solid rgba(255,255,255,0.10)",
          }}
        >
          {showLogo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={tool.logoUrl}
              alt={tool.name}
              onError={() => setImgError(true)}
              width={24}
              height={24}
              className="object-contain"
              style={{ width: 24, height: 24 }}
            />
          ) : (
            <span className="font-mono text-xs font-bold text-white/60">{initials}</span>
          )}
        </div>

        {/* Name + badge */}
        <div className="space-y-1.5">
          <p className="font-headline text-sm font-semibold text-white/85 leading-tight line-clamp-1">
            {tool.name}
          </p>
          <PricingBadge tier={toTier(tool.pricing)} />
        </div>

        {/* Best for */}
        <p className="text-[11px] text-white/35 leading-relaxed line-clamp-2">{tool.bestFor}</p>

        {/* Hover arrow */}
        <div className="flex items-center gap-1 opacity-0 group-hover/similar:opacity-100 transition-opacity duration-200">
          <span className="font-label text-[10px] uppercase tracking-widest text-white/50">View</span>
          <ArrowSquareOut size={10} className="text-white/50" />
        </div>
      </div>
    </Link>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function ToolDetailClient({ tool }: { tool: ResolvedTool }): React.JSX.Element {
  const palette = CATEGORY_COLOR[tool.categoryKey] ?? fallbackColor;
  const visitHref = `https://www.google.com/search?q=${encodeURIComponent(`${tool.name} AI tool`)}`;
  const initials = tool.name.substring(0, 2).toUpperCase();

  const pricingLabel: Record<string, string> = {
    free: "Always free. No credit card required.",
    freemium: "Free tier available. Premium unlocks more.",
    paid: "Subscription or one-time purchase required.",
  };

  return (
    <div className="min-h-screen bg-transparent">
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24">

        {/* ── Breadcrumb ── */}
        <motion.nav
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-14 font-label text-[10px] uppercase tracking-widest text-white/25"
        >
          <Link href="/tools" className="hover:text-white/70 transition-colors">Directory</Link>
          <span className="mx-2 text-white/15">/</span>
          <Link href={`/category/${tool.categoryKey}`} className="hover:text-white/70 transition-colors">
            {tool.categoryName}
          </Link>
          <span className="mx-2 text-white/15">/</span>
          <span className="text-white/40">{tool.name}</span>
        </motion.nav>

        {/* ── Hero ── */}
        <header className="flex flex-col items-center text-center mb-20 relative">
          {/* Category-tinted hero glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 50% 0%, ${palette.hex}18, transparent 70%)`,
              filter: "blur(40px)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            <OrbitalLogo initials={initials} logoUrl={tool.logoUrl} categoryKey={tool.categoryKey} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="mt-8 mb-5 flex items-center gap-3"
          >
            <PricingBadge tier={toTier(tool.pricing)} />
            <span className="w-px h-3 bg-white/15" />
            <span className={cn("font-label text-[10px] uppercase tracking-[0.25em]", palette.text)}>
              {tool.categoryName}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-headline text-5xl md:text-7xl font-bold tracking-tight max-w-4xl leading-[1.1] text-white"
            style={{ textShadow: `0 0 60px ${palette.hex}30` }}
          >
            {tool.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="mt-6 text-white/40 text-lg max-w-2xl leading-relaxed"
          >
            {tool.bestFor}
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="mt-10 flex flex-wrap gap-4 justify-center"
          >
            <motion.a
              href={visitHref}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-white text-[#050505] px-7 py-3.5 rounded-sm font-label uppercase tracking-widest text-xs font-bold transition-shadow hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            >
              Visit tool
              <ArrowSquareOut size={16} weight="thin" aria-hidden />
            </motion.a>
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 border border-white/[0.12] text-white/70 px-7 py-3.5 rounded-sm font-label uppercase tracking-widest text-xs hover:border-white/30 hover:text-white transition-all"
              >
                Compare
              </Link>
            </motion.div>
          </motion.div>

          {/* Subcategory tags */}
          {tool.subcategories.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.45 }}
              className="mt-10 flex flex-wrap gap-2 justify-center"
            >
              {tool.subcategories.map((sub) => (
                <span
                  key={sub}
                  className="font-mono text-[9px] uppercase tracking-[0.22em] px-3 py-1 rounded-full text-white/35 border border-white/[0.06]"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  {sub}
                </span>
              ))}
            </motion.div>
          )}
        </header>

        {/* ── Info Cards — 3-column ── */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-20">

          {/* Card 1 — Best For */}
          <TiltCard delay={0.6}>
            <div className="p-7 space-y-5 h-full">
              <div className="relative w-12 h-12">
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{ background: `radial-gradient(circle, ${palette.glow}, transparent 70%)` }}
                  animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.9, 1.1, 0.9] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className={cn("relative w-12 h-12 rounded-xl border flex items-center justify-center overflow-hidden", palette.ring, palette.bg)}
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    style={{ background: `linear-gradient(105deg, transparent 40%, ${palette.glow.replace("0.15", "0.6")} 50%, transparent 60%)` }}
                    animate={{ x: ["-120%", "120%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                  />
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={cn("relative z-10", palette.text)}>
                    <motion.circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.2"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                      transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                    />
                    <motion.circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.2"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                    />
                    <motion.line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" strokeWidth="1.2"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, delay: 1.6 }}
                    />
                    <motion.line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="1.2"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, delay: 1.7 }}
                    />
                    <motion.line x1="2" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth="1.2"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, delay: 1.8 }}
                    />
                    <motion.line x1="18" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.2"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, delay: 1.9 }}
                    />
                  </svg>
                </motion.div>
              </div>

              <div className="space-y-2 flex-1">
                <h2 className="font-label font-bold text-xs uppercase tracking-wider text-white/50">Best for</h2>
                <p className="text-white/75 text-sm leading-relaxed font-medium">{tool.bestFor}</p>
              </div>

              <motion.span
                className={cn("inline-block text-[9px] font-label uppercase tracking-widest px-2.5 py-1 rounded-sm border", palette.bg, palette.text, palette.ring)}
                whileHover={{ scale: 1.05, y: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {tool.categoryName}
              </motion.span>
            </div>
          </TiltCard>

          {/* Card 2 — Category */}
          <TiltCard delay={0.7}>
            <div className="p-7 space-y-5 h-full">
              <div className="relative w-12 h-12">
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{ background: `radial-gradient(circle, ${palette.glow}, transparent 70%)` }}
                  animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.9, 1.1, 0.9] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
                <motion.div
                  className={cn("relative w-12 h-12 rounded-xl border flex items-center justify-center overflow-hidden", palette.ring, palette.bg)}
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    style={{ background: `linear-gradient(105deg, transparent 40%, ${palette.glow.replace("0.15", "0.6")} 50%, transparent 60%)` }}
                    animate={{ x: ["-120%", "120%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                  />
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={cn("relative z-10", palette.text)}>
                    {[{x:3,y:3},{x:14,y:3},{x:3,y:14},{x:14,y:14}].map((pos, i) => (
                      <motion.rect key={i} x={pos.x} y={pos.y} width="7" height="7" rx="1.5"
                        stroke="currentColor" strokeWidth="1.2"
                        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.9 + i * 0.2, ease: "easeOut" }}
                      />
                    ))}
                  </svg>
                </motion.div>
              </div>

              <div className="space-y-2 flex-1">
                <h2 className="font-label font-bold text-xs uppercase tracking-wider text-white/50">Category</h2>
                <p className="text-white/75 text-sm leading-relaxed font-medium">{tool.categoryDescription}</p>
              </div>

              <motion.div
                className="group/link inline-flex items-center gap-1.5"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link href={`/category/${tool.categoryKey}`} className={cn("font-label text-xs uppercase tracking-widest", palette.text)}>
                  View category
                </Link>
                <motion.span
                  className={palette.text}
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                >
                  →
                </motion.span>
              </motion.div>
            </div>
          </TiltCard>

          {/* Card 3 — Pricing */}
          <TiltCard delay={0.8}>
            <div className="p-7 space-y-5 h-full">
              <div className="relative w-12 h-12">
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{ background: `radial-gradient(circle, ${palette.glow}, transparent 70%)` }}
                  animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.9, 1.1, 0.9] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
                <motion.div
                  className={cn("relative w-12 h-12 rounded-xl border flex items-center justify-center overflow-hidden", palette.ring, palette.bg)}
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    style={{ background: `linear-gradient(105deg, transparent 40%, ${palette.glow.replace("0.15", "0.6")} 50%, transparent 60%)` }}
                    animate={{ x: ["-120%", "120%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
                  />
                  {/* Tag icon */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={cn("relative z-10", palette.text)}>
                    <motion.path
                      d="M12.5 2H7a2 2 0 0 0-2 2v5.5L14 20l5-5L9.5 5.5"
                      stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                      transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
                    />
                    <motion.circle cx="7.5" cy="7.5" r="1.2" fill="currentColor"
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ delay: 2, type: "spring", stiffness: 500, damping: 15 }}
                    />
                  </svg>
                </motion.div>
              </div>

              <div className="space-y-2 flex-1">
                <h2 className="font-label font-bold text-xs uppercase tracking-wider text-white/50">Pricing</h2>
                <p className="text-white/75 text-sm leading-relaxed font-medium capitalize">{tool.pricing}</p>
                <p className="text-white/35 text-xs leading-relaxed">
                  {pricingLabel[tool.pricing] ?? ""}
                </p>
              </div>

              <PricingBadge tier={toTier(tool.pricing)} />
            </div>
          </TiltCard>
        </section>

        {/* ── Similar Tools ── */}
        {tool.similarTools.length > 0 && (
          <section className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              {/* Section header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <span className="font-label text-[10px] uppercase tracking-[0.3em] text-white/25">
                  More in {tool.categoryName}
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/10 to-transparent" />
              </div>

              {/* Horizontal scroll row */}
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none" style={{ scrollbarWidth: "none" }}>
                {tool.similarTools.map((similar, i) => (
                  <motion.div
                    key={similar.slug}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <SimilarToolCard tool={similar} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
