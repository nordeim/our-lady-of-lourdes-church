import { describe, expect, it } from "vitest";
import {
  devotions,
  faqs,
  givingOptions,
  grounds,
  images,
  lifeTimeline,
  ministries,
  ppcMembers,
  priests,
  serveRoles,
  upcomingEvents,
  visitorGuidelines,
} from "@/data/content";

describe("content", () => {
  it("lifeTimeline has 7 entries each with year/title/description length>20 (1884–2005 Ophir Road)", () => {
    expect(lifeTimeline).toHaveLength(7);
    expect(lifeTimeline.map((e) => e.year)).toEqual([
      "1884",
      "1885",
      "1886",
      "1888",
      "1942",
      "1974",
      "2005",
    ]);
    for (const entry of lifeTimeline) {
      expect(entry.year.length).toBeGreaterThan(0);
      expect(entry.title.length).toBeGreaterThan(0);
      expect(entry.description.length).toBeGreaterThan(20);
    }
    // spot-check OLOL milestones: 1888 Basilica 13 May, monument No.52
    expect(lifeTimeline.find((e) => e.year === "1888")?.description).toMatch(/13 May/);
    expect(lifeTimeline.find((e) => e.year === "2005")?.description).toMatch(/52/);
    expect(lifeTimeline.find((e) => e.year === "1886")?.description).toMatch(/1 Aug/);
  });

  it("grounds has 3 sections each with id in allowlist, image/imageFallback/imageAlt non-empty", () => {
    expect(grounds).toHaveLength(3);
    expect(grounds.map((g) => g.id)).toEqual(["main-church", "grotto", "garden"]);
    for (const section of grounds) {
      expect(section.image.length).toBeGreaterThan(0);
      expect(section.imageFallback.length).toBeGreaterThan(0);
      expect(section.imageAlt.length).toBeGreaterThan(0);
    }
  });

  it("ministries has 6 sections with expected ids, each imageAlt non-empty", () => {
    expect(ministries).toHaveLength(6);
    expect(ministries.map((m) => m.id)).toEqual([
      "liturgical",
      "faith-formation",
      "pastoral-care",
      "family-life",
      "youth",
      "community",
    ]);
    for (const section of ministries) {
      expect(section.image.length).toBeGreaterThan(0);
      expect(section.imageFallback.length).toBeGreaterThan(0);
      expect(section.imageAlt.length).toBeGreaterThan(0);
      expect(section.summary.length).toBeGreaterThan(0);
      expect(section.description.length).toBeGreaterThan(20);
    }
  });

  it("faqs has 6 entries each question ends with ? and answer length>20 (includes dress code)", () => {
    expect(faqs).toHaveLength(6);
    for (const faq of faqs) {
      expect(faq.question.endsWith("?")).toBe(true);
      expect(faq.answer.length).toBeGreaterThan(20);
    }
    expect(faqs.some((f) => f.question.toLowerCase().includes("wear"))).toBe(true);
  });

  it("upcomingEvents has 6 entries each category in allowed set and title/summary non-empty (Parish Feast 11 Feb)", () => {
    expect(upcomingEvents).toHaveLength(6);
    const allowed = new Set(["Parish", "Devotion", "Formation", "Archdiocese"]);
    for (const event of upcomingEvents) {
      expect(allowed.has(event.category)).toBe(true);
      expect(event.title.length).toBeGreaterThan(0);
      expect(event.summary.length).toBeGreaterThan(0);
    }
    for (const event of upcomingEvents) {
      if (event.href !== undefined) {
        expect(event.href.length).toBeGreaterThan(0);
        expect(event.href).toMatch(/^(https?:\/\/|\/)/);
      }
    }
    expect(upcomingEvents.some((e) => e.title.includes("Our Lady of Lourdes") && e.date.includes("11 Feb"))).toBe(true);
  });

  it("givingOptions has 6 entries each title/description length>0 and icons include globe (PayNow no hardcode UEN)", () => {
    expect(givingOptions).toHaveLength(6);
    const icons = givingOptions.map((g) => g.icon);
    expect(icons).toContain("globe");
    expect(new Set(icons)).toEqual(new Set(["globe", "church", "book", "heart", "flame", "sprout"]));
    for (const option of givingOptions) {
      expect(option.title.length).toBeGreaterThan(0);
      expect(option.description.length).toBeGreaterThan(0);
    }
    const paynow = givingOptions.find((g) => g.title === "PayNow");
    expect(paynow).toBeDefined();
    expect(paynow!.description).toMatch(/confirm.*office/i);
    expect(paynow!.description).not.toMatch(/T08CC1234A/);
    const cheque = givingOptions.find((g) => g.title === "Cheque");
    expect(cheque?.description).toContain("Church of Our Lady of Lourdes");
  });

  it("priests has 3 priests each name/role non-empty (OLOL: Alphonsus, Leo Justin HGN, Meneuvrier MEP — email only, no phone)", () => {
    expect(priests).toHaveLength(3);
    for (const priest of priests) {
      expect(priest.name.length).toBeGreaterThan(0);
      expect(priest.role.length).toBeGreaterThan(0);
      expect(priest.bio.length).toBeGreaterThan(0);
      // no phone property — only optional email
      expect((priest as unknown as Record<string, unknown>).phone).toBeUndefined();
    }
    expect(priests.map((p) => p.name)).toContain("Rev Fr Alphonsus Dominic");
    expect(priests.map((p) => p.name).some((n) => n.includes("Leo Justin"))).toBe(true);
    expect(priests.map((p) => p.name).some((n) => n.includes("Meneuvrier"))).toBe(true);
    expect(priests[0].role).toMatch(/Parish Priest/);
    expect(priests[2].role).toMatch(/1884/);
  });

  it("ppcMembers has 6 entries each role/name non-empty (Parish Priest ex-officio Alphonsus)", () => {
    expect(ppcMembers).toHaveLength(6);
    for (const member of ppcMembers) {
      expect(member.role.length).toBeGreaterThan(0);
      expect(member.name.length).toBeGreaterThan(0);
    }
    expect(ppcMembers[0].role).toMatch(/Ex-officio/);
    expect(ppcMembers[0].name).toContain("Alphonsus Dominic");
  });

  it("images object has required keys (hero/grotto local)", () => {
    const required = [
      "hero",
      "heroFallback",
      "chapel",
      "sanctuary",
      "garden",
      "hall",
      "feast",
    ] as const;
    for (const key of required) {
      expect((images as Record<string, string>)[key]?.length).toBeGreaterThan(0);
    }
    // OLOL chapel and feast both point at grotto
    expect(images.chapel).toContain("grotto");
    expect(images.feast).toContain("grotto");
    expect(images.hall).toContain("community");
  });

  it("serveRoles has 4 entries and devotions has 6 entries at 11:35", () => {
    expect(serveRoles).toHaveLength(4);
    expect(devotions).toHaveLength(6);
    expect(devotions.some((d) => d.when.includes("11:35"))).toBe(true);
  });

  it("visitorGuidelines has dress[5] and other[6]", () => {
    expect(visitorGuidelines.dress).toHaveLength(5);
    expect(visitorGuidelines.other).toHaveLength(6);
  });
});
