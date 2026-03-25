import Link from "next/link";
import { Marquee } from "./marquee";
import { MagneticDock } from "./magnetic-dock";

const FOOTER_BROWSE = [
  { label: "All Tools", href: "/tools" },
  { label: "Writing", href: "/category/writing" },
  { label: "Coding", href: "/category/coding" },
  { label: "Image", href: "/category/image" },
  { label: "Video", href: "/category/video" },
  { label: "Audio", href: "/category/audio" },
] as const;

const FOOTER_EXPLORE = [
  { label: "Research", href: "/category/research" },
  { label: "Productivity", href: "/category/productivity" },
  { label: "Data", href: "/category/data" },
  { label: "Marketing", href: "/category/marketing" },
  { label: "Support", href: "/category/support" },
  { label: "Compare", href: "/compare" },
] as const;

const FOOTER_META = [
  { label: "Search Tools", href: "/tools" },
  { label: "Compare Tools", href: "/compare" },
] as const;

export function Footer(): React.JSX.Element {
  return (
    <footer className="w-full bg-[#050505] relative overflow-hidden">
      {/* ── Marquee divider ── */}
      <Marquee speed={30} />

      {/* ── Footer links ── */}
      <div className="max-w-7xl mx-auto px-8 py-16 relative">
        {/* Giant watermark */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
          <span className="watermark font-headline text-white">TOOLMIND</span>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand column + social dock */}
          <div className="space-y-5">
            <Link href="/" className="font-headline text-lg font-bold text-white uppercase tracking-tight">
              ToolMind
            </Link>
            <p className="text-xs text-white/50 leading-relaxed">
              The world&apos;s most curated AI tool directory.
              Precision-engineered for discovery.
            </p>
            <MagneticDock />
          </div>

          {/* Browse */}
          <div className="space-y-4">
            <h4 className="font-label text-[10px] uppercase tracking-[0.2em] text-white/50">
              Browse
            </h4>
            <nav className="space-y-3">
              {FOOTER_BROWSE.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="block text-sm text-white/50 hover:text-white/80 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Explore */}
          <div className="space-y-4">
            <h4 className="font-label text-[10px] uppercase tracking-[0.2em] text-white/50">
              Explore
            </h4>
            <nav className="space-y-3">
              {FOOTER_EXPLORE.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="block text-sm text-white/50 hover:text-white/80 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-label text-[10px] uppercase tracking-[0.2em] text-white/50">
              Quick Links
            </h4>
            <nav className="space-y-3">
              {FOOTER_META.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="block text-sm text-white/50 hover:text-white/80 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative z-10 pt-8 border-t border-white/[0.04] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-white/35 font-label uppercase tracking-widest">
            © 2026 ToolMind. All rights reserved.
          </p>
          <p className="text-[10px] text-white/40 font-label tracking-widest">
            Made with love by <span className="text-white/60 font-medium">MP</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
