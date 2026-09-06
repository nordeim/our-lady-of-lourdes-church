import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * CI workflow contract — OLOL port.
 * .github/workflows/ci.yml must trigger on push/pull_request to main and run
 * the documented five-step gate: lint → typecheck → test → test:e2e → build.
 */
const root = resolve(__dirname, "..");
const ci = readFileSync(resolve(root, ".github", "workflows", "ci.yml"), "utf8");

const branchValues = [...ci.matchAll(/branches:\s*(\S+)/g)].map((m) => m[1]);

describe(".github/workflows/ci.yml trigger + gate contract", () => {
  it("declares exactly two branch filters", () => {
    expect(branchValues).toHaveLength(2);
  });

  it("triggers push and pull_request on main as a proper flow sequence", () => {
    expect(branchValues).toEqual(["[main]", "[main]"]);
  });

  it("uses flow-sequence syntax for both triggers (no plain-scalar corruption)", () => {
    const corrupted = branchValues.filter((v) => !(v.startsWith("[") && v.endsWith("]")));
    expect(corrupted).toEqual([]);
  });

  it("runs the five documented gate steps", () => {
    for (const step of ["pnpm lint", "pnpm typecheck", "pnpm test", "pnpm test:e2e", "pnpm build"]) {
      expect(ci).toContain(step);
    }
  });

  it("installs deps with --frozen-lockfile and uses Node 24 + pnpm 11", () => {
    expect(ci).toContain("--frozen-lockfile");
    expect(ci).toContain("pnpm/action-setup");
    expect(ci).toContain("node-version: 24");
  });
});
