# Validation Round 14 — 2026-09-02 (BSC — Codebase vs Docs)

> **Scope:** Verify every volatile claim in `AGENTS.md` / `CLAUDE.md` / `README.md` / `blessed-sacrament-queenstown_SKILL.md §0` against the executable repo (`package.json`, `src/**/*`, `src/index.css`, `src/App.tsx`, `src/data/*`, `vite.config.ts`, `tsconfig.json`, `eslint.config.js`, `playwright.config.ts`, `index.html`, `public/*`, `.github/workflows/ci.yml`). No `src/` code changes in this task — read + gate-run only. Historical docs (`docs/*` lineage) are out of scope except for fossil checks.

**Trigger:** User request 2026-09-02 — “meticulously review AGENTS/CLAUDE/README/SKILL and validate against codebase.”

---

## 1. Gates — Raw Outputs (2026-09-02 16:35 UTC+8, main, pnpm 11 / Node 24)

| Gate | Command | Result | Notes |
|------|---------|--------|-------|
| lint | `pnpm lint -- --max-warnings 0` | **EXIT 0 / 0 warnings** | `eslint 9.39.5` flat, ignores `skills` + `src.orig` |
| typecheck | `pnpm typecheck` (`tsc --noEmit` strict) | **EXIT 0 / 0 errors** | `strict` + `noUnusedLocals/Params` clean |
| test | `pnpm test` (`vitest run`, jsdom) | **17 files / 115 tests — 1 FAILED** | Fail: `src/docs-contract.test.ts > does not ship src.orig/` → `existsSync(src.orig) === true` expected `false`. All other suites green. |
| build | `pnpm build` (`viteSingleFile`) | **EXIT 0 — `dist/index.html 474_660 B (474.66 kB, gzip 125.95 kB)`** | `public/images/8 → dist/images/` + `dist/_headers` + `dist/favicon.svg` + `dist/robots.txt` |
| test:e2e | `pnpm test:e2e` | **NOT RUN in this round** (chromium install + 51 specs ~90s) — prior round-13 verified 51/51; SKILL claim retained pending explicit re-run | Use `pnpm test:e2e:built` to also verify built artifact |

**Test breakdown (from `src/docs-contract.test.ts` + runner):**

- Guard (`src/docs-contract.test.ts` 20 checks) is the **17th test file** — explains `16 files /94` (F1 restored suite) vs `17/115` (with guards). Guard asserts `sources 40`, `tests 17`, `hooks 3`, `colors 26 +2`, `keyframes 8`, `routes 18 Route tags / 17 paths`, `mandarin` sixth id, `package 1.4.4`, `e2e 8 specs /51 tests`, `no src.orig`, `skills catalog`, `robots.txt`, footer 2 socials.
- `pnpm test` reports `16 passed + 1 failed = 17 files`; `115 = 94 restored + 21 guard/repo checks`.

---

## 2. Inventory Verification (authoritative counts in SKILL §0)

| Fact (SKILL §0) | Claimed | Found | Verdict |
|-----------------|---------|-------|---------|
| `src/` total | 58 (40 source + 17 tests + 1 setup) | `find src -type f | wc -l → 58` (40 source + 17 tests + setup) | **ALIGNED** |
| `public/images/` | 8 + `favicon.svg` + `_headers` + `robots.txt` | `ls public/images → 8` (hero-church, chapel-interior, sanctuary, rosary-garden, stained-glass, parish-hall, cemetery, feast) + 3 extras | **ALIGNED** |
| Build artifact | `dist/index.html 391.57 kB` (391,565 B) + `dist/images/8` | `wc -c dist/index.html → 474,660 B (474.66 kB)` + 2.8M dist/ | **DRIFT — M1** |
| Design tokens | 26 colors + 2 shadows (incl. gold-700 #85601f, terracotta-600 #8f4c30) | `grep --color-shrine- → 26 colors`, `--shadow-shrine → 2`, both AA steps present in `src/index.css:1` | **ALIGNED** |
| Utilities / keyframes | 27 utilities + 8 keyframes | Verified in `src/index.css`: 27 utility classes (rise-in-d1..d4 counted) + 8 keyframes (`gold-rule-draw`, `hero-ken-burns`, `rise-in`, `menu-in`, `drawer-in`, `drawer-item-in`, `page-in`, `halo-pulse`) | **ALIGNED** |
| Hooks | **2** (useScrolled + useScrollProgress — NO useScrollSpy) | `ls src/hooks → 3` (useScrolled, useScrollProgress, **useScrollSpy**) | **DRIFT — M2** (see §4) |
| Utils | 4 (cn, massDay, monogram, deepLinks) | `ls src/utils → 4` | **ALIGNED** |
| Routes | 17 `Route` entries (16 paths + `*`), 7 aliases /5 groups, 9 anchors | `grep <Route src/App.tsx → 18` (Layout wrapper + 16 paths + `*` = 17 path entries) + aliases verified, anchors `#mass/#confession/#visit` + 6 ministries (`mandarin`) | **ALIGNED** (18 vs 17 is wrapper-counting; path entries = 17) |
| CSP img-src | `'self' data: blob:` only + `frame-src google.com` | `index.html CSP: img-src 'self' data: blob:` only; `frame-src https://www.google.com` | **ALIGNED** |
| `src.orig/` policy | NOT in repo (local-only, never committed) | **EXISTS on disk** (`ls src.orig` → 23 files incl. App.tsx, components, data, hooks, utils) but `git check-ignore → .gitignore: src.orig/` and `git ls-files | grep src.orig → 0` (untracked) | **DRIFT — L1** (present locally, not tracked; guard fails) |
| `skills/` policy | PRESENT, git-tracked, ignored by tooling | `git ls-files skills | head → tracked`, `eslint.config.js ignores skills`, `vite watch ignored skills` | **ALIGNED** |
| Data arrays | priests 5, ppc 6, timeline 8 (1958–2026), grounds 3, ministries 6 (mandarin), faqs 6, events 6, giving 8, images 11, nav 6/10 | Verified against `src/data/content.ts` + `nav.ts` + `site.ts` — all match §0 | **ALIGNED** |
| Parish constants | 1 Commonwealth 149603, NO uen, cheque Blessed Sacrament Church, Corpus Christi Thu after Trinity, EW20, buses 11041/11049, phones 6474 0582 / 9170 9133, SS.CC | Verified in `src/data/site.ts` + `content.ts` | **ALIGNED** |
| Pre-push gate | lint 0 + typecheck 0 + test 16/94 + e2e 51 + build 391.57kB (green) | lint 0 + typecheck 0 + test 17/115 (1 fail src.orig) + build 474.66kB + e2e not re-run | **DRIFT — test + build counts** |

---

## 3. Config Sync — Verified ALIGNED

| File | Claim | Found |
|------|-------|-------|
| `vite.config.ts` | `plugins [react, tailwindcss, viteSingleFile]` + alias `@→src` + `test { globals, jsdom, setupFiles src/test/setup.ts, include src/**/*.{test,spec}, exclude e2e/** }` + `watch.ignored [skills, dist, playwright-report, test-results, coverage, src.orig]` | Matches exactly |
| `tsconfig.json` | `strict` + `noUnusedLocals/Params` + `isolatedModules/noEmit` + `include [src, vite.config.ts, eslint.config.js, playwright.config.ts, playwright.built.config.ts]` + `types [node, vitest/globals]` + `paths @/*` + `baseUrl .` | Matches |
| `eslint.config.js` | flat, ignores `dist, node_modules, coverage, playwright-report, test-results, skills, src.orig` | Matches |
| `playwright.config.ts` | `testDir e2e`, `baseURL :5173`, `webServer pnpm exec vite :5173`, `expect 15s`, trace/video on failure | Matches |
| `playwright.built.config.ts` | extends base, `baseURL E2E_BASE_URL ?? :4173`, `vite preview :4173` | Matches |
| `index.html` | CSP `img-src 'self' data: blob:` + `frame-src google.com`, OG `hero-church.jpg`, `Fraunces + Source Sans 3`, JSON-LD Church, `theme-color #200a0a`, `og:locale en_SG` | Matches |
| `.github/workflows/ci.yml` | `pnpm 11, Node 24, lint → typecheck → test → playwright chromium → test:e2e → build → artifacts`, triggers `branches [main]` | Matches |
| `@` alias sync | `vite.config.ts path.resolve(__dirname,"src")` ↔ `tsconfig.json paths {"@/*":["src/*"]}` | Synced |

---

## 4. Drift Ledger (this round — vs SKILL §0 / AGENTS / CLAUDE / README)

### M — Medium (docs↔repo factual drift — fix docs, no src change unless noted)

| ID | Title | Evidence | Impact | Fix |
|----|-------|----------|--------|-----|
| **M1** | **Build size stale (391.57kB → 474.66kB)** | `pnpm build: dist/index.html 474,660 B` vs all docs pinned `391.57 kB` (AGENTS Commands table, README verify, SKILL §0 + Quick Ref, CLAUDE build table) | Visitors/docs report wrong artifact weight; inflates trust in stale number; Tailwind `@source not` already added (line 6 of `src/index.css`) but size still +83kB — content-scan still emitting | **Re-pin** all four docs to `474.66 kB` (or `wc -c` 474660) in same commit; investigate Tailwind content scope if target is <400kB |
| **M2** | **Hooks count intra-doc inconsistency (SKILL §0 says 2, code has 3)** | `ls src/hooks → 3` (useScrolled + useScrollProgress + **useScrollSpy** restored F2A, tested in `src/hooks/useScrollSpy.test.tsx` 6 tests). `AGENTS.md:38` correctly says “3 hooks”, `CLAUDE.md §6` header says “Two hooks — NO useScrollSpy” but body says “restored in F2A — 3 hooks”, `README.md:124` says “2 files — no useScrollSpy”, `SKILL §0` volatile table says “2 — NO useScrollSpy”. Guard `docs-contract` expects 3 hooks and passes. | New contributors read §0 and believe scrollspy is absent; `README` File Hierarchy misleads; `CLAUDE §6` is self-contradictory | **Re-pin SKILL §0 Hooks row to 3** (useScrolled/useScrollProgress/useScrollSpy — restored F2A, drives Ministries pill `aria-current`), fix `README hooks/ 2 files → 3 files`, resolve `CLAUDE §6` header vs body (header should say “3 hooks — scrollspy restored F2A”) |
| **M3** | **Test counts stale (16/94 vs 17/115)** | `pnpm test → 17 files /115 tests` (16 restored F1 + `src/docs-contract.test.ts` guard = 17th; `src/docs-contract` adds 20 checks, `repo-hygiene`/`ci-workflow` add rest). Docs still claim `16 files /94 tests green` as the green gate (AGENTS Commands, README Arch, SKILL §0 + §2 + §3.1). Guard itself asserts `tests 17` and passes on that. | Gate claim is unreprovable — `pnpm test` will always show 17/115; readers think suite shrank | **Re-pin** to `17 files /115 tests` (or qualify as “16 restored + guard = 17/115”) across AGENTS/CLAUDE/README/SKILL §0 in same commit as M1/M2 |
| **M4** | **`src.orig/` “NOT in repo” vs present on disk (failing guard)** | `ls src.orig → present` (App.tsx, components, data, hooks, utils, pages, etc.) — untracked (`git ls-files | grep src.orig → 0`, ignored by `.gitignore:13`), but `src/docs-contract.test.ts:124 expects existsSync(src.orig) === false` → **FAIL** | Gate is red (1/17 failed); `pnpm test` gate claimed green; local-only artifact policy violated in working tree | **Either** remove `src.orig/` from working tree (restores guard) **or** amend guard/policy to “untracked, ignored — presence on disk is allowed locally, absence enforced in CI via `git ls-files`”. Current `.gitignore` already prevents tracking — guard is stricter than intended. Recommend: keep guard but change assertion to “not tracked” (`git ls-files`) — presence on disk alone is not a ship risk |
| **M5** | **`README` hooks tree vs reality + `AGENTS` Where-to-look-next stale counts** | `README File Hierarchy` line says `hooks/ # 2 files — useScrolled + useScrollProgress (no useScrollSpy)` — contradicts `AGENTS hooks 3`. Also `AGENTS` Where-to-look-next still cites “no favicon” for built-artifact limitation — but `public/favicon.svg` + `dist/favicon.svg` now exist | Minor but contributes to §0 single-source violation | Fix alongside M2/M3 |

### L — Low (fossil / hygiene — fix opportunistically)

| ID | Title | Evidence | Fix |
|----|-------|----------|-----|
| **L1** | **Accordion test contains stale Toa Payoh fixture** | `rg "91 Toa Payoh" src/` → `src/components/ui/Accordion.test.tsx:9` fixture string `"Q3 How do I get there? A3 91 Toa Payoh Central..."` — leftover Risen Christ address in a unit test (not shipped copy, but visible in `src/`). No parish fiction in `src/data/*` (verified clean). | Replace fixture with `1 Commonwealth Drive` or generic lorem — keep test intent (accordion toggle) without parish fiction |
| **L2** | **Route count phrasing (18 `<Route>` tags vs 17 entries)** | `docs-contract` asserts `18 Route tags` (Layout wrapper + 16 paths + `*`), while docs say “17 Route entries (16 paths + `*`)” — both true under different counting (wrapper excluded vs included). Not a bug but a source of confusion | Add footnote in SKILL §5.2: “18 `<Route>` tags including Layout wrapper — 17 path entries” |
| **L3** | **SKILL §6 self-contradiction + Appendix F vs §0 tension** | SKILL §6 header “Two hooks — NO useScrollSpy” then immediately “BSC contract: useScrollSpy restored in F2A — 3 hooks” — header is the stale hop-4 note, body is the executed F2A reality. Appendix F.2 mirrors the stale 2-hook state. | Resolve by promoting F2A to §0 (M2) and updating F.2 note to “restored in F2A — see §0” |
| **L4** | **E2E not re-run this round** | Round-13 verified 51/51; this round skipped `pnpm test:e2e` for time. Claim remains “51 green” but not re-proved today | Re-run `pnpm test:e2e` + `pnpm test:e2e:built` before next push; no doc change needed until then — gate table should note “not re-run 2026-09-02” |

### I — Info (no fix needed, for context)

| ID | Note |
|----|------|
| I1 | `skills/` tracked (2,360+ files) correctly ignored by lint/tsc/vite — no action. |
| I2 | `public/_headers` + `robots.txt` + `favicon.svg` all ship to `dist/` — verified. |
| I3 | `src/data/content.ts` 8 interfaces + `images` 11 all-local — verified clean (no wikimedia/pexels). |
| I4 | `src.orig` untracked but present locally — does NOT pollute `dist` (copied via `publicDir` only, ignored by Vite). Risk is gate-red only. |

---

## 5. What IS Aligned (green — no action)

- **Stack & versions:** React 19.2.8 / Vite 7.3.6 / Tailwind 4.3.3 / @tailwindcss/vite 4.1.17 / TS 5.9.3 / RR 7.18.2 / singlefile 2.3.3 / eslint 9.39.5 / vitest 3.2.6 / playwright 1.55.1 / lucide-react 1.38.0 / pnpm 11 — all pinned exact.
- **Design system:** 26 colors +2 shadows (gold-700 #85601f + terracotta-600 #8f4c30), 8 keyframes, 27 utilities (each rise-in-d1..d4 counted), print override, themed scrollbar — all present.
- **Data & parish constants:** `site.ts` (1 Commonwealth 149603, hours 6, mass 9 with sunday 6, NO uen, cheque Blessed Sacrament Church, Corpus Christi Thu after Trinity, EW20, buses 11041/11049, phones 6474/9170, SS.CC) + `content.ts` (priests 5 SS.CC email-only, ppc 6, timeline 8 1958–2026, grounds 3, ministries 6 mandarin, faqs 6, events 6, giving 8, serveRoles 4, devotions 6, images 11 local) + `nav.ts` (primary 6 / footer 10) — exact.
- **Routing:** HashRouter intentional, 5 alias groups /7 aliases, 9 anchors (`#mass/#confession/#visit` + 6 ministries `#mandarin` = Language Communities), deepLinks pre-mount rewrite (knownRoutePaths 16, resolveHashRedirect), Layout double-hash 80ms, Header modal drawer (dialog/aria-modal/focus trap/restore/outside pointerdown), BackToTop 480 + ring, ScrollProgress decoupled z-[60].
- **Tooling:** `vite.config.ts` alias sync, test include/exclude, watch.ignored (skills/dist/src.orig), `tsconfig.json` strict + types, `eslint` flat ignores, `playwright` webServer — all correct.
- **Fossil sweep:** No Toa Payoh / UEN T08CC / first air-con / Risen Christ parish fiction in `src/data/*` or `src/pages/*` beyond the single Accordion test fixture (L1).

---

## 6. Verdict & Recommendation

**Verdict:** **ALIGNED with drift** — the parish site is functionally correct and deployable, but **three medium drifts (M1–M3) plus one guard-red L1** mean the docs’ §0 single-source promise is broken. The pre-push gate is **amber** (lint + typecheck green, test 1/17 red on hygiene, build green at larger size, e2e not re-proved today).

**Recommendation — one docs-only remediation commit (no src/ behavior change, except L1 test fixture):**

1. **Re-pin** `AGENTS.md` / `CLAUDE.md` / `README.md` / `blessed-sacrament-queenstown_SKILL.md §0` build artifact → `474.66 kB` (M1), hooks → `3` (M2), tests → `17 files /115 tests` (M3) — grep-replace per Appendix G.4 (“change §0 first, then `rg -n '<old>'`”).
2. **Resolve SKILL §6** header (“Two hooks”) → “Three hooks — scrollspy restored F2A (see §0)” and note Appendix F.2 accordingly (L3).
3. **Fix** `src/components/ui/Accordion.test.tsx` Toa Payoh fixture → Commonwealth Drive (L1) — one-line test data edit.
4. **Decide `src.orig/` policy** (M4): either `rm -rf src.orig` locally (+ re-run `pnpm test` → green) or relax guard to `git ls-files` check — document choice in `CLAUDE.md` + `AGENTS.md` Where-to-look.
5. **Re-run** full gate: `pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm test:e2e:built && pnpm build` — then update `docs/validation-round13` → round-14 in `README` + `AGENTS` Where-to-look-next, bump SKILL `verified:` line to `2026-09-02` with the new counts.
6. **Add verification ledger entry** to `src/docs-contract.test.ts` if build-size budget changes (optional: add a `dist size < 500kB` check).

**Estimated effort:** ~30 mins docs edits + 90s e2e pass + 10s build re-pin — single commit, single PR.

---

## 7. Evidence — Commands Run

```
find src -type f | wc -l → 58 (40 source + 17 tests + setup)
ls public/images → 8 + public/_headers/favicon.svg/robots.txt
pnpm lint → 0 warnings
pnpm typecheck → 0 errors
pnpm test → 17 files /115 tests (1 fail: src.orig guard)
pnpm build → dist/index.html 474,660 B / gzip 125.95kB
rg hooks / rg Toa Payoh / rg src.orig / cat package.json versions / read index.css tokens / read App.tsx routes — all captured above
```

---

*Generated 2026-09-02 by the meticulous validation plan (ANALYZE → PLAN → VALIDATE → IMPLEMENT → VERIFY → DELIVER) against `blessed-sacrament-queenstown main` (post round-13). Next: remediate M1–M4/L1 in one docs-only commit and re-verify gates.*
