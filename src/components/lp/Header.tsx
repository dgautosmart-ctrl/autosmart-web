"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { scrollToForm } from "@/components/lp/CtaButton";
import { TapIcon, useTapIcon } from "@/components/TapIcon";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { tapped, tap } = useTapIcon();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-hairline bg-bg/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-8">
        <a href="/" className="flex items-center gap-2.5" aria-label="AutoSmart">
          <Image
            src="/logo.png"
            alt="AutoSmart"
            width={34}
            height={34}
            priority
            className="rounded-md"
          />
          <span className="text-lg font-bold tracking-tight">
            Auto
            <span className="bg-gradient-to-l from-accent-bright to-accent bg-clip-text text-transparent">
              Smart
            </span>
          </span>
        </a>

        <button
          type="button"
          onClick={() => {
            tap();
            scrollToForm();
          }}
          className="group flex items-center gap-2 rounded-full bg-gradient-to-l from-accent to-accent-bright px-6 py-2.5 text-sm font-bold text-navy shadow-[0_10px_30px_-10px_var(--accent-glow)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_38px_-10px_var(--accent-glow)] sm:px-7 sm:py-3 sm:text-base"
        >
          בואו נדבר
          <TapIcon tapped={tapped} className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
