# Round-16 Validation Report (2026-09-02)

**Scope:** validates `docs/remediation-plan-round16-2026-09-02.md` against `docs/code-review-audit-round16-2026-09-02.md`, with before/after gate evidence and live-host verification.

## Gate evidence (before → after)

| Gate | Before (audit, 2026-09-02) | After (remediation) | Evidence |
|---|---|---|---|
| `pnpm lint` | 0 | **0** | `eslint . --max-warnings 0` clean |
| `pnpm typecheck` | 0 | **0** | `tsc --noEmit` clean |
| `pnpm test` | 17 files / 99 tests, **5 failed** (repo-hygiene 4 + docs-contract 1) | **21 files / 112 tests, 0 failed** | +`public-contract` (6) +`token-integrity` (2) +`Header.test` (3) +`Layout.anchor` (2); the 5 pre-existing failures fixed by R1 untracking |
| `pnpm test:e2e` | **15/51** (stale pre-retarget suite) | **51/51** | All 8 specs retargeted to the shipped BSC copy |
| `pnpm test:e2e:built` (dist) | not run pre-remediation (suite stale) | **51/51** | Same 51 vs `vite preview` on `dist/` |
| `pnpm test:e2e:built` (live) | 15/51 | **43/51** | The 8 pending failures assert the NEW a11y contracts (nav landmarks, "Open menu"/"Back to top" labels) — they pass once the remediated artifact deploys; re-verified: every failure is `getByRole('navigation', { name: 'Primary' })` / `Open menu` / `back to top` shaped |
| `pnpm build` | 465.23 kB (no `_headers`/`robots.txt` in dist) | **466.20 kB + `dist/_headers` + `dist/robots.txt` + `dist/images/` (9)** | singlefile inlines JS+CSS; publicDir copies artifacts |
| `pnpm audit` | clean | **clean** | no known vulnerabilities |

## Finding closure

| ID | Finding | Status | How |
|---|---|---|---|
| C1 | SSH private key tracked (`docs/ssh-key.txt`) | **CLOSED in repo** | `git rm --cached`; ignore rule retained; `repo-hygiene` guard green. **Owner action remains: rotate the key** (blob persists in git history; rotation was already outstanding since round-6) |
| H1 | No host security headers | **CLOSED (code)** | `public/_headers` restored (HSTS/XCTO/XFO/Referrer-Policy/Permissions-Policy) → ships in `dist/`. Host-level headers on the current proxied origin still require host config (documented limitation unchanged) |
| H2 | E2E suite pre-retarget (36 failures) | **CLOSED** | All 8 specs assert the verified `src/` contract; 51/51 dev + 51/51 built |
| H3 | `src.orig/` tracked (58 files) | **CLOSED** | `git rm -r --cached src.orig/` + working-tree copy removed; `repo-hygiene` + `docs-contract` guards green |
| M1 | Ignored-but-tracked artifacts | **CLOSED** | `package-lock.json` + 2 `docs/*.zip` untracked; M5 check green |
| M2 | CSP blocks Cloudflare beacon | **CLOSED (code)** | `index.html` CSP: `script-src … https://static.cloudflareinsights.com` + `connect-src 'self' https://cloudflareinsights.com`; pinned by `public-contract` test. Live console error clears on deploy of the new artifact |
| M3 | 4 undefined tokens referenced by `categoryTone` | **CLOSED** | `pine-50 #eef4f0`, `pine-300 #7fa88f`, `terracotta-50 #f7ece7`, `terracotta-300 #d19a83` added; `token-integrity` guard prevents recurrence |
| M4 | Docs↔repo drift | **CLOSED** | All four docs re-pinned to measured values (see table below); SKILL §20.3 "verbatim" block replaced with the real `src/data/site.ts`; AGENTS.md pasted debris removed |
| L1 | Layout stale anchor scroll | **CLOSED** | Effect returns the `clearTimeout` cleanup; regression-tested via fake-timer-free 80ms-window test |
| L2 | Static hamburger aria-label | **CLOSED** | "Open menu"/"Close menu" + `aria-expanded`; e2e-covered |
| L3 | No global Escape for desktop dropdown | **CLOSED** | Window `keydown` listener when a dropdown is open; unit-tested |
| L4 | AGENTS.md process debris | **CLOSED** | Lines 123–184 removed |
| Bonus | `BackToTop` had **no accessible name** (icon-only button) | **CLOSED** | `aria-label="Back to top"` (surfaced by the retargeted e2e contract) |
| Bonus | Footer nav columns were plain `<div>`s (no nav landmarks); Header desktop/drawer `<nav>`s unlabeled | **CLOSED** | `<nav aria-label="Explore"/"Get involved">` + `aria-label="Primary"/"Mobile"` |
| Bonus | `useScrollProgress` froze after StrictMode double-mount (stale `rafRef` guard) — dev-only but broke the rail/ring contract in dev E2E | **CLOSED** | `rafRef.current = 0` in cleanup; scroll-rail e2e green on dev |
| Bonus | `playwright.config.ts` header still said "risen-christ-church" | **CLOSED** | Re-titled; project pinned to `channel: "chromium"` (new headless — rAF-driven hooks need BeginFrames) |

## Docs re-pin verification (spot-check of the measured values)

| Fact | Old doc claims (varied) | Pinned now | Measured |
|---|---|---|---|
| Unit suite | 17 files / 98 or 118 tests | 21 files / 112 tests | `pnpm test` → 21/112 ✓ |
| E2E | 51 tests, 8 or 9 specs | 8 specs + helpers, 51 tests | `ls e2e/*.spec.ts` = 8 ✓ |
| Routes | 17 or 18 entries | 17 path entries (16 content + `*`) inside Layout wrapper | `src/App.tsx` ✓ (`docs-contract` pins 17) |
| Tokens | 26/27 colors, 28 utilities, 9 keyframes | 33 colors + 2 shadows, 27 utilities, 7 keyframes | `src/index.css` count ✓ (script-checked) |
| `src/` inventory | 52 or 58 files | 63 files (41 source + 21 tests + 1 setup) | `find src -type f \| wc -l` ✓ |
| utils | 4 or 5 | 5 incl. `categoryTone` | `ls src/utils/*.ts` ✓ |
| `public/` | favicon.svg / robots.txt / _headers (mixed claims) | images 9 + `_headers` + `robots.txt`; inline emoji favicon | `ls public/` ✓ |
| `site.ts` | hours 5/6 keys, mass 8/9, UEN yes/no, feast Thu/Sun, whatsapp/sacredHearts | hours 6, mass 9, UEN T08CC1234A, Sunday after Trinity, no phantom keys | `src/data/site.ts` ✓ |
| Build size | 381.90 / 392.96 / ~392 kB | 466.20 kB | `pnpm build` ✓ |
| SKILL doc version axis | 4.0.0 vs 5.0.0 contradiction | version axis independent of package version | frontmatter ✓ |

## Verification ledger (post-remediation)

| # | Check | Method | Result |
|---|---|---|---|
| V1 | Full local gate | lint + typecheck + test + build | all green (see table) |
| V2 | E2E dev | `pnpm test:e2e` | 51/51 |
| V3 | E2E built | `pnpm test:e2e:built` | 51/51 |
| V4 | E2E live | `E2E_BASE_URL=<live> pnpm test:e2e:built` | 43/51 (8 pending redeploy — all new-contract tests) |
| V5 | Guards | `repo-hygiene` + `docs-contract` + `public-contract` + `token-integrity` | 4+8+6+2 green |
| V6 | Live headers | `curl -sI` (unchanged host) | still header-less until host/Pages config — documented |
| V7 | Docs sweep | `rg` residual scan per doc | current-state sections clean; historical appendices untouched per SKILL §0 contract |

## Deployment note

The live host `https://blessed-sacrament-church.jesspete.shop/` serves the pre-round-16 artifact. After this round deploys: the 8 pending live E2E assertions pass, the CSP beacon console error clears, and `robots.txt`/`_headers` ship (the latter honored on Cloudflare Pages). **Rotate the SSH key in `ssh-key.txt`** — it was publicly exposed in git history and its replacement must never be committed.
