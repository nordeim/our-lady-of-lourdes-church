# Remediation Execution Report — Round 19 "The Merge" (2026-09-02)

> Plan: `docs/remediation-plan-round19-2026-09-02.md` · Validation ledger:
> `docs/external-audit-validation-round19-2026-09-02.md` · Baseline `main` @
> `705c593` (1.5.1) → this release **1.6.0**. Method: TDD (RED asserted for
> every task before implementation), skills per plan header, no new branches.

## Preconditions verified before execution

- Live deployment check (agent-browser, 390×844, `blessed-sacrament-church.jesspete.shop`):
  round-18 drawer fix **is live** — drawer fills 844/844, 13 links incl. Give,
  X / outside-click / Escape close, label-tap keeps open, console clean.
- Live head fetch confirmed every adopted audit finding (og:image 0 hits,
  theme-color 0, canonical 0, twitter:card 0, emoji data-URI favicon present,
  `connect-src https://cloudflareinsights.com` dead entry present, 2×
  `'unsafe-inline'`).
- Local `main` == `origin/main` (`705c593`), working tree clean.

## Task-by-task outcome (plan T1–T13)

| Task | Audit source | Outcome | Evidence |
|---|---|---|---|
| T1 head metadata | R2-F2 | ✅ og:image (+alt naming the tent roof), twitter:card=summary_large_image, twitter:title/description, canonical `https://bsc.org.sg/`, theme-color `#0a1122`, og:site_name, og:locale added to `index.html` | `src/head-metadata-contract.test.ts` 7/7 green; e2e head-metadata describe green in dev+built |
| T2 CSP connect-src | R2-F6 | ✅ `connect-src 'self' https://static.cloudflareinsights.com`; dead bare-domain entry removed | `public-contract` round-19 test green (also rejects the bare domain) |
| T3 SVG favicon | R2-F7 / R1-F7 | ✅ `public/favicon.svg` (sapphire `#0a1122` field, gold `#d4ad42` folded roof + lit facet + ground line); `index.html` links it; ⛪ retired; ships to `dist/favicon.svg` | public-contract green; browser renders the mark (screenshot `round19-favicon.png`) |
| T4 global :focus-visible | R1 merge-03 | ✅ `@layer base` ring `outline: 2px solid var(--color-bsc-gold-400); outline-offset: 3px` | design-language contract green; live computed check on built artifact: `2px rgb(212, 173, 66)` @ `3px` |
| T5 hero voice | R1 merge-02 | ✅ eyebrow `Church of the Blessed Sacrament — since 1958` (0.3em); `h1` = "A tent of meeting."; `<title>`/brand/JSON-LD unchanged (SEO preserved) | home-hero contract green; smoke/navigation pins retargeted; browser screenshot `round19-desktop-hero-top.png` |
| T6 welcome quote card | R1 merge-02 | ✅ `.welcome-quote` parchment figure (stone border, bsc shadow) overlaps the hero boundary (`-mt-24 / lg:-mt-32`) carrying "You are not a visitor here. You are expected." | home-hero contract green; e2e green; browser screenshots |
| T7 editorial corners | R1 merge-04 | ✅ `@theme` overrides `--radius-xs/sm 0.125rem · md 0.1875rem · lg/xl 0.25rem · 2xl 0.375rem`; `rounded-full` untouched | design-language contract green; built-artifact computed card radius `6px`; e2e asserts ≤6px |
| T8 typography | R1-03 | ✅ body `font-feature-settings: "kern" 1, "liga" 1`; eyebrows 0.3em (hero) / 0.25em (SectionHeading, Welcome) | design-language contract green |
| T9 motion | R1-05 | ✅ `@keyframes bloom-drift` + `.bloom-drift` (14s ease-in-out infinite alternate, will-change) applied to the CTA band bloom layer; `gold-rule` → centre-drawn 1px hairline (transparent→gold-400→gold-300→gold-400→transparent; left variant edge-fade; rule-draw now centre-origin); `rise-in` → `cubic-bezier(0.22, 1, 0.36, 1)`; `halo-pulse` 2.6s; reduced-motion list covers `.bloom-drift` | design-language + motion contracts green (keyframes 9→10); e2e asserts `animation-name: bloom-drift` on the band |
| T10 hash-based script CSP | R2-F1 | ✅ `scripts/inject-csp-hashes.mjs` (+ `.d.mts` declaration) — pure helpers unit-tested, CLI fails closed (hash-count mismatch or residual `'unsafe-inline'` ⇒ exit 1); wired `"build": "vite build && node scripts/inject-csp-hashes.mjs"`; source `index.html` keeps the dev contract | csp-build contract 6/6 green; `pnpm build` logs "2 inline script(s) pinned by sha256"; dist grep: script-src = `'self' https://static.cloudflareinsights.com 'sha256-…' 'sha256-…'`, style-src unchanged; `test:e2e:built` 67/67 boots under the hashed CSP |
| T11 bundle rationale | R2-F4 | ✅ documented (README + plan): singlefile contract, route-splitting re-inlines, ~470 kB re-measured each round | README gate section |
| T12 secret scan | R2-F5 | ✅ `repo-hygiene` scans tracked executable surface for PEM material (docs/skills prose exempt — audits quote the pattern; name-guard still global). Rotation remains an owner-side action (stated in README history note) | repo-hygiene green (181-test run) |
| T13 docs + release | — | ✅ package 1.5.1 → **1.6.0**; docs-contract pin flipped; README (10 pins + round-19 narrative), AGENTS (5+), CLAUDE (7), SKILL §0/frontmatter (9) re-pinned; this report | docs-contract green |

## TDD transcript (summary)

- **RED** (asserted before any production change): 27 failing tests across
  `head-metadata-contract` (7), `design-language-contract` (12),
  `public-contract` round-19 tests (3), `home-hero` round-19 tests (5),
  `csp-build-contract` (module absent), `motion-contract` keyframe pin (10th
  keyframe). Failure messages matched the plan's expected deltas.
- **GREEN**: after implementation — **29 files / 181 tests** (baseline 26/149,
  +32 net new contracts incl. updated pins).
- **Pins flipped intentionally** (contract updates, each noted in-line):
  `public-contract` connect-src; `motion-contract` keyframes 10; `docs-contract`
  version 1.6.0; e2e `enhancements.spec.ts` favicon; e2e `smoke.spec.ts` +
  `navigation.spec.ts` hero-heading pins (voice merge).
- One test-side fix during GREEN: the gold-rule hairline regex targeted the
  container rule instead of `::after` (test corrected, assertion unchanged in
  intent); CSP rewrite regex initially rejected single-quoted CSP tokens
  (script fixed — the contract test caught a real bug before build ran).

## Gates (final state, all run locally)

| Gate | Result |
|---|---|
| `pnpm lint` | ✅ 0 warnings (`--max-warnings 0`) |
| `pnpm typecheck` | ✅ 0 errors |
| `pnpm test` | ✅ **29 files / 181 tests** |
| `pnpm test:e2e` | ✅ **67/67** (dev, chromium) |
| `pnpm build` | ✅ 469.68 kB + `[inject-csp-hashes] 2 inline script(s) pinned by sha256` |
| `pnpm test:e2e:built` | ✅ **67/67** (dist — app boots under hash-pinned script-src) |

## Built-artifact browser re-audit (agent-browser, chromium)

- Desktop 1440×900: eyebrow + "A tent of meeting." headline render over the
  visible roof; overlapping quote card straddles the hero boundary; grounds
  cards compute `border-radius: 6px`; gold hairline 96px; CTA band bloom
  computes `animation-name: bloom-drift`; favicon renders (sapphire field,
  gold folded roof); console clean, no page errors.
- Mobile 390×844: drawer regression watch passes — 844/844 full height,
  13 links incl. Give (round-18 contracts intact); hero stacks cleanly.
- Keyboard: global focus ring computed `2px rgb(212, 173, 66)` @ `3px` offset.

## Live deployment status

This repo ships `dist/` via the owner's deploy pipeline. After the owner
deploys `main`, expect: full social card (og:image/twitter/canonical/theme-color),
sapphire-and-gold favicon in the tab, "A tent of meeting." hero with the
overlapping quote card, visibly sharper corners, drifting gold bloom on the CTA
band, and a `script-src` CSP carrying two `sha256-` digests with no
`'unsafe-inline'`. Local proof of every contract is above; the live host was
re-checked for the round-18 baseline at the start of this round.

## Residuals / hand-offs

- **Owner action (R2-F5)**: confirm the historically leaked keys (round-6/13/16
  incidents) were rotated with the providers — outside git's reach; the new
  hygiene scan guards regressions only.
- **R2-F4 bundle**: deliberately unchanged; revisit only if the hosting
  contract ever moves off single-file.
- **Live-host caveat (T10)**: the beacon the host injects is external
  (`static.cloudflareinsights.com`, origin-allowed). If the host ever injects
  an *inline* script, that snippet would be blocked while the app itself keeps
  booting (its script is hash-pinned); revert path = restore `'unsafe-inline'`
  in `scripts/inject-csp-hashes.mjs`'s kept-tokens filter.
