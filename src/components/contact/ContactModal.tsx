"use client";

import { useEffect } from "react";
import { useContactModal } from "@/components/contact/ContactModalContext";
import ContactFormBody from "@/components/contact/ContactFormBody";

export default function ContactModal() {
  const { isOpen, close } = useContactModal();

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-heading"
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto p-4"
    >
      <div
        aria-hidden
        onClick={close}
        className="fixed inset-0 bg-brand-navy/80 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-gradient-to-br from-brand-navy to-brand-navy-light p-6 text-brand-offwhite shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={close}
          aria-label="סגירה"
          className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-brand-offwhite/70 transition-colors hover:bg-white/10 hover:text-brand-offwhite"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-6 text-center">
          <h2 id="contact-modal-heading" className="text-2xl font-bold">
            בואו נדבר
          </h2>
          <p className="mt-2 text-brand-offwhite/70">
            ספרו לנו קצת על העסק שלכם ונחזור אליכם בהקדם
          </p>
        </div>

        <ContactFormBody />
      </div>
    </div>
  );
}
