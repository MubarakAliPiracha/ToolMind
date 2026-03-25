import React from "react";

interface GlowingShadowProps {
  children: React.ReactNode;
  size?: number;
  className?: string;
}

/**
 * Wraps an icon with a continuously-orbiting rainbow glow halo.
 * Uses CSS @property + conic-gradient animation defined in globals.css.
 */
export function GlowingShadow({ children, size = 28, className = "" }: GlowingShadowProps) {
  return (
    <span
      className={`glow-icon-wrap shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {children}
    </span>
  );
}
