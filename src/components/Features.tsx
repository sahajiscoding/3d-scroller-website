"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "./Buttons";

const EASE = [0.16, 1, 0.3, 1] as const;

const ROWS = [
  {
    n: "01",
    title: "Cinematic type scrolls",
    desc: "Headline-sized words choreographed to your scroll — tilt, depth, stagger and easing tuned frame by frame.",
  },
  {
    n: "02",
    title: "Real-time Spline 3D",
    desc: "Live 3D scenes embedded at 60fps. Orbit, zoom and relight the model without ever leaving the page.",
  },
  {
    n: "03",
    title: "Scroll choreography",
    desc: "Every section is scored like a film. Enter, hold and exit beats that keep people watching to the end.",
  },
  {
    n: "04",
    title: "Performance-tuned",
    desc: "Lazy-loaded 3D, GPU-friendly transforms and a hard budget of zero jank — even on phones.",
  },
];

export default function Features() {
  const reduce = useReducedMotion();

  return (
    <section
      id="work"
      className="relative border-t border-line bg-panel py-20 md:py-28"
      aria-label="What we build"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mb-4 font-mono text-[11px] tracking-[0.35em] text-volt">
              02 / WHAT WE BUILD
            </p>
            <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-tight text-bone md:text-6xl">
              Scroll work,
              <br />
              <span className="text-gradient">done right.</span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-fog">
            Four disciplines, one obsession: type that refuses to sit still.
          </p>
        </motion.div>

        <ul>
          {ROWS.map((row, i) => (
            <motion.li
              key={row.n}
              initial={reduce ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: EASE }}
              className="group relative border-t border-line last:border-b"
            >
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-volt/[0.07] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <a
                href="#contact"
                className="relative grid cursor-pointer grid-cols-12 items-baseline gap-4 px-2 py-10 md:items-center md:gap-6 md:px-4 md:py-14"
              >
                <span className="col-span-2 font-mono text-xs tracking-[0.3em] text-fog/70 md:col-span-1">
                  {row.n}
                </span>
                <h3 className="col-span-10 font-display text-2xl font-bold tracking-tight text-bone transition-transform duration-300 group-hover:translate-x-2 md:col-span-5 md:text-4xl">
                  {row.title}
                </h3>
                <p className="col-span-10 col-start-3 text-sm leading-relaxed text-fog md:col-span-5 md:col-start-7 md:text-base">
                  {row.desc}
                </p>
                <span className="col-span-1 hidden justify-self-end text-fog transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-aqua md:flex">
                  <ArrowUpRight className="size-6" />
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
