"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Button } from "./Buttons";

const EASE = [0.16, 1, 0.3, 1] as const;

const TICKER = [
  "Scroll",
  "Set big",
  "Move",
  "60 fps",
  "No interstitials",
  "Type",
  "Orbit",
  "No templates",
];

export default function CTA() {
  const reduce = useReducedMotion();

  return (
    <section
      id="talk"
      className="relative overflow-hidden border-t border-ink bg-paper"
      aria-label="Start a page"
    >
      {/* stock-tape ticker */}
      <div
        className="overflow-hidden border-b border-ink py-3 md:py-4"
        aria-hidden="true"
      >
        <div className="animate-marquee flex w-max">
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0">
              {TICKER.map((word, i) => (
                <span
                  key={`${half}-${i}`}
                  className="flex items-center gap-6 pr-6 font-mono text-sm font-bold uppercase tracking-[0.22em] md:text-base"
                >
                  <span className={i % 2 === 0 ? "text-ink" : "text-outline"}>
                    {word}
                  </span>
                  <span className="size-2 bg-signal" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 md:px-10 md:py-36">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="kicker mb-8">06 / Talk</p>
            <h2 className="font-display text-[clamp(2.8rem,8vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.035em] text-ink">
              Have a word
              <br />
              for <em className="italic text-signal">your page?</em>
            </h2>
          </div>

          <div className="flex flex-col justify-end gap-8 lg:col-span-4">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="text-base leading-relaxed text-fog"
            >
              Tell us which word matters most. We&apos;ll send scroll-shapes for
              your headline within a week — free, and without an account
              manager in sight.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              className="flex flex-wrap items-center gap-4"
            >
              <Button href="mailto:hello@gothamtype.studio" size="lg">
                hello@gothamtype.studio
                <ArrowUpRight className="size-5" />
              </Button>
              <Button
                href="mailto:hello@gothamtype.studio?subject=Read%20the%20rate%20card"
                variant="ghost"
                size="lg"
              >
                Read the rate card
              </Button>
            </motion.div>

            <motion.p
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="border-t border-ink pt-5 font-mono text-[11px] font-bold uppercase leading-relaxed tracking-[0.18em] text-fog"
            >
              No decks. No &quot;synergy&quot;. No NDA unless you really want one.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}