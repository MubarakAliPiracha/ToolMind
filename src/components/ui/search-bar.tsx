"use client";

import { useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onSearch?: (value: string) => void;
}

export function SearchBar({
  placeholder = "Search the index…",
  className,
  onSearch,
}: SearchBarProps): React.JSX.Element {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  const handleSubmit = (): void => {
    if (onSearch) onSearch(value);
  };

  return (
    <motion.div
      className={cn("relative w-full max-w-[560px]", className)}
      animate={focused ? { scale: 1.01 } : { scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <MagnifyingGlass
        size={16}
        weight="thin"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none"
      />
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
        className={cn(
          "w-full h-12 bg-white/[0.03] border rounded-full pl-11 pr-14 text-sm text-white/80 outline-none transition-all duration-200 placeholder:text-white/20 font-body backdrop-blur-sm",
          focused ? "border-white/30 bg-white/[0.05]" : "border-white/[0.06]"
        )}
      />
      <button
        onClick={handleSubmit}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white text-[#050505] rounded-full flex items-center justify-center hover:bg-white/80 transition-colors"
      >
        <span className="text-sm font-bold leading-none">→</span>
      </button>
    </motion.div>
  );
}
