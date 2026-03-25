"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

const movingMap: Record<Direction, string> = {
  TOP:    "radial-gradient(20.7% 50% at 50% 0%,   hsl(0,0%,100%) 0%, rgba(255,255,255,0) 100%)",
  LEFT:   "radial-gradient(16.6% 43.1% at 0% 50%, hsl(0,0%,100%) 0%, rgba(255,255,255,0) 100%)",
  BOTTOM: "radial-gradient(20.7% 50% at 50% 100%, hsl(0,0%,100%) 0%, rgba(255,255,255,0) 100%)",
  RIGHT:  "radial-gradient(16.2% 41.2% at 100% 50%, hsl(0,0%,100%) 0%, rgba(255,255,255,0) 100%)",
};

/** White highlight shown on hover */
const HIGHLIGHT =
  "radial-gradient(75% 181% at 50% 50%, #ffffff 0%, rgba(255,255,255,0) 100%)";

const DIRECTIONS: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];

function rotateDirection(current: Direction, clockwise: boolean): Direction {
  const i = DIRECTIONS.indexOf(current);
  const next = clockwise
    ? (i - 1 + DIRECTIONS.length) % DIRECTIONS.length
    : (i + 1) % DIRECTIONS.length;
  return DIRECTIONS[next];
}

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
  } & React.HTMLAttributes<HTMLElement> &
    // Allow arbitrary props (e.g. href when as={Link})
    Record<string, unknown>
>) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  useEffect(() => {
    if (hovered) return;
    const id = setInterval(() => {
      setDirection((d) => rotateDirection(d, clockwise));
    }, duration * 1000);
    return () => clearInterval(id);
  }, [hovered, clockwise, duration]);

  type AnyProps = React.PropsWithChildren<Record<string, unknown>>;
  const Component = Tag as React.ComponentType<AnyProps>;

  return (
    <Component
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex rounded-full border border-white/[0.08] content-center",
        "bg-black/20 hover:bg-black/10 transition duration-500",
        "items-center flex-col flex-nowrap gap-10 h-min justify-center",
        "overflow-visible p-px w-fit",
        containerClassName
      )}
      {...props}
    >
      {/* Inner content surface */}
      <div
        className={cn(
          "w-auto text-white z-10 bg-[#050505] px-5 py-2.5 rounded-[inherit]",
          className
        )}
      >
        {children}
      </div>

      {/* Rotating border glow */}
      <motion.div
        className="flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
        style={{ filter: "blur(2px)", position: "absolute", width: "100%", height: "100%" }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], HIGHLIGHT]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration: duration ?? 1 }}
      />

      {/* Dark fill behind the glow ring */}
      <div className="bg-[#050505] absolute z-[1] inset-[2px] rounded-[100px]" />
    </Component>
  );
}
