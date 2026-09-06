import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Motion & scrim contract — OLOL port ("Sacred Motion").
 * Utilities: rise-in (d1..d4), menu-in, drawer-in, drawer-item-in, page-in,
 * dot-pulse/halo-pulse, card-lift, card-tint, link-underline, scrim-hero,
 * scrim-page, hero-fade, rule-draw, bloom-drift, img-zoom, bg-gold-bloom,
 * plus prefers-reduced-motion gating and the 33+2 token budget.
 */
const root = resolve(__dirname, "..");
const css = readFileSync(resolve(root, "src/index.css"), "utf8");

const keyframes = (css.match(/@keyframes ([a-z-]+)/g) ?? []).map((k) =>
  k.replace("@keyframes ", ""),
);

describe("Sacred Motion — staged entrances", () => {
  it("declares .rise-in + delay steps d1..d4", () => {
    expect(css).toContain(".rise-in");
    expect(css).toContain(".rise-in-d1");
    expect(css).toContain(".rise-in-d2");
    expect(css).toContain(".rise-in-d3");
    expect(css).toContain(".rise-in-d4");
  });

  it("rise-in uses the liturgical ease cubic-bezier(0.22, 1, 0.36, 1)", () => {
    expect(css).toMatch(/rise-in 0\.8s cubic-bezier\(0\.22,\s*1,\s*0\.36,\s*1\)/);
  });

  it("declares rise-in keyframes settling at opacity 1", () => {
    expect(keyframes).toContain("rise-in");
    const block = css.slice(css.indexOf("@keyframes rise-in"));
    expect(block).toContain("opacity: 1");
  });
});

describe("menu & drawer entrances", () => {
  it("declares .menu-in and .drawer-in (+ drawer-item-in, page-in)", () => {
    expect(css).toContain(".menu-in");
    expect(css).toContain(".drawer-in");
    expect(css).toContain(".drawer-item-in");
    expect(css).toContain(".page-in");
  });

  it("declares corresponding keyframes", () => {
    for (const kf of ["menu-in", "drawer-in", "drawer-item-in", "page-in"]) {
      expect(keyframes).toContain(kf);
    }
  });
});

describe("timeline halo", () => {
  it("declares .dot-pulse with expanding gold ring (halo-pulse)", () => {
    expect(css).toContain(".dot-pulse");
    expect(css).toContain("@keyframes halo-pulse");
  });

  it("timeline halo pulses on the 2.6s rhythm", () => {
    expect(css).toMatch(/halo-pulse 2\.6s ease-out infinite/);
  });
});

describe("card and link affordances", () => {
  it("declares .card-lift and .card-tint", () => {
    expect(css).toContain(".card-lift");
    expect(css).toContain(".card-tint");
  });

  it("declares .link-underline with scaleX underline", () => {
    expect(css).toContain(".link-underline");
    expect(css).toContain("scaleX(0)");
  });
});

describe("scrim utilities", () => {
  it("declares .scrim-hero and .scrim-page gradient scrims", () => {
    expect(css).toContain(".scrim-hero");
    expect(css).toContain(".scrim-page");
  });

  it("scrims are bottom-heavy (first stop darkest for to-top gradient)", () => {
    const hero = css.slice(css.indexOf(".scrim-hero"), css.indexOf(".scrim-page"));
    const stops = hero.match(/rgba\([^)]*\)/g) ?? [];
    expect(stops.length).toBeGreaterThanOrEqual(3);
    const alphas = stops.map((s) => Number(s.match(/,\s*([0-9.]+)\)/)?.[1]));
    // scrim-hero uses "to top" — 0% is bottom, so first alpha is darkest
    expect(alphas[0]).toBeGreaterThan(alphas[alphas.length - 1]);
  });
});

describe("hero-fade, rule-draw, bloom-drift", () => {
  it("declares .hero-fade and .rule-draw", () => {
    expect(css).toContain(".hero-fade");
    expect(css).toContain(".rule-draw");
  });

  it("includes hero-fade, rule-draw, bloom-drift keyframes (10 total)", () => {
    expect(keyframes).toContain("hero-fade");
    expect(keyframes).toContain("rule-draw");
    expect(keyframes).toContain("bloom-drift");
    expect(keyframes.length).toBe(10);
  });

  it("rule-draw starts collapsed (scaleX(0)) centre-origin", () => {
    const draw = css.slice(css.indexOf(".rule-draw::after"));
    expect(draw).toContain("scaleX(0)");
    expect(draw).toContain("transform-origin: center");
  });

  it("bloom-drift uses translate3d + scale(1.08)", () => {
    const kf = css.slice(css.indexOf("@keyframes bloom-drift"));
    expect(kf).toContain("translate3d");
    expect(kf).toContain("scale(1.08)");
  });

  it("declares bloom-drift via bg-gold-bloom::after (14s alternate)", () => {
    // OLOL implements bloom-drift as .bg-gold-bloom::after, not a standalone .bloom-drift class
    const bloom = css.slice(css.indexOf(".bg-gold-bloom::after"));
    expect(bloom).toContain("bloom-drift");
    expect(bloom).toContain("14s ease-in-out infinite alternate");
  });
});

describe("reduced-motion coverage", () => {
  it("has a global prefers-reduced-motion block", () => {
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
  });

  it("has global animation/transition flattening for reduced-motion", () => {
    const reduceBlocks = css.match(/@media \(prefers-reduced-motion: reduce\)[\s\S]*?\n}/g) ?? [];
    const joined = reduceBlocks.join("\n");
    expect(joined).toContain("animation-duration: 0.01ms");
    expect(joined).toContain("transition-duration: 0.01ms");
  });

  it("scroll-behavior is auto under reduced-motion", () => {
    expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\)[\s\S]*?scroll-behavior: auto/);
  });
});

describe("token budget unchanged", () => {
  it("keeps 33 bsc-* colors + 2 shadows", () => {
    const colorCount = (css.match(/^\s*--color-bsc-/gm) ?? []).length;
    const shadowCount = (css.match(/^\s*--shadow-bsc/gm) ?? []).length;
    expect(colorCount).toBe(33);
    expect(shadowCount).toBe(2);
  });
});
