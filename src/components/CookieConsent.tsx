"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";

// The banner is purely informational (nothing on the site is gated behind
// consent), so it's safe to hold it back briefly on mount. This keeps the
// very first paint of the page free of any fixed overlay, so primary CTAs
// (e.g. the hero buttons, which can sit low on short mobile screens) are
// always clickable the instant the page loads.
const SHOW_DELAY_MS = 1200;

const STORAGE_KEY = "autosmart-cookie-consent";
const CHANGE_EVENT = "autosmart-cookie-consent-change";

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  return () => window.removeEventListener(CHANGE_EVENT, callback);
}

function getSnapshot(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return true;
  }
}

// Assume consent was already handled during server rendering, so the
// banner never flashes before hydration confirms the real client state.
function getServerSnapshot(): boolean {
  return true;
}

export default function CookieConsent() {
  const consented = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // localStorage unavailable (e.g. private browsing) - banner will show again next visit
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

  if (consented || !ready) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-96">
      <div className="relative border-t border-brand-navy/10 bg-white p-4 text-right shadow-2xl shadow-brand-navy/15 sm:rounded-2xl sm:border sm:p-5">
        <button
          type="button"
          onClick={dismiss}
          aria-label="סגירה"
          className="absolute left-4 top-4 flex h-7 w-7 items-center justify-center rounded-full text-brand-navy/40 transition-colors hover:bg-brand-navy/5 hover:text-brand-navy"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="hidden pl-8 text-sm font-bold text-brand-navy sm:block">
          אנו שומרים על פרטיותכם
        </h2>

        <div className="flex flex-wrap items-center gap-3 pl-8 sm:block sm:pl-0">
          <p className="text-xs leading-relaxed text-brand-navy/70 sm:mt-2">
            באתר נעשה שימוש בעוגיות (Cookies) וכלים דומים לשיפור חוויית
            הגלישה, התאמת תוכן וביצוע ניתוח סטטיסטי. לפרטים ראו{" "}
            <Link
              href="/privacy-policy"
              className="font-medium text-brand-blue underline underline-offset-2 hover:text-brand-cyan"
            >
              מדיניות הפרטיות
            </Link>
            .
          </p>

          <button
            type="button"
            onClick={dismiss}
            className="shrink-0 rounded-full bg-brand-navy px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-blue sm:mt-4"
          >
            מאשר
          </button>
        </div>
      </div>
    </div>
  );
}
