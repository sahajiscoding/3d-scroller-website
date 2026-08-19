"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "./Buttons";

const LINKS = [
  { href: "#studio", num: "01", label: "Studio" },
  { href: "#work", num: "02", label: "Work" },
  { href: "#process", num: "03", label: "Process" },
  { href: "#talk", num: "04", label: "Talk" },
];

export default function Nav({ hidden = false }: { hidden?: boolean }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        hidden ? "pointer-events-none -translate-y-4 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div
        className={`border-b bg-paper transition-colors duration-300 ${
          scrolled ? "border-ink" : "border-line"
        }`}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-6 px-5 md:h-[4.25rem] md:px-10"
        >
          <a
            href="#top"
            className="flex shrink-0 cursor-pointer items-baseline gap-1 font-display text-lg font-semibold tracking-tight text-ink"
          >
            GOTHAM TYPE
            <span className="font-mono text-[10px] font-bold tracking-normal text-signal">
              ®
            </span>
          </a>

          <ul className="hidden flex-1 items-center justify-center gap-1 md:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex h-9 cursor-pointer items-center gap-2 px-2 text-[11px] font-bold uppercase tracking-[0.18em] text-fog transition-colors duration-150 hover:bg-signal hover:text-paper md:px-4"
                >
                  <span aria-hidden="true" className="opacity-60">
                    {link.num}
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-fog md:hidden">
            est. LA
          </div>

          <a
            href="#talk"
            className="hidden shrink-0 cursor-pointer items-center gap-2 border border-ink px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink transition-colors duration-150 hover:bg-ink hover:text-paper md:inline-flex"
          >
            Start a page
            <ArrowUpRight className="size-3.5" />
          </a>

          <div className="hidden w-[11rem] justify-end font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-fog lg:flex">
            Los Angeles · 34.05°N
          </div>
        </nav>
      </div>
    </header>
  );
}