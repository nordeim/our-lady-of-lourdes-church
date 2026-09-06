# Code Review + Security Audit — Round 16 (2026-09-02)

**Scope:** full-repo tiered review of `blessed-sacrament-church` @ `d1e41f5` ("original src before porting") against its documented contracts (`README.md`, `AGENTS.md`, `CLAUDE.md`, `blessed-sacrament-queenstown_SKILL.md`), plus a browser E2E audit of the live deployment at `https://blessed-sacrament-church.jesspete.shop/`.

**Method:** repo skills `code-review-checklist` (12-category tactical scan) + `vulnerability-scanner` (OWASP 2025, severity taxonomy) + `webapp-testing` (deep-audit E2E). Confidence tags: **Verified** (executed and observed), **Reasoned** (inferred from code inspection).

## Summary (counts by severity)

| Severity | Count | One-line rollup |
|---|---|---|
| Critical | 1 | SSH private key tracked in git |
| High | 3 | No host security headers; E2E suite is pre-retarget (36/51 fail); `src.orig/` re-tracked |
| Medium | 4 | Ignored-but-tracked artifacts; CSP blocks Cloudflare beacon; 4 undefined design tokens referenced by `categoryTone`; docs↔repo drift cluster |
| Low | 4 | Layout stale-scroll cleanup; static hamburger aria-label; missing global Escape for desktop dropdown; AGENTS.md process debris |
| Informational | 6 | Build-size re-pin, dangling skills symlinks, doc-internal contradictions, feast-day wording, site.ts phantom keys, audit lineage |

**Verdict:** NOT safe to ship as-is. C1 blocks release. H2 blocks the documented pre-push gate. All findings are remediable in-repo; C1 additionally requires key rotation by the owner (history retains the blob; no history rewrite in scope).

---

## Findings (severity order)

### C1 — SSH private key tracked in git — **Critical** (Verified)

- **Location:** `docs/ssh-key.txt` (git index, blob retained in history)
- **Description:** The file `docs/ssh-key.txt` is tracked (`git ls-files` includes it) and contains an OpenSSH private key (`-----BEGIN OPENSSH PRIVATE KEY-----`). `.gitignore:22` lists it, but ignore rules do not untrack — the exact lesson of round-6 C1, regressed.
- **Evidence:** `git ls-files | grep ssh-key` → `docs/ssh-key.txt`; `src/repo-hygiene.test.ts` fails 2 tests (`does not track docs/ssh-key.txt`, `tracks no key-like files anywhere`).
- **Impact:** Anyone with read access to the public GitHub repo can extract the deploy key and push to the repository until the key is rotated. OWASP 2025 A02 (Security Misconfiguration) / A04 (Cryptographic Failures — exposed secret).
- **Recommended fix:** `git rm --cached docs/ssh-key.txt`; keep the ignore rule; rotate the key (owner action — out of repo scope; history retains the blob).
- **Confidence:** Verified.

### H1 — Live host serves zero security headers — **High** (Verified)

- **Location:** live host `https://blessed-sacrament-church.jesspete.shop/` + missing `public/_headers`
- **Evidence:** `curl -sI` → no `Strict-Transport-Security`, no `X-Content-Type-Options`, no `X-Frame-Options`, no `Referrer-Policy`, no `Permissions-Policy`. `public/` contains only `images/` — the documented `public/_headers` (README "Deployment", SKILL §11) is absent from this snapshot.
- **Impact:** Clickjacking, MIME-sniffing, downgrade, and referrer-leak protections are not applied at host level. The page-level CSP `<meta>` covers content sourcing only. Round-13 H1 remediation was lost with this snapshot.
- **Recommended fix:** Restore `public/_headers` (HSTS, XCTO, XFO, Referrer-Policy, Permissions-Policy) so Cloudflare Pages deploys ship it; keep documenting that generic hosts need explicit header config.
- **Confidence:** Verified (live probes); the fix restores documented contract.

### H2 — E2E suite is the pre-retarget Risen-Christ suite — **High** (Verified)

- **Location:** `e2e/*.spec.ts` (8 specs / 51 tests)
- **Evidence:** `pnpm test:e2e` → **15 pass / 36 fail** against local dev; same 15/36 against the live host. Failing assertions include: stale selectors `main section[class*="bg-shrine-maroon-950"]`, `text-shrine-(maroon|gold|pine|terracotta)-`; stale copy (`/A tent of meeting/` hero, `/Mass, mercy/` Worship, `Keep the tent standing` Give, `life of the tent` deep-links); stale ids (`#mandarin` vs BSC `#community`); stale counts (8 giving options vs BSC 6); stale head contract (`favicon.svg`, `theme-color`, `og:image` vs current inline-emoji favicon and reduced OG set).
- **Impact:** The documented pre-push gate (`pnpm test:e2e` 51/51) cannot pass; CI is red on every push; "docs say green" vs "suite is red" is the exact trust gap the docs-contract system exists to prevent.
- **Recommended fix:** Retarget the 8 specs to the **current BSC contract as shipped in `src/`** (verified copy: Home h1 `site.name` + tagline "A Household of Faith, Hope & Love"; Worship "Join Us at the Altar" with `#mass/#confession/#visit`; Ministries ids incl. `#community`; Give 6 options + UEN T08CC1234A + `bg-bsc-sapphire-900` closing band; chip classes from `src/utils/categoryTone.ts`; NotFound "404 / This path does not lead to the church."). No `src/` behavior changes required for 36 failures — assertions drift, not the app.
- **Confidence:** Verified (both suites executed end-to-end).

### H3 — `src.orig/` reference copy tracked (58 files) — **High** (Verified)

- **Location:** `src.orig/**` (git index)
- **Evidence:** `git ls-files src.orig | wc -l` → 58; `src/repo-hygiene.test.ts` (`does not track the src.orig/ reference copy`) and `src/docs-contract.test.ts` (`does not track src.orig/ in git index`) both fail. All four docs state `src.orig/` is "NOT PART OF THE REPOSITORY"; `.gitignore:13` ignores it.
- **Impact:** Ships 58 stale Risen-Christ-era files to every clone, contradicts every documented contract, and re-introduces the Toa Payoh content the docs forbid. Round-12 F-9 remediation lost.
- **Recommended fix:** `git rm -r --cached src.orig/`.
- **Confidence:** Verified.

### M1 — Ignored-but-tracked artifacts — **Medium** (Verified)

- **Location:** `package-lock.json` (root) + `docs/blessed_sacrament_church_grok4.6.zip` + `docs/blessed_sacrament_church_kimi2.6.zip`
- **Evidence:** All three tracked while matched by `.gitignore` rules (`/package-lock.json`, `/docs/*.zip`); `repo-hygiene` M5 check (`git ls-files ∩ git check-ignore` non-empty) fails. `pnpm-lock.yaml` is the canonical lockfile (docs agree).
- **Impact:** Ambiguous lockfile story for npm users; binary zips bloat the repo and violate the documented hygiene contract.
- **Recommended fix:** `git rm --cached` all three.
- **Confidence:** Verified.

### M2 — CSP blocks Cloudflare Insights beacon on live — **Medium** (Verified)

- **Location:** `index.html` CSP meta (`script-src 'self' 'unsafe-inline'`)
- **Evidence:** Playwright console capture on the live host, every route: `Loading the script 'https://static.cloudflareinsights.com/beacon.min.js/…' violates the following Content Security Policy directive: "script-src 'self' 'unsafe-inline'"`. SKILL.md §0/§3.2 documents the CSP as including `static.cloudflareinsights.com` — the code never got that allowlist entry.
- **Impact:** Console error on every pageview; web analytics silently broken on the deployed host.
- **Recommended fix:** Extend CSP in `index.html`: `script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com;` and `connect-src 'self' https://cloudflareinsights.com;`.
- **Confidence:** Verified (error observed), fix additive and matches documented CSP contract.

### M3 — `categoryTone` references four tokens that don't exist — **Medium** (Verified)

- **Location:** `src/utils/categoryTone.ts` (Formation + Archdiocese chip tones) vs `src/index.css` `@theme`
- **Evidence:** Cross-check of every `bsc-*` utility class referenced in `src/` against defined `--color-bsc-*` tokens: `bsc-pine-50`, `bsc-pine-300`, `bsc-terracotta-50`, `bsc-terracotta-300` are referenced but **not defined** (29 tokens defined). Tailwind v4 silently drops unknown utilities, so Formation/Archdiocese chips render without their intended border/background (text color still works — `pine-600`/`terracotta-600` exist). Devotion/Parish chips are unaffected (`gold-*`/`sapphire-*` steps all exist).
- **Impact:** Visible styling bug on NewsEvents + Home event chips (two of four categories); silent failure class that will recur without a guard.
- **Recommended fix:** Add the four missing ramp steps to `@theme` as low-chroma tints of the existing hues (e.g. `--color-bsc-pine-50: #eef4f0`, `--color-bsc-pine-300: #7fa88f`, `--color-bsc-terracotta-50: #f7ece7`, `--color-bsc-terracotta-300: #d19a83`) **and** add a regression guard that fails when any `bsc-*` class referenced in `src/` has no backing token.
- **Confidence:** Verified (mechanical cross-check + Tailwind v4 documented behavior).

### M4 — Docs↔repo drift cluster — **Medium** (Verified)

- **Location:** `README.md`, `AGENTS.md`, `CLAUDE.md`, `blessed-sacrament-queenstown_SKILL.md`
- **Evidence (measured repo truth):** 17 route path entries (AGENTS claims 18); 8 e2e specs (AGENTS claims 9); utils = 5 incl. `categoryTone` (README claims 4); `index.css` = 29 colors + 2 shadows, 27 utilities, 7 keyframes (docs claim 26/27 colors, 28 utilities, 9 keyframes incl. non-existent `bloom-drift`/`gold-rule-draw`); `public/` has neither `robots.txt` nor `_headers` nor `favicon.svg` (docs claim them); `site.ts` has no `whatsapp`/`sacredHearts` keys (CLAUDE §fidelity and SKILL §1 claim a WhatsApp hotline); unit suite = 17 files / 99 tests with 5 failing (docs claim green at 98 or 118); `docs-contract` = 8 checks (docs claim 22/23); build = 465.23 kB (docs claim 381.90/392.96 kB); src/ = 59 files (docs claim 52 or 58).
- **Impact:** Every count an agent relies on is untrustworthy; the four docs disagree with each other *and* with the code.
- **Recommended fix:** Re-pin all four docs to measured values in the same commit as the code remediations (docs-follow-code per the documented adaptation plan `docs/plan-adapt-docs-to-bsc-2026-09-02.md`), except where docs correctly demand repo fixes (C1/H1/H3/M1 → fix the repo, keep docs).
- **Confidence:** Verified.

### L1 — Layout anchor-scroll timeout cleanup discarded — **Low** (Reasoned)

- **Location:** `src/components/Layout.tsx:12-30`
- **Description:** `resolveAnchor()` returns a `clearTimeout` cleanup in the anchor-found branch, but the effect body calls `resolveAnchor()` and ignores the return value. A route/hash change within the 80ms window can fire a stale `scrollIntoView` against the previous route's target.
- **Impact:** Rare mis-scroll on rapid navigation; no data risk.
- **Recommended fix:** `return resolveAnchor();` so the effect cleans up.
- **Confidence:** Reasoned (behavior obvious from code; timing window small).

### L2 — Hamburger aria-label is static — **Low** (Verified)

- **Location:** `src/components/Header.tsx:213` — `aria-label="Toggle menu"`
- **Description:** Screen-reader users get the same label in both states; the E2E contract (and better a11y practice) calls for stateful labels ("Open menu" / "Close menu") alongside the existing `aria-expanded`.
- **Recommended fix:** dynamic label; covered by retargeted smoke spec.
- **Confidence:** Verified (spec asserts the stateful pattern and fails today).

### L3 — No global Escape handler for the desktop dropdown — **Low** (Verified)

- **Location:** `src/components/Header.tsx` (desktop dropdown) vs AGENTS.md quirk "Header also handles `Escape` to close menus/drawer"
- **Description:** Escape is handled inside the drawer (`handleDrawerKeyDown`) but a keyboard user who opened a desktop dropdown via focus and presses Escape elsewhere on the page cannot dismiss it.
- **Recommended fix:** window-level `keydown` listener closing `desktopOpen` on Escape; unit test.
- **Confidence:** Verified (code inspection; docs claim the behavior).

### L4 — AGENTS.md contains pasted process debris — **Low** (Verified)

- **Location:** `AGENTS.md:123-184` ("Summary … The full plan has been executed …" tables)
- **Description:** An agent's chat output was pasted into the doc; it makes claims that contradict the doc's own body (e.g. "98/99 pass", build "384.23 kB").
- **Recommended fix:** Remove the block during the docs re-pin.
- **Confidence:** Verified.

### Informational

- **I1 (Verified):** Build artifact measured **465.23 kB** (`dist/index.html`, singlefile) — all four docs' size claims stale; re-pin after remediation.
- **I2 (Verified):** `pnpm audit` — no known vulnerabilities in the dependency tree (exact pins, lockfile committed).
- **I3 (Verified):** Docs-internal contradictions to sweep: SKILL §0 ("skills/ NOT PRESENT") vs §2 ("present and git-tracked"); SKILL §0 (17/98) vs §3.1 (17/118); SKILL §1 rule 1 ("no UEN", "Thursday after Trinity") vs §0/`site.ts` (UEN T08CC1234A, "Sunday after Trinity"); CLAUDE header feast "Thursday" vs table "Sunday"; SKILL §7.2 "8 Entries" vs actual 7.
- **I4 (Verified):** 15 dangling symlinks under `skills/` point to `/Home1/project/...` paths that never existed in the repo — inert (vendored content, tooling ignores it), but a cleanup candidate.
- **I5 (Reasoned):** `main.tsx` dynamic `import()` of `deepLinks` relies on singlefile inlining async chunks — verified working (build emits one file); documented behavior, keep an eye on it if the plugin is ever removed.
- **I6 (Verified):** Live/DOM probe: all 9 hash anchors present and correct on the live build; UEN, footer facts, and 6 giving options correct — the deployed artifact is a faithful BSC build of this `src/`.

## Verification ledger (what was checked, how, result)

| # | Check | Method | Result |
|---|---|---|---|
| V1 | Unit gate | `pnpm test` | 2 files / 5 tests failed (94 pass) |
| V2 | Lint / typecheck | `pnpm lint`, `pnpm typecheck` | both clean (0) |
| V3 | Build | `pnpm build` | 465.23 kB single file + 9 images |
| V4 | E2E vs local dev | `pnpm exec playwright test` | 15 pass / 36 fail |
| V5 | E2E vs live | `E2E_BASE_URL=… playwright test --config=playwright.built.config.ts` (JSON report) | 15 pass / 36 fail |
| V6 | Live headers | `curl -sI` | no security headers |
| V7 | Live DOM | Playwright probe (10 routes, h1/h2/ids, Give/Footer/Ministries facts) | BSC build correct; ids/anchors correct |
| V8 | Live console | Playwright console/pageerror capture | CSP beacon violation on every route |
| V9 | Git hygiene | `git ls-files` × `git check-ignore --no-index` | 62 tracked-but-ignored paths (ssh-key, src.orig×58, zips×2, package-lock) |
| V10 | Token cross-check | script: `bsc-*` classes in src vs `@theme` tokens | 4 undefined references |
| V11 | Dependency audit | `pnpm audit` | clean |
| V12 | Data/doc counts | file reads + programmatic counts | per M4 table |
