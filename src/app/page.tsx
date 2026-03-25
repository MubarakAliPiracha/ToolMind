import { Footer } from "@/components/ui/footer";
import { HeroSection } from "@/components/ui/hero-section";
import { Marquee } from "@/components/ui/marquee";
import { HeroFuturisticSection } from "@/components/ui/hero-futuristic-wrapper";
import { BentoSectionWrapper } from "@/components/ui/bento-section-wrapper";

export default function HomePage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-transparent">
      <main className="flex-grow flex flex-col">
        {/* ── Hero: spotlight + Spline 3D + search + pills ── */}
        <HeroSection />

        {/* ── Scrolling marquee ── */}
        <Marquee />

        {/* ── 3D Futuristic depth-map animation ── */}
        <HeroFuturisticSection />

        {/* ── Animated bento "Curated Collections" ── */}
        <BentoSectionWrapper />
      </main>

      <Footer />
    </div>
  );
}
