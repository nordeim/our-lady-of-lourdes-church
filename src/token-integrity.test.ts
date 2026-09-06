import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

/**
 * Token-integrity guard — OLOL port.
 * Every bsc-* class referenced in non-test src/ source must be backed by a
 * --color-bsc-* definition in src/index.css @theme. Tailwind v4 silently
 * drops unknown utilities, so a missing token is an invisible styling no-op.
 * Budget is 33 colors + 2 shadows.
 */
const root = resolve(__dirname, "..");

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(join(root, dir))) {
    const rel = `${dir}/${entry}`;
    const full = join(root, rel);
    if (statSync(full).isDirectory()) walk(rel, out);
    else out.push(rel);
  }
  return out;
}

const css = readFileSync(join(root, "src/index.css"), "utf8");
const definedTokens = new Set(
  [...css.matchAll(/--color-bsc-([a-z0-9-]+):/g)].map((m) => m[1]),
);

const sourceFiles = walk("src").filter(
  (f) => /\.(ts|tsx)$/.test(f) && !/\.test\.(ts|tsx)$/.test(f),
);

const offenders = new Map<string, string[]>();
for (const file of sourceFiles) {
  const text = readFileSync(join(root, file), "utf8");
  const used = new Set(
    [...text.matchAll(/bsc-([a-z]+-[0-9]+|cream|parchment-dark|parchment|stone|ink|charcoal)\b/g)].map(
      (m) => m[1],
    ),
  );
  const missing = [...used].filter((t) => !definedTokens.has(t)).sort();
  if (missing.length > 0) offenders.set(file, missing);
}

describe("design-token integrity (src ↔ @theme)", () => {
  it("defines 33 bsc-* colors + 2 shadows", () => {
    const colorCount = (css.match(/^\s*--color-bsc-/gm) ?? []).length;
    const shadowCount = (css.match(/^\s*--shadow-bsc/gm) ?? []).length;
    expect(colorCount).toBe(33);
    expect(shadowCount).toBe(2);
  });

  it("defines the shadow tokens", () => {
    expect(css).toContain("--shadow-bsc:");
    expect(css).toContain("--shadow-bsc-lg:");
  });

  it("backs every referenced bsc-* class with a defined token", () => {
    expect([...offenders.entries()]).toEqual([]);
  });

  it("defines gold-700 and terracotta-600 bearing tokens", () => {
    expect(definedTokens.has("gold-700")).toBe(true);
    expect(definedTokens.has("terracotta-600")).toBe(true);
    expect(css).toContain("#85641c");
    expect(css).toContain("#8f5038");
  });
});
