"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { categories } from "@/lib/data/categories";
import { PixelCanvas } from "./pixel-canvas";

const totalTools = Object.values(categories).reduce((sum, cat) => sum + cat.tools.length, 0);

function useTilt() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [0, 400], [6, -6]), { stiffness: 300, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [0, 400], [-6, 6]), { stiffness: 300, damping: 25 });
  const glowX = useTransform(mouseX, [0, 400], [0, 100]);
  const glowY = useTransform(mouseY, [0, 400], [0, 100]);

  const onMouseMove = ({ clientX, clientY, currentTarget }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };
  const onMouseLeave = () => { mouseX.set(200); mouseY.set(200); };

  return { rotateX, rotateY, glowX, glowY, onMouseMove, onMouseLeave };
}

export function BentoSection(): React.JSX.Element {
  const tilt1 = useTilt();
  const tilt2 = useTilt();
  const tilt3 = useTilt();
  const tilt4 = useTilt();

  return (
    <section className="w-full bg-[#050505] py-24 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex justify-between items-end"
        >
          <div className="space-y-2">
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-white/40">
              Featured Exhibitions
            </span>
            <h2 className="font-headline text-3xl font-[200]">
              <span className="text-white/60">Engineered For </span>
              <span className="text-white" style={{ textShadow: "0 0 40px rgba(255,255,255,0.3), 0 0 80px rgba(255,255,255,0.1)" }}>Discovery</span>
            </h2>
            <p className="font-mono text-[11px] text-white/20">
              {totalTools} tools indexed across {Object.keys(categories).length} categories
            </p>
          </div>
          <Link
            href="/tools"
            className="font-label text-xs uppercase tracking-widest text-white/50 border-b border-white/20 pb-1 hover:text-white transition-colors"
          >
            Browse Archive
          </Link>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-auto md:h-[480px]">

          {/* ── 8-col feature card ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-8"
            style={{ perspective: "1000px" }}
          >
            <motion.div
              onMouseMove={tilt1.onMouseMove}
              onMouseLeave={tilt1.onMouseLeave}
              style={{ rotateX: tilt1.rotateX, rotateY: tilt1.rotateY, transformStyle: "preserve-3d" }}
              className="relative h-full group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0d0d] cursor-pointer"
            >
              {/* Pixel canvas on hover */}
              <PixelCanvas
                gap={14}
                speed={20}
                colors={["#ffffff08", "#ffffff12", "#ffffff06"]}
                variant="default"
                noFocus
              />
              {/* Mouse glow */}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{
                  background: `radial-gradient(320px at ${tilt1.glowX}% ${tilt1.glowY}%, rgba(255,255,255,0.07), transparent 60%)`,
                }}
              />
              {/* Top gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              {/* Watermark */}
              <div className="absolute top-4 right-6 font-headline text-[120px] font-black text-white/[0.03] leading-none select-none pointer-events-none">
                01
              </div>
              <div className="p-8 relative z-10 flex flex-col h-full justify-between" style={{ transform: "translateZ(20px)" }}>
                <div>
                  <span className="font-label text-[10px] uppercase tracking-widest px-2 py-1 bg-white/10 border border-white/10 text-white/80 inline-block rounded-full">
                    Productivity
                  </span>
                  <h3 className="mt-5 font-headline text-2xl font-bold text-white">
                    The Infinite Canvas
                  </h3>
                  <p className="mt-2 text-sm text-white/40 max-w-sm leading-relaxed">
                    Discover spatial interfaces that redefine how we organize knowledge through collaborative AI.
                  </p>
                </div>
                <div className="mt-8">
                  <Link
                    href="/category/productivity"
                    className="inline-flex items-center gap-2 bg-white text-[#050505] px-5 py-2.5 text-xs font-label uppercase tracking-widest font-bold hover:bg-white/80 transition-colors rounded-full"
                  >
                    Explore Collection
                    <span className="text-base leading-none">→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── 4-col icon card with PixelCanvas ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4"
            style={{ perspective: "1000px" }}
          >
            <Link href="/category/coding" className="block h-full">
              <motion.div
                onMouseMove={tilt2.onMouseMove}
                onMouseLeave={tilt2.onMouseLeave}
                style={{ rotateX: tilt2.rotateX, rotateY: tilt2.rotateY, transformStyle: "preserve-3d" }}
                className="relative h-full group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0d0d] p-8 flex flex-col justify-center text-center space-y-4 cursor-pointer"
              >
                <PixelCanvas
                  gap={10}
                  speed={25}
                  colors={["#ffffff10", "#ffffff18", "#ffffffa"]}
                  variant="icon"
                />
                <motion.div
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  style={{
                    background: `radial-gradient(200px at ${tilt2.glowX}% ${tilt2.glowY}%, rgba(255,255,255,0.09), transparent 60%)`,
                  }}
                />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                <div
                  className="relative z-10 w-16 h-16 flex items-center justify-center mx-auto rounded-2xl border border-white/10 bg-white/[0.05] group-hover:border-white/25 group-hover:bg-white/[0.10] transition-all duration-300"
                  style={{ transform: "translateZ(30px)", boxShadow: "0 0 30px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.1)" }}
                >
                  <span className="text-white/80 text-3xl leading-none select-none">⚡</span>
                </div>
                <h3 className="relative z-10 font-headline text-xl font-bold text-white" style={{ transform: "translateZ(20px)" }}>
                  Rapid Prototyping
                </h3>
                <p className="relative z-10 text-xs text-white/40 leading-relaxed">
                  Tools designed for the 0 to 1 journey, optimized for speed and clarity.
                </p>
                <span className="relative z-10 font-label text-[10px] uppercase tracking-widest text-white/30 group-hover:text-white/60 transition-colors">
                  Browse →
                </span>
              </motion.div>
            </Link>
          </motion.div>

          {/* ── 4-col small card ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4"
            style={{ perspective: "1000px" }}
          >
            <motion.div
              onMouseMove={tilt3.onMouseMove}
              onMouseLeave={tilt3.onMouseLeave}
              style={{ rotateX: tilt3.rotateX, rotateY: tilt3.rotateY, transformStyle: "preserve-3d" }}
              className="relative h-full group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0d0d] p-8 flex items-center gap-5 cursor-pointer"
              onClick={() => { window.location.href = "/category/image"; }}
            >
              <PixelCanvas gap={12} speed={22} colors={["#ffffff08", "#ffffff14"]} variant="default" noFocus />
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{ background: `radial-gradient(180px at ${tilt3.glowX}% ${tilt3.glowY}%, rgba(255,255,255,0.07), transparent 60%)` }}
              />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <div
                className="relative z-10 shrink-0 w-12 h-12 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center group-hover:border-white/20 group-hover:bg-white/[0.08] transition-all duration-300"
                style={{ transform: "translateZ(20px)" }}
              >
                <span className="text-white/40 text-2xl leading-none select-none group-hover:text-white/60 transition-colors duration-300">◈</span>
              </div>
              <div className="relative z-10">
                <h4 className="font-headline text-lg font-bold text-white">Storytelling</h4>
                <p className="text-[11px] text-white/30 mt-0.5">Generative narrative engines.</p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── 8-col dark card ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-8"
            style={{ perspective: "1000px" }}
          >
            <Link href="/category/research" className="block h-full">
              <motion.div
                onMouseMove={tilt4.onMouseMove}
                onMouseLeave={tilt4.onMouseLeave}
                style={{ rotateX: tilt4.rotateX, rotateY: tilt4.rotateY, transformStyle: "preserve-3d" }}
                className="relative h-full group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0a] p-8 flex justify-between items-center cursor-pointer"
              >
                <PixelCanvas gap={16} speed={18} colors={["#ffffff06", "#ffffff0e"]} variant="default" noFocus />
                <motion.div
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  style={{ background: `radial-gradient(280px at ${tilt4.glowX}% ${tilt4.glowY}%, rgba(255,255,255,0.06), transparent 60%)` }}
                />
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                <div className="relative z-10 space-y-1" style={{ transform: "translateZ(15px)" }}>
                  <h4 className="font-headline text-xl font-bold text-white group-hover:text-white transition-colors duration-200">
                    Mindful Research
                  </h4>
                  <p className="text-xs text-white/30">Tools that filter the noise.</p>
                </div>
                <span className="relative z-10 text-white/40 group-hover:translate-x-2 group-hover:text-white/80 transition-all duration-300 inline-block text-2xl leading-none" style={{ transform: "translateZ(15px)" }}>
                  →
                </span>
              </motion.div>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
