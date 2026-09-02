"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FREE_TEXT, QUESTIONS, TOTAL_STEPS } from "@/lib/quiz/questions";
import { scoreQuiz } from "@/lib/quiz/scoring";
import { buildInsights } from "@/lib/quiz/insights";
import type { Answers } from "@/lib/quiz/types";
import QuizIntro from "./QuizIntro";
import QuizProgress from "./QuizProgress";
import QuestionCard from "./QuestionCard";
import QuizResult from "./QuizResult";

type Phase = "intro" | "questions" | "result";

/** כל מצב השאלון באובייקט אחד, כדי שהשחזור מ-localStorage יהיה עדכון יחיד. */
type QuizState = {
  phase: Phase;
  index: number;
  answers: Answers;
  freeText: string;
};

const INITIAL: QuizState = { phase: "intro", index: 0, answers: {}, freeText: "" };

const STORAGE_KEY = "autosmart-quiz-v1";
/** השהיה קצרה אחרי בחירה, כדי שהמשתמש יספיק לראות מה הוא סימן. */
const ADVANCE_MS = 280;

function track(event: string, params?: Record<string, unknown>) {
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.("event", event, params ?? {});
}

/** קריאת התקדמות שמורה. מוחזר `null` כשאין מה לשחזר או שהאחסון חסום. */
function readSaved(): QuizState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw) as Partial<QuizState>;
    if (!saved.phase || saved.phase === "intro") return null;
    return {
      phase: saved.phase,
      index: Math.min(saved.index ?? 0, TOTAL_STEPS - 1),
      answers: saved.answers ?? {},
      freeText: saved.freeText ?? "",
    };
  } catch {
    return null;
  }
}

export default function AutomationQuiz() {
  const [state, setState] = useState<QuizState>(INITIAL);
  const [direction, setDirection] = useState(1);
  const [restored, setRestored] = useState(false);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { phase, index, answers, freeText } = state;

  // שחזור התקדמות אחרי רענון דף. חייב לרוץ אחרי ההידרציה - השרת לא יכול לדעת
  // מה שמור בדפדפן, ורינדור ראשוני שונה ממנו היה יוצר hydration mismatch.
  useEffect(() => {
    const saved = readSaved();
    // שני העדכונים חייבים לנחות באותו רינדור: אפקט השמירה למטה תלוי ב-`restored`
    // כדי לא לדרוס את מה ששמור באחסון לפני שהשחזור הספיק להיכנס למצב.
    /* eslint-disable react-hooks/set-state-in-effect */
    setState((prev) => saved ?? prev);
    setRestored(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!restored) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // אחסון חסום (גלישה פרטית וכד') - ההתקדמות פשוט לא תישמר.
    }
  }, [restored, state]);

  useEffect(
    () => () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    },
    [],
  );

  const goTo = useCallback((next: number, dir: number) => {
    setDirection(dir);
    if (next >= TOTAL_STEPS) {
      setState((prev) => ({ ...prev, phase: "result" }));
      track("quiz_complete");
      return;
    }
    setState((prev) => ({ ...prev, index: Math.max(0, next) }));
  }, []);

  const back = useCallback(() => {
    if (index === 0) {
      setDirection(-1);
      setState((prev) => ({ ...prev, phase: "intro" }));
      return;
    }
    goTo(index - 1, -1);
  }, [index, goTo]);

  const select = useCallback(
    (questionId: string, value: string) => {
      if (advanceTimer.current) return; // מונע לחיצה כפולה בזמן המעבר
      setState((prev) => ({ ...prev, answers: { ...prev.answers, [questionId]: value } }));
      track("quiz_progress", { step: index + 1 });
      advanceTimer.current = setTimeout(() => {
        advanceTimer.current = null;
        goTo(index + 1, 1);
      }, ADVANCE_MS);
    },
    [index, goTo],
  );

  const question = index < QUESTIONS.length ? QUESTIONS[index] : null;

  // קיצורי מקלדת: ספרות לבחירה, Backspace לחזרה.
  useEffect(() => {
    if (phase !== "questions") return;
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      if (event.key === "Backspace") {
        event.preventDefault();
        back();
        return;
      }
      if (!question) return;
      const digit = Number(event.key);
      if (Number.isInteger(digit) && digit >= 1 && digit <= question.options.length) {
        select(question.id, question.options[digit - 1].value);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, question, select, back]);

  // גלילה עדינה לראש הכרטיס במעבר בין שאלות, כדי שהשאלה תמיד תהיה בפריים במובייל.
  useEffect(() => {
    if (phase !== "questions" || index === 0) return;
    const top = cardRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [phase, index]);

  if (phase === "result") {
    const score = scoreQuiz(answers);
    return (
      <QuizResult
        answers={answers}
        freeText={freeText}
        score={score}
        insights={buildInsights(answers, score)}
        onRestart={() => {
          try {
            window.localStorage.removeItem(STORAGE_KEY);
          } catch {
            // מתעלמים - איפוס המצב בזיכרון מספיק.
          }
          setState(INITIAL);
        }}
      />
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-offwhite to-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[46rem] -translate-x-1/2 rounded-full bg-brand-blue/[0.07] blur-3xl"
      />

      <div className="relative mx-auto max-w-2xl px-4 py-14 sm:py-20">
        {phase === "intro" ? (
          <QuizIntro
            onStart={() => {
              setDirection(1);
              setState((prev) => ({ ...prev, phase: "questions" }));
              track("quiz_start");
            }}
          />
        ) : (
          <div
            ref={cardRef}
            className="scroll-mt-24 rounded-3xl border border-brand-navy/[0.07] bg-white/85 p-5 shadow-[0_20px_60px_-32px_rgba(10,36,64,0.45)] backdrop-blur-sm sm:p-8"
          >
            <QuizProgress step={index + 1} total={TOTAL_STEPS} onBack={back} />

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                initial={{ opacity: 0, x: direction > 0 ? -28 : 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? 28 : -28 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                {question ? (
                  <QuestionCard
                    question={question}
                    selected={answers[question.id]}
                    onSelect={(value) => select(question.id, value)}
                  />
                ) : (
                  <div>
                    <h2 className="text-xl text-brand-navy sm:text-2xl">{FREE_TEXT.title}</h2>
                    <p className="mt-2 text-sm font-normal leading-relaxed text-brand-navy/65">
                      {FREE_TEXT.hint}
                    </p>
                    <textarea
                      value={freeText}
                      onChange={(event) =>
                        setState((prev) => ({ ...prev, freeText: event.target.value }))
                      }
                      rows={4}
                      maxLength={600}
                      placeholder={FREE_TEXT.placeholder}
                      className="mt-5 w-full rounded-2xl border border-brand-navy/10 bg-white px-4 py-3.5 text-[0.97rem] font-medium text-brand-navy placeholder:font-normal placeholder:text-brand-navy/40 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                    />
                    <div className="mt-5 flex flex-col-reverse gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="button"
                        onClick={() => goTo(TOTAL_STEPS, 1)}
                        className="rounded-full px-4 py-2.5 text-sm font-medium text-brand-navy/55 transition-colors hover:text-brand-blue"
                      >
                        דילוג וקבלת התוצאה
                      </button>
                      <button
                        type="button"
                        onClick={() => goTo(TOTAL_STEPS, 1)}
                        className="rounded-full bg-gradient-to-l from-brand-blue to-brand-cyan px-7 py-3.5 text-sm font-semibold text-brand-navy shadow-lg shadow-brand-blue/25 transition-transform hover:scale-[1.02] sm:text-base"
                      >
                        לצפייה בתוצאה
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
