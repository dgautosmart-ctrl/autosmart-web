"use client";

import type { ReactNode } from "react";
import { useContactModal } from "@/components/contact/ContactModalContext";

type ContactModalTriggerProps = {
  className?: string;
  children: ReactNode;
};

export default function ContactModalTrigger({ className, children }: ContactModalTriggerProps) {
  const { open } = useContactModal();

  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
