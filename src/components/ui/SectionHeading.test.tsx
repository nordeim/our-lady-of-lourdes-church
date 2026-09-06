import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Round-17: the gold rule under every section heading draws itself in
 * (rule-draw) — unifying with the timeline-rail / link-underline motif.
 *
 * OLOL adaptation: dest SectionHeading renders gold-rule + rule-draw on the
 * outer wrapper div (not the h2). Center alignment adds mx-auto/text-center to
 * the wrapper, and light variant tints the h2 text-bsc-cream while the wrapper
 * retains the gold-rule. Assertions therefore target the wrapper via the
 * heading's parentElement rather than the heading itself.
 */

describe("SectionHeading", () => {
  it("renders the title with gold-rule and the round-17 rule-draw animation hook on the wrapper", () => {
    render(<SectionHeading eyebrow="Our Grounds" title="Spaces of Worship & Community" />);
    const h2 = screen.getByRole("heading", { level: 2, name: "Spaces of Worship & Community" });
    const wrapper = h2.parentElement as HTMLElement;
    expect(wrapper.className).toMatch(/gold-rule/);
    expect(wrapper.className).toMatch(/rule-draw/);
  });

  it("keeps the eyebrow and description wiring", () => {
    render(
      <SectionHeading
        eyebrow="Upcoming"
        title="News & Events"
        description="Join us for devotions and parish celebrations."
      />,
    );
    expect(screen.getByText("Upcoming")).toBeInTheDocument();
    expect(screen.getByText("Join us for devotions and parish celebrations.")).toBeInTheDocument();
  });

  it("light variant renders cream heading text on dark bands and keeps rule-draw on wrapper", () => {
    render(<SectionHeading title="Take Your Place" light align="center" />);
    const h2 = screen.getByRole("heading", { level: 2, name: "Take Your Place" });
    expect(h2.className).toMatch(/text-bsc-cream/);
    const wrapper = h2.parentElement as HTMLElement;
    expect(wrapper.className).toMatch(/rule-draw/);
  });

  it("center alignment centers the heading block via the wrapper", () => {
    render(<SectionHeading title="Centered" align="center" />);
    const h2 = screen.getByRole("heading", { level: 2, name: "Centered" });
    const wrapper = h2.parentElement as HTMLElement;
    expect(wrapper.className).toMatch(/mx-auto/);
  });
});
