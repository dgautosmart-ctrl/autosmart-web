import Reveal from "@/components/Reveal";

const PROBLEMS = [
  "משקיעים בפרסום אבל לא באמת יודעים מה מביא לקוחות ומה מבזבז כסף",
  "לידים נכנסים ונופלים בין הכיסאות - אף אחד לא חוזר אליהם בזמן",
  "המידע על הלקוחות מפוזר בין גיליונות, וואטסאפ ומיילים",
  "רוב היום הולך על תפעול ידני, ולא נשאר זמן להביא לקוחות חדשים",
];

const SOLUTIONS = [
  "שיווק ממוקד שמביא פניות מהקהל הנכון - ואתם יודעים בדיוק מה עובד",
  "כל ליד נקלט, מקבל מענה מהיר ומלווה עד שהוא הופך ללקוח",
  "כל המערכות מחוברות - התמונה המלאה על כל לקוח במקום אחד",
  "התפעול רץ לבד, ואתם מתפנים לצמיחה של העסק",
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

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-32 sm:pb-20 sm:pt-40">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/5 px-4 py-1.5 text-xs font-semibold text-brand-blue">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
            מה אנחנו עושים
          </span>
          <h2 className="text-2xl font-bold text-brand-navy sm:text-3xl">
            לא רק מייעלים - עוזרים לכם להביא יותר לקוחות
          </h2>
          <p className="mt-3 text-brand-navy/70">
            AutoSmart משלבת שיווק מדויק, מערכות חכמות ואוטומציה למנוע צמיחה
            אחד - שמביא פניות, מטפל בהן ומחבר את כל הפעילות בעסק.
          </p>
        </Reveal>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
        <Reveal className="relative space-y-4 overflow-hidden rounded-3xl border border-brand-navy/10 bg-white p-6 shadow-sm sm:p-8">
          <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-red-400/70 via-red-400/30 to-transparent" />
          <h3 className="text-2xl font-bold text-brand-navy sm:text-3xl">
            מוכר לכם?
          </h3>
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
        <Reveal
          delay={0.15}
          className="relative space-y-4 overflow-hidden rounded-3xl border border-brand-blue/15 bg-gradient-to-br from-brand-offwhite to-white p-6 shadow-sm sm:translate-y-3 sm:p-8"
        >
          <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-brand-blue to-brand-cyan" />
          <h3 className="text-2xl font-bold text-brand-navy sm:text-3xl">
            ככה זה יכול להיראות
          </h3>
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
      </div>
    </section>
  );
}
