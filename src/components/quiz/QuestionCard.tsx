"use client";

import type { QuizQuestion } from "@/lib/quiz/types";

export default function QuestionCard({
  question,
  selected,
  onSelect,
}: {
  question: QuizQuestion;
  selected?: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div>
      <h2 className="text-xl text-brand-navy sm:text-2xl">{question.title}</h2>
      {question.hint && (
        <p className="mt-2 text-sm font-normal leading-relaxed text-brand-navy/65">
          {question.hint}
        </p>
      )}

      <div
        className={`mt-6 grid gap-2.5 ${
          question.compact ? "sm:grid-cols-2" : ""
        }`}
      >
        {question.options.map((option, index) => {
          const isSelected = selected === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              aria-pressed={isSelected}
              className={`group flex min-h-[3.5rem] w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-right transition-all duration-200 sm:px-5 ${
                isSelected
                  ? "border-brand-blue bg-brand-blue/[0.08] shadow-[0_10px_28px_-18px_rgba(43,147,201,0.7)]"
                  : "border-brand-navy/10 bg-white hover:border-brand-blue/40 hover:bg-brand-blue/[0.03]"
              }`}
            >
              <span
                aria-hidden
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-semibold transition-colors ${
                  isSelected
                    ? "bg-brand-blue text-white"
                    : "bg-brand-navy/[0.06] text-brand-navy/45 group-hover:bg-brand-blue/10 group-hover:text-brand-blue"
                }`}
              >
                {index + 1}
              </span>
              <span
                className={`text-[0.97rem] font-semibold leading-snug ${
                  isSelected ? "text-brand-navy" : "text-brand-navy/90"
                }`}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
