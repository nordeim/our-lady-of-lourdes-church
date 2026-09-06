import { expect, test } from "@playwright/test";
import { gotoHash } from "./helpers";

/**
 * Round-2 "Sacred Polish" E2E audit — retargeted to the BSC contract (round 16):
 *   1. Dark CTA-band headings render cream on the sapphire-900 band (WCAG-safe).
 *   2. Head completeness: emoji favicon data URI, og:url, Church JSON-LD.
 *   3. Route transitions: keyed page-in wrapper replays on pathname change.
 *   4. Scroll progress rail + BackToTop ring track page depth.
 */

test.describe("Round-2 enhancement audit", () => {
  test("dark CTA-band heading is cream on Home (bsc-cream on sapphire-900)", async ({ page }) => {
    await gotoHash(page, "/");
    const band = page.locator('main section[class*="bg-bsc-sapphire-900"]').last();
    const h2 = band.getByRole("heading", { name: /Take Your Place in Our Community/i });
    await expect(h2).toBeVisible();
    // bsc-cream #f8f5ef on the dark band.
    await expect(h2).toHaveCSS("color", "rgb(248, 245, 239)");
  });

  test("head ships the SVG favicon, og:url, and Church JSON-LD", async ({ page }) => {
    await gotoHash(page, "/");
    // Round-19 (audit R2-F7): the ⛪ emoji data-URI is retired for a
    // purpose-drawn /favicon.svg (sapphire field, gold folded-roof mark).
    const icon = page.locator('link[rel="icon"][type="image/svg+xml"]');
    await expect(icon).toHaveAttribute("href", /\.?\/favicon\.svg$/);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      "content",
      "https://bsc.org.sg/",
    );

    const jsonld = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonld).not.toBeNull();
    const parsed = JSON.parse(jsonld!) as {
      "@type": string;
      telephone: string;
      address: { streetAddress: string; postalCode: string };
    };
    expect(parsed["@type"]).toBe("Church");
    expect(parsed.telephone).toBe("+65 6474 0582");
    expect(parsed.address.streetAddress).toBe("1 Commonwealth Drive");
    expect(parsed.address.postalCode).toBe("149603");
  });

  test("robots.txt resolves from public/", async ({ page }) => {
    const response = await page.request.get("/robots.txt");
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain("User-agent");
  });

  test("route changes replay the page-in wrapper", async ({ page }) => {
    await gotoHash(page, "/worship");
    const container = page.getByTestId("page-container");
    await expect(container).toHaveAttribute("data-route", "/worship");
    await expect(container).toHaveCSS("animation-name", "page-in");

    await page.click('nav[aria-label="Primary"] >> text=News & Events');
    await expect(container).toHaveAttribute("data-route", "/news-events");
    await expect(container).toHaveCSS("animation-name", "page-in");
  });

  test("hash-only navigation keeps the same keyed node (data-route unchanged)", async ({
    page,
  }) => {
    await gotoHash(page, "/worship");
    const container = page.getByTestId("page-container");
    await expect(container).toHaveAttribute("data-route", "/worship");
    // Hash-only update (same pathname): the keyed node must NOT re-mount.
    await page.evaluate(() => {
      window.location.hash = "#/worship#mass";
    });
    await expect(page).toHaveURL(/#mass/);
    await expect(container).toHaveAttribute("data-route", "/worship");
  });

  test("scroll progress rail fills with page depth", async ({ page }) => {
    await gotoHash(page, "/");
    const rail = page.getByTestId("scroll-progress");
    await expect(rail).toBeAttached();
    await expect(rail).toHaveCSS("transform", "matrix(0, 0, 0, 1, 0, 0)");

    // Land at mid-depth (50%): a stable resting value that deterministically
    // matches. behavior:"instant" overrides the page's CSS smooth scrolling so
    // the resting position is reached immediately.
    await page.evaluate(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: Math.round(max * 0.5), behavior: "instant" });
    });
    await expect
      .poll(() => rail.evaluate((el) => getComputedStyle(el).transform))
      .toMatch(/^matrix\(0\.[1-9]/);
  });

  test("BackToTop ring stroke offset tracks page depth", async ({ page }) => {
    await gotoHash(page, "/");
    const backToTop = page.getByTestId("back-to-top");
    await expect(backToTop).toBeAttached();
    await page.mouse.wheel(0, 1200);
    await expect(backToTop).toBeAttached();
  });
});
