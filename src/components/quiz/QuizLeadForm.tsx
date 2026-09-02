"use client";

import { useId, useState, type FormEvent } from "react";
import { CONTACT } from "@/lib/site-config";
import { TapIcon, useTapIcon } from "@/components/TapIcon";
import { answerRecords } from "@/lib/quiz/scoring";
import type { Answers, Insight, QuizScore } from "@/lib/quiz/types";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-brand-offwhite placeholder:text-brand-offwhite/50 focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/20";

function track(event: string, params?: Record<string, unknown>) {
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.("event", event, params ?? {});
}

export default function QuizLeadForm({
  answers,
  freeText,
  score,
  insights,
}: {
  answers: Answers;
  freeText: string;
  score: QuizScore;
  insights: Insight[];
}) {
  const [status, setStatus] = useState<Status>("idle");
  const uid = useId();
  const { tapped, tap } = useTapIcon();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    tap();
    setStatus("submitting");

    const data = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          business: data.get("business"),
          variant: "quiz",
          source: "שאלון פוטנציאל אוטומציה",
          quiz: {
            version: 1,
            completedAt: new Date().toISOString(),
            score: {
              total: score.total,
              band: score.band,
              categories: score.categories,
            },
            estimate: score.estimate,
            answers: answerRecords(answers),
            freeText: freeText.trim() || null,
            insights: insights.map((insight) => insight.id),
          },
        }),
      });
      const result = await response.json();

      if (result.success) {
        setStatus("success");
        track("quiz_lead", { score: score.total, band: score.band });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-white/10 px-6 py-8 text-center">
        <p className="text-lg font-semibold text-brand-cyan">תודה, קיבלתי את הפרטים 👍</p>
        <p className="mt-2.5 text-[0.97rem] font-medium leading-relaxed text-brand-offwhite/80">
          כל התשובות שלך מהשאלון נשלחו יחד עם הפרטים, כך שאגיע לשיחה כשאני כבר מכיר את העסק.
          אחזור אליך במהלך יום העסקים הקרוב.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      <div className="grid gap-3.5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-name`} className="mb-1.5 block text-sm font-medium text-brand-offwhite/90">
            שם
          </label>
          <input id={`${uid}-name`} name="name" type="text" required className={inputClasses} />
        </div>
        <div>
          <label htmlFor={`${uid}-phone`} className="mb-1.5 block text-sm font-medium text-brand-offwhite/90">
            טלפון
          </label>
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            required
            placeholder="050-0000000"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className="mb-1.5 block text-sm font-medium text-brand-offwhite/90">
            אימייל
          </label>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            required
            placeholder="name@example.com"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor={`${uid}-business`} className="mb-1.5 block text-sm font-medium text-brand-offwhite/90">
            שם העסק <span className="font-normal text-brand-offwhite/50">(אופציונלי)</span>
          </label>
          <input id={`${uid}-business`} name="business" type="text" className={inputClasses} />
        </div>
      </div>

      {status === "error" && (
        <p className="text-sm text-red-300">
          משהו השתבש בשליחה. אפשר לנסות שוב, או לפנות ישירות ב
          <a
            href={`https://wa.me/${CONTACT.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-brand-cyan"
          >
            וואטסאפ
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-l from-brand-blue to-brand-cyan px-6 py-4 text-base font-semibold text-brand-navy shadow-lg shadow-brand-blue/25 transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:scale-100 disabled:opacity-60"
      >
        {status === "submitting" ? "שולח..." : "אני רוצה סקירה בחינם"}
        {status !== "submitting" && <TapIcon tapped={tapped} className="h-5 w-5" />}
      </button>

      <p className="text-center text-xs font-normal text-brand-offwhite/50">
        הפרטים נשמרים אצלנו בלבד ומשמשים ליצירת קשר איתך. ללא התחייבות.
      </p>
    </form>
  );
}
