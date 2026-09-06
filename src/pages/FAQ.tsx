import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { faqs, images } from "@/data/content";
import { site } from "@/data/site";

export function FAQ() {
  return (
    <>
      <PageHero
        title="Questions"
        subtitle="Mass, confession, dress, and how to find 50 Ophir Road."
        image={images.garden}
        compact
      />
      <section className="bg-bsc-cream py-16 lg:py-24">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="FAQ"
            title="What pilgrims usually ask."
            description="If your question is not here, the secretariat will answer it."
          />
          <div className="mt-10">
            <Accordion items={faqs} />
          </div>
        </Container>
      </section>
      <section className="bg-bsc-parchment py-14">
        <Container className="text-center">
          <p className="text-bsc-charcoal/85">
            {site.contact.email} · {site.contact.officePhone}
          </p>
        </Container>
      </section>
    </>
  );
}
