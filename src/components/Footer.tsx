import Link from "next/link";
import Image from "next/image";
import { CONTACT } from "@/lib/site-config";
import CopyButton from "@/components/CopyButton";

const NAV_LINKS = [
  { href: "/", label: "בית" },
  { href: "/about", label: "אודות" },
  { href: "/articles", label: "מאמרים" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-brand-navy text-brand-offwhite">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center gap-3 text-center sm:items-start sm:text-right">
          <Image src="/logo.png" alt="AutoSmart" width={64} height={64} className="rounded-lg" />
          <p className="max-w-xs text-sm text-brand-offwhite/70">
            שיווק מדויק, מערכות חכמות ואוטומציה - מניעים את העסק שלך קדימה.
          </p>
        </div>

        <nav className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-right">
          <span className="text-sm font-semibold text-brand-cyan">ניווט</span>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-brand-offwhite/80 transition-colors hover:text-brand-cyan"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-right">
          <span className="text-sm font-semibold text-brand-cyan">צור קשר</span>
          <div className="flex items-center gap-1.5">
            <a
              href={`https://wa.me/${CONTACT.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-brand-offwhite/80 hover:text-brand-cyan"
            >
              וואטסאפ: {CONTACT.whatsappDisplay}
            </a>
            <CopyButton value={CONTACT.whatsappDisplay} label="העתקת מספר הטלפון" />
          </div>
          <div className="flex items-center gap-1.5">
            <a href={`mailto:${CONTACT.email}`} className="text-sm text-brand-offwhite/80 hover:text-brand-cyan">
              {CONTACT.email}
            </a>
            <CopyButton value={CONTACT.email} label="העתקת כתובת המייל" />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 border-t border-white/10 py-4 text-center text-xs text-brand-offwhite/60">
        <p>© {year} AutoSmart. כל הזכויות שמורות.</p>
        <Link
          href="/privacy-policy"
          className="underline underline-offset-2 transition-colors hover:text-brand-cyan"
        >
          מדיניות פרטיות
        </Link>
      </div>
    </footer>
  );
}
