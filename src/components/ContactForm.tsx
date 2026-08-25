"use client";

import { useState, type FormEvent } from "react";
import { CONTACT } from "@/lib/site-config";

const inputClasses =
  "w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-brand-offwhite placeholder:text-brand-offwhite/40 focus:border-brand-cyan focus:outline-none";

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", `פנייה חדשה מהאתר מ-${formData.get("name")}`);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-br from-brand-navy to-brand-navy-light text-brand-offwhite"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-cyan/15 blur-3xl"
      />
      <div className="relative mx-auto max-w-2xl px-4 py-16 sm:py-20">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">בואו נדבר</h2>
          <p className="mt-2 text-brand-offwhite/70">
            ספרו לנו קצת על העסק שלכם ונחזור אליכם בהקדם
          </p>
        </div>

        {status === "success" ? (
          <p className="rounded-lg bg-white/10 px-6 py-8 text-center text-brand-cyan">
            תודה! קיבלנו את הפנייה שלכם ונחזור אליכם בהקדם.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {!WEB3FORMS_ACCESS_KEY && (
              <p className="rounded-lg bg-yellow-400/10 px-4 py-3 text-sm text-yellow-200">
                ⚠ מפתח השליחה עדיין לא הוגדר - הטופס לא ישלח בפועל. פרטים
                בקובץ .env.local
              </p>
            )}

            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium">
                שם מלא
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className={inputClasses}
                placeholder="איך קוראים לכם?"
              />
            </div>
            <div>
              <label htmlFor="contact" className="mb-1 block text-sm font-medium">
                טלפון או מייל
              </label>
              <input
                id="contact"
                name="contact"
                type="text"
                required
                className={inputClasses}
                placeholder="איך ניצור איתכם קשר?"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium">
                קצת על העסק שלכם
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className={inputClasses}
                placeholder="במה אתם עוסקים, ומה מעניין אתכם לייעל?"
              />
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
              className="w-full rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-blue/30 transition-all hover:scale-[1.02] hover:bg-brand-cyan hover:text-brand-navy hover:shadow-brand-cyan/40 disabled:cursor-not-allowed disabled:scale-100 disabled:opacity-60 sm:text-base"
            >
              {status === "submitting" ? "שולח..." : "שליחה"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
