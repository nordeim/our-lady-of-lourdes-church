import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { EventMeta } from "@/components/EventMeta";
import { Button } from "@/components/ui/Button";
import { upcomingEvents, images } from "@/data/content";
import { ArrowRight } from "lucide-react";

export function NewsEvents() {
  return (
    <>
      <PageHero
        title="News & Events"
        subtitle="Feast days, rosaries, and the quiet calendar of a city parish."
        image={images.feast}
        compact
      />
      <section className="bg-bsc-cream py-16 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Calendar"
            title="What gathers us."
            description="Recurring devotions and the parish feast — confirm feast-day Masses with the office."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {upcomingEvents.map((event, i) => (
              <Reveal key={event.title} delay={i * 40}>
                <article className="card-lift flex h-full flex-col rounded-md border border-bsc-stone bg-bsc-parchment p-6">
                  <EventMeta category={event.category} date={event.date} />
                  <h3 className="mt-4 font-display text-2xl font-semibold text-bsc-sapphire-900">
                    {event.title}
                  </h3>
                  <p className="mt-3 flex-1 leading-relaxed text-bsc-charcoal/90">{event.summary}</p>
                  {event.href &&
                    (event.href.startsWith("http") ? (
                      <a
                        href={event.href}
                        className="link-underline mt-4 text-sm font-semibold text-bsc-sapphire-700"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Learn more
                      </a>
                    ) : (
                      <Button to={event.href} variant="ghost" className="mt-4 self-start px-0" icon={ArrowRight}>
                        Learn more
                      </Button>
                    ))}
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-bsc-sapphire-950 py-16 text-bsc-cream">
        <Container className="text-center">
          <p className="font-display text-2xl">
            For bulletins and last-minute changes, call the parish office or write to the secretariat.
          </p>
        </Container>
      </section>
    </>
  );
}
