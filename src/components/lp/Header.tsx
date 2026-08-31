"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { scrollToForm } from "@/components/lp/CtaButton";
import { AUTOSMART_SITE } from "@/lib/lp-config";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

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
        <a href="#top" className="flex items-center gap-2.5" aria-label="AutoSmart">
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

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={AUTOSMART_SITE}
            className="hidden text-sm text-text-dim transition-colors hover:text-text sm:inline"
          >
            לאתר AutoSmart
          </a>
          <button
            type="button"
            onClick={scrollToForm}
            className="rounded-full border border-hairline-bright bg-surface-2 px-4 py-2 text-sm font-semibold text-text-soft transition-all hover:border-accent-bright/60 hover:text-white"
          >
            בואו נדבר
          </button>
        </div>
      </div>
    </header>
  );
}
