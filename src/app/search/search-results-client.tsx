"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const rawQ = searchParams.get("q") ?? "";
  const q = rawQ.trim();
  const [inputValue, setInputValue] = useState(rawQ);

  function submitSearch(): void {
    const trimmed = inputValue.trim();
    if (trimmed) router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

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
              <span className="red-glow-text font-label text-[10px] uppercase tracking-[0.3em] mb-4 block">
                Search
              </span>
              <h1 className="font-headline text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
                {q ? (
                  <>Results for <span className="text-white text-glow-lime">&ldquo;{q}&rdquo;</span></>
                ) : (
                  "Find the right AI tool"
                )}
              </h1>

              {/* Always-visible search bar */}
              <div className="relative flex items-center h-14 w-full max-w-2xl bg-white/[0.03] border border-white/[0.08] rounded-full px-5 gap-3 transition-all focus-within:border-white/30 focus-within:bg-white/[0.05] backdrop-blur-sm mb-4">
                <svg className="w-4 h-4 text-white/40 shrink-0" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") submitSearch(); }}
                  placeholder="Describe what you want to do…"
                  autoFocus={!q}
                  className="flex-1 bg-transparent outline-none text-white/80 placeholder:text-white/35 font-body text-base"
                />
                {inputValue && (
                  <button onClick={() => setInputValue("")} className="text-white/30 hover:text-white/60 transition-colors shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" strokeWidth={2} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {q && (
                <motion.p
                  key={ranked.length}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="red-glow-text font-mono text-[11px] uppercase tracking-widest"
                >
                  {ranked.length} tools ranked by task match
                </motion.p>
              )}
              {!q && (
                <p className="text-white/40 font-label text-sm">
                  Type a task above and press Enter, or{" "}
                  <Link href="/tools" className="text-white/60 border-b border-white/20 hover:text-white transition-colors">
                    browse all tools
                  </Link>
                </p>
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
