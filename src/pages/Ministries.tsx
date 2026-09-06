import { Link } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/SafeImage";
import { Button } from "@/components/ui/Button";
import { ministries } from "@/data/content";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/utils/cn";
import { ArrowRight } from "lucide-react";

const MINISTRY_IDS = ministries.map((ministry) => ministry.id);

export function Ministries() {
  const active = useScrollSpy(MINISTRY_IDS);

  return (
    <>
      <PageHero
        title="Ministries"
        subtitle="Liturgical, pastoral, and community service — English, Tamil, and every gift that can be offered."
        image="/images/liturgical.jpg"
      />

      <div className="sticky top-[3.25rem] z-30 border-b border-bsc-stone/60 bg-bsc-cream/95 backdrop-blur">
        <Container>
          <nav
            aria-label="Jump to ministry"
            className="flex gap-2 overflow-x-auto py-3"
          >
            {ministries.map((ministry) => (
              <Link
                key={ministry.id}
                to={`/ministries#${ministry.id}`}
                aria-current={active === ministry.id ? "true" : undefined}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider",
                  active === ministry.id
                    ? "border-bsc-gold-400 bg-bsc-gold-100 text-bsc-gold-700"
                    : "border-bsc-stone text-bsc-sapphire-800",
                )}
              >
                {ministry.title}
              </Link>
            ))}
          </nav>
        </Container>
      </div>

      {ministries.map((ministry, index) => (
        <section
          key={ministry.id}
          id={ministry.id}
          className={cn(
            "scroll-mt-28 py-16 lg:py-24",
            index % 2 === 0 ? "bg-bsc-cream" : "bg-bsc-parchment",
          )}
        >
          <Container>
            <div
              className={cn(
                "grid items-center gap-10 lg:grid-cols-2",
                index % 2 === 1 && "lg:[&>*:first-child]:order-2",
              )}
            >
              <Reveal>
                <SectionHeading
                  eyebrow="Ministry"
                  title={ministry.title}
                  description={ministry.summary}
                />
                <p className="mt-5 max-w-prose leading-relaxed text-bsc-charcoal/90">
                  {ministry.description}
                </p>
                <div className="mt-6">
                  <Button to="/serve" variant="secondary" icon={ArrowRight}>
                    Serve with us
                  </Button>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div className="group overflow-hidden rounded-md border border-bsc-stone">
                  <SafeImage
                    src={ministry.image}
                    fallback={ministry.imageFallback}
                    alt={ministry.imageAlt}
                    className="img-zoom h-72 w-full object-cover sm:h-80"
                  />
                </div>
              </Reveal>
            </div>
          </Container>
        </section>
      ))}
    </>
  );
}
