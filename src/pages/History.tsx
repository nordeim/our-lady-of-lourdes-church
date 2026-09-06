import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/PageHero";
import { Timeline } from "@/components/Timeline";
import { lifeTimeline, images } from "@/data/content";

export function History() {
  return (
    <>
      <PageHero
        title="1884–Today"
        subtitle="From a swamp at the Rochor bend to a national monument — the first Tamil Catholic church in Singapore."
        image={images.hero}
      />
      <section className="bg-bsc-cream py-20 lg:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)]">
            <div data-testid="history-story" className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                eyebrow="Our story"
                title="A church for the Indians — then for the city."
                description="Bishop Gasnier sent Fr Meneuvrier; Sir Frederick Weld granted the land; Catholics, Protestants and non-Christians paid for the stones. The nave survived the war. The grotto still asks."
              />
              <p className="mt-6 max-w-prose text-sm leading-relaxed text-bsc-charcoal/85">
                On 24 May 1888 Bishop Gasnier wrote that he could not help emphasising the
                catholicity of the Church — “everyone, Catholics, Protestants and non-Christians had
                contributed to the building of this sanctuary to Mary.” That sentence still holds.
              </p>
            </div>
            <Timeline entries={lifeTimeline} />
          </div>
        </Container>
      </section>
    </>
  );
}
