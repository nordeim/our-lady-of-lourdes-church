# Round 17 — Visual & UI/UX Enhancement Plan ("Light on the Tent")

**Date:** 2026-09-02 · **Scope:** visual appeal, aesthetics, UI/UX, animations · **Method:** browser audit → plan → validate → TDD → E2E → docs → push
**Skills used:** `skills/super-frontend-design` (§7 Visual Design & Motion: 150/300/500/800ms timing, ease-out entries, compositor-only properties, reduced-motion law; Meticulous 6-Phase SOP), `skills/avant-garde-design-v4` (anti-generic mandate — reverent editorial, no template tropes), `skills/web-design-guidelines` + `skills/visual-design-foundations` (hierarchy, touch targets, contrast), `skills/tdd-workflow` (Red→Green→Refactor), `skills/webapp-testing-journey` + `skills/agent-browser` (live E2E audit).

---

## 1. Live-site audit evidence (https://blessed-sacrament-church.jesspete.shop/, 2026-09-02)

Captures archived at `scripts/audit-*.png` (desktop 1440×900 + mobile 390×844; Home hero/mid/CTA, History timeline, Worship sacraments, Ministries, News & Events).

| # | Severity | Finding | Evidence |
|---|----------|---------|----------|
| F1 | High | **Home hero image is invisible.** `SafeImage` at `opacity-30` under a `from-sapphire-950/60 via-/80 to-/100` gradient flattens the iconic folded blue roof into near-black. The parish's strongest identity asset is lost; ~350px dead dark zone above the headline (desktop). | `audit-live-home-hero.png` vs `audit-s1.png` (same image vivid at opacity 1.0 in Grounds card) |
| F2 | High | **PageHero images invisible on inner pages.** `opacity-25` (dusk) / `opacity-40` (light) under `/70 →/85 →/100` scrim — Ministries & News & Events open on flat dark slabs. | `audit-ministries.png`, `audit-news.png` |
| F3 | Medium | **Welcome section (Home) is text-only** on cream — no visual anchor, feels unfinished between a photographic hero and image cards. | `audit-s1.png` (top) |
| F4 | Medium | **Featured event cards have no hover affordance** (`card-tint` only — no lift/shadow), large uneven empty bottoms; feel inert vs Grounds cards. | `audit-s2.png` |
| F5 | Medium | **Buttons transition color only** — no hover elevation; inconsistent with `card-lift` language used on cards. | `Button.tsx` (transition-colors) |
| F6 | Medium | **SectionHeading gold rule is static** — the site's own motif family (timeline rail draw, `link-underline` draw, `dot-pulse`) never draws the most repeated ornament. | `SectionHeading.tsx`, `index.css` |
| F7 | Low | **Grounds cards**: no directional affordance on hover beyond zoom; title block static. | `audit-s1.png` |
| F8 | Low | **Worship sacraments column** dead space: 2 sparse cards beside 6 devotion rows. | `audit-worship.png` |
| F9 | Doc | README line ~110 mentions `bloom-drift` utility that does not exist in `src/index.css` (drift). Counts (27 utilities + 7 keyframes) pinned across AGENTS/CLAUDE/README/SKILL must be re-measured after this round. | grep README vs index.css |

**Non-goals (contract guards):** no new colors/shadows (33+2 budget stays — docs-contract + token-integrity tests), no copy/label changes (51 Playwright tests), no route/nav/data-shape changes, no external assets (CSP `img-src 'self' data: blob:`), no new deps, no purple gradients / Inter / generic card grids (anti-generic mandate), version stays semver-bumped 1.4.4 → **1.5.0** (minor: new utilities = new features; pins updated in docs-contract test + README badge + CLAUDE.md).

## 2. Remediation design (all compositor-only, all reduced-motion gated)

### New utilities + keyframes (`src/index.css`, `@layer utilities`)
| Name | Kind | Spec | Rationale |
|------|------|------|-----------|
| `scrim-hero` | utility | `background: linear-gradient(to bottom, rgba(10,17,34,0.30), rgba(10,17,34,0.55) 55%, rgba(10,17,34,0.95))` | Bottom-heavy scrim: architecture reads at top, text contrast preserved at bottom (F1/F2) |
| `scrim-page` | utility | `background: linear-gradient(to bottom, rgba(10,17,34,0.45), rgba(10,17,34,0.75) 55%, rgba(10,17,34,0.96))` | Inner-page hero scrim, slightly heavier for shorter heroes (F2) |
| `hero-fade` | utility + `@keyframes hero-fade` | `from { opacity:0; transform:scale(1.04) } to { opacity:1; transform:scale(1) }`, 1.4s ease-out both | Cinematic settle on hero/page-hero imagery; pairs with existing 20s ken-burns (F1/F2) |
| `rule-draw` | utility + `@keyframes rule-draw` | `.rule-draw.gold-rule::after { transform-origin:left; animation: rule-draw 0.9s cubic-bezier(0.4,0,0.2,1) both }` from `scaleX(0)` to `scaleX(1)` | The gold rule draws itself — unifies with timeline-rail/link-underline motif (F6) |

Reduced-motion: extend both existing override blocks (`@layer base` global kill covers animations; explicit `animation: none` list gains `hero-fade` + `rule-draw`); `.rule-draw.gold-rule::after { transform: scaleX(1) }` under reduce.

### Component changes
| ID | File | Change | Finding |
|----|------|--------|---------|
| C1 | `src/pages/Home.tsx` | Hero image `opacity-30`→`opacity-55` + `hero-fade`; gradient div → `scrim-hero`; meta strip gains `divider-weave-thin` top rule + tighter rhythm; featured event cards gain `card-lift`; Welcome section gains `Emblem` (gold, h-20, aria-hidden) above eyebrow; Grounds card titles gain ArrowRight nudge affordance | F1, F3, F4, F7 |
| C2 | `src/components/PageHero.tsx` | Image `opacity-25→opacity-45` (dusk), `opacity-40→opacity-55` (light) + `hero-fade`; scrims → `scrim-page`/`scrim-hero`; bottom edge `divider-weave-thin`; body text to `text-bsc-cream/85` for legibility over brighter image | F2 |
| C3 | `src/components/ui/SectionHeading.tsx` | `h2` gains `rule-draw` next to `gold-rule` | F6 |
| C4 | `src/components/ui/Button.tsx` | `transition-colors`→`transition-all duration-200 ease-out` + `hover:-translate-y-0.5 hover:shadow-bsc` (primary/secondary only — ghost/outline-light keep color-only per restraint; outline-light gets border brighten) | F5 |
| C5 | `src/pages/Worship.tsx` | Sacrament cards gain aria-hidden Lucide icon chips (`Church`, `Clock`) to balance column | F8 |

Contrast guard: `bsc-cream` on sapphire-950 at scrim bottom stop (0.95 alpha over any image) ≥ 4.5:1 (existing hero text sat on 0.80–1.0 alpha band; bottom band is *darker-or-equal* to before at the text zone). Body `cream/85` on `950` measures ≥ 7:1 (WCAG AAA for large text).

### Version
`package.json` 1.4.4 → **1.5.0**; pins updated: `src/docs-contract.test.ts` (1 line), `README.md` badge, `CLAUDE.md` §Continuous Improvement.

## 3. TDD plan (RED → GREEN → REFACTOR)

| # | Test (write FIRST, watch fail) | Asserts | Then implement |
|---|-------------------------------|---------|----------------|
| T1 | `src/motion-contract.test.ts` (new) | index.css declares `.scrim-hero`, `.scrim-page`, `.hero-fade`, `.rule-draw`; `@keyframes` set = 9 incl. `hero-fade`+`rule-draw`; reduced-motion override mentions `hero-fade`, `rule-draw`; tokens stay 33 colors + 2 shadows | §2 utilities block |
| T2 | `src/components/PageHero.test.tsx` (new) | dusk: image `opacity-45` + `hero-fade`, `scrim-page` present; light: `opacity-55` + `scrim-hero`; weave edge present; rise-in titles intact; compact variant unchanged padding contract | C2 |
| T3 | `src/components/ui/SectionHeading.test.tsx` (new) | h2 className contains `gold-rule` + `rule-draw`; `light` prop flips heading color | C3 |
| T4 | `src/components/ui/Button.test.tsx` (extend) | primary contains `hover:-translate-y-0.5` + `hover:shadow-bsc` + `transition-all`; ghost/outline-light unchanged color contract (existing asserts keep passing) | C4 |
| T5 | `src/pages/home-hero.test.tsx` (new) | hero img `opacity-55` + `hero-fade`; `scrim-hero` div; Welcome Emblem svg present; meta strip wrapper `divider-weave-thin`; featured cards `card-lift` | C1 |
| T6 | `src/pages/worship-sacraments.test.tsx` (new) | sacrament card headings accompanied by aria-hidden icon svg | C5 |

**Gates after GREEN:** `npm run lint` (0) · `npm run typecheck` (0) · `npm test` (21+5 files / 112+~15 tests) · `npm run build` · `npm run test:e2e` (51/51 dev) · `npm run test:e2e:built` (51/51) — then live-site browser re-audit (screenshots) for the visual delta.

## 4. Docs re-pin (after code lands)

- `CLAUDE.md` — Design System: utilities 27→**30** + keyframes 7→**9** (+names), Success Metrics gate counts, §Continuous Improvement version 1.4.4→1.5.0.
- `AGENTS.md` — index.css row (36), Styling bullet (90), "authoritative token list" (114).
- `README.md` — badge 1.5.0, index.css tree row (~110, drop phantom `bloom-drift`), Typography/utilities paragraph (~249), design narrative gets "Light on the Tent" note.
- `blessed-sacrament-queenstown_SKILL.md` — §0 register row (49), §4.3 register + note (261–263), §5.2 tree rows (195, 330), §Styling (801), §20/§22 counts, line 30 prose.
- New: `docs/validation-round17-2026-09-02.md` (measured evidence, gate outputs, live before/after).

## 5. Validation of this plan against the codebase (pre-execution)

- ✔ `src/index.css` measured (301 lines): 27 utilities + 7 keyframes confirmed; no name collisions with `scrim-hero|scrim-page|hero-fade|rule-draw`.
- ✔ Existing unit pins safe: Button tests pin `bg-bsc-gold-500`, `bg-transparent`, `border`, `text-bsc-cream`, `group`, `active:translate-y-0`, `active:scale` — all preserved; docs-contract pins `>20` colors / `=2` shadows / keyframes contains — preserved; token-integrity pins referenced tokens defined — only existing tokens reused.
- ✔ E2E suite greps: no spec asserts `opacity-25/30/40`, `card-tint` absence, or hero computed opacity — visual class changes are e2e-safe; copy untouched.
- ✔ `Emblem`, `divider-weave-thin`, `ArrowRight`, `Church`, `Clock`, `MapPin` already exist in codebase — no new assets/deps.
- ✔ CSP/singlefile: pure CSS/JSX changes, no new external requests.
