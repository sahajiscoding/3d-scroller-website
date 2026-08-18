"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

function SplitLine({ text, delay, reduce }: { text: string; delay: number; reduce: boolean }) {
  return (
    <motion.span
      initial={reduce ? false : { opacity: 0, y: "100%" }}
      whileInView={{ opacity: 1, y: "0%" }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ delay, duration: 0.85, ease: EASE }}
      className="block whitespace-nowrap overflow-hidden"
    >
      {text}
    </motion.span>
  );
}

function SlideIn({ children, delay, reduce }: { children: React.ReactNode; delay: number; reduce: boolean }) {
  return (
    <motion.span
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ delay, duration: 0.8, ease: EASE }}
      className="block"
    >
      {children}
    </motion.span>
  );
}

export default function Headline() {
  const reduce = useReducedMotion() === true;
  const ref = useRef<HTMLHeadingElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    if (reduce) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18; // degrees
    const y = (0.5 - (e.clientY - rect.top) / rect.height) * 18;
    setMouse({ x, y });
  };

  const handleMouseLeave = () => {
    if (reduce) return;
    setMouse({ x: 0, y: 0 });
  };

  return (
    <section
      className="relative flex flex-col items-center justify-center px-6 md:px-20 py-20 md:py-32 overflow-hidden"
      aria-label="Headline — Type that moves in 3D"
    >
      {/* Subtle background wash */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(255,37,71,0.08)_0%,rgba(5,5,8,0)_70%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-7xl">
        {/* Studio badge */}
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
          className="mb-7 flex items-center gap-3 font-mono text-[11px] tracking-[0.32em] text-fog md:text-xs"
        >
          <span className="inline-block size-1.5 rounded-full bg-blood shadow-[0_0_12px_rgba(255,37,71,0.9)]" />
          GOTHAM TYPE&reg; &mdash; 3D TYPE STUDIO
        </motion.p>

        {/* Main headline with 3D tilt on mouse move */}
        <motion.h1
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transformPerspective: 1200,
            transformStyle: "preserve-3d",
            rotateY: mouse.x,
            rotateX: mouse.y,
            transition: reduce ? undefined : "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="pointer-events-auto max-w-6xl font-display text-[clamp(3rem,11vw,10.5rem)] font-extrabold leading-[0.94] tracking-[-0.03em] text-bone"
          aria-label="TYPE THAT MOVES IN 3D"
        >
          <SplitLine text="TYPE THAT" delay={0.4} reduce={reduce} />
          <SlideIn delay={0.65} reduce={reduce}>
            <span className="text-gradient">MOVES IN 3D</span>
          </SlideIn>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ delay: 0.9, duration: 0.8, ease: EASE }}
          className="mt-8 max-w-xl text-base leading-relaxed text-fog md:text-lg"
        >
          Scroll-driven 3D type experiences built on Spline &mdash; cinematic
          headlines that own the night, engineered to hit 60&nbsp;fps.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ delay: 1.1, duration: 0.8, ease: EASE }}
          className="mt-12 flex flex-col items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-fog/70"
          aria-hidden="true"
        >
          <span>SCROLL TO CONTINUE</span>
          <motion.svg
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </motion.svg>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute bottom-0 inset-x-0 z-[1] h-32 bg-gradient-to-t from-ink to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}