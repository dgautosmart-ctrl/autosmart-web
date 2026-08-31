"use client";

import type { MouseEvent, ReactNode } from "react";
import { TapIcon, useTapIcon } from "@/components/TapIcon";

export default function ScrollLink({
  href,
  className,
  children,
  withIcon = true,
}: {
  href: `#${string}`;
  className?: string;
  children: ReactNode;
  /** Set false for plain text links where a trailing icon would look wrong. */
  withIcon?: boolean;
}) {
  const { tapped, tap } = useTapIcon();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    tap();
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`${withIcon ? "group inline-flex items-center justify-center gap-2 " : ""}${className ?? ""}`}
    >
      {children}
      {withIcon && <TapIcon tapped={tapped} className="h-4 w-4" />}
    </a>
  );
}
