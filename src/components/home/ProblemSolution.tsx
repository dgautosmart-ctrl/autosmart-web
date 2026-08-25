import Reveal from "@/components/Reveal";

const PROBLEMS = [
  "שעות עבודה הולכות על הזנת נתונים ידנית",
  "מידע מפוזר בין גיליונות, וואטסאפ ומיילים",
  "טעויות אנוש שחוזרות על עצמן שוב ושוב",
  "אין זמן לחשוב אסטרטגית כי כל היום הולך על כיבוי שריפות",
];

const SOLUTIONS = [
  "תהליכים חוזרים רצים לבד, בלי מגע יד אדם",
  "כל המערכות שלכם מחוברות ומדברות אחת עם השנייה",
  "פחות טעויות, יותר עקביות ואמינות",
  "זמן פנוי להתמקד בצמיחה של העסק, לא בתפעול השוטף",
];

export default function ProblemSolution() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 right-1/4 h-64 w-64 rounded-full bg-brand-blue/5 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 left-1/4 h-64 w-64 rounded-full bg-brand-cyan/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-20 md:grid-cols-2">
        <Reveal className="space-y-4">
          <h2 className="text-2xl font-bold text-brand-navy sm:text-3xl">
            מוכר לכם?
          </h2>
          <ul className="space-y-3">
            {PROBLEMS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-brand-navy/80">
                <span
                  aria-hidden
                  className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-500/10 text-xs text-red-500"
                >
                  ✕
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.15} className="space-y-4">
          <h2 className="text-2xl font-bold text-brand-navy sm:text-3xl">
            ככה זה יכול להיראות
          </h2>
          <ul className="space-y-3">
            {SOLUTIONS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-brand-navy/80">
                <span
                  aria-hidden
                  className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-xs text-brand-blue"
                >
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
