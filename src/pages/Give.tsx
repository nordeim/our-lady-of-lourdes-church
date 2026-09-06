import { Globe, Church, BookOpen, Heart, Flame, Sprout } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { givingOptions, images } from "@/data/content";
import { site } from "@/data/site";
import { cn } from "@/utils/cn";

const icons: Record<string, LucideIcon> = {
  globe: Globe,
  church: Church,
  book: BookOpen,
  heart: Heart,
  flame: Flame,
  sprout: Sprout,
};

export function Give() {
  return (
    <>
      <PageHero
        title="Stewardship & Generosity"
        subtitle="This national monument is kept by gifts — of money, of time, of the poor remembered by name."
        image={images.hero}
      />
      <section className="bg-bsc-cream py-16 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Give"
            title="Support the parish."
            description={`Cheques payable to ${site.chequePayee}. Confirm PayNow details with the office before transferring.`}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {givingOptions.map((option, i) => {
              const Icon = icons[option.icon] ?? Heart;
              const featured = i === 0;
              return (
                <Reveal key={option.title} delay={i * 50}>
                  <article
                    className={cn(
                      "card-lift h-full rounded-md border p-6",
                      featured
                        ? "border-bsc-gold-400 bg-bsc-sapphire-950 text-bsc-cream"
                        : "border-bsc-stone bg-bsc-parchment",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-6 w-6",
                        featured ? "text-bsc-gold-300" : "text-bsc-gold-700",
                      )}
                      aria-hidden="true"
                    />
                    <h3
                      className={cn(
                        "mt-4 font-display text-xl font-semibold",
                        featured ? "text-bsc-cream" : "text-bsc-sapphire-900",
                      )}
                    >
                      {option.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-3 text-sm leading-relaxed",
                        featured ? "text-bsc-cream/80" : "text-bsc-charcoal/90",
                      )}
                    >
                      {option.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>
      <section className="bg-gold-bloom bg-bsc-sapphire-950 py-16 text-bsc-cream">
        <Container className="relative z-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-bsc-gold-300">
            Parish office
          </p>
          <p className="mt-3 font-display text-2xl">{site.contact.officePhone}</p>
          <p className="mt-2 text-bsc-cream/70">{site.hours.office}</p>
        </Container>
      </section>
    </>
  );
}
