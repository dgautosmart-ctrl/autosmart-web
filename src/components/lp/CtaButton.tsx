"use client";

import type { ReactNode } from "react";
import { FORM_ID } from "@/lib/lp-config";

export function scrollToForm() {
  if (typeof document === "undefined") return;
  const el = document.getElementById(FORM_ID);
  if (!el) return;

  const focusField = () => {
    const field = el.querySelector<HTMLInputElement>("input, textarea, select");
    field?.focus({ preventScroll: true });
  };

  const headerOffset = 72;
  const target = Math.max(
    0,
    window.scrollY + el.getBoundingClientRect().top - headerOffset,
  );
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce || Math.abs(target - window.scrollY) < 4) {
    window.scrollTo(0, target);
    focusField();
    return;
  }

  // Fixed-duration easing — feels consistent whether the form is one screen
  // away or the whole page away (native smooth-scroll drags on over long spans).
  const start = window.scrollY;
  const distance = target - start;
  const duration = 620;
  let startTime = 0;

  const step = (now: number) => {
    if (!startTime) startTime = now;
    const p = Math.min(1, (now - startTime) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    window.scrollTo(0, start + distance * eased);
    if (p < 1) {
      requestAnimationFrame(step);
    } else {
      focusField();
    }
  };
  requestAnimationFrame(step);
}

type Variant = "primary" | "ghost";
type Size = "md" | "lg" | "xl";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-bold tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-bright focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-[linear-gradient(105deg,#1b8fc6_0%,#3fb8e6_45%,#7ad6f2_100%)] text-[#04121c] shadow-[0_0_0_1px_rgba(122,214,242,0.7),0_0_55px_-4px_rgba(60,180,230,0.75),0_24px_60px_-14px_rgba(43,147,201,0.85)] hover:-translate-y-0.5 hover:brightness-[1.06] hover:shadow-[0_0_0_1px_rgba(160,230,250,0.9),0_0_85px_-2px_rgba(60,180,230,0.95),0_30px_75px_-12px_rgba(43,147,201,1)]",
  ghost:
    "border border-hairline-bright bg-surface text-text-soft hover:border-accent-bright/60 hover:text-white",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-sm sm:text-base",
  lg: "px-8 py-4 text-base sm:text-lg",
  xl: "px-9 py-[1.15rem] text-lg sm:px-11 sm:py-5 sm:text-xl",
};

export default function CtaButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
}: {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={scrollToForm}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {variant === "primary" && (
        <>
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-1 -z-10 rounded-full opacity-45 blur-lg transition-opacity duration-300 group-hover:opacity-90"
            style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(110,201,232,0.8), transparent 75%)" }}
          />
          {/* sheen sweep */}
          <span
            aria-hidden
            className="cta-sheen pointer-events-none absolute inset-y-0 -left-[40%] w-2/5 skew-x-[-18deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.75),transparent)]"
          />
        </>
      )}
      <span className="relative">{children}</span>
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative h-4 w-4 -translate-x-0 transition-transform duration-300 group-hover:-translate-x-1"
      >
        <path d="M19 12H5M11 18l-6-6 6-6" />
      </svg>
    </button>
  );
}
