import { cn } from "@/utils/cn";
import { SafeImage } from "@/components/SafeImage";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image?: string;
  fallback?: string;
  compact?: boolean;
  variant?: "dusk" | "light";
  children?: React.ReactNode;
}

export function PageHero({
  title,
  subtitle,
  image,
  fallback = "/images/hero-church.jpg",
  compact = false,
  children,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-bsc-sapphire-950 text-bsc-cream",
        compact ? "min-h-[38vh] pt-28 pb-16" : "min-h-[52vh] pt-32 pb-20",
      )}
    >
      {image && (
        <div className="absolute inset-0">
          <SafeImage
            src={image}
            fallback={fallback}
            alt=""
            loading="eager"
            fetchPriority="high"
            className="hero-fade h-full w-full object-cover opacity-45"
          />
          <div className="scrim-page absolute inset-0" />
        </div>
      )}
      <div className="bg-grain pointer-events-none absolute inset-0" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <p className="rise-in text-xs font-semibold uppercase tracking-[0.3em] text-bsc-gold-300">
          Church of Our Lady of Lourdes
        </p>
        <h1 className="rise-in rise-in-d1 mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="rise-in rise-in-d2 mt-4 max-w-2xl text-lg text-bsc-cream/80">{subtitle}</p>
        )}
        {children && <div className="rise-in rise-in-d3 mt-8">{children}</div>}
      </div>
    </section>
  );
}
