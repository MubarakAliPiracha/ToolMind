"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const MOCK_TOOLS = [
  { name: "Cursor", category: "Coding", badge: "Freemium", color: "bg-blue-500/10 text-blue-400", dot: "bg-blue-400" },
  { name: "Midjourney", category: "Image", badge: "Paid", color: "bg-violet-500/10 text-violet-400", dot: "bg-violet-400" },
  { name: "ElevenLabs", category: "Audio", badge: "Freemium", color: "bg-blue-500/10 text-blue-400", dot: "bg-blue-400" },
  { name: "Runway", category: "Video", badge: "Freemium", color: "bg-blue-500/10 text-blue-400", dot: "bg-blue-400" },
  { name: "Perplexity", category: "Research", badge: "Free", color: "bg-emerald-500/10 text-emerald-400", dot: "bg-emerald-400" },
  { name: "Jasper", category: "Writing", badge: "Paid", color: "bg-violet-500/10 text-violet-400", dot: "bg-violet-400" },
] as const;

const MOCK_CATEGORIES = ["All", "Writing", "Coding", "Image", "Video", "Audio", "Research"];

export function ContainerScroll(): React.JSX.Element {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (): void => {
      if (!cardRef.current?.parentElement) return;
      const rect = cardRef.current.parentElement.getBoundingClientRect();
      const scrollPct = Math.max(
        0,
        Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height))
      );
      const rotateX = 18 - scrollPct * 18;
      const scale = 0.92 + scrollPct * 0.08;
      const translateY = -3 + scrollPct * 3;
      cardRef.current.style.transform = `rotateX(${rotateX}deg) translateY(${translateY}%) scale(${scale})`;
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <section className="w-full py-32 md:py-52 overflow-hidden bg-[#030712]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14 md:mb-24"
        >
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-white/25 mb-5">
            The Platform
          </p>
          <h2 className="font-headline font-bold text-white tracking-tight">
            <span className="block text-3xl md:text-4xl mb-2 font-normal text-white/50">
              Discover the right tool,
            </span>
            <span className="block text-5xl md:text-7xl text-white text-glow-lime">
              instantly.
            </span>
          </h2>
        </motion.div>

        {/* Scroll-animated dashboard */}
        <div className="w-full max-w-5xl mx-auto" style={{ perspective: "1200px" }}>
          <div
            ref={cardRef}
            className="relative w-full aspect-[16/10] rounded-sm border border-white/[0.06] overflow-hidden bg-[#0a0a0a] shadow-[0_0_80px_rgba(0,0,0,0.8)]"
            style={{
              transform: "rotateX(18deg) translateY(-3%) scale(0.92)",
              transition: "transform 0.08s ease-out",
            }}
          >
            {/* Window chrome */}
            <div className="h-10 bg-[#0d0d0d] border-b border-white/[0.04] flex items-center px-4 gap-3 shrink-0">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              {/* Fake URL bar */}
              <div className="flex-1 max-w-sm mx-auto h-6 bg-white/[0.03] rounded-full flex items-center px-3 gap-2">
                <div className="w-2 h-2 rounded-full bg-white/30 shrink-0" />
                <div className="text-[10px] text-white/20 font-mono">toolmind.ai/tools</div>
              </div>
              <div className="w-20 h-5 bg-white/[0.03] rounded-sm ml-auto" />
            </div>

            {/* Dashboard body */}
            <div className="flex h-[calc(100%-40px)]">
              {/* Sidebar */}
              <div className="w-48 border-r border-white/[0.04] bg-[#0a0a0a] p-4 flex flex-col gap-1 shrink-0">
                <div className="text-[10px] font-mono text-white/15 uppercase tracking-widest mb-3 px-2">
                  Categories
                </div>
                {MOCK_CATEGORIES.map((cat, i) => (
                  <div
                    key={cat}
                    className={`px-3 py-2 rounded-sm text-[11px] font-mono transition-colors ${
                      i === 0
                        ? "bg-white/10 text-white border-l-2 border-white"
                        : "text-white/25 hover:text-white/40"
                    }`}
                  >
                    {cat}
                  </div>
                ))}
              </div>

              {/* Main content */}
              <div className="flex-1 p-5 overflow-hidden">
                {/* Search bar mockup */}
                <div className="h-9 bg-white/[0.03] border border-white/[0.04] rounded-full flex items-center px-4 gap-2 mb-5">
                  <div className="w-3.5 h-3.5 rounded-full border border-white/15 shrink-0" />
                  <div className="h-2.5 bg-white/[0.06] rounded-full flex-1 max-w-xs" />
                </div>

                {/* Category pills */}
                <div className="flex gap-2 mb-5">
                  {["All Tools", "Writing", "Coding", "Image"].map((pill, i) => (
                    <div
                      key={pill}
                      className={`px-3 py-1 rounded-sm text-[10px] font-mono border ${
                        i === 0
                          ? "bg-white text-[#050505] border-white"
                          : "border-white/[0.06] text-white/25"
                      }`}
                    >
                      {pill}
                    </div>
                  ))}
                </div>

                {/* Tool cards grid */}
                <div className="grid grid-cols-3 gap-3">
                  {MOCK_TOOLS.map((tool) => (
                    <div
                      key={tool.name}
                      className="bg-white/[0.02] border border-white/[0.04] rounded-sm p-3 hover:border-white/[0.08] transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2.5">
                        <div
                          className={`w-7 h-7 rounded-sm flex items-center justify-center text-[11px] font-bold ${tool.color}`}
                        >
                          {tool.name.charAt(0)}
                        </div>
                        <span className="text-[9px] font-mono text-white/25 bg-white/[0.03] px-1.5 py-0.5 rounded-sm">
                          {tool.badge}
                        </span>
                      </div>
                      <div className="text-[11px] font-semibold text-white/70 mb-1">
                        {tool.name}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${tool.dot}`} />
                        <span className="text-[9px] font-mono text-white/25">{tool.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Glass glare overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
