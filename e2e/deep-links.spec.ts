import { expect, test } from "@playwright/test";

/**
 * Round-12 — audit finding F-3: path-style deep links (hash stripped by chat
 * apps or lost in print) must land on the requested page instead of silently
 * rendering Home. The app rewrites known path routes to their hash equivalents
 * before React mounts (src/utils/deepLinks.ts, wired in src/main.tsx).
 * Retargeted to BSC copy (round 16): the h1s come from the PageHero titles.
 */
test.describe("path-style deep links (audit F-3)", () => {
  test("/worship lands on the Worship page", async ({ page }) => {
    await page.goto("/worship");
    await expect(page).toHaveURL(/#\/worship/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /worship/i,
    );
  });

  test("/news-events lands on News & Events", async ({ page }) => {
    await page.goto("/news-events");
    await expect(page).toHaveURL(/#\/news-events/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /news & events/i,
    );
  });

  test("the /donate alias lands on Give", async ({ page }) => {
    await page.goto("/donate");
    await expect(page).toHaveURL(/#\/donate/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/give/i);
  });
});
