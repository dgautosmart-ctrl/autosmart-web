"use client";

import { useEffect, useState } from "react";
import { scrollToForm } from "@/components/lp/CtaButton";
import { TapIcon, useTapIcon } from "@/components/TapIcon";

export default function MobileStickyCta() {
  const [show, setShow] = useState(false);
  const { tapped, tap } = useTapIcon();

  useEffect(() => {
    const onScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >
        document.body.offsetHeight - window.innerHeight * 1.1;
      setShow(window.scrollY > window.innerHeight * 0.9 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-3 pb-3 transition-all duration-300 sm:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <button
        type="button"
        onClick={() => {
          tap();
          scrollToForm();
        }}
        className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-accent to-accent-bright px-6 py-3.5 text-base font-bold text-navy shadow-[0_-8px_40px_-6px_rgba(43,147,201,0.6)]"
      >
        אני רוצה לבדוק את הרשימה
        <TapIcon tapped={tapped} className="h-4 w-4" />
      </button>
    </div>
  );
}
