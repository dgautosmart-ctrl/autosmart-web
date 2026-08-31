"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { CONTACT } from "@/lib/lp-config";
import { TapIcon, useTapIcon } from "@/components/TapIcon";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "peer w-full rounded-xl border border-hairline-bright bg-white/[0.05] py-4 pr-12 pl-4 text-base text-text placeholder:text-text-faint transition-colors focus:border-accent-bright focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-accent-bright/25";

function Field({
  id,
  label,
  icon,
  children,
}: {
  id: string;
  label: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-text-soft">
        {label}
      </label>
      <div className="relative">
        {children}
        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-text-faint transition-colors peer-focus:text-accent-bright">
          {icon}
        </span>
      </div>
    </div>
  );
}

const icons = {
  user: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-[18px] w-[18px]">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 21a8 8 0 1 0-16 0M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-[18px] w-[18px]">
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 11.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7A2 2 0 0 1 22 19v-2.1Z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-[18px] w-[18px]">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9 6 9-6M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
    </svg>
  ),
};

export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const uid = useId();
  const { tapped, tap } = useTapIcon();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    tap();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          variant: "returning",
          source: "דף נחיתה: החזרת לקוחות (/returning-customers)",
        }),
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
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-accent-bright/30 bg-accent/10 px-6 py-12 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-accent-bright/15 text-accent-bright">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25} className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
          </svg>
        </span>
        <p className="text-lg text-accent-bright">
          תודה! קיבלנו את הפנייה שלכם ונחזור אליכם בהקדם.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field id={`${uid}-name`} label="שם" icon={icons.user}>
        <input id={`${uid}-name`} name="name" type="text" autoComplete="name" required className={inputClasses} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${uid}-phone`} label="טלפון" icon={icons.phone}>
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            className={inputClasses}
          />
        </Field>

        <Field id={`${uid}-email`} label="מייל" icon={icons.mail}>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            className={inputClasses}
          />
        </Field>
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
        className="group relative mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-l from-accent to-accent-bright px-6 py-4 text-base font-bold text-navy shadow-[0_20px_50px_-14px_var(--accent-glow)] transition-all hover:-translate-y-0.5 hover:shadow-[0_26px_70px_-12px_var(--accent-glow)] disabled:translate-y-0 disabled:opacity-60"
      >
        {status === "submitting" ? "שולח..." : "בדקו איתי את רשימת הלקוחות"}
        {status !== "submitting" && <TapIcon tapped={tapped} className="h-4 w-4" />}
      </button>

      <p className="flex items-center justify-center gap-1.5 text-center text-sm text-text-dim">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4 text-text-faint">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 4v5c0 4.4-3 8.5-7 9.5C8 20.5 5 16.4 5 12V7l7-4Z" />
        </svg>
        פנייה זו אינה כרוכה בהתחייבות. בשיחה קצרה נבחן יחד האם השירות מתאים לעסק שלך.
      </p>
    </form>
  );
}
