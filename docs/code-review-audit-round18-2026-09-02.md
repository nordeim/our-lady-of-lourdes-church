# Comparative Visual Aesthetic & UI/UX Audit — Round 18 (2026-09-02)

**Scope:** `blessed-sacrament-church` (live: https://blessed-sacrament-church.jesspete.shop/, HEAD `efcdc15`) compared against its sibling port `blessed-sacrament-queenstown` (live: https://blessed-sacrament.jesspete.shop/). Focus: visual aesthetic, UI/UX quality, and navigation behaviour across desktop (1440×900), tablet and mobile (390×844) viewports.

**Method:** repo skills `static-spa-parish-site` (canonical site-family contracts), `agent-browser` (live-browser audit of both hosts), `diagnosing-bugs` (reproduce → isolate → root-cause), `tdd` / `test-driven-development` (fix design), `verification-and-review-protocol` (evidence-before-claims). Confidence tags: **Verified** (executed and observed in a real browser), **Reasoned** (inferred from code inspection).

**Baseline gates at audit time (Verified):** `pnpm lint` 0 · `pnpm typecheck` 0 · `pnpm test` 26 files / 144 tests green · `pnpm test:e2e` 51/51 green (local dev).

---

## Summary (counts by severity)

| Severity | Count | One-line rollup |
|---|---|---|
| High | 1 | Mobile drawer collapses to the 68 px header strip — primary navigation unusable on mobile (user-reported, reproduced live + local dev) |
| Medium | 3 | Hamburger toggle cannot close the drawer (pointerdown/click race); any non-link tap inside the drawer closes it; zero mobile-viewport E2E coverage of the drawer |
| Low | 1 | Give CTA absent from the mobile drawer (present in queenstown's mobile nav; desktop-only top bar hides it on mobile) |
| Informational | 3 | Desktop dropdown lacks per-child descriptions (queenstown has them); church lacks queenstown's emblem-led two-line brand block in the header (deliberate simplification — noted, not scheduled); round-17 motion system (scrims/hero-fade/rule-draw/button-lift) is ahead of queenstown — no action |

**Verdict:** the desktop experience is production-grade and in several respects (round-17 motion language, a11y contracts) ahead of the sibling site, but the mobile primary navigation is broken by a CSS containing-block defect and two interaction defects. NOT acceptable to ship mobile in this state; all findings are remediable in `src/components/Header.tsx` + `e2e/`.

---

## Comparative aesthetic assessment (context for findings)

| Dimension | blessed-sacrament-queenstown | blessed-sacrament-church |
|---|---|---|
| Palette | Maroon/cream/gold "shrine" tokens on parchment | Sapphire/gold "bsc" tokens echoing the folded blue roof |
| Header brand | Emblem mark + two-line wordmark (EN + 圣体堂) | Serif wordmark only, cleaner/simpler |
| Top bar | Uppercase tracked micro-line + Give | Sentence-case line + Give |
| Desktop dropdowns | Cream panel, child label **+ description**, hover + keyboard + Escape + outside-click | Sapphire panel, parent description + children, hover + keyboard + Escape + outside-click — works (Verified) |
| Mobile nav | In-flow dropdown panel below header — full menu, all 16 links incl. Give, nested children with gold rail (Verified working) | Fixed right-side drawer — **collapses to 68 px strip** (F1), toggle race (F2), tap-anywhere closes (F3) |
| Motion | drawer-item stagger, link-underline, ken-burns | Superset: round-17 scrim-hero/scrim-page, hero-fade, rule-draw, card-lift, button hover lift, dot-pulse |
| Hero | Vivid image, stat strip (Sunday/MRT/Feast/Fathers) | Moody scrim over image (round-17 remediated), meta row |

The two sites are twins in structure and the church build carries the richer round-17 motion system; the decisive UX gap is mobile navigation reliability.

---

## Findings (severity order)

### F1 — Mobile drawer collapses to header height; menu items inaccessible — **High** (Verified)

- **Location:** `src/components/Header.tsx` — drawer JSX rendered as the last child of `<header>`; header `solid` class `backdrop-blur-md`.
- **Description:** The drawer is `fixed inset-y-0 right-0 w-80 …`. A fixed-position element with `backdrop-filter` ≠ `none` on an ancestor resolves its containing block against that ancestor, not the viewport. Because `solid = scrolled || !isHome || mobileOpen`, opening the drawer always applies `backdrop-blur-md` to the header, so `inset-y-0` resolves against the header's height (~68 px) instead of the viewport.
- **Evidence:** live + local dev (390×844): drawer bounding rect `h = 68` (viewport 844); `getComputedStyle(header).backdropFilter === "blur(12px)"`; drawer `offsetParent === header`; all 12 nav links present in the accessibility tree but clipped inside the 68 px `overflow-y-auto` strip — exactly the reported "menu does not drop down fully, overlapping the browser screen".
- **Impact:** primary navigation unusable on mobile; content pages unreachable via menu. Fails the site-family's own WCAG-baseline navigation contract.
- **Recommended fix:** render the drawer **outside** the `<header>` element (React fragment sibling) so no filtered ancestor wraps it; keep all existing a11y wiring (role=dialog, focus trap, Escape, outside-click, focus restore).
- **Confidence:** Verified (live host and local dev, DOM + computed styles + bounding boxes observed).

### F2 — Hamburger toggle cannot close the drawer (pointerdown/click race) — **Medium** (Verified)

- **Location:** `src/components/Header.tsx` — outside-click `pointerdown` effect (excludes only the drawer itself).
- **Description:** a real tap on the open-state hamburger dispatches `pointerdown` (outside the drawer → `setMobileOpen(false)`) followed by `click` on the same button (`setMobileOpen(o => !o)` → reopens). The sibling queenstown implementation guards its toggle (`toggleRef.current?.contains(target) → return`); the church port dropped that guard.
- **Evidence:** atomic `pointerdown` + `click` dispatch on the open-state hamburger via CDP → drawer still open (`drawerStillOpen: true`).
- **Impact:** the X button can appear dead on touch devices; users must tap elsewhere or pick a link.
- **Recommended fix:** add the toggle guard: `if (hamburgerRef.current?.contains(target)) return;`
- **Confidence:** Verified.

### F3 — Any tap inside the drawer closes it, including non-navigation taps — **Medium** (Reasoned from code; live behaviour consistent)

- **Location:** `src/components/Header.tsx` — drawer root `onClickCapture={() => setMobileOpen(false)}`.
- **Description:** taps on the three non-interactive parent category labels ("About", "Worship", "Ministries") and the drawer heading area close the entire menu without navigating. Queenstown closes only when the tap target is inside an `<a>`.
- **Impact:** pointless friction — the user must reopen and re-orient; reads as "menu closed by itself".
- **Recommended fix:** close only when an anchor was clicked: `if ((event.target as HTMLElement).closest("a")) setMobileOpen(false)`.
- **Confidence:** Reasoned (code inspection); consistent with observed live behaviour.

### F4 — No mobile-viewport E2E coverage of the drawer — **Medium** (Verified)

- **Location:** `e2e/navigation.spec.ts` (desktop-only scenarios); no other spec opens the drawer at a mobile viewport.
- **Evidence:** `grep` over `e2e/` finds no `setViewportSize`/mobile drawer assertions; 51/51 E2E green while F1–F3 shipped through seventeen audit rounds.
- **Impact:** the documented pre-push gate cannot catch mobile-nav regressions; this audit's F1–F3 are the direct result.
- **Recommended fix:** new `e2e/mobile-navigation.spec.ts` at 390×844 asserting: drawer fills the viewport (≥ 90% height), every nav link (including the last, "Serve") is visible within the viewport, hamburger closes the drawer, parent-label tap does not close, outside tap closes, Give link present.
- **Confidence:** Verified (suite inspection).

### F5 — Give CTA absent from the mobile drawer — **Low** (Verified)

- **Location:** `src/components/Header.tsx` mobile drawer; `src/data/nav.ts` `primaryNav` (no Give entry).
- **Evidence:** desktop top bar carries "Give" but is `hidden lg:block`; the drawer renders `primaryNav` only. Queenstown's drawer appends a gold "Give" link; footer navigation has Give on both sites.
- **Impact:** the parish's primary stewardship CTA is out of the mobile primary path.
- **Recommended fix:** append a `Give` link (`/give`, gold tone) as the drawer's final item — mirrors queenstown's mobile IA.
- **Confidence:** Verified.

### Informational

- **I1 —** Desktop dropdown shows the parent description but not per-child descriptions; `nav.ts` dropped the child `description` field the queenstown dropdown renders. Deliberate content slimming — noted for content owners, not scheduled.
- **I2 —** Header brand block is text-only vs queenstown's emblem-led two-line brand. `Emblem` already exists in the codebase (used on Home/About/NotFound). Aesthetic choice — not scheduled.
- **I3 —** Round-17 motion system (scrims, hero-fade, rule-draw, button lift) has no queenstown counterpart — church is ahead; no action.

## Verification ledger

| Check | How | Result |
|---|---|---|
| Live drawer defect (F1) | agent-browser 390×844, live host + local dev; bounding boxes, computed styles, offsetParent | Reproduced both; h=68 vs 844 viewport |
| Root cause (F1) | computed `backdrop-filter`, class list, CSS spec containing-block rule | Verified; fix designed against it |
| Toggle race (F2) | atomic pointerdown+click dispatch on hamburger | Drawer stays open — Verified |
| Desktop dropdowns | hover About/Worship/Ministries at 1440×900 | Open, 3 children each, Escape/outside-click wired — working |
| Inner pages mobile | Worship page at 390×844 | PageHero + mass times render; no horizontal scroll |
| Gates baseline | `pnpm lint` / `typecheck` / `test` / `test:e2e` | 0 / 0 / 26 files · 144 / 51/51 — all green pre-change |
| Round-16 status | `git ls-files` probes | C1/H1/H3/M1 remediations from round 16 still hold at HEAD |
