"use client";

const MARQUEE_ITEMS = [
  "GPT-4o",
  "CLAUDE 3.5",
  "MIDJOURNEY",
  "CURSOR",
  "PERPLEXITY",
  "ELEVENLABS",
  "DESCRIPT",
  "RUNWAY",
  "JASPER",
  "NOTION AI",
  "STABLE DIFFUSION",
  "COPILOT",
] as const;

interface MarqueeProps {
  speed?: number;
  className?: string;
}

export function Marquee({ speed = 25, className = "" }: MarqueeProps): React.JSX.Element {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div
      className={`w-full overflow-hidden py-4 border-y border-white/[0.04] ${className}`}
      style={{ background: "#080808" }}
    >
      <div
        className="marquee-track flex items-center gap-0"
        style={{ animationDuration: `${speed}s` }}
      >
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center shrink-0">
            <span
              className="font-label text-[11px] uppercase tracking-[0.2em] px-6"
              style={{
                color: "rgba(252, 165, 165, 0.85)",
                textShadow:
                  "0 0 10px rgba(239,68,68,0.70), 0 0 22px rgba(239,68,68,0.40), 0 0 40px rgba(239,68,68,0.18)",
              }}
            >
              {item}
            </span>
            {/* Red dot separator */}
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{
                background: "rgba(239,68,68,0.70)",
                boxShadow: "0 0 6px rgba(239,68,68,0.9), 0 0 14px rgba(239,68,68,0.5)",
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
