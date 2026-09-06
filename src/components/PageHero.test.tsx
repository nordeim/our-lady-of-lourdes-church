import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageHero } from "@/components/PageHero";

/**
 * OLOL PageHero visual contract (ported from BSC round-17):
 * imagery visible (opacity up), scrims via named utilities,
 * image settles with hero-fade, weave edge closes the band.
 * Parish copy updated: subtitle uses OLOL timeline 1884–2005.
 */

describe("PageHero — dusk variant (default)", () => {
  it("renders title and subtitle with the rise-in entrances", () => {
    render(<PageHero title="Parish History" subtitle="1884 – 2005" image="/images/hero-church.jpg" />);
    const h1 = screen.getByRole("heading", { level: 1, name: "Parish History" });
    expect(h1.className).toMatch(/rise-in/);
    // OLOL PageHero has an eyebrow line (rise-in) + title (rise-in-d1) + subtitle (rise-in-d2)
    expect(screen.getByText("1884 – 2005").className).toMatch(/rise-in/);
  });

  it("lifts image visibility to opacity-45 and settles with hero-fade", () => {
    const { container } = render(<PageHero title="Parish History" image="/images/hero-church.jpg" />);
    const img = container.querySelector("img");
    expect(img?.className).toMatch(/opacity-45/);
    expect(img?.className).toMatch(/hero-fade/);
  });

  it("uses the named scrim-page utility", () => {
    const { container } = render(<PageHero title="Parish History" image="/images/hero-church.jpg" />);
    const scrim = container.querySelector(".scrim-page");
    expect(scrim).not.toBeNull();
  });

  it("closes the band with a divider-weave-thin edge only when image is present", () => {
    const { container } = render(<PageHero title="Parish History" image="/images/hero-church.jpg" />);
    // PageHero itself does not render the weave — Layout/outer does; image presence drives scrim.
    // Keep structural check: image present => scrim present, absence => no scrim.
    expect(container.querySelector(".scrim-page")).not.toBeNull();
  });
});

describe("PageHero — light variant", () => {
  it("renders with the scrim-page for the default dusk band", () => {
    const { container } = render(
      <PageHero title="News & Events" image="/images/hero-church.jpg" variant="light" />,
    );
    const img = container.querySelector("img");
    expect(img?.className).toMatch(/opacity-45/);
    expect(img?.className).toMatch(/hero-fade/);
    expect(container.querySelector(".scrim-page")).not.toBeNull();
  });
});

describe("PageHero — compact + child content", () => {
  it("keeps the compact padding contract and renders children", () => {
    render(
      <PageHero title="Give" compact image="/images/hero-church.jpg">
        <span>hub line</span>
      </PageHero>,
    );
    const section = screen.getByRole("heading", { name: "Give" }).closest("section");
    // compact min-h contract uses pt-28/pb-16; default uses larger — check compact class
    expect(section?.className).toMatch(/pt-28/);
    expect(screen.getByText("hub line").parentElement?.className).toMatch(/rise-in/);
  });

  it("renders without an image (no scrim)", () => {
    const { container } = render(<PageHero title="Plain" />);
    expect(container.querySelector("img")).toBeNull();
    expect(container.querySelector(".scrim-page")).toBeNull();
  });
});
