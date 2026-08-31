"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Section, Container } from "@/components/lp/primitives";
import CtaButton from "@/components/lp/CtaButton";
import { TapIcon, useTapIcon } from "@/components/TapIcon";

type Answer = "ask" | "yes" | "no";

const RESULT = {
  yes: {
    title: "מעולה. כנראה שיש מה לבדוק.",
    text: "יכול להיות שבתוך רשימת הלקוחות שכבר קיימת אצלך נמצאות הזדמנויות למכירות נוספות — בלי להתחיל בכל פעם מאפס.",
    cta: "אני רוצה לבדוק את הרשימה שלי",
  },
  no: {
    title: "זה בסדר. אפשר להתחיל מבדיקה פשוטה.",
    text: "נבדוק יחד איפה נמצאים הלקוחות שלך היום, כמה מהם קיימים ומה אפשר לעשות עם הרשימה.",
    cta: "בואו נבדוק",
  },
} as const;

/** Section 14 — interactive qualification. */
export default function QualificationSection() {
  const [answer, setAnswer] = useState<Answer>("ask");
  const yesTap = useTapIcon();
  const noTap = useTapIcon();

  return (
    <Section className="overflow-hidden bg-bg-2">
      <div
        aria-hidden
        className="glow glow-soft absolute left-1/2 top-1/2 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
      />
      <Container size="narrow" className="text-center">
        <AnimatePresence mode="wait">
          {answer === "ask" ? (
            <motion.div
              key="ask"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-3xl sm:text-5xl lg:text-6xl">
                עברו אצלך בעסק יותר מ־100 לקוחות?
              </h2>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    yesTap.tap();
                    setAnswer("yes");
                  }}
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-l from-accent to-accent-bright px-10 py-4 text-lg font-bold text-navy shadow-[0_18px_50px_-12px_var(--accent-glow)] transition-transform hover:-translate-y-0.5 sm:w-auto"
                >
                  כן
                  <TapIcon tapped={yesTap.tapped} className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    noTap.tap();
                    setAnswer("no");
                  }}
                  className="group flex w-full items-center justify-center gap-2 rounded-full border border-hairline-bright bg-surface px-10 py-4 text-lg font-semibold text-text-soft transition-colors hover:border-accent-bright/60 hover:text-white sm:w-auto"
                >
                  לא בטוח
                  <TapIcon tapped={noTap.tapped} className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={answer}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="lit-soft text-3xl sm:text-5xl lg:text-6xl">
                {RESULT[answer].title}
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg text-text-soft sm:text-xl">
                {RESULT[answer].text}
              </p>
              <div className="mt-9 flex flex-col items-center gap-4">
                <CtaButton size="lg">{RESULT[answer].cta}</CtaButton>
                <button
                  type="button"
                  onClick={() => setAnswer("ask")}
                  aria-label="חזרה לשאלה"
                  className="grid h-9 w-9 place-items-center rounded-full border border-hairline text-text-dim transition-colors hover:border-hairline-bright hover:text-text"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 14 4 9l5-5M4 9h11a5 5 0 0 1 0 10h-1" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Section>
  );
}
