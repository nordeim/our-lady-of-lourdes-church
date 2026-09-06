import { Link } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { SocialIcons } from "@/components/SocialIcons";
import { footerNav } from "@/data/nav";
import { site } from "@/data/site";

const explore = footerNav.slice(0, 5);
const involved = footerNav.slice(5);

export function Footer() {
  return (
    <footer className="bg-bsc-sapphire-950 text-bsc-cream">
      <div className="divider-weave-thin opacity-40" />
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl font-semibold">{site.shortName}</p>
          <p className="mt-3 text-sm leading-relaxed text-bsc-cream/70">{site.tagline}</p>
          <p className="mt-3 text-sm text-bsc-cream/55">{site.tamilName}</p>
          <SocialIcons className="mt-6 flex gap-3" />
        </div>
        <nav aria-label="Explore">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-bsc-gold-300">Explore</p>
          <ul className="mt-4 space-y-2">
            {explore.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="link-underline text-sm text-bsc-cream/80">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Get involved">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-bsc-gold-300">
            Get involved
          </p>
          <ul className="mt-4 space-y-2">
            {involved.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="link-underline text-sm text-bsc-cream/80">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-bsc-gold-300">Visit</p>
          <p className="mt-4 text-sm leading-relaxed text-bsc-cream/80">{site.address.full}</p>
          <p className="mt-2 text-sm text-bsc-cream/70">Church: {site.hours.church}</p>
          <p className="mt-1 text-sm text-bsc-cream/70">Office: {site.hours.office}</p>
          <p className="mt-1 text-sm text-bsc-cream/70">MRT: {site.transport.mrt}</p>
          <p className="mt-3 text-sm">
            <a href={`tel:${site.contact.officePhone.replace(/\s/g, "")}`} className="link-underline">
              {site.contact.officePhone}
            </a>
          </p>
          <p className="mt-1 text-sm">
            <a href={`mailto:${site.contact.email}`} className="link-underline">
              {site.contact.email}
            </a>
          </p>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-xs text-bsc-cream/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Archdiocese of Singapore.
          </p>
          <a href={site.archdiocese} className="link-underline" target="_blank" rel="noreferrer">
            Archdiocese of Singapore
          </a>
        </Container>
      </div>
    </footer>
  );
}
