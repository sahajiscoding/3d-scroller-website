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
}: {
  text: string;
  className?: string;
  delay?: number;
  reduce: boolean;
}) {
  return (
    <span className={`block overflow-hidden pb-[0.06em] ${className}`} aria-hidden="true">
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={reduce ? false : { y: "118%", rotate: 7 }}
          animate={{ y: "0%", rotate: 0 }}
          transition={{ delay: delay + i * 0.035, duration: 0.9, ease: EASE }}
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
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  reduce: boolean;
}) {
  return (
    <span className={`block overflow-hidden pb-[0.08em] ${className}`} aria-hidden="true">
      <motion.span
        className="block"
        initial={reduce ? false : { y: "118%" }}
        animate={{ y: "0%" }}
        transition={{ delay, duration: 1, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() === true;

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
      {/* 3D scene */}
      <SplineScene />

      {/* legibility washes */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_90%_70%_at_50%_45%,rgba(5,5,8,0.35)_0%,rgba(5,5,8,0.62)_72%,rgba(5,5,8,0.88)_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-40 bg-gradient-to-b from-ink to-transparent"
        aria-hidden="true"
      />

      {/* center content */}
      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-6 pb-28 pt-32 md:px-10">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
          className="mb-7 flex items-center gap-3 font-mono text-[11px] tracking-[0.32em] text-fog md:text-xs"
        >
          <span className="inline-block size-1.5 rounded-full bg-aqua shadow-[0_0_12px_rgba(70,227,255,0.9)]" />
          TYPEDRIFT® — 3D TYPE STUDIO
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
          <SplitLine text="TYPE THAT" delay={0.45} reduce={reduce} />
          <SlideIn delay={0.75} reduce={reduce}>
            <span className="text-gradient">MOVES IN 3D</span>
          </SlideIn>
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.8, ease: EASE }}
          className="mt-8 max-w-xl text-base leading-relaxed text-fog md:text-lg"
        >
          Scroll-driven type experiences built on Spline — cinematic 3D
          headlines, choreographed word by word, engineered to hit 60&nbsp;fps.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: EASE }}
          className="pointer-events-auto mt-10 flex flex-wrap items-center gap-4"
        >
          <Button href="#studio" size="md">
            Enter the experience
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
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute left-7 top-1/2 z-10 hidden -translate-y-1/2 font-mono text-[10px] tracking-[0.4em] text-fog/70 [writing-mode:vertical-rl] xl:block"
        aria-hidden="true"
      >
        SCROLL TO EXPLORE
      </motion.p>
      <motion.p
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute right-7 top-1/2 z-10 hidden -translate-y-1/2 font-mono text-[10px] tracking-[0.4em] text-fog/70 [writing-mode:vertical-rl] xl:block"
        aria-hidden="true"
      >
        EST. 2026 — LOS ANGELES
      </motion.p>

      {/* scroll cue */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="pointer-events-none absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] tracking-[0.4em] text-fog">SCROLL</span>
        <span className="relative block h-12 w-px overflow-hidden bg-line">
          <span className="animate-scroll-line absolute inset-x-0 h-full bg-gradient-to-b from-transparent via-aqua to-transparent" />
        </span>
      </motion.div>
    </section>
  );
}
