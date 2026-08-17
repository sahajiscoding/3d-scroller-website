"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import SplineScene from "./SplineScene";
import { ArrowUpRight, Button, PlayIcon } from "./Buttons";

const EASE = [0.16, 1, 0.3, 1] as const;

function SplitLine({
  text,
  className = "",
  delay = 0,
  reduce,
  show,
}: {
  text: string;
  className?: string;
  delay?: number;
  reduce: boolean;
  show: boolean;
}) {
  return (
    <span className={`block overflow-hidden pb-[0.06em] ${className}`} aria-hidden="true">
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={reduce ? false : { y: "118%", rotate: 7 }}
          animate={show ? { y: "0%", rotate: 0 } : { y: "118%", rotate: 7 }}
          transition={{ delay: show ? delay + i * 0.035 : 0, duration: 0.9, ease: EASE }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

function SlideIn({
  children,
  delay = 0,
  className = "",
  reduce,
  show,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  reduce: boolean;
  show: boolean;
}) {
  return (
    <span className={`block overflow-hidden pb-[0.08em] ${className}`} aria-hidden="true">
      <motion.span
        className="block"
        initial={reduce ? false : { y: "118%" }}
        animate={show ? { y: "0%" } : { y: "118%" }}
        transition={{ delay: show ? delay : 0, duration: 1, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero({
  introDone,
  onSceneReady,
  onSceneFailed,
}: {
  introDone: boolean;
  onSceneReady: () => void;
  onSceneFailed: () => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() === true;
  // under reduced motion the content shows immediately, no gate
  const show = introDone || reduce;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), {
    stiffness: 110,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), {
    stiffness: 110,
    damping: 20,
  });

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduce || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative flex min-h-screen flex-col overflow-hidden"
      aria-label="Hero — Type that moves in 3D"
    >
      {/* 3D scene — plays unobstructed during the intro */}
      <SplineScene onReady={onSceneReady} onFailed={onSceneFailed} />

      {/* legibility washes */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_90%_70%_at_50%_45%,rgba(5,5,8,0.35)_0%,rgba(5,5,8,0.62)_72%,rgba(5,5,8,0.88)_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-40 bg-gradient-to-b from-ink to-transparent"
        aria-hidden="true"
      />

      {/* bat-signal beam */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] flex justify-center"
        aria-hidden="true"
      >
        <div
          className="h-[72vh] w-[46vw] min-w-[420px] max-w-[760px] opacity-[0.16]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,37,71,0.9) 0%, rgba(255,37,71,0.16) 55%, transparent 100%)",
            clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
            filter: "blur(16px)",
          }}
        />
      </div>
      <div
        className="pointer-events-none absolute left-1/2 top-[57%] z-[1] h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,37,71,0.22)_0%,rgba(255,37,71,0.06)_45%,transparent_70%)] blur-md"
        aria-hidden="true"
      />

      {/* center content */}
      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-6 pb-28 pt-32 md:px-10">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ delay: show ? 0.2 : 0, duration: 0.7, ease: EASE }}
          className="mb-7 flex items-center gap-3 font-mono text-[11px] tracking-[0.32em] text-fog md:text-xs"
        >
          <span className="inline-block size-1.5 rounded-full bg-blood shadow-[0_0_12px_rgba(255,37,71,0.9)]" />
          GOTHAM TYPE® — 3D TYPE STUDIO
        </motion.p>

        <motion.h1
          style={
            reduce
              ? undefined
              : {
                  rotateX,
                  rotateY,
                  transformPerspective: 1200,
                  transformStyle: "preserve-3d",
                }
          }
          className="pointer-events-auto max-w-6xl font-display text-[clamp(3rem,11vw,10.5rem)] font-extrabold leading-[0.94] tracking-[-0.03em] text-bone"
          aria-label="TYPE THAT MOVES IN 3D"
        >
          <SplitLine text="TYPE THAT" delay={0.45} reduce={reduce} show={show} />
          <SlideIn delay={0.75} reduce={reduce} show={show}>
            <span className="text-gradient">MOVES IN 3D</span>
          </SlideIn>
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ delay: show ? 1.05 : 0, duration: 0.8, ease: EASE }}
          className="mt-8 max-w-xl text-base leading-relaxed text-fog md:text-lg"
        >
          Scroll-driven 3D type experiences built on Spline — cinematic
          headlines that own the night, engineered to hit 60&nbsp;fps.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ delay: show ? 1.2 : 0, duration: 0.8, ease: EASE }}
          className={`mt-10 flex flex-wrap items-center gap-4 ${
            show ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <Button href="#studio" size="md">
            Light the signal
            <ArrowUpRight />
          </Button>
          <Button href="#work" variant="ghost" size="md">
            <PlayIcon />
            Watch showreel
          </Button>
        </motion.div>
      </div>

      {/* side rails */}
      <motion.p
        initial={reduce ? false : { opacity: 0 }}
        animate={show ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: show ? 1.6 : 0, duration: 0.8 }}
        className="absolute left-7 top-1/2 z-10 hidden -translate-y-1/2 font-mono text-[10px] tracking-[0.4em] text-fog/70 [writing-mode:vertical-rl] xl:block"
        aria-hidden="true"
      >
        SCROLL TO EXPLORE
      </motion.p>
      <motion.p
        initial={reduce ? false : { opacity: 0 }}
        animate={show ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: show ? 1.6 : 0, duration: 0.8 }}
        className="absolute right-7 top-1/2 z-10 hidden -translate-y-1/2 font-mono text-[10px] tracking-[0.4em] text-fog/70 [writing-mode:vertical-rl] xl:block"
        aria-hidden="true"
      >
        EST. 2026 — GOTHAM CITY
      </motion.p>

      {/* scroll cue */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={show ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: show ? 1.5 : 0, duration: 0.8 }}
        className="pointer-events-none absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] tracking-[0.4em] text-fog">SCROLL</span>
        <span className="relative block h-12 w-px overflow-hidden bg-line">
          <span className="animate-scroll-line absolute inset-x-0 h-full bg-gradient-to-b from-transparent via-ember to-transparent" />
        </span>
      </motion.div>
    </section>
  );
}
