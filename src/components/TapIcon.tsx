"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Shared "tap feedback" for buttons across the site: the trailing arrow
 * briefly turns into a pointing hand on every press, then springs back.
 * `useTapIcon` tracks the transient state; drop `<TapIcon>` where the
 * button's icon goes and call `tap()` from the button's onClick / onSubmit.
 */
export function useTapIcon(resetMs = 650) {
  const [tapped, setTapped] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const tap = useCallback(() => {
    setTapped(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setTapped(false), resetMs);
  }, [resetMs]);

  return { tapped, tap };
}

export function TapIcon({
  tapped,
  className = "",
  idleClassName = "group-hover:-translate-x-1",
}: {
  tapped: boolean;
  /** Sizing / colour classes for the <svg> (e.g. "h-4 w-4"). */
  className?: string;
  /** Transform applied while idle — defaults to the hover nudge. */
  idleClassName?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`relative transition-all duration-300 ${
        tapped ? "scale-110" : idleClassName
      } ${className}`}
    >
      {tapped ? (
        // Pointing hand — index finger extended, other fingers curled.
        <g>
          <path d="M18 11V6a2 2 0 0 0-4 0v5" />
          <path d="M14 10V4a2 2 0 0 0-4 0v6" />
          <path d="M10 10.5V6a2 2 0 0 0-4 0v8" />
          <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15.5" />
        </g>
      ) : (
        <path d="M19 12H5M11 18l-6-6 6-6" />
      )}
    </svg>
  );
}
