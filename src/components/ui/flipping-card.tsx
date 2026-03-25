import React from "react";
import { cn } from "@/lib/utils";

interface FlippingCardProps {
  className?: string;
  height?: number;
  width?: number;
  fill?: boolean;
  frontContent?: React.ReactNode;
  backContent?: React.ReactNode;
}

export function FlippingCard({
  className,
  frontContent,
  backContent,
  height = 300,
  width = 350,
  fill = false,
}: FlippingCardProps) {
  return (
    <div
      className={cn("group/flipping-card [perspective:1000px]", fill && "h-full w-full")}
      style={
        !fill
          ? ({
              "--height": `${height}px`,
              "--width": `${width}px`,
            } as React.CSSProperties)
          : undefined
      }
    >
      <div
        className={cn(
          "relative rounded-2xl transition-all duration-700 [transform-style:preserve-3d] group-hover/flipping-card:[transform:rotateY(180deg)]",
          fill ? "h-full w-full" : "h-[var(--height)] w-[var(--width)]",
          className
        )}
        style={{
          /* Wireframe globe-like outline — thin white stroke with layered outer glow */
          border: "1px solid rgba(255,255,255,0.18)",
          background: "transparent",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.06), " +
            "0 0 18px rgba(255,255,255,0.07), " +
            "0 0 40px rgba(255,255,255,0.03)",
        }}
      >
        {/* Front Face — transparent crystal wireframe */}
        <div
          className="absolute inset-0 h-full w-full rounded-[inherit] text-white [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(0deg)] overflow-hidden"
          style={{
            background: "rgba(5, 5, 5, 0.18)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Top prismatic edge highlight */}
          <div
            className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none z-20"
            style={{ background: "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.28) 40%, rgba(255,255,255,0.12) 60%, transparent 95%)" }}
          />
          {/* Left edge subtle line */}
          <div
            className="absolute top-0 left-0 bottom-0 w-[1px] pointer-events-none z-20"
            style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.12), transparent 70%)" }}
          />
          {/* Shimmer sweep */}
          <div className="card-shimmer absolute inset-0 w-1/3 h-full pointer-events-none z-10" />
          <div className="h-full w-full">
            {frontContent}
          </div>
        </div>

        {/* Back Face — slightly more opaque wireframe */}
        <div
          className="absolute inset-0 h-full w-full rounded-[inherit] text-white [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden"
          style={{
            background: "rgba(5, 5, 5, 0.22)",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(255,255,255,0.14)",
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none z-20"
            style={{ background: "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.32) 40%, rgba(255,255,255,0.16) 60%, transparent 95%)" }}
          />
          <div className="h-full w-full">
            {backContent}
          </div>
        </div>
      </div>
    </div>
  );
}
