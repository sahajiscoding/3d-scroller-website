"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type Tone = "solid" | "outline" | "signal";
type Align = "justify-start" | "justify-center" | "justify-end";

const WORDS: { word: string; tone: Tone; align: Align; index: string }[] = [
  { word: "SET", tone: "solid", align: "justify-start", index: "01" },
  { word: "BIG", tone: "outline", align: "justify-end", index: "02" },
  { word: "MOVE", tone: "signal", align: "justify-center", index: "03" },
  { word: "SCROLL", tone: "solid", align: "justify-start", index: "04" },
  { word: "TYPE", tone: "outline", align: "justify-end", index: "05" },
];

const toneClass: Record<Tone, string> = {
  solid: "text-ink",
  outline: "text-outline",
  signal: "text-signal",
};

function WordRow({
  word,
  tone,
  align,
  index,
  reduce,
}: {
  word: string;
  tone: Tone;
  align: Align;
  index: string;
  reduce: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduce ? [0, 0, 0] : [58, 0, -58],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduce ? [1, 1, 1] : [0.78, 1, 0.78],
  );
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduce ? [0, 0, 0] : [220, 0, -220],
  );

  const letterWave = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.045, delayChildren: 0.2 } },
  };
  const letter = {
    hidden: { y: "118%", rotate: 9 },
    visible: {
      y: "0%",
      rotate: 0,
      transition: { duration: 0.85, ease: EASE },
    },
  };

  return (
    <div
      ref={ref}
      className="relative flex h-[52vh] items-center justify-center"
    >
      <motion.span
        style={{ opacity }}
        className="absolute left-6 top-10 font-mono text-[11px] font-bold tracking-[0.3em] text-fog md:left-12"
        aria-hidden="true"
      >
        {index}
      </motion.span>

      <div className={`flex w-full ${align}`}>
        <motion.div
          style={{
            rotateX,
            scale,
            opacity,
            y,
            transformPerspective: 1000,
            transformStyle: "preserve-3d",
          }}
          className="px-4 md:px-12"
        >
          <span
            aria-hidden="true"
            className="text-outline-faint absolute inset-0 block whitespace-nowrap font-display text-[clamp(3.4rem,15vw,12rem)] font-semibold leading-[0.9] tracking-[-0.02em]"
            style={{ transform: "translateZ(-130px)", opacity: 0.7 }}
          >
            {word}
          </span>

          <span className="block overflow-hidden pb-[0.04em]">
            <motion.span
              variants={letterWave}
              initial={reduce ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
              className={`block whitespace-nowrap font-display text-[clamp(3.4rem,15vw,12rem)] font-semibold leading-[0.9] tracking-[-0.02em] ${toneClass[tone]}`}
              aria-label={word}
            >
              {tone === "signal"
                ? word
                : word.split("").map((ch, i) => (
                    <motion.span
                      key={i}
                      variants={letter}
                      aria-hidden="true"
                      className="inline-block"
                    >
                      {ch}
                    </motion.span>
                  ))}
            </motion.span>
          </span>
        </motion.div>
      </div>
    </div>
  );
}

export default function TypeScroller() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() === true;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative bg-paper pt-20 pb-36 md:pt-28 md:pb-44"
      aria-label="The scroller — our signature piece"
    >
      {/* section header */}
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="kicker mb-6">03 / The scroller</p>
            <h2 className="font-display text-4xl font-semibold leading-[0.98] tracking-[-0.03em] text-ink md:text-6xl">
              Five words.
              <br />
              <em className="italic text-signal">One scroll.</em>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-fog md:col-span-4 md:col-start-9">
            Each word is a scene. Tilt, depth, stagger and easing are tuned
            frame by frame to the scroll — not dropped in and left alone.
          </p>
        </div>
      </div>

      {/* the words */}
      <div className="relative mt-10">
        {WORDS.map((w) => (
          <WordRow key={w.index} {...w} reduce={reduce} />
        ))}
      </div>

      {/* margin tip, framed like a printer's note */}
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10">
        <div className="relative ml-0 max-w-md border border-ink px-5 py-4 md:ml-[12.5%]">
          <span className="absolute -left-2.5 -top-2.5 size-2.5 bg-signal" />
          <p className="font-mono text-[11px] font-bold uppercase leading-relaxed tracking-[0.18em] text-fog">
            Marg. note — scroll this plate slowly. The words unfold like a
            filmstrip, one axis at a time.
          </p>
        </div>
      </div>

      {/* progress rail */}
      <div
        className="fixed right-6 top-1/2 z-40 hidden h-56 w-0.5 -translate-y-1/2 bg-line lg:block"
        aria-hidden="true"
      >
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="h-full w-full origin-top bg-signal"
        />
      </div>
    </section>
  );
}