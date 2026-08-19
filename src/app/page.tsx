"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Masthead from "@/components/Masthead";
import Manifesto from "@/components/Manifesto";
import TypeScroller from "@/components/TypeScroller";
import Features from "@/components/Features";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

/**
 * The SCROLL BEYOND scene intro leads the page: the hero content reveals
 * shortly after the scene is ready so the 3D animation is seen first but
 * nobody is ever locked out. Nav is always visible; only the hero content
 * waits. No interaction skips it — the timer (or reduced motion / scene
 * failure) reveals the content.
 */
const INTRO_MS = 2200;
/** If the scene never signals ready, reveal so the page is never stuck. */
const SAFETY_MS = 6000;

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
    <div className="relative bg-paper text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-none focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-paper"
      >
        Skip to content
      </a>

      {/* faint paper grain — print, not cinema */}
      <div
        className="grain pointer-events-none fixed inset-0 z-30 opacity-[0.04]"
        aria-hidden="true"
      />

      <Nav />
      <main id="main">
        <Hero
          introDone={introDone}
          onSceneReady={onSceneReady}
          onSceneFailed={reveal}
        />
        {/* the animation filled the page first — now the content begins */}
        <Masthead />
        <Manifesto />
        <TypeScroller />
        <Features />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
