import { expect, test, type Page } from "@playwright/test";
import { gotoHash } from "./helpers";

/**
 * Round-7 E2E audit — retargeted to the BSC contract (round 16):
 *   1. Print never loses below-fold reveal content (print override).
 *   2. Worship confession section is reachable with the mercy copy.
 *   3. News & Events closes with a dark "Stay Connected" band.
 *   4. Give's PayNow card is featured and carries the UEN.
 *   5. Ministries jump pills track reading position (scrollspy).
 *   6. The active desktop nav item carries aria-current.
 *   7. Home featured events link to the events page ("View All").
 *   8. FAQ surfaces the office loop-back (contact the parish office).
 */

test.describe("Round-7 enhancement audit", () => {
  test("print media reveals below-fold timeline content", async ({ page }) => {
    await gotoMain(page, "/history");
    // Timeline entries are Reveal wrappers (opacity 0 until intersecting);
    // the last one is far below the fold in screen media.
    const lastEntry = page.locator("main .reveal").last();
    await expect(lastEntry).toBeAttached();
    await page.emulateMedia({ media: "print" });
    await expect(lastEntry).toHaveCSS("opacity", "1");
    await page.emulateMedia({ media: "screen" });
  });

  test("worship confession section shows the mercy copy", async ({ page }) => {
    await gotoMain(page, "/worship");
    await expect(
      page.getByRole("heading", { name: /Confession & Adoration/i }),
    ).toBeVisible();
    await expect(page.getByText(/sacrament of Reconciliation/i).first()).toBeVisible();
    await expect(page.locator("#confession")).toBeVisible();
  });

  test("news & events closing band is the Stay Connected dark band", async ({ page }) => {
    await gotoMain(page, "/news-events");
    const band = page.locator('main section[class*="bg-bsc-sapphire-900"]').last();
    const heading = band.getByRole("heading", { name: /Stay Connected/i });
    await expect(heading).toBeVisible();
    await expect(heading).toHaveCSS("color", "rgb(248, 245, 239)");
    await expect(band.getByRole("link", { name: /Facebook/i })).toBeVisible();
    await expect(band.getByRole("link", { name: /Instagram/i })).toBeVisible();
  });

  test("give PayNow card is featured and carries the UEN", async ({ page }) => {
    await gotoMain(page, "/give");
    const payNowCard = page
      .getByRole("heading", { name: "PayNow" })
      .locator("xpath=ancestor::div[contains(@class,'card-tint')][1]");
    await expect(payNowCard).toBeVisible();
    await expect(payNowCard).toContainText("T08CC1234A");
  });

  test("ministries scrollspy moves aria-current to the section in view", async ({
    page,
  }) => {
    await gotoMain(page, "/ministries");
    const pills = page.getByRole("navigation", { name: /Jump to ministry/i });
    await expect(pills.locator("a")).toHaveCount(6);

    await page.locator("#faith-formation").scrollIntoViewIfNeeded();
    // No hard sleep — toHaveText auto-polls until the IO callback moves
    // aria-current (round-7 audit L-1).
    const current = pills.locator('a[aria-current="true"]');
    await expect(current).toHaveCount(1);
    await expect(current).toHaveText(/Faith Formation/i);
  });

  test("active desktop nav item carries the permanent aria-current", async ({
    page,
  }) => {
    await gotoMain(page, "/history");
    const primaryNav = page.getByRole("navigation", { name: "Primary" });
    const aboutTrigger = primaryNav.getByRole("button", { name: /About/i });
    await expect(aboutTrigger).toBeVisible();
    await expect(aboutTrigger).toHaveAttribute("aria-current", "true");
    const serveLink = primaryNav.getByRole("link", { name: "Serve" });
    await expect(serveLink).toBeVisible();
    await expect(serveLink).not.toHaveAttribute("aria-current", "true");
  });

  test("home featured events link to the events page", async ({ page }) => {
    await gotoMain(page, "/");
    const eventCard = page.getByRole("heading", { level: 3 }).first();
    await expect(eventCard).toBeVisible();
    const link = page.getByRole("link", { name: /View All/i });
    await expect(link).toHaveAttribute("href", /#\/news-events/);
  });

  test("faq surfaces the office loop-back", async ({ page }) => {
    await gotoMain(page, "/faq");
    await expect(
      page.getByText(/please contact the parish office/i).first(),
    ).toBeVisible();
    await expect(page.getByText(/How do I arrange a baptism or wedding\?/i)).toBeVisible();
  });
});

async function gotoMain(page: Page, route: string) {
  await gotoHash(page, route);
  await page.waitForTimeout(300);
}
