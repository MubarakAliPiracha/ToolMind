"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { SplineScene } from "./splite";

const SPLINE_URL = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

const GRID_SIZE = 28;

function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1, y: -1 });
  const frameRef = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, w, h);

    const cols = GRID_SIZE;
    const rows = Math.ceil((h / w) * cols);
    const spacingX = w / cols;
    const spacingY = h / rows;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const time = frameRef.current * 0.008;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = spacingX * (col + 0.5);
        const y = spacingY * (row + 0.5);

        const dx = mx >= 0 ? mx - x : Infinity;
        const dy = my >= 0 ? my - y : Infinity;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxRadius = 200;

        const wave = Math.sin(time + col * 0.15 + row * 0.15) * 0.5 + 0.5;
        const pulse = Math.sin(time * 0.6 + (col + row) * 0.08) * 0.3 + 0.7;

        let baseAlpha = 0.18 + wave * 0.14;
        let radius = 1.8 + wave * 0.8;

        if (dist < maxRadius) {
          const proximity = 1 - dist / maxRadius;
          const glow = proximity * proximity;
          baseAlpha += glow * 0.7;
          radius += glow * 4;
        }

        baseAlpha *= pulse;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(baseAlpha, 0.85)})`;
        ctx.fill();
      }
    }

    frameRef.current++;
    requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(id);
  }, [draw]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -1, y: -1 };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 w-full h-full"
    />
  );
}

function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px pointer-events-none z-10"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.3) 20%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.3) 80%, transparent)",
        boxShadow: "0 0 60px 20px rgba(255,255,255,0.08)",
      }}
      animate={{ top: ["0%", "100%", "0%"] }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

export function HeroFuturistic(): React.JSX.Element {
  const titleWords = ["Find", "Your", "AI", "Tool"];
  const subtitle =
    "The world\u2019s most curated AI tool directory.\nDescribe your task \u2014 we surface the perfect tool.";
  const [visibleWords, setVisibleWords] = useState(0);
  const [subtitleVisible, setSubtitleVisible] = useState(false);

  useEffect(() => {
    if (visibleWords < titleWords.length) {
      const timeout = setTimeout(() => setVisibleWords((v) => v + 1), 400);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => setSubtitleVisible(true), 500);
      return () => clearTimeout(timeout);
    }
  }, [visibleWords, titleWords.length]);

  return (
    <section className="relative w-full h-[100vh] min-h-[600px] overflow-hidden bg-[#050505]">
      {/* Animated dot grid */}
      <DotGrid />

      {/* Scan line */}
      <ScanLine />

      {/* Spline 3D robot — positioned in lower half so text sits above */}
      <div className="absolute inset-0 z-[3] flex items-end justify-center pointer-events-none overflow-visible">
        <div
          className="pointer-events-auto shrink-0 translate-y-[18%]"
          style={{
            width: "min(130vmin, 1100px)",
            height: "min(130vmin, 1100px)",
            minWidth: "min(90vw, 700px)",
            minHeight: "min(90vw, 700px)",
          }}
        >
          <SplineScene scene={SPLINE_URL} className="h-full w-full" />
        </div>
      </div>

      {/* Light vignette — only darkens very edges, robot stays visible */}
      <div
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 55%, transparent 40%, rgba(5,5,5,0.25) 75%, #050505 100%)",
        }}
      />

      {/* Text — sits at top so robot is visible below */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-start pt-20 pointer-events-none px-6">
        <div className="flex gap-3 md:gap-5 overflow-hidden">
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ y: 50, opacity: 0 }}
              animate={
                i < visibleWords
                  ? { y: 0, opacity: 1 }
                  : { y: 50, opacity: 0 }
              }
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-headline text-5xl md:text-7xl xl:text-8xl font-bold text-white uppercase tracking-tight"
              style={{ textShadow: "0 0 60px rgba(255,255,255,0.15)" }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={
            subtitleVisible
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-6 text-sm md:text-lg xl:text-xl text-white/60 font-body max-w-lg text-center leading-relaxed whitespace-pre-line"
          style={{ textShadow: "0 0 20px rgba(255,255,255,0.1)" }}
        >
          {subtitle}
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={subtitleVisible ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 h-px w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
      </div>

      {/* Top / bottom fade edges */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />
    </section>
  );
}

export default HeroFuturistic;
