import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TypeScroller from "@/components/TypeScroller";
import Features from "@/components/Features";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative bg-ink text-bone">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-bone focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <TypeScroller />
        <Features />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
