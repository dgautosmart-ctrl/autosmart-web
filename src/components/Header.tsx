"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "בית" },
  { href: "/about", label: "אודות" },
  { href: "/articles", label: "מאמרים" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-brand-navy text-brand-offwhite shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          onClick={() => setIsMenuOpen(false)}
          className="flex items-center gap-2"
        >
          <Image
            src="/logo.png"
            alt="AutoSmart"
            width={40}
            height={40}
            priority
            className="rounded-md"
          />
          <span className="text-lg font-bold">
            Auto<span className="text-brand-cyan">Smart</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-brand-cyan ${
                  isActive ? "text-brand-cyan" : "text-brand-offwhite/90"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/#contact"
            className="rounded-full bg-brand-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-cyan hover:text-brand-navy"
          >
            צרו קשר
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? "סגירת תפריט" : "פתיחת תפריט"}
          aria-expanded={isMenuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-md md:hidden"
        >
          {isMenuOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {isMenuOpen && (
        <nav className="flex flex-col gap-1 border-t border-white/10 bg-brand-navy px-4 pb-4 md:hidden">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`rounded-md px-2 py-3 text-sm font-medium ${
                  isActive ? "text-brand-cyan" : "text-brand-offwhite/90"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/#contact"
            onClick={() => setIsMenuOpen(false)}
            className="mt-2 rounded-full bg-brand-blue px-4 py-3 text-center text-sm font-semibold text-white"
          >
            צרו קשר
          </Link>
        </nav>
      )}
    </header>
  );
}
