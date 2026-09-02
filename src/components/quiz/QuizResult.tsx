"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import TechBackdrop from "@/components/TechBackdrop";
import { CATEGORY_LABELS } from "@/lib/quiz/questions";
import { BAND_COPY } from "@/lib/quiz/scoring";
import type { Answers, CategoryId, Insight, QuizScore } from "@/lib/quiz/types";
import QuizLeadForm from "./QuizLeadForm";

const CATEGORY_ORDER: CategoryId[] = ["leads", "manual", "systems", "tasks"];

/** ספירה עולה של הציון - עושה למספר נוכחות, בלי להיות גימיק. */
function useCountUp(target: number, duration = 1100) {
  const [value, setValue] = useState(0);
  const frame = useRef<number>(0);

  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [target, duration]);

  return value;
}

function Gauge({ total }: { total: number }) {
  const value = useCountUp(total);
  const radius = 66;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative mx-auto h-44 w-44 shrink-0">
      <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
        <defs>
          <linearGradient id="quiz-gauge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2b93c9" />
            <stop offset="100%" stopColor="#6ec9e8" />
          </linearGradient>
        </defs>
        <circle cx="80" cy="80" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="11" />
        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="url(#quiz-gauge)"
          strokeWidth="11"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - total / 100) }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold tracking-tight text-white sm:text-[2.75rem]">{value}</span>
        <span className="text-xs font-medium text-brand-offwhite/55">מתוך 100</span>
      </div>
    </div>
  );
}

function CategoryBar({ label, value, delay }: { label: string; value: number; delay: number }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <span className="text-[0.83rem] font-semibold text-brand-offwhite/90">{label}</span>
        <span className="text-[0.8rem] font-bold text-brand-cyan">{value}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-l from-brand-blue to-brand-cyan"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

export default function QuizResult({
  answers,
  freeText,
  score,
  insights,
  onRestart,
}: {
  answers: Answers;
  freeText: string;
  score: QuizScore;
  insights: Insight[];
  onRestart: () => void;
}) {
  const band = BAND_COPY[score.band];
  const { estimate } = score;

  // מסך התוצאה ארוך בהרבה מכרטיס השאלה, ומיקום הגלילה נשמר בין השניים - בלי
  // איפוס, מי שענה בתחתית המסך נוחת באמצע התוצאה ומפספס את הציון.
  // `instant` גובר על ה-scroll-smooth הגלובלי, כדי לא "לטוס" לאורך כל הדף.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy to-[#06182b] text-brand-offwhite">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-glow opacity-60" />
      <TechBackdrop tone="dark" className="opacity-50" />

      <div className="relative mx-auto max-w-3xl px-4 py-16 sm:py-20">
        {/* --- הציון --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-7 text-center sm:flex-row sm:gap-10 sm:text-right"
        >
          <Gauge total={score.total} />

          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-cyan/25 bg-brand-cyan/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-brand-cyan">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-pulse-dot" />
              פוטנציאל האוטומציה בעסק שלך
            </span>
            <h2 className="text-3xl text-white sm:text-4xl">{band.label}</h2>
            <p className="mt-3 text-[1.02rem] font-medium leading-relaxed text-brand-offwhite/85">
              {band.line}
            </p>
          </div>
        </motion.div>

        {/* --- הערכת השעות --- */}
        {estimate.show && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-10 rounded-2xl border border-brand-cyan/20 bg-brand-cyan/[0.07] px-6 py-6 text-center"
          >
            <p className="text-sm font-semibold text-brand-offwhite/80">
              על סמך התשובות שלך, הזמן שאפשר להחזיר לעסק:
            </p>
            <p className="mt-2 text-3xl font-bold text-brand-cyan sm:text-4xl">
              {estimate.monthlyLow}–{estimate.monthlyHigh} שעות בחודש
            </p>
            <p className="mt-2.5 text-xs font-normal text-brand-offwhite/55">
              הערכה גסה על סמך התשובות שלך, לא הבטחה. המספר המדויק מתברר בסקירה עצמה.
            </p>
          </motion.div>
        )}

        {/* --- ציוני הקטגוריות --- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-10 grid gap-x-8 gap-y-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:grid-cols-2"
        >
          {CATEGORY_ORDER.map((category, i) => (
            <CategoryBar
              key={category}
              label={CATEGORY_LABELS[category]}
              value={score.categories[category]}
              delay={0.45 + i * 0.1}
            />
          ))}
        </motion.div>

        {/* --- התובנות --- */}
        <div className="mt-12">
          <h3 className="mb-5 text-lg text-white sm:text-xl">מה בלט בתשובות שלך</h3>
          <div className="grid gap-3.5">
            {insights.map((insight, i) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 transition-colors hover:border-brand-cyan/25 sm:p-6"
              >
                <h4 className="flex items-center gap-2.5 text-[1.05rem] text-white">
                  <span aria-hidden className="text-xl">
                    {insight.icon}
                  </span>
                  {insight.title}
                </h4>
                <p className="mt-2.5 text-[0.95rem] font-medium leading-relaxed text-brand-offwhite/80">
                  {insight.body}
                </p>
              </motion.div>
            ))}

            {freeText.trim() && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45 }}
                className="rounded-2xl border border-brand-cyan/25 bg-brand-cyan/[0.06] p-5 sm:p-6"
              >
                <h4 className="flex items-center gap-2.5 text-[1.05rem] text-white">
                  <span aria-hidden className="text-xl">
                    📌
                  </span>
                  המשימה שסימנת
                </h4>
                <p className="mt-2.5 border-r-2 border-brand-cyan/40 pr-3 text-[0.95rem] font-medium italic leading-relaxed text-brand-offwhite/90">
                  {freeText.trim()}
                </p>
                <p className="mt-3 text-[0.95rem] font-medium leading-relaxed text-brand-offwhite/75">
                  זו בדיוק סוג המשימה שנתחיל ממנה — בדרך כלל אפשר להוריד אותה מהשולחן שלך כמעט לגמרי.
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* --- CTA וטופס --- */}
        <div className="mt-14 rounded-3xl border border-white/12 bg-white/[0.055] p-6 sm:p-8">
          <h3 className="text-2xl text-white sm:text-[1.75rem]">
            רוצים לדעת מה בדיוק אפשר להפוך לאוטומטי אצלכם?
          </h3>
          <p className="mt-3 text-[1rem] font-medium leading-relaxed text-brand-offwhite/85">
            אני מציע סקירה ראשונית בחינם שבה נעבור על העסק, נזהה צווארי בקבוק ותהליכים ידניים,
            ונראה איפה אפשר לחסוך זמן ועבודה.
          </p>

          <div className="mt-7">
            <QuizLeadForm answers={answers} freeText={freeText} score={score} insights={insights} />
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={onRestart}
            className="text-sm font-medium text-brand-offwhite/50 underline-offset-4 transition-colors hover:text-brand-cyan hover:underline"
          >
            למילוי השאלון מחדש
          </button>
        </div>
      </div>
    </section>
  );
}
