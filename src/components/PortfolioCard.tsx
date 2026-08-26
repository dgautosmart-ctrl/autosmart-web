"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import type { PortfolioCase } from "@/data/portfolio";

const ICONS: Record<PortfolioCase["icon"], ReactNode> = {
  crm: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-6 w-6">
      <rect x="3.5" y="4.5" width="17" height="13" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 20h8M7.5 9h9M7.5 12.5h6" />
    </svg>
  ),
  marketing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-6 w-6">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7l8 6 8-6" />
    </svg>
  ),
  tracking: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-6 w-6">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.5" />
      <path strokeLinecap="round" d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </svg>
  ),
  community: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-6 w-6">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 20s-7-4.35-9.5-8.5C.9 8.2 2.5 5 6 5c2 0 3.3 1.1 4 2.2A4.8 4.8 0 0 1 14 5c3.5 0 5.1 3.2 3.5 6.5C15 15.65 12 20 12 20z"
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
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-brand-navy/10 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-brand-blue/15"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-10 -top-10 h-24 w-24 rounded-full bg-brand-cyan/0 blur-2xl transition-colors duration-500 group-hover:bg-brand-cyan/20"
      />

      <div className="relative flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-cyan text-white shadow-md shadow-brand-blue/30 transition-transform duration-300 group-hover:scale-110">
          {ICONS[item.icon]}
        </div>
        <div>
          <span className="text-xs font-semibold text-brand-blue">{item.category}</span>
          <h3 className="text-lg font-semibold text-brand-navy">{item.title}</h3>
        </div>
      </div>

      <div className="relative space-y-3 text-sm leading-relaxed">
        <p>
          <span className="font-semibold text-brand-navy">הבעיה: </span>
          <span className="text-brand-navy/70">{item.problem}</span>
        </p>
        <p>
          <span className="font-semibold text-brand-navy">מה עשינו: </span>
          <span className="text-brand-navy/70">{item.solution}</span>
        </p>
        <p>
          <span className="font-semibold text-brand-navy">התוצאה: </span>
          <span className="text-brand-navy/70">{item.result}</span>
        </p>
      </div>
    </motion.div>
  );
}
