"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const ROWS = [
  {
    n: "01",
    title: "Scroll choreography",
    desc: "What arrives first, what waits, what lands last. We map your message onto the scroll like a storyboard — the page earns the reader's time.",
    spec: "STORYBOARD FIRST",
  },
  {
    n: "02",
    title: "3D set design",
    desc: "Real 3D scenes, embedded live on the page. Drag, orbit, zoom. No prerendered stills pretending to be motion.",
    spec: "SPLINE · 60 FPS",
  },
  {
    n: "03",
    title: "Motion grading",
    desc: "Entrances, holds and exits are timed like cuts in a film. Calm in, impact out. Nothing fades in and floats mid-air.",
    spec: "EASE [0.16,1,0.3,1]",
  },
  {
    n: "04",
    title: "Performance lockdown",
    desc: "Lazy-loaded scenes, GPU-friendly transforms, and a bug list that treats 30 frames a second as a defect.",
    spec: "HARD BUDGET · 0 JANK",
  },
];

export default function Features() {
  const reduce = useReducedMotion();

  return (
    <section
      id="process"
      className="relative border-t border-ink bg-sand"
      aria-label="How we work"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
        <div className="mb-16 grid grid-cols-1 gap-6 md:mb-20 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="kicker mb-6">04 / How we work</p>
            <h2 className="font-display text-4xl font-semibold leading-[0.98] tracking-[-0.03em] text-ink md:text-6xl">
              We treat your first scroll like a{" "}
              <em className="italic text-signal">first take.</em>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-fog md:col-span-4 md:col-start-9">
            Four disciplines. One obsession: words that move on purpose.
          </p>
        </div>

        <ul>
          {ROWS.map((row, i) => (
            <motion.li
              key={row.n}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: EASE }}
              className="group border-t border-ink last:border-b"
            >
              <div className="grid grid-cols-12 items-baseline gap-x-4 gap-y-2 px-1 py-8 transition-colors duration-200 group-hover:bg-paper md:items-center md:px-4 md:py-10">
                <span className="col-span-2 font-mono text-xs font-bold tracking-[0.25em] text-signal md:col-span-1">
                  {row.n}
                </span>
                <h3 className="col-span-10 font-display text-2xl font-medium tracking-[-0.02em] text-ink md:col-span-4 md:text-3xl">
                  {row.title}
                </h3>
                <p className="col-span-10 col-start-3 mt-1 text-sm leading-relaxed text-fog md:col-span-5 md:col-start-6 md:mt-0 md:text-[15px]">
                  {row.desc}
                </p>
                <span className="col-span-10 col-start-3 mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-fog md:col-span-2 md:col-start-11 md:mt-0 md:justify-self-end md:text-[10px]">
                  {row.spec}
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}