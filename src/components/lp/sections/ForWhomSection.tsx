import { Section, Container } from "@/components/lp/primitives";
import Reveal from "@/components/lp/Reveal";

const CARDS = [
  "עסקים עם 100+ לקוחות קיימים",
  "עסקים שיש אצלם אפשרות לרכישה חוזרת",
  "עסקים שכבר משקיעים כסף בהבאת לקוחות חדשים",
  "עסקים שיש להם רשימות לקוחות מפוזרות באקסל, CRM, טלפון או מערכות שונות",
  "עסקים שרוצים לשמור על קשר עם לקוחות בלי לנהל הכול ידנית",
  "עסקים שיודעים שיש להם לקוחות מהעבר — אבל כמעט לא פונים אליהם",
];

/** Section 13 — למי זה מתאים. */
export default function ForWhomSection() {
  return (
    <Section>
      <Container size="wide">
        <Reveal className="max-w-3xl">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl">למי השירות מתאים?</h2>
          <p className="mt-6 text-lg text-text-soft sm:text-xl">
            בעיקר לעסקים שכבר צברו לקוחות לאורך הדרך — אבל עדיין לא מנהלים איתם
            קשר שוטף ומסודר.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card} delay={(i % 3) * 0.07}>
              <div className="card-glow group relative flex h-full items-start gap-4 rounded-2xl border border-hairline bg-navy/25 p-6 backdrop-blur-sm transition-colors hover:border-accent-bright/40">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-hairline-bright bg-surface-2 text-accent-bright">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25} className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
                  </svg>
                </span>
                <p className="text-base text-text-soft sm:text-[1.05rem]">{card}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
