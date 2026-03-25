"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SplashScreen(): React.JSX.Element | null {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Skip if already shown this session
    if (sessionStorage.getItem("tm_splash_shown")) {
      setVisible(false);
      return;
    }
    sessionStorage.setItem("tm_splash_shown", "1");

    const exit = setTimeout(() => setExiting(true), 2200);
    const hide = setTimeout(() => setVisible(false), 2900);
    return () => {
      clearTimeout(exit);
      clearTimeout(hide);
    };
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505]"
        >
          {/* Ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.04] blur-[120px]" />
          </div>

          <div className="relative flex flex-col items-center gap-8 select-none">
            {/* Logo mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Outer glow ring */}
              <motion.div
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-sm bg-white/20 blur-xl scale-150"
              />
              {/* Logo box */}
              <div className="relative w-16 h-16 border border-white/20 bg-white/[0.06] flex items-center justify-center rounded-sm">
                <motion.span
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="font-mono font-bold text-2xl text-white tracking-tighter"
                >
                  TM
                </motion.span>
              </div>
            </motion.div>

            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-2"
            >
              <span className="font-headline font-bold text-4xl tracking-tight text-white/90">
                ToolMind
              </span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.5 }}
                className="font-label text-[10px] uppercase tracking-[0.4em] text-white/25"
              >
                AI Tool Intelligence
              </motion.span>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
              className="w-32 h-px bg-white/[0.06] overflow-hidden rounded-full"
            >
              <motion.div
                className="h-full bg-white/60 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
