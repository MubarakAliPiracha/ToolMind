"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Footer } from "./footer";
import { CategoryPill } from "./category-pill";
import { ToolCard, type Pricing } from "./tool-card";
import { FadeUpContainer, FadeUpItem } from "./motion";

import type { CategoryData, CategoryKey } from "@/lib/data/categories";
import { makeToolPageSlug } from "@/lib/tool-slug";
import { subcategoryForTool } from "@/lib/tool-subcategory-map";

interface CategoryPageClientProps {
  slug: string;
  category: CategoryData;
}

function toPricing(tier: string): Pricing {
  if (tier === "free") return "Free";
  if (tier === "paid") return "Paid";
  return "Freemium";
}

export function CategoryPageClient({
  slug,
  category,
}: CategoryPageClientProps): React.JSX.Element {
  const categoryKey = slug as CategoryKey;
  const defaultSub = category.subcategories[0] ?? "All";

  const populatedSubs = category.subcategories.filter((sub) =>
    category.tools.some(
      (tool) => subcategoryForTool(categoryKey, tool.name, defaultSub) === sub
    )
  );
  const allFilters = ["All", ...populatedSubs];
  const [activeFilter, setActiveFilter] = useState<string>("All");

  // Count tools per filter for badge display
  const filterCounts = useMemo(() => {
    const counts: Record<string, number> = { All: category.tools.length };
    for (const sub of populatedSubs) {
      counts[sub] = category.tools.filter(
        (tool) => subcategoryForTool(categoryKey, tool.name, defaultSub) === sub
      ).length;
    }
    return counts;
  }, [category.tools, categoryKey, defaultSub, populatedSubs]);

  const visibleTools = category.tools.filter((tool) => {
    if (activeFilter === "All") return true;
    return subcategoryForTool(categoryKey, tool.name, defaultSub) === activeFilter;
  });

  return (
    <div className="min-h-screen bg-transparent">
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <FadeUpContainer>
          {/* ── Header ── */}
          <FadeUpItem>
            <header className="mb-20">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="max-w-2xl">
                  <span className="red-glow-text font-label text-[10px] uppercase tracking-[0.3em] mb-4 block">
                    Archive / Category
                  </span>
                  <h1 className="font-headline font-bold text-6xl md:text-8xl tracking-tight text-white leading-none mb-8">
                    {category.name}
                  </h1>
                  <p className="red-glow-text font-body text-xl leading-relaxed max-w-xl">
                    {category.description}
                  </p>
                </div>

                {/* Subcategory pills with counts */}
                <div className="flex flex-wrap gap-2 md:mb-2">
                  {allFilters.map((filter) => (
                    <div key={filter} className="relative">
                      <CategoryPill
                        label={filter}
                        active={activeFilter === filter}
                        onClick={() => setActiveFilter(filter)}
                      />
                      {/* Count badge */}
                      <AnimatePresence>
                        {activeFilter !== filter && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.7 }}
                            className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-mono text-[8px] text-white/50 pointer-events-none"
                          >
                            {filterCounts[filter] ?? 0}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </header>
          </FadeUpItem>

          {/* ── Tool cards with animated transitions ── */}
          <FadeUpItem>
            {/* Animated result count */}
            <motion.div
              key={`count-${activeFilter}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className="mb-6 flex items-center gap-3"
            >
              <span className="red-glow-text font-mono text-[11px] uppercase tracking-widest">
                {visibleTools.length} tool{visibleTools.length !== 1 ? "s" : ""}
              </span>
              {activeFilter !== "All" && (
                <span className="red-glow-text font-label text-[10px] uppercase tracking-widest">
                  in {activeFilter}
                </span>
              )}
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-20">
              <AnimatePresence mode="popLayout">
                {visibleTools.map((tool, i) => (
                  <motion.div
                    key={makeToolPageSlug(categoryKey, tool.name)}
                    layout
                    initial={{ opacity: 0, scale: 0.92, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.88, y: -10 }}
                    transition={{
                      duration: 0.35,
                      delay: i * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="h-[260px]"
                  >
                    <ToolCard
                      name={tool.name}
                      description={tool.bestFor}
                      category={category.name}
                      pricing={toPricing(tool.pricing)}
                      slug={makeToolPageSlug(categoryKey, tool.name)}
                      logoUrl={"logoUrl" in tool ? (tool.logoUrl as string) : undefined}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              {visibleTools.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-16 text-center text-white/30 font-label text-sm uppercase tracking-widest"
                >
                  No tools in this filter
                </motion.div>
              )}
            </div>
          </FadeUpItem>

          {/* ── Latest additions list ── */}
          <FadeUpItem>
            <section>
              <h4 className="red-glow-text font-label text-[10px] uppercase tracking-[0.4em] mb-10 border-b border-red-500/10 pb-4">
                Latest Additions
              </h4>
              <div className="space-y-0">
                {visibleTools.slice(0, 3).map((tool, i) => (
                  <Link
                    key={makeToolPageSlug(categoryKey, tool.name)}
                    href={`/tools/${makeToolPageSlug(categoryKey, tool.name)}`}
                    className="group flex items-center justify-between py-8 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors px-4 -mx-4 rounded-sm"
                  >
                    <div className="flex items-center gap-8 md:gap-12">
                      <span className="font-label text-xs text-white/40 shrink-0 font-mono">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-headline text-2xl font-bold text-white group-hover:text-white transition-colors duration-200">
                        {tool.name}
                      </span>
                      <span className="red-glow-text hidden md:block font-body text-sm italic">
                        {tool.bestFor}
                      </span>
                    </div>
                    <div className="flex items-center gap-6 shrink-0">
                      <span className="red-glow-text hidden sm:block font-label text-xs uppercase">
                        {category.name}
                      </span>
                      <span className="text-white/60 group-hover:translate-x-1 transition-transform inline-block">
                        →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </FadeUpItem>
        </FadeUpContainer>
      </main>

      <Footer />
    </div>
  );
}
