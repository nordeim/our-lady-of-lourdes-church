import { cn } from "@/utils/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "gold-rule rule-draw max-w-2xl",
        align === "center" && "mx-auto text-center gold-rule",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-xs font-semibold uppercase tracking-[0.25em]",
            light ? "text-bsc-gold-300" : "text-bsc-gold-700",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl",
          light ? "text-bsc-cream" : "text-bsc-sapphire-900",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            light ? "text-bsc-cream/80" : "text-bsc-charcoal/80",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
