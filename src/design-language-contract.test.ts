import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Design-language contract — OLOL port.
 * Pins editorial corner vocabulary, focus ring, typographic inheritance,
 * motion details, plus component props (PageHero, SectionHeading) and the
 * site vision that frames the grotto imagery.
 */
const root = resolve(__dirname, "..");
const css = readFileSync(resolve(root, "src/index.css"), "utf8");
const pageHero = readFileSync(resolve(root, "src/components/PageHero.tsx"), "utf8");
const sectionHeading = readFileSync(resolve(root, "src/components/ui/SectionHeading.tsx"), "utf8");
const site = readFileSync(resolve(root, "src/data/site.ts"), "utf8");

const base = css.slice(css.indexOf("@layer base"));
const theme = css.slice(css.indexOf("@theme"), css.indexOf("}", css.indexOf("@theme")));

describe("T4 — global :focus-visible ring", () => {
  it("declares a global focus-visible outline in @layer base", () => {
    expect(base).toMatch(/:focus-visible\s*\{/);
  });

  it("rings 2px in bsc gold with a 3px offset", () => {
    const rule = base.slice(base.indexOf(":focus-visible"));
    expect(rule).toContain("outline: 2px solid var(--color-bsc-gold-400)");
    expect(rule).toContain("outline-offset: 3px");
  });
});

describe("T7 — editorial corner vocabulary", () => {
  it("overrides the Tailwind radius scale inside @theme", () => {
    expect(theme).toContain("--radius-xs:");
    expect(theme).toContain("--radius-sm:");
    expect(theme).toContain("--radius-md:");
    expect(theme).toContain("--radius-lg:");
    expect(theme).toContain("--radius-xl:");
    expect(theme).toContain("--radius-2xl:");
  });

  it("resolves to the editorial scale (2/2/3/4/4/6 px)", () => {
    const read = (token: string) =>
      theme.match(new RegExp(`--radius-${token}:\\s*([0-9.]+rem)`))?.[1];
    expect(read("xs")).toBe("0.125rem");
    expect(read("sm")).toBe("0.125rem");
    expect(read("md")).toBe("0.1875rem");
    expect(read("lg")).toBe("0.25rem");
    expect(read("xl")).toBe("0.25rem");
    expect(read("2xl")).toBe("0.375rem");
  });
});

describe("T8 — typographic inheritance", () => {
  it("enables kerning and ligatures on body copy", () => {
    const bodyRule = base.slice(base.indexOf("body {"));
    expect(bodyRule).toContain('font-feature-settings: "kern" 1, "liga" 1');
  });
});

describe("PageHero contract", () => {
  it("accepts title + subtitle + image + fallback + compact + children", () => {
    expect(pageHero).toContain("title: string");
    expect(pageHero).toContain("subtitle?");
    expect(pageHero).toContain("image?");
    expect(pageHero).toContain("fallback?");
    expect(pageHero).toContain("compact?");
    expect(pageHero).toContain("children?");
  });

  it("renders sapphire-950 hero with rise-in staged content and bg-grain", () => {
    expect(pageHero).toContain("bg-bsc-sapphire-950");
    expect(pageHero).toContain("rise-in");
    expect(pageHero).toContain("bg-grain");
  });

  it("uses SafeImage with fetchPriority high for the hero image", () => {
    expect(pageHero).toContain("SafeImage");
    expect(pageHero).toContain('fetchPriority="high"');
  });
});

describe("SectionHeading contract", () => {
  it("accepts eyebrow + title + description + align + light", () => {
    expect(sectionHeading).toContain("eyebrow?");
    expect(sectionHeading).toContain("title: string");
    expect(sectionHeading).toContain("description?");
    expect(sectionHeading).toContain("align?");
    expect(sectionHeading).toContain("light?");
  });

  it("renders gold-rule and supports center alignment + light variant", () => {
    expect(sectionHeading).toContain("gold-rule");
    expect(sectionHeading).toContain("align");
    expect(sectionHeading).toContain("light");
  });
});

describe("site vision contract", () => {
  it("site.ts defines a vision for a welcoming Marian household", () => {
    expect(site).toContain("vision");
    expect(site).toMatch(/welcoming Marian household/i);
  });

  it("vision mentions Ophir Road and English + Tamil", () => {
    expect(site).toContain("Ophir Road");
    expect(site).toMatch(/English.*Tamil|Tamil.*English/);
  });
});

describe("T9 — motion details (bloom-drift, hairline, ease)", () => {
  it("declares the bloom-drift keyframes (translate3d + scale)", () => {
    expect(css).toContain("@keyframes bloom-drift");
    const kf = css.slice(css.indexOf("@keyframes bloom-drift"));
    expect(kf).toContain("translate3d");
    expect(kf).toContain("scale(1.08)");
  });

  it("gold-rule is a centre-drawn 1px hairline (transparent edges)", () => {
    const ruleBlock = css.match(/\.gold-rule::after\s*\{[^}]*\}/)?.[0];
    expect(ruleBlock).toBeTruthy();
    expect(ruleBlock).toContain("height: 1px");
    const grad = css.slice(css.indexOf(".gold-rule::after"));
    expect(grad).toMatch(
      /linear-gradient\([\s\S]*?transparent[\s\S]*?gold[\s\S]*?transparent[\s\S]*?\)/,
    );
  });

  it("rise-in uses the liturgical ease", () => {
    expect(css).toMatch(/rise-in 0\.8s cubic-bezier\(0\.22,\s*1,\s*0\.36,\s*1\)/);
  });

  it("timeline halo pulses on the 2.6s rhythm", () => {
    expect(css).toMatch(/halo-pulse 2\.6s ease-out infinite/);
  });
});
