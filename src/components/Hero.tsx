"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import SplineScene from "./SplineScene";

export default function Hero({
  introDone,
  onSceneReady,
  onSceneFailed,
}: {
  introDone: boolean;
  onSceneReady: () => void;
  onSceneFailed: () => void;
}) {
  const reduce = useReducedMotion() === true;
  const sectionRef = useRef<HTMLElement>(null);

  // A short pin (~one screen of extra scroll): the scene stays full-screen
  // and scrolls the camera back as you pass, then hands straight off to the
  // content. No text overlay — the 3D animation is the page.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const hintOpacity = useTransform(
    scrollYProgress,
    [0, 0.55],
    reduce ? [1, 1] : [1, 0],
  );

  const settled = introDone || reduce;

  return (
    <section
      id="top"
      ref={sectionRef}
      className={`relative bg-ink ${reduce ? "h-svh" : "h-[160vh]"}`}
      aria-label="GOTHAM TYPE — live 3D scroll animation"
    >
      {/* sticky stage — the scene owns the whole page */}
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* the live 3D scroller animation, full screen, no text over it */}
        <div className="absolute inset-0 z-0">
          <SplineScene
            progress={scrollYProgress}
            onReady={onSceneReady}
            onFailed={onSceneFailed}
          />
        </div>

        {/* soft legibility washes for the tiny chrome only */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-24 bg-gradient-to-b from-ink/60 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-28 bg-gradient-to-t from-ink/60 to-transparent"
          aria-hidden="true"
        />

        {/* small mono tag — the only chrome */}
        <p className="absolute left-5 top-24 z-10 flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-paper/80 md:left-10">
          <span aria-hidden="true" className="size-1.5 bg-signal" />
          Fig.00 — live · full screen
        </p>

        {/* bottom hint — hands off to the content */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-4 px-6"
        >
          <p
            className={`text-center font-mono text-[10px] font-bold uppercase leading-relaxed tracking-[0.3em] text-paper/80 transition-opacity duration-700 md:text-[11px] ${
              settled ? "opacity-100" : "opacity-0"
            }`}
          >
            The scene moves with you — keep scrolling
          </p>
          <a
            href="#masthead"
            aria-label="Scroll to content"
            className={`group flex items-center justify-center transition-opacity duration-500 ${
              settled ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <span className="flex size-12 items-center justify-center border-2 border-paper transition-colors duration-200 group-hover:border-signal group-focus-visible:border-signal">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="square"
                className="size-5 text-paper transition-colors duration-200 group-hover:text-signal"
                aria-hidden="true"
              >
                <path d="M12 4v16" />
                <path d="M19 13l-7 7-7-7" />
              </svg>
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}