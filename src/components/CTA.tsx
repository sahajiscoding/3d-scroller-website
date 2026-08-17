"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Button } from "./Buttons";

const EASE = [0.16, 1, 0.3, 1] as const;

const MARQUEE_WORDS = [
  "TYPE",
  "SCROLL",
  "DRIFT",
  "VELOCITY",
  "MOTION",
  "TYPE",
  "SCROLL",
  "DRIFT",
  "VELOCITY",
  "MOTION",
];

export default function CTA() {
  const reduce = useReducedMotion();

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-line bg-ink"
      aria-label="Start a project"
    >
      {/* marquee band */}
      <div className="overflow-hidden border-b border-line py-5 md:py-7" aria-hidden="true">
        <div className="animate-marquee flex w-max">
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0">
              {MARQUEE_WORDS.map((word, i) => (
                <span
                  key={`${half}-${i}`}
                  className={`pr-10 font-display text-2xl font-bold tracking-tight md:pr-14 md:text-4xl ${
                    i % 2 === 0 ? "text-bone" : "text-outline"
                  }`}
                >
                  {word}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-6 py-24 text-center md:py-36 md:px-10">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-6 font-mono text-[11px] tracking-[0.35em] text-volt"
        >
          03 / LET&apos;S TALK
        </motion.p>

        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="font-display text-[clamp(2.8rem,9vw,8.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-bone"
        >
          READY TO <span className="text-gradient">DRIFT?</span>
        </motion.h2>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="mt-7 max-w-xl text-base leading-relaxed text-fog md:text-lg"
        >
          Tell us where your type should go. We ship scroll experiences that
          make people stop — and stay.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <Button href="mailto:hello@typedrift.studio" size="lg">
            Start a project
            <ArrowUpRight className="size-5" />
          </Button>
          <Button
            href="mailto:hello@typedrift.studio"
            variant="ghost"
            size="lg"
          >
            hello@typedrift.studio
          </Button>
        </motion.div>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-10 font-mono text-[11px] tracking-[0.25em] text-fog/70"
        >
          AVG. 3-WEEK DELIVERY — MOTION-FIRST PRICING — WORLDWIDE
        </motion.p>
      </div>
    </section>
  );
}
