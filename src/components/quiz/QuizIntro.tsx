"use client";

import { motion } from "motion/react";
import { TapIcon, useTapIcon } from "@/components/TapIcon";

const PROMISES = ["ללא התחייבות", "לוקח רק כמה דקות"];

export default function QuizIntro({ onStart }: { onStart: () => void }) {
  const { tapped, tap } = useTapIcon();

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-2xl text-center"
    >
      <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-blue/15 bg-brand-blue/[0.06] px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-blue">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-blue animate-pulse-dot" />
        בדיקה עצמית לעסק
      </span>

      <h1 className="text-3xl text-brand-navy sm:text-[2.6rem]">
        בדיקה של 5 דקות:
        <br />
        <span className="bg-gradient-to-l from-brand-blue to-brand-cyan bg-clip-text text-transparent">
          כמה עבודה מיותרת יש בעסק שלך?
        </span>
      </h1>

      <p className="mx-auto mt-5 max-w-xl text-[1.05rem] font-medium leading-relaxed text-brand-navy/85">
        ענו על כמה שאלות קצרות וגלו אילו תהליכים בעסק שלכם אפשר להפוך לאוטומטיים —
        וכמה זמן ועבודה אפשר לחסוך.
      </p>

      <button
        type="button"
        onClick={() => {
          tap();
          onStart();
        }}
        className="group mx-auto mt-9 flex items-center justify-center gap-2 rounded-full bg-gradient-to-l from-brand-blue to-brand-cyan px-8 py-4 text-base font-semibold text-brand-navy shadow-lg shadow-brand-blue/25 transition-transform hover:scale-[1.03] sm:text-lg"
      >
        בואו נבדוק את העסק שלי
        <TapIcon tapped={tapped} className="h-5 w-5" />
      </button>

      <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-brand-navy/70">
        {PROMISES.map((promise) => (
          <li key={promise} className="flex items-center gap-1.5">
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              className="h-4 w-4 text-brand-blue"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
            </svg>
            {promise}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
