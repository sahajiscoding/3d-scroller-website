"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TypeScroller from "@/components/TypeScroller";
import Features from "@/components/Features";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

/**
 * The SCROLL BEYOND scene intro must play in full before the hero content
 * reveals. No interaction skips it — only the timer below (or reduced
 * motion / scene failure) reveals the content.
 */
const INTRO_MS = 4000;
/** If the scene never signals ready, reveal so the page is never stuck. */
const SAFETY_MS = 8000;

export default function Home() {
  const [introDone, setIntroDone] = useState(false);
  const revealed = useRef(false);
  const sceneReady = useRef(false);
  const introTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduce = useReducedMotion() === true;

  const reveal = useCallback(() => {
    if (revealed.current) return;
    revealed.current = true;
    if (introTimer.current) {
      clearTimeout(introTimer.current);
      introTimer.current = null;
    }
    setIntroDone(true);
  }, []);

  // scene finished loading -> let its intro animation play, then reveal
  const onSceneReady = useCallback(() => {
    sceneReady.current = true;
    introTimer.current = setTimeout(reveal, INTRO_MS);
  }, [reveal]);

  // reduced motion reveals immediately; otherwise the only fallback is the
  // safety timer, which fires solely if the scene never signaled ready
  useEffect(() => {
    if (reduce) {
      reveal();
      return;
    }
    const safety = setTimeout(() => {
      if (!sceneReady.current) reveal();
    }, SAFETY_MS);
    return () => {
      clearTimeout(safety);
      if (introTimer.current) clearTimeout(introTimer.current);
    };
  }, [reduce, reveal]);

  return (
    <div className="relative bg-ink text-bone">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-bone focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>

      {/* cinematic film grain over everything */}
      <div
        className="grain pointer-events-none fixed inset-0 z-30 opacity-[0.05] mix-blend-overlay"
        aria-hidden="true"
      />

      <Nav hidden={!introDone} />
      <main id="main">
        <Hero
          introDone={introDone}
          onSceneReady={onSceneReady}
          onSceneFailed={reveal}
        />
        <TypeScroller />
        <Features />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
