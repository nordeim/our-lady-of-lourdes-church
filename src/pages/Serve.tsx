import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { serveRoles, images } from "@/data/content";
import { site } from "@/data/site";
import { ArrowRight } from "lucide-react";

export function Serve() {
  return (
    <>
      <PageHero
        title="Take a place"
        subtitle="This altar, this grotto, this city flock — they need hands. Yours will do."
        image={images.hall}
      />
      <section className="bg-bsc-cream py-16 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Serve"
            title="Four ways to belong."
            description="Speak with the parish office, or begin after Mass. Training is given; willingness is enough."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {serveRoles.map((role, i) => (
              <Reveal key={role.title} delay={i * 60}>
                <article className="card-lift h-full rounded-md border border-bsc-stone bg-bsc-parchment p-6">
                  <p className="font-display text-5xl text-bsc-gold-400/40">0{i + 1}</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-bsc-sapphire-900">
                    {role.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-bsc-charcoal/90">{role.summary}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 rounded-md border border-bsc-stone bg-bsc-parchment p-8">
            <p className="font-display text-xl text-bsc-sapphire-900">Write to the secretariat</p>
            <p className="mt-2 text-bsc-charcoal/85">
              {site.contact.email} · {site.contact.officePhone}
            </p>
            <div className="mt-6">
              <Button href={`mailto:${site.contact.email}`} icon={ArrowRight}>
                Offer your name
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
