"use client";

export default function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-sand" aria-label="Footer">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-4xl font-semibold tracking-[-0.03em] text-ink">
              GOTHAM TYPE
              <span className="align-super font-mono text-sm font-bold text-signal">
                ®
              </span>
            </p>
            <p className="mt-5 max-w-xs text-base leading-relaxed text-fog">
              A very small studio making type that moves. One idea per page,
              set really big.
            </p>
          </div>

          <div className="md:col-span-4">
            <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-fog">
              Colophon
            </p>
            <ul className="flex flex-col gap-2 font-mono text-xs leading-relaxed tracking-wide text-ink">
              <li>Set in Fraunces &amp; Space Mono.</li>
              <li>One accent color, on purpose.</li>
              <li>No stock photos were harmed.</li>
              <li>Made on paper first, then pixels.</li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-fog">
              Find us
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="#top"
                  className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-ink transition-colors duration-150 hover:text-signal"
                >
                  <span aria-hidden="true">↥</span> Back to top
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@gothamtype.studio"
                  className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-ink transition-colors duration-150 hover:text-signal"
                >
                  hello@gothamtype.studio
                </a>
              </li>
              <li className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-fog">
                Los Angeles · 34.05°N
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-ink pt-6 md:flex-row md:items-center">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-fog">
            © MMXXVI GOTHAM TYPE — all letters reserved
          </p>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-fog">
            Set big · Move · Scroll
          </p>
        </div>
      </div>
    </footer>
  );
}