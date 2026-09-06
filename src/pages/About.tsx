import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { priests, ppcMembers, images } from "@/data/content";
import { monogram } from "@/utils/monogram";
import { site } from "@/data/site";

const pillars = [
  {
    numeral: "01",
    title: "Eucharist",
    body: "The altar is the centre of this house — English at 12:30, Tamil at 7:00, and a Sunday that runs from dawn to dusk in two tongues.",
  },
  {
    numeral: "02",
    title: "Our Lady",
    body: "Named for the apparitions at Massabielle. The courtyard grotto still shows Our Lady appearing to Saint Bernadette — a place of asking for the city.",
  },
  {
    numeral: "03",
    title: "Tamil roots",
    body: "Singapore's first Tamil Catholic church, opened 1888. The tongue that built these walls still prays here, now beside every neighbour who walks in from Bugis.",
  },
];

export function About() {
  return (
    <>
      <PageHero
        title="The household"
        subtitle="A Marian parish of the Archdiocese of Singapore — English, Tamil, and every pilgrim at Ophir Road."
        image={images.sanctuary}
      />

      <section className="bg-bsc-cream py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="Mission"
            title="Three notes of this house."
            description={site.vision}
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 80}>
                <article className="card-tint rounded-md border p-6">
                  <p className="font-display text-5xl text-bsc-gold-400/50">{pillar.numeral}</p>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-bsc-sapphire-900">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-bsc-charcoal/85">{pillar.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-bsc-parchment py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="Clergy"
            title="Priests of this altar."
            description="The present shepherds, and the MEP missionary who first raised these walls."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {priests.map((priest, i) => (
              <Reveal key={priest.name} delay={i * 70}>
                <article className="card-lift rounded-md border border-bsc-stone bg-bsc-cream p-6">
                  <div
                    aria-hidden="true"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-bsc-sapphire-900 font-display text-sm text-bsc-gold-300"
                  >
                    {monogram(priest.name)}
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-bsc-sapphire-900">
                    {priest.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-bsc-gold-700">{priest.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-bsc-charcoal/85">{priest.bio}</p>
                  {priest.email && (
                    <a
                      href={`mailto:${priest.email}`}
                      className="link-underline mt-4 inline-block text-sm text-bsc-sapphire-700"
                    >
                      {priest.email}
                    </a>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-bsc-cream py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="Parish Pastoral Council"
            title="The household around the priest."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ppcMembers.map((member) => (
              <li
                key={member.role}
                className="rounded-md border border-bsc-stone bg-bsc-parchment px-5 py-4"
              >
                <p className="font-display text-lg text-bsc-sapphire-900">{member.name}</p>
                <p className="text-sm text-bsc-charcoal/80">{member.role}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
