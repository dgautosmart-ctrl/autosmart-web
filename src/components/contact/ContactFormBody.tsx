"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { CONTACT } from "@/lib/site-config";
import { TapIcon, useTapIcon } from "@/components/TapIcon";

const inputClasses =
  "w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-brand-offwhite placeholder:text-brand-offwhite/55 focus:border-brand-cyan focus:outline-none";

type Status = "idle" | "submitting" | "success" | "error";

const DEFAULT_SUCCESS_MESSAGE = "תודה! קיבלנו את הפנייה שלכם ונחזור אליכם בהקדם.";

type ContactFormBodyProps = {
  onSuccess?: () => void;
  /** Prefix used to build the email subject, e.g. "פנייה חדשה מהאתר" -> "... מ-<שם>" */
  subjectPrefix?: string;
  /** בוחר את נוסח המיילים ב-/api/lead. ברירת מחדל: טופס האתר הרגיל. */
  variant?: "site" | "returning";
  messageLabel?: string;
  messagePlaceholder?: string;
  submitLabel?: string;
  successMessage?: ReactNode;
  showMessageField?: boolean;
};

export default function ContactFormBody({
  onSuccess,
  subjectPrefix = "פנייה חדשה מהאתר",
  variant = "site",
  messageLabel = "קצת על העסק שלכם",
  messagePlaceholder = "במה אתם עוסקים, ומה תרצו לשפר או לקדם?",
  submitLabel = "שליחה",
  successMessage = DEFAULT_SUCCESS_MESSAGE,
  showMessageField = true,
}: ContactFormBodyProps) {
  const [status, setStatus] = useState<Status>("idle");
  const idPrefix = useId();
  const { tapped, tap } = useTapIcon();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    tap();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          message: formData.get("message"),
          source: subjectPrefix,
          variant,
        }),
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
        className="group flex w-full items-center justify-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-blue/30 transition-all hover:scale-[1.02] hover:bg-brand-cyan hover:text-brand-navy hover:shadow-brand-cyan/40 disabled:cursor-not-allowed disabled:scale-100 disabled:opacity-60 sm:text-base"
      >
        {status === "submitting" ? "שולח..." : submitLabel}
        {status !== "submitting" && <TapIcon tapped={tapped} className="h-4 w-4" />}
      </button>
    </form>
  );
}
