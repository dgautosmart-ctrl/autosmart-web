"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useContactModal } from "@/components/contact/ContactModalContext";

const NAV_LINKS = [
  { href: "/", label: "בית" },
  { href: "/#about", label: "אודות" },
  { href: "/portfolio", label: "תיק עבודות" },
  { href: "/articles", label: "מאמרים" },
];

function NavItem({
  href,
  label,
  isActive,
  className,
  onClick,
}: {
  href: string;
  label: string;
  isActive: boolean;
  className: string;
  onClick?: () => void;
}) {
  const cls = `${className} ${isActive ? "text-brand-cyan" : "text-brand-offwhite/90"}`;
  // Same-page anchor links (e.g. "/#about") rely on the browser's native
  // fragment scroll, which next/link doesn't reliably trigger for a hash on
  // the current route - so render those as a plain <a>.
  return href.includes("#") ? (
    <a href={href} onClick={onClick} className={cls}>
      {label}
    </a>
  ) : (
    <Link href={href} onClick={onClick} className={cls}>
      {label}
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { open: openContactModal } = useContactModal();

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-full border border-white/10 bg-brand-navy/80 px-4 py-2.5 text-brand-offwhite shadow-lg shadow-brand-navy/30 backdrop-blur-xl sm:px-5">
        <Link
          href="/"
          onClick={() => setIsMenuOpen(false)}
          className="flex items-center gap-2"
        >
          <Image
            src="/logo.png"
            alt="AutoSmart"
            width={36}
            height={36}
            priority
            className="rounded-full"
          />
          <span className="text-base font-bold sm:text-lg">
            Auto<span className="bg-gradient-to-l from-brand-cyan to-brand-blue bg-clip-text text-transparent">Smart</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <NavItem
              key={link.href}
              href={link.href}
              label={link.label}
              isActive={pathname === link.href}
              className="text-sm font-medium transition-colors hover:text-brand-cyan"
            />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openContactModal}
            className="hidden rounded-full bg-gradient-to-l from-brand-blue to-brand-cyan px-4 py-2 text-sm font-semibold text-brand-navy shadow-md shadow-brand-blue/30 transition-transform hover:scale-105 sm:block"
          >
            צרו קשר
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "סגירת תפריט" : "פתיחת תפריט"}
            aria-expanded={isMenuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full md:hidden"
          >
            {isMenuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="mx-auto mt-2 flex max-w-5xl flex-col gap-1 rounded-3xl border border-white/10 bg-brand-navy/95 px-4 py-3 text-brand-offwhite shadow-lg backdrop-blur-xl md:hidden">
          {NAV_LINKS.map((link) => (
            <NavItem
              key={link.href}
              href={link.href}
              label={link.label}
              isActive={pathname === link.href}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-md px-2 py-3 text-sm font-medium"
            />
          ))}
          <button
            type="button"
            onClick={() => {
              setIsMenuOpen(false);
              openContactModal();
            }}
            className="mt-2 rounded-full bg-gradient-to-l from-brand-blue to-brand-cyan px-4 py-3 text-center text-sm font-semibold text-brand-navy"
          >
            צרו קשר
          </button>
        </nav>
      )}
    </header>
  );
}
