import { describe, expect, it } from "vitest";
import { site } from "@/data/site";

describe("site", () => {
  it("has canonical address 50 Ophir Road with full and encoded query", () => {
    expect(site.address.street).toBe("50 Ophir Road");
    expect(site.address.city).toBe("Singapore");
    expect(site.address.zip).toBe("188690");
    expect(site.address.full).toContain(site.address.street);
    expect(site.address.full).toContain(site.address.zip);
    expect(site.address.query).toBe(encodeURIComponent(site.address.full));
  });

  it("has mapsUrl and mapsEmbedSrc matching google.com/maps", () => {
    expect(site.mapsUrl).toMatch(/google\.com\/maps/);
    expect(site.mapsEmbedSrc).toMatch(/google\.com\/maps/);
    expect(site.mapsUrl).toContain("Ophir");
  });

  it("has contact phones (+65), no UEN, chequePayee, facebook/archdiocese, tamilName and tagline", () => {
    expect(site.contact.officePhone).toMatch(/\+65/);
    expect(site.contact.officePhone).toContain("6294 0624");
    expect(site.contact.email).toMatch(/@/);
    expect(site.contact.email).toBe("colol.secretariat@catholic.org.sg");
    // OLOL has no UEN — PayNow UEN must be confirmed with office
    expect(site.uen).toBe("");
    expect(site.chequePayee).toBe("Church of Our Lady of Lourdes");
    expect(site.facebook).toMatch(/^https:\/\//);
    expect(site.archdiocese).toMatch(/^https:\/\//);
    expect(site.tamilName).toBe("தூய லூர்து அன்னை ஆலயம்");
    expect(site.tagline).toBe("A grotto of welcome in the city.");
    expect(site.name).toBe("Church of Our Lady of Lourdes");
    expect(site.shortName).toBe("Our Lady of Lourdes");
  });

  it("has hours for church, office, reception, adoration, confession", () => {
    expect(site.hours.church.length).toBeGreaterThan(0);
    expect(site.hours.office.length).toBeGreaterThan(0);
    expect(site.hours.reception.length).toBeGreaterThan(0);
    expect(site.hours.adoration.length).toBeGreaterThan(0);
    expect(site.hours.confessionWeekday.length).toBeGreaterThan(0);
    expect(site.hours.confessionWeekend.length).toBeGreaterThan(0);
  });

  it("has mass schedule with weekdayNoon/weekdayEvening/saturday/sunday[5]/confession/adoration", () => {
    expect(site.mass.weekdayNoon.length).toBeGreaterThan(0);
    expect(site.mass.weekdayEvening.length).toBeGreaterThan(0);
    expect(site.mass.saturday.length).toBeGreaterThan(0);
    expect(site.mass.sunday).toHaveLength(5);
    for (const slot of site.mass.sunday) {
      expect(slot.time.length).toBeGreaterThan(0);
      expect(slot.language.length).toBeGreaterThan(0);
    }
    expect(site.mass.confession.length).toBeGreaterThan(0);
    expect(site.mass.adoration.length).toBeGreaterThan(0);
    expect(site.mass.note.length).toBeGreaterThan(0);
  });

  it("has feast Our Lady of Lourdes on 11 February", () => {
    expect(site.feast.name).toBe("Our Lady of Lourdes");
    expect(site.feast.date).toBe("11 February");
  });

  it("has canonical url https://ourladyoflourdes.sg/ with ogImage", () => {
    expect(site.url).toBe("https://ourladyoflourdes.sg/");
    expect(site.ogImage).toBe("https://ourladyoflourdes.sg/images/hero-church.jpg");
  });

  it("has no instagram/youtube UEN-gated socials but facebook present", () => {
    expect(site.instagram).toBe("");
    expect(site.youtube).toBe("");
    expect(site.facebook.length).toBeGreaterThan(0);
  });
});
