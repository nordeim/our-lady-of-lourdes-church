# Round 17 Validation — "Light on the Tent" Visual & UI/UX Enhancement

**Date:** 2026-09-02 · **Plan:** `docs/design-enhancement-round17-2026-09-02.md` · **Method:** TDD (Red→Green→Refactor), Playwright e2e, live browser re-audit

## 1. Gate results (all green, measured)

| Gate | Command | Result |
|------|---------|--------|
| Lint | `npm run lint` (eslint 9.39.5, `--max-warnings 0`) | **0 errors / 0 warnings** |
| Types | `npm run typecheck` (`tsc --noEmit`, strict) | **0 errors** |
| Unit | `npm test` (vitest 3.2.6 + jsdom) | **26 files / 144 tests — all pass** (was 21/112; +32 round-17 assertions incl. 4 Button ext) |
| Build | `npm run build` | **dist/index.html 467.31 kB** (gzip 124.36 kB) + `_headers` + `robots.txt` + images/ |
| E2E dev | `npm run test:e2e` (Playwright chromium) | **51/51 pass** (1.7m) |
| E2E built | `npm run test:e2e:built` (vite preview :4173) | **51/51 pass** (1.2m) |

Note: e2e runs were executed with a pre-started `vite` dev/preview server (webServer command references `pnpm`, absent in this workspace; `reuseExistingServer` picked the npm-started servers up — CI unaffected).

## 2. TDD trace

- **RED:** 6 test files written first — `src/motion-contract.test.ts` (8), `src/components/PageHero.test.tsx` (7), `src/components/ui/SectionHeading.test.tsx` (4), `src/components/ui/Button.test.tsx` (+4), `src/pages/home-hero.test.tsx` (6), `src/pages/worship-sacraments.test.tsx` (3) — **26 new assertions failing** against the pre-round implementation (117 pre-existing tests unaffected).
- **GREEN:** utilities (`scrim-hero`, `scrim-page`, `hero-fade`+kf, `rule-draw`+kf, reduced-motion overrides), PageHero (opacity 25/40→45/55, named scrims, weave edge, /85 subtitle), SectionHeading (`rule-draw`), Button (solid-variant hover lift + `transition-all duration-200`; ghost/outline-light restraint), Home (hero `opacity-55` + `hero-fade` wrapper over `hero-ken-burns` img, `scrim-hero`, meta weave rule, Welcome Emblem, featured-card `card-lift`, Grounds "Visit →" nudge), Worship (Confession `HeartHandshake` + Adoration `Church` aria-hidden icon chips), version 1.4.4→1.5.0 (+docs-contract pin).
- **Refactor fixes:** regex-space lint errors (motion-contract), test-selector corrections (rise-in-d2 wrapper, duplicate "Eucharistic Adoration" heading), hero layering refactor (opacity wrapper vs transform img — avoids `animation` shorthand cascade conflict).

## 3. Live visual delta (browser re-audit, chromium via agent-browser)

Before/after captures in `~/my-project/scripts/audit-*.png` (before) vs `r17-*.png` (after, built artifact at localhost:4173):

| Check | Before | After |
|-------|--------|-------|
| Home hero — folded blue roof | invisible (opacity-30 + 60/80/100 flatten) | clearly visible; ken-burns drift retained; headline contrast holds (bottom stop 0.95) |
| PageHero (Ministries) | flat dark slab | roof + courtyard readable at top; weave edge closes the band |
| Welcome section | text-only | gold parish Emblem anchors it |
| Hero meta strip | bare text row | weave rule + tightened rhythm |
| Featured event cards | no hover response | card-lift + gold border + shadow |
| Worship sacrament cards | two sparse text cards | gold icon chips balance the column |
| Section gold rules | static | draw-in on mount (0.9s), static under reduced-motion |
| Buttons | color-only | solid variants lift with `shadow-bsc`; outline-light border brighten |
| Mobile hero (390×844) | near-black slab | roof visible, meta strip under weave rule |

Motion safety: every new animation is transform/opacity-only and listed in both `prefers-reduced-motion` override blocks; `rule-draw` resolves to static `scaleX(1)` under reduce; `motion-contract.test.ts` pins this permanently.

## 4. Contract compliance

- Token budget unchanged: **33 colors + 2 shadows** (motion-contract + docs-contract + token-integrity all assert).
- No copy/label/route/data-shape changes — 51/51 e2e (dev + built) prove the navigation/aria/copy contracts intact.
- CSP/singlefile: CSS + JSX only, no new external requests; bundle delta +1.1 kB (466.20 → 467.31 kB).
- Docs re-pinned in the same round: AGENTS.md (8 edits), CLAUDE.md (5), README.md (11), SKILL.md (26 — incl. §4.3 register corrected to the measured BSC state; `bloom-drift` row marked as lineage fossil; phantom `bloom-drift` removed from README tree).
- Version: package 1.5.0 (docs-contract pin + README badge + CLAUDE.md updated).

## 5. Residual notes / follow-ups (non-blocking)

- Live host still serves the pre-round artifact until the owner redeploys `dist/`; all 51 e2e assertions already pass against the built artifact locally.
- `blessed-sacrament-queenstown_SKILL.md` §4.3 rows 10–12, 24–25, 27 describe shrine-era specifics (mask values, WhatsApp links) — copy-accurate enough at contract level; a dedicated §4.3 byte-diff pass is suggested for a future docs-only round.
- Playwright pins chromium-1193 while the workspace cache ships 1200/1234; local runs used a compatible-layout symlink (workspace-only, not committed).
