"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Footer } from "@/components/ui/footer";
import { ToolCard, type Pricing } from "@/components/ui/tool-card";
import { FadeUpContainer, FadeUpItem } from "@/components/ui/motion";
import { categories, type CategoryKey } from "@/lib/data/categories";
import { makeToolPageSlug } from "@/lib/tool-slug";
import { scoreToolForTask } from "@/lib/task-match";

function toPricing(tier: string): Pricing {
  if (tier === "free") return "Free";
  if (tier === "paid") return "Paid";
  return "Freemium";
}

interface FlatTool {
  name: string;
  description: string;
  category: string;
  categoryKey: CategoryKey;
  pricing: Pricing;
  slug: string;
  logoUrl?: string;
}

const ALL_TOOLS: FlatTool[] = (Object.keys(categories) as CategoryKey[]).flatMap(
  (categoryKey) => {
    const cat = categories[categoryKey];
    return cat.tools.map((t) => ({
      name: t.name,
      description: t.bestFor,
      category: cat.name,
      categoryKey,
      pricing: toPricing(t.pricing),
      slug: makeToolPageSlug(categoryKey, t.name),
      logoUrl: "logoUrl" in t ? (t.logoUrl as string) : undefined,
    }));
  }
);

export function SearchResultsClient(): React.JSX.Element {
  const searchParams = useSearchParams();
  const rawQ = searchParams.get("q") ?? "";
  const q = rawQ.trim();

  const ranked = useMemo(() => {
    if (!q) return [];
    const scored = ALL_TOOLS.map((tool) => ({
      tool,
      score: scoreToolForTask(
        {
          categorySlug: tool.categoryKey,
          categoryName: tool.category,
          name: tool.name,
          bestFor: tool.description,
        },
        q
      ),
    }));
    scored.sort((a, b) => b.score - a.score);
    return scored;
  }, [q]);

  return (
    <div className="min-h-screen bg-transparent">
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <FadeUpContainer>
          <FadeUpItem>
            <header className="mb-14">
              <span className="font-label text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4 block">
                Search
              </span>
              <h1 className="font-headline text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
                Results for{" "}
                <span className="text-white text-glow-lime">
                  {q ? `"${q}"` : "your task"}
                </span>
              </h1>
              {!q ? (
                <p className="text-white/60 max-w-xl leading-relaxed">
                  Enter a task in the search bar on the homepage, or{" "}
                  <Link
                    href="/tools"
                    className="text-white/70 border-b border-white/20 hover:text-white"
                  >
                    browse the full directory
                  </Link>
                  .
                </p>
              ) : (
                <motion.p
                  key={ranked.length}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-white/60 font-mono text-sm"
                >
                  {ranked.length} tools ranked by task match
                </motion.p>
              )}
            </header>
          </FadeUpItem>

          {q && (
            <FadeUpItem>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {ranked.map(({ tool, score }, i) => (
                  <motion.div
                    key={tool.slug}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: Math.min(i * 0.04, 0.5),
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
                      matchScore={score}
                      logoUrl={tool.logoUrl}
                    />
                  </motion.div>
                ))}
              </div>
            </FadeUpItem>
          )}
        </FadeUpContainer>
      </main>
      <Footer />
    </div>
  );
}
