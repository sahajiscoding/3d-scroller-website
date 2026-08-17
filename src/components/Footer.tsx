"use client";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink" aria-label="Footer">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-14 md:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <p className="font-display text-xl font-bold tracking-tight text-bone">
              GOTHAM TYPE<span className="text-blood">®</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-fog">
              3D type studio for the night. We turn headlines into experiences people feel.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-10 sm:grid-cols-3" aria-label="Footer">
            <div>
              <p className="mb-4 font-mono text-[10px] tracking-[0.3em] text-fog/60">
                STUDIO
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  ["Studio", "#studio"],
                  ["Work", "#work"],
                  ["Contact", "#contact"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="cursor-pointer text-sm text-fog transition-colors duration-200 hover:text-bone"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 font-mono text-[10px] tracking-[0.3em] text-fog/60">
                SOCIAL
              </p>
              <ul className="flex flex-col gap-3">
                {["Instagram", "X / Twitter", "Dribbble"].map((label) => (
                  <li key={label}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="cursor-pointer text-sm text-fog transition-colors duration-200 hover:text-bone"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 font-mono text-[10px] tracking-[0.3em] text-fog/60">
                CONTACT
              </p>
              <ul className="flex flex-col gap-3">
                <li>
                  <a
                    href="mailto:hello@gothamtype.studio"
                    className="cursor-pointer text-sm text-fog transition-colors duration-200 hover:text-bone"
                  >
                    hello@gothamtype.studio
                  </a>
                </li>
                <li className="text-sm text-fog">Los Angeles, CA</li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 md:flex-row md:items-center">
          <p className="font-mono text-[10px] tracking-[0.25em] text-fog/60">
            © 2026 GOTHAM TYPE STUDIO — ALL RIGHTS RESERVED
          </p>
          <a
            href="#"
            className="cursor-pointer font-mono text-[10px] tracking-[0.25em] text-fog transition-colors duration-200 hover:text-blood"
          >
            BACK TO TOP ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
