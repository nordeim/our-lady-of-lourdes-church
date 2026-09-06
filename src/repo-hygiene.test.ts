import { describe, expect, it } from "vitest";
import { execSync } from "node:child_process";
import { resolve } from "node:path";

/**
 * Repo-hygiene guard — OLOL port.
 * - No src.orig reference copy in git index
 * - No private-key material tracked
 * - No tracked file matches a .gitignore rule (ignore does not untrack)
 */
const root = resolve(__dirname, "..");

function trackedFiles(): string[] {
  const out = execSync("git ls-files", {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
  });
  return out.split("\n").filter(Boolean);
}

describe("no secret material is tracked", () => {
  it("does not track docs/ssh-key.txt", () => {
    const tracked = trackedFiles();
    expect(tracked).not.toContain("docs/ssh-key.txt");
  });

  it("tracks no key-like files anywhere (pem/key/id_rsa patterns)", () => {
    const suspicious = trackedFiles().filter((f) =>
      /(^|\/)(id_rsa|id_ed25519|id_ecdsa)(\..*)?$|\.pem$|\.key$|ssh-key/i.test(f),
    );
    expect(suspicious).toEqual([]);
  });

  it("tracks no private-key material in executable surface", () => {
    const offenders: string[] = [];
    for (const file of trackedFiles()) {
      if (/^(docs|skills|e2e)\//.test(file) || /\.md$|\.txt$/.test(file)) continue;
      if (/\.(png|jpg|jpeg|gif|webp|ico|woff2?|ttf|zip|pdf)$/i.test(file)) continue;
      let text: string;
      try {
        text = execSync(`git show "HEAD:${file.replace(/"/g, '\\"')}" 2>/dev/null`, {
          cwd: root,
          encoding: "utf8",
          maxBuffer: 4 * 1024 * 1024,
        });
      } catch {
        continue;
      }
      if (/-----BEGIN [A-Z ]*PRIVATE KEY-----/.test(text)) offenders.push(file);
    }
    expect(offenders).toEqual([]);
  });
});

describe("no reference copies are tracked", () => {
  it("does not track the src.orig/ reference copy", () => {
    const tracked = trackedFiles();
    const leftovers = tracked.filter((f) => f === "src.orig" || f.startsWith("src.orig/"));
    expect(leftovers).toEqual([]);
  });
});

describe("no tracked file matches a .gitignore rule", () => {
  it("intersection of git ls-files and git check-ignore is empty", () => {
    const tracked = trackedFiles();
    let out = "";
    try {
      out = execSync("git check-ignore --stdin --verbose --non-matching --no-index", {
        cwd: root,
        encoding: "utf8",
        input: `${tracked.join("\n")}\n`,
        maxBuffer: 16 * 1024 * 1024,
      });
    } catch (err) {
      out = (err as { stdout?: string }).stdout ?? "";
    }
    const violations = out
      .split("\n")
      .filter(Boolean)
      .filter((line) => {
        if (line.startsWith("::\t")) return false;
        // Negated pattern (! prefix) means file is explicitly not ignored
        const beforeTab = line.slice(0, line.indexOf("\t"));
        if (beforeTab.includes("!")) return false;
        return true;
      })
      .map((line) => line.slice(line.indexOf("\t") + 1));
    expect(violations.sort()).toEqual([]);
  });
});

describe(".gitignore hygiene", () => {
  it("ignores src.orig/ and dist/ and docs/ssh-key.txt", () => {
    const gi = execSync("cat .gitignore", { cwd: root, encoding: "utf8" });
    expect(gi).toContain("src.orig/");
    expect(gi).toContain("dist/");
    expect(gi).toContain("docs/ssh-key.txt");
  });
});
