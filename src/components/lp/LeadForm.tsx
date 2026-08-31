"use client";

import { useId, useState, type FormEvent } from "react";
import { CONTACT, WEB3FORMS_ACCESS_KEY } from "@/lib/lp-config";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full rounded-xl border border-hairline-bright bg-surface-2 px-4 py-3 text-text placeholder:text-text-faint transition-colors focus:border-accent-bright focus:outline-none focus:ring-2 focus:ring-accent-bright/30";

export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const uid = useId();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = new FormData(form);
    data.append("access_key", WEB3FORMS_ACCESS_KEY);
    data.append("subject", `בדיקת רשימת לקוחות מ-${data.get("name")}`);
    data.append("from_name", "AutoSmart · דף מכירות חוזרות");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="rounded-2xl border border-accent-bright/30 bg-navy/40 px-6 py-10 text-center text-lg text-accent-bright">
        תודה! קיבלנו את הפנייה שלכם ונחזור אליכם בהקדם.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!WEB3FORMS_ACCESS_KEY && (
        <p className="rounded-xl bg-yellow-400/10 px-4 py-3 text-sm text-yellow-200">
          ⚠ מפתח השליחה עדיין לא הוגדר - הטופס לא ישלח בפועל. יש להגדיר
          NEXT_PUBLIC_WEB3FORMS_KEY בקובץ ‎.env.local
        </p>
      )}

      <div>
        <label htmlFor={`${uid}-name`} className="mb-1.5 block text-sm font-medium text-text-soft">
          שם
        </label>
        <input id={`${uid}-name`} name="name" type="text" autoComplete="name" required className={inputClasses} />
      </div>

      <div>
        <label htmlFor={`${uid}-phone`} className="mb-1.5 block text-sm font-medium text-text-soft">
          טלפון
        </label>
        <input
          id={`${uid}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          className={inputClasses}
          placeholder="050-0000000"
        />
      </div>

      <div>
        <label htmlFor={`${uid}-email`} className="mb-1.5 block text-sm font-medium text-text-soft">
          מייל
        </label>
        <input
          id={`${uid}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          className={inputClasses}
          placeholder="name@example.com"
        />
      </div>

      <div>
        <label htmlFor={`${uid}-business`} className="mb-1.5 block text-sm font-medium text-text-soft">
          שם העסק
        </label>
        <input id={`${uid}-business`} name="business" type="text" autoComplete="organization" required className={inputClasses} />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-300">
          משהו השתבש בשליחה. אפשר לנסות שוב, או לפנות ישירות ב
          <a
            href={`https://wa.me/${CONTACT.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-accent-bright"
          >
            וואטסאפ
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 w-full rounded-full bg-gradient-to-l from-accent to-accent-bright px-6 py-4 text-base font-bold text-navy shadow-[0_18px_50px_-12px_var(--accent-glow)] transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_70px_-10px_var(--accent-glow)] disabled:translate-y-0 disabled:opacity-60"
      >
        {status === "submitting" ? "שולח..." : "בדקו איתי את רשימת הלקוחות"}
      </button>

      <p className="pt-1 text-center text-sm text-text-dim">
        בלי התחייבות. קודם נבין אם זה בכלל מתאים לעסק שלך.
      </p>
    </form>
  );
}
