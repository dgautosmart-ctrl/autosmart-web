import Image from "next/image";
import { CONTACT } from "@/lib/lp-config";

const NAV_LINKS = [
  { href: "/", label: "בית" },
  { href: "/#about", label: "אודות" },
  { href: "/portfolio", label: "פרויקטים" },
  { href: "/articles", label: "מאמרים" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline bg-bg-2 text-text-soft">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:flex-row sm:justify-between sm:px-8">
        <div className="flex flex-col items-center gap-3 text-center sm:items-start sm:text-right">
          <Image src="/logo.png" alt="AutoSmart" width={56} height={56} className="rounded-lg" />
          <p className="max-w-xs text-sm text-text-dim">
            שיווק מדויק, מערכות חכמות ואוטומציה - מניעים את העסק שלך קדימה.
          </p>
        </div>

        <nav className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-right">
          <span className="text-sm font-semibold text-accent-bright">ניווט</span>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-dim transition-colors hover:text-accent-bright"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-right">
          <span className="text-sm font-semibold text-accent-bright">צור קשר</span>
          <a
            href={`https://wa.me/${CONTACT.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-dim hover:text-accent-bright"
          >
            וואטסאפ: {CONTACT.whatsappDisplay}
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="text-sm text-text-dim hover:text-accent-bright"
          >
            {CONTACT.email}
          </a>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 border-t border-hairline py-4 text-center text-xs text-text-faint">
        <p>© {year} AutoSmart. כל הזכויות שמורות.</p>
        <a
          href="/privacy-policy"
          className="underline underline-offset-2 transition-colors hover:text-accent-bright"
        >
          מדיניות פרטיות
        </a>
      </div>
    </footer>
  );
}
