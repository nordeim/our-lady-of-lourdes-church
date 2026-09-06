import { cn } from "@/utils/cn";

export function Emblem({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={cn("text-bsc-gold-400", className)}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="40" cy="40" r="37" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="40" cy="40" r="32" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      <path d="M40 14 L44 28 H36 Z" fill="currentColor" />
      <path
        d="M26 56 V36 L40 22 L54 36 V56"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M32 56 V44 H48 V56" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="40" cy="38" r="3" fill="currentColor" />
    </svg>
  );
}
