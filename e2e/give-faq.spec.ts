import { expect, test } from "@playwright/test";

test.describe("Give + FAQ + Worship journeys", () => {
  test("Give alias routes both show 6 options with UEN", async ({ page }) => {
    await page.goto("/#/give");
    await expect(page.getByRole("heading", { name: /Stewardship & Generosity/i }).first()).toBeVisible();
    for (const option of [
      "PayNow",
      "Weekend Collection",
      "Cheque",
      "Cash",
      "General Church Offering",
      "Mass Offerings",
    ]) {
      await expect(page.getByRole("heading", { name: option }).first()).toBeVisible();
    }
    await expect(page.getByText(/T08CC1234A/).first()).toBeVisible();

    await page.goto("/#/donate");
    await expect(page.getByRole("heading", { name: /Stewardship & Generosity/i }).first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "PayNow" })).toBeVisible();
  });

  test("FAQ accordion single-open with aria", async ({ page }) => {
    await page.goto("/#/faq");
    await expect(page.getByRole("heading", { name: /Frequently Asked Questions/i })).toBeVisible();

    const firstQuestion = page.getByRole("button", { name: /What are the Mass times\?/i });
    const secondQuestion = page.getByRole("button", { name: /When is confession available\?/i });

    await expect(firstQuestion).toHaveAttribute("aria-expanded", "true");
    await expect(secondQuestion).toHaveAttribute("aria-expanded", "false");

    // Animated collapse: open panel visible, closed panel collapsed to zero height.
    const panels = page.getByRole("region", { includeHidden: true });
    await expect(panels.nth(0)).toBeVisible();
    await expect(panels.nth(1)).toBeHidden();

    await secondQuestion.click();
    await expect(secondQuestion).toHaveAttribute("aria-expanded", "true");
    await expect(firstQuestion).toHaveAttribute("aria-expanded", "false");
    await expect(panels.nth(1)).toBeVisible();
    await expect(panels.nth(0)).toBeHidden();
  });

  test("Worship Find Us and maps", async ({ page }) => {
    await page.goto("/#/worship");
    await expect(page.getByRole("heading", { name: /Join Us at the Altar/i }).first()).toBeVisible();

    await expect(page.locator("#mass")).toBeVisible();
    await expect(page.locator("#confession")).toBeVisible();
    await expect(page.locator("#visit")).toBeVisible();

    await expect(page.getByText("Morning", { exact: true }).first()).toBeVisible();
    await expect(page.getByText(/Reconciliation|Confession/i).first()).toBeVisible();

    await expect(page.getByText(/1 Commonwealth Drive/i).first()).toBeVisible();
    await expect(page.getByText(/Queenstown \(EW19\)/i).first()).toBeVisible();

    const iframe = page.locator('iframe[title="Map to Church of the Blessed Sacrament"]');
    await expect(iframe).toBeAttached();
    await expect(iframe).toHaveAttribute("src", /google\.com\/maps/);
  });

  test("Footer Give link from home navigates to /give", async ({ page }) => {
    await page.goto("/#/");

    await page.getByRole("navigation", { name: "Get involved" }).getByRole("link", { name: /^Give$/ }).click();
    await expect(page).toHaveURL(/#\/give/);
    await expect(page.getByRole("heading", { name: /^Give$/i }).first()).toBeVisible();
  });
});
