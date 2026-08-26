"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { CONTACT } from "@/lib/site-config";

const inputClasses =
  "w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-brand-offwhite placeholder:text-brand-offwhite/40 focus:border-brand-cyan focus:outline-none";

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

type Status = "idle" | "submitting" | "success" | "error";

const DEFAULT_SUCCESS_MESSAGE = "תודה! קיבלנו את הפנייה שלכם ונחזור אליכם בהקדם.";

type ContactFormBodyProps = {
  onSuccess?: () => void;
  /** Prefix used to build the email subject, e.g. "פנייה חדשה מהאתר" -> "... מ-<שם>" */
  subjectPrefix?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  submitLabel?: string;
  successMessage?: ReactNode;
  showMessageField?: boolean;
};

export default function ContactFormBody({
  onSuccess,
  subjectPrefix = "פנייה חדשה מהאתר",
  messageLabel = "קצת על העסק שלכם",
  messagePlaceholder = "במה אתם עוסקים, ומה מעניין אתכם לייעל?",
  submitLabel = "שליחה",
  successMessage = DEFAULT_SUCCESS_MESSAGE,
  showMessageField = true,
}: ContactFormBodyProps) {
  const [status, setStatus] = useState<Status>("idle");
  const idPrefix = useId();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", `${subjectPrefix} מ-${formData.get("name")}`);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        setStatus("success");
        form.reset();
        onSuccess?.();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="rounded-lg bg-white/10 px-6 py-8 text-center text-brand-cyan">
        {successMessage}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!WEB3FORMS_ACCESS_KEY && (
        <p className="rounded-lg bg-yellow-400/10 px-4 py-3 text-sm text-yellow-200">
          ⚠ מפתח השליחה עדיין לא הוגדר - הטופס לא ישלח בפועל. פרטים בקובץ
          .env.local
        </p>
      )}

      <div>
        <label htmlFor={`${idPrefix}-name`} className="mb-1 block text-sm font-medium">
          שם מלא
        </label>
        <input
          id={`${idPrefix}-name`}
          name="name"
          type="text"
          required
          className={inputClasses}
          placeholder="איך קוראים לכם?"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${idPrefix}-phone`} className="mb-1 block text-sm font-medium">
            טלפון
          </label>
          <input
            id={`${idPrefix}-phone`}
            name="phone"
            type="tel"
            required
            className={inputClasses}
            placeholder="050-0000000"
          />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-email`} className="mb-1 block text-sm font-medium">
            מייל
          </label>
          <input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            required
            className={inputClasses}
            placeholder="name@example.com"
          />
        </div>
      </div>
      {showMessageField && (
        <div>
          <label htmlFor={`${idPrefix}-message`} className="mb-1 block text-sm font-medium">
            {messageLabel}
          </label>
          <textarea
            id={`${idPrefix}-message`}
            name="message"
            rows={4}
            className={inputClasses}
            placeholder={messagePlaceholder}
          />
        </div>
      )}

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
        className="w-full rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-blue/30 transition-all hover:scale-[1.02] hover:bg-brand-cyan hover:text-brand-navy hover:shadow-brand-cyan/40 disabled:cursor-not-allowed disabled:scale-100 disabled:opacity-60 sm:text-base"
      >
        {status === "submitting" ? "שולח..." : submitLabel}
      </button>
    </form>
  );
}
