"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import type { PortfolioCase } from "@/data/portfolio";

const ICONS: Record<PortfolioCase["icon"], ReactNode> = {
  // Sales desk / call centre - a headset with mic boom
  "sales-desk": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-6 w-6">
      <path strokeLinecap="round" d="M4 13v-1.5a8 8 0 0 1 16 0V13" />
      <rect x="2.5" y="12.5" width="4" height="6" rx="1.6" />
      <rect x="17.5" y="12.5" width="4" height="6" rx="1.6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 18.5v1a3 3 0 0 1-3 3h-3" />
    </svg>
  ),
  // Marketing measurement - bar chart under a magnifier
  attribution: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 5v14h14" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 15v-2M12 15V9M16 15v-4" />
      <circle cx="17" cy="7" r="3" />
      <path strokeLinecap="round" d="m19.4 9.4 2.1 2.1" />
    </svg>
  ),
  // Donor care - a chat bubble holding a heart
  "donor-care": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-6 w-6">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.5 11.4a7.6 7.6 0 0 1-10.9 6.9L4 19.8l1.4-4.1A7.6 7.6 0 1 1 20.5 11.4z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12.2 14.4c-3.1-2-2.9-4.2-1.5-4.9.9-.4 1.5.2 1.5.2s.6-.6 1.5-.2c1.4.7 1.6 2.9-1.5 4.9z"
      />
    </svg>
  ),
};

export default function PortfolioCard({
  item,
  index = 0,
}: {
  item: PortfolioCase;
  index?: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-navy/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-blue/10 sm:p-7"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-brand-cyan/0 blur-2xl transition-colors duration-500 group-hover:bg-brand-cyan/15"
      />

      <div className="relative flex items-start justify-between gap-3">
        <span className="inline-flex items-center rounded-full bg-brand-blue/[0.08] px-3 py-1 text-xs font-semibold text-brand-blue ring-1 ring-inset ring-brand-blue/15">
          {item.category}
        </span>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-cyan text-white shadow-md shadow-brand-blue/25">
          {ICONS[item.icon]}
        </div>
      </div>

      <h3 className="relative mt-4 text-xl font-bold leading-snug text-brand-navy">
        {item.title}
      </h3>

      <div className="relative mt-4 space-y-4 text-sm leading-relaxed text-brand-navy/70">
        <div>
          <p className="mb-1 text-xs font-semibold text-brand-navy/45">האתגר</p>
          <p>{item.challenge}</p>
        </div>
        <div>
          <p className="mb-1 text-xs font-semibold text-brand-navy/45">הפתרון</p>
          <p>{item.solution}</p>
        </div>
      </div>

      <div className="relative mt-4 rounded-xl bg-brand-blue/[0.05] p-4">
        <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-brand-blue">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25} className="h-3.5 w-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 5 5L20 7" />
          </svg>
          התוצאה
        </p>
        <p className="text-sm leading-relaxed text-brand-navy/80">{item.result}</p>
      </div>
    </motion.article>
  );
}
