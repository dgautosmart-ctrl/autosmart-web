"use client";

import type { ReactNode } from "react";
import { useContactModal } from "@/components/contact/ContactModalContext";
import { TapIcon, useTapIcon } from "@/components/TapIcon";

type ContactModalTriggerProps = {
  className?: string;
  children: ReactNode;
  /** Set false for plain text/link triggers where a trailing icon would look wrong. */
  withIcon?: boolean;
};

export default function ContactModalTrigger({
  className,
  children,
  withIcon = true,
}: ContactModalTriggerProps) {
  const { open } = useContactModal();
  const { tapped, tap } = useTapIcon();

  return (
    <button
      type="button"
      onClick={() => {
        tap();
        open();
      }}
      className={`${withIcon ? "group inline-flex items-center justify-center gap-2 " : ""}${className ?? ""}`}
    >
      {children}
      {withIcon && <TapIcon tapped={tapped} className="h-4 w-4" />}
    </button>
  );
}
