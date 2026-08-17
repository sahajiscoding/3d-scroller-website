"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type Tone = "solid" | "outline" | "gradient";
type Align = "justify-start" | "justify-center" | "justify-end";

const WORDS: { word: string; tone: Tone; align: Align; index: string }[] = [
  { word: "GOTHAM", tone: "solid", align: "justify-start", index: "01" },
  { word: "SCROLL", tone: "outline", align: "justify-end", index: "02" },
  { word: "BEYOND", tone: "gradient", align: "justify-center", index: "03" },
  { word: "SHADOW", tone: "solid", align: "justify-start", index: "04" },
  { word: "DARK", tone: "outline", align: "justify-end", index: "05" },
];

const toneClass: Record<Tone, string> = {
  solid: "text-bone",
  outline: "text-outline",
  gradient: "text-gradient",
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
      {/* index marker */}
      <motion.span
        style={{ opacity }}
        className="absolute left-6 top-10 font-mono text-[11px] tracking-[0.3em] text-fog/80 md:left-12"
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
          {/* depth copy */}
          <span
            aria-hidden="true"
            className={`text-outline-faint absolute inset-0 block whitespace-nowrap font-display text-[clamp(3.4rem,15vw,12rem)] font-extrabold leading-[0.9] tracking-[-0.02em]`}
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
              className={`block whitespace-nowrap font-display text-[clamp(3.4rem,15vw,12rem)] font-extrabold leading-[0.9] tracking-[-0.02em] ${toneClass[tone]}`}
              aria-label={word}
            >
              {tone === "gradient"
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
      id="studio"
      ref={sectionRef}
      className="relative bg-ink pt-20 pb-36 md:pt-28 md:pb-44"
      aria-label="The type scroller"
    >
      {/* red ambient glow behind the cascade */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[70vh] w-[85vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(255,37,71,0.07)_0%,transparent_65%)]"
        aria-hidden="true"
      />

      {/* the animation comes first: the word cascade */}
      <div className="relative">
        {WORDS.map((w) => (
          <WordRow key={w.index} {...w} reduce={reduce} />
        ))}
      </div>

      {/* content follows the animation */}
      <div className="mx-auto mt-32 flex w-full max-w-[1440px] flex-col gap-6 px-6 md:mt-40 md:flex-row md:items-end md:justify-between md:px-10">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="mb-4 font-mono text-[11px] tracking-[0.35em] text-blood">
            01 / THE SCROLLER
          </p>
          <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-tight text-bone md:text-6xl">
            Words you can
            <br />
            <span className="text-gradient">feel moving.</span>
          </h2>
        </motion.div>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="max-w-sm text-base leading-relaxed text-fog"
        >
          Five words, choreographed to your scroll — each one tilting,
          scaling and drifting through space, frame by frame.
        </motion.p>
      </div>

      {/* progress rail */}
      <div
        className="fixed right-8 top-1/2 z-40 hidden h-64 w-px -translate-y-1/2 bg-line lg:block"
        aria-hidden="true"
      >
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="h-full w-full origin-top bg-gradient-to-b from-blood to-ember"
        />
      </div>
    </section>
  );
}
