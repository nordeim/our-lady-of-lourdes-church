import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/utils/cn";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const THRESHOLD = 480;
const SIZE = 44;
const STROKE = 2.5;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const progress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hide = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={hide}
      onFocus={(event) => {
        if (!visible) event.currentTarget.blur();
      }}
      className={cn(
        "fixed bottom-6 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-bsc-gold-400/50 bg-bsc-sapphire-950 text-bsc-gold-300 shadow-bsc transition-opacity",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <svg
        data-testid="back-to-top-progress"
        className="absolute inset-0"
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-hidden="true"
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE}
          className="text-bsc-sapphire-700"
        />
        <circle
          data-progress
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
          className="text-bsc-gold-400"
          transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
        />
      </svg>
      <ArrowUp className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
