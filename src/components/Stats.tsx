"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

function CountUp({
  to,
  decimals = 0,
  suffix = "",
}: {
  to: number;
  decimals?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: reduce ? 0.01 : 1.6,
      ease: reduce ? "linear" : EASE,
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref}>
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const STATS = [
  {
    value: 60,
    suffix: "",
    decimals: 0,
    label: "Frames per second",
    note: "The floor, not a feature.",
  },
  {
    value: 3.4,
    suffix: "×",
    decimals: 1,
    label: "Longer reads",
    note: "Measured after launch, not guessed.",
  },
  {
    value: 12,
    suffix: "",
    decimals: 0,
    label: "Pages shipped this year",
    note: "All hand-built. All set big.",
  },
];

export default function Stats() {
  const reduce = useReducedMotion();

  return (
    <section
      id="results"
      className="relative border-t border-ink bg-paper"
      aria-label="Proof, not promises"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-10 md:py-28">
        <div className="mb-14 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker mb-6">05 / Proof, not promises</p>
            <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] text-ink md:text-5xl">
              Numbers we can{" "}
              <em className="italic text-signal">actually stand behind.</em>
            </h2>
          </div>
          <p className="max-w-xs font-mono text-[11px] font-bold uppercase leading-relaxed tracking-[0.18em] text-fog">
            Asked every client to check. Nobody argued.
          </p>
        </div>

        <ul>
          {STATS.map((stat, i) => (
            <motion.li
              key={stat.label}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              className="grid grid-cols-1 items-baseline gap-2 border-t border-ink py-8 md:grid-cols-12 md:gap-6 md:py-10"
            >
              <div className="md:col-span-6">
                <p className="font-display text-2xl font-medium text-ink md:text-3xl">
                  {stat.label}
                </p>
                <p className="mt-1 text-sm text-fog">{stat.note}</p>
              </div>
              <p className="md:col-span-6 md:justify-self-end md:text-right">
                <span className="font-display text-[clamp(3rem,7vw,6rem)] font-semibold leading-none tracking-[-0.03em] text-ink">
                  <span className="mr-3 inline-block size-2.5 translate-y-[-0.35em] bg-signal" />
                  <CountUp
                    to={stat.value}
                    decimals={stat.decimals}
                    suffix={stat.suffix}
                  />
                </span>
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}