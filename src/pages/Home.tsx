import { ArrowRight, MapPin, Clock, Landmark } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/SafeImage";
import { Emblem } from "@/components/Emblem";
import { EventMeta } from "@/components/EventMeta";
import { grounds, upcomingEvents, images } from "@/data/content";
import { site } from "@/data/site";

export function Home() {
  return (
    <>
      <section className="relative isolate min-h-[92vh] overflow-hidden bg-bsc-sapphire-950 text-bsc-cream">
        <div className="absolute inset-0">
          <SafeImage
            src={images.hero}
            fallback={images.heroFallback}
            alt="The Neo-Gothic facade of the Church of Our Lady of Lourdes on Ophir Road at dusk"
            loading="eager"
            fetchPriority="high"
            className="hero-ken-burns hero-fade h-full w-full object-cover opacity-55"
          />
          <div className="scrim-hero absolute inset-0" />
        </div>
        <div className="bg-grain pointer-events-none absolute inset-0" />
        <Container className="relative z-10 flex min-h-[92vh] flex-col justify-end pb-24 pt-36">
          <p className="rise-in text-xs font-semibold uppercase tracking-[0.3em] text-bsc-gold-300">
            {site.name} — since 1888
          </p>
          <h1 className="rise-in rise-in-d1 mt-5 max-w-3xl font-display text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            A grotto in the city.
          </h1>
          <p className="rise-in rise-in-d2 mt-5 max-w-xl text-lg text-bsc-cream/80 sm:text-xl">
            {site.tagline}
          </p>
          <div className="rise-in rise-in-d3 mt-8 flex flex-wrap gap-3">
            <Button to="/worship#mass" icon={ArrowRight}>
              Mass Times
            </Button>
            <Button to="/about" variant="outline-light">
              About Us
            </Button>
          </div>
          <div className="rise-in rise-in-d4 mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-bsc-gold-400/30 pt-6 text-sm text-bsc-cream/75">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-bsc-gold-300" aria-hidden="true" />
              {site.address.street}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-bsc-gold-300" aria-hidden="true" />
              Sunday Masses 8:00 AM – 6:30 PM
            </span>
            <span className="inline-flex items-center gap-2">
              <Landmark className="h-4 w-4 text-bsc-gold-300" aria-hidden="true" />
              National Monument · 1888
            </span>
          </div>
        </Container>
      </section>

      <section className="relative z-20 -mt-10 bg-bsc-cream pb-8">
        <Container>
          <div className="relative mx-auto max-w-3xl rounded-md border border-bsc-stone bg-bsc-parchment px-8 py-10 shadow-bsc sm:px-12">
            <Emblem className="absolute -top-7 left-1/2 h-14 w-14 -translate-x-1/2 rounded-full bg-bsc-cream p-2 shadow-bsc" />
            <blockquote className="mt-4 text-center font-display text-2xl italic text-bsc-sapphire-900 text-balance sm:text-3xl">
              “You are not a visitor here. You are expected.”
            </blockquote>
            <p className="mt-5 text-center text-sm uppercase tracking-[0.25em] text-bsc-gold-700">
              A welcome from Ophir Road
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-bsc-cream py-20 lg:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <SectionHeading
                eyebrow="Welcome"
                title="Singapore's first Tamil Catholic church."
                description={site.vision}
              />
              <p className="mt-6 max-w-prose leading-relaxed text-bsc-charcoal/85">
                Blessed on 13 May 1888 and modelled on the Basilica at Lourdes, this house of prayer
                still gathers English and Tamil under one Neo-Gothic roof — a national monument
                whose grotto remains a place of asking, for Catholics and neighbours alike.
              </p>
              <div className="mt-8">
                <Button to="/about" variant="secondary" icon={ArrowRight}>
                  Discover Our Parish
                </Button>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="group overflow-hidden rounded-md border border-bsc-stone">
                <SafeImage
                  src={images.sanctuary}
                  alt="The nave and stained-glass windows of the Church of Our Lady of Lourdes"
                  className="img-zoom h-80 w-full object-cover sm:h-96"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-bsc-parchment py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="The Grounds"
            title="Church, grotto, compound."
            description="Three places to pray, to wait, and to be found."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {grounds.map((place, i) => (
              <Reveal key={place.id} delay={i * 80}>
                <Link
                  to="/worship#visit"
                  className="group card-lift block overflow-hidden rounded-md border border-bsc-stone bg-bsc-cream"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <SafeImage
                      src={place.image}
                      fallback={place.imageFallback}
                      alt={place.imageAlt}
                      className="img-zoom h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl font-semibold text-bsc-sapphire-900">
                      {place.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-bsc-charcoal/85">
                      {place.description}
                    </p>
                    <p className="mt-4 text-sm font-semibold text-bsc-gold-700">Visit →</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-bsc-cream py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="Coming days"
            title="Feast, rosary, formation."
            description="The calendar of a living parish — not a brochure."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event, i) => (
              <Reveal key={event.title} delay={i * 50}>
                <article className="card-lift flex h-full flex-col rounded-md border border-bsc-stone bg-bsc-parchment p-5">
                  <EventMeta category={event.category} date={event.date} />
                  <h3 className="mt-4 font-display text-xl font-semibold text-bsc-sapphire-900">
                    {event.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-bsc-charcoal/85">
                    {event.summary}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <Button to="/news-events" variant="ghost" icon={ArrowRight}>
              All news & events
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-gold-bloom bg-bsc-sapphire-950 py-20 text-bsc-cream lg:py-24">
        <Container className="relative z-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-bsc-gold-300">
            Come and see
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-semibold text-balance sm:text-4xl">
            English at midday. Tamil at dusk. A grotto that does not close its heart.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/worship#mass" icon={ArrowRight}>
              Join us at Mass
            </Button>
            <Button to="/serve" variant="outline-light">
              Take a place
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
