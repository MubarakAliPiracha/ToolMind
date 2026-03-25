"use client";

import { useState, useMemo, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MagnifyingGlass, X, CaretDown, Trophy, ArrowRight } from "@phosphor-icons/react";
import { Footer } from "@/components/ui/footer";
import { PricingBadge, type PricingTier } from "@/components/ui/pricing-badge";
import { categories, type CategoryKey } from "@/lib/data/categories";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";
import { scoreToolForTask as scoreToolShared } from "@/lib/task-match";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ToolInfo {
  name: string;
  categorySlug: string;
  category: string;
  pricing: PricingTier;
  bestFor: string;
  code: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

function pricingToTier(p: string): PricingTier {
  if (p === "free") return "free";
  if (p === "paid") return "paid";
  return "freemium";
}

const ALL_TOOLS: ToolInfo[] = (Object.keys(categories) as CategoryKey[]).flatMap(
  (slug) => {
    const cat = categories[slug];
    return cat.tools.map((t) => ({
      name: t.name,
      categorySlug: slug,
      category: cat.name,
      pricing: pricingToTier(t.pricing),
      bestFor: t.bestFor,
      code: t.name.substring(0, 2).toUpperCase(),
    }));
  }
);

const CATEGORY_ACCENT: Record<string, string> = {
  writing:      "bg-blue-500/10 text-blue-400 border-blue-500/20",
  coding:       "bg-white/10 text-white border-white/20",
  image:        "bg-violet-500/10 text-violet-400 border-violet-500/20",
  video:        "bg-rose-500/10 text-rose-400 border-rose-500/20",
  audio:        "bg-amber-500/10 text-amber-400 border-amber-500/20",
  research:     "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  productivity: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  data:         "bg-orange-500/10 text-orange-400 border-orange-500/20",
  marketing:    "bg-pink-500/10 text-pink-400 border-pink-500/20",
  support:      "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
};

const CATEGORY_GLOW: Record<string, string> = {
  writing:      "shadow-blue-500/20",
  coding:       "shadow-white/10",
  image:        "shadow-violet-500/20",
  video:        "shadow-rose-500/20",
  audio:        "shadow-amber-500/20",
  research:     "shadow-cyan-500/20",
  productivity: "shadow-emerald-500/20",
  data:         "shadow-orange-500/20",
  marketing:    "shadow-pink-500/20",
  support:      "shadow-indigo-500/20",
};

// ─── Scoring ─────────────────────────────────────────────────────────────────

function scoreToolForTask(tool: ToolInfo, task: string): number {
  return scoreToolShared(
    { categorySlug: tool.categorySlug as import("@/lib/data/categories").CategoryKey, categoryName: tool.category, name: tool.name, bestFor: tool.bestFor },
    task,
  );
}

function buildVerdict(tools: ToolInfo[], scores: number[], task: string): string {
  const winner = tools[scores.indexOf(Math.max(...scores))];
  const taskSnippet = task.length > 60 ? task.slice(0, 57) + "…" : task;
  return `For "${taskSnippet}", ${winner.name} is the strongest match. It is purpose-built for ${winner.bestFor.toLowerCase()}, which directly covers the core requirement of your task. The ${winner.category} category aligns closest with the keywords in your description, giving it a clear edge over the other selected tools.`;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function ScoreBar({ score, animate, isWinner }: { score: number; animate: boolean; isWinner: boolean }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <span className="font-label text-xs uppercase tracking-widest text-white/65">
          Task Match
        </span>
        <motion.span
          className={cn(
            "font-headline font-bold text-2xl transition-colors duration-500",
            isWinner ? "text-white" : score >= 45 ? "text-white/60" : "text-white/35"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: animate ? 1 : 0 }}
          transition={{ delay: 0.4 }}
        >
          {score}%
        </motion.span>
      </div>
      <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
        <motion.div
          className={cn(
            "h-full rounded-full",
            isWinner
              ? "bg-gradient-to-r from-white/70 to-white shadow-[0_0_12px_rgba(255,255,255,0.4)]"
              : score >= 45
              ? "bg-gradient-to-r from-white/30 to-white/40"
              : "bg-white/15"
          )}
          initial={{ width: 0 }}
          animate={{ width: animate ? `${score}%` : 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
      </div>
    </div>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────

function ComparePage(): React.JSX.Element {
  const searchParams = useSearchParams();
  const [selectedTools, setSelectedTools] = useState<ToolInfo[]>([]);
  const [task, setTask] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasCompared, setHasCompared] = useState(false);
  const [animateBars, setAnimateBars] = useState(false);
  const [copied, setCopied] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  // Pre-populate from URL params (e.g. from /tools "Compare Top Tools" button)
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const toolsParam = searchParams.get("tools");
    const taskParam = searchParams.get("task");

    if (toolsParam) {
      const names = toolsParam.split(",").map((n) => decodeURIComponent(n.trim()));
      const resolved = names
        .map((name) => ALL_TOOLS.find((t) => t.name.toLowerCase() === name.toLowerCase()))
        .filter((t): t is ToolInfo => t !== undefined)
        .slice(0, 3);
      if (resolved.length > 0) setSelectedTools(resolved);
    }

    if (taskParam) {
      setTask(decodeURIComponent(taskParam));
    }
  }, [searchParams]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredTools = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return ALL_TOOLS.slice(0, 12);
    return ALL_TOOLS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.bestFor.toLowerCase().includes(q)
    ).slice(0, 10);
  }, [searchQuery]);

  const scores = useMemo(
    () => selectedTools.map((t) => scoreToolForTask(t, task)),
    [selectedTools, task]
  );

  const winnerIndex = scores.length ? scores.indexOf(Math.max(...scores)) : -1;

  function toggleTool(tool: ToolInfo) {
    setSelectedTools((prev) => {
      const exists = prev.find((t) => t.name === tool.name);
      if (exists) return prev.filter((t) => t.name !== tool.name);
      if (prev.length >= 3) return prev;
      return [...prev, tool];
    });
    setHasCompared(false);
  }

  function handleCompare() {
    setHasCompared(true);
    setAnimateBars(false);
    setTimeout(() => {
      setAnimateBars(true);
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  function handleShare(): void {
    const toolNames = selectedTools.map((t) => encodeURIComponent(t.name)).join(",");
    const url = `${window.location.origin}/compare?tools=${toolNames}&task=${encodeURIComponent(task)}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      const el = document.createElement("input");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const canCompare = selectedTools.length >= 2 && task.trim().length > 3;
  const tableMinWidth = `${200 + selectedTools.length * 220}px`;

  return (
    <div className="min-h-screen bg-transparent">
      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">

        {/* ── Header ── */}
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 relative"
        >
          {/* Decorative glow blob */}
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

          <div className="font-label text-[10px] uppercase tracking-[0.3em] text-white/30 mb-4 flex items-center gap-2">
            <span className="inline-block w-4 h-px bg-white/20" />
            Task-specific verdict
          </div>
          <h1 className="font-headline font-bold text-5xl md:text-7xl tracking-tight leading-none mb-6 text-white">
            Which tool{" "}
            <span className="text-white text-glow-lime relative">
              actually wins?
              <span className="absolute inset-0 blur-2xl bg-white/10 -z-10" />
            </span>
          </h1>
          <p className="max-w-xl text-white/45 font-body leading-relaxed text-lg">
            Select up to 3 AI tools, describe your task, and get a task-specific
            verdict on which tool is the strongest match for exactly what you need.
          </p>
        </motion.header>

        {/* ── Setup Panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8"
        >
          {/* Tool selector */}
          <div className="red-border-pulse relative bg-[#0a0a0a]/80 backdrop-blur-sm border rounded-2xl p-8 space-y-6" style={{ overflow: "hidden" }}>
            <GlowingEffect disabled={false} spread={35} proximity={60} inactiveZone={0.1} />
            {/* Corner accent */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-white/[0.04] to-transparent rounded-tl-2xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 inline-block" />
                <h2 className="red-text-pulse font-headline text-xl font-bold">Select Tools</h2>
              </div>
              <p className="font-label text-sm text-white/65 uppercase tracking-widest pl-3.5">
                Choose 2–3 tools to compare
              </p>
            </div>

            {/* Selected pills */}
            {selectedTools.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedTools.map((tool, i) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-label transition-all duration-300",
                      i === winnerIndex && hasCompared
                        ? "border-white/50 bg-white/[0.08] text-white shadow-[0_0_12px_rgba(255,255,255,0.1)]"
                        : "border-white/[0.12] bg-white/[0.04] text-white/65"
                    )}
                  >
                    <span
                      className={cn(
                        "font-mono font-bold text-[10px] w-5 h-5 rounded-md flex items-center justify-center",
                        CATEGORY_ACCENT[tool.categorySlug] ?? "bg-white/[0.04] text-white/40"
                      )}
                    >
                      {tool.code}
                    </span>
                    {tool.name}
                    {i === winnerIndex && hasCompared && (
                      <span className="text-[9px] font-mono uppercase tracking-wider text-white/60 ml-0.5">★</span>
                    )}
                    <button
                      onClick={() => toggleTool(tool)}
                      className="ml-0.5 text-white/25 hover:text-white/70 transition-colors"
                    >
                      <X size={11} weight="bold" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Search */}
            <div ref={searchRef} className="relative">
              <div
                className={cn(
                  "flex items-center h-12 bg-white/[0.04] border rounded-xl px-4 gap-3 transition-all duration-200 cursor-text",
                  showDropdown ? "border-white/25 bg-white/[0.06]" : "border-white/[0.08]",
                  selectedTools.length >= 3 && "opacity-40 pointer-events-none"
                )}
                onClick={() => setShowDropdown(true)}
              >
                <MagnifyingGlass size={15} weight="thin" className="text-white/35 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setShowDropdown(true); }}
                  onFocus={() => setShowDropdown(true)}
                  placeholder={
                    selectedTools.length >= 3
                      ? "Maximum 3 tools selected"
                      : "Search tools by name or category…"
                  }
                  className="flex-1 bg-transparent outline-none text-base text-white placeholder:text-white/45 font-body"
                  disabled={selectedTools.length >= 3}
                />
                <CaretDown size={11} weight="bold" className="text-white/20 shrink-0" />
              </div>

              {/* Dropdown */}
              <AnimatePresence>
                {showDropdown && selectedTools.length < 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 right-0 z-50 mt-2 bg-[#111]/95 backdrop-blur-xl border border-white/[0.10] rounded-xl overflow-hidden max-h-64 overflow-y-auto shadow-2xl shadow-black/50"
                  >
                    {filteredTools.length === 0 ? (
                      <div className="px-4 py-6 text-center text-white/30 font-label text-xs uppercase tracking-widest">
                        No tools found
                      </div>
                    ) : (
                      filteredTools.map((tool) => {
                        const isSelected = selectedTools.some((s) => s.name === tool.name);
                        return (
                          <button
                            key={tool.name}
                            onClick={() => { toggleTool(tool); setShowDropdown(false); setSearchQuery(""); }}
                            className={cn(
                              "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b border-white/[0.04] last:border-0",
                              isSelected
                                ? "bg-white/[0.07] text-white"
                                : "hover:bg-white/[0.05] text-white/85"
                            )}
                          >
                            <span
                              className={cn(
                                "font-mono text-[10px] font-bold w-7 h-7 flex items-center justify-center rounded-lg border shrink-0",
                                CATEGORY_ACCENT[tool.categorySlug] ?? "bg-white/[0.04] text-white/40 border-white/[0.06]"
                              )}
                            >
                              {tool.code}
                            </span>
                            <span className="flex-1 min-w-0">
                              <span className="block font-label text-sm font-semibold truncate">{tool.name}</span>
                              <span className="block font-label text-xs uppercase tracking-widest text-white/55">
                                {tool.category} · {tool.bestFor.split(",")[0]}
                              </span>
                            </span>
                            {isSelected && (
                              <span className="text-white font-mono text-xs shrink-0 bg-white/10 w-5 h-5 rounded-full flex items-center justify-center">✓</span>
                            )}
                          </button>
                        );
                      })
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-all duration-300",
                    i < selectedTools.length ? "bg-white/50" : "bg-white/[0.07]"
                  )}
                />
              ))}
              <span className="font-label text-[10px] text-white/25 uppercase tracking-widest ml-2">
                {selectedTools.length}/3
              </span>
            </div>
          </div>

          {/* Task input */}
          <div className="red-border-pulse relative bg-[#0a0a0a]/80 backdrop-blur-sm border rounded-2xl p-8 space-y-6" style={{ overflow: "hidden" }}>
            <GlowingEffect disabled={false} spread={35} proximity={60} inactiveZone={0.1} />
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/[0.04] to-transparent rounded-tr-2xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 inline-block" />
                <h2 className="red-text-pulse font-headline text-xl font-bold">Describe Your Task</h2>
              </div>
              <p className="font-label text-sm text-white/65 uppercase tracking-widest pl-3.5">
                What do you need to accomplish?
              </p>
            </div>

            <textarea
              value={task}
              onChange={(e) => { setTask(e.target.value); setHasCompared(false); }}
              placeholder={"e.g. I need to write SEO blog posts for a tech startup…\n\ne.g. Debug and refactor a React component with TypeScript errors…\n\ne.g. Generate social media images for a product launch campaign…"}
              rows={7}
              className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3.5 text-base text-white placeholder:text-white/40 font-body outline-none resize-none focus:border-white/20 focus:bg-white/[0.05] transition-all duration-200 leading-relaxed"
            />

            <div className="flex items-center justify-between">
              <span className="font-label text-[10px] text-white/20 uppercase tracking-widest">
                {task.trim().split(/\s+/).filter(Boolean).length} words
              </span>
              <AnimatePresence>
                {task.trim().length > 3 && (
                  <motion.span
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    className="font-label text-[10px] text-white/50 uppercase tracking-widest flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60 inline-block" />
                    Ready to compare
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* ── Compare CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-24"
        >
          <button
            onClick={handleCompare}
            disabled={!canCompare}
            className={cn(
              "relative group flex items-center gap-3 px-10 py-4 rounded-full font-label uppercase tracking-[0.2em] text-sm font-bold transition-all duration-300",
              canCompare
                ? "bg-white text-[#050505] hover:bg-white/90 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] cursor-pointer"
                : "bg-white/[0.05] text-white/20 cursor-not-allowed border border-white/[0.08]"
            )}
          >
            {!canCompare ? (
              selectedTools.length < 2
                ? `Select ${2 - selectedTools.length} more tool${2 - selectedTools.length === 1 ? "" : "s"}`
                : "Enter your task above"
            ) : (
              <>
                Run Comparison
                <ArrowRight size={15} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </button>
        </motion.div>

        {/* ── Results ── */}
        <AnimatePresence>
          {hasCompared && selectedTools.length >= 2 && (
            <motion.div
              ref={resultsRef}
              key="results"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Section label */}
              <div className="mb-10 flex items-center gap-4">
                <span className="font-label text-[10px] uppercase tracking-[0.3em] text-white/35 flex items-center gap-2">
                  <span className="inline-block w-4 h-px bg-white/20" />
                  Comparison Results
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-white/[0.08] to-transparent" />
              </div>

              {/* ── Comparison Grid — mobile scrolls horizontally ── */}
              <div className="overflow-x-auto pb-2 mb-12">
                <div style={{ minWidth: tableMinWidth }}>
                  <div className="red-border-pulse relative border rounded-2xl overflow-hidden bg-[#080808]">
                    <GlowingEffect disabled={false} spread={50} proximity={80} inactiveZone={0.05} />
                    {/* Header row */}
                    <div
                      className="grid border-b border-white/[0.08]"
                      style={{ gridTemplateColumns: `180px repeat(${selectedTools.length}, 1fr)` }}
                    >
                      <div className="p-5 bg-[#060606] flex items-end">
                        <span className="font-label text-xs uppercase tracking-widest text-white/55">Parameter</span>
                      </div>
                      {selectedTools.map((tool, i) => (
                        <div
                          key={tool.name}
                          className={cn(
                            "p-5 border-l border-white/[0.08] relative overflow-hidden transition-colors",
                            i === winnerIndex
                              ? "bg-white/[0.05]"
                              : "bg-[#0c0c0c]"
                          )}
                        >
                          {i === winnerIndex && (
                            <>
                              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                              <div className={cn("absolute inset-0 opacity-5 bg-gradient-to-b from-white to-transparent pointer-events-none")} />
                            </>
                          )}
                          <div className="flex items-center gap-3 mb-3 relative">
                            <div
                              className={cn(
                                "w-10 h-10 border flex items-center justify-center rounded-xl shrink-0 shadow-lg",
                                CATEGORY_ACCENT[tool.categorySlug] ?? "bg-white/[0.04] text-white/40 border-white/[0.06]",
                                CATEGORY_GLOW[tool.categorySlug]
                              )}
                            >
                              <span className="font-mono text-sm font-bold">{tool.code}</span>
                            </div>
                            <div>
                              <h3 className="red-text-pulse font-headline text-base font-bold leading-tight">{tool.name}</h3>
                              {i === winnerIndex && (
                                <span className="font-label text-[9px] uppercase tracking-widest text-white/50 flex items-center gap-1">
                                  <Trophy size={9} weight="fill" className="text-amber-400/70" />
                                  Best match
                                </span>
                              )}
                            </div>
                          </div>
                          <PricingBadge tier={tool.pricing} />
                        </div>
                      ))}
                    </div>

                    {/* Row helper */}
                    {(
                      [
                        {
                          label: "Category",
                          render: (tool: ToolInfo) => (
                            <span className={cn("font-label text-[11px] uppercase tracking-widest px-3 py-1.5 rounded-full border", CATEGORY_ACCENT[tool.categorySlug] ?? "bg-white/[0.04] text-white/40 border-white/[0.06]")}>
                              {tool.category}
                            </span>
                          ),
                        },
                        {
                          label: "Pricing",
                          render: (tool: ToolInfo) => (
                            <div>
                              <div className="font-headline text-xl font-bold text-white capitalize">{tool.pricing}</div>
                              <div className="font-label text-xs text-white/60 uppercase tracking-widest mt-0.5">
                                {tool.pricing === "free" ? "No cost" : tool.pricing === "freemium" ? "Free tier available" : "Subscription required"}
                              </div>
                            </div>
                          ),
                        },
                        {
                          label: "Best For",
                          render: (tool: ToolInfo) => (
                            <p className="text-sm text-white/85 leading-relaxed line-clamp-3">{tool.bestFor.split(",").slice(0, 3).join(", ")}</p>
                          ),
                        },
                      ] as { label: string; render: (tool: ToolInfo) => React.ReactNode }[]
                    ).map(({ label, render }) => (
                      <div
                        key={label}
                        className="grid border-b border-white/[0.06]"
                        style={{ gridTemplateColumns: `180px repeat(${selectedTools.length}, 1fr)` }}
                      >
                        <div className="p-5 bg-[#060606] flex items-center">
                          <span className="font-label text-sm font-semibold uppercase tracking-widest text-white/70">{label}</span>
                        </div>
                        {selectedTools.map((tool, i) => (
                          <div
                            key={tool.name}
                            className={cn(
                              "p-5 border-l border-white/[0.06] flex items-center",
                              i === winnerIndex ? "bg-white/[0.025]" : ""
                            )}
                          >
                            {render(tool)}
                          </div>
                        ))}
                      </div>
                    ))}

                    {/* Task Match row */}
                    <div
                      className="grid"
                      style={{ gridTemplateColumns: `180px repeat(${selectedTools.length}, 1fr)` }}
                    >
                      <div className="p-5 bg-[#060606] flex items-center">
                        <div>
                          <span className="font-label text-xs font-semibold uppercase tracking-widest text-white/40 block">Task Match</span>
                          <span className="font-label text-[9px] text-white/20 uppercase tracking-widest">For your task</span>
                        </div>
                      </div>
                      {selectedTools.map((tool, i) => (
                        <div
                          key={tool.name}
                          className={cn("p-5 border-l border-white/[0.06]", i === winnerIndex ? "bg-white/[0.025]" : "")}
                        >
                          <ScoreBar score={scores[i]} animate={animateBars} isWinner={i === winnerIndex} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Verdict ── */}
              <div className="grid md:grid-cols-2 gap-5">
                {/* Winner card */}
                <div className="red-border-pulse relative bg-[#0d0d0d] border rounded-2xl p-10 overflow-hidden" style={{ overflow: "hidden" }}>
                  <GlowingEffect disabled={false} spread={40} proximity={60} inactiveZone={0.1} glow />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/[0.03] rounded-full blur-2xl pointer-events-none" />

                  <div className="flex items-center gap-2 mb-8">
                    <Trophy size={14} weight="fill" className="text-amber-400/70" />
                    <span className="font-label text-[10px] uppercase tracking-[0.3em] text-white/50">Verdict</span>
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={cn(
                        "w-14 h-14 border flex items-center justify-center rounded-2xl shrink-0 shadow-lg",
                        CATEGORY_ACCENT[selectedTools[winnerIndex]?.categorySlug] ?? "bg-white/[0.04] text-white/40 border-white/[0.06]",
                        CATEGORY_GLOW[selectedTools[winnerIndex]?.categorySlug]
                      )}
                    >
                      <span className="font-mono text-lg font-bold">{selectedTools[winnerIndex]?.code}</span>
                    </div>
                    <div>
                      <h3 className="red-text-pulse font-headline text-2xl font-bold">{selectedTools[winnerIndex]?.name}</h3>
                      <span className="font-label text-xs text-white/70 uppercase tracking-widest">
                        Recommended for your task
                      </span>
                    </div>
                  </div>

                  <p className="text-white/85 text-base leading-relaxed font-body">
                    {buildVerdict(selectedTools, scores, task)}
                  </p>
                </div>

                {/* Score breakdown */}
                <div className="red-border-pulse relative bg-[#0a0a0a] border rounded-2xl p-10 overflow-hidden" style={{ overflow: "hidden" }}>
                  <GlowingEffect disabled={false} spread={40} proximity={60} inactiveZone={0.1} />
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/[0.02] rounded-full blur-2xl pointer-events-none" />

                  <span className="font-label text-sm uppercase tracking-[0.3em] text-white/65 block mb-8">
                    Score Breakdown
                  </span>

                  <div className="space-y-5">
                    {selectedTools.map((tool, i) => (
                      <div key={tool.name} className="flex items-center gap-4">
                        <span
                          className={cn(
                            "font-mono text-[10px] font-bold w-7 h-7 flex items-center justify-center rounded-lg border shrink-0",
                            CATEGORY_ACCENT[tool.categorySlug] ?? "bg-white/[0.04] text-white/40 border-white/[0.06]"
                          )}
                        >
                          {tool.code}
                        </span>
                        <span className={cn("font-label text-sm font-medium flex-1 truncate", i === winnerIndex ? "text-white" : "text-white/75")}>
                          {tool.name}
                        </span>
                        <div className="w-28 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                          <motion.div
                            className={cn("h-full rounded-full", i === winnerIndex ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" : "bg-white/20")}
                            initial={{ width: 0 }}
                            animate={{ width: animateBars ? `${scores[i]}%` : 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.1 }}
                          />
                        </div>
                        <span className={cn("font-mono text-sm font-bold w-10 text-right", i === winnerIndex ? "text-white" : "text-white/30")}>
                          {scores[i]}%
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/[0.06]">
                    <span className="font-label text-[10px] uppercase tracking-widest text-white/20 block mb-2">
                      Analyzed Task
                    </span>
                    <p className="text-white/30 text-xs leading-relaxed font-body italic line-clamp-3">
                      &ldquo;{task}&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* Reset + Share */}
              <div className="mt-14 flex flex-col sm:flex-row justify-center items-center gap-6">
                <button
                  onClick={handleShare}
                  className="font-label text-xs uppercase tracking-widest text-white/25 hover:text-white/60 transition-colors flex items-center gap-2 group"
                >
                  <span className={cn("transition-transform", copied ? "scale-110" : "group-hover:scale-110")}>
                    {copied ? "✓" : "⎘"}
                  </span>
                  {copied ? "Link copied!" : "Share comparison"}
                </button>

                <span className="hidden sm:block w-px h-4 bg-white/[0.08]" />

                <button
                  onClick={() => {
                    setHasCompared(false);
                    setSelectedTools([]);
                    setTask("");
                    setAnimateBars(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="font-label text-xs uppercase tracking-widest text-white/25 hover:text-white/60 transition-colors flex items-center gap-2 group"
                >
                  <span className="group-hover:-translate-y-0.5 transition-transform">↑</span>
                  Start new comparison
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default function ComparePageWrapper(): React.JSX.Element {
  return (
    <Suspense>
      <ComparePage />
    </Suspense>
  );
}
