import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";
import type { FaqItem } from "@/data/content";

interface AccordionProps {
  items: FaqItem[];
}

export function Accordion({ items }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const last = items.length - 1;
    let next = index;
    if (event.key === "ArrowDown") next = index === last ? 0 : index + 1;
    if (event.key === "ArrowUp") next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    document.getElementById(`${baseId}-btn-${next}`)?.focus();
  };

  return (
    <div className="divide-y divide-bsc-stone/70 border-y border-bsc-stone/70">
      {items.map((item, index) => {
        const isOpen = open === index;
        const panelId = `${baseId}-panel-${index}`;
        const btnId = `${baseId}-btn-${index}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-lg font-semibold text-bsc-sapphire-900"
                onClick={() => setOpen(isOpen ? null : index)}
                onKeyDown={(event) => onKeyDown(event, index)}
              >
                {item.question}
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-bsc-gold-600 transition-transform",
                    isOpen && "rotate-180",
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              aria-hidden={!isOpen}
              inert={!isOpen ? true : undefined}
              className={cn("grid transition-[grid-template-rows] duration-300", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
            >
              <div className="overflow-hidden">
                <p className="pb-5 text-bsc-charcoal/90 leading-relaxed">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
