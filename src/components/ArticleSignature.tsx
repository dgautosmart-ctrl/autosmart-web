"use client";

import Link from "next/link";
import { sendGAEvent } from "@next/third-parties/google";

/**
 * בלוק החתימה הקבוע שמתווסף אוטומטית בסוף כל מאמר.
 * אנונימי לפי כלל האתר - שם המותג בלבד, בלי שם אדם - עם CTA אחד ל-/#contact.
 * לא נכתב ב-Markdown של המאמר; מרונדר מתוך src/app/articles/[slug]/page.tsx.
 */
export default function ArticleSignature({ fromSlug }: { fromSlug: string }) {
  return (
    <section className="mt-16 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-navy to-brand-navy-light px-6 py-10 text-center shadow-lg shadow-brand-navy/15 sm:px-10 sm:py-12">
      <p className="text-lg font-semibold text-white sm:text-xl">AutoSmart</p>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-brand-offwhite/80 sm:text-base">
        אנחנו בונים לעסקים קטנים אוטומציות ומערכות חכמות שחוסכות שעות עבודה בשבוע -
        משיווק ולידים ועד שירות לקוחות ומעקב.
      </p>
      <Link
        href="/#contact"
        onClick={() => sendGAEvent("event", "article_cta_click", { from_slug: fromSlug })}
        className="mt-6 inline-block rounded-full bg-gradient-to-l from-brand-blue to-brand-cyan px-7 py-3.5 text-sm font-semibold text-brand-navy shadow-lg shadow-brand-blue/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-cyan/30 sm:text-base"
      >
        בואו נדבר
      </Link>
    </section>
  );
}
