import type { Metadata } from "next";
import { portfolioCases } from "@/data/portfolio";
import PortfolioCard from "@/components/PortfolioCard";
import Reveal from "@/components/Reveal";
import ContactModalTrigger from "@/components/contact/ContactModalTrigger";

export const metadata: Metadata = {
  title: "תיק עבודות | AutoSmart",
  description: "קייסים אמיתיים של עסקים קטנים שליווינו בשיווק, מערכות ואוטומציה - הבעיה, הפתרון והתוצאה.",
};

export default function PortfolioPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 right-1/3 h-64 w-64 rounded-full bg-brand-blue/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-16 left-1/3 h-64 w-64 rounded-full bg-brand-cyan/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <Reveal className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
            <h1 className="text-3xl font-bold text-brand-navy sm:text-4xl">
              בעיות אמיתיות. פתרונות שעובדים.
            </h1>
            <p className="mt-3 text-brand-navy/70">
              כמה דוגמאות למערכות ותהליכים שבנינו כדי להפוך עבודה ידנית, חוסר
              סדר וחוסר שליטה לתהליך עסקי חכם ומסודר.
            </p>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioCases.map((item, index) => (
              <PortfolioCard key={item.slug} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-brand-offwhite to-white">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-16 text-center sm:py-20">
          <h2 className="text-2xl font-bold text-brand-navy sm:text-3xl">
            מזהים משהו מוכר בעסק שלכם?
          </h2>
          <p className="max-w-xl text-brand-navy/70">
            בואו נבדוק איפה אפשר לחסוך עבודה ידנית, לחבר בין המערכות ולבנות
            תהליך שעובד נכון יותר.
          </p>
          <ContactModalTrigger className="rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-blue/30 transition-all hover:scale-105 hover:bg-brand-cyan hover:text-brand-navy hover:shadow-brand-cyan/40 sm:text-base">
            בואו נבדוק את העסק שלי
          </ContactModalTrigger>
        </Reveal>
      </section>
    </>
  );
}
