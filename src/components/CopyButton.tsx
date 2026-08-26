"use client";

import { useState } from "react";

type CopyButtonProps = {
  value: string;
  label: string;
};

export default function CopyButton({ value, label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard access unavailable/blocked - nothing to fall back to
    }
  }

  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        onClick={handleCopy}
        aria-label={label}
        className="inline-flex h-5 w-5 items-center justify-center rounded text-brand-offwhite/50 transition-colors hover:text-brand-cyan"
      >
        {copied ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15V5a2 2 0 0 1 2-2h10" />
          </svg>
        )}
      </button>
      {copied && (
        <span className="pointer-events-none absolute -top-7 right-1/2 translate-x-1/2 whitespace-nowrap rounded-md bg-brand-cyan px-2 py-0.5 text-[10px] font-semibold text-brand-navy shadow">
          הועתק!
        </span>
      )}
    </span>
  );
}
