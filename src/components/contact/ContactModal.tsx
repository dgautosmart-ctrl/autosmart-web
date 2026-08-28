"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
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

    // Lock scrolling while the modal is open. On this site the scroll container
    // is <html>, so setting overflow on <body> alone leaves the page scrollbar
    // visible behind the backdrop - lock <html> instead. `overflow` (shorthand)
    // hides both axes, so no stray vertical or horizontal bar shows through.
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      root.style.overflow = previousOverflow;
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-heading"
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto p-4"
        >
          <motion.div
            aria-hidden
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-brand-navy/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-brand-navy to-brand-navy-light text-brand-offwhite shadow-2xl shadow-brand-blue/20"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-16 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-brand-cyan/20 blur-3xl"
            />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-glow opacity-40" />

            <div className="relative flex items-center justify-between border-b border-white/10 px-4 py-2.5 sm:px-5">
              <div className="flex items-center gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              </div>
              <span className="flex items-center gap-1.5 text-xs font-medium text-brand-offwhite/60">
                <span className="h-2 w-2 rounded-full bg-brand-cyan animate-pulse-dot" />
                טופס פנייה מאובטח
              </span>
              <button
                type="button"
                onClick={close}
                aria-label="סגירה"
                className="flex h-7 w-7 items-center justify-center rounded-full text-brand-offwhite/70 transition-colors hover:bg-white/10 hover:text-brand-offwhite"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="relative p-6 sm:p-8">
              <div className="mb-6 text-center">
                <h2 id="contact-modal-heading" className="text-2xl font-bold">
                  בואו נדבר
                </h2>
                <p className="mt-2 text-brand-offwhite/85">
                  ספרו לנו קצת על העסק שלכם ונחזור אליכם בהקדם
                </p>
              </div>

              <ContactFormBody />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
