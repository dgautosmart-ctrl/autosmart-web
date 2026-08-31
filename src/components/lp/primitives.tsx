import type { ReactNode } from "react";

/** Consistent section shell. `flush` removes the default vertical padding. */
export function Section({
  id,
  children,
  className = "",
  flush = false,
  as: Tag = "section",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  flush?: boolean;
  as?: "section" | "div";
}) {
  return (
    <Tag
      id={id}
      className={`relative isolate ${flush ? "" : "py-16 sm:py-20 lg:py-24"} ${className}`}
    >
      {children}
    </Tag>
  );
}

export function Container({
  children,
  className = "",
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "narrow" | "default" | "wide";
}) {
  const max =
    size === "narrow" ? "max-w-3xl" : size === "wide" ? "max-w-7xl" : "max-w-5xl";
  return <div className={`mx-auto w-full px-4 sm:px-8 ${max} ${className}`}>{children}</div>;
}

/**
 * Purely decorative section marker — a short glowing rule with a lit dot.
 * No text: the brief forbids adding copy that wasn't supplied.
 */
export function Marker({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-flex items-center gap-2 ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent-bright shadow-[0_0_12px_var(--accent-bright)]" />
      <span className="h-px w-10 bg-gradient-to-l from-accent-bright/70 to-transparent" />
    </span>
  );
}

/** Oversized faint numeral sitting behind content. */
export function GhostNumber({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none select-none font-bold leading-none text-white/[0.04] ${className}`}
    >
      {children}
    </span>
  );
}
