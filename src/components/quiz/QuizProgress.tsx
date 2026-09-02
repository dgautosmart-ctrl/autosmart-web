"use client";

import { motion } from "motion/react";

export default function QuizProgress({
  step,
  total,
  onBack,
}: {
  /** מספר השאלה הנוכחית, מ-1. */
  step: number;
  total: number;
  onBack: () => void;
}) {
  const percent = Math.round((step / total) * 100);

  return (
    <div className="mb-7">
      <div className="mb-2.5 flex items-center justify-between gap-4">
        <span className="text-xs font-semibold tracking-wide text-brand-blue">
          שאלה {step} מתוך {total}
        </span>

        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-brand-navy/55 transition-colors hover:text-brand-blue"
        >
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
          חזרה
        </button>
      </div>

      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-1.5 w-full overflow-hidden rounded-full bg-brand-navy/[0.08]"
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-l from-brand-blue to-brand-cyan"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
