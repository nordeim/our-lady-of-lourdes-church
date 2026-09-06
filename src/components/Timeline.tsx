import { useEffect, useRef } from "react";
import { cn } from "@/utils/cn";
import { Reveal } from "@/components/ui/Reveal";
import type { TimelineEntry } from "@/data/content";

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          rail.classList.remove("scale-y-0");
          rail.classList.add("scale-y-100");
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(rail);
    return () => observer.disconnect();
  }, []);

  return (
    <ol className="relative space-y-10 pl-10 sm:pl-14">
      <div
        ref={railRef}
        data-testid="timeline-rail"
        className="absolute top-2 bottom-2 left-[11px] w-px origin-top scale-y-0 bg-gradient-to-b from-bsc-sapphire-400 via-bsc-gold-400/70 to-bsc-gold-500 transition-transform duration-1000 sm:left-[15px]"
      />
      {entries.map((entry, index) => (
        <Reveal as="li" key={entry.year} delay={index * 60} className="relative">
          <span
            className={cn(
              "absolute -left-10 top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-bsc-gold-400 bg-bsc-cream sm:-left-[3.15rem]",
              index === 0 && "dot-pulse",
            )}
            aria-hidden="true"
          />
          <p className="font-display text-sm font-semibold tracking-wide text-bsc-gold-700">
            {entry.year}
          </p>
          <h3 className="mt-1 font-display text-xl font-semibold text-bsc-sapphire-900">
            {entry.title}
          </h3>
          <p className="mt-2 max-w-prose leading-relaxed text-bsc-charcoal/90">{entry.description}</p>
        </Reveal>
      ))}
    </ol>
  );
}
