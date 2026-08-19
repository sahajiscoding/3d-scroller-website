"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const META = ["Scroll-driven", "60 fps", "No plugins", "2 people"];

const SPECS = [
  ["Scene", "GOTHAM TYPE®"],
  ["Engine", "Spline runtime"],
  ["Frame", "60 fps"],
  ["Input", "Orbit + scroll"],
];

export default function Masthead() {
  const reduce = useReducedMotion() === true;

  return (
    <section
      id="masthead"
      className="relative scroll-mt-20 border-t border-ink bg-paper"
      aria-label="GOTHAM TYPE — scroll-driven 3D type"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 md:px-10 md:py-36">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="kicker mb-8">01 / After the plate</p>
            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="font-display text-[clamp(3.4rem,10vw,8.75rem)] font-semibold leading-[0.92] tracking-[-0.035em] text-ink"
            >
              Words sit.
              <br />
              <em className="font-medium italic text-signal">Ours scroll.</em>
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
              className="mt-9 max-w-md text-[17px] leading-relaxed text-ink md:text-lg"
            >
              The full-screen scene you just scrolled past is the product —
              live, not pre-rendered. We do this for words that matter.
            </motion.p>
          </div>

          <div className="flex flex-col justify-end lg:col-span-4">
            <motion.ul
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="flex flex-col gap-4"
            >
              {META.map((item, i) => (
                <li
                  key={item}
                  className="flex items-baseline gap-4 border-t border-ink pt-3"
                >
                  <span className="font-mono text-xs font-bold text-signal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] font-medium tracking-tight text-ink">
                    {item}
                  </span>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>

        {/* spec sheet — the invisible expensive stuff, printed */}
        <div className="mt-20 grid grid-cols-1 border border-ink sm:grid-cols-2 lg:grid-cols-4">
          {SPECS.map(([label, value], i) => (
            <div
              key={label}
              className={`flex flex-col gap-1 px-5 py-4 ${
                i > 0 ? "border-t border-ink sm:border-t-0 sm:border-l" : ""
              }`}
            >
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-fog">
                {label}
              </span>
              <span className="font-display text-lg font-medium text-ink">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}