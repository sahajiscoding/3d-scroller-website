import type { ReactNode } from "react";

type Variant = "primary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex cursor-pointer select-none items-center justify-center gap-3 rounded-none font-semibold tracking-tight transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal active:translate-x-0.5 active:translate-y-0.5";

const sizes: Record<Size, string> = {
  sm: "h-11 px-5 text-sm",
  md: "h-14 px-8 text-base",
  lg: "h-16 px-10 text-lg",
};

const variants: Record<Variant, string> = {
  primary:
    "border border-ink bg-ink text-paper shadow-[4px_4px_0_0_var(--color-signal)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-signal)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
  ghost:
    "border border-ink bg-paper text-ink hover:bg-ink hover:text-paper",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className = "",
  ariaLabel,
}: {
  variant?: Variant;
  size?: Size;
  href?: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  if (href) {
    return (
      <a href={href} className={cls} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

export function ArrowUpRight({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={`${className} transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}