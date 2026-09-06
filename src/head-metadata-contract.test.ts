import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Head-metadata contract — OLOL port.
 * index.html must carry the Church of Our Lady of Lourdes social set
 * (og:title, description, og:image, twitter:card), canonical to
 * ourladyoflourdes.sg, theme-color sapphire-950, and Church JSON-LD with
 * name, telephone +65 6294 0624, and sameAs facebook.
 */
const root = resolve(__dirname, "..");
const html = readFileSync(resolve(root, "index.html"), "utf8");

function jsonLd(): Record<string, unknown> {
  const m = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!m) throw new Error("No JSON-LD script found");
  return JSON.parse(m[1]) as Record<string, unknown>;
}

describe("head — title and description", () => {
  it("titles the page Church of Our Lady of Lourdes — Singapore", () => {
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1] ?? "";
    expect(title).toContain("Church of Our Lady of Lourdes");
  });

  it("declares a description mentioning first Tamil church and 50 Ophir Road", () => {
    const desc = html.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"/s)?.[1] ?? "";
    expect(desc).toMatch(/Tamil/i);
    expect(desc).toContain("50 Ophir Road");
  });
});

describe("head — social / canonical", () => {
  it("declares og:title Church of Our Lady of Lourdes", () => {
    const m = html.match(/<meta[^>]*property="og:title"[^>]*content="([^"]+)"/s);
    expect(m?.[1]).toContain("Church of Our Lady of Lourdes");
  });

  it("declares og:description", () => {
    expect(html).toMatch(/og:description/);
  });

  it("declares og:image pointing at ourladyoflourdes.sg hero", () => {
    const m = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/s);
    // first og:image (without :alt) — ensure it points at hero
    // there may be og:image and og:image:alt — find the one without :alt
    const all = [...html.matchAll(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/gs)];
    const hero = all.find((a) => !a[0].includes("og:image:alt"))?.[1];
    expect(hero).toBe("https://ourladyoflourdes.sg/images/hero-church.jpg");
    expect(m?.[1]).toBeTruthy();
  });

  it("declares og:image:alt describing the Neo-Gothic facade", () => {
    const m = html.match(/<meta[^>]*property="og:image:alt"[^>]*content="([^"]+)"/s);
    expect(m?.[1]).toBeTruthy();
    expect(m?.[1]).toMatch(/Lourdes|Ophir|Neo-Gothic/i);
  });

  it("declares twitter:card summary_large_image", () => {
    expect(html).toMatch(/twitter:card/);
    expect(html).toContain("summary_large_image");
  });

  it("declares twitter:title and twitter:description", () => {
    expect(html).toMatch(/twitter:title/);
    expect(html).toMatch(/twitter:description/);
  });

  it("declares a canonical link to ourladyoflourdes.sg", () => {
    const m = html.match(/<link rel="canonical" href="([^"]+)"/);
    expect(m?.[1]).toBe("https://ourladyoflourdes.sg/");
  });

  it("declares theme-color matching bsc-sapphire-950 (#0a1122)", () => {
    expect(html).toMatch(/theme-color/);
    expect(html).toContain("#0a1122");
  });

  it("declares og:site_name and og:locale", () => {
    expect(html).toMatch(/og:site_name/);
    expect(html).toMatch(/og:locale/);
  });

  it("declares og:url to ourladyoflourdes.sg", () => {
    const m = html.match(/<meta property="og:url" content="([^"]+)"/);
    expect(m?.[1]).toBe("https://ourladyoflourdes.sg/");
  });
});

describe("head — Church JSON-LD", () => {
  it("names the church Church of Our Lady of Lourdes", () => {
    const data = jsonLd();
    expect(data["name"]).toBe("Church of Our Lady of Lourdes");
    expect(data["@type"]).toBe("Church");
  });

  it("carries telephone +65 6294 0624", () => {
    const data = jsonLd();
    expect(data["telephone"]).toBe("+65 6294 0624");
  });

  it("carries address postalCode 188690 and street 50 Ophir Road", () => {
    const data = jsonLd();
    const addr = data["address"] as Record<string, string>;
    expect(addr["postalCode"]).toBe("188690");
    expect(addr["streetAddress"]).toBe("50 Ophir Road");
  });

  it("sameAs includes the Facebook page", () => {
    const data = jsonLd();
    const sameAs = (data["sameAs"] as string[]) ?? [];
    expect(sameAs.join(" ")).toContain("facebook.com/ChurchOfOurLadyOfLourdes");
  });

  it("email is the OLOL secretariat address", () => {
    const data = jsonLd();
    expect(data["email"]).toBe("colol.secretariat@catholic.org.sg");
  });
});
