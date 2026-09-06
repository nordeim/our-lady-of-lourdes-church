# Plan — F1→F3 Follow-ups: Harness, E2E Retarget, ScrollSpy & Full-Gate Re-Green

> **Date:** 2026-09-03 · **Branch:** `main` · **Status:** PLAN (VALIDATE before IMPLEMENT)  
> **Prerequisite:** `cb18b05` docs-sync to BSC is on `main` — `AGENTS.md`/`CLAUDE.md`/`README.md`/`blessed-sacrament-queenstown_SKILL.md` now truthfully describe `src/` (39 files, BSC fixtures, harness missing).  
> **Scope:** three sequential follow-ups that were deliberately deferred in `docs/plan-adapt-docs-to-bsc-2026-09-02.md` (decisions D2–D4 = A). Each follow-up is TDD, one logical change per commit, surgical diffs only.

| Follow-up | Title | Moves gate from → to |
|---|---|---|
| **F1** | Restore unit-test harness (`src/test/setup.ts`) + port BSC-adapted unit suite | `pnpm test` 0/0 red → 30–36 files / ~180–210 tests green |
| **F2** | Restore `useScrollSpy` + retarget `e2e/` 9 specs from Risen copy to BSC copy | `pnpm test:e2e` 51 red (Risen stale) → 51 green on BSC |
| **F3** | Full-gate re-green + `pnpm test:e2e:built` + docs re-pin | 4/5 green → 5/5 green (+ built-artifact 51/51) |

No `src/` parish facts change beyond what BSC already renders — these are test/harness-only changes plus one small hook addition.

---

## 0. Ground Truth (re-verified 2026-09-03)

| Facet | Current value | Evidence |
|---|---|---|
| `src/` inventory | **39 files** — no `src/test/` subtree | `find src -type f \| wc -l` → 39 |
| `src.orig/` inventory | **77 files** — 41 source + 35 tests + 1 setup | `find src.orig -type f \| wc -l` → 77 |
| `src/test/setup.ts` | **absent** — `vite.config.ts test.setupFiles: ["src/test/setup.ts"]` points to a missing file | `ls src/test` → no such file; `pnpm test` → `No test files found` |
| Unit suite | **0 files / 0 tests** | vitest `include: src/**/*.{test,spec}.{ts,tsx}` excludes `e2e/**` |
| E2E suite | **9 specs — 51 tests** — specs assert **Risen Christ** copy (`He is risen`, `91 Toa Payoh Central`, `Toa Payoh NS19`, `Velankanni`, `Grateful Faithful`, UEN `T08CC4042G`) against a BSC build (`A tent of meeting`, `1 Commonwealth Drive`, `Commonwealth EW20`, `Corpus Christi`, SS.CC, `$9.4m` TOMR) — single smoke assertion already fails | `pnpm test:e2e --grep "home renders hero"` → locator `He is risen` not found |
| Hooks | **2** — `useScrolled`, `useScrollProgress`; `useScrollSpy` **absent** | `ls src/hooks` → 2 files |
| Utils | **4** — `cn`, `massDay` (simplified `getDay()` switch), `deepLinks` (JSDoc-stripped), `monogram` (SS.CC-aware: `ss.cc`/`sscc`/`mr`/`ms`/`mrs` added) | `cat src/utils/monogram.ts`, `src/utils/deepLinks.ts` |
| Data fixtures (BSC) | `priests[5]` Johan/Rusdi/Karolus/Sambodo/Anthony (all SS.CC, `email?` no `phone`), `ppcMembers[6]` (ex-officio + Victor Leong / Catherine Wong / Alyzza Miclat + mission + SS.CC), `lifeTimeline[8]` 1958–2026 (Sacred Hearts arrive → Damien Hall → Tent 1965 → Queenstown fills pews → Damien Centre → conserved → TOMR $9.4m → Eucharistic spirituality), `grounds[3]` `main-church`/`chapel`/`rosary-garden→Damien Centre`, `ministries[6]` `mandarin` last = Language Communities (Indo last Sun 13:00, Tagalog 15:15 English 3rd Sun), `upcomingEvents[6]` Corpus Christi feast-first + First Friday Sacred Heart vigil, `givingOptions[8]` no UEN, `site` no `uen`/`free/ssvp/bulletin/cep` but `whatsapp`/`sacredHearts`/`parishUpdates`, feast `Corpus Christi Thursday after Trinity`, transport `Commonwealth EW20` buses `11041/11049` | `src/data/content.ts`, `src/data/site.ts` |
| Build | `pnpm lint 0`, `pnpm typecheck 0`, `pnpm build 390.74 kB` `dist/index.html` + `_headers` + `images/8` | `pnpm lint && pnpm typecheck && pnpm build` 2026-09-03 |
| `pnpm test` | `No test files found, exiting with code 1` | `pnpm test` 2026-09-03 |
| `pnpm test:e2e` | 51 tests — stale Risen assertions (smoke already fails) | above |
| Docs | Synced to BSC at `cb18b05` — every mutable fact now BSC-true, `skills/` flagged DELETED, `src.orig` PRESENT 77 Risen, hooks 2, etc. | `AGENTS.md` / `blessed-sacrament-..._SKILL.md` |

**Key invariant:** `src/` already renders BSC correctly (Home `A tent of meeting`, Worship Mass 8.30/12.30/6.30 + 6 devotions, Ministries `mandarin`, site 1 Commonwealth). F1–F3 change **only** the test harness that proves it, plus one missing hook.

---

## 1. F1 — Restore Unit-Test Harness + Port BSC-Adapted Unit Suite

### 1.1 Goal

`pnpm test` goes from `0/0 red (No test files found)` to **30–36 files / ~180–215 tests green** — the highest-value, lowest-churn tests first, then periphery guards. The suite proves BSC fixtures (not Risen) and that the harness matches `vite.config.ts: test.setupFiles`.

### 1.2 TDD Verification Gate (one cycle per commit)

```
RED → write failing test (e.g. assert BSC site.address.street) → run pnpm test (fails)
GREEN → copy & adapt src.orig test to BSC fixtures → run pnpm test (passes)
REFACTOR → remove Risen-only assertions (UEN, Velankanni, NS19, Brian/Arun/Dexter) → re-run
```

No new `any`, strict `noUnusedLocals/Params` stays green; `pnpm lint && pnpm typecheck && pnpm test` is the per-commit check.

### 1.3 Work queues (sequential, each = one commit)

#### Queue A — Harness (must be first; everything else depends on it)

| # | Task | File(s) | Adaption | Verify |
|---|---|---|---|---|
| A1 | Restore `src/test/setup.ts` verbatim from `src.orig/test/setup.ts` (jest-dom + MockIntersectionObserver that immediately reports intersecting so `Reveal` becomes visible + `window.scrollTo`/`scrollIntoView` no-op stubs + `matchMedia` stub returning `matches:false`) | `src/test/setup.ts` (new) | none — byte-identical to `src.orig/test/setup.ts` | `pnpm test` changes from `No test files` to `0 test files still but setup loads` (no failure on import) |

#### Queue B — Pure helpers (no DOM, BSC-fixture swap only)

| # | Task | Source | BSC adaption | Tests |
|---|---|---|---|---|
| B1 | `utils/cn` | `src.orig/utils/cn.test.ts` → `src/utils/cn.test.ts` | none — helper unchanged | 5 |
| B2 | `utils/massDay` | `src.orig/utils/massDay.test.ts` → `src/utils/massDay.test.ts` | none — helper unchanged (switch vs if/else nuance covered) | 5 |
| B3 | `utils/monogram` — **must extend** for SS.CC | `src.orig/utils/monogram.test.ts` (Friar/OFM cases) → `src/utils/monogram.test.ts` | add SS.CC cases: `Fr Johan Wongso, SS.CC → JW`, `Fr Rusdi Santoso, SS.CC → RS`, `Fr Karolus Kapolok Huar, SS.CC → KK`, `Fr Sambodo Sru Ujianto, SS.CC → SS`, `Fr Anthony Hutjes, SS.CC → AH`; keep existing Friar/OFM/hyphen cases | 7+ |
| B4 | `utils/deepLinks` | `src.orig/utils/deepLinks.test.ts` → `src/utils/deepLinks.test.ts` | strip Risen-specific comment but keep `knownRoutePaths stays in sync with App.tsx` drift guard (reads `src/App.tsx` `path="..."` — still 17 entries, 7 aliases) | 7 |
| B5 | `data/nav` | `src.orig/data/nav.test.ts` → `src/data/nav.test.ts` | update description assertions from Risen wording (`Priests, household…` / `From Ho Ping Centre…`) to BSC wording (`Vision, SS.CC fathers…` / `From Damien Hall…`) | 7 |
| B6 | `data/content` | `src.orig/data/content.test.ts` (content 10) → `src/data/content.test.ts` | `priests` 3→5 (assert `email` present, `phone` absent / no longer required), `ppcMembers` 7→6, `lifeTimeline` years unchanged in length (8) but content BSC (no assertion on title text), `grounds` still 3 ids `[main-church, chapel, parish-hall]` (new third is Damien Centre but id stays `parish-hall`? — verify actual id in `src/data/content.ts` is `rosary-garden`→ confirm before asserting), `ministries` 6 ids same set but last `mandarin` semantic, `faqs` 6, `upcomingEvents` 6 categories + at least one `href`, `givingOptions` 8 icons `globe+flame`, `serveRoles 4 / devotions 6` | 10 |
| B7 | `data/site` | `src.orig/data/site.test.ts` → `src/data/site.test.ts` | `address` 91 Toa Payoh 319193→1 Commonwealth Drive 149603, `mapsUrl` still google.com/maps, `contact` `parishPriestPhone +65 6474 0582` + `emergencyPhone +65 9170 9133` (no `mediaPhone`), `email bsc.secretariat@catholic.org.sg`, **no `uen`** (assert `site.uen` absent / `chequePayee` is `Blessed Sacrament Church`), `facebook` mybsc.sg, `hours` 5 keys `gates/mainChurch/chapel/reception/parishOffice/adorationRoom` (no `mediaCentre`), `mass` `sunday` length **6** (not 5), `confession`/`adoration`/`secondCollection`/`note` still present, `feast` `Corpus Christi Thursday after Trinity` (not Risen), `origin` `https://www.bsc.org.sg`, no `free/ssvp/bulletin/cep` but `whatsapp` + `sacredHearts` + `parishUpdates` | 8 |
| B8 | `docs-contract` + `ci-workflow` + `repo-hygiene` + `head` + `security-headers` (if present in Risen) | `src.orig/docs-contract.test.ts` etc. → `src/...` | `docs-contract` must retarget counts: `src` 39 files / 0 tests (not 35/202), `public/images 8`, `dist 390.74kB`, tokens 25+2; `ci-workflow` still asserts `lint→typecheck→test→test:e2e→build`; `head` must assert BSC `og:url bsc.org.sg` + BSC JSON-LD `1 Commonwealth`; `security-headers` asserts `public/_headers` Cloudflare | 16+4+3+13+6 |

#### Queue C — Component/pages (DOM, BSC copy where needed)

| # | Task | Source | BSC adaption |
|---|---|---|---|
| C1 | `components/ui/Button` | `src.orig/components/ui/Button.test.tsx` → `src/components/ui/Button.test.tsx` | none — component unchanged |
| C2 | `components/SkipLink`, `components/ui/Accordion` (requires `{hidden:true}` queries), `components/SafeImage`, `components/ui/Reveal`, `components/ScrollProgress`, `components/Layout` (hash scroll), `components/Header` (17 tests, modal drawer dialog/aria-modal/focus-trap), `components/BackToTop` (threshold 480, progress ring) | respective `src.orig/...` → `src/...` | replace any Risen-specific text snapshots with BSC equivalents (e.g. Header top-bar `site.feast.name` now `Corpus Christi`) |
| C3 | `components/Timeline`, `pages/History`, `pages/NotFound`, `pages/Ministries` (3), `pages/cta-bands`, `pages/worship-mass` (6), `pages/about-visuals` (4), `pages/event-chips` (3), `pages/give-featured` (2), `pages/give-uen` (3), `pages/card-affordances` (6), `components/wcag-contrast` (5), `hooks/useScrollProgress` (4) | respective `src.orig/...` → `src/...` | `worship-mass` must assert BSC mass slots (Mon–Fri 8.30+12.30/18.30, Sat 6.00 sunset + Tamil 3rd Sat 19.30, Sun 7.30 Mand/9.00/11.00/13.00 Indo/15.15 Tagalog/17.30); `give-uen` must assert **no UEN** (PayNow without UEN, cheque BSC); `event-chips` categoryTone same set but BSC events (Corpus Christi feast-first); `about-visuals` ghost numerals still 3 |

**Order matters:** A → B1–B8 → C1–C3. Each is one commit (`test: add src/<path>.test.* — BSC fixtures`).

### 1.4 Deferred / out-of-scope for F1

- No `src/pages/*.tsx` or `src/data/*` edits — tests prove existing BSC rendering, they don't change it.
- No e2e retarget (that's F2).
- No `useScrollSpy` (that's F2 if restored; otherwise tests document its absence as a known gap — see F2 decision).

### 1.5 Success criteria (F1 done when all pass)

- [ ] `src/test/setup.ts` exists and is byte-acceptable vs `src.orig/test/setup.ts` (IO mock + scroll stubs + matchMedia).
- [ ] `pnpm lint 0`, `pnpm typecheck 0`, **`pnpm test` 30–36 files / ~180–215 tests green** (`vitest run`) — `vitest run --coverage` optional but not required for green.
- [ ] `src/data/site.test.ts` proves **no UEN**, `feast Corpus Christi`, `address 1 Commonwealth Drive 149603`, `origin bsc.org.sg`.
- [ ] `src/data/content.test.ts` proves `priests[5]`, `ppcMembers[6]`, `lifeTimeline[8]`, `grounds[3]`, `ministries[6]` (last = Language Communities), `givingOptions[8]`, `images 11`, `sunday[6]`.
- [ ] `src/utils/monogram.test.ts` proves SS.CC stripping (`Fr Johan Wongso, SS.CC → JW` etc.) plus existing Friar/OFM cases.
- [ ] No Risen fixtures leak into BSC tests (no `91 Toa Payoh`, `T08CC4042G`, `Brian/Arun/Dexter`, `Velankanni` in assertions).
- [ ] `git status` shows only `src/test/setup.ts` + ~30 test files added — no `src/` source churn.

---

## 2. F2 — Restore `useScrollSpy` + Retarget `e2e/` 9 Specs to BSC Copy

### 2.1 Goal

`pnpm test:e2e` goes from **51 red (Risen stale)** to **51 green on BSC** (`dev` + `dist` + live via `E2E_BASE_URL`). The two sub-tasks can land as **two commits** in this order: (i) scrollspy restore, (ii) e2e retarget — so each commit stays reviewable. If the reviewer wants a single commit, they can be squashed, but the plan treats them as sequential.

### 2.2 Sub-task 2A — Restore `useScrollSpy` (small, high-signal)

**Why restore:** ministries jump-nav scrollspy was a round-7 "Honest Light" feature (viewport middle-band IO, `aria-current` moves with scroll, document-order tie-break). The BSC `src/` lost it (hooks 2 not 3), so `Ministries` pills only highlight on hash click, not on scroll. Restoring it is 1 file + ~10 lines of wiring in `src/pages/Ministries.tsx` and is fully covered by the existing `src.orig/hooks/useScrollSpy.test.tsx` (6 tests).

| # | Task | Source | How to wire |
|---|---|---|---|
| 2A1 | Restore `src/hooks/useScrollSpy.ts` byte-identical to `src.orig/hooks/useScrollSpy.ts` (see § Reference — the file already reviewed: `rootMargin "-45% 0px -50% 0px"`, `threshold 0`, `intersecting Map`, batched tie-break via `[...ids].reverse().find`, `ids.join("\|")` dep, `disconnect` cleanup) | `src.orig/hooks/useScrollSpy.ts` → `src/hooks/useScrollSpy.ts` | — |
| 2A2 | Restore its unit test `src/hooks/useScrollSpy.test.tsx` byte-identical (6 tests: fallback first id, adopts intersecting id, batched-tie document order, holds last active in empty batch, disconnects on unmount, tolerates missing element) — already green in Risen; will be green on BSC without fixture change | `src.orig/hooks/useScrollSpy.test.tsx` → `src/hooks/useScrollSpy.test.tsx` | — |
| 2A3 | Wire into `src/pages/Ministries.tsx`: read current `Ministries.tsx` (jump-nav pills with `aria-label="Jump to ministry"` and `href` hash), add `const ids = ministries.map(m => m.id)` + `const activeId = useScrollSpy(ids)` and switch the pill `aria-current` from `hash === id` to `activeId === id` (keep hash-click as fallback when JS disabled / before IO fires). Title/hook rendering stays `page-in` friendly. | patch `src/pages/Ministries.tsx` (~10 lines) | Preserve double-hash aware Layout scroll (`setTimeout 80ms` + `split('#')`) — no change there. |
| 2A4 | Verify `pnpm lint 0`, `pnpm typecheck 0`, `pnpm test` newly +6 tests green, manual scroll check (or rely on existing `e2e/ministries.spec.ts` + `e2e/enhancements-round7.spec.ts` which already assert `aria-current`) | — | — |

**Decision alternative:** if the approver prefers to keep scrollspy absent (D2=A from the BSC doc-sync), then **skip 2A** and document in `e2e/ministries.spec.ts` that `aria-current` moves only on hash click, not on scroll — the e2e retarget below then asserts the simpler invariant.

### 2.3 Sub-task 2B — Retarget `e2e/` 9 specs to BSC copy

**Why now and why exhaustive:** every fresh run proves the port's fidelity. The specs are thin wrappers around user-visible copy, so a wrong string is a regression in the parish story. Retarget is mechanical string-replacement with a single principle: replace Risen constants with BSC constants from `src/data/site.ts` + `src/data/content.ts` + `src/pages/*.tsx` rendering.

#### 2.3.1 Constants map (the only allowed substitutions)

| Risen (remove) | BSC (assert) | Source |
|---|---|---|
| `He is risen` (h1 `Toa Payoh` story) | `A tent of meeting.` (hero h1) | `src/pages/Home.tsx` `h1` |
| `Toa Payoh` / `91 Toa Payoh Central` / `319193` / `Toa Payoh NS19` | `1 Commonwealth Drive` / `149603` / `Commonwealth` / `Commonwealth EW20` | `src/data/site.ts` `address` + `transport` |
| `Grateful, Faithful, and Sent.` / `He is risen.` vision | `To be an evangelising church with a Eucharistic spirituality.` / `A tent of meeting in Queenstown.` | `src/data/site.ts` `tagline`/`vision` |
| `Velankanni` / `54th` / `F.R.E.E.` / `CEP` (Risen events) | `Corpus Christi` / `First Friday Sacred Heart` / `RCIA` / `KKIS Indonesian` / `Archdiocesan news` | `src/data/content.ts` `upcomingEvents` |
| `Take a place in the household` (Ministries heading) | Check actual `src/pages/Ministries.tsx` heading — likely `Take a place in the household` vs `Liturgical`/`Faith Formation` etc. — **keep as-is if unchanged; otherwise update to BSC heading** (read file before patching) | `src/pages/Ministries.tsx` |
| `Mass, mercy` heading (Worship) | Keep — `src/pages/Worship.tsx` heading `Mass, mercy, and a place to kneel` is BSC (already generic) | `src/pages/Worship.tsx` |
| `A parish since 1971` (rise-in eyebrow) | Correct for BSC? `src/pages/Home.tsx` eyebrow is `A Sacred Hearts parish since 1965` — update | `src/pages/Home.tsx` |
| UEN `T08CC4042G` (Give) | **no UEN** — BSC PayNow without UEN (assert absence + `chequePayee Blessed Sacrament Church`) | `src/data/site.ts` `chequePayee`, `src/data/content.ts` `givingOptions` |
| `Priests Brian/Arun/Dexter` / `Peter Quek/Audrey Rozario/...` | `Fr Johan/Rusdi/Karolus/Sambodo/Anthony SS.CC` / `Victor Leong/Catherine Wong/Alyzza Miclat` | `src/data/content.ts` |

#### 2.3.2 Per-spec retarget checklist (one patch set per spec, verified with `pnpm test:e2e`)

| Spec | Current assertion (Risen) | BSC assertion (new) | Notes |
|---|---|---|---|
| `e2e/smoke.spec.ts` (11) | `getByRole('heading', /He is risen/i)` + `Toa Payoh` | `getByRole('heading', /A tent of meeting/i)` + `getByText(/1 Commonwealth Drive/i)` or `Commonwealth` + keep `Sunday`/`Feast`/`Blessed` | Keep the remaining smoke checks (Worship aliases, Ministries aliases, hash anchors `#mass`/`#confession`/`#visit` / `#liturgical`/`#faith-formation`/`#pastoral-care`, NotFound, drawer open/close, current-route regression, `rise-in` hero, gold chips `rounded-full`, `back-to-top`) — those are data-agnostic and already pass |
| | `hero.getByText(/A parish since 1971/i)` | `hero.getByText(/A Sacred Hearts parish since 1965/i)` | exact BSC eyebrow |
| | `event chips` categoryTone `Parish/Devotion/Formation/Archdiocese` + `time.font-display` | same categories (unchanged) — BSC events share the same category union | no change beyond smoke hero |
| `e2e/navigation.spec.ts` (8) | Worship dropdown children text + `aria-current` for `/worship#mass` etc. with Risen wording? | Update any `expect(getByText(/...Risen wording.../))` to BSC `primaryNav` descriptions: `Vision, SS.CC fathers…` / `From Damien Hall…` / `Mass, confession…` etc.; keep structural checks (desktop dropdown `menu-in`, keyboard, SkipLink, footer 10 links, Give link, `aria-current`) | Footer 10 links still assert 10 items but `free/ssvp/bulletin/cep` are gone on BSC — update footer assertions to BSC footer (whatsapp/sacredHearts/parishUpdates) or keep agnostic (`getByRole('link', {name: /Serve\|Give/})`) |
| `e2e/ministries.spec.ts` (4) | 6 sections `#liturgical…#language-communities` + jump-nav pills + `imageAlt` | Keep ids (same `ministries[6]` ids), update pill imagery assertions only if needed; after 2A, `aria-current` should also move on scroll (round-7), not just on hash click — keep hash-click as baseline and let scrollspy be bonus | No UEN or Velankanni reference |
| `e2e/give-faq.spec.ts` (4) | Give 8 options + UEN + FAQ accordion + Worship Find Us `91 Toa Payoh` | Assert 8 `givingOptions`, **no UEN** (check Absence: `expect(page.getByText(/T08CC/)).toHaveCount(0)` if needed), FAQ 6 `Accordion` `aria-expanded`, Find Us `1 Commonwealth Drive` + `Commonwealth EW20` + `11041/11049` + maps iframe `src` contains `1+Commonwealth+Drive` | |
| `e2e/enhancements.spec.ts` (7) + `e2e/enhancements-round5.spec.ts` (6) | `motion` (rise-in/menu-in/drawer-in/dot-pulse), `chip` gold ring, `sticky` History `lg:sticky`, `Timeline rail`, `img-zoom`, `bg-gold-bloom`, `reveal-visible` | Keep — these are motion/CSS contracts, parish-agnostic. No Risen fixture. | |
| `e2e/enhancements-round7.spec.ts` (8) | scrollspy (`useScrollSpy` viewport middle-band), sticky mercy column, News/FAQ bands, Give featured PayNow card, Ministries scrollspy, PPC/link affordances, desktop nav gold hairline, `card-tint` | Keep — but note `useScrollSpy` was absent before 2A; after 2A the spec that asserts `aria-current` moves on scroll becomes meaningful again. Adjust `About PPC/link` assertions to BSC ppc count (6) if they check 7. | update About `About PPC` list count 7→6 |
| `e2e/deep-links.spec.ts` (3) + `e2e/helpers.ts` | `knownRoutePaths` → hash rewrite `/#/worship` etc. | Keep — path set is unchanged (17 entries, 7 aliases). `helpers.gotoHash` stays. | |
| **Do not add** | — | — | No new spec files in F2; no visual regression harness. |

#### 2.3.3 Helpers

- `e2e/helpers.ts` already has `gotoHash + expectHash` — keep.
- `playwright.config.ts` already correct (`webServer: pnpm exec vite --port 5173`, `expect timeout 15s`, CSP meta).
- `playwright.built.config.ts` already correct (`vite preview :4173` or `E2E_BASE_URL → live`) — see F3.

### 2.4 Success criteria (F2 done when all pass)

- [ ] `src/hooks/useScrollSpy.ts` + `src/hooks/useScrollSpy.test.tsx` present (or explicit decision to skip 2A documented).
- [ ] `src/pages/Ministries.tsx` pill `aria-current` follows `useScrollSpy(ids)` (or documented hash-only fallback).
- [ ] `pnpm lint 0`, `pnpm typecheck 0`, `pnpm test` still green (or +6 from useScrollSpy).
- [ ] **`pnpm test:e2e` 51/51 green on `dev`** (warm run) — smoke now asserts `A tent of meeting` / `1 Commonwealth Drive` / `A Sacred Hearts parish since 1965`, Give has no UEN, Find Us shows `Commonwealth EW20`, etc.
- [ ] `pnpm test:e2e` suite still asserts 9 specs (no spec added/removed) — all `getByRole`/`getByText` queries updated to BSC strings as above.

---

## 3. F3 — Full-Gate Re-Green + Built-Artifact E2E + Docs Re-Pin

### 3.1 Goal

Prove the whole product ships byte-identical to `dist/` and that every doc reflects that proof.

### 3.2 Queue

| # | Task | How to verify | Commit |
|---|---|---|---|
| 3.1 | `pnpm lint 0` — eslint flat `--max-warnings 0` (already green) | `pnpm lint` | no commit — just gate |
| 3.2 | `pnpm typecheck 0` — `tsc --noEmit` (already green; after F1+F2 still green — `noUnusedLocals/Params` will catch any unused `ids` etc.) | `pnpm typecheck` | no commit — just gate |
| 3.3 | `pnpm test` — full unit suite green (post-F1 count + F2 scrollspy) | `pnpm test` → `30–36 files / ~180–215 tests` (pin exact) | no commit — just gate |
| 3.4 | `pnpm test:e2e` — 51/51 green on `dev` (`vite --port 5173`) | `pnpm test:e2e` | no commit — just gate |
| 3.5 | `pnpm test:e2e:built` — 51/51 green on the **built artifact** (`vite preview :4173` serving `dist/`; then optionally `E2E_BASE_URL=https://<live host> pnpm test:e2e:built` if a live host is configured — singlefile `img-src 'self' data: blob:` no longer diverges) | `pnpm test:e2e:built` | no commit — just gate |
| 3.6 | `pnpm build` — `dist/index.html` size + `_headers` + `images/8` | `pnpm build && ls -lh dist/index.html dist/_headers dist/images` | no commit — artifact |
| 3.7 | Docs re-pin (if any of the above changed the pinned numbers) | Grep-sweep for stale copies: `rg -n "390\.74|35 files|202 tests|51 tests" AGENTS.md CLAUDE.md README.md blessed-*-SKILL.md` → update `Volatile Facts Register` + every reference in the same docs-only commit. This is the fossil-sweep protocol (App G.4): change count in §0 first, then `rg` every doc for stale copies, then fix all in one commit. | `docs: re-pin 39/~/202 + 51 + 390.xxkB green (F1→F3)` |
| 3.8 | Gate ledger appendix (optional) — short `docs/gate-2026-09-03.md` / `docs/validation-src-vs-src.orig-2026-09-03.md` capturing BSC's adoption ledger (§1.3 of the BSC sync plan: 10/13 contracts kept, 2 improved, 1 polish lost + 2 absent) and the before/after `pnpm test` counts | file presence | — |

### 3.3 Success criteria (F3 done when all pass)

- [ ] `pnpm lint 0`, `pnpm typecheck 0`, `pnpm test 30–36/~\d+`, `pnpm test:e2e 51/51`, `pnpm test:e2e:built 51/51`, `pnpm build` (size pinned) — **five plus one green** (the sixth built-artifact pass is outside the canonical five but required for ship).
- [ ] No doc claims a stale count (single sweep: §0 + AGENTS + CLAUDE + README + canonical SKILL agree).
- [ ] `git log --oneline` shows at most: `F1: …`, `F2A: useScrollSpy`, `F2B: e2e BSC`, `F3: re-pin` — each commit already verified TDD-style before it landed.

---

## 4. Execution Protocol (all three follow-ups)

- **Surgical diffs** — touch only what the queue says; match existing style (`className` via `cn()`, `lucide-react` icons, `hashRouter` links as `<Link to="/path#id">`, never bare `#id`).
- **Library discipline** — use `@testing-library/react` + `vitest` + `playwright` primitives already in `package.json`; don't add new test libs.
- **Type safety** — `strict` + `noUnusedLocals/Params` stays on; `any` is banned.
- **One commit per queue entry** (A1, B1…, C1…, 2A1…, 2B-spec…) — commit message `test: add … — BSC fixtures`, `fix(e2e): …`, `feat(hooks): restore useScrollSpy` — then squash only if the approver requests it.
- **No code branching** — all commits to `main`; `dist/` never committed.
- **No push until VALIDATE** — the VALIDATE checkpoint (this doc) is the gate; after that each follow-up pushes only after its own five-gate check passes.

### Tooling already installed (verify before F1)

```bash
pnpm lint               # eslint 9.39.5 flat — expect clean
pnpm typecheck          # tsc --noEmit — expect clean
pnpm build              # 390.74 kB → dist/index.html + _headers + images/8
pnpm test               # currently 0 — F1 makes it green
pnpm test:e2e           # currently stale 51 — F2 makes it green
pnpm test:e2e:built     # F3: same 51 vs vite preview
```

---

## 5. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| `src/utils/monogram.test.ts` BSC case assumes `Fr Johan…` → `JW` but real helper returns `JJ` (hyphen/SS.CC split bug) | Medium | H — blocks F1 | Mitigated: run the existing `src/utils/monogram.ts` (`HONORIFICS` includes `ss.cc`/`sscc`) against BSC priests before writing tests; adjust expected values from reality, not wish |
| `src/data/content.ts` `grounds[2]` id `rosary-garden` vs `parish-hall` ambiguity (BSC third is Damien Centre) | Medium | M — content test fails on `id` allowlist | Mitigated: read actual `src/data/content.ts` `grounds` ids before writing `expect(grounds.map(g=>g.id)).toEqual(...)` — use real ids, not Risen ids |
| `site.mass.sunday` length assumption 5 (Risen) vs BSC 6 — site test will fail if copy-pasted | High | H | Mitigated: queue B7 already records `sunday[6]` — any copy-paste without this adaption will fail locally before commit |
| No UEN / `free/ssvp/bulletin/cep` absent — site test that asserts them will fail | High | H | Mitigated: B7 documents absence explicitly (`expect(site.uen).toBeUndefined()` or `site.chequePayee` is `Blessed Sacrament Church`) |
| E2E hero string off-by-one (`A tent of meeting.` punctuation / capitalisation) | Medium | M — smoke fails | Mitigated: use case-insensitive `getByRole('heading', {name: /A tent of meeting/i})` and `getByText(/A Sacred Hearts parish since 1965/i)` as already in `Home.tsx` |
| `useScrollSpy` deep tie-break order regression (batched entries delivered in any order) | Low | M | Mitigated: restored hook keeps the audited document-order tie-break (`[...ids].reverse().find(...)`) + `src.orig` 6-test suite locks it |
| E2E footer drift (Risen expects `free/ssvp/bulletin/cep`, BSC has `whatsapp/sacredHearts`) | Medium | M | Mitigated: keep footer assertion agnostic (`Serve`/`Give` links + address) or update to BSC-specific `whatsapp`/`sacredHearts` |
| Doc fossil resurrection (old 35/202/51 counts re-enter via copy-paste of `src.orig` tests) | Medium | M | Mitigated: F3 step 3.7 runs `rg` fossil sweep (`390.74|35 files|202 tests`) and pins §0 first |

---

## 6. Effort & Sequencing

| Follow-up | Wall time | Parallelisable? | Commits |
|---|---|---|---|
| **F1** Queue A (harness) + B (pure) + C (DOM) | ~2–3 h | no — gates B→C | ~12 commits (A1 + B1–B8 + C1–C3) |
| **F2A** `useScrollSpy` restore + wiring | ~30 min | after F1 | 1 commit |
| **F2B** e2e retarget (9 specs) | ~1.5–2 h | after F2A | 1–2 commits (`fix(e2e): retarget smoke/navigation/give-faq` + `fix(e2e): retarget enhancements`) |
| **F3** full-gate + re-pin | ~30 min | after F1+F2 | 1 docs-only commit if counts changed |
| **Total** | **~4–6 h** | | **~16 commits** (squash optional) |

F1 must land before F2 — the same dev will verify `pnpm test` between them; F3 gates the lot.

---

## 7. VALIDATE — Explicit Confirmation Checkpoint

> **Nothing in F1→F3 is implemented until you approve this plan.**

### Decisions required (please pick before execution)

| # | Decision | Options | Preferred (default) |
|---|---|---|---|
| **E1** | **F1 breadth** | (A) Full port of every `src.orig` test (~35 files / ~202 tests BSC-adapted) — most coverage, most churn · (B) **Minimal BSC proofs only** (Queues A+B — ~8 files / ~50 tests: `setup + cn/massDay/monogram/deepLinks/nav/content/site` + `docs-contract/ci-workflow/head` if desired) — lowest churn, fastest gate · (C) **Queues A+B plus C1–C3** (~15–20 files / ~100 tests — the default in §1.3) | **(C)** — the 15–20-file slice that proves BSC fixtures without copying every round-7 visual test |
| **E2** | **F2 scrollspy** | (A) **Restore `useScrollSpy`** (2A) + wire `Ministries.tsx` — scrolled pills move with the reader · (B) Keep scrollspy absent (document hash-only pills) and do e2e retarget only | **(A)** — one file + 10 lines, fully tested |
| **E3** | **F2 e2e commit shape** | (A) **One commit** retargeting all 9 specs at once — atomic · (B) **Two commits** (`smoke/navigation/ministries/give-faq/deep-links` then `enhancements/round5/round7`) — easier to bisect | **(B)** |
| **E4** | **F3 live host** | (A) `pnpm test:e2e:built` vs `vite preview :4173` only (local) · (B) Also gate against live host `E2E_BASE_URL=https://…` if a host is available | **(A)** unless a host URL is supplied |

If you agree with the defaults, reply **“approved — defaults (F1=C, F2=A, F3=A)”** and F1 starts immediately, streaming commits sequentially.  
If you prefer alternates, reply with picks (e.g. `E1=B E2=B E3=A E4=A`) and the plan adjusts before execution.

### Success criteria (all three follow-ups done when)

- [ ] F1: `src/test/setup.ts` exists (IO + scroll stubs + matchMedia) + `pnpm test` 15–36 files / ~100–215 tests green on BSC fixtures (no Risen constants).
- [ ] F2: `src/hooks/useScrollSpy.ts` present (or documented absent), `pnpm test` still green, `pnpm test:e2e` **51/51 green on `dev`** (hero `A tent of meeting`, `1 Commonwealth Drive`, `Commonwealth EW20`, `Corpus Christi`, no UEN, etc.).
- [ ] F3: `pnpm lint 0 && pnpm typecheck 0 && pnpm test 0e && pnpm test:e2e 51 && pnpm build` + `pnpm test:e2e:built 51/51` all green; docs re-pinned in the same sweep; **no fossil regression** (`rg -n "91 Toa Payoh.*319193|T08CC4042G" AGENTS.md CLAUDE.md README.md blessed-*.md` = only in allowed warnings/appendices).

---

## Appendix — File reference (read before implementing)

```
src.orig/ (source of every port):
  src/orig/test/setup.ts                → src/test/setup.ts (A1)
  src/orig/utils/cn.test.ts             → src/utils/cn.test.ts (B1)
  src/orig/utils/massDay.test.ts        → src/utils/massDay.test.ts (B2)
  src/orig/utils/monogram.test.ts       → src/utils/monogram.test.ts (B3, +SS.CC cases)
  src/orig/utils/deepLinks.test.ts      → src/utils/deepLinks.test.ts (B4)
  src/orig/data/nav.test.ts             → src/data/nav.test.ts (B5)
  src/orig/data/content.test.ts         → src/data/content.test.ts (B6)
  src/orig/data/site.test.ts            → src/data/site.test.ts (B7, sunday 6, no UEN, BSC feast)
  src/orig/docs-contract.test.ts        → src/docs-contract.test.ts (B8)
  src/orig/ci-workflow.test.ts          → src/ci-workflow.test.ts
  src/orig/repo-hygiene.test.ts         → src/repo-hygiene.test.ts
  src/orig/head.test.ts                 → src/head.test.ts
  src/orig/security-headers.test.ts     → src/security-headers.test.ts
  src/orig/components/*                 → src/components/* (C2)
  src/orig/components/ui/*              → src/components/ui/* (C2)
  src/orig/hooks/useScrollProgress.test.ts → src/hooks/useScrollProgress.test.ts (C2)
  src/orig/hooks/useScrollSpy.test.tsx  → src/hooks/useScrollSpy.test.tsx (F2A)
  src/orig/hooks/useScrollSpy.ts        → src/hooks/useScrollSpy.ts (F2A)
  src/orig/pages/*                       → src/pages/* (C3)

e2e/ (retarget in F2B):
  e2e/smoke.spec.ts                      (11: hero He is risen→A tent of meeting, Toa Payoh→1 Commonwealth, 1971→1965)
  e2e/navigation.spec.ts                 (8: primaryNav descriptions + footer + aria-current)
  e2e/ministries.spec.ts                 (4: 6 ids, imageAlt)
  e2e/give-faq.spec.ts                   (4: 8 givingOptions, no UEN, FAQ accordion, Find Us)
  e2e/enhancements.spec.ts               (7: Sacred Motion)
  e2e/enhancements-round5.spec.ts        (6: chips, rail)
  e2e/enhancements-round7.spec.ts        (8: scrollspy, card-tint, sticky — update ppc count 7→6)
  e2e/deep-links.spec.ts                 (3: knownRoutePaths → hash)
  e2e/helpers.ts                         (helpers — keep)
  playwright.config.ts / playwright.built.config.ts (no change)
```
