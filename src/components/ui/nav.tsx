"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
const NAV_LINKS = [
  { href: "/tools", label: "DIRECTORY" },
  { href: "/compare", label: "COMPARE" },
] as const;

export function Nav(): React.JSX.Element {
  const pathname = usePathname();

  const isActive = (href: string): boolean =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <motion.nav
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-8 px-6 py-3 bg-black/60 backdrop-blur-xl border border-white/[0.06] rounded-full">
        {/* Logo */}
        <Link
          href="/"
          className="text-[14px] font-bold text-white tracking-tight font-headline shrink-0 uppercase"
        >
          ToolMind
        </Link>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[11px] tracking-[0.15em] transition-colors duration-150 font-label uppercase",
                isActive(link.href)
                  ? "text-white font-medium"
                  : "text-white/40 hover:text-white/80"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

      </div>
    </motion.nav>
  );
}
