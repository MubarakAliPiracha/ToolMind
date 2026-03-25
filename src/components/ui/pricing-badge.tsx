import { cn } from "@/lib/utils";

export type PricingTier = "free" | "freemium" | "paid";

interface PricingBadgeProps {
  tier: PricingTier;
}

const tierConfig: Record<PricingTier, { label: string; className: string }> = {
  free: {
    label: "Free",
    className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  freemium: {
    label: "Freemium",
    className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  paid: {
    label: "Paid",
    className: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  },
};

export function PricingBadge({ tier }: PricingBadgeProps): React.JSX.Element {
  const { label, className } = tierConfig[tier];
  return (
    <span
      className={cn(
        "text-[10px] font-label uppercase tracking-widest px-2 py-0.5 rounded-sm border",
        className
      )}
    >
      {label}
    </span>
  );
}
