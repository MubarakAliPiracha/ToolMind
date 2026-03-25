import { cn } from "@/lib/utils";

interface CategoryPillProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function CategoryPill({ label, active, onClick }: CategoryPillProps): React.JSX.Element {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-1.5 rounded-sm text-[12px] font-mono tracking-wide transition-all duration-150 border",
        active
          ? "bg-white text-[#050505] border-white font-medium"
          : "border-red-500/20 hover:border-red-500/40 hover:bg-red-500/5"
      )}
      style={
        active
          ? undefined
          : {
              color: "rgba(252,165,165,0.75)",
              textShadow: "0 0 8px rgba(239,68,68,0.50), 0 0 18px rgba(239,68,68,0.22)",
            }
      }
    >
      {label}
    </button>
  );
}
