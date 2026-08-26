import type { Metadata } from "next";
import { faqItems } from "@/data/faq";
import Reveal from "@/components/Reveal";
import ContactModalTrigger from "@/components/contact/ContactModalTrigger";

export const metadata: Metadata = {
  title: "שאלות נפוצות | AutoSmart",
  description: "תשובות לשאלות נפוצות על עבודה עם AutoSmart - מחיר, זמנים והתאמה אישית.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="relative overflow-hidden bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 right-1/4 h-64 w-64 rounded-full bg-brand-blue/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-3xl px-4 py-16 sm:py-20">
          <Reveal className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-brand-navy sm:text-4xl">
              שאלות נפוצות
            </h1>
            <p className="mt-2 text-brand-navy/70">
              כמה דברים שכדאי לדעת לפני שמתחילים
            </p>
          </Reveal>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <Reveal
                key={item.question}
                delay={index * 0.08}
                className="rounded-2xl border border-brand-navy/10 bg-white p-6 shadow-sm"
              >
                <h2 className="text-lg font-semibold text-brand-navy">
                  {item.question}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-brand-navy/70">
                  {item.answer}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-brand-offwhite to-white">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-16 text-center sm:py-20">
          <h2 className="text-2xl font-bold text-brand-navy sm:text-3xl">
            יש לכם שאלה שלא מופיעה כאן?
          </h2>
          <p className="max-w-xl text-brand-navy/70">
            כתבו לנו וניתן תשובה אישית - בלי התחייבות.
          </p>
          <ContactModalTrigger className="rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-blue/30 transition-all hover:scale-105 hover:bg-brand-cyan hover:text-brand-navy hover:shadow-brand-cyan/40 sm:text-base">
            בואו נדבר
          </ContactModalTrigger>
        </Reveal>
      </section>
    </>
  );
}
