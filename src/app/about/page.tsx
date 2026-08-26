import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ContactModalTrigger from "@/components/contact/ContactModalTrigger";

export const metadata: Metadata = {
  title: "אודות | AutoSmart",
  description: "קצת עלינו - מי אנחנו ולמה אנחנו עושים את מה שאנחנו עושים.",
};

const ROLES = [
  {
    title: "מערכות ואוטומציה",
    description: "CRM, וואטסאפ, אינטגרציות בין מערכות וסקריפטים שרצים לבד.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-7 w-7">
        <circle cx="12" cy="12" r="3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.5M12 18.5V21M21 12h-2.5M5.5 12H3M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8M18.4 18.4l-1.8-1.8M7.4 7.4 5.6 5.6" />
      </svg>
    ),
  },
  {
    title: "שיווק ותוכן",
    description: "דיוור, כתיבת תוכן ועיצוב שמדברים אל הלקוחות שלכם.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-7 w-7">
        <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7l8 6 8-6" />
      </svg>
    ),
  },
];

const VALUES = [
  {
    title: "מקצועיות",
    description:
      "כל פתרון אוטומציה נבנה מותאם אישית לתהליכים האמיתיים של העסק שלכם - לא פתרון גנרי מהמדף.",
  },
  {
    title: "שקיפות",
    description:
      "אתם תמיד יודעים מה קורה, איך זה עובד, ולמה בחרנו בפתרון הזה ולא באחר.",
  },
  {
    title: "תוצאות",
    description:
      "המטרה היא זמן שחוזר אליכם וטעויות שנעלמות - לא טכנולוגיה בשביל הטכנולוגיה.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-navy to-[#081b30] text-brand-offwhite">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-blue/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-brand-cyan/20 blur-3xl"
        />
        <Reveal className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:py-20">
          <h1 className="text-3xl font-bold sm:text-5xl">
            מי{" "}
            <span className="bg-gradient-to-l from-brand-cyan to-brand-blue bg-clip-text text-transparent">
              אנחנו
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-brand-offwhite/80 sm:text-lg">
            AutoSmart קמה מתוך אמונה אחת פשוטה: עסקים קטנים ובינוניים לא
            צריכים לבזבז שעות על משימות שחוזרות על עצמן - הטכנולוגיה כבר כאן,
            רק צריך להתאים אותה נכון.
          </p>
        </Reveal>
      </section>

      <section className="bg-white">
        <Reveal className="mx-auto max-w-3xl space-y-4 px-4 py-16 text-brand-navy/80 sm:py-20">
          <h2 className="text-2xl font-bold text-brand-navy sm:text-3xl">
            הסיפור שלנו
          </h2>
          <p>
            AutoSmart הוקם לפני כשנה, מתוך משהו פשוט: אחד מאיתנו למד שיווק
            דיגיטלי ודיוור, והשני מגיע מעולם המערכות והאוטומציות. ככל
            שדיברנו עם יותר בעלי עסקים, גילינו את אותו הדבר כמעט בכל שיחה -
            יש עוד המון זמן וכסף שאפשר לחסוך, ותהליכים פשוטים שיכולים להביא
            הרבה יותר לקוחות, בלי להעסיק עוד ידיים.
          </p>
          <p>
            היום אנחנו זוג שעובד יחד: אחד דואג לכל מה שקשור למערכות, CRM,
            וואטסאפ ואוטומציה - והשני לשיווק במייל, כתיבת תוכן ועיצוב. אנחנו
            מלווים עסק מהרגע שבו ליד נכנס, דרך התהליך שמייצר לו אמון, ועד
            שהוא הופך ללקוח חוזר.
          </p>
          <p>
            אנחנו לא סוכנות גדולה ואנונימית. כל פרויקט מתחיל בהקשבה אמיתית
            למה שהעסק שלכם צריך - לא בפתרון מדף.
          </p>
        </Reveal>
      </section>

      <section className="bg-brand-offwhite">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <Reveal className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-brand-navy sm:text-3xl">
              מי מאחורי המסך
            </h2>
            <p className="mt-2 text-brand-navy/70">
              זוג שעובד יחד - כל אחד עם התחום שלו
            </p>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {ROLES.map((role, index) => (
              <Reveal
                key={role.title}
                delay={index * 0.1}
                className="flex flex-col items-center gap-3 rounded-2xl border border-brand-navy/10 bg-white p-6 text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan text-white shadow-md shadow-brand-blue/30">
                  {role.icon}
                </div>
                <h3 className="text-lg font-semibold text-brand-navy">
                  {role.title}
                </h3>
                <p className="text-sm leading-relaxed text-brand-navy/70">
                  {role.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-brand-offwhite to-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 -left-16 h-64 w-64 rounded-full bg-brand-blue/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <Reveal className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-brand-navy sm:text-3xl">
              איך אנחנו עובדים
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-3">
            {VALUES.map((value, index) => (
              <Reveal
                key={value.title}
                delay={index * 0.1}
                className="group rounded-2xl border border-brand-navy/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-blue/15"
              >
                <h3 className="text-lg font-semibold text-brand-navy">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-navy/70">
                  {value.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-16 text-center sm:py-20">
          <h2 className="text-2xl font-bold text-brand-navy sm:text-3xl">
            מוכנים להתחיל?
          </h2>
          <p className="max-w-xl text-brand-navy/70">
            ספרו לנו קצת על העסק שלכם ונבין ביחד איפה אוטומציה יכולה לחסוך
            לכם הכי הרבה זמן.
          </p>
          <ContactModalTrigger className="rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-blue/30 transition-all hover:scale-105 hover:bg-brand-cyan hover:text-brand-navy hover:shadow-brand-cyan/40 sm:text-base">
            בואו נדבר
          </ContactModalTrigger>
        </Reveal>
      </section>
    </>
  );
}
