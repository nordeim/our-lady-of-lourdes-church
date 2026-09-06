import { cn } from "@/utils/cn";
import { categoryTone } from "@/utils/categoryTone";
import type { EventItem } from "@/data/content";

export function EventMeta({
  category,
  date,
  className,
}: {
  category: EventItem["category"];
  date: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <span
        className={cn(
          "rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider",
          categoryTone(category),
        )}
      >
        {category}
      </span>
      <span className="font-display text-sm text-bsc-sapphire-800">{date}</span>
    </div>
  );
}
