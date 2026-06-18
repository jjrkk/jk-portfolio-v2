"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

function ClipboardIcon({ bgFill }: { bgFill?: string }) {
  return (
    <svg width="13" height="14" viewBox="0 0 13 14" fill="none" aria-hidden>
      <rect x="2" y="3.5" width="9" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="4.5" y="0.5" width="4" height="4" rx="1" fill={bgFill ?? "var(--background,#f7f5f2)"} stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
      <path d="M2 6.5L5 9.5L11 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function EmailCopyButton({
  email,
  dark,
  className,
}: {
  email: string;
  dark?: boolean;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const el = document.createElement("textarea");
      el.value = email;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <span className="relative inline-flex">
      <span
        aria-live="polite"
        className={cn(
          "pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] transition-all duration-200",
          dark ? "bg-white text-[#D7355D]" : "bg-foreground text-background",
          copied ? "opacity-100 -translate-y-1" : "opacity-0 translate-y-0",
        )}
      >
        Copied!
      </span>
      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          "group inline-flex cursor-pointer items-center gap-2 font-sans text-caption font-medium uppercase tracking-[0.12em] transition-colors",
          dark ? "text-white/90 hover:text-white" : "text-foreground hover:text-accent",
          className,
        )}
      >
        {email}
        <span className="transition-transform duration-200 group-hover:scale-110">
          {copied ? <CheckIcon /> : <ClipboardIcon bgFill={dark ? "#D7355D" : undefined} />}
        </span>
      </button>
    </span>
  );
}
