import { Clock, MapPin, Phone, Mail, Bus, Train, HeartHandshake, Church } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/PageHero";
import { site } from "@/data/site";
import { devotions, visitorGuidelines, images } from "@/data/content";
import { massDayKey } from "@/utils/massDay";

function MassCard({
  title,
  children,
  today,
  day,
}: {
  title: string;
  children: React.ReactNode;
  today?: boolean;
  day: string;
}) {
  return (
    <div
      data-testid="mass-card"
      data-card-day={day}
      data-today={today ? "true" : undefined}
      className={`relative overflow-hidden rounded-xl border bg-bsc-cream p-5 ${
        today ? "border-bsc-gold-400 shadow-bsc" : "border-bsc-stone"
      }`}
    >
      {today && (
        <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-bsc-gold-400 to-bsc-gold-600" />
      )}
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-bsc-sapphire-900">{title}</h3>
        {today && (
          <span className="rounded-full bg-bsc-gold-100 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-bsc-gold-700">
            Today
          </span>
        )}
      </div>
      <div className="mt-3 text-bsc-charcoal">{children}</div>
    </div>
  );
}

export function Worship() {
  const todayKey = massDayKey(new Date());

  return (
    <>
      <PageHero
        title="Worship"
        subtitle="Mass, mercy, and a grotto in the heart of Rochor."
        image={images.sanctuary}
      />

      <section id="mass" className="scroll-mt-28 bg-bsc-cream py-16 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Mass Times"
            title="Join Us at the Altar"
            description="All are welcome to celebrate the Eucharist — in English and in Tamil."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <MassCard title="Monday – Friday" today={todayKey === "weekdays"} day="weekdays">
              <ul className="space-y-1.5 text-sm">
                <li className="flex justify-between gap-4">
                  <span>Noon</span>
                  <span className="font-medium">{site.mass.weekdayNoon}</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>Evening</span>
                  <span className="font-medium">{site.mass.weekdayEvening}</span>
                </li>
              </ul>
              <p className="mt-3 text-xs italic text-bsc-charcoal/70">{site.mass.note}</p>
            </MassCard>

            <MassCard title="Saturday" today={todayKey === "saturday"} day="saturday">
              <ul className="space-y-1.5 text-sm">
                <li className="flex justify-between gap-4">
                  <span>Sunset Masses</span>
                  <span className="text-right font-medium">5:00 · 6:15 · 7:30 PM</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>Language</span>
                  <span className="font-medium">English</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>Rosary</span>
                  <span className="font-medium">4:15 PM</span>
                </li>
              </ul>
            </MassCard>

            <MassCard title="Sunday" today={todayKey === "sunday"} day="sunday">
              <ul className="space-y-1.5 text-sm">
                {site.mass.sunday.map((s) => (
                  <li key={`${s.time}-${s.language}`} className="flex justify-between">
                    <span>{s.time}</span>
                    <span className="font-medium">{s.language}</span>
                  </li>
                ))}
              </ul>
            </MassCard>
          </div>
        </Container>
      </section>

      <section id="confession" className="scroll-mt-28 bg-bsc-parchment py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <SectionHeading
                eyebrow="Sacraments"
                title="Confession & Devotions"
                description="Reconciliation is offered 15 minutes before Mass. Midday Rosary and Divine Mercy gather the city before the 12:30 English Mass."
              />
              <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-bsc-stone bg-bsc-cream p-5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-lg font-semibold text-bsc-sapphire-900">
                      Confession
                    </h3>
                    <span
                      aria-hidden="true"
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-bsc-gold-300/60 bg-bsc-gold-100 text-bsc-gold-700"
                    >
                      <HeartHandshake className="h-5 w-5" />
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-bsc-charcoal">
                    {site.mass.confession}
                  </p>
                </div>
                <div className="rounded-xl border border-bsc-stone bg-bsc-cream p-5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-lg font-semibold text-bsc-sapphire-900">
                      Midday prayer
                    </h3>
                    <span
                      aria-hidden="true"
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-bsc-gold-300/60 bg-bsc-gold-100 text-bsc-gold-700"
                    >
                      <Church className="h-5 w-5" />
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-bsc-charcoal">
                    {site.mass.adoration}
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <SectionHeading eyebrow="Devotions" title="Regular Devotions" />
              <div className="mt-6 space-y-3">
                {devotions.map((d) => (
                  <div
                    key={d.title}
                    className="flex items-start justify-between gap-4 rounded-xl border border-bsc-stone bg-bsc-cream p-4"
                  >
                    <div>
                      <h4 className="font-medium text-bsc-sapphire-900">{d.title}</h4>
                      <p className="text-sm text-bsc-charcoal">{d.where}</p>
                    </div>
                    <span className="shrink-0 text-right text-sm font-medium text-bsc-sapphire-600">
                      {d.when}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section id="visit" className="scroll-mt-28 bg-bsc-cream py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <SectionHeading
                eyebrow="Find Us"
                title="Visit Our Lady of Lourdes"
                description="A national monument a short walk from Bugis — cream walls, a grotto, and an open door."
              />
              <ul className="mt-8 space-y-4 text-sm text-bsc-charcoal">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-bsc-gold-700" aria-hidden="true" />
                  {site.address.full}
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 h-4 w-4 text-bsc-gold-700" aria-hidden="true" />
                  Office: {site.hours.office}
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 text-bsc-gold-700" aria-hidden="true" />
                  <a href={`tel:${site.contact.officePhone.replace(/\s/g, "")}`}>
                    {site.contact.officePhone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 text-bsc-gold-700" aria-hidden="true" />
                  <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
                </li>
                <li className="flex gap-3">
                  <Train className="mt-0.5 h-4 w-4 text-bsc-gold-700" aria-hidden="true" />
                  {site.transport.mrt}
                </li>
                <li className="flex gap-3">
                  <Bus className="mt-0.5 h-4 w-4 text-bsc-gold-700" aria-hidden="true" />
                  {site.transport.buses}
                </li>
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <div className="overflow-hidden rounded-md border border-bsc-stone">
                <iframe
                  title="Map of Church of Our Lady of Lourdes"
                  src={site.mapsEmbedSrc}
                  className="h-80 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-bsc-parchment py-16 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="When you visit"
            title="A modest dress, a quiet phone."
            description="The nave is a place of prayer. These are the parish guidelines for the Main Church."
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="rounded-md border border-bsc-stone bg-bsc-cream p-6">
              <h3 className="font-display text-xl font-semibold text-bsc-sapphire-900">Dress code</h3>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-bsc-charcoal/90">
                {visitorGuidelines.dress.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-md border border-bsc-stone bg-bsc-cream p-6">
              <h3 className="font-display text-xl font-semibold text-bsc-sapphire-900">
                Other guidelines
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-bsc-charcoal/90">
                {visitorGuidelines.other.map((item) => (
                  <li key={item.title}>
                    <span className="font-semibold text-bsc-sapphire-800">{item.title}. </span>
                    {item.body}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
