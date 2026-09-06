import { expect, test } from "@playwright/test";
import { gotoHash } from "./helpers";

/**
 * Round-19 E2E — "The Merge" (external audits R1 + R2):
 *   1.  Head ships the full social-sharing set (og:image, twitter:card,
 *       canonical, theme-color) — audit R2-F2.
 *   2.  Purpose-drawn SVG favicon replaces the emoji data-URI — R2-F7.
 *   3.  Hero alt names the tent roof; headline is "A tent of meeting." — R1.
 *   4.  Welcome closes with the overlapping quote card — R1 merge-02.
 *   5.  Global :focus-visible gold ring — R1 merge-03.
 *   6.  CTA band bloom layer carries the bloom-drift animation — R1 motion.
 *   7.  Editorial corners: grounds card radius collapses to ≤ 6px — merge-04.
 *   8.  Round-18 regression watch: mobile drawer still full-height with all
 *       13 links incl. Give.
 */

test.describe("round-19 head metadata", () => {
  test("ships og:image, twitter:card, canonical and theme-color", async ({ page }) => {
    await gotoHash(page, "/");
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      /hero-church\.jpg/,
    );
    await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute(
      "content",
      /tent roof/i,
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://bsc.org.sg/",
    );
    await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
      "content",
      "#0a1122",
    );
  });

  test("links the purpose-drawn SVG favicon (no emoji data-URI)", async ({ page }) => {
    await gotoHash(page, "/");
    await expect(page.locator('link[rel="icon"]')).toHaveAttribute(
      "href",
      /\.?\/favicon\.svg$/,
    );
    const svg = await page.request.get("./favicon.svg");
    expect(svg.status()).toBe(200);
    expect(await svg.text()).toContain("<svg");
  });
});

test.describe("round-19 home voice & motion", () => {
  test("hero names the roof in alt and leads with the tent headline", async ({ page }) => {
    await gotoHash(page, "/");
    const h1 = page.locator("h1");
    await expect(h1).toContainText("A tent of meeting.");
    const heroImg = page.locator("section").first().locator("img");
    await expect(heroImg).toHaveAttribute("alt", /tent-shaped roof/i);
  });

  test("welcome section closes with the expected-you quote card", async ({ page }) => {
    await gotoHash(page, "/");
    await expect(page.locator(".welcome-quote")).toContainText(
      "You are not a visitor here. You are expected.",
    );
  });

  test("CTA band bloom layer drifts (bloom-drift animation)", async ({ page }) => {
    await gotoHash(page, "/");
    const bloom = page.locator(".bloom-drift").first();
    await expect(bloom).toBeAttached();
    await expect(bloom).toHaveCSS("animation-name", /bloom-drift/);
  });

  test("grounds cards resolve to the editorial corner (≤ 6px radius)", async ({ page }) => {
    await gotoHash(page, "/");
    const card = page.locator("a.card-lift").first();
    await expect(card).toBeVisible();
    const radius = await card.evaluate((el) => getComputedStyle(el).borderRadius);
    expect(parseFloat(radius)).toBeLessThanOrEqual(6.5);
  });
});

test.describe("round-19 accessibility & regression watch", () => {
  test("keyboard focus shows the global gold ring", async ({ page }) => {
    await gotoHash(page, "/");
    await page.keyboard.press("Tab"); // skip link
    await page.keyboard.press("Tab"); // brand link
    const focused = page.locator(":focus");
    const outline = await focused.evaluate((el) => {
      const cs = getComputedStyle(el);
      return { width: cs.outlineWidth, color: cs.outlineColor };
    });
    expect(outline.width).toBe("2px");
    expect(outline.color).toContain("212, 173, 66"); // bsc-gold-400 #d4ad42
  });

  test("mobile drawer stays full-height with all 13 links incl. Give", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoHash(page, "/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const drawer = page.locator('nav[aria-label="Mobile"]');
    await expect(drawer).toBeVisible();
    const box = await drawer.evaluate((el) => {
      const rect = el.parentElement!.getBoundingClientRect();
      return { top: rect.top, height: rect.height };
    });
    expect(box.top).toBe(0);
    expect(box.height).toBeGreaterThanOrEqual(843);
    expect(await drawer.locator("a").count()).toBe(13);
    await expect(drawer.locator('a[href*="give"]').last()).toBeVisible();
  });
});
