import { useScrollProgress } from "@/hooks/useScrollProgress";

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      data-testid="scroll-progress"
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-transparent"
    >
      <div
        className="h-full bg-gradient-to-r from-bsc-gold-500 via-bsc-gold-300 to-bsc-gold-500"
        style={{ transform: `scaleX(${progress})`, transformOrigin: "left center" }}
      />
    </div>
  );
}
