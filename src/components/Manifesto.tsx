"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const RULES = [
  "One thing per page",
  "Set it big",
  "Make it move",
];

export default function Manifesto() {
  const reduce = useReducedMotion() === true;

  return (
    <section
      id="studio"
      className="relative overflow-hidden border-t border-ink bg-paper"
      aria-label="The manifesto"
    >
      {/* ghost word, half-printed, bleeding off the right edge */}
      <span
        aria-hidden="true"
        className="text-outline-faint pointer-events-none absolute -right-8 top-6 select-none whitespace-nowrap font-display text-[26vw] font-semibold leading-none tracking-[-0.03em] lg:top-0"
      >
        POSTER
      </span>

      <div className="relative mx-auto w-full max-w-[1440px] px-6 py-24 md:px-10 md:py-36">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="kicker mb-8">02 / The manifesto</p>
            <motion.h2
              initial={reduce ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="max-w-3xl font-display text-[clamp(2.2rem,5.5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink"
            >
              Most websites are furniture. Ours are posters —{" "}
              <em className="italic text-signal">made to be looked at</em>, then
              scrolled through, slowly.
            </motion.h2>
          </div>

          <div className="lg:col-span-4 lg:pt-40">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              className="text-base leading-relaxed text-fog"
            >
              No account managers. No decks. You talk to the person setting the
              type. Every page ships under three rules:
            </motion.p>

            <ul className="mt-8 border-t border-ink">
              {RULES.map((rule, i) => (
                <motion.li
                  key={rule}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease: EASE }}
                  className="flex items-baseline gap-4 border-b border-ink py-4"
                >
                  <span className="font-mono text-xs font-bold text-signal">
                    ({i + 1})
                  </span>
                  <span className="font-display text-xl font-medium italic text-ink">
                    {rule}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}