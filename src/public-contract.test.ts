import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Public-contract guard — OLOL port.
 * - public/images holds exactly 10 expected files (local grotto imagery)
 * - public/_headers ships the five host security headers
 * - public/robots.txt, public/favicon.svg exist
 * - index.html title is Church of Our Lady of Lourdes and canonical is ourladyoflourdes.sg
 */
const root = resolve(__dirname, "..");
const read = (p: string) => readFileSync(resolve(root, p), "utf8");

const expectedImages = [
  "hero-church.jpg",
  "grotto.jpg",
  "sanctuary.jpg",
  "garden.jpg",
  "community.jpg",
  "liturgical.jpg",
  "pastoral-care.jpg",
  "faith-formation.jpg",
  "family-life.jpg",
  "youth.jpg",
] as const;

describe("public/images — 10 local files", () => {
  it("contains the 10 expected OLOL images", () => {
    const actual = readdirSync(resolve(root, "public/images")).filter((f) => !f.startsWith(".")).sort();
    expect(actual.sort()).toEqual([...expectedImages].sort());
  });

  it("ships no unexpected images beyond the 10", () => {
    const actual = readdirSync(resolve(root, "public/images")).filter((f) => !f.startsWith("."));
    expect(actual).toHaveLength(10);
  });
});

describe("public/ deployment artifacts", () => {
  it("ships _headers with the five security headers", () => {
    expect(existsSync(resolve(root, "public/_headers"))).toBe(true);
    const headers = read("public/_headers");
    for (const directive of [
      "Strict-Transport-Security",
      "X-Content-Type-Options",
      "X-Frame-Options",
      "Referrer-Policy",
      "Permissions-Policy",
    ]) {
      expect(headers).toContain(directive);
    }
  });

  it("ships robots.txt with User-agent and sitemap to ourladyoflourdes.sg", () => {
    expect(existsSync(resolve(root, "public/robots.txt"))).toBe(true);
    const robots = read("public/robots.txt");
    expect(robots).toContain("User-agent");
    expect(robots).toContain("ourladyoflourdes.sg");
  });

  it("ships a purpose-drawn SVG favicon", () => {
    expect(existsSync(resolve(root, "public/favicon.svg"))).toBe(true);
    const svg = read("public/favicon.svg");
    expect(svg).toContain("<svg");
    expect(svg).toContain("#0a1122");
    expect(svg).toContain("#d4ad42");
  });
});

describe("index.html OLOL identity contract", () => {
  const html = read("index.html");

  it("titles the page Church of Our Lady of Lourdes", () => {
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1] ?? "";
    expect(title).toContain("Church of Our Lady of Lourdes");
  });

  it("declares a canonical link to ourladyoflourdes.sg", () => {
    const m = html.match(/<link rel="canonical" href="([^"]+)"/);
    expect(m?.[1]).toBe("https://ourladyoflourdes.sg/");
  });

  it("references the SVG favicon and carries no emoji data-URI", () => {
    expect(html).toContain('<link rel="icon" type="image/svg+xml" href="/favicon.svg"');
    expect(html).not.toContain("⛪");
  });

  it("references the local hero image in og:image", () => {
    expect(html).toContain("ourladyoflourdes.sg/images/hero-church.jpg");
  });

  it("keeps the CSP img-src local-only contract", () => {
    const csp = html.match(/<meta[^>]*http-equiv="Content-Security-Policy"[^>]*content="([^"]*)"/s)?.[1] ?? "";
    expect(csp).toContain("img-src 'self' data: blob:");
    expect(csp).toContain("frame-src https://www.google.com");
  });
});
