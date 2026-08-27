"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useContactModal } from "@/components/contact/ContactModalContext";
import ContactFormBody from "@/components/contact/ContactFormBody";

// --- ניתן לערוך כאן את הטקסטים, זמן ההופעה ותדירות ההצגה ---
const SHOW_AFTER_MS = 10_000; // כמה זמן לחכות לפני הופעה (אם אין Exit Intent קודם)
const REPEAT_AFTER_MS = 7 * 24 * 60 * 60 * 1000; // אחרי כמה זמן להציג שוב למשתמש שכבר ראה/סגר את הפופאפ

const TITLE = "איפה העסק שלך מאבד לקוחות ולידים?";
const BODY_LINES = [
  "רוצה לגלות איפה אפשר להביא לעסק יותר לקוחות?",
  "אני עושה סקירה קצרה ללא עלות ומזהה איפה לידים נופלים, מה בשיווק לא עובד ומה אפשר להפוך לאוטומטי.",
];
const SUBMIT_LABEL = "כן, תבדוק לי את העסק";
const SUBJECT_PREFIX = "בקשה לסקירה חינמית מהפופאפ";
const SUCCESS_MESSAGE = (
  <>
    מעולה, קיבלתי 👍
    <br />
    אעבור על הפרטים ואחזור אליך כדי להבין איפה אפשר להביא לעסק יותר לקוחות.
  </>
);
// -----------------------------------------------------------

const STORAGE_KEY = "autosmart-lead-popup-last-shown";

function isInCooldown(): boolean {
  try {
    const lastShown = Number(localStorage.getItem(STORAGE_KEY) ?? 0);
    return Date.now() - lastShown < REPEAT_AFTER_MS;
  } catch {
    return false;
  }
}

function markShown() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    // localStorage לא זמין (למשל גלישה פרטית) - הפופאפ עלול להופיע שוב, וזה בסדר
  }
}

export default function LeadPopup() {
  const { isOpen: contactModalOpen } = useContactModal();
  const [isOpen, setIsOpen] = useState(false);
  const triggeredRef = useRef(false);
  // Kept in sync so the mount-only trigger effect below can read the latest
  // value from its timeout/event callbacks without re-subscribing.
  const contactModalOpenRef = useRef(contactModalOpen);
  useEffect(() => {
    contactModalOpenRef.current = contactModalOpen;
  }, [contactModalOpen]);

  // Hide the popup whenever the contact modal is open, so the two never overlap.
  const visible = isOpen && !contactModalOpen;

  useEffect(() => {
    if (isInCooldown()) return;

    function trigger() {
      if (triggeredRef.current || contactModalOpenRef.current) return;
      triggeredRef.current = true;
      markShown();
      setIsOpen(true);
    }

    const timer = setTimeout(trigger, SHOW_AFTER_MS);

    const isDesktopPointer =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    function handleMouseLeave(event: MouseEvent) {
      if (event.clientY <= 0) trigger();
    }

    if (isDesktopPointer) {
      document.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  function close() {
    setIsOpen(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-popup-heading"
          className="fixed inset-0 z-[55] flex items-center justify-center overflow-y-auto p-4"
        >
          <motion.div
            aria-hidden
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-brand-navy/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-h-[calc(100vh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl border border-white/10 bg-gradient-to-br from-brand-navy to-brand-navy-light text-brand-offwhite shadow-2xl shadow-brand-blue/20"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-16 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-brand-cyan/20 blur-3xl"
            />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-glow opacity-40" />

            <button
              type="button"
              onClick={close}
              aria-label="סגירה"
              className="absolute left-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-brand-offwhite/70 transition-colors hover:bg-white/10 hover:text-brand-offwhite"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative p-6 pt-10 sm:p-8 sm:pt-10">
              <div className="mb-6 text-center">
                <h2 id="lead-popup-heading" className="text-xl font-bold sm:text-2xl">
                  {TITLE}
                </h2>
                <div className="mt-3 space-y-2 text-brand-offwhite/70">
                  {BODY_LINES.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>

              <ContactFormBody
                subjectPrefix={SUBJECT_PREFIX}
                submitLabel={SUBMIT_LABEL}
                successMessage={SUCCESS_MESSAGE}
                showMessageField={false}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
