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
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-bright focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-l from-accent to-accent-bright text-navy shadow-[0_0_0_1px_rgba(110,201,232,0.4),0_18px_50px_-12px_rgba(43,147,201,0.7)] hover:shadow-[0_0_0_1px_rgba(110,201,232,0.6),0_22px_70px_-10px_rgba(43,147,201,0.85)] hover:-translate-y-0.5",
  ghost:
    "border border-hairline-bright bg-surface text-text-soft hover:border-accent-bright/60 hover:text-white",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-sm sm:text-base",
  lg: "px-8 py-4 text-base sm:text-lg",
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
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-70"
          style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(110,201,232,0.7), transparent)" }}
        />
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
