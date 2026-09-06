import { expect, test } from "@playwright/test";

test.describe("smoke — routing & hash anchors", () => {
  test("home renders hero and quick facts (Blessed Sacrament)", async ({ page }) => {
    await page.goto("/#/");
    // Round-19 voice merge (audit R1): the display headline is "A tent of
    // meeting."; the parish name leads as the hero eyebrow line.
    await expect(page.getByRole("heading", { name: /A tent of meeting\./i })).toBeVisible();
    await expect(page.getByText(/Church of the Blessed Sacrament/i).first()).toBeVisible();
    await expect(page.getByText(/A Household of Faith, Hope & Love/i).first()).toBeVisible();
    await expect(page.getByText("1 Commonwealth Drive").first()).toBeVisible();
    await expect(page.getByText("Sunday Masses 7:30 AM – 5:30 PM").first()).toBeVisible();
    await expect(page.getByText(/SS\.CC\. since 1958/i).first()).toBeVisible();
  });

  test("Worship alias routes all render same page", async ({ page }) => {
    for (const path of ["/#/worship", "/#/mass-times", "/#/hours-location", "/#/visit"]) {
      await page.goto(path);
      await expect(page.getByRole("heading", { name: /Join Us at the Altar/i }).first()).toBeVisible();
    }
  });

  test("Ministries alias routes render same page", async ({ page }) => {
    await page.goto("/#/ministries");
    await expect(page.getByRole("heading", { name: /Liturgical Ministries/i }).first()).toBeVisible();

    await page.goto("/#/ministry");
    await expect(page.getByRole("heading", { name: /Liturgical Ministries/i }).first()).toBeVisible();
  });

  test("Worship hash anchors are reachable", async ({ page }) => {
    await page.goto("/#/worship#mass");
    await expect(page.locator("#mass")).toBeVisible();

    await page.goto("/#/worship#confession");
    await expect(page.locator("#confession")).toBeVisible();

    await page.goto("/#/worship#visit");
    await expect(page.locator("#visit")).toBeVisible();
  });

  test("Ministries hash anchors are reachable", async ({ page }) => {
    await page.goto("/#/ministries#liturgical");
    await expect(page.locator("#liturgical")).toBeVisible();

    await page.goto("/#/ministries#faith-formation");
    await expect(page.locator("#faith-formation")).toBeVisible();

    await page.goto("/#/ministries#youth");
    await expect(page.locator("#youth")).toBeVisible();

    await page.goto("/#/ministries#community");
    await expect(page.locator("#community")).toBeVisible();
  });

  test("NotFound for unknown route", async ({ page }) => {
    await page.goto("/#/does-not-exist-xyz");
    await expect(page.getByText(/This path does not lead to the church/i)).toBeVisible();
    await expect(page.getByRole("link", { name: /Return Home/i })).toBeVisible();
  });

  test("header mobile drawer opens and closes on navigation", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/#/");

    const toggle = page.getByRole("button", { name: /Open menu|Close menu/i });
    await expect(toggle).toBeVisible();
    await toggle.click();
    // The drawer is a modal dialog; its internal close button shares the
    // "Close menu" name with the hamburger, so assert the dialog itself.
    await expect(page.getByRole("dialog", { name: "Site menu" })).toBeVisible();

    await expect(page.getByRole("link", { name: "Serve" }).first()).toBeVisible();

    await page.getByRole("link", { name: "Serve" }).first().click();
    await expect(page).toHaveURL(/#\/serve/);
    await expect(page.getByRole("button", { name: /Open menu/i })).toBeVisible();
  });

  // Regression: a link to the CURRENT route never changes pathname, so the
  // pathname effect cannot close the drawer. The drawer must close on link
  // activation itself (found via live-site E2E on 2026-08-28 — see
  // docs/code-review-audit-2026-08-28.md H-1).
  test("mobile drawer closes when tapping a link to the current route", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/#/");

    await page.getByRole("button", { name: "Open menu" }).click();
    const drawer = page.getByRole("navigation", { name: "Mobile" });
    await expect(drawer).toBeVisible();

    // Tap "Home" while already on / — the drawer must close.
    await drawer.getByRole("link", { name: "Home" }).click();
    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
    await expect(drawer).toHaveCount(0);

    // Different route still navigates and closes the drawer.
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("navigation", { name: "Mobile" }).getByRole("link", { name: "News & Events" }).click();
    await expect(page).toHaveURL(/#\/news-events/);
    await expect(page.getByRole("button", { name: /Open menu/i })).toBeVisible();
  });

  // "Sacred Motion" package (docs/ui-ux-remediation-plan-2026-08-28.md):
  // staged hero entrance + event chip hierarchy.
  test("home hero content has staged rise-in entrance classes", async ({ page }) => {
    await page.goto("/#/");
    const hero = page.locator("section").first();
    await expect(hero.locator("h1")).toHaveClass(/rise-in rise-in-d1/);
    // The quick-facts row is the fourth staged entrance (.rise-in-d4).
    const factsRow = hero.locator("div.rise-in-d4");
    await expect(factsRow).toContainText(/SS\.CC\. since 1958/i);
    await expect(hero.getByRole("link", { name: "Mass Times" })).toBeVisible();
    // Entrance animations settle at full opacity (fill-mode both).
    await expect.poll(async () =>
      hero.locator("h1").evaluate((el) => getComputedStyle(el).opacity),
    ).toBe("1");
  });

  // Round-5 chip system (docs/design-enhancement-round5-2026-08-30.md P-6):
  // category inside a bordered chip + display-serif date beside it (EventMeta).
  test("event cards render category chips with BSC tones", async ({ page }) => {
    await page.goto("/#/news-events");
    const chips = page.locator("span", { hasText: /^(Parish|Devotion|Formation|Archdiocese)$/ });
    await expect(chips.first()).toBeVisible();
    await expect(chips.first()).toHaveClass(/rounded-full/);
    // First event is a Devotion entry → categoryTone gold step (src/utils/categoryTone.ts).
    await expect(chips.first()).toHaveClass(/text-bsc-gold-700/);
    // The date sits beside the chip in the display serif voice.
    const wrapper = chips.first().locator("xpath=..");
    await expect(wrapper.locator("span").last()).toHaveClass(/font-display/);
  });

  test("back-to-top appears after scrolling and returns to the top", async ({ page }) => {
    await page.goto("/#/");
    const backToTop = page.getByRole("button", { name: /back to top/i });
    await expect(backToTop).toBeHidden();

    await page.mouse.wheel(0, 1200);
    await expect(backToTop).toBeVisible();

    await backToTop.click();
    await expect.poll(async () => page.evaluate(() => window.scrollY)).toBeLessThan(50);
    await expect(backToTop).toBeHidden();
  });
});
