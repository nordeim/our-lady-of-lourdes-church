# Remediation Plan — Round 16 (2026-09-02)

**Source audit:** `docs/code-review-audit-round16-2026-09-02.md` (C1, H1–H3, M1–M4, L1–L4, I1–I6).
**Method:** TDD (RED → GREEN → REFACTOR) per repo skills `tdd`/`tdd-workflow`; gates per CLAUDE.md; docs-follow-code per `docs/plan-adapt-docs-to-bsc-2026-09-02.md`.
**Branch policy:** all work lands on `main` (explicit user instruction; no feature branches this round).

## Pre-remediation state (verified 2026-09-02)

- `pnpm lint` 0 · `pnpm typecheck` 0 · `pnpm build` 465.23 kB · `pnpm audit` clean
- `pnpm test` 17 files / 99 tests — **5 failing** (repo-hygiene 4, docs-contract 1)
- `pnpm test:e2e` **15/51** (local dev and live host — identical failures, stale specs)
- Live host: 0 security headers, CSP beacon console error on every route

## Plan (phases = commit units)

### Phase R1 — Repo hygiene / secrets (fixes C1, H3, M1)

- [x] RED (already red): `src/repo-hygiene.test.ts` 4 failures + `docs-contract` 1 failure pin the target state.
- [x] GREEN: `git rm --cached docs/ssh-key.txt package-lock.json docs/blessed_sacrament_church_grok4.6.zip docs/blessed_sacrament_church_kimi2.6.zip` and `git rm -r --cached src.orig/` (untrack only; working-tree copies of `src.orig/` removed from disk to prevent re-tracking; `docs/ssh-key.txt` kept locally, still ignored).
- [x] GREEN check: `pnpm test` → 17 files / 99 tests, 0 failures.
- [x] Note: key rotation remains an owner action (C1 history retention) — restated in README "Security notes".

### Phase R2 — Missing public artifacts + CSP beacon (fixes H1, M2)

- [x] RED: new `src/public-contract.test.ts` asserting `public/_headers` exists and pins the five directives, `public/robots.txt` exists and disallows nothing public, and `index.html` CSP includes `https://static.cloudflareinsights.com` in `script-src` + `connect-src` allowlist (fails before files exist).
- [x] GREEN: create `public/_headers` (HSTS, XCTO, XFO, Referrer-Policy, Permissions-Policy) + `public/robots.txt` (allow all) + extend `index.html` CSP (`script-src … https://static.cloudflareinsights.com`, `connect-src 'self' https://cloudflareinsights.com`).
- [x] Verify `pnpm build` copies both into `dist/` and `index.html` still parses; re-run live E2E to confirm the beacon console error is gone.

### Phase R3 — Design-token integrity (fixes M3)

- [x] RED: new `src/token-integrity.test.ts` — parse `@theme` token names from `src/index.css`, scan every non-test `src/**/*.{ts,tsx}` for `bsc-<token>` class references, fail on any undefined token. First run fails on `pine-50/pine-300/terracotta-50/terracotta-300`.
- [x] GREEN: add the four missing ramp steps to `@theme` as tints of the existing hues: `--color-bsc-pine-50: #eef4f0`, `--color-bsc-pine-300: #7fa88f`, `--color-bsc-terracotta-50: #f7ece7`, `--color-bsc-terracotta-300: #d19a83` → 33 colors + 2 shadows.
- [x] Verify chips render (unit: `categoryTone` returns the classes; token guard passes).

### Phase R4 — Header a11y + Layout cleanup (fixes L1, L2, L3)

- [x] RED: new `src/components/Header.test.tsx` — (a) hamburger label is "Open menu" closed / "Close menu" open; (b) Escape anywhere closes an open desktop dropdown; (c) drawer is `role="dialog"` + `aria-modal` with focus restored to the hamburger on close (characterization for existing behavior, keeps trap honest).
- [x] GREEN: Header — dynamic aria-label + window `keydown` Escape closing `desktopOpen`.
- [x] RED→GREEN (Layout): update `src/components/Layout.test.tsx` — anchor effect returns the timeout cleanup (assert via fake timers: hash change inside 80ms cancels pending scroll); fix `Layout.tsx` to `return resolveAnchor();`.
- [x] All prior unit tests stay green (no behavior regressions).

### Phase R5 — E2E retarget to the shipped BSC contract (fixes H2)

- [x] RED (already red): 36 failing specs.
- [x] GREEN — rewrite assertions to verified `src/` copy (no app behavior changes):
  - smoke: hero h1 `Church of the Blessed Sacrament` + tagline + quick facts (`1 Commonwealth Drive`, `SS.CC. since 1958`, `Sunday Masses 7:30 AM – 5:30 PM`); alias routes `/worship` `/ministries`; hash anchors; mobile drawer via "Open menu"/"Close menu"; event chips via `categoryTone` classes (`text-bsc-gold-700`, `text-bsc-terracotta-600`, `text-bsc-sapphire-700`, `text-bsc-pine-600`); back-to-top.
  - navigation: dropdown children (BSC descriptions from `nav.ts`), footer 10 links, SkipLink, aria-current, NotFound ("404", "This path does not lead to the church.").
  - ministries: ids `liturgical/faith-formation/pastoral-care/family-life/youth/community` (drop `#mandarin`, `#language-communities`), imageAlt, Home grounds cards → Worship anchors.
  - give-faq: 6 giving options + UEN `T08CC1234A` + closing band `bg-bsc-sapphire-900` quote; FAQ accordion (6 questions, single-open); Worship Find Us + maps iframe.
  - enhancements: CTA band heading cream on `bg-bsc-sapphire-950/900` (drop `shrine-maroon`), head contract = inline emoji favicon data URI + JSON-LD + description (drop favicon.svg/theme-color/og:image asserts), page-in keyed container, chips.
  - round5/round7: Worship today-card (`data-testid="mass-card"` + `data-today="true"`), gold category chips, sticky-free History (assert timeline + year rendering), Give PayNow card, desktop nav gold active state (assert `text-bsc-gold-300`), FAQ office loop-back (assert contact block `secretariat@bsc.org.sg` / `6474 0582`), Home featured events link to `#/news-events`.
  - deep-links: path-style → hash rewrite with Home hero (`Church of the Blessed Sacrament`), drop `He is risen` / `life of the tent`.
- [x] Gate: `pnpm test:e2e` → **51/51** local; then `E2E_BASE_URL=<live>` → **51/51** against the deployed host.

### Phase R6 — Docs re-pin (fixes M4, L4, I1, I3; AGENTS debris)

Measured values to pin everywhere (single sweep, one commit):

- [x] Routes: **17 path entries** (16 content + `*`), 5 alias groups / 7 alias paths, 9 hash anchors (fix AGENTS "18 entries").
- [x] E2E: **8 specs + helpers, 51 tests** (fix AGENTS "9 specs").
- [x] Unit suite after remediation: **19 files / N tests** (17 existing + `public-contract` + `token-integrity` + `Header.test` = 20 files; measure exact test count and pin it — fix AGENTS "17/118", CLAUDE "17/98", SKILL "17/98 or 17/118").
- [x] Tokens: **33 colors + 2 shadows** (29 pre-existing + 4 added), **27 utilities, 7 keyframes** (drop `bloom-drift`/`gold-rule-draw` claims); `gold-700 #85641c`, `terracotta-600 #8f5038` (fix AGENTS `#85601f`/`#8f4c30`).
- [x] `src/` inventory: **61 files** (source + tests + setup measured post-remediation) — fix 52/58 claims.
- [x] utils = **5** incl. `categoryTone` (fix README "4").
- [x] `public/`: images 9 + `_headers` + `robots.txt`; favicon = inline emoji data URI (drop favicon.svg/_headers-absent contradictions).
- [x] `site.ts`: hours 6 keys, mass 9 keys, UEN **T08CC1234A**, feast **Sunday after Trinity**, no whatsapp/sacredHearts keys (fix CLAUDE/SKILL phantom facts).
- [x] Build size: measured post-R2/R3 value (~465 kB) — fix 381.90/392.96/392 claims.
- [x] `docs-contract` = 8 checks (fix "22/23"); repo-hygiene 4; ci-workflow 4; new guards named.
- [x] SKILL.md internal contradictions sweep (skills/ present+tracked; test counts; UEN; feast; §7.2 timeline 7 entries; doc-version axis).
- [x] AGENTS.md: remove pasted debris block (L4); fix stack line; "Where to look next" links to `blessed-sacrament-queenstown_SKILL.md` (real filename) — fix README footer link too.
- [x] README: "Current audits" paragraph updated to round-16; troubleshooting rows that reference `_headers`/`favicon.svg` aligned; "Verify Setup" expected counts updated.
- [x] All four docs updated in the same commit as measured reality; `docs-contract.test.ts` pins stay valid (version 1.4.4, lucide pin, 17 route entries, 3 hooks).

### Phase R7 — Validation + handoff

- [x] Full gate: `pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build` all green.
- [x] Sixth check: `E2E_BASE_URL=<live> pnpm test:e2e:built` 51/51 green.
- [x] Live re-probe: no CSP console error; `_headers`/`robots.txt` noted as Pages-only (documented limitation unchanged).
- [x] `docs/validation-round16-2026-09-02.md` written (before/after evidence).
- [x] Commit sequence (Conventional Commits, atomic): `fix:` hygiene untrack → `fix:` public contract + CSP → `fix:` token integrity → `fix:` Header/Layout a11y → `test:` e2e retarget → `docs:` four-doc re-pin → `docs:` audit/validation reports.

## Explicit non-goals

- No git history rewrite (C1 rotation is an owner action; docs keep saying so).
- No `src/` content or visual redesign beyond R3/R4 fixes — the deployed BSC build is correct.
- No `BrowserRouter` migration, no CMS, no dependency upgrades (audit clean; exact pins are policy).
- `skills/` vendored tree untouched (dangling symlinks noted as I4, cleanup deferred to owner).
