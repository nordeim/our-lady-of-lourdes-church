import { expect, test, type Page } from "@playwright/test";
import { gotoHash } from "./helpers";

/**
 * Round-18 mobile navigation contracts (audit F1–F5, see
 * docs/code-review-audit-round18-2026-09-02.md).
 *
 * Runs at a phone viewport (390×844). F1 root cause: `backdrop-filter` on the
 * fixed header made the header the containing block for the fixed drawer, so
 * `inset-y-0` resolved against the ~68px header instead of the viewport and
 * the menu collapsed to a strip. The geometry assertions below pin the fix:
 * the drawer must fill the viewport and every item must sit inside its
 * visible box (not merely exist in the DOM).
 */

const MOBILE = { width: 390, height: 844 };

/** Nav labels rendered inside the mobile drawer, in source order. */
const DRAWER_LINKS = [
  "Home",
  "The Parish",
  "Our History",
  "FAQ",
  "Mass Times",
  "Confession & Adoration",
  "Find Us",
  "Liturgical",
  "Faith Formation",
  "Pastoral Care",
  "News & Events",
  "Serve",
];

async function openDrawer(page: Page) {
  const drawer = page.getByRole("dialog", { name: "Site menu" });
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(drawer).toBeVisible();
  return drawer;
}

test.describe("mobile navigation — drawer contracts at phone viewport", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(MOBILE);
    await gotoHash(page, "/");
  });

  test("drawer fills the viewport when opened (F1)", async ({ page }) => {
    const drawer = await openDrawer(page);
    const box = await drawer.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.height).toBeGreaterThanOrEqual(MOBILE.height * 0.9);
  });

  test("every nav item is visible inside the drawer's box (F1)", async ({ page }) => {
    const drawer = await openDrawer(page);
    const drawerBox = (await drawer.boundingBox())!;
    expect(drawerBox.height).toBeGreaterThanOrEqual(MOBILE.height * 0.9);
    for (const label of DRAWER_LINKS) {
      const link = drawer.getByRole("link", { name: label });
      await expect(link).toBeVisible();
      const box = await link.boundingBox();
      expect(box, `link "${label}" must render inside the drawer`).not.toBeNull();
      // Contained in the drawer's visible box: not clipped into an
      // overflow strip below/above it.
      expect(box!.y, `link "${label}" top edge`).toBeGreaterThanOrEqual(drawerBox.y - 1);
      expect(
        box!.y + box!.height,
        `link "${label}" bottom edge`,
      ).toBeLessThanOrEqual(drawerBox.y + drawerBox.height + 1);
      // And practically on screen.
      expect(box!.y + box!.height).toBeLessThanOrEqual(MOBILE.height);
    }
  });

  test("drawer's own close button closes it (F2 — real close path)", async ({ page }) => {
    const drawer = await openDrawer(page);
    // The open drawer overlays the hamburger (right-side sheet), so the
    // drawer's internal close button is the primary dismiss affordance.
    await drawer.getByRole("button", { name: "Close menu" }).click();
    await expect(drawer).toBeHidden();
    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
  });

  test("hamburger is race-safe: pointerdown + click ends closed (F2)", async ({ page }) => {
    await openDrawer(page);
    // The hamburger sits beneath the open drawer, so the atomic tap sequence
    // is driven directly: the outside-click handler must ignore the toggle so
    // the click's toggle() cannot reopen what pointerdown just closed
    // (round-18 audit F2 — mirrors the queenstown toggle guard).
    await page.evaluate(() => {
      const btn = [...document.querySelectorAll("button")].find(
        (b) =>
          b.getAttribute("aria-label") === "Close menu" &&
          b.getAttribute("aria-expanded") === "true",
      );
      if (!btn) throw new Error("hamburger not found");
      btn.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, composed: true }));
      (btn as HTMLElement).click();
    });
    await expect(page.getByRole("dialog", { name: "Site menu" })).toBeHidden();
  });

  test("tapping a parent category label does not close the drawer (F3)", async ({ page }) => {
    const drawer = await openDrawer(page);
    // Parent labels ("About", "Worship", "Ministries") are non-interactive
    // category headings — tapping one must not dismiss the menu.
    await drawer.getByText("About", { exact: true }).click();
    await expect(drawer).toBeVisible();
  });

  test("tapping a child link navigates and closes the drawer", async ({ page }) => {
    const drawer = await openDrawer(page);
    await drawer.getByRole("link", { name: "The Parish" }).click();
    await expect(page).toHaveURL(/#\/about/);
    await expect(drawer).toBeHidden();
  });

  test("tapping outside the drawer closes it", async ({ page }) => {
    const drawer = await openDrawer(page);
    // Left edge, over the non-interactive hero area.
    await page.mouse.click(10, 120);
    await expect(drawer).toBeHidden();
  });

  test("drawer carries the Give CTA (F5)", async ({ page }) => {
    const drawer = await openDrawer(page);
    const give = drawer.getByRole("link", { name: "Give" });
    await expect(give).toBeVisible();
    const drawerBox = (await drawer.boundingBox())!;
    const giveBox = (await give.boundingBox())!;
    expect(giveBox.y + giveBox.height).toBeLessThanOrEqual(drawerBox.y + drawerBox.height + 1);
  });
});
