"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import Reveal from "@/components/Reveal";
import TechBackdrop from "@/components/TechBackdrop";

type Pillar = {
  n: string;
  title: string;
  description: string;
  icon: ReactNode;
};

const PILLARS: Pillar[] = [
  {
    n: "01",
    title: "שיווק שמביא לקוחות",
    description:
      "שיווק דיגיטלי ממוקד, רשימות תפוצה, קמפיינים ותהליכים שמטרתם להביא את האנשים הנכונים לעסק.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
        <circle cx="16" cy="16" r="9.5" />
        <circle cx="16" cy="16" r="3.2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M27 27l-6.2-6.2M27 27h-4.4M27 27v-4.4" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "מערכות שעושות סדר",
    description:
      "CRM ומערכות חכמות שמרכזות לידים, לקוחות ותהליכים במקום אחד.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
        <rect x="11" y="11" width="10" height="10" rx="2.4" />
        <circle cx="6" cy="6" r="2.4" />
        <circle cx="26" cy="6" r="2.4" />
        <circle cx="26" cy="26" r="2.4" />
        <path strokeLinecap="round" d="M8 7.6 12.4 11M24 7.6 19.6 11M24.4 24.4 21 21" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "אוטומציה שמניעה הכול",
    description:
      "חיבור המערכות והתהליכים כך שפחות דברים נעשים ידנית והעסק עובד בצורה יעילה וחכמה יותר.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 12a10 10 0 0 1 16.5-3.2M25 20a10 10 0 0 1-16.5 3.2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M23 5v4h-4M9 27v-4h4" />
        <circle cx="16" cy="16" r="2.6" />
      </svg>
    ),
  },
];

export default function WhatWeDo() {
  return (
    <section
      id="services"
      className="relative scroll-mt-[4.75rem] overflow-hidden bg-gradient-to-b from-brand-offwhite to-white sm:scroll-mt-20"
    >
      <TechBackdrop tone="light" className="opacity-[0.4]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-brand-blue/[0.06] blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-blue/15 bg-brand-blue/[0.06] px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-blue">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
            מה אנחנו עושים
          </span>
          <h2 className="text-3xl text-brand-navy sm:text-4xl">
            שלושה חלקים, מנוע אחד
          </h2>
          <p className="mx-auto mt-4 text-brand-navy/70">
            לא שלוש מחלקות נפרדות - שלושה חלקים של אותו מנוע: מביאים לקוחות,
            עושים סדר ומחברים את הכול כך שהעסק עובד חכם יותר.
          </p>
        </Reveal>

        <div className="relative grid gap-6 sm:grid-cols-3 sm:gap-5">
          {/* connector - horizontal on desktop, runs through the icon row */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-8 top-[2.15rem] hidden h-px bg-gradient-to-l from-transparent via-brand-blue/25 to-transparent sm:block"
          />

          {PILLARS.map((pillar, index) => (
            <motion.div
              key={pillar.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col items-center rounded-2xl bg-white/70 p-6 text-center ring-1 ring-brand-navy/[0.07] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:ring-brand-blue/25 hover:shadow-[0_18px_40px_-24px_rgba(43,147,201,0.4)] sm:p-7"
            >
              <div className="relative mb-5">
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 rounded-2xl bg-brand-cyan/20 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"
                />
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-navy text-brand-cyan ring-1 ring-inset ring-white/10 transition-transform duration-300 group-hover:scale-105">
                  {pillar.icon}
                </div>
              </div>

              <span className="text-xs font-semibold tracking-[0.2em] text-brand-blue/70">
                {pillar.n}
              </span>
              <h3 className="mt-1.5 text-lg text-brand-navy">{pillar.title}</h3>
              <p className="mt-2.5 text-sm font-light leading-relaxed text-brand-navy/65">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
