# Design Enhancement Plan — Round 15 (2026-09-02) — visual, UI/UX & motion (TDD)

> **Input:** full-codebase exploration (10 pages, 18 components, `src/index.css` token/utility layer, Header/Footer/Layout chrome) + live-site evidence capture (`audit-shots/`: home/worship/ministries/history desktop 1440×900, home + drawer mobile 390×844, 2026-09-02) + `skills/` guidance (`skills-catalog.md` → `static-spa-parish-site`, `ui-ux-pro-max`, `aesthetic` + `references/micro-interactions.md`).
> **Method:** TDD — the `docs-contract` guard is extended **first** (RED), then the visual/motion implementation lands (GREEN), then the full gate + E2E audit, then docs re-pin. No new files, no new hooks, no new color tokens; the only count-class change is **keyframes 8 → 9** (`bloom-drift`) and **tests 117 → 118** (one new guard check). Single branch: `main`.
> **Restraint rule (from `aesthetic` §PEAK + round-7 precedent):** motion must be compositor-only (`transform`/`opacity`), covered by the global `prefers-reduced-motion` neutralizer, and must not break any of the 51 E2E contracts or the chip/print/sticky semantics the specs pin.

---

## A. Audit findings (evidence-first)

| ID | Finding | Evidence | Severity |
|----|---------|----------|----------|
| **V1** | Inner-page heroes crush their photography: `PageHero` stacks image `opacity-60/80` + vertical `from-950/50 via-950/60 to-950` + L→R `from-950/70 via-950/25` — the Worship crucifix and Ministries feast shots read as near-black fields (`audit-shots/worship-desktop.png`, `ministries-desktop.png`). Home hero's left third is similarly flat. | screenshots + `PageHero.tsx:41-53`, `Home.tsx:27-28` | **Medium — visual** |
| **V2** | Page-hero imagery is static; only the Home hero drifts (`hero-ken-burns` exists as a 20s utility but `PageHero.tsx` never applies it). | `PageHero.tsx:36-44` vs `index.css:193-204` | Low — motion |
| **V3** | History timeline enters fully formed: rail and all 8 entries render at once with no scroll-choreography, while every other section uses `Reveal` stagger. | `Timeline.tsx:10-31` (no IO, no reveal) | Low — motion |
| **V4** | Worship confession grid: left copy column (2 short blocks) vs right column (6 stacked devotion cards) → large dead zone bottom-left (`audit-shots/worship-desktop-s2.png`). Grid lacks vertical centering. | `Worship.tsx:134` | Low — layout |
| **V5** | BackToTop fades only; entrance lacks the lift idiom used by Button/Footer socials (`hover:-translate-y-0.5`). | `BackToTop.tsx:43-45` | Info — motion |
| **V6** | Dark CTA bands (Home "Come and see", NewsEvents bulletin, Give band) use a static `bg-gold-bloom` glow — no ambient life. | `Home.tsx:171`, `NewsEvents.tsx:52`, `Give.tsx:69` | Info — motion |
| **V7** | Home hero fact row: `max-w-2xl` (672px) forces "7.30 a.m.–5.30 p.m." to wrap at lg (`audit-shots/home-desktop.png`). | `Home.tsx:49` | Info — polish |
| **V8** | NewsEvents outbound "Read more" links have no external affordance cue. | `NewsEvents.tsx:36-44` | Info — polish |
| **W1** | Devotion chip contrast (gold-700 `#85601f` on parchment) computed **4.72:1 — passes AA** (scripted check, `scripts/contrast_check.py`); all four chip pairings ≥ 4.5:1 on both parchment and cream. Prior sibling-audit Medium finding does **not** reproduce here. | scripted WCAG math | Verified green — **no action** (restraint: no token added) |

---

## B. Remediation ToDo (R-1 … R-8)

### R-1 — guard first (RED): extend `src/docs-contract.test.ts`
- [ ] Update the keyframes invariant: exact list 8 → 9, adding `bloom-drift`.
- [ ] New `it()` — "carries the round-15 motion contract": `PageHero.tsx` contains `hero-ken-burns`; `Home.tsx` / `NewsEvents.tsx` / `Give.tsx` contain `bloom-drift`; `Timeline.tsx` contains `scale-y-0` + `origin-top` (drawn rail) and reveals entries via `Reveal`; `BackToTop.tsx` contains `opacity,transform` + `translate-y-2` (lift entrance).
- [ ] RED proof: `pnpm test` → exactly 2 failures (keyframes list; motion contract), 17 files / 118 tests.

### R-2 — hero photographic legibility + drift (V1 + V2)
- [ ] `PageHero.tsx`: apply `hero-ken-burns` to the hero image; retune overlays — dusk: vertical `/45→/65` → `/35 via /50`; L→R `/70 via /25` → `/55 via /15`. light: image `opacity-60` → `opacity-70`, vertical `/50 via /60` → `/40 via /50`.
- [ ] `Home.tsx`: vertical `/40 via /55` → `/30 via /45`; L→R `/70 via /30` → `/55 via /20`.
- [ ] Text-contrast safety: both heroes keep a solid `to-shrine-maroon-950` floor and bottom-anchored text (justify-end) — cream-on-near-950 unaffected.
- [ ] Visual verification: dev-server screenshots pre/post at 1440×900 and 390×844.

### R-3 — timeline scroll-choreography (V3)
- [ ] `Timeline.tsx`: inline `IntersectionObserver` on the `<ol>`; rail keeps `data-testid="timeline-rail"` + gradient (E2E pins `backgroundImage`), gains `origin-top` + `scale-y-0/scale-y-100` transition (≈1.1s, cubic-bezier ease-out) driven by a `drawn` state; `prefers-reduced-motion` or missing IO → drawn immediately.
- [ ] Wrap each entry's content (year/title/description) in `Reveal` with `delay={index * 70}` — `<li>` stays the direct child of `<ol>` (valid HTML; E2E `main ol > li` intact; print override forces `.reveal` opaque so the round-7 print contract holds).

### R-4 — dark-band bloom drift (V6)
- [ ] `src/index.css`: add `@keyframes bloom-drift` (translate/scale drift, ~14s ease-in-out alternate infinite) + `.bloom-drift` utility (transform-only → compositor-safe; global reduced-motion neutralizer covers it).
- [ ] Apply to the `bg-gold-bloom` overlays in `Home.tsx`, `NewsEvents.tsx`, `Give.tsx`.

### R-5 — chrome micro-polish (V4, V5, V7, V8)
- [ ] `Worship.tsx`: confession grid `lg:items-center` (balances copy vs devotion stack).
- [ ] `BackToTop.tsx`: `transition-opacity` → `transition-[opacity,transform]`; hidden adds `translate-y-2 scale-95`, visible `translate-y-0 scale-100` (opacity-0/pointer-events-none hidden mechanics unchanged → E2E visibility semantics identical).
- [ ] `Home.tsx`: hero fact row `max-w-2xl` → `max-w-3xl` (no wrap at lg).
- [ ] `NewsEvents.tsx`: "Read more" gains `ArrowUpRight` affordance icon (text unchanged).

### R-6 — GREEN + full gate
- [ ] `pnpm lint` → 0 warnings; `pnpm typecheck` → 0 errors.
- [ ] `pnpm test` → **17 files / 118 tests, 0 failed** (guard 23 + repo-hygiene 4 + ci-workflow 4 + BSC suite 87).
- [ ] `pnpm build` → dist/index.html ≈ 391.6 kB (< 420 kB budget guard).

### R-7 — E2E audit
- [ ] `pnpm test:e2e` → 51/51 (dev); `pnpm test:e2e:built` → 51/51 (built artifact).
- [ ] agent-browser journey on the remediated build: home/worship/ministries/history/faq desktop + mobile, drawer, console error sweep; before/after screenshots archived under `audit-shots/`.

### R-8 — docs re-pin + record
- [ ] Sweep `8 keyframes` → `9 keyframes` and `27 utilities` → `28 utilities` across AGENTS/CLAUDE/README/SKILL current-state rows (historical `as of`-labeled rows untouched).
- [ ] Sweep test-count pins `17 files / 117 tests` → `17 files / 118 tests` (guard's 3 doc pins enforce).
- [ ] SKILL §0: keyframes row + utilities row + `verified:` line (re-verified 2026-09-02 round-15); README Current audits + AGENTS Where-to-look-next gain round-15 entries.
- [ ] Append §C execution log (real outputs) to this file; commit to `main` (no new branches); push via `ssh_git_wrapper_v3.py` + deployed key; serve `vite preview` as the showcase site.

---

## C. Plan re-validation (pre-execution alignment check)

| Plan item | Target verified in tree? | Evidence |
|-----------|--------------------------|----------|
| R-1 | keyframes invariant at `src/docs-contract.test.ts:69-82` pins exactly 8; doc pins `117` ×3 at L201/207/216 | file read (this session) |
| R-2 | `PageHero.tsx:37-44` image without ken-burns; gradient strings at L41-53; `Home.tsx:27-28` gradients, L49 `max-w-2xl` | file reads |
| R-3 | `Timeline.tsx` has no IO/Reveal; E2E pins: rail gradient (`enhancements-round5.spec.ts:57-63`), `main ol > li` print opacity (`enhancements-round7.spec.ts:17-24`) | file reads + e2e greps |
| R-4 | bloom overlays at `Home.tsx:171`, `NewsEvents.tsx:52`, `Give.tsx:69`; guard keyframes list (8) | file reads |
| R-5 | `Worship.tsx:134` grid; `BackToTop.tsx:43-45` opacity-only; E2E back-to-top uses toBeHidden/toBeVisible (`smoke.spec.ts:123-136`) — opacity-0 mechanics retained | file reads + e2e reads |
| R-6 | baseline gates reproduced this session: lint 0 / typecheck 0 / 117 tests / build 391,565 B | gate runs (worklog) |
| R-7 | baseline 51/51 dev + 51/51 built reproduced this session | gate runs (worklog) |
| R-8 | stale-string surface: `8 keyframes` ×14 (README 1 / SKILL 8 / AGENTS 2 / CLAUDE 3), `27 utilities` ×6 (AGENTS 2 / SKILL 4), `117` ×37 — line-level review at execution; historical labeled rows (SKILL L730/756/1391/1596 class) excluded | `rg -c` sweeps |
| W1 no-action | chip e2e regex `text-shrine-(maroon|gold|pine|terracotta)-` unaffected; contrast script green | `scripts/contrast_check.py` output |

**Alignment verdict:** every ToDo maps 1:1 onto a verified string/file in the tree; no E2E-pinned selector/class is removed (ken-burns/`bloom-drift`/`scale-y` are additive; `data-testid` spans unchanged). Counts-class changes (keyframes 8→9, tests 117→118) ride the established guard-first → docs-repin workflow proven in round-14. Plan is aligned — execute.

---

## D. Execution log (TDD)

### D.1 RED — guard extended first (R-1)
- `src/docs-contract.test.ts`: keyframes invariant retargeted to the 9-keyframe list (adds `bloom-drift`); new describe `code invariants — round-15 motion contract` (+1 check — PageHero `hero-ken-burns`; Home/NewsEvents/Give `bloom-drift`; Timeline `scale-y-0` + `origin-top` + `Reveal` + `prefers-reduced-motion`; BackToTop `opacity,transform` + `translate-y-2`).
- `pnpm test` → **17 files / 118 tests — 2 failed / 116 passed** (keyframes list; motion contract). RED binds the guards, not the code.
- Mid-execution catch: the 3 doc-pin assertions (`17 files / 117 tests` in CLAUDE/README/SKILL frontmatter) were retargeted to **118** together with the docs sweep — the guard's own pins ride the same commit as the docs they enforce.

### D.2 GREEN — implementation (R-2 … R-5)
- `src/index.css`: `@keyframes bloom-drift` (translate3d ±1.5%/1.5% + scale 1→1.08, 14s ease-in-out infinite alternate) + `.bloom-drift` utility (`will-change: transform`; covered by the global reduced-motion neutralizer).
- `PageHero.tsx`: image gains `hero-ken-burns`; dusk overlays `45/65→35/50` vertical, `70/25→55/15` L→R; light variant image `opacity-60→70`, vertical `50/60→40/50`.
- `Home.tsx`: hero overlays `40/55→30/45` vertical, `70/30→55/20` L→R; fact row `max-w-2xl→3xl` (un-wraps "7.30 a.m.–5.30 p.m." at lg); bloom overlay `+bloom-drift`.
- `NewsEvents.tsx`: `+bloom-drift`; "Read more" → inline-flex with `ArrowUpRight` affordance icon (text unchanged — chip/link E2E regexes untouched).
- `Give.tsx`: `+bloom-drift`. `Worship.tsx`: confession grid `+lg:items-center` (copy column centers against the devotion stack).
- `Timeline.tsx`: inline IntersectionObserver (rootMargin `0px 0px -20% 0px`) drives the rail `scale-y-0→scale-y-100` (origin-top, 1100ms ease-out); reduced-motion/IO-absent → drawn immediately; `data-testid="timeline-rail"` span keeps the pinned gradient; each entry's content wrapped in `Reveal delay={index*70}` inside the `<li>` (valid HTML, `main ol > li` + print contracts intact).
- `BackToTop.tsx`: `transition-[opacity,transform]`; hidden `translate-y-2 scale-95 opacity-0` → visible `translate-y-0 scale-100` (opacity-0/pointer-events-none hidden mechanics unchanged).

### D.3 Gates (post-remediation)

| Gate | Result |
|------|--------|
| `pnpm lint` | EXIT 0 — 0 warnings |
| `pnpm typecheck` | EXIT 0 — 0 errors |
| `pnpm test` | **17 files / 118 tests — all green** (`docs-contract` 23 + `repo-hygiene` 4 + `ci-workflow` 4 + BSC suite 87) |
| `pnpm build` | EXIT 0 — `dist/index.html` **392,962 B (392.96 kB)**, gzip 114.09 kB — budget guard green (<420 kB) |
| `pnpm test:e2e` | **51/51 passed** (dev, 1.5m) |
| `pnpm test:e2e:built` | **51/51 passed** (built artifact, 1.3m) |
| Visual probes | dev-server screenshots `audit-shots/r15-*.png`: home/worship heroes show restored photography with legible bottom-anchored text; timeline choreography active (rail gradient computed ✓, scale transition ✓); `bloom-drift` computed `animation: bloom-drift 14s` ✓; confession grid centered; mobile 390×844 parity |

### D.4 Docs re-pin (R-8)
- Persisted sweep `scripts/repin_round15.py` (line-targeted + hard asserts, idempotent): **47 → 56 line edits** across AGENTS/CLAUDE/README/SKILL — test counts `17 files / 117 → 118`, keyframes `8 → 9` (+`bloom-drift` named in AGENTS L36/L121, CLAUDE L117/L296/L434, README L110, SKILL §0/§4.3 register row 28 + Keyframes line), utilities `27 → 28`, guard checks `22 → 23` (`round-13/14/15`), build size `391.57 → 392.96 kB` / `391565 → 392962` current-state pins.
- Protected (verified untouched): AGENTS round-14 plan line + README round-13/14 historical narrative (117/391,565 kept), SKILL appendix snapshots (L1439/1551/1628), CLAUDE L460 historical checklist.
- Round-15 references added: README Current audits sentence, AGENTS Where-to-look-next entry, SKILL frontmatter `verified:` → `(re-verified 2026-09-02, round-15 — docs-contract 23 checks)`.

### D.5 Commits (main only — no new branches)
1. `feat(ui)+test: round-15 sacred-motion — ken-burns page heroes, drawn timeline rail, bloom drift, back-to-top lift + docs-contract motion pins (23 checks)`
2. `docs: round-15 re-pin (118 tests, 9 keyframes, 28 utilities, 392.96 kB) + design-enhancement-round15 record`
