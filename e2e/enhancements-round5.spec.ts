import { expect, test, type Page } from "@playwright/test";
import { gotoHash } from "./helpers";

/**
 * Round-5 E2E audit — retargeted to the BSC contract (round 16):
 *   1. Worship highlights today's Mass card (matches the run date).
 *   2. Give closes with the scripture band + office loop-back (phone).
 *   3. History story column is sticky at desktop widths.
 *   4. Grounds card photographs drift (scale) on card hover.
 *   5. Timeline rail is a drawn gradient.
 *   6. NotFound carries the ghosted emblem.
 */

test.describe("Round-5 enhancement audit", () => {
  test("worship highlights exactly today's Mass card", async ({ page }) => {
    await gotoMain(page, "/worship");
    const cards = page.locator('[data-testid="mass-card"]');
    await expect(cards).toHaveCount(3);

    const today = new Date().getDay();
    const expectedTitle =
      today === 0 ? /Sunday/i : today === 6 ? /Saturday/i : /Monday – Friday/i;

    const todayCards = page.locator('[data-testid="mass-card"][data-today="true"]');
    await expect(todayCards).toHaveCount(1);
    await expect(todayCards.first().getByRole("heading")).toHaveText(expectedTitle);
    await expect(todayCards.first().getByText("Today", { exact: true })).toBeVisible();
  });

  test("give closes with the scripture band and office loop-back", async ({ page }) => {
    await gotoMain(page, "/give");
    const band = page.locator('main section[class*="bg-bsc-sapphire-900"]').last();
    await expect(band.getByText(/cheerful giver/i)).toBeVisible();
    // Office loop-back: the contact band exposes the parish phone.
    await expect(
      page.getByRole("link", { name: /Call \+65 6474 0582/i }),
    ).toBeVisible();
  });

  test("history story column is sticky at desktop width", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoMain(page, "/history");
    const story = page.getByTestId("history-story");
    await expect(story).toBeVisible();
    await expect(story).toHaveCSS("position", "sticky");
    await expect(story).toHaveCSS("top", "112px"); // lg:top-28 = 7rem = 112px
  });

  test("grounds card photograph drifts on hover", async ({ page }) => {
    await gotoMain(page, "/");
    const card = page.locator("a.card-lift").filter({ hasText: "Main Church" }).first();
    const img = card.locator("img").first();
    await expect(img).toBeVisible();
    await expect(img).toHaveClass(/img-zoom/);
  });

  test("timeline rail is a drawn gradient", async ({ page }) => {
    await gotoMain(page, "/history");
    const rail = page.getByTestId("timeline-rail");
    await expect(rail).toBeAttached();
    const image = await rail.evaluate((el) => getComputedStyle(el).backgroundImage);
    expect(image).toContain("linear-gradient");
  });

  test("notfound carries the ghosted emblem", async ({ page }) => {
    await gotoMain(page, "/this-does-not-exist-r5");
    await expect(page.getByText(/This path does not lead to the church/i)).toBeVisible();
    const svg = page.locator("main section svg");
    await expect(svg).toBeVisible();
    await expect(svg).toHaveAttribute("aria-hidden", "true");
  });
});

async function gotoMain(page: Page, route: string) {
  await gotoHash(page, route);
  await page.waitForTimeout(300);
}
