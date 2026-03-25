"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { HeroWebGPUBackground } from "./hero-webgpu-wrapper";
import {
  Microphone,
  Image as ImageIcon,
  Code,
  FilmStrip,
  ChartBar,
  Envelope,
} from "@phosphor-icons/react";

const TASK_PILLS = [
  { Icon: Microphone, label: "Transcribe audio", query: "transcribe audio" },
  { Icon: ImageIcon,  label: "Generate images",  query: "generate images" },
  { Icon: Code,       label: "Write code",       query: "write code" },
  { Icon: FilmStrip,  label: "Edit video",       query: "edit video" },
  { Icon: ChartBar,   label: "Analyze data",     query: "analyze data" },
  { Icon: Envelope,   label: "Write emails",     query: "write emails" },
] as const;

const HEADLINE_PART_1 = ["What", "do", "you"];
const HEADLINE_PART_2 = ["want", "to", "do?"];
export function HeroSection(): React.JSX.Element {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const spotlightRef = useRef<HTMLDivElement>(null);

  function submitSearch(): void {
    const q = searchValue.trim();
    if (q) router.push(`/tools?q=${encodeURIComponent(q)}`);
    else router.push("/tools");
  }

  useEffect(() => {
    const handler = (e: MouseEvent): void => {
      if (!spotlightRef.current) return;
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      spotlightRef.current.style.setProperty("--x", `${x}%`);
      spotlightRef.current.style.setProperty("--y", `${y}%`);
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* WebGPU depth-map parallax background */}
      <HeroWebGPUBackground />

      {/* Mouse spotlight */}
      <div
        ref={spotlightRef}
        className="spotlight-hero absolute inset-0 pointer-events-none z-[1]"
        style={
          {
            "--x": "50%",
            "--y": "50%",
            background:
              "radial-gradient(500px circle at var(--x) var(--y), rgba(255,255,255,0.03), transparent 80%)",
          } as React.CSSProperties
        }
      />

      {/* Dark gradient behind left-side text so it always reads clearly */}
      <div className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: "linear-gradient(to right, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0.55) 45%, transparent 75%)" }}
      />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 pt-32 pb-20">
        {/* Left-aligned headline */}
        <div className="space-y-8 mb-14 max-w-xl">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-label text-[10px] uppercase tracking-[0.25em] text-white/60 px-3 py-1.5 border border-white/20 rounded-full inline-block"
          >
            AI Discovery Engine
          </motion.span>

          <h1 className="font-headline text-5xl md:text-[72px] font-bold tracking-tight leading-[1.05]">
            <span className="block">
              {HEADLINE_PART_1.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                  {word.split("").map((letter, letterIndex) => (
                    <motion.span
                      key={`${wordIndex}-${letterIndex}`}
                      initial={{ y: 60, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: wordIndex * 0.08 + letterIndex * 0.025,
                        type: "spring",
                        stiffness: 160,
                        damping: 22,
                      }}
                      className="inline-block text-white/90"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              ))}
            </span>
            <span className="block">
              {HEADLINE_PART_2.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                  {word.split("").map((letter, letterIndex) => (
                    <motion.span
                      key={`p2-${wordIndex}-${letterIndex}`}
                      initial={{ y: 60, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: 0.24 + wordIndex * 0.08 + letterIndex * 0.025,
                        type: "spring",
                        stiffness: 160,
                        damping: 22,
                      }}
                      className="inline-block text-white"
                      style={{ textShadow: "0 0 30px rgba(239,68,68,0.8), 0 0 60px rgba(239,68,68,0.4), 0 0 100px rgba(239,68,68,0.2)" }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-white/75 font-body text-lg max-w-md leading-relaxed"
          >
            The world&apos;s most sophisticated AI tool directory. Describe your
            task — we surface the perfect tool for your workflow.
          </motion.p>
        </div>

        {/* Search bar — left-aligned, max-width contained */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="w-full max-w-xl space-y-6"
        >
          {/* Search input */}
          <div className="relative flex items-center h-14 w-full bg-white/[0.03] border border-white/[0.06] rounded-full px-5 transition-all duration-300 focus-within:border-white/30 focus-within:bg-white/[0.05] backdrop-blur-sm">
            <svg
              className="w-4 h-4 text-white/40 mr-3 shrink-0"
              fill="none"
              strokeWidth={1.5}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") submitSearch();
              }}
              placeholder="Describe what you want to do…"
              className="w-full bg-transparent border-none outline-none text-white/80 placeholder:text-white/35 font-body text-base"
            />
          </div>

          {/* Task pills */}
          <div className="flex flex-wrap justify-start gap-2">
            {TASK_PILLS.map(({ Icon, label, query }) => (
              <Link
                key={label}
                href={`/tools?q=${encodeURIComponent(query)}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 font-label text-[11px] uppercase tracking-widest text-white/70 bg-white/[0.04] backdrop-blur-sm transition-all duration-300 hover:border-white/70 hover:text-white hover:bg-white/[0.10] hover:shadow-[0_0_18px_rgba(255,255,255,0.18)]"
                style={{ boxShadow: "0 0 10px rgba(255,255,255,0.07), inset 0 0 8px rgba(255,255,255,0.03)" }}
              >
                <span
                  className="flex items-center justify-center"
                  style={{ filter: "drop-shadow(0 0 6px rgba(239,68,68,0.9)) drop-shadow(0 0 14px rgba(239,68,68,0.5))", color: "rgba(252,165,165,1)" }}
                >
                  <Icon size={13} weight="regular" />
                </span>
                {label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
