import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

function renderWithRouter(ui: React.ReactNode) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("Button", () => {
  it("renders as Link when to is provided", () => {
    renderWithRouter(<Button to="/about">Go</Button>);
    const link = screen.getByRole("link", { name: "Go" });
    expect(link).toHaveAttribute("href", "/about");
  });

  it("renders as anchor when href is provided", () => {
    render(<Button href="https://example.com">External</Button>);
    const anchor = screen.getByRole("link", { name: "External" });
    expect(anchor).toHaveAttribute("href", "https://example.com");
  });

  it("renders as button when neither to nor href is provided", () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole("button", { name: "Click" })).toBeInTheDocument();
  });

  it("applies primary variant by default", () => {
    renderWithRouter(<Button to="/">Default</Button>);
    const link = screen.getByRole("link", { name: "Default" });
    expect(link.className).toMatch(/bg-bsc-gold-500/);
  });

  it("applies secondary variant", () => {
    renderWithRouter(<Button to="/" variant="secondary">Sec</Button>);
    expect(screen.getByRole("link", { name: "Sec" }).className).toMatch(/bg-bsc-sapphire-700/);
  });

  it("applies ghost variant", () => {
    renderWithRouter(<Button to="/" variant="ghost">Ghost</Button>);
    expect(screen.getByRole("link", { name: "Ghost" }).className).toMatch(/bg-transparent/);
  });

  it("applies outline-light variant", () => {
    renderWithRouter(<Button to="/" variant="outline-light">Outline</Button>);
    expect(screen.getByRole("link", { name: "Outline" }).className).toMatch(/border/);
    expect(screen.getByRole("link", { name: "Outline" }).className).toMatch(/text-bsc-cream/);
  });

  it("renders icon when provided", () => {
    render(<Button icon={Star}>WithIcon</Button>);
    const btn = screen.getByRole("button", { name: "WithIcon" });
    expect(btn.querySelector("svg")).toBeInTheDocument();
  });

  it("wraps the icon in an aria-hidden decorative span", () => {
    render(<Button icon={Star}>WithIcon</Button>);
    const btn = screen.getByRole("button", { name: "WithIcon" });
    const svg = btn.querySelector("svg")!;
    expect(svg.parentElement?.getAttribute("aria-hidden")).toBe("true");
  });

  it("root carries the group class so icons can nudge on hover", () => {
    renderWithRouter(<Button to="/" icon={ArrowRight}>Nudge</Button>);
    expect(screen.getByRole("link", { name: "Nudge" }).className).toMatch(/group/);
  });

  it("gives press feedback via active-state classes", () => {
    renderWithRouter(<Button to="/">Press</Button>);
    const link = screen.getByRole("link", { name: "Press" });
    expect(link.className).toMatch(/active:translate-y-0/);
    expect(link.className).toMatch(/active:scale/);
  });

  // Solid variants gain a hover lift with the bsc shadow so buttons
  // speak the same elevation language as card-lift (OLOL grotto language).
  it("lifts solid variants on hover (translate + bsc shadow + eased transition)", () => {
    renderWithRouter(<Button to="/">Lift</Button>);
    const link = screen.getByRole("link", { name: "Lift" });
    expect(link.className).toMatch(/hover:-translate-y-0\.5/);
    expect(link.className).toMatch(/hover:shadow-bsc/);
    expect(link.className).toMatch(/transition-all/);
    expect(link.className).toMatch(/duration-200/);
  });

  it("secondary variant lifts identically", () => {
    renderWithRouter(<Button to="/" variant="secondary">LiftSec</Button>);
    const link = screen.getByRole("link", { name: "LiftSec" });
    expect(link.className).toMatch(/hover:-translate-y-0\.5/);
    expect(link.className).toMatch(/hover:shadow-bsc/);
  });

  it("ghost variant stays color-only (restraint) but eases transitions", () => {
    renderWithRouter(<Button to="/" variant="ghost">CalmGhost</Button>);
    const link = screen.getByRole("link", { name: "CalmGhost" });
    expect(link.className).not.toMatch(/hover:-translate-y-0\.5/);
    expect(link.className).toMatch(/transition-all/);
  });

  it("outline-light brightens its border on hover instead of lifting", () => {
    renderWithRouter(<Button to="/" variant="outline-light">CalmOutline</Button>);
    const link = screen.getByRole("link", { name: "CalmOutline" });
    expect(link.className).not.toMatch(/hover:-translate-y-0\.5/);
    expect(link.className).toMatch(/hover:border-bsc-cream\/70/);
  });
});
