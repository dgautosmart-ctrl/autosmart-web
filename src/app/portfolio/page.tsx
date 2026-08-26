import type { Metadata } from "next";
import { portfolioCases } from "@/data/portfolio";
import PortfolioCard from "@/components/PortfolioCard";
import Reveal from "@/components/Reveal";
import ContactModalTrigger from "@/components/contact/ContactModalTrigger";

export const metadata: Metadata = {
  title: "תיק עבודות | AutoSmart",
  description: "קייסים אמיתיים של עסקים קטנים שליווינו - הבעיה, הפתרון והתוצאה.",
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
          <Reveal className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-brand-navy sm:text-4xl">
              תיק עבודות
            </h1>
            <p className="mt-2 text-brand-navy/70">
              כמה דוגמאות אמיתיות לעסקים קטנים שליווינו - בלי שמות, עם כל
              הפרטים
            </p>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2">
            {portfolioCases.map((item, index) => (
              <PortfolioCard key={item.slug} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-brand-offwhite to-white">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-16 text-center sm:py-20">
          <h2 className="text-2xl font-bold text-brand-navy sm:text-3xl">
            רוצים תוצאה דומה בעסק שלכם?
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
