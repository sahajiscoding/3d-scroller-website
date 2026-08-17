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
      duration: reduce ? 0.01 : 1.8,
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
  { value: 120, suffix: "+", decimals: 0, label: "Nights lit" },
  { value: 60, suffix: "", decimals: 0, label: "FPS, real-time 3D" },
  { value: 3.4, suffix: "×", decimals: 1, label: "Avg. engagement lift" },
];

export default function Stats() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative border-t border-line bg-ink py-16 md:py-20"
      aria-label="Results"
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 px-6 sm:grid-cols-3 md:gap-6 md:px-10">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
            className="flex flex-col gap-3"
          >
            <span className="font-display text-5xl font-extrabold tracking-tight text-bone md:text-7xl">
              <span className="text-gradient">
                <CountUp
                  to={stat.value}
                  decimals={stat.decimals}
                  suffix={stat.suffix}
                />
              </span>
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
