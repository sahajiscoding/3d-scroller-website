"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Button } from "./Buttons";

const LINKS = [
  { href: "#studio", label: "Studio" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-ink/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-6 md:h-20 md:px-10"
      >
        <a
          href="#"
          className="cursor-pointer font-display text-lg font-bold tracking-tight text-bone"
        >
          TYPEDRIFT<span className="text-volt">®</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="inline-flex h-12 cursor-pointer items-center rounded-full px-5 text-sm font-medium text-fog transition-colors duration-200 hover:text-bone"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <Button href="#contact" size="sm">
          Start a project
          <ArrowUpRight className="size-4" />
        </Button>
      </nav>
    </header>
  );
}
