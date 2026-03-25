"use client";

import { useState, useRef, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Footer } from "@/components/ui/footer";
import { FadeUpContainer, FadeUpItem } from "@/components/ui/motion";
import { ToolCard, type Pricing } from "@/components/ui/tool-card";
import { categories, type CategoryKey } from "@/lib/data/categories";
import { makeToolPageSlug } from "@/lib/tool-slug";
import { useDebounce } from "@/hooks/useDebounce";
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";
import { cn } from "@/lib/utils";

interface SidebarCategory {
  slug: string;
  label: string;
  code: string;
  count: number;
}

function toPricing(tier: string): Pricing {
  if (tier === "free") return "Free";
  if (tier === "paid") return "Paid";
  return "Freemium";
}

interface FlatTool {
  name: string;
  description: string;
  category: string;
  categorySlug: string;
  pricing: Pricing;
  slug: string;
  logoUrl?: string;
}

function getAllTools(): FlatTool[] {
  const tools: FlatTool[] = [];
  for (const key of Object.keys(categories) as CategoryKey[]) {
    const cat = categories[key];
    for (const tool of cat.tools) {
      tools.push({
        name: tool.name,
        description: tool.bestFor,
        category: cat.name,
        categorySlug: key,
        pricing: toPricing(tool.pricing),
        slug: makeToolPageSlug(key, tool.name),
        logoUrl: "logoUrl" in tool ? (tool.logoUrl as string) : undefined,
      });
    }
  }
  return tools;
}

const ALL_TOOLS = getAllTools();

const SIDEBAR_CATEGORIES: SidebarCategory[] = [
  { slug: "all",          label: "All Tools",    code: "AL", count: ALL_TOOLS.length },
  ...( Object.keys(categories) as CategoryKey[]).map((key) => ({
    slug: key,
    label: categories[key].name,
    code: categories[key].name.substring(0, 2).toUpperCase(),
    count: categories[key].tools.length,
  })),
];

export default function ToolsDirectoryPage(): React.JSX.Element {
  const [rawQuery, setRawQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const query = useDebounce(rawQuery, 180);

  // Press "/" to focus the search input
  useKeyboardShortcut("/", () => searchInputRef.current?.focus());

  const filtered = useMemo(() => {
    return ALL_TOOLS.filter((tool) => {
      const matchesCategory =
        activeCategory === "all" || tool.categorySlug === activeCategory;
      if (!matchesCategory) return false;

      if (query === "") return true;
      const q = query.toLowerCase();
      return (
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q)
      );
    });
  }, [query, activeCategory]);

  return (
    <div className="min-h-screen bg-transparent">
      <div className="flex min-h-screen pt-24">

        {/* ── Sidebar ── */}
        <aside className={cn(
          "hidden lg:flex flex-col h-screen border-r border-white/[0.04] bg-black/40 backdrop-blur-md sticky top-0 py-8 overflow-y-auto transition-all duration-300",
          sidebarOpen ? "w-64 px-4" : "w-14 px-2"
        )}>
          <div className={cn("mb-8 flex items-center", sidebarOpen ? "px-4 justify-between" : "justify-center")}>
            {sidebarOpen && (
              <div>
                <h3 className="red-text-pulse font-headline text-2xl font-bold tracking-tight">
                  Categories
                </h3>
                <p className="red-glow-text font-label text-xs uppercase tracking-widest mt-1">
                  Filter by domain
                </p>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              className="shrink-0 w-7 h-7 flex items-center justify-center rounded-md hover:bg-white/[0.06] transition-colors"
              style={{ color: "rgba(252,165,165,0.7)" }}
              title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              <svg className={cn("w-4 h-4 transition-transform duration-300", sidebarOpen ? "" : "rotate-180")} fill="none" strokeWidth={1.8} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col space-y-0.5 mb-auto">
            {SIDEBAR_CATEGORIES.map(({ slug, label, code, count }) => {
              const isActive = activeCategory === slug;
              return (
                <button
                  key={slug}
                  onClick={() => setActiveCategory(slug)}
                  title={!sidebarOpen ? label : undefined}
                  className={cn(
                    "flex items-center font-label text-sm font-medium transition-colors duration-100 text-left rounded-sm w-full",
                    sidebarOpen ? "justify-between px-4 py-3" : "justify-center px-0 py-2.5",
                    isActive
                      ? "bg-white/[0.08] border-l-2 border-red-500/70"
                      : "hover:bg-white/[0.04]"
                  )}
                  style={isActive
                    ? { color: "rgba(255,255,255,0.95)", textShadow: "0 0 12px rgba(239,68,68,0.5)" }
                    : { color: "rgba(252,165,165,0.65)", textShadow: "0 0 8px rgba(239,68,68,0.35)" }
                  }
                >
                  <span className={cn("flex items-center", sidebarOpen ? "gap-3" : "")}>
                    <span className={cn(
                      "w-7 h-7 rounded-lg flex items-center justify-center font-mono text-[10px] font-bold border transition-colors shrink-0",
                      isActive
                        ? "bg-red-500/10 border-red-500/30"
                        : "bg-white/[0.04] border-white/[0.06]"
                    )}
                    style={isActive
                      ? { color: "rgba(252,165,165,1)", boxShadow: "0 0 10px rgba(239,68,68,0.4)" }
                      : { color: "rgba(252,165,165,0.55)", textShadow: "0 0 6px rgba(239,68,68,0.4)" }
                    }>
                      {code}
                    </span>
                    {sidebarOpen && label}
                  </span>
                  {sidebarOpen && (
                    <span
                      className={cn("font-mono text-[10px] px-2 py-0.5 rounded-md border", isActive ? "bg-red-500/10 border-red-500/20" : "border-transparent")}
                      style={isActive
                        ? { color: "rgba(252,165,165,0.9)", textShadow: "0 0 6px rgba(239,68,68,0.5)" }
                        : { color: "rgba(252,165,165,0.50)" }
                      }
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {sidebarOpen && (
            <div className="px-4 pt-6 border-t border-white/[0.04]">
              <div className="red-glow-text font-mono text-[10px] uppercase tracking-widest">
                {ALL_TOOLS.length} tools indexed
              </div>
            </div>
          )}
        </aside>

        {/* ── Main ── */}
        <main className="flex-1 px-6 md:px-12 py-8">
          <FadeUpContainer>
            <FadeUpItem>
              <header className="max-w-7xl mx-auto mb-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight mb-4 text-white">
                      The{" "}
                      <span className="text-white text-glow-lime">Directory</span>
                    </h1>
                    <p className="red-glow-text font-body max-w-md leading-relaxed">
                      {ALL_TOOLS.length} curated AI tools across{" "}
                      {Object.keys(categories).length} categories.
                    </p>
                  </div>

                  {/* Search */}
                  <div className="relative md:max-w-xs w-full">
                    <div className={cn(
                      "flex items-center h-11 bg-white/[0.03] border rounded-sm px-3 gap-2 transition-all duration-200",
                      rawQuery ? "border-white/30 bg-white/[0.05]" : "border-white/[0.08]",
                      "focus-within:border-white/30 focus-within:bg-white/[0.05]"
                    )}>
                      <svg className="w-3.5 h-3.5 text-white/40 shrink-0" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                      </svg>
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={rawQuery}
                        onChange={(e) => setRawQuery(e.target.value)}
                        placeholder='Search… (press "/" to focus)'
                        className="flex-1 bg-transparent outline-none text-sm text-white/80 placeholder:text-white/35 font-body"
                      />
                      {rawQuery && (
                        <button
                          onClick={() => setRawQuery("")}
                          className="text-white/25 hover:text-white/50 transition-colors"
                        >
                          <svg className="w-3 h-3" fill="none" strokeWidth={2} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                    <div className="absolute right-3 -bottom-5 font-mono text-[9px] text-white/30 uppercase tracking-wider">
                      press /
                    </div>
                  </div>
                </div>

                {/* Mobile category pills */}
                <div className="mt-6 flex flex-wrap gap-2 lg:hidden">
                  {SIDEBAR_CATEGORIES.map(({ slug, label }) => (
                    <button
                      key={slug}
                      onClick={() => setActiveCategory(slug)}
                      className={cn(
                        "px-3 py-1.5 rounded-sm border text-[12px] font-mono tracking-wide transition-all duration-150",
                        activeCategory === slug
                          ? "border-white/30 text-white bg-white/[0.06]"
                          : "border-white/[0.08] text-white/50 hover:bg-white/10 hover:text-white hover:border-white/30"
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </header>
            </FadeUpItem>

            <FadeUpItem>
              <div className="max-w-7xl mx-auto">
                {/* Animated result count */}
                <motion.div
                  key={`${filtered.length}-${activeCategory}-${query}`}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mb-6 flex items-center gap-3"
                >
                  <span className="red-glow-text font-mono text-[11px] uppercase tracking-widest">
                    {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                  </span>
                  {activeCategory !== "all" && (
                    <span className="red-glow-text font-label text-[10px] uppercase tracking-widest">
                      in {categories[activeCategory as CategoryKey]?.name ?? activeCategory}
                    </span>
                  )}
                  {query && (
                    <span className="red-glow-text font-label text-[10px] uppercase tracking-widest">
                      · matching &ldquo;{query}&rdquo;
                    </span>
                  )}
                </motion.div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  <AnimatePresence mode="popLayout">
                    {filtered.map((tool, i) => (
                      <motion.div
                        key={tool.slug}
                        layout
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.88 }}
                        transition={{
                          duration: 0.3,
                          delay: Math.min(i * 0.03, 0.4),
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="h-[260px]"
                      >
                        <ToolCard
                          name={tool.name}
                          description={tool.description}
                          category={tool.category}
                          pricing={tool.pricing}
                          slug={tool.slug}
                          logoUrl={tool.logoUrl}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {filtered.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-20 text-center space-y-4"
                  >
                    <p className="text-white/30 font-label text-sm uppercase tracking-widest">
                      No tools found for &ldquo;{query}&rdquo;
                    </p>
                    <button
                      onClick={() => { setRawQuery(""); setActiveCategory("all"); }}
                      className="font-label text-xs uppercase tracking-widest text-white/40 border-b border-white/20 pb-0.5 hover:text-white transition-colors"
                    >
                      Clear filters
                    </button>
                  </motion.div>
                )}
              </div>
            </FadeUpItem>
          </FadeUpContainer>
        </main>
      </div>

      <Footer />
    </div>
  );
}
