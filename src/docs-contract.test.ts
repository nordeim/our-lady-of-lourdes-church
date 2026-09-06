import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Docs-contract guard — OLOL port.
 * AGENTS.md / CLAUDE.md / README.md must describe the Church of Our Lady of
 * Lourdes (50 Ophir Road, 1888, 11 February) and must not present stale BSC
 * parish facts as current. BSC strings are allowed only inside "Don't" guard
 * blocks and explicit historical-lineage notes.
 */

const root = resolve(__dirname, "..");
const read = (p: string) => readFileSync(resolve(root, p), "utf8");

// Strip sections where BSC strings are explicitly permitted as "do not
// reintroduce" warnings or historical lineage.
function stripAllowed(text: string): string {
  let out = text;
  // Remove the "## Don't" guard block (through next ## heading)
  out = out.replace(/## Don't[\s\S]*?(?=\n## |\n# \n|\n# )/g, "");
  // Alternative heading forms
  out = out.replace(/## Don'?t[\s\S]*?(?=\n## )/g, "");
  // Allow the blessed-sacrament stub line anywhere (historical lineage)
  out = out.replace(/blessed-sacrament-queenstown_SKILL\.md.*$/gim, "");
  // Remove any historical note lines (BSC lineage, archived fixtures, etc.)
  out = out.replace(/^.*historical.*$/gim, "");
  out = out.replace(/^.*Historical.*$/gm, "");
  // Guard paragraphs that explicitly say "Do not reintroduce" as forbidden
  out = out.replace(/^.*Do not reintroduce.*$/gim, "");
  out = out.replace(/^.*forbidden reintroduction.*$/gim, "");
  // Troubleshooting guard examples that name BSC strings as "expects BSC copy" — historical contrast
  out = out.replace(/^.*expects BSC copy.*$/gim, "");
  out = out.replace(/^.*fixtures were BSC.*$/gim, "");
  out = out.replace(/^.*BSC.*archived.*$/gim, "");
  // Guard lines that list BSC strings as examples of what NOT to assert/swap
  out = out.replace(/^.*not `1 Commonwealth.*$/gim, "");
  out = out.replace(/^.*swap in 1 Commonwealth.*$/gim, "");
  out = out.replace(/^.*don't duplicate them across pages.*$/gim, "");
  return out;
}

const docs = ["AGENTS.md", "CLAUDE.md", "README.md"] as const;

const ololNeedles = [
  "50 Ophir",
  "Our Lady of Lourdes",
  "1888",
  "11 February",
] as const;

// Stale BSC facts that must not appear as current parish truth.
// Each is a pattern; "Tent of Meeting" is only stale when presented as the
// current building description — the Don't guard explicitly names it, so we
// strip that block first.
const stalePatterns: Array<{ label: string; re: RegExp }> = [
  { label: "1 Commonwealth", re: /1 Commonwealth/i },
  { label: "SS.CC", re: /SS\.CC/ },
  { label: "T08CC1234A", re: /T08CC1234A/ },
  { label: "Tent of Meeting (as current)", re: /Tent of Meeting/i },
];

describe("docs OLOL identity contract", () => {
  for (const doc of docs) {
    it(`${doc} contains OLOL strings (50 Ophir, Our Lady of Lourdes, 1888, 11 February)`, () => {
      const text = read(doc);
      for (const needle of ololNeedles) {
        expect(text, `${doc} missing "${needle}"`).toContain(needle);
      }
    });
  }

  for (const doc of docs) {
    it(`${doc} does not present stale BSC parish facts as current`, () => {
      const cleaned = stripAllowed(read(doc));
      for (const { label, re } of stalePatterns) {
        expect(cleaned, `${doc} still contains stale BSC string "${label}" outside Don't/historical guard`).not.toMatch(re);
      }
    });
  }

  it("AGENTS.md retains a Don't guard that names the forbidden ports", () => {
    const text = read("AGENTS.md");
    // The guard must exist so future agents know what not to reintroduce.
    expect(text).toMatch(/## Don't/);
    expect(text).toMatch(/Blessed Sacrament/i);
  });

  it("README.md title/heading names Church of Our Lady of Lourdes", () => {
    const text = read("README.md");
    expect(text).toContain("Church of Our Lady of Lourdes");
  });
});
