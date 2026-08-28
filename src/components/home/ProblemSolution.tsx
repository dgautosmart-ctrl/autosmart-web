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
    <section className="relative overflow-hidden border-t border-brand-navy/[0.06] bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-brand-cyan/[0.06] blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl text-brand-navy sm:text-4xl">
            יותר לקוחות, פחות עבודה ידנית, עסק שעובד בשבילכם!
          </h2>
          <p className="mx-auto mt-4 text-brand-navy/70">
            אנחנו מחברים בין שיווק מדויק, מערכות חכמות ואוטומציה — כדי להביא
            יותר לקוחות ולגרום לעסק לעבוד בצורה יעילה יותר.
          </p>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          <Reveal className="relative overflow-hidden rounded-2xl bg-white p-6 ring-1 ring-brand-navy/[0.07] sm:p-8">
            <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-red-400/60 via-red-400/20 to-transparent" />
            <h3 className="text-lg text-brand-navy">מוכר לכם?</h3>
            <ul className="mt-4 space-y-3.5">
              {PROBLEMS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.95rem] font-normal leading-[1.7] text-brand-navy">
                  <span
                    aria-hidden
                    className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400/70"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            delay={0.12}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-offwhite to-white p-6 ring-1 ring-brand-blue/15 sm:p-8"
          >
            <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-brand-blue via-brand-cyan/40 to-transparent" />
            <h3 className="text-lg text-brand-navy">ככה זה נראה איתנו</h3>
            <ul className="mt-4 space-y-3.5">
              {SOLUTIONS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.95rem] font-normal leading-[1.7] text-brand-navy">
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-[10px] text-brand-blue"
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
