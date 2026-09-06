import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright E2E for blessed-sacrament-church — HashRouter SPA.
 * Chromium-only in v1 (fast). Add firefox/webkit later.
 * webServer reuses existing dev server if running; otherwise starts `pnpm dev`.
 * Project uses `channel: "chromium"` (new headless): the rAF-throttled scroll
 * hooks (useScrollProgress) need continuous BeginFrames, which the
 * headless-shell build does not schedule.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html", { open: "never" }], ["list"]],
  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  // Cold-start headroom: on a fresh install the dev server's first page load
  // triggers vite dep-optimization (~1900 modules incl. lucide-react), which can
  // leave the SPA blank for >5s and flake the first navigations (observed on
  // fresh clones; CI masks it via retries). Extends the failure-detection window
  // only — assertions are unchanged.
  expect: { timeout: 15_000 },
  webServer: {
    command: "pnpm exec vite --port 5173 --host 127.0.0.1 --strictPort",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], channel: "chromium" },
    },
  ],
});
