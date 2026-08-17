import type { ReactNode } from "react";

type Variant = "primary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex cursor-pointer select-none items-center justify-center gap-3 rounded-full font-semibold tracking-tight transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember";

const sizes: Record<Size, string> = {
  sm: "h-11 px-5 text-sm",
  md: "h-14 px-8 text-base",
  lg: "h-16 px-10 text-lg",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-blood to-ember text-ink shadow-[0_10px_44px_-10px_rgba(255,37,71,0.6)] hover:shadow-[0_14px_60px_-10px_rgba(255,138,61,0.7)] hover:brightness-110 active:scale-[0.98]",
  ghost:
    "border border-line bg-white/[0.03] text-bone backdrop-blur-sm hover:border-blood/70 hover:bg-blood/10 hover:text-ember active:scale-[0.98]",
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
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className} transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function PlayIcon({ className = "size-4 fill-current" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M8.4 5.45a1 1 0 0 1 1.53-.85l10.1 6.55a1 1 0 0 1 0 1.7L9.93 19.4a1 1 0 0 1-1.53-.85V5.45Z" />
    </svg>
  );
}
