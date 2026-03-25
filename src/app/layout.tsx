import type { Metadata } from "next";
import { Epilogue, Space_Grotesk, Geist } from "next/font/google";
import { geistSans, geistMono } from "@/lib/fonts";
import { Nav } from "@/components/ui/nav";
import { SplashScreen } from "@/components/ui/splash-screen";
import { PageGlobeBackground } from "@/components/ui/page-globe-background";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const epilogue = Epilogue({
  weight: ["200", "400", "500", "600", "700"],
  variable: "--font-epilogue",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500"],
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ToolMind — Find the right AI tool",
  description: "Search 200+ AI tools by use case, category, or task.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "dark", geistSans.variable, geistMono.variable, epilogue.variable, spaceGrotesk.variable, "font-sans", geist.variable)}
    >
      <body className="relative min-h-full flex flex-col bg-[#050505] text-[#f0f0f0]">
        <SplashScreen />
        {/* Rotating Earth globe — fixed background on all pages except home */}
        <PageGlobeBackground />
        <Nav />
        <div className="relative z-10 flex flex-col flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}
