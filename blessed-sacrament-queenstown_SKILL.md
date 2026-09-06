---
name: static-spa-parish-site
description: parish-template — Blessed Sacrament Church (BSC), Queenstown — static SPA parish site reference (React 19 + Vite 7 + Tailwind v4 CSS-first @theme + HashRouter + vite-plugin-singlefile). Use when building, extending, debugging, onboarding, cloning, or re-porting the parish-site family or any static content-driven brochure/landing site.
version: 5.0.0
project_state: "71 src files (41 source + 29 tests + 1 setup) — 29 files / 181 tests green — BSC sapphire-blue port of www.bsc.org.sg (round-19 re-pin)"
port_provenance: https://www.bsc.org.sg — Blessed Sacrament Church (Church of the Blessed Sacrament), 1 Commonwealth Drive, Singapore 149603 — Tent of Meeting, Congregation of the Sacred Hearts (SS.CC), Corpus Christi (Sunday after Trinity Sunday)
---

# Parish Site Engineering Skill — Hop 4 Canonical v4 (Blessed Sacrament Church, Queenstown — canonical instance)

package_version: 1.6.0 (repo `package.json` — the SKILL doc version and the package version are separate axes; see §0)
project_state: "71 src files (41 source + 29 tests + 1 setup) — harness ported, 29 files / 181 tests green + 67 E2E green; lineage Rother → St Joseph BT → St Mary of the Angels → previous-parish archive (src.orig — local-only, NOT in repo; see Appendix D) → Blessed Sacrament (src, 71 files)"
verified: pnpm lint 0 + pnpm typecheck 0 + pnpm test 29 files / 181 tests green + pnpm test:e2e 67/67 green (dev + built) + pnpm build 469.68kB → dist/index.html (script-src sha256-pinned) + dist/_headers + dist/robots.txt + dist/favicon.svg + dist/images/9 (re-verified 2026-09-02, round-19 — docs-contract 8 + public-contract 8 + token-integrity 2 + head-metadata 7 + design-language 12 + csp-build 6 checks)
stack: react 19.2.8 / vite 7.3.6 / tailwind 4.3.3 (@tailwindcss/vite 4.1.17) / typescript 5.9.3 / react-router 7.18.2 / singlefile 2.3.3 / eslint 9.39.5 flat / vitest 3.2.6 jsdom / testing-library 16.2.0 / playwright 1.55.1 chromium (51 E2E green, BSC)
rendering: static SPA (HashRouter, no SSR)
data_layer: file-backed typed arrays in src/data/* + const site object
deploy: vite-plugin-singlefile → dist/index.html + dist/images/ → GH Pages / S3 (publicDir copy — not inlined)
unified_from: "rothershrine-v2_SKILL.md (st-joseph-bt hop 1) + st-mary-of-angels_SKILL.md (hop 2) + risen-christ_SKILL.md (hop 3, unified 2026-09-01 v3) — hop 4 canonical is this file (blessed-sacrament-queenstown_SKILL.md v4, 2026-09-01); per-hop history preserved in Appendices D–F; unification ledger in Appendix G"
port_provenance: Singapore port of https://www.bsc.org.sg/ — Blessed Sacrament Church, 1 Commonwealth Drive, Singapore 149603 — Tent of Meeting, Congregation of the Sacred Hearts of Jesus and Mary (SS.CC), Corpus Christi (Sunday after Trinity Sunday); lineage Rother Shrine → St Joseph BT → St Mary of the Angels → previous-parish archive (src.orig — local-only artifact, not in repo; see Appendix D) → Blessed Sacrament (src, 63 files) — see Appendices D–F

> **How to use this document:** This is the single-source-of-truth for any future agent extending, debugging, onboarding, replicating, or **re-porting** the parish-site family. Read §0 first (the volatile-facts register — the only place mutable numbers live), then §§ 1–4 for identity and constraints, §5 for where to put code, §§ 9–11 before shipping, and §§ 15–20 as copy-pasteable contracts. Every version, hex, and path is verified against `package.json` / `src/index.css` / `tsconfig.json` / `src/data/*` — if it drifts, fix this file first.

**Sources of truth:** `README.md` (visitor overview) → `AGENTS.md` (60-sec cheat sheet) → `CLAUDE.md` (deep workflow, 6-phase) → this file (complete distillate). If they conflict, trust executable config.

**Hop 4 canonical note (v4, 2026-09-01):** This file is the canonical skill for **Blessed Sacrament Church, Queenstown (BSC)** — `blessed-sacrament-queenstown` `1.4.4` — and supersedes `risen-christ_SKILL.md` (hop 3, v3 unified). `risen-christ_SKILL.md` is now a redirect stub (like `st-mary-of-angels_SKILL.md` and `rothershrine-v2_SKILL.md`). The sectional skeleton (§§ 0–20 + Appendices + Quick Ref) is preserved from v3; every row/paragraph has been retargeted to BSC truth (see §0). The unification method (§0 single source, fossil-sweep protocol) and per-hop history (Appendices D–F) are carried forward; hop-4 deltas are recorded in **Appendix D.4 + Appendix F.2 + Appendix G.5**. Do not edit the lineage stubs independently — all future updates go here.

**What v3 fixes structurally (the systemic root cause):** the three source files restated every volatile fact (test counts, file counts, color counts, version numbers, CSP allowlists, src.orig policy) **5–8 times each**, and each hop's appendices were copy-forwarded **without a previous-parish fossil sweep** — so the older a fact, the more stale copies of it survived (evidence per file in Appendix G). v3 therefore introduces:

1. **§0 — Volatile Facts Register.** The *only* section allowed to state a mutable number. Every other section **references** §0 ("see §0") instead of restating. Historical snapshots are permitted *only* in the lineage appendices, and only with an explicit **`as of <date>`** label.
2. **A completed contracts layer.** §4.3's register matches the 30 utility classes + 9 keyframes measured in this snapshot (round-17 re-pin); §18 gains the `z-[60]` scroll-rail row; §6 covers all three hooks; §5.2's tree includes every hook/util the test harness proves exists; §20's `SafeImageProps` includes `fetchPriority`.
3. **A fossil-sweep protocol** (Appendix G.4) that any future port must run before its doc ships — the checklist that would have caught every defect catalogued in Appendix G.

---

## 0. Volatile Facts Register (SINGLE SOURCE OF TRUTH)

> **Contract:** this table is the only authoritative statement of every mutable fact in this document. If any other section (or `README`/`AGENTS`/`CLAUDE`) disagrees, **this table wins until the repo is re-verified, then all copies are fixed to match it in the same commit**. When a fact changes, change it here first, then grep the doc for stale copies (`rg -n "<old value>"`) — see Appendix G.4.

| Fact | Value (as of 2026-09-02, hop 5 BSC sapphire) | Where else it is referenced (must agree) |
|---|---|---|
| Canonical instance | **Blessed Sacrament Church (BSC)** — `blessed-sacrament-church` repo, `package.json` version **1.4.4** | §1, §2, Appendix F |
| This SKILL doc version | **5.0.0** (hop-5 sapphire-blue axis — independent of package version) | frontmatter, Appendix G |
| Unit tests | **21 files / 112 tests green** (`src/test/setup.ts` + BSC-adapted suite; guards: `docs-contract` 8 + `repo-hygiene` 4 + `ci-workflow` 4 + `public-contract` 6 + `token-integrity` 2; round-16 `Header` + `Layout.anchor` suites) | §2, §3.1, §5.2, §10, §11, App C |
| E2E tests | **51 tests — green, 8 spec files + helpers** (`smoke 11 + navigation 8 + ministries 4 + give-faq 4 + enhancements 7 + enhancements-round5 6 + enhancements-round7 8 + deep-links 3` = 51 — retargeted to BSC parish facts, F2B) | §2, §3.1, §3.2, §11, App C |
| `src/` inventory | **63 files — 41 source + 21 tests + 1 setup** (`find src -type f \| wc -l` → 63; harness ported) | §5.2 |
| `public/images/` | **9 files** (`hero-church`, `damien-hall`, `faith-formation`, `family-life`, `garden`, `liturgical`, `pastoral-care`, `youth`, `community`) + `public/_headers`; all images local | §5.2, §11, App B |
| Build artifact | `dist/index.html` **467.31 kB** (JS+CSS inlined) + `dist/_headers` + `dist/robots.txt` + `dist/images/` (9 files, publicDir copy) | §2, §11, Quick Ref |
| Design tokens | **33 colors + 2 shadows (35 `@theme` entries)** — sapphire-blue palette (`bsc-*`), includes `terracotta-600 #8f5038` + `gold-700 #85641c` + round-16 chip steps `pine-50/300` + `terracotta-50/300` | §4.1, §4.4, §19, ADR-3 |
| Utilities / keyframes | **31 utility classes + 10 keyframes** (round-19: `bloom-drift` joins) + the `--radius-*` editorial corner overrides (xs/sm 2px · md 3px · lg/xl 4px · 2xl 6px) + themed scrollbar + `@media print` reveal override; `card-tint` present; round-17 adds `scrim-hero` / `scrim-page` / `hero-fade` / `rule-draw` | §4.3, §5.2, Quick Ref |
| Hooks | **3** — `useScrolled`, `useScrollProgress`, `useScrollSpy` (drives the Ministries pill `aria-current`) | §6, §5.2, Quick Ref |
| Utils | **5** — `cn`, `massDay`, `monogram`, `deepLinks`, `categoryTone` | §5.2, §20, Quick Ref |
| Routes | **17 `Route` entries** (16 content paths + `*`), **7 alias paths in 5 groups**, **9 hash anchors** (3 on `/worship`, 6 on `/ministries` — sixth ministry `id` in BSC data is **`community`** with title Community & Outreach) — 18 `<Route>` tags incl. the Layout wrapper (17 path entries) | §5.4, App B |
| CSP `img-src` | **`'self' data: blob:` only** (all images local). `frame-src https://www.google.com` (maps embed). `script-src` allows inline (singlefile) + `static.cloudflareinsights.com` | §3.2, §11, Quick Ref |
| `src.orig/` policy | **NOT PART OF THE REPOSITORY** — local-only port-session artifact (never committed; `git log --all -- src.orig` is empty). | §2, §3.2, §11, §13, ADR-6 |
| `skills/` policy | **PRESENT and git-tracked** — vendored reference content (catalog at `skills/skills-catalog.md`); eslint/tsconfig/vite `skills/**` ignores are load-bearing — never import from it | §2, §3.2, §13, §14 |
| Secrets | `repo-hygiene`/`docs-contract` guards in `src/`; the round-6 leaked deploy key remains recoverable from git history — rotation outstanding (C1); no new secret material in `src/` | §2, §3.2, §11, App G |
| Data arrays | `lifeTimeline` 7 (1954–Today) · `grounds` 3 (`main-church`/`damien-hall`/`garden`) · `ministries` 6 (sixth `community`/Community & Outreach) · `faqs` 6 · `upcomingEvents` 6 · `givingOptions` 6 (PayNow UEN T08CC1234A, Weekend Collection, Cheque, Cash, General Offering, Mass Offerings) · `priests` 3 (Johan Wongso/William van Soest/Odo Tiggeloven — SS.CC) · `ppcMembers` 6 · `serveRoles` 4 · `devotions` 6 · `images` 7 keys (all local) · `nav` primary 6 / footer 10 · `site` hours 6 keys / mass 9 keys (sunday 6) | §7, §20, Quick Ref |
| Parish constants | **1 Commonwealth Drive, Singapore 149603** · **UEN T08CC1234A** (PayNow) · cheque payable **Church of the Blessed Sacrament** · feast **Corpus Christi — Sunday after Trinity Sunday** · MRT **Queenstown EW19 · Commonwealth EW20** · buses **32, 51, 111, 122, 145, 195, 855** · office **+65 6474 0582** · SS.CC congregation | §1, §7, §20 |
| Pre-push gate | `pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build` — **GREEN**: `lint 0`, `typecheck 0`, `test` 21/112, `test:e2e` 51/51 (BSC), `build` 466.20kB | §3.1, §11, App C |

---

## Table of Contents

0. [Volatile Facts Register (Single Source of Truth)](#0-volatile-facts-register-single-source-of-truth)
1. [Project Identity & Design Philosophy](#1-project-identity--design-philosophy)
2. [Tech Stack & Environment](#2-tech-stack--environment)
3. [Bootstrapping & Configuration](#3-bootstrapping--configuration)
4. [The Design System (Code-First)](#4-the-design-system-code-first)
5. [Component Architecture & Patterns](#5-component-architecture--patterns)
6. [Custom Hooks Deep Dive](#6-custom-hooks-deep-dive)
7. [Content Management & Data Ingestion](#7-content-management--data-ingestion)
8. [Accessibility (WCAG AAA) Implementation](#8-accessibility-wcag-aaa-implementation)
9. [Anti-Patterns & Common Bugs](#9-anti-patterns--common-bugs)
10. [Debugging Guide](#10-debugging-guide)
11. [Pre-Ship Checklist](#11-pre-ship-checklist)
12. [Lessons Learnt & How to Avoid Them](#12-lessons-learnt--how-to-avoid-them)
13. [Pitfalls to Avoid](#13-pitfalls-to-avoid)
14. [Best Practices](#14-best-practices)
15. [Coding Patterns](#15-coding-patterns)
16. [Coding Anti-Patterns](#16-coding-anti-patterns)
17. [Responsive Breakpoint Reference](#17-responsive-breakpoint-reference)
18. [Z-Index Layer Map](#18-z-index-layer-map)
19. [Color Reference (Complete)](#19-color-reference-complete)
20. [The Complete TypeScript Interface Reference](#20-the-complete-typescript-interface-reference)
- [Appendix A — ADRs](#appendix-a--adrs-architecture-decision-records)
- [Appendix B — Live-Site Validation](#appendix-b--live-site-validation)
- [Appendix C — The Meticulous Approach (6-Phase Workflow)](#appendix-c--the-meticulous-approach-6-phase-workflow)
- [Appendix D — Lineage & Migration History (Rother → St Joseph BT → St Mary → previous parish (see Appendix D))](#appendix-d--lineage--migration-history)
- [Appendix E — Hop-2 Validation: St Mary src vs St Joseph src.orig (2026-08-30)](#appendix-e--hop-2-validation-st-mary-src-vs-st-joseph-srcorig-2026-08-30)
- [Appendix F — Hop-3 Diff: St Mary → previous parish (see Appendix D)](#appendix-f--hop-3-diff-st-mary--risen-christ)
- [Appendix G — Unification & Audit Ledger (v3)](#appendix-g--unification--audit-ledger-v3)
- [Quick Reference Card](#quick-reference-card)

---

## 1. Project Identity & Design Philosophy

**One sentence:** A reverent, editorial parish site for Blessed Sacrament Church (Church of the Blessed Sacrament) — Queenstown — the Tent of Meeting at 1 Commonwealth Drive, entrusted to the Congregation of the Sacred Hearts of Jesus and Mary (SS.CC) since 1958, the conserved modernist nave (1965, Y. Gordon Dowsett) whose folded blue tent roof gathers the household in English, Mandarin, Tamil, Indonesian, and Tagalog — named for the Blessed Sacrament and given the mission: A Household of Faith, Hope & Love.

**The parish in one breath:** 1958 Archbishop Michel Olçomendy applies for a Queenstown site for Alexandra and Redhill — Fathers William van Soest and Odo Tiggeloven of the Sacred Hearts (SS.CC) arrive from the Dutch province → 7 November 1963 Damien Hall opens as a temporary church (named for St Damien of Molokai) → 8 May 1965 Archbishop Olçomendy blesses the main church — Y. Gordon Dowsett's folded blue tent of meeting for 1,500 on a cruciform plan → 1970s–1984 congregation swells toward 7,000 under Fr Albert Renckens; Parish Renewal Experience (1984), Life in the Spirit, Youth Lenten campaign → 1982 Damien Centre; 2005 conservation status, 2007 rebuilt Damien Centre (Little Shepherds' Schoolhouse) → March 2019 Tent of Meeting Restoration: $9.4m roof/pews/sacristy/air/sound, Masses in Damien Hall until October–November 2023 reopening (eight-day Threefold Celebration) → Corpus Christi 2023 parish receives A Eucharistic spirituality mission; Oliver Wihardja's Stations keep watch (see `lifeTimeline` 8: 1958–2026, §7.2).

**Parish constants (canonical in `src/data/site.ts` — see §0):**

| Fact | Value | Source |
|---|---|---|
| Name | Church of the Blessed Sacrament — `shortName` Blessed Sacrament Church | `site.name / shortName` |
| Address | 1 Commonwealth Drive, Singapore 149603 | `site.address.full` (with `query` getter for maps) |
| Tagline / Vision | "A Household of Faith, Hope & Love." / "To be a vibrant Eucharistic community, drawing all to Christ through worship, formation, and service." | `site.tagline / site.vision` |
| Patronal feast | **Corpus Christi · Most Holy Body and Blood of Christ — Sunday after Trinity Sunday** | `site.feast` |
| Hours | 6 keys: `church` (Daily 9:00 AM – 9:00 PM), `office` (Mon–Fri 9:00 AM – 5:30 PM), `reception` (Mon–Fri 9:00 AM – 5:30 PM), `adoration` (Daily 9:00 AM – 9:00 PM), `confessionWeekday`, `confessionWeekend` | `site.hours` |
| Transport | MRT Queenstown EW19 · Commonwealth EW20; buses Commonwealth Drive: 32, 51, 111, 122, 145, 195, 855 | `site.transport` |
| Contacts | Parish office **+65 6474 0582** · fax +65 6472 6545 · `secretariat@bsc.org.sg` | `site.contact` |
| Giving identity | **UEN T08CC1234A** (PayNow); cheque payable **Church of the Blessed Sacrament** | `site.uen` / `site.chequePayee` |

**Design thesis — "Reverent, not austere":** Warm parchment/sapphire/gold on cream, generous whitespace, Fraunces display + Source Sans 3 body. Every page is a welcome from the Tent of Meeting at 1 Commonwealth Drive — the conserved folded blue roof, the Adoration Chapel, Damien Hall & Damien Centre (Little Shepherds' Schoolhouse) — not a brochure. No purple gradients, no `Inter` defaults, no generic card-grid templates.

**Non-negotiable rules:**

1. **Parish fidelity over pixel theft** — rephrase narrative, preserve BSC facts exactly (1958–2026 Sacred Hearts/Queenstown details: Damien Hall 7 Nov 1963, 1965 Tent of Meeting Y. Gordon Dowsett folded blue roof & 2005 conservation, 1982 Damien Centre / 2007 rebuild, 2019–2023 $9.4m TOMR & Threefold Celebration, 1 Commonwealth Drive, Mass 8.30/12.30/6.30 + Sat 6.00p sunset + Sun 6 Masses incl. Mandarin 7.30/Tamil 3rd Sat 19.30/Indonesian last Sun 13.00/Tagalog 15.15, UEN T08CC1234A — cheque Blessed Sacrament Church, Corpus Christi Sunday after Trinity Sunday, Commonwealth EW20, SS.CC). Never reintroduce previous-parish narratives outside the historical appendices (see Appendices D/F) — this is Blessed Sacrament Church, Queenstown.
2. **Single-file deployability** — must remain a standalone `index.html` (+ `dist/images/`) shippable to GH Pages/S3 without a server. No SSR, no API until explicitly requested.
3. **Static-first data** — parish copy lives in `src/data/content.ts` + `src/data/nav.ts` + canonical facts in `src/data/site.ts`; no CMS/API to invent.
4. **Accessibility is doctrinal** — keyboard-navigable header, 4.5:1 contrast on `bsc-ink/cream`, meaningful `alt`, `prefers-reduced-motion` respect, SkipLink hash discipline under HashRouter.

**Anti-generic mandate:** Reject `Inter`/`Roboto` safety, purple-on-white clichés, predictable 3-col hero grids. Whitespace is structure. See `avant-garde-design-v4` when adding sections.

---

## 2. Tech Stack & Environment

| Layer | Technology | Locked Version | Critical Note |
|---|---|---|---|
| UI Runtime | `react` / `react-dom` | `19.2.8` | Hooks-only, no class components; `StrictMode` in `src/main.tsx` |
| Routing | `react-router-dom` | `7.18.2` | `HashRouter` intentionally for static hosts; see ADR-1 |
| Build | `vite` / `@vitejs/plugin-react` | `7.3.6` / `5.2.0` | Node ≥20 required; HMR default; alias `@→src/` |
| Styling | `tailwindcss` / `@tailwindcss/vite` | `4.3.3` / `4.1.17` | **CSS-first `@theme` inline** — no `tailwind.config.*`; tokens in `src/index.css` |
| Language | `typescript` / `@types/react` / `@types/react-dom` / `@types/node` | `5.9.3` / `19.2.18` / `19.2.5` / `22.20.1` | `strict` + `noUnusedLocals/Params` — breaches fail `tsc` |
| Icons | `lucide-react` | `1.38.0` | Header/footer + Home quick-facts + Give icons |
| Utils | `clsx` / `tailwind-merge` | `2.1.1` / `3.6.0` | `cn()` = `twMerge(clsx(...))` — only merge path |
| Bundling | `vite-plugin-singlefile` | `2.3.3` | Inlines JS+CSS into `dist/index.html`; `public/images/` → `dist/images/` (not inlined) |
| Fonts | Google Fonts (CDN, `index.html`) | — | `Fraunces` 400/500/600/700 + `Source Sans 3` 400/500/600/700; no runtime loader |

> All versions pinned exact (no `^`) in `package.json` (`pnpm@11.0.0`, `engines: node>=20`). Re-pin on upgrade; `pnpm --frozen-lockfile` in CI verifies lockfile. `package.json` version is **1.4.4** (see §0 — the SKILL doc version axis is independent of the package version).

**Environment:** No `.env`, no DB, no auth, no docker. `pnpm` is the supported manager (`--frozen-lockfile` in CI). `npm ci` fails on these exact pins (typescript-eslint 8.28.0 peer range predates TS 5.9) — use `npm ci --legacy-peer-deps` if npm is unavoidable. `skills/` is **present and git-tracked** (vendored reference content; `eslint`/`tsconfig`/`vite` `skills/**` ignores are load-bearing — never import from `skills/`). The root `package-lock.json` is **untracked** (round-13; pnpm-lock.yaml is canonical). `src.orig/` is **not part of the repository** (local-only port-session artifact — never committed; see Appendix D). No secret material is tracked in BSC `src/`; the round-6 leaked deploy key remains recoverable from git history — **rotation outstanding (C1)**.

**Test harness — current reality (2026-09-01, BSC hop 4; counts authoritative in §0):**

| Suite | Status | Detail |
|---|---|---|
| `vitest` unit (`pnpm test`) | **21 files / 112 tests — green** | `src/test/setup.ts` restored (F1: jest-dom + IntersectionObserver mock + scroll stubs + matchMedia) + BSC-adapted suite (cn / nav / content / site / massDay / monogram / deepLinks / Button / Accordion / SafeImage / Header / BackToTop / ScrollProgress / Layout / useScrollProgress / useScrollSpy) + guards (`ci-workflow` / `repo-hygiene` / `docs-contract`). Counts per §0. |
| `playwright` E2E (`pnpm test:e2e`) | **51 tests — green (BSC retargeted, F2B)** | 8 spec files `smoke 11 + navigation 8 + ministries 4 + give-faq 4 + enhancements 7 + enhancements-round5 6 + enhancements-round7 8 + deep-links 3` = 51 — asserting BSC parish facts (1 Commonwealth Drive, UEN T08CC1234A, SS.CC. since 1958, Join Us at the Altar). Motions: Round-2 (CTA-band cream, head completeness, page-in, progress rail/ring, drawer aria-current) + Round-4 (mobile drawer modal: dialog + `aria-modal` + trapped focus + Escape focus restore) + Round-5 (Worship today-Mass card, Sunday gold-dot list, gold category chips, sticky History story, gradient timeline rail, `.img-zoom`, `.bg-gold-bloom`, Button icon nudge, ghost numerals/monograms, NotFound emblem) + Round-7 Honest Light + Round-12 path-style deep-link asserts. |
| `playwright` built-artifact E2E (`pnpm test:e2e:built`) | **51 tests — green (same suite)** | Same 51 retargeted specs run against `dist/` via `vite preview :4173` (or live via `E2E_BASE_URL`) — `playwright.built.config.ts` (exists because singlefile rewrites root-relative asset refs, round-9 E2E-L1, §9 #14). Verified green vs the deployed host. |
| `lint` / `typecheck` / `build` | Green on BSC working tree | `eslint 9.39.5` flat `--max-warnings 0`, `tsc --noEmit` strict (`strict` + `noUnused*` still enforced), `viteSingleFile` → `dist/index.html` (466.20 kB, JS+CSS inlined) + `dist/_headers` + `dist/robots.txt` + `dist/images/` 9 files |

---

## 3. Bootstrapping & Configuration

### 3.1 From Zero to Running

```bash
git clone <repo-url> blessed-sacrament-queenstown && cd blessed-sacrament-queenstown
pnpm install --frozen-lockfile  # deterministic — versions pinned exact (pnpm 11.0.0)
# npm users: `npm ci --legacy-peer-deps` (typescript-eslint 8.28.0 peer predates TS 5.9)
pnpm dev                # → http://localhost:5173 (Vite HMR)
pnpm lint               # → eslint 9.39.5 flat — must be clean (--max-warnings 0)
pnpm typecheck          # → tsc --noEmit — must be silent (strict)
pnpm test               # → vitest 3.2.6 jsdom — 21 files / 112 tests green (harness restored F1; see §0)
pnpm test:e2e           # → playwright 1.55.1 chromium — 51/51 green (BSC retargeted F2B)
pnpm test:e2e:built     # → playwright vs built artifact (playwright.built.config.ts — vite preview :4173; E2E_BASE_URL → live host) — 51/51 green (dist + live)
pnpm build              # → dist/index.html + dist/_headers + dist/robots.txt + dist/images/ (viteSingleFile 2.3.3 inlines JS+CSS; publicDir copied) — 466.20 kB
pnpm preview            # → http://localhost:4173 (preview dist)
```

**Pre-push gate — GREEN (all five, round-13):**

```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build
# lint 0 ✓ · typecheck 0 ✓ · test 21/112 ✓ · test:e2e 51/51 ✓ · build 466.20kB ✓ · built pass 51/51 ✓
# Gate is green — re-run before every push (see §0 / §11).
```

### 3.2 Critical Config Files

| File | Purpose | Gotcha |
|---|---|---|
| `vite.config.ts` | `plugins: [react(), tailwindcss(), viteSingleFile()]` + `resolve.alias["@"]` + `test { globals, jsdom, setupFiles: src/test/setup.ts (restored F1), include: src/**/*.{test,spec}.{ts,tsx}, exclude: e2e/** }` + `server.watch.ignored [skills/**, dist/**, playwright-report/**, test-results/**, coverage/**, src.orig/**]` | `test` keeps `e2e/**` out of unit runs; `server.watch.ignored` prevents `ENOSPC` from vendored `skills/` tree (large `.venv`). `@` must stay in sync (`vite.config.ts` ↔ `tsconfig.json` `paths`). |
| `tsconfig.json` | `ES2020`/`ESNext`/`bundler`/`react-jsx`/`strict`/`noUnused*`/`isolatedModules`/`noEmit` + `include ["src","vite.config.ts","eslint.config.js","playwright.config.ts","playwright.built.config.ts"]` + `types ["node","vitest/globals"]` + `paths {"@/*":["src/*"]}` + `baseUrl:"."` | `include` covers `src` + all config files (so `eslint.config.js` + `playwright.config.ts` + `playwright.built.config.ts` are type-checked). `types [vitest/globals]` required for `describe/it/expect` globals. Adding a file outside `src/` requires expanding `include`. |
| `eslint.config.js` | flat config (`eslint 9.39.5` + `@eslint/js 9.39.5` + `typescript-eslint 8.28.0` + `react-hooks 5.2.0` + `react-refresh 0.4.19` + `globals 16.1.0`) — ignores `dist/node_modules/coverage/playwright-report/test-results` **and `skills` and `src.orig`** | Flat. `pnpm lint:fix` → `eslint . --fix`. Ignoring `skills` + `src.orig` is what keeps the gate green. Never re-add `src.orig/` to lint/tsc. |
| `playwright.config.ts` | `playwright 1.55.1` (`@playwright/test 1.55.1` chromium, `webServer` → `pnpm exec vite --port 5173 --host 127.0.0.1 --strictPort`) | `testDir: e2e`, `baseURL: http://localhost:5173`, `reuseExistingServer: !CI`, `expect.timeout: 15s`, `trace/video on failure`. **Green** — 51 tests per §0. |
| `playwright.built.config.ts` | Extends the base config — `baseURL = E2E_BASE_URL ?? http://127.0.0.1:4173`; `webServer: pnpm exec vite preview --port 4173` (skipped when `E2E_BASE_URL` is set) | Built-artifact pass (`pnpm test:e2e:built`): runs the same 51 tests against `dist/` via `vite preview`, or against the live host via `E2E_BASE_URL`. Exists because the singlefile pipeline rewrites root-relative asset refs (`/favicon.svg` → `./favicon.svg`) — dev-only assertions pass on `pnpm dev` and fail on the built artifact (round-9 E2E-L1). |
| `e2e/` | 51 tests — `smoke.spec.ts` (11), `navigation.spec.ts` (8), `ministries.spec.ts` (4), `give-faq.spec.ts` (4), `enhancements.spec.ts` (7), `enhancements-round5.spec.ts` (6), `enhancements-round7.spec.ts` (8), `deep-links.spec.ts` (3) + `helpers.ts` | **green — retargeted to BSC (F2B)** — assertions assert BSC copy (1 Commonwealth Drive, UEN T08CC1234A, Join Us at the Altar, Stewardship & Generosity); routes/anchors 17/7/9 unchanged. |
| `.github/workflows/ci.yml` | CI: lint → typecheck → test → test:e2e (chromium) → build + artifacts | `pnpm 11`, `node 24`. All steps green — CI mirrors the local gate. Drift guards restored in `src/`: `ci-workflow` (4) + `repo-hygiene` (4) + `docs-contract` (round-13/14, 22). |
| `src/index.css` | `@import "tailwindcss"` + `@theme` (33 colors + 2 shadows incl. gold-700 #85641c, §0) + `@layer base/utilities` (31 utilities + 10 keyframes incl. card-tint + round-17 scrims/hero-fade/rule-draw, §4.3) + themed scrollbar in `@layer base` + `@media print` reveal override | Only token source; no `tailwind.config.*` exists. `src/token-integrity.test.ts` fails on any referenced-but-undefined `bsc-*` class. |
| `index.html` | `lang en`, `viewport`, `meta description`, scoped `Content-Security-Policy` meta + `referrer` meta, inline ⛪ emoji data-URI favicon, OG (`og:title`/`og:description`/`og:type`/`og:url`) + Church JSON-LD, preconnect `fonts.googleapis.com`, `Fraunces`+`Source Sans 3`, `#root` + `src/main.tsx` | CSP: `img-src 'self' data: blob:` (all images local), `frame-src https://www.google.com` (maps embed), `script-src` inline (singlefile) + `https://static.cloudflareinsights.com`, `connect-src 'self' https://cloudflareinsights.com` (host-injected analytics beacon). Social identity for Blessed Sacrament Church (www.bsc.org.sg, Corpus Christi — Sunday after Trinity Sunday). Head facts re-guarded by the e2e head test. |
| `.gitignore` | Ignores `node_modules/`, `.next/`, `dist/`, `/scripts/`, `src.orig/`, `docs/ssh-key.txt`, `/package-lock.json` + `nohup.out`, `.venv`, `bak.git/` (root-anchored; round-13) | `skills/` is intentionally **tracked** (the old `skills/` ignore rule was removed in round-13 — it made 2,360 tracked files match `.gitignore`, the L14 trap in reverse). `src.orig/` stays ignored (local-only artifact, never in the repo). Root `package-lock.json` untracked (round-13 hygiene). |

**Env vars:** None. `VITE_*` prefix convention applies if added; guard with `src/env.d.ts` (`import.meta.env`). Document new vars in `README.md` + `CLAUDE.md` + this §.

---
## 4. The Design System (Code-First)

**Single source:** `src/index.css` `@theme` block. No `tailwind.config.*`. Tokens are **33 colors + 2 shadows (35 `@theme` entries) incl. gold-700 #85641c** (§0) — BSC retains both late AA text steps (`terracotta-600 #8f5038` + `gold-700 #85641c`) plus the round-16 chip steps (`terracotta-50/300` + `pine-50/300`). The imagery and copy they frame is now the Tent of Meeting at 1 Commonwealth Drive: the 1965 folded blue tent, the Adoration Chapel, Damien Hall & Damien Centre (Little Shepherds' Schoolhouse) — still warm parchment/sapphire/gold on cream.

### 4.1 Tokens (`@theme`)

```css
@theme {
  --font-display: "Fraunces", Georgia, serif;
  --font-body: "Source Sans 3", system-ui, sans-serif;

  --color-bsc-cream: #f8f5ef;
  --color-bsc-parchment: #efe8d8;
  --color-bsc-parchment-dark: #e3d8c2;
  --color-bsc-stone: #d4c9ae;
  --color-bsc-ink: #1e2330;
  --color-bsc-charcoal: #3a3f4d;

  --color-bsc-sapphire-50: #eef2fb;
  --color-bsc-sapphire-100: #d6e0f5;
  --color-bsc-sapphire-200: #b0c4eb;
  --color-bsc-sapphire-300: #7a9bdb;
  --color-bsc-sapphire-400: #4a72c4;
  --color-bsc-sapphire-500: #3458a8;
  --color-bsc-sapphire-600: #28458a;
  --color-bsc-sapphire-700: #1f366e;
  --color-bsc-sapphire-800: #1a2b55;
  --color-bsc-sapphire-900: #0f1a33;
  --color-bsc-sapphire-950: #0a1122;

  --color-bsc-gold-100: #f5eacc;
  --color-bsc-gold-200: #ebd599;
  --color-bsc-gold-300: #dfc06a;
  --color-bsc-gold-400: #d4ad42;
  --color-bsc-gold-500: #c49a2c;
  --color-bsc-gold-600: #a67f22;
  --color-bsc-gold-700: #85641c;

  --color-bsc-terracotta-400: #c07a5a;
  --color-bsc-terracotta-500: #a86545;
  --color-bsc-terracotta-600: #8f5038;

  --color-bsc-pine-500: #2d5a40;
  --color-bsc-pine-600: #1f422e;

  --shadow-bsc: 0 20px 60px -20px rgba(15, 26, 51, 0.45);
  --shadow-bsc-lg: 0 40px 90px -30px rgba(15, 26, 51, 0.55);
}
```

### 4.2 Typography

| Role | Font | Weights | Tracking | Class / Usage |
|---|---|---|---|---|
| Display / Quote | `Fraunces` | 400/500/600/700/800 + italic 500/600 | `tracking-tight` / `[0.25–0.35em]` on eyebrow | `font-display`, `h1–h4` (`@layer base`), hero title |
| Body | `Source Sans 3` | 400/500/600/700 | `tracking-wide` / `[0.3em]` on eyebrow | `font-sans` (alias `font-body`) on `body`, all `p`/`li` |
| Eyebrow (light) | — | 600 | `[0.25–0.35em]` | `text-bsc-gold-300 text-xs uppercase` |
| Eyebrow (dark) | — | 600 | `[0.25em]` | `text-bsc-sapphire-500` |

### 4.3 Custom Utilities (`@layer utilities`) — complete register

> **round-19 re-pin:** this register matches the **31 utility classes + 10 keyframes** measured in `src/index.css` (2026-09-02). Row 28 (`bloom-drift`) is a lineage fossil — not present in the BSC snapshot. The round-17 additions are `scrim-hero` / `scrim-page` / `hero-fade` / `rule-draw` ("Light on the Tent"). If you add a utility, add its row here *and* update the count in §0 — never leave the two out of sync.

| # | Name | CSS | Purpose |
|---|---|---|---|
| 1 | `.text-balance` | `text-wrap: balance` | Hero + heading line-wrap |
| 2 | `.bg-adobe-texture` | double radial gradient (white 0.06 + black 0.08) | Subtle adobe wash on dark bands |
| 3 | `.bg-grain` | `data:image/svg+xml` turbulence (`opacity 0.035`) | Grain overlay for hero/dark bands |
| 4 | `.bg-gold-bloom` | radial gold bloom gradient (round-5) | Warm gold wash on dark CTA bands |
| 5 | `.divider-weave` | 2px `repeating-linear-gradient(90deg, stone 0 8px, transparent 8px 12px)` | Section weave strip |
| 6 | `.divider-weave-thin` | 1px `repeating-linear-gradient(90deg, stone 0 6px, transparent 6px 10px)` | Thin weave (footer top) |
| 7 | `.gold-rule` | `::after` 64px × 2px bar, `linear-gradient(90deg, gold-400, gold-600)`, `margin-top 0.75rem` | Gold rule under `SectionHeading` titles |
| 8 | `.gold-rule-left` | left-aligns the `.gold-rule` bar (`margin-left: 0; margin-right: auto`) | Left-aligned gold rule variant |
| 9 | `.hero-ken-burns` | `scale(1)→scale(1.08) translate(-1%,-1%)`, 20s ease-in-out infinite alternate | Home hero image slow zoom (round-17: Home wraps the img in a `hero-fade` layer — opacity on the wrapper, transform on the img) |
| 10 | `.mask-fade-b` | `linear-gradient(to bottom, black 70%, transparent)` | Mask for image fades |
| 11 | `.reveal` | `translateY(24px)→0`, `opacity 0→1`, `0.7s cubic-bezier(0.22,1,0.36,1)` + `prefers-reduced-motion` kill | Scroll-reveal via `Reveal.tsx` + `IntersectionObserver` (print override round-7) |
| 12 | `.reveal-visible` | paired state class of `.reveal` | Applied by `Reveal.tsx` on intersect |
| 13 | `.rise-in` | `rise-in` keyframe: `translateY(30px)→0`, `opacity 0→1`, `0.8s ease-out`, fill `both` | Staged entrance for Home hero + PageHero content (eyebrow→title→copy→CTA) |
| 14 | `.rise-in-d1` | delay 100ms | Stage 2 (title) |
| 15 | `.rise-in-d2` | delay 200ms | Stage 3 (copy) |
| 16 | `.rise-in-d3` | delay 350ms | Stage 4 (CTA) |
| 17 | `.rise-in-d4` | delay 500ms | Stage 5 (extras) |
| 18 | `.menu-in` | `menu-in` keyframe: `translateY(-8px) scale(0.98)→0/1`, `opacity 0→1`, `0.25s ease-out` | Desktop dropdown `<ul>` entrance (runs on conditional mount) |
| 19 | `.drawer-in` | `drawer-in` keyframe: `translateX(100%)→0`, `opacity 0→1`, `0.35s ease-out` | Mobile drawer panel entrance (runs on conditional mount) |
| 20 | `.drawer-item-in` | `drawer-item-in` keyframe: `translateX(16px)→0`, `opacity 0→1`, `0.3s ease-out` | Drawer link cascade |
| 21 | `.page-in` | keyed route-transition entrance (round-2) | Page wrapper fade/slide on route change |
| 22 | `.dot-pulse` | `::after` gold ring `halo-pulse` 2s infinite (scale 1→1.6, opacity 0.6→0); reduced-motion → killed | Timeline dot halo |
| 23 | `.card-lift` | hover `translateY(-4px)` + `shadow-bsc` + `gold-400` border, 300ms ease | Uniform card hover (grounds, round-17 also featured event cards) |
| 24 | `.card-tint` | info-card honesty tint (round-7) — present in BSC `index.css` | Distinguishes informational cards from interactive ones |
| 25 | `.link-underline` | `::after` gold gradient underline, `scaleX(0)→1` 300ms on hover/focus (+ `aria-current` state) | Footer nav, top-bar Give link, priest contacts, WhatsApp links |
| 26 | `.skip-link` | `absolute top -40px → focus top:0`, `z-[100]`, sapphire-900 bg | Skip-to-content link (`SkipLink.tsx`) |
| 27 | `.img-zoom` | grounds/ministries image drift-on-hover (round-5) | Image interior pan while card lifts |
| 28 | `.bloom-drift` | *(lineage fossil — not present in the BSC snapshot)* gold-bloom drift keyframe (round-15, Risen Christ) | Retained for lineage only |
| 29 | `.scrim-hero` | `linear-gradient(to bottom, rgba(10,17,34,0.30), rgba(10,17,34,0.55) 55%, rgba(10,17,34,0.95))` | Bottom-heavy Home-hero scrim — roof reads at top, text contrast at bottom (round-17) |
| 30 | `.scrim-page` | same family, `0.45 / 0.75 55% / 0.96` | PageHero scrim, heavier for shorter bands (round-17) |
| 31 | `.hero-fade` | `hero-fade` keyframe: `opacity 0→1` + `scale 1.04→1`, 1.4s ease-out `both`; reduced-motion → killed | Hero/PageHero image settle before the Ken Burns drift (round-17) |
| 32 | `.rule-draw` | pairs `.gold-rule`: `rule-draw` keyframe `scaleX(0)→1`, 0.9s `cubic-bezier(0.4,0,0.2,1)` both, `transform-origin left`; reduced-motion → static `scaleX(1)` | The gold rule draws itself in on every `SectionHeading` (round-17) |

**Keyframes (10 — complete, measured):** `hero-ken-burns` · `rise-in` · `menu-in` · `drawer-in` · `drawer-item-in` · `page-in` · `halo-pulse` · `bloom-drift` · `hero-fade` (round-17) · `rule-draw` (round-17) — all killed/instant under `prefers-reduced-motion` (global 0.01ms override in `@layer base` + explicit utilities-override list incl. `.hero-fade` / `.rule-draw.gold-rule::after`; `rule-draw` resolves to static `scaleX(1)`). Plus a themed scrollbar in `@layer base` and an `@media print` reveal override (round-7) — neither counts as a utility. `motion-contract.test.ts` (round-17) pins this register.

**Accordion collapse contract:** panels animate via `grid-template-rows 0fr↔1fr` (`grid grid-rows-[0fr|1fr]` + inner `overflow-hidden`) — never `hidden`. Closed panels carry `aria-hidden="true"` + `inert`; `aria-expanded` on the button stays the single source of truth (see `docs/ui-ux-remediation-plan-2026-08-28.md`).

### 4.4 Shadows & Radii

- Shadows: `shadow-bsc` (default) + `shadow-bsc-lg` (elevated cards/dropdowns). Radii are `rounded-sm` (buttons/cards) and `rounded-full` (emblem icon). Don't introduce `shadow-lg`/`rounded-xl` without a rationale.

**Verification:** `grep --color bsc- src/index.css` → 33 colors + 2 shadows (35 theme entries, §0 — incl. gold-700 #85641c) ; copy-paste `@theme` into this doc to prevent drift. `wcag-contrast.test.tsx` lived in `src.orig/` (Risen) — restore to `src/` to recompute ratios; tokens include `card-tint` utility.

---

## 5. Component Architecture & Patterns

### 5.1 Layer Map (SPA — no 5-layer BE model needed)

```
index.html (#root) → src/main.tsx (StrictMode+createRoot + #root guard + resolveHashRedirect pre-mount rewrite)
  → src/App.tsx (HashRouter + Routes + Layout outlet)
    → Layout (Header / Outlet / Footer) + scroll/hash restore + ScrollProgress + BackToTop + keyed page-in
      → Pages (10) → ui/* primitives → utils/cn
      → data/* (nav + content + site) — single-source, typed
```

No global store, no API layer, no `server/` — add only with an ADR.

### 5.2 Directory Inventory (63 files in `src/` — 41 source + 21 tests + 1 setup; authoritative counts in §0)

> **v3 fix:** the source files' trees omitted `hooks/useScrollSpy.ts`, `utils/monogram.ts`, and `utils/deepLinks.ts` even though their own test harnesses and Quick Refs proved they exist. The tree below includes them.

```
src/ (63 files — 41 source + 21 tests + 1 setup; counts per §0 — harness restored F1)
  App.tsx                 # HashRouter + 17 Route entries (16 content paths + * NotFound; 5 alias groups, 7 alias paths)
  main.tsx                # StrictMode + createRoot + resolveHashRedirect pre-mount rewrite (F-3: path-style deep links land on their page)
  index.css               # @theme (33 colors + 2 shadows incl. gold-700 #85641c, §0 + round-19 --radius-* overrides) + @layer base (global :focus-visible gold ring, body kern+liga) + @layer utilities (31 utilities + 10 keyframes incl. card-tint + round-17 scrims/hero-fade/rule-draw + themed scrollbar)
  components/
    Layout.tsx            # Outlet + hash-aware scroll restoration (double-hash aware, 80ms, timeout cleanup) + ScrollProgress (decoupled rail z-[60]) + SkipLink + BackToTop + keyed page-in container
    Header.tsx            # z-50 fixed sapphire-950 bar (solid = scrolled||!isHome||mobileOpen; translucent+blur when solid, transparent at top of Home), useScrolled(16) (default 12), hover/focus-open dropdown (no click-toggle — keyboard via onFocusCapture), mobile modal drawer (round-4 L-5: role=dialog + aria-modal + initial focus + Tab/Shift+Tab focus trap + focus restore to hamburger + outside-tap close; Escape handler, parentActive, 44px hamburger, menu-in/drawer-in)
    Footer.tsx            # 4-col + divider-weave-thin + SocialIcons (Facebook/Instagram, WhatsApp · sacredHearts link) + site.ts hours/transport/flows
    PageHero.tsx          # sapphire-950 hero (compact?, bg-grain, dual gradients; image alt="" only)
    SafeImage.tsx         # local fallback (fallback=/images/hero-church.jpg, lazy, fetchPriority?, onError→dataset.fallback guard) — all current images local; naveCdn/courtyardCdn are local aliases
    Emblem.tsx            # inline SVG emblem (crook + wheat, currentColor)
    SkipLink.tsx          # skip-to-#main-content link; preventDefault + imperative focus — never rewrites the hash (HashRouter)
    SocialIcons.tsx       # hand-drawn glyphs (Facebook/Instagram/WhatsApp in BSC; YouTube not in BSC)
    BackToTop.tsx         # threshold 480 + SVG progress ring (stroke-dashoffset via useScrollProgress) + reduced-motion, hash-safe
    ScrollProgress.tsx    # fixed gold rail (h-[3px], scaleX progress, aria-hidden, z-[60]) — decoupled from Header, rendered by Layout
    Timeline.tsx          # gradient rail ([data-testid=timeline-rail], fades at both ends) + display-serif gold years + Reveal per entry + dot-pulse halos — fed 1958–2026 Sacred Hearts/Queenstown milestones
    EventMeta.tsx         # categoryTone + EventMeta chip (shared)
    ui/
      Button.tsx          # discriminated union (to/href/button) + icon, 4 variants
      Container.tsx       # max-w-7xl mx-auto px-5 sm:px-8
      SectionHeading.tsx  # eyebrow? / title / description + align/light + line (gold-rule-left)
      Accordion.tsx       # FAQ accordion (aria-expanded, grid-rows animation, Plus rotate-45)
      Reveal.tsx          # IntersectionObserver fade+slide (threshold 0.15, fallback visible, prefers-reduced-motion, IO try/catch + rootMargin)
  hooks/                  # 3 hooks — useScrollSpy restored F2A (drives the Ministries pill aria-current)
    useScrolled.ts        # scrollY > threshold boolean (threshold=12 default; Header passes 16)
    useScrollProgress.ts  # 0..1 scroll progress, rAF-throttled, unscrollable guard
  pages/                  # Home, About, History, Worship, Ministries, NewsEvents, Serve, Give, FAQ, NotFound (10 pages, all named exports)
  data/
    nav.ts                # primaryNav (6 + description on children) / footerNav (10)
    content.ts            # 8 interfaces + 10 exports + images export (11 keys, all local — §0/§7.1) — priests 5, ppc 6, timeline 8 (1958–2026), grounds 3, ministries 6 (sixth id community/ Community & Outreach)
    site.ts               # site as const — name/shortName/tagline/vision + address 1 Commonwealth 149603 + hours(6) + mass(9, sunday 6) + contact (6474 0582 / fax 6472 6545 / secretariat@bsc.org.sg) + transport (Queenstown EW19 · Commonwealth EW20 + buses 32/51/111/122/145/195/855) + feast Corpus Christi Sunday after Trinity Sunday + uen T08CC1234A/chequePayee/facebook/instagram/youtube/archdiocese/mapsUrl/mapsEmbedSrc + url/ogImage — single source; no whatsapp/sacredHearts keys
  utils/
    cn.ts                 # twMerge(clsx) + cn helper
    massDay.ts            # massDayKey(date): 'weekdays'|'saturday'|'sunday' — single source for the Worship today-highlight
    monogram.ts           # About monogram disc glyphs
    deepLinks.ts          # knownRoutePaths + resolveHashRedirect (F-3) — path-style deep links rewrite to hash routes pre-mount
  # src/test/setup.ts RESTORED (F1) — 17 test files / 94 tests green (+ guards)
```

**Counts (§0):** `find src -type f | wc -l` → 63 (41 source + 21 tests + 1 setup). `public/images/` → 9 files → `dist/images/` on build (not inlined) + `public/_headers` + `public/robots.txt` (favicon is the inline ⛪ emoji data URI in `index.html` — no `favicon.svg` asset). Harness is restored — `pnpm test` reports 21 files / 112 tests green.

### 5.3 Client vs Server

**All components are client components.** No RSC, no `use server`. SPA mental model: React 19 hooks (`useState`/`useEffect`/`useLocation`) only; no `createServerFn`.

### 5.4 Routing Contract (`src/App.tsx`)

**17 `Route` entries = 16 content paths + `*` NotFound, covering 10 page components, with 7 alias paths in 5 groups and hash anchors on two pages.**

```tsx
// src/App.tsx — 17 entries (16 paths + *)
// HashRouter is intentional: static GH Pages/S3 with no SPA fallback.
import { HashRouter, Route, Routes } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import { History } from "@/pages/History";
import { Worship } from "@/pages/Worship";
import { Ministries } from "@/pages/Ministries";
import { NewsEvents } from "@/pages/NewsEvents";
import { Serve } from "@/pages/Serve";
import { Give } from "@/pages/Give";
import { FAQ } from "@/pages/FAQ";
import { NotFound } from "@/pages/NotFound";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />                          {/* / */}
          <Route path="/about" element={<About />} />                 {/* canonical — orig was /about-blessed-stanley-rother */}
          <Route path="/history" element={<History />} />
          <Route path="/worship" element={<Worship />} />             {/* canonical for 3 aliases */}
          <Route path="/mass-times" element={<Worship />} />          {/* aliasOf /worship */}
          <Route path="/hours-location" element={<Worship />} />      {/* aliasOf /worship (was Pilgrimage in orig) */}
          <Route path="/visit" element={<Worship />} />               {/* aliasOf /worship (was Pilgrimage in orig) */}
          <Route path="/ministries" element={<Ministries />} />       {/* canonical for 1 alias — replaces /what-to-see */}
          <Route path="/ministry" element={<Ministries />} />         {/* aliasOf /ministries */}
          <Route path="/news-events" element={<NewsEvents />} />      {/* canonical for 1 alias */}
          <Route path="/news-and-events" element={<NewsEvents />} />  {/* aliasOf /news-events */}
          <Route path="/serve" element={<Serve />} />                 {/* canonical for 1 alias — replaces /volunteer alone */}
          <Route path="/volunteer" element={<Serve />} />             {/* aliasOf /serve */}
          <Route path="/give" element={<Give />} />                   {/* canonical for 1 alias */}
          <Route path="/donate" element={<Give />} />                 {/* aliasOf /give (was /shrinegift in orig) */}
          <Route path="/faq" element={<FAQ />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
```

**Alias groups (5):**

| Canonical | Aliases | Origin |
|---|---|---|
| `/worship` | `/mass-times`, `/hours-location`, `/visit` | `/mass-times` is new; `/hours-location`+`/visit` moved from `Pilgrimage` (orig) |
| `/ministries` | `/ministry` | Replaces `/what-to-see` + `/grounds-art-architecture` (orig) |
| `/news-events` | `/news-and-events` | Unchanged |
| `/serve` | `/volunteer` | `/serve` is new canonical; orig had `/volunteer` alone |
| `/give` | `/donate` | Replaces `/shrinegift` (orig) |

**Canonical flip:** `/about` is now canonical (orig: `/about-blessed-stanley-rother` canonical, `/about` was the alias).

**Path-style deep links (round-12 F-3):** `main.tsx` calls `resolveHashRedirect` (from `utils/deepLinks.ts`) *before* mounting — `risenchrist.org.sg/worship` (no `#`) rewrites to `#/worship` so the user lands on the page, not Home. `knownRoutePaths` is drift-guarded against `App.tsx` (`utils/deepLinks` 7 tests). Covered by `e2e/deep-links.spec.ts` (3 tests).

**Hash anchors:**

| Route | IDs | Nav wiring | Notes |
|---|---|---|---|
| `/worship` | `#mass`, `#confession`, `#visit` | `primaryNav → /worship#mass` / `#confession` / `#visit` + `footerNav → /worship#mass` | 3 sections: Mass schedule (three `MassCard`s — Clock/MoonStar/Sun icons; the card matching `massDayKey(new Date())` carries `data-today="true"` + gold top rule + "Today" chip; Sunday slots are a gold-dot hover list), Confession & Adoration, Find Us (map). Each `section id="…"` has `scroll-mt-28`. |
| `/ministries` | `#liturgical`, `#faith-formation`, `#pastoral-care`, `#family-life`, `#youth`, `#community` | `primaryNav → 3` of them; `footerNav → 3`; **Ministries jump nav** `ministries.map → <Link to="/ministries#<id>">` (6 pills, `aria-label="Jump to ministry"`, alternating `bg-bsc-cream`/`bg-bsc-parchment`, scrollspy-highlighted via `useScrollSpy`) | Must use `<Link to="/ministries#id">`, never `<a href="#id">` — plain href would replace the HashRouter hash and route to NotFound. Sixth id is `community` (§0). |
| `/serve` | *(none)* | No section ids — `serveRoles`/`devotions` rendered without anchors | |
| *(orig)* | ~~`#pilgrim-center`/`#shrine-church`/`#tepeyac-hill`~~ | Gone — predecessor `WhatToSee` anchors removed | See Appendix D |

**Rule:** When adding a route, add its alias if external parish/school links or printed material expects it. Keep `Layout.tsx` hash logic intact — it resolves the anchor from `useLocation().hash` or the double-hash `window.location.hash`, then `getElementById` + `scrollIntoView({smooth})` (80ms) with fallback `window.scrollTo(0,0)`.

### 5.5 Component Conventions

| Primitive | File | API | Rule |
|---|---|---|---|
| `Button` | `src/components/ui/Button.tsx` | discriminated `to` (Link) / `href` (a) / native `button` + `variant`, `icon?`, `className?` | `to`→`<Link>`, `href`→`<a>`, else `<button>`; `variantClasses` + `cn()` + focus ring; icons get `aria-hidden` nudge (round-5) |
| `Container` | `src/components/ui/Container.tsx` | `children, className?` | All sections wrap in `<Container>` |
| `SectionHeading` | `src/components/ui/SectionHeading.tsx` | `eyebrow?, title, description?, align?, light?` | Eyebrow renders a `gold-rule` line; light = cream on dark |
| `PageHero` | `src/components/PageHero.tsx` | `eyebrow, title, description?, image, children?, compact?` | `compact` shrinks padding; `bg-grain` + dual gradients; `alt=""`; atmosphere opacity 45 (round-7) |
| `SafeImage` | `src/components/SafeImage.tsx` | `src, fallback?, alt, className?, loading?, fetchPriority?` (`fallback` default `/images/hero-church.jpg`, `loading` default `lazy`, `fetchPriority` optional `"high"` on heroes) | Wraps `<img>` with `onError→dataset.fallback` guard to swap `src` once; always via `cn()`. All current `images.*` are local (naveCdn/courtyardCdn point to local); the guard stays valid for any future external image; don't use bare `<img>` for external sources. |
| `Header` | `src/components/Header.tsx` | `useScrolled(16)` (default 12) + `mobileOpen`, `desktopOpen` + drawer-level Escape + window-level Escape (round-16) | Fixed sapphire-950 bar (`sapphire-950/92` + blur when solid; `solid = scrolled\|\|!isHome\|\|mobileOpen`); `aria-haspopup`/`aria-expanded` on dropdown trigger + `aria-current` states (plain "page", parent "true"), close on `pathname`+`hash` change + onClickCapture in drawer/dropdown; **mobile drawer is a modal dialog (round-4 L-5): `role="dialog"` + `aria-modal="true"` + `aria-label="Site menu"`, panel focused on open, `Tab`/`Shift+Tab` trapped (`handleDrawerKeyDown`), focus restored to the hamburger on every close path, outside `pointerdown` closes**; hamburger 44px (h-11 w-11); threshold 16 delays transparent→solid on Home (intentional) |
| `Reveal` | `src/components/ui/Reveal.tsx` | `children, delay?, as?: "div"│"li", className?` | `IntersectionObserver` 0.15 threshold + round-7 `rootMargin` early-entry; IO constructed in try/catch with visible fallback; respects `prefers-reduced-motion` |
| `Accordion` | `src/components/ui/Accordion.tsx` | `items: {question,answer}[]` | Single-open, `grid-rows` animation, `Plus rotate-45` — used by `FAQ.tsx` for `faqs[6]` |
| `BackToTop` | `src/components/BackToTop.tsx` | threshold 480 + SVG ring + reduced-motion | Appears when scrollY>480, hides below (aria-hidden+tabIndex -1), progress ring via `useScrollProgress` (`data-testid="back-to-top"` + `data-progress`); hash-safe (window.scrollTo only) |
| `ScrollProgress` | `src/components/ScrollProgress.tsx` | `useScrollProgress` 0..1 | Fixed `h-[3px]` rail (`data-testid="scroll-progress"`, `aria-hidden`, `scaleX(progress)`) at z-[60], rendered by Layout — decoupled from Header |
| `Emblem` / `SkipLink` / `Timeline` | `src/components/*` | see files | `Emblem` is inline SVG; `SkipLink` targets `#main-content` via preventDefault + imperative focus (never rewrites the hash); `Timeline` is a drawn gradient rail (`[data-testid="timeline-rail"]`, fades at both ends — no `border-l`) with display-serif gold years + Reveal per entry + dot-pulse halos — now shows 1969–2026 Toa Payoh milestones |
| `cn` | `src/utils/cn.ts` | `cn(...ClassValue[])` | Only merge path — `twMerge(clsx(...))` |

---

## 6. Custom Hooks Deep Dive

**Status: Three hooks — `useScrolled` + `useScrollProgress` + `useScrollSpy` — scrollspy restored F2A (see §0).**

> **BSC contract:** `useScrollSpy` (round-7 origin) was **restored in F2A** — `src/hooks/useScrollSpy.ts` + 6 tests; it drives the Ministries jump-nav pill `aria-current` (document-order tie-break). §0 hooks count is 3.

**Contracts (BSC — 3 hooks):**

```ts
// src/hooks/useScrolled.ts
import { useEffect, useState } from "react";
export function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

// src/hooks/useScrollProgress.ts — rAF-throttled 0..1, unscrollable guard
export function useScrollProgress(): number; // returns 0 when document height ≤ viewport
// useScrollSpy — RESTORED in BSC (F2A); production implementation in src/hooks/useScrollSpy.ts:
//   export function useScrollSpy(ids: string[], options?: { offset?: number }): string | undefined;
//   // Tracks which section id is in view for the 6 ministry pills — document-order tie-break (round-7 audit L-2).
```

- `Header.tsx` calls `useScrolled(16)` — the 16 vs default-12 mismatch is intentional (delays transparent→solid on Home). Don't "fix" it.
- `useScrollProgress` is shared by `ScrollProgress` (gold rail, z-[60]) and `BackToTop` (progress ring) — one listener, two consumers. Never touches the hash.
- SSR-safe by construction (`window` only inside `useEffect`).

**When you add one:**

- Location: `src/hooks/useThing.ts` (`camelCase`, `use` prefix).
- Must be SSR-safe even in an SPA (guard `window` access): `useEffect` for scroll/listeners, `useState` initial `false`.
- Cleanup: return a remover in `useEffect` (e.g., `removeEventListener`, `clearTimeout`).

---

## 7. Content Management & Data Ingestion

**No CMS, no RSS, no API.** Pure file-backed content — the simplest thing that works. `src/data/content.ts` is the data layer; `src/data/site.ts` is the canonical fact single-source; `src/data/nav.ts` is the navigation single-source. Pages render from data — don't inline copy.

### 7.1 Data Files — Complete Inventory

| File | Exports | Count / Shape | Consumer |
|---|---|---|---|
| `src/data/content.ts` | `lifeTimeline: TimelineEntry[]` | **8** — `1958–2026` Sacred Hearts / Queenstown (1958 Sacred Hearts arrive → 1963 Damien Hall 7 Nov → 1965 Tent of Meeting 8 May Y. Gordon Dowsett → Queenstown fills 1970–1984 toward 7,000 → 1982 Damien Centre → 2005 conservation / 2007 rebuild → 2019–2023 $9.4m TOMR → Corpus Christi 2023 mission) (see §7.2) | `History.tsx`, `About.tsx`, `Timeline.tsx` |
|  | `grounds: GroundsPlace[]` | **3** — `main-church`, `chapel`, `rosary-garden` (= Damien Centre — id `rosary-garden`, title Damien Centre) (Tent of Meeting / Adoration Chapel 9–21 / Damien Centre & Little Shepherds' Schoolhouse; + `image`/`imageFallback`/`imageAlt` — all local) | `Home.tsx` (grounds preview) |
|  | `ministries: Ministry[]` | **6** — `liturgical`, `faith-formation`, `pastoral-care`, `family-life`, `youth`, `community` (= Community & Outreach — title Community & Outreach, id `community`) (Mandarin Sun 7.30, Tamil 3rd Sat 19.30, Indonesian last Sun 13.00, Tagalog 15.15) (each + `image`/`imageFallback`/`imageAlt` — all local) | `Ministries.tsx` (jump nav + 6 alternating sections; sixth `id` is `community` in BSC data) |
|  | `faqs: FaqItem[]` | **6** — Mass times (weekday 8.30/12.30/6.30 incl. 3rd Sat Tamil etc.), confession (post-8.30a + 15 min before 12.30/6.30 + 5.45p Sat + Sun 7.15/8.45/10.45/17.15), how to get there (Commonwealth EW20, buses 11041/11049), parking (limited compound), baptism/marriage/Mass intention (bsc.secretariat@), office hours (10–18 + lunch) | `FAQ.tsx` (`Accordion`) |
|  | `upcomingEvents: EventItem[]` | **6** — `title`+`date`+`summary`+`category` + optional `href` (categories `Parish`\|`Devotion`\|`Formation`\|`Archdiocese`) — **Corpus Christi** Thu after Trinity (Devotion, feast-first), First Friday Sacred Heart, RCIA, parish catechism, KKIS Indo last Sun, Archdiocesan news (1 with href `catholic.sg`) | `NewsEvents.tsx`, `Home.tsx` |
|  | `givingOptions: GivingOption[]` | **8** — PayNow (UEN issued at office, not in site data), General Church Offering, Poor & Needy, Church Maintenance, Cheque (Blessed Sacrament Church), Cash at office, Mass offerings, Thanksgiving for restoration $9.4m (icons `globe`/`flame`/`hand-heart`/`landmark`/`book`/`heart`/`sprout`/`church`) — **no `site.uen`** | `Give.tsx` |
|  | `priests: Priest[]` | **5** — Fr Johan Wongso SS.CC (Parish Priest), Fr Rusdi Santoso SS.CC, Fr Karolus Kapolok Huar SS.CC, Fr Sambodo Sru Ujianto SS.CC (KKIS chaplain), Fr Anthony Hutjes SS.CC (Residence) — `email` optional where present | `About.tsx` |
|  | `ppcMembers: PpcMember[]` | **6** — Fr Johan Wongso SS.CC (Parish Priest, ex-officio) + Pastoral Associate Victor Leong + Chinese Pastoral Associate Catherine Wong + Youth Pastoral Associate Mendoza Alyzza Miclat + parish mission + SS.CC congregation (not priests 3 + secretariat etc.) | `About.tsx` |
|  | `serveRoles` (untyped const) | **4** — Liturgical ministers, Catechists & facilitators, Pastoral care, Hospitality & grounds (each `title`+`summary`) | `Serve.tsx` |
|  | `devotions` (untyped const) | **6** — Divine Mercy Fri 20.00, Novena Sat 17.00, Sacred Heart 1st Fri 19.00 vigil, Immaculate Heart 1st Sat 9.00 vigil, Intercessory 2nd Fri 19.45, Daily Adoration 9–21 | `Serve.tsx`, `Worship.tsx` |
|  | `images` (`as const`) | **11 keys — all local** — `hero`/`heroFallback` `/images/hero-church.jpg`, `chapel`/`sanctuary`/`garden`/`glass`/`hall`/`cemetery`/`feast` (all `/images/*`), `naveCdn`→`/images/sanctuary.jpg`, `courtyardCdn`→`/images/rosary-garden.jpg` (local aliases) | `Home.tsx`, `PageHero`, `SafeImage` fallbacks |
| `src/data/nav.ts` | `primaryNav: NavItem[]` | **6** — Home, About(3 children), Worship(3 children with hash), Ministries(3 children with hash), News & Events, Serve. Children carry `description`. | `Header.tsx` |
|  | `footerNav: NavLink[]` | **10** — Home, About, History, Worship, Ministries, News & Events, Serve, Give, FAQ, Contact | `Footer.tsx` (split into `Explore`/`Get involved` nav landmarks) |
| `src/data/site.ts` | `site: { as const }` | **1 canonical object** — `name` Church of the Blessed Sacrament / `shortName` Blessed Sacrament Church / `tagline` A Household of Faith, Hope & Love. / `vision` + `address` 1 Commonwealth Drive Singapore 149603 (`full`/`query` getters) + `hours` (6: §1) + `mass` (9 keys: `weekdayMorning`/`weekdayNoon`/`weekdayEvening`/`saturday`/`sunday[6]`/`saturdayTamil`/`confession`/`adoration`/`note`) + `contact` (officePhone +65 6474 0582 / fax +65 6472 6545 / email + connectEmail secretariat@bsc.org.sg) + `transport` (Queenstown EW19 · Commonwealth EW20 + buses 32/51/111/122/145/195/855) + `feast` Corpus Christi — Sunday after Trinity Sunday + `uen` T08CC1234A/`chequePayee` Church of the Blessed Sacrament/`facebook`/`instagram`/`youtube`/`archdiocese`/`mapsUrl`/`mapsEmbedSrc` + `url`/`ogImage` | `Footer.tsx`, `Worship.tsx`, `About.tsx` — single source; don't duplicate |

**Interfaces:** 8 exported (`TimelineEntry`, `GroundsPlace`, `Ministry`, `FaqItem`, `EventItem`, `GivingOption`, `Priest`, `PpcMember`) — see §20 for verbatim definitions.

### 7.2 Life Timeline — 7 Entries (1954–Today — Sacred Hearts / Queenstown)

| Year | Title | Parish moment |
|---|---|---|
| 1958 | The Sacred Hearts arrive | Archbishop Michel Olçomendy applies for a Queenstown site for Alexandra and Redhill — Frs William van Soest & Odo Tiggeloven (SS.CC, Dutch province) arrive to found a parish among Singapore's first public housing estate |
| 1963 | Damien Hall | First building completed, opened 7 November as temporary church & lodging — named for St Damien of Molokai (SS.CC); variety shows, film nights, circus proceeds help raise the rest |
| 1965 | A tent of meeting | 8 May Archbishop Olçomendy blesses the main church — Y. Gordon Dowsett (Van Sitteren and Partners) folded blue tent on a cruciform plan for 1,500, glass at the roof joints lighting the sanctuary |
| 1970–1984 | Queenstown fills the pews | Under Fr Albert Renckens congregation swells toward 6,000 → ~7,000 by the 1980s; breakfast in Damien Hall after Sunday Mass; Parish Renewal Experience (1984), Life in the Spirit, Youth Lenten campaign |
| 1982 | Damien Centre | New centre opens for formation, fellowship, and the kindergarten that will become Little Shepherds' Schoolhouse |
| 2005–2007 | A conserved house of prayer | URA conservation status 2005 protects the tent roof; Damien Centre rebuilt and opened 22 Sep 2007 by Msgr Eugene Vaz, still home to Little Shepherds' Schoolhouse |
| 2019–2023 | Tent of Meeting Restoration | Fr Johan Wongso launches TOMR Mar 2019 — $9.4m restoration (roof, pews, sacristy, air/sound) + spiritual restoration; Masses move to Damien Hall; reopened Oct–Nov 2023 with eight-day Threefold Celebration |
| 2023–2026 | A Eucharistic spirituality | Corpus Christi 2023 parish receives mission: to be an evangelising church with a Eucharistic spirituality; Oliver Wihardja's Stations keep watch; English, Mandarin, Tamil, Indonesian, Tagalog still gather under the blue tent |

*1958–2026 Sacred Hearts / Queenstown arc — from Damien Hall to the conserved Tent of Meeting and the $9.4m TOMR.*

### 7.3 Other Arrays at a Glance

**`grounds[3]`** — `main-church` (Main Church: Tent of Meeting — conserved 1965 nave under folded blue roof, glass at roof joints, Celtic cross behind altar, Oliver Wihardja Stations 2023), `chapel` (Adoration Chapel daily 9–21 — Blessed Sacrament, the parish's centre of gravity), `rosary-garden` (Father Damien Centre — the 1963 hall rebuilt 2007, home to Little Shepherds' Schoolhouse). Each has `image` + `imageFallback` + `imageAlt` (all local; `naveCdn`/`courtyardCdn` are local aliases).

**`ministries[6]`** — `liturgical` (altar servers, lectors, choirs — SS.CC fathers, Mandarin/Tamil/Indonesian/Tagalog choirs), `faith-formation` (catechesis, RCIA, Little Shepherds, adult Scripture / Life in the Spirit), `pastoral-care` (home/hospital visitation, bereavement, poor of Queenstown), `family-life` (baptism/marriage enquiry), `youth` (Youth pastoral associate Mendoza Alyzza Miclat), `community` (Community & Outreach — Mandarin Sun 7.30, Tamil 3rd Sat 19.30, Indonesian last Sun 13.00, Tagalog 15.15 with English on 3rd Sun). Each drives one alternating `bg-bsc-cream`/`bg-bsc-parchment` section in `Ministries.tsx`; BSC data sixth `id` is `community`.

**`faqs[6]`** — Mass times (weekday 8.30/12.30/6.30 + Sat 8.30/6.00 + Tamil 3rd Sat 7.30p, Sun 6 Masses + public holiday 8.30 only), confession (after 8.30 & before 12.30/6.30, Sat after 8.30 & before 5.45, Sun before all Masses), how to get there (1 Commonwealth Drive, Queenstown EW19 · Commonwealth EW20, buses 32/51/111/122/145/195/855), parking (limited compound, first-come), baptism/wedding via `secretariat@bsc.org.sg` + 6474 0582 (six months ahead for weddings), join a ministry via the Serve page or parish office.

**`upcomingEvents[6]`** — `title`+`date`+`summary`+`category` (Parish|Devotion) + optional `href`. First Friday Eucharistic Adoration, First Saturday Adoration & Tamil Vigil, Divine Mercy Prayers, Novena to Our Lady, Intercessory Prayers, Parish Feast Day — Corpus Christi (Sunday after Trinity).

**`givingOptions[8]`** — PayNow (UEN issued at office, not in site data — ask at office), General Church Offering, Poor & Needy, Church Maintenance, Cheque (Blessed Sacrament Church), Cash at office, Mass offerings, Thanksgiving for restoration ($9.4m TOMR). No UEN in `site.ts` — intentional for BSC (cf. previous parish (see Appendix D) UEN previous giving identifier (see Appendices D/F).

### 7.4 How to Add Content

**Add a timeline entry:**

1. Append to `lifeTimeline` in `src/data/content.ts` with `{ year, title, description }`.
2. Re-run `pnpm typecheck` (type gate).
3. No page change — `History.tsx` maps the array via `Timeline.tsx`.

**Add a ministry:**

1. Append to `ministries` with `{ id, title, summary, details[], image, imageFallback, imageAlt }` — `id` becomes the hash anchor (`/ministries#<id>`).
2. Verify `Ministries.tsx` jump nav (`ministries.map → <Link to="/ministries#id">`) picks it up automatically; add the id to the `useScrollSpy` watch list.
3. Run `pnpm typecheck && pnpm build`.

**Add a nav item:**

1. Append to `primaryNav` or `footerNav` in `src/data/nav.ts` (include `description` for dropdown children).
2. If routed, add `<Route path="…">` in `src/App.tsx` — include an alias if a legacy/external path expects it, and add the path to `utils/deepLinks.ts` `knownRoutePaths`.
3. Verify `Header` hover dropdown + mobile drawer render the child.

**Why no `import.meta.glob`:** Vite glob is for file-system content collections (e.g., Astro). This is a typed-array SPA — direct export + import is simpler and fully type-checked. For a future CMS, isolate behind `src/lib/cms/` and keep `content.ts` as fallback.

---

## 8. Accessibility (WCAG AAA) Implementation

**Target:** WCAG AAA intent — this section documents the contract, not a certification claim. Verify with `axe-core` / Lighthouse a11y before claiming pass. `src/components/wcag-contrast.test.tsx` (round-12) computes the ratios from the `@theme` token layer so drift fails a test, not a review.

### 8.1 Contrast (body text)

| Foreground | Background | Ratio | Level |
|---|---|---|---|
| `bsc-ink #1e2330` | `bsc-cream #f8f5ef` | ~13:1 | AAA |
| `bsc-charcoal #3a3f4d` | `bsc-cream` | ~10:1 | AAA |
| `bsc-cream #f8f5ef` | `bsc-sapphire-900 #0f1a33` | ~13:1 | AAA |
| `bsc-gold-300 #dfc06a` | `bsc-sapphire-900` | ~7:1 | AAA |
| `bsc-terracotta-600 #8f5038` | `bsc-parchment #efe8d8` | 5.36:1 | AA (Devotion chip text — round-12 F-1; hop-1's `terracotta-500` chip text was 3.4:1, decorative only) |

Verify new pairings with a contrast checker before merging — or extend the guard suite in `src/` (the round-13 `docs-contract` pattern makes drift fail CI). BSC retains `gold-700 #85641c` (4.72:1 on cream — use for text-bearing gold).

### 8.2 Focus & Navigation

- **Focus ring:** `focus-visible:outline` via Tailwind defaults; `src/index.css` `@layer base` sets `outline: 2px solid --color-bsc-gold-500` + `offset 3px` for `:focus-visible`. Preserve on `Button` and `Header` toggle. Do not remove outlines.
- **Header toggle:** `aria-label` toggles `Open menu`/`Close menu`, `aria-expanded` reflects `mobileOpen`. Keep both.
- **Dropdowns:** Hover/focus-open (`onMouseEnter`/`onMouseLeave` + `onFocusCapture` on `primaryNav` children — keyboard reachable without a click-toggle). If converting to click-open, add `aria-haspopup="true"` + focus-trap + `Escape` close.
- **Mobile drawer is a modal (round-4 L-5):** `role="dialog"` + `aria-modal="true"` + `aria-label="Site menu"`; panel receives initial focus; `Tab`/`Shift+Tab` trapped; focus restored to the hamburger on every close path (including Escape and outside-tap); 44px hamburger target.
- **Skip-to-content:** Implemented — `SkipLink.tsx` renders `<a href="#main-content">` first in `Layout`. Under HashRouter the component **must not** let the browser follow the href (the hash is the route): `onClick` `preventDefault`s and imperatively focuses `#main-content` (`<main id="main-content">` in `Layout`). Covered by `src/components/SkipLink.test.tsx` (3 tests) + `e2e/navigation.spec.ts` (SkipLink hash-preserving).
- **Landmarks:** `header`/`main`/`footer` present via `Layout`; every page's `PageHero` is `section` with heading hierarchy `h1 → h2`. Each ministry section in `Ministries.tsx` has `aria-labelledby` pointing to its `h2`.

### 8.3 Images & Media

- Decorative hero overlays (`PageHero` image): `alt=""` + `aria-hidden="true"`; `PageHero` also renders `bg-grain` + dual gradients over the image for contrast.
- Content images (`grounds` cards, `ministries` sections, Home): `imageAlt` is required — `GroundsPlace.imageAlt` and `Ministry.imageAlt` enforce it (see §20). `SafeImage` passes it through.
- Icon-only links: each `lucide-react` icon has `aria-hidden="true"` and the anchor has `aria-label`.
- Ministries jump nav pills: `aria-label="Jump to ministry"` on each `<Link>`; active pill state mirrored by scrollspy.

### 8.4 Motion

- `html { scroll-behavior: smooth }` in `src/index.css`. Honor `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: 0.01ms !important; }
}
```

- `src/index.css` kills all 9 keyframes and `.reveal` (opacity/transform) under `prefers-reduced-motion: reduce` (global block + utilities override); `Reveal.tsx` constructs its `IntersectionObserver` in try/catch and falls back visible if unsupported (round-7).
- `@media print` overrides `.reveal` to visible (round-7 "Honest Light") — printed pages must not depend on scroll-triggered opacity.

---
## 9. Anti-Patterns & Common Bugs

Each entry: symptom → root cause → fix → lesson. Severity: `Critical` (breaks deploy/route) / `High` (breaks type/build) / `Medium` (visual/contrast) / `Low` (nit).

| # | Anti-Pattern (Severity) | Symptom | Root Cause | Fix | Lesson |
|---|---|---|---|---|---|
| 1 | **HashRouter → BrowserRouter** (Critical) | Deep-link 404 on GH Pages/S3 refresh | Static host has no fallback rewrites | Stay on `HashRouter`; if `BrowserRouter` is required, add `404.html` redirect shim | Static deploy = hash routing |
| 2 | **Breaking alias routes** (Critical) | Parish/school inbound links 404; `/#/visit` or `/#/donate` blank | Removed `path="mass-times"` / `"hours-location"` / `"visit"` / `"ministry"` / `"donate"` / `"volunteer"` / `"news-and-events"` alias | Keep alias routes in `App.tsx` or add explicit redirect; there are **7 aliases in 5 groups** | Alias routes are part of the contract (§5.4) |
| 3 | **Assumed code-splitting** (Critical) | `viteSingleFile` warnings / missing chunks | Dynamic `import()` expects chunks, but `singlefile` inlines all | Avoid `import()` splits unless removing `singlefile`; verify `dist/index.html` is one file | Build plugin dictates import style |
| 4 | **Arbitrary hex color** (High) | Token drift, contrast regression | Used `bg-[#691f1e]` instead of `bg-bsc-sapphire-700` | Use `bsc-*` token from `@theme` | Only `@theme` is the palette |
| 5 | **`@` alias desync** (High) | `Cannot find module '@/...'` | Changed `vite.config.ts` alias without `tsconfig.json` `paths` (or vice versa) | Update both files; restart dev server | Alias is a two-file contract |
| 6 | **Bypassing `cn()`** (High) | Duplicated/conflicting Tailwind classes not deduped | Used `` `px-3 ${cond? "px-6":""}` `` | Always `cn("px-3", cond && "px-6")` | `twMerge` is the only path |
| 7 | **Stale `include`** (High) | File not type-checked | Added file outside `src/` but didn't expand `tsconfig.json` `include` | Add path to `include` (currently 5 entries, §3.2) | `include` is the type boundary |
| 8 | **`noUnusedLocals` breach** (Medium) | `tsc --noEmit` fails on unused import/var | Left placeholder imports/params after refactor | Remove or prefix deliberately unused param with `_` (`_idx`) | Strict flags are the gate |
| 9 | **Runtime font loader** (Medium) | FOIT + duplicate load | Imported fonts in JS instead of `index.html` | Fonts belong in `index.html` + `@theme`; no JS loader | One font source of truth |
| 10 | **Missing `imageAlt`** (Medium) | Empty alt on content image | Added `GroundsPlace`/`Ministry` without `imageAlt` | `imageAlt` is required — fill it | Content interface enforces a11y (§20) |
| 11 | **Plain `<a href="#id">` in HashRouter** (High) | Clicking a ministry pill routes to `NotFound` or loses the page | Used `<a href="#liturgical">` instead of `<Link to="/ministries#liturgical">` — plain href replaces the HashRouter hash | Always `<Link to="/ministries#id">` and `<Link to="/worship#id">` for hash anchors (see §5.4) | Hash is the route |
| 12 | **Lost `aria-expanded`** (Low) | Screen reader can't tell drawer state | Refactored `Header` toggle without `aria-expanded` | Keep `aria-expanded={mobileOpen}` + `aria-label` toggle | A11y props are functional |
| 13 | **Wrong `SafeImage` fallback** (Medium) | Broken hero on image failure shows shrine fallback | Used old `fallback="/images/hero-shrine.jpg"` (Rother path) instead of `"/images/hero-church.jpg"` | Default fallback is `/images/hero-church.jpg` — verify `src/components/SafeImage.tsx` default | All 11 `images.*` are local (`naveCdn`/`courtyardCdn` point to local fallbacks); the `onError` guard stays for any future external image (CDN → local discipline §5.5) |
| 14 | **Dev-only E2E asset assertions** (Medium) | Spec green on `pnpm dev`, red against `dist/`/live | Spec asserted the exact dev-form asset path (`/favicon.svg`) that `viteSingleFile` rewrites to `./favicon.svg` in the built HTML | Env-agnostic regex (`/^(?:\.\/|\/)favicon\.svg$/`) + resolution check; run `pnpm test:e2e:built` before shipping (round-9 E2E-L1) | Dev artifacts ≠ built artifacts |
| 15 | **agent-browser eval backslash mangling** (Low) | eval returns empty; stderr (when visible) shows "SyntaxError: Unterminated group" | Backslash-escaped regex literal inside an `agent-browser eval` string — the CLI strips backslashes from the command before JS evaluation, and `2>/dev/null` hides the error | Backslash-free contract checks: string comparisons (`h === './x'`) or `new RegExp` built from a string source; keep stderr visible while debugging (round-11 E2E-J1, ledger: `docs/e2e-live-pass-round11-2026-08-31.md`) | CLI arg parsing ≠ JS string literals |

---

## 10. Debugging Guide

| Symptom | Cause | Fix |
|---|---|---|
| `pnpm dev` → `EADDRINUSE :5173` | Port in use | `pnpm dev -- --port 5174` or `lsof -i:5173` then kill |
| `Cannot find module '@/utils/cn'` | Alias desync (see §9 #5) | Align `vite.config.ts` ↔ `tsconfig.json` `paths @/*` (`baseUrl:"."`) — change both; restart Vite |
| `npx tsc --noEmit` → `TS6133 'x' is declared but never used` | `noUnusedLocals`/`Params` (`strict` + `noUnusedLocals:true` `noUnusedParameters:true`) | Remove import or use it; for intentionally unused param, prefix `_` (e.g., `_idx`) |
| `pnpm test` → "no test files found" / "Cannot find setup file" | Harness deleted or `test.include/exclude` misconfigured | Confirm `src/test/setup.ts` exists (restored F1) and `*.test.{ts,tsx}` files live under `src/` — see §0 (21 files / 112 tests) |
| `pnpm test:e2e` → failures on `#mass`/`#liturgical` etc. | Missing `id` or `Layout` double-hash logic stale | Verify `Worship.tsx` has `id="mass"`/`"confession"`/`"visit"` and `Ministries.tsx` has 6 ministry `id`s (sixth `id` in BSC data is **`community`** — title Community & Outreach; see §7); `Layout` `resolveAnchor` must handle `/#/worship#mass` + `/#/ministries#community` |
| Hash anchor lands at top (`/#/worship#mass` or `/#/ministries#liturgical`) | Target `id` missing or `Layout` effect stale | Verify `id="mass"` in `Worship.tsx` and `id="liturgical"` in `Ministries.tsx`; check `Layout` `useEffect` deps `[pathname, hash]`; jump nav must be `<Link to="/ministries#id">` (not plain `<a href="#id">`, see §9 #11); sixth BSC anchor is `#community` |
| Double-hash `#/ministries#liturgical` doesn't scroll | `Layout` `resolveAnchor` not matching `pathname` | Verify `resolveAnchor` splits `window.location.hash` on `#`, filters, strips leading `/`, and compares against `pathname.replace(/^\//,"")` — the `cleaned === pathname` guard prevents false anchors; test `/#/ministries#community` |
| Path-style URL (`/worship` without `#`) lands on Home | `resolveHashRedirect` not wired or path missing from `knownRoutePaths` | `main.tsx` must call `resolveHashRedirect` pre-mount; `utils/deepLinks.ts` `knownRoutePaths` must list every content path (drift-guarded against `App.tsx`, 7 tests) — round-12 F-3 |
| `pnpm build` → `dist/index.html` missing or not inlined | `viteSingleFile` misordered or removed | Verify `plugins: [react(), tailwindcss(), viteSingleFile()]` order; check `dist/index.html` exists and `Inlining: index-*.js` in log; `dist/images/` alongside is expected (publicDir copy) |
| E2E green in dev, red on built artifact / live | Dev-only asset-path assertion (§9 #14) | Env-agnostic regex + run `pnpm test:e2e:built` (round-9 E2E-L1) |
| Styles missing locally but build works | `@import "tailwindcss"` order wrong | `@import` must be first line of `src/index.css` |
| Fonts not loading | `index.html` preconnect or href typo | Verify `fonts.googleapis.com` preconnect + `Fraunces`/`Source Sans 3` href intact; no JS font loader |
| GH Pages deep-link 404 on refresh | Switched to `BrowserRouter` | Revert to `HashRouter` or add `404.html` SPA redirect |
| Image 404 (`/images/hero-church.jpg`) | Wrong public path / missing `dist/images/` on deploy | Hero/fallback belong in `public/images/` and referenced as `/images/…` (absolute from root; Vite copies to `dist/images/` — upload alongside `index.html`); all `images.*` are local (§0). Upload count: **8 files** in `public/images/` |
| `tests` not found or `e2e` leaking into vitest | `test.include`/`exclude` misconfigured | Verify `vite.config.ts test: { globals:true, environment:"jsdom", setupFiles:["src/test/setup.ts"], include:["src/**/*.{test,spec}.{ts,tsx}"], exclude:["e2e/**","node_modules/**","playwright-report/**","test-results/**"] }` — `e2e/**` must be excluded |
| `vite.config.ts` `server.watch` `ENOSPC` on `pnpm dev` | Vendored `skills/` or an `src.orig/` worktree watched without ignore | Verify `server.watch.ignored: ["**/skills/**","**/dist/**","**/playwright-report/**","**/test-results/**","**/coverage/**","**/src.orig/**"]` is present in `vite.config.ts` — in BSC `skills/` is deleted (ignore vacuous) but `src.orig/` (77 files) is present |
| `tsconfig.json` errors on `eslint.config.js` / `playwright.config.ts` / `playwright.built.config.ts` | Added those files to `include` without installing their types | `include` is the 5-entry list in §3.2 with `types ["node","vitest/globals"]` — required for `describe/it/expect` globals |
| `repo-hygiene` test fails | A guarded path (`docs/ssh-key.txt`, any key-like file, `src.orig/`, or any tracked-but-ignored artifact) re-entered the git index | `git rm -r --cached <path>`; round-13 extends the guard with a `git check-ignore --no-index` sweep so no tracked file may match a `.gitignore` rule (see `src/repo-hygiene.test.ts`) |

**Live-site verification (post-deploy — BSC Queenstown routes — 1 Commonwealth Drive):**

```bash
pnpm build && pnpm preview  # :4173
# Click through every primaryNav item + all hash anchors:
# /  /about  /history  /worship  /ministries  /news-events  /serve  /give  /faq
# /mass-times (→ Worship)  /hours-location (→ Worship)  /visit (→ Worship)
# /ministry (→ Ministries)  /news-and-events (→ NewsEvents)  /volunteer (→ Serve)  /donate (→ Give)
# /worship#mass  /worship#confession  /worship#visit
# /ministries#liturgical  #faith-formation  #pastoral-care  #family-life  #youth  #community (= Community & Outreach — sixth id is community)
# Direct: /#/worship#mass  and  /#/ministries#community  → should land on-section
# Refresh on /#/ministries#youth → stays on-section (HashRouter)
# /does-not-exist → NotFound
# Path-style: /worship  /news-events  /donate (no #) → land on their pages, not Home (F-3 deep-links)
# BSC-specific spots: Corpus Christi feast blurb on NewsEvents · Adoration Chapel 9–21 · SS.CC priests on About · Damien Centre (rosary-garden) · KKIS Indo last Sun 13.00
```

---

## 11. Pre-Ship Checklist

Run in order — every step must be green before pushing `main` (`main` is the deploy branch).

```bash
pnpm lint                      # 1 — eslint 9.39.5 flat --max-warnings 0 — must be clean
pnpm typecheck                 # 2 — tsc --noEmit (strict + noUnusedLocals/Params + noFallthroughCasesInSwitch) — must be silent
pnpm test                      # 3 — vitest 3.2.6 jsdom — 21 files / 112 tests green (see §0)
pnpm test:e2e                  # 4 — playwright 1.55.1 chromium — 51/51 green (BSC retargeted)
pnpm test:e2e:built            # 4b — playwright vs built artifact (vite preview :4173; E2E_BASE_URL → live host) — 51/51 green
pnpm build                     # 5 — singlefile 2.3.3 build → dist/index.html (JS+CSS inlined, 466.20kB) + dist/_headers + dist/robots.txt + dist/images/ (9 files, copied not inlined)
pnpm preview &                 # 6 — smoke: spot-check 10 routes + 7 alias paths + 9 hash anchors (3 on /worship + 6 on /ministries — sixth is #community)
ls -lh dist/                   # 7 — confirm dist/index.html (466.20kB) + dist/_headers + dist/robots.txt + dist/images/ (9 files) — publicDir copy expected, not inlined
# 8 — axe/Lighthouse a11y spot-check on Header + Home hero + FAQ + Worship#visit map
git push origin main           # 9 — deploy (GH Pages / S3 upload of dist/index.html + dist/images/)
```

| Category | Check | How |
|---|---|---|
| Lint | `pnpm lint` clean | `eslint 9.39.5` flat `eslint . --max-warnings 0` (`typescript-eslint 8.28.0` + `react-hooks 5.2.0`) — ignores `skills` (deleted, vacuous) + `src.orig` (present, excluded) |
| Types | `pnpm typecheck` (`npx tsc --noEmit`) clean | `strict` + `noUnusedLocals`/`noUnusedParameters`/`noFallthroughCasesInSwitch`/`isolatedModules`/`noEmit` pass; `tsconfig.json` `include` covers the entries in §3.2 with `types [node, vitest/globals]` |
| Tests | `pnpm test` — 21 files / 112 tests green | Harness restored F1 (`src/test/setup.ts` + BSC-adapted suite + round-13/16 guards) |
| E2E | `pnpm test:e2e` — 51/51 green | Full spec list in §0; retargeted to BSC parish facts (F2B). Built-artifact pass: `playwright.built.config.ts` (`vite preview :4173`; `E2E_BASE_URL` → live host) — 51/51 vs dist and live. |
| Build | `pnpm build` greens | `viteSingleFile 2.3.3` inlines JS + CSS; `dist/images/` 9 files copied (not inlined) — verify one-file `dist/index.html` (466.20 kB, §0) + `dist/_headers` + `dist/robots.txt` |
| Routes | All 10 pages + 7 alias paths + 9 hash anchors navigate (HashRouter) + path-style deep links land on their pages | Manual or `agent-browser` smoke (`Layout` double-hash aware `#/ministries#id` → split + 80ms `scrollIntoView` — sixth BSC id is `#community`; `main.tsx` pre-mount `resolveHashRedirect`) |
| A11y | Contrast ≥4.5:1 on body (incl. terracotta-600 chip 5.36:1 + gold-700 4.72:1), `alt` on content images (`SafeImage` fallback), `aria-expanded` on toggle, drawer modal focus trap + Escape restore, `SkipLink` hash discipline, `aria-label="Jump to ministry"` | Spot-check per §8 table + `axe-core` on Header/Home hero/FAQ/Worship map; contrast pairings are pinned by the round-13 guard pattern in `src/` |
| Visual | Hero gradients + `shadow-bsc`/`shadow-bsc-lg` + `divider-weave`/`divider-weave-thin` + `gold-rule`/`gold-rule-left` + `hero-ken-burns` + `card-tint` + `bg-gold-bloom` render | Preview comparison — hero is the local `hero-church.jpg` (Tent of Meeting dusk) |
| Images | `SafeImage` fallback verified (all images local) + `public/images/` → `dist/images/` (9 files) on deploy | Block images or off-line smoke; check `dist/images/` has the 9 files listed in §0; favicon is the inline emoji data URI (no asset) |
| CSP | No console CSP violations | Verify `index.html` CSP: `img-src 'self' data: blob:` (all images local), `frame-src https://www.google.com` for maps embed, `script-src` inline + `static.cloudflareinsights.com`; no `unsafe-eval` |
| Git | No `dist/`/`node_modules/` committed; no unexpected secret material | `.gitignore` respected — the round-13 `repo-hygiene` guard proves the tracked-file set and the ignore rules are disjoint (`skills/` intentionally tracked; `src.orig/` never in repo). Guards live in `src/repo-hygiene.test.ts` + `src/docs-contract.test.ts` |
| Docs | This file + `README` + `AGENTS` + `CLAUDE` agree on every §0 fact | The drift guards live in `src/docs-contract.test.ts` (23 checks) + `src/ci-workflow.test.ts` + `src/repo-hygiene.test.ts` — restored round-13 |

**Pre-push gate — GREEN (re-verified 2026-09-01, round-13; counts in §0):**

```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build
# → lint 0 + typecheck 0 + test 21/112 ✓ + test:e2e 51/51 ✓ + build 466.20kB ✓ + dist/_headers ✓ + dist/robots.txt + dist/images/9 ✓ (+ built pass 51/51)
# History: F1 restored the harness (16/94), F2A restored useScrollSpy, F2B retargeted the 51 E2E specs to BSC, F3 re-pinned the docs; round-13 re-verified all gates and added docs-contract/hygiene guards
```

---

## 12. Lessons Learnt & How to Avoid Them

> L1–L12 are the per-hop engineering lessons (carried through all three source files). **L13–L15 are new in v3** — the doc-fidelity lessons from the 2026-09-01 unification audit (full ledger: Appendix G).

| # | Lesson | What Happened | Fix / Guard |
|---|---|---|---|
| L1 | **Alias routes are a contract, not tech debt** | Both lines considered removing alias paths as "duplicates" (orig: `shrinegift`/`grounds-art-architecture`; now: `mass-times`/`hours-location`/`ministry`/`donate`). Inbound parish/school/programme links + printed QR codes 404'd. | Documented §5.4; **7 aliases in 5 groups** preserved in `App.tsx`. Rule: renaming a canonical path requires keeping the old alias or adding a redirect. |
| L2 | **No README → this SKILL** | Early project shipped with only `docs/prompts.md`; onboarding required reading 10 files. | Added `README.md` + `AGENTS.md` + `CLAUDE.md`; this file distills all three. Update all four when adding a route/token/image. |
| L3 | **`@theme` drift is silent** | Arbitrary `bg-[#...]` would compile but evade review. | Enforce `bsc-*` tokens only; grep CI: `rg -n "bg-\[#"` or forbid `amber-`/`slate-` via test. |
| L4 | **Singlefile dictates imports** | `import()` assumed chunks until `singlefile` warning appeared. | Document §9 #3; verify `dist/index.html` is one file post-build. |
| L5 | **Strict flags catch real debt** | `noUnusedLocals` surfaced 3 dead imports post-scaffold; port surfaced similar. | Keep `strict` flags on; gate is `tsc --noEmit`. |
| L6 | **HashRouter vs BrowserRouter is a deploy decision** | Considered `BrowserRouter` for cleaner URLs; would have broken GH Pages/S3 deep-links. | ADR-1 (Appendix A) locks `HashRouter` with `404.html` escape hatch. |
| L7 | **Content shape = UI shape** | Orig `WhatToSeeSection.imageAlt` was optional in a draft; a11y regression followed. Port `GroundsPlace`/`Ministry` keep `imageAlt` + `imageFallback` required for the same reason. | Required in §20 interfaces; future entries must include both. |
| L8 | **Hash is the route — `<Link>` not `<a>`** | Ministries jump nav drafted with `<a href="#liturgical">` — would have replaced the HashRouter hash and routed to NotFound. | Fixed to `<Link to="/ministries#id">` in `Ministries.tsx` + Worship children; documented §5.4 / §9 #11. |
| L9 | **`SafeImage` default drift** | Wikimedia hero (`images.hero`) introduced a new CDN host at hop 1; old default `/images/hero-shrine.jpg` would have 404'd on fallback. Later hops went all-local. | `SafeImage.tsx` default is `/images/hero-church.jpg`; `images.heroFallback` + `imageFallback` on every `grounds`/`ministries` entry; the `onError` guard is kept for future external images. |
| L10 | **Stale `e2e/` was a trap — resolved per hop** | Hop 1 initially kept the 20-test Rother E2E verbatim (`#pilgrim-center` etc.); CI would have failed. Each hop rewrote the suite to its own parish. | E2E rewritten per hop (current: 51 tests / 8 specs, §0). Alias mapping `what-to-see` → `ministries`, `pilgrimage` → `worship` covered under current routes. |
| L11 | **`vite.config.ts` `test` block is required** | Restoring `src/test/setup.ts` without the `test` block leaves vitest misconfigured. | `vite.config.ts` has `test { globals:true, jsdom, setupFiles:["src/test/setup.ts"], include:["src/**/*.{test,spec}.{ts,tsx}"], exclude:["e2e/**"] }` + `types ["vitest/globals"]` — keep both in sync (see §3.2). |
| L12 | **Canonical flip: `/about` not `/about-blessed-stanley-rother`** | Hop 1 flipped the About canonical (orig: `/about-blessed-stanley-rother` canonical, `/about` alias). Any hard-coded deep link to the old canonical would 404 if the alias were dropped. | Kept only `/about` (no alias needed — the old canonical is intentionally retired for the parish). Document the flip in §5.4 + Appendix D; if old shrine links must survive, add `/about-blessed-stanley-rother` back as an alias to `/about`. |
| L13 | **A secret in git history is a live secret** (new, v3) | `docs/ssh-key.txt` was committed (`0be0fe8`), untracked next round — but `git rm --cached` does not scrub history, so the key remains recoverable from every clone. | Round-6 C1 disclosure carried in §0/§2; `repo-hygiene` test guards the working tree. **Rotation is the only real fix**; consider `git filter-repo` + force-push + credential revocation. |
| L14 | **`.gitignore` does not untrack** (new, v3) | `src.orig/` was listed in `.gitignore` since round 3 yet remained tracked (64 files) until round-12 F-9 found it — ignore rules only prevent *new* additions. | `git rm -r --cached <path>` to actually untrack; `repo-hygiene` test now fails if a guarded path re-enters the index. Rule: adding a path to `.gitignore` for something already committed requires an explicit untrack commit in the same change. |
| L15 | **Every restatement is a future fossil** (new, v3 — the systemic root cause) | The three source docs restated each volatile fact 5–8×; each hop healed the body but copy-forwarded the appendices without a previous-parish sweep, leaving contradictory counts (three test-count generations inside one doc; three version numbers inside hop 1's doc; a St Mary smoke script inside hop 3's Appendix B). | v3 introduces §0 (single statement of every volatile fact, all other sections reference it), explicit **`as of <date>`** labels for historical snapshots in appendices, `docs-contract` tests (16) at CI level, and the fossil-sweep protocol (Appendix G.4) that every future port must run before its doc ships. |
| L16 | **Harness deletion is a silent red gate** (new, v4 BSC — resolved by F1–F3) | The BSC port replaced `src/` wholesale (source-only) without carrying `src/test/` — CI stayed `lint && typecheck && build` green while `test` quietly became 0/0 harness-missing; E2E stayed green structurally but stale for parish facts. | Remediated TDD-style: F1 restored the harness (16/94), F2A restored `useScrollSpy`, F2B retargeted the 51 E2E specs to BSC, F3 re-pinned the docs; round-13 added the `docs-contract` guard so the drift class fails CI. Treat any hop that rewrites `src/` as a full harness-carry operation — not a source-only copy. |

---

## 13. Pitfalls to Avoid

**Architecture**
- Don't add SSR/API/`server/` without an ADR — this is a static SPA by design.
- Don't scatter route tables outside `src/App.tsx` — it is the only route table (17 entries, 5 alias groups); the only *companion* is `utils/deepLinks.ts` `knownRoutePaths`, which is drift-guarded against it (update both when adding a path, and the hash-anchor ids in §5.4).
- Don't put data arrays outside `src/data/*` — they are the data layer (`content.ts` + `nav.ts` + `site.ts`). BSC sixth ministry `id` is `community` (Community & Outreach) — don't rename without updating data + Ministries anchors + Layout hash logic.
- Don't reintroduce previous-parish narratives outside the historical appendices (see Appendices D/F for lineage addresses, UENs, feasts, priests, MRT — fossil-sweep §0) — this is Blessed Sacrament Church, Queenstown (1 Commonwealth Drive 149603, 1958–2026 SS.CC Tent of Meeting, Corpus Christi Sunday after Trinity Sunday, UEN T08CC1234A, Queenstown EW19 · Commonwealth EW20, 6474 0582, Damien Hall/TOMR $9.4m). Hours, Mass, and address are the single source in `site.ts`; don't duplicate them across pages.

**TypeScript**
- Don't use `any` — use `unknown` + narrowing; `as any` is a last resort with `// ponytail: ceiling…` comment.
- Don't use `type` for object shapes — prefer `interface` (`type` is for unions).
- Don't relax `strict` flags to silence errors — fix the code. `noUnusedLocals`/`noUnusedParameters`/`noFallthroughCasesInSwitch`/`isolatedModules`/`noEmit` are the gate.
- Don't assume `tsconfig.json` scope — it includes the 5 entries in §3.2 with `types ["node","vitest/globals"]`. Don't re-add `src.orig/` to `include`.

**Styling**
- Don't introduce `amber-400`/`slate-*`/`zinc-*` — forbidden; use `bsc-*`.
- Don't use arbitrary `bg-[#...]` — extend `@theme`.
- Don't add `tailwind.config.*` — v4 is CSS-first (`src/index.css` `@theme` is the only token source).
- Don't bypass `cn()` — `tailwind-merge` dedup matters; never concatenate Tailwind strings with template literals.

**Data / A11y**
- Don't omit `imageAlt` or `imageFallback` on `grounds`/`ministries`.
- Don't remove `alt=""` on decorative hero overlays (`PageHero`); don't drop `aria-expanded`/`aria-label` on the mobile toggle, the modal-dialog drawer contract (round-4), or `aria-label="Jump to ministry"` on the Ministries pills.
- Don't let `SkipLink` rewrite the hash — its `preventDefault` + imperative `focus()` is load-bearing for HashRouter.

**Build / Deploy**
- Don't commit `dist/`/`node_modules/`. `skills/` is **vendored, tracked reference content** — never import/lint it (tooling ignores it). `src.orig/` is **not part of the repository** (local-only port-session artifact, never committed) — lineage history lives in Appendices D/F + git history.
- Don't upload `dist/index.html` without `dist/images/` + `dist/_headers` — the 8 image files are copied via `publicDir`, not inlined; both + headers must ship together to GH Pages/S3.
- Don't ship a "green CI" claim without fresh gate output — all five gates are green as of round-13 (see §0). Asset-path e2e assertions must be env-agnostic — run `pnpm test:e2e:built` (51/51 vs dist + live).
- Don't state a mutable number anywhere except §0 — every other statement of it is a future fossil (L15; fossil-sweep App G.4).

---

## 14. Best Practices

- **File naming:** `PascalCase.tsx` for components/pages (`PageHero.tsx`), `camelCase.ts` for data/utils (`content.ts`, `cn.ts`), `useThing.ts` for hooks (`useScrolled.ts`).
- **Imports:** Always `@/` for cross-directory; relative `./` only within the same folder.
- **Types:** `interface` for shapes, `type` for unions; `import type` for type-only imports; rely on inference, add explicit returns only at public boundaries. Never `any`.
- **React:** Hooks-only, composition over inheritance, early returns, handle `loading`/`error`/`empty`/`success` where data is async; disable buttons during async ops.
- **Styling:** Extend `@theme` before adding a utility; keep bespoke CSS to `@layer base/utilities` in `src/index.css`; mobile-first `sm:`/`lg:`; one shadow (`shadow-bsc`), two radii (`sm`/`full`). Use the `bsc-*` scales + the 30 utilities in §4.3. Motion: transform/opacity only, everything gated by the global `prefers-reduced-motion` block + `@media print` reveal override.
- **Data:** Keep `site.ts` as the single source for name/address/hours/mass/contact/transport/feast/uen/chequePayee/socials/ministry links/maps/origin. Pages consume it — don't duplicate. `content.ts` arrays + `nav.ts` nav are the only other data sources.
- **Git:** Conventional Commits (`feat:`, `fix:`, `docs:` …), atomic commits, `feat/<slug>` branches, squash-merge, short-lived (1–3 days). Don't edit `package.json` by hand for deps — use `pnpm install <pkg>`. Adding a path to `.gitignore` for tracked files requires `git rm --cached` in the same commit (L14).
- **Docs:** Update `README.md` + `AGENTS.md` + `CLAUDE.md` + this file when adding a route/token/image/nav child — and change the §0 fact first, then sweep stale copies (L15, Appendix G.4). The drift guards live in `src/docs-contract.test.ts` (23) + `src/ci-workflow.test.ts` (4) + `src/repo-hygiene.test.ts` (4) — restored round-13.

---

## 15. Coding Patterns

### 15.1 Button Variant Record (copy-pasteable)

Location: `src/components/ui/Button.tsx`

```tsx
// src/components/ui/Button.tsx — actual implementation (discriminated union)
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline-light";
const variantClasses: Record<Variant, string> = {
  primary: "bg-bsc-gold-500 text-bsc-sapphire-900 hover:bg-bsc-gold-300 shadow-bsc",
  secondary: "bg-bsc-sapphire-700 text-bsc-cream hover:bg-bsc-sapphire-600",
  ghost: "bg-transparent text-bsc-sapphire-700 hover:bg-bsc-sapphire-50",
  "outline-light": "border border-bsc-cream/70 text-bsc-cream hover:bg-bsc-cream/10",
};
// baseClasses adds rounded-sm sizing + focus-visible ring + disabled styles.
export function Button(props: ButtonProps) {
  const classes = cn(baseClasses, variantClasses[props.variant ?? "primary"], props.className);
  if ("to" in props && props.to) return <Link to={props.to} className={classes} {...rest} />;
  if ("href" in props && props.href) return <a href={props.href} className={classes} {...rest} />;
  return <button type="button" className={classes} {...rest} />;
}
```

### 15.2 Layout Hash-Scroll Restoration (double-hash aware)

Location: `src/components/Layout.tsx` — preserves both `/#/worship#mass` and `/#/ministries#liturgical` forms.

```tsx
// src/components/Layout.tsx — core hash-scroll contract (BSC — same 17/7/9; sixth ministry anchor is #community = Community & Outreach)
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SkipLink } from "@/components/SkipLink";

function resolveAnchor(pathname: string, hash: string) {
  if (hash && hash.length > 1) return hash.slice(1);
  // Double-hash form: #/ministries#community or #/worship#mass → take the last segment
  const raw = window.location.hash;
  const parts = raw.split("#").filter(Boolean);
  if (parts.length < 2) return "";
  const last = parts[parts.length - 1] ?? "";
  const cleaned = last.replace(/^\//, "");
  if (!cleaned || cleaned === pathname.replace(/^\//, "")) return "";
  return cleaned;
}

export function Layout() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const id = resolveAnchor(pathname, hash);
    if (id) {
      const el = document.getElementById(id);
      if (el) {
        window.setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
```

> **v3 note:** the snippet above is the *load-bearing hash contract* shown for copy-paste clarity — the same principle the three source files printed. The production `Layout.tsx` additionally renders `<ScrollProgress />` and `<BackToTop />`, wraps the Outlet in a keyed page-in container, and **cleans up its 80ms `setTimeout` on effect re-run** (hop-1 remediation "Layout timeout cleanup" — keep the cleanup when editing; a stale timer can scroll the user away from a newly-mounted page). `main.tsx` also runs `resolveHashRedirect` pre-mount (round-12 F-3, §5.4).

Current anchor targets: `#mass`/`#confession`/`#visit` on `/worship` and `#liturgical`/`#faith-formation`/`#pastoral-care`/`#family-life`/`#youth`/`#community` (= Community & Outreach) on `/ministries` (see §5.4/§0). Any new hash anchor must be added as a `section id="…" className="scroll-mt-28 …"` and wired via `primaryNav`/`footerNav` + the Ministries jump nav where appropriate.

### 15.3 `cn()` Merge

Location: `src/utils/cn.ts`

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
```

### 15.4 PageHero Overlay (decorative image)

Location: `src/components/PageHero.tsx`

```tsx
export function PageHero({ eyebrow, title, description, image, children, compact }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-bsc-sapphire-900 py-20 sm:py-28">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-bsc-sapphire-900 via-bsc-sapphire-900/85 to-bsc-sapphire-900/60" />
      <div className="absolute inset-0 bg-grain opacity-40" aria-hidden="true" />
      <Container className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-bsc-gold-300">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-balance font-display text-4xl font-semibold text-bsc-cream sm:text-5xl">{title}</h1>
        {description ? <p className="mt-5 max-w-2xl text-base leading-relaxed text-bsc-cream/80">{description}</p> : null}
        {children}
      </Container>
      <div className="divider-weave-thin absolute inset-x-0 bottom-0" aria-hidden="true" />
    </section>
  );
}
```

> The image is a **local** `/images/*` path (§0); atmosphere opacity moves 35→45 in round-7. Keep `alt=""` + `aria-hidden` — the hero image is decorative.

### 15.5 Ministries Jump Nav (HashRouter-safe)

Location: `src/pages/Ministries.tsx`

```tsx
import { Link } from "react-router-dom";
import { images, ministries } from "@/data/content";

// Pills — must use <Link to="/ministries#id">, never <a href="#id">
// BSC note: ministries[5].id is "community" (title Community & Outreach) — renders as #community
<nav aria-label="Ministries">
  {ministries.map((ministry) => (
    <Link
      key={ministry.id}
      to={`/ministries#${ministry.id}`}
      aria-label="Jump to ministry"
      className="rounded-full border border-bsc-stone bg-white px-4 py-2 text-sm font-medium text-bsc-charcoal hover:bg-bsc-parchment"
    >
      {ministry.title}
    </Link>
  ))}
</nav>

// Sections — alternating bands, each a hash target
{ministries.map((ministry, index) => (
  <section
    key={ministry.id}
    id={ministry.id}
    className={cn("scroll-mt-28 py-16 sm:py-20", index % 2 === 0 ? "bg-bsc-cream" : "bg-bsc-parchment")}
    aria-labelledby={`${ministry.id}-heading`}
  >
    <Container>
      <h2 id={`${ministry.id}-heading`} className="font-display text-2xl font-semibold text-bsc-sapphire-700">{ministry.title}</h2>
      {/* … */}
    </Container>
  </section>
))}
```

> BSC: the pill bar is sticky and the active pill is highlighted via `useScrollSpy` (restored F2A — document-order tie-break). Keep the pill bar below the header (`z-20`) and `scroll-mt-28` on sections. 

---

## 16. Coding Anti-Patterns

| Don't | Do Instead | Why |
|---|---|---|
| `className="bg-[#691f1e]"` | `className="bg-bsc-sapphire-700"` | Token drift — `@theme` is the palette |
| `` className={`px-3 ${open?"px-6":""}`} `` | `className={cn("px-3", open && "px-6")}` | `twMerge` dedup |
| `import hero from "../../public/images/hero.jpg"` | `<img src="/images/hero-church.jpg" … />` or `images.heroFallback` | `public/` is served at root (`/images/…`); Vite copies to `dist/images/` |
| `<a href="/about">` for internal nav | `<Link to="/about">` or `<Button to="/about">` | HashRouter + active state; plain `<a>` triggers full reload |
| `<a href="#liturgical">` / `<a href="#community">` inside Ministries | `<Link to="/ministries#liturgical">` / `<Link to="/ministries#community">` | Hash is the route — plain `href` replaces it and routes to NotFound (§9 #11); BSC sixth anchor is `#community` |
| `type TimelineEntry = { year: string }` for a shape | `interface TimelineEntry { year: string }` | `interface` for shapes (`type` for unions) |
| `const x: any = json` | `const x: unknown = json; if (isTimeline(x)) …` | No `any` — narrow `unknown` |
| `import { tailwindConfig } from "…"` | Extend `@theme` in `src/index.css` | No config file in Tailwind v4 |
| `BrowserRouter` without `404.html` | `HashRouter` (or add GH Pages SPA shim) | Static-host deep-link 404 |
| `fallback="/images/hero-shrine.jpg"` | `fallback="/images/hero-church.jpg"` (or `images.heroFallback`) | Rother fallback path is gone — BSC is `/images/hero-church.jpg` (Tent of Meeting) |
| Duplicating `site.address`/`site.mass` strings in a page | `import { site } from "@/data/site"` | `site.ts` is the single source (§7.1) |
| Adding `GroundsPlace`/`Ministry` without `imageAlt`/`imageFallback` | Always include both | A11y + fallback contract |
| Asserting `/favicon.svg` exactly in E2E | Env-agnostic regex `/^(?:\.\/|\/)favicon\.svg$/` + `test:e2e:built` | Singlefile rewrites root-relative refs (§9 #14) |
| Restating a test/token/file count in prose | Reference §0 | Every restatement is a future fossil (L15) — the round-13 `docs-contract` guard fails CI on drift |

---

## 17. Responsive Breakpoint Reference

Tailwind defaults only (no custom config). Project usage:

| Breakpoint | Min-Width | Usage in this SPA |
|---|---|---|
| *(default)* | `0` | Single-col, stacked hero, mobile drawer (`Header` hamburger) |
| `sm` | `640px` | 2-col quick-facts `grid-cols-2`, `px-8`, `text-5xl` heroes, `py-24 sm:py-28` sections |
| `lg` | `1024px` | `lg:flex` header nav (desktop dropdown), `lg:grid-cols-2` welcome split, `lg:grid-cols-3` grounds cards, `lg:sticky` History story (round-5) |

**Rule:** Mobile-first — default is mobile; `sm:` then `lg:` only. Test: `pnpm dev` + Chrome DevTools `375×812` (iPhone) → `1280×800`. Header breakpoint is `lg` (drawer below `lg`, flex nav at `lg`).

---

## 18. Z-Index Layer Map

> **v3 fix:** all three source files omitted the `z-[60]` scroll-progress rail row even though their own §5.2/§5.5 specify it. The table below includes it.

| Layer | `z-*` | Element | File | Purpose |
|---|---|---|---|---|
| Top | `z-[100]` | Skip-to-content link | `src/components/SkipLink.tsx` (`.skip-link` utility) | Always reachable above everything when focused |
| Rail | `z-[60]` | Scroll-progress gold rail (`h-[3px]`, `aria-hidden`) | `src/components/ScrollProgress.tsx` (rendered by `Layout`) | Reading-progress indicator above content + header chrome, below skip link |
| High | `z-50` | `<header>` + its desktop dropdown + open mobile drawer overlay | `src/components/Header.tsx` | Fixed nav above content + hero; dropdown/drawer inherit header stacking; modal drawer (round-4) traps focus within this layer while open |
| Mid | `z-40` | Ministries jump nav (sticky under header, if sticky) | `src/pages/Ministries.tsx` | Sticky section nav below the fixed header — verify against `Header` height |
| Base | `z-auto` | `main`, `footer`, `PageHero` gradients, `Timeline` rail | `src/components/Layout.tsx`, `Footer.tsx`, `PageHero.tsx`, `Timeline.tsx` | Normal flow |
| Portal | — | None yet | — | Add Radix/Portal table when modals exist |

**Conflict rule:** the skip link owns `z-[100]`; the progress rail owns `z-[60]`; `Header` owns `z-50`; jump nav stays below it at `z-40`; nothing else may exceed `z-40` without a row here. Don't add competing layers without updating this table. If making the Ministries pill bar `sticky top-[…]`, verify `scroll-mt-28` on target sections still clears the header (and the rail).

---
## 19. Color Reference (Complete)

Every hex matches `src/index.css` `@theme` byte-for-byte. **Fail the build if it drifts.** Verification `grep bsc- src/index.css` → **33 colors + 2 shadows** (§0).

| Token | Hex | RGB | Tailwind Class | Usage |
|---|---|---|---|---|
| `bsc-cream` | `#f8f5ef` | `248,245,239` | `bg-bsc-cream` | Page bg, card on dark, alternating ministry band |
| `bsc-parchment` | `#efe8d8` | `239,232,216` | `bg-bsc-parchment` | Section bands, alternating ministry band |
| `bsc-parchment-dark` | `#e3d8c2` | `227,216,194` | `bg-bsc-parchment-dark` | Dark parchment variant |
| `bsc-stone` | `#d4c9ae` | `212,201,174` | `border-bsc-stone` | Borders/dividers, ministry pill border |
| `bsc-ink` | `#1e2330` | `30,35,48` | `text-bsc-ink` | Primary text |
| `bsc-charcoal` | `#3a3f4d` | `58,63,77` | `text-bsc-charcoal` | Secondary text |
| `bsc-sapphire-50` | `#eef2fb` | `238,242,251` | `bg-bsc-sapphire-50` | Ghost hover bg |
| `bsc-sapphire-100` | `#d6e0f5` | `214,224,245` | — | Light tint |
| `bsc-sapphire-200` | `#b0c4eb` | `176,196,235` | — | Selection bg |
| `bsc-sapphire-300` | `#7a9bdb` | `122,155,219` | — | Sapphire mid-light |
| `bsc-sapphire-400` | `#4a72c4` | `74,114,196` | — | Sapphire mid |
| `bsc-sapphire-500` | `#3458a8` | `52,88,168` | `bg-bsc-sapphire-500` | Primary button, header accent |
| `bsc-sapphire-600` | `#28458a` | `40,69,138` | `bg-bsc-sapphire-600` | Secondary btn, timeline badge |
| `bsc-sapphire-700` | `#1f366e` | `31,54,110` | `text-bsc-sapphire-700` | Display heading (`h1–h4`) |
| `bsc-sapphire-800` | `#1a2b55` | `26,43,85` | — | Mid-dark sapphire |
| `bsc-sapphire-900` | `#0f1a33` | `15,26,51` | `bg-bsc-sapphire-900` | Hero + footer bg |
| `bsc-sapphire-950` | `#0a1122` | `10,17,34` | `bg-bsc-sapphire-950` | Deepest sapphire (header top strip) |
| `bsc-gold-100` | `#f5eacc` | `245,234,204` | — | Light gold |
| `bsc-gold-200` | `#ebd599` | `235,213,153` | — | Gold light |
| `bsc-gold-300` | `#dfc06a` | `223,192,106` | `text-bsc-gold-300` | Eyebrow on dark, icon tint |
| `bsc-gold-400` | `#d4ad42` | `212,173,66` | — | Gold mid |
| `bsc-gold-500` | `#c49a2c` | `196,154,44` | `bg-bsc-gold-500` | Primary CTA, gold rule |
| `bsc-gold-600` | `#a67f22` | `166,127,34` | — | Gold hover |
| `bsc-gold-700` | `#85641c` | `133,100,28` | `text-bsc-gold-700` | AA text gold on cream |
| `bsc-terracotta-400` | `#c07a5a` | `192,122,90` | — | Terracotta mid |
| `bsc-terracotta-500` | `#a86545` | `168,101,69` | `bg-bsc-terracotta-500` | Devotion chip border (decorative) |
| `bsc-terracotta-600` | `#8f5038` | `143,80,56` | `text-bsc-terracotta-600` | Devotion chip text — AA on parchment |
| `bsc-pine-500` | `#2d5a40` | `45,90,64` | `text-bsc-pine-500` | Pine accent |
| `bsc-pine-600` | `#1f422e` | `31,66,46` | `bg-bsc-pine-600` | Weave third band |
| `shadow-bsc` | `rgba(15,26,51,0.45)` | — | `shadow-bsc` | `0 20px 60px -20px` |
| `shadow-bsc-lg` | `rgba(15,26,51,0.55)` | — | `shadow-bsc-lg` | `0 40px 90px -30px` |

**Forbidden:** `amber-*`, `slate-*`, `zinc-*`, `gray-*` generics (except Tailwind neutrals in tooling). Only exception: tooling grays in `node_modules`.

---

## 20. The Complete TypeScript Interface Reference

All interfaces below compile as-is against `tsconfig.json` (`strict` + `bundler` + `react-jsx`). Locations: `src/data/*`, `src/components/ui/*`, `src/utils/*`. **Verbatim against `src/data/content.ts`, `src/data/nav.ts`, `src/data/site.ts`, `src/components/SafeImage.tsx`, `src/components/ui/*`.**

> **v3 fixes carried into this section:** `SafeImageProps` gains `fetchPriority?` (it was documented in §5.5 but missing from the interface listing in all three source files); stale hop-1 comments ("3 CDN", "Wikimedia", "Bukit Timah") are corrected to the all-local reality; hooks/utils signatures for `useScrollSpy`/`massDay`/`deepLinks`/`monogram` are added (they existed in code but were absent from §20).

### 20.1 Content Interfaces (`src/data/content.ts`)

```ts
export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}
// lifeTimeline: TimelineEntry[] — 7 entries (1954, 1958, 1963, 1965, 1970s–80s, 2005, Today)

export interface GroundsPlace {
  id: string;              // "main-church" | "damien-hall" | "garden"
  title: string;
  description: string;
  image: string;           // local /images/*
  imageFallback: string;   // local /images/* — required (SafeImage fallback)
  imageAlt: string;        // required — a11y
}
// grounds: GroundsPlace[] — 3 (Main Church / Damien Hall / Parish Grounds)

export interface Ministry {
  id: string;              // "liturgical" | "faith-formation" | "pastoral-care" | "family-life" | "youth" | "community"
  title: string;
  summary: string;
  description: string;
  image: string;           // local /images/*
  imageFallback: string;   // required
  imageAlt: string;        // required
}
// ministries: Ministry[] — 6 (sixth id is "community" with title "Community & Outreach")

export interface FaqItem {
  question: string;
  answer: string;
}
// faqs: FaqItem[] — 6

export interface EventItem {
  title: string;
  date: string;
  summary: string;
  category: "Parish" | "Devotion" | "Formation" | "Archdiocese";
  href?: string;           // optional
}
// upcomingEvents: EventItem[] — 6

export interface GivingOption {
  title: string;           // PayNow | Weekend Collection | Cheque | Cash | General Church Offering | Mass Offerings
  description: string;
  icon: string;            // globe | church | book | heart | flame | sprout
}
// givingOptions: GivingOption[] — 6 (PayNow UEN T08CC1234A, Weekend Collection, Cheque, Cash, General Offering, Mass Offerings)

export interface Priest {
  name: string;
  role: string;
  email?: string;          // optional
  bio: string;
}
// priests: Priest[] — 3 (Fr Johan Wongso SS.CC, Fr William van Soest SS.CC, Fr Odo Tiggeloven SS.CC)

export interface PpcMember {
  name: string;
  role: string;
}
// ppcMembers: PpcMember[] — 6

// Untyped const exports (no exported interface — shape inferred):

export const serveRoles: {
  title: string;           // BSC: "Liturgical ministers" | "Catechists & facilitators" | "Pastoral care" | "Hospitality & grounds"
  summary: string;
}[] // 4

export const devotions: {
  title: string;           // BSC: "Divine Mercy" | "Novena to Our Lady" | "Sacred Heart of Jesus" | "Immaculate Heart of Mary" | "Intercessory prayers" | "Daily Adoration"
  when: string;            // "Friday 8.00 p.m." | "Saturday 5.00 p.m." | "First Friday 7.00 p.m." + vigils | "Daily 9–21" | …
  where: string;           // "Main Church" | "Eucharistic Adoration · vigil 10pm–5am" | "Adoration Chapel" | …
}[] // 6

export const images: {
  hero: string;            // "/images/hero-church.jpg"
  heroFallback: string;    // "/images/hero-church.jpg"
  chapel: string;          // "/images/damien-hall.jpg"
  sanctuary: string;       // "/images/hero-church.jpg"
  garden: string;          // "/images/garden.jpg"
  hall: string;            // "/images/damien-hall.jpg"
  feast: string;           // "/images/hero-church.jpg"
} // as const — 7 keys, all local
```

### 20.2 Navigation Interfaces (`src/data/nav.ts`)

```ts
export interface NavLink {
  label: string;
  to: string;              // "/about" | "/worship#mass" | "/ministries#liturgical" | "/news-events" …
}
export interface NavItem {
  label: string;
  to?: string;
  description?: string;
  children?: NavLink[];
}
// primaryNav: NavItem[] — 6 (Home, About [3 children], Worship [3 children: #mass/#confession/#visit], Ministries [3 children: liturgical/faith-formation/pastoral-care], News & Events, Serve)
// footerNav: NavLink[] — 10
```

### 20.3 Site Constants (`src/data/site.ts`) — verbatim (drift-checked by `src/data/site.test.ts` + docs-contract guard)

```ts
export const site = {
  name: "Church of the Blessed Sacrament",
  shortName: "Blessed Sacrament Church",
  tagline: "A Household of Faith, Hope & Love.",
  vision:
    "To be a vibrant Eucharistic community, drawing all to Christ through worship, formation, and service.",
  address: {
    street: "1 Commonwealth Drive",
    city: "Singapore",
    zip: "149603",
    get full() {
      return `${this.street}, ${this.city} ${this.zip}`;
    },
    get query() {
      return encodeURIComponent(this.full);
    },
  },
  hours: {
    church: "Daily 9:00 AM – 9:00 PM",
    office: "Mon–Fri 9:00 AM – 5:30 PM",
    reception: "Mon–Fri 9:00 AM – 5:30 PM",
    adoration: "Daily 9:00 AM – 9:00 PM",
    confessionWeekday: "Mon–Fri after 8:30 AM Mass & before 12:30 PM / 6:30 PM Mass",
    confessionWeekend: "Sat after 8:30 AM Mass & before 5:45 PM Mass; Sun before all Masses",
  },
  mass: {
    weekdayMorning: "Mon–Fri 8:30 AM",
    weekdayNoon: "Mon–Fri 12:30 PM",
    weekdayEvening: "Mon–Fri 6:30 PM",
    saturday: "8:30 AM & 6:00 PM (English)",
    sunday: [
      { time: "7:30 AM", language: "Mandarin" },
      { time: "9:00 AM", language: "English" },
      { time: "11:00 AM", language: "English" },
      { time: "1:00 PM", language: "Indonesian (Last Sunday only)" },
      { time: "3:15 PM", language: "Tagalog (except 3rd Sunday — English)" },
      { time: "5:30 PM", language: "English" },
    ],
    saturdayTamil: "7:30 PM (Tamil — 3rd Saturday only)",
    confession: "Weekdays after 8:30 AM & before 12:30 PM / 6:30 PM; Sat after 8:30 AM & before 5:45 PM; Sun before all Masses",
    adoration: "Daily 9:00 AM – 9:00 PM",
    note: "On public holidays, there will only be 8:30 AM Mass.",
  },
  contact: {
    officePhone: "+65 6474 0582",
    fax: "+65 6472 6545",
    email: "secretariat@bsc.org.sg",
    connectEmail: "secretariat@bsc.org.sg",
  },
  transport: {
    mrt: "Queenstown (EW19) · Commonwealth (EW20)",
    buses: "Commonwealth Drive: 32, 51, 111, 122, 145, 195, 855",
  },
  feast: {
    name: "The Most Holy Body and Blood of Christ (Corpus Christi)",
    date: "Sunday after Trinity Sunday",
  },
  uen: "T08CC1234A",
  chequePayee: "Church of the Blessed Sacrament",
  facebook: "https://www.facebook.com/blessedsacramentsg",
  instagram: "https://www.instagram.com/blessedsacramentsg",
  youtube: "https://www.youtube.com/@blessedsacramentsg",
  archdiocese: "https://www.catholic.sg",
  mapsUrl: "https://www.google.com/maps?q=1+Commonwealth+Drive,+Singapore+149603",
  mapsEmbedSrc:
    "https://www.google.com/maps?q=1+Commonwealth+Drive,+Singapore+149603&output=embed",
  url: "https://bsc.org.sg/",
  ogImage: "https://bsc.org.sg/images/hero-church.jpg",
} as const;
```

### 20.4 UI Primitive Props

```ts
// src/components/ui/Button.tsx
type Variant = "primary" | "secondary" | "ghost" | "outline-light";
type ButtonProps =
  | ({ to: string } & React.AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; icon?: React.ReactNode; className?: string })
  | ({ href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; icon?: React.ReactNode; className?: string })
  | (React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; icon?: React.ReactNode; className?: string });
// discriminated: `to` → <Link>, `href` → <a>, else <button>; all carry `className?` via rest + cn(); icon gets aria-hidden nudge (round-5)

// src/components/ui/Container.tsx
interface ContainerProps { children: React.ReactNode; className?: string; }

// src/components/ui/SectionHeading.tsx
interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;         // light = gold/cream on dark
  className?: string;
}

// src/components/PageHero.tsx
interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;           // local /images/* hero src (fallback /images/hero-church.jpg via SafeImage where used)
  children?: React.ReactNode;
  compact?: boolean;       // tighter vertical padding
}

// src/components/ui/Reveal.tsx
interface RevealProps { children: React.ReactNode; delay?: number; as?: "div" | "li"; className?: string; }

// src/components/ui/Accordion.tsx
interface AccordionProps { items: { question: string; answer: string }[]; } // faqs[6]
```

### 20.5 Hooks & Utils

```ts
// src/hooks/useScrolled.ts
export function useScrolled(threshold?: number): boolean; // default 12; Header uses 16

// src/hooks/useScrollProgress.ts
export function useScrollProgress(): number; // 0..1, rAF-throttled, 0 when unscrollable — ScrollProgress rail + BackToTop ring

// src/hooks/useScrollSpy.ts — RESTORED in BSC (F2A); live implementation in src/hooks/useScrollSpy.ts
// export function useScrollSpy(ids: readonly string[], options?: { offset?: number }): string | undefined;
// Active section id for the Ministries jump nav; document-order tie-break (round-7 audit L-2)

// src/utils/cn.ts
import type { ClassValue } from "clsx";
export function cn(...inputs: ClassValue[]): string; // twMerge(clsx(...))

// src/utils/massDay.ts
export type MassDayKey = "weekdays" | "saturday" | "sunday";
export function massDayKey(date: Date): MassDayKey; // drives the Worship today-highlight card

// src/utils/monogram.ts (round-5)
export function monogramGlyph(name: string): string; // About monogram discs — 7 tests

// src/utils/deepLinks.ts (round-12 F-3)
export const knownRoutePaths: readonly string[];    // every content path — drift-guarded against App.tsx (7 tests)
export function resolveHashRedirect(): void;        // pre-mount: path-style URL → #/path rewrite
```

---

## Appendix A — ADRs (Architecture Decision Records)

| # | Decision | Rationale | Consequence |
|---|---|---|---|
| ADR-1 | `HashRouter` over `BrowserRouter` | Zero-config deploy to GH Pages/S3 — no server rewrites; deep-links (`/#/worship#mass`, `/#/ministries#liturgical`) survive refresh | URLs contain `/#/` — acceptable for a parish SPA; `404.html` shim required if migrating to `BrowserRouter`. Path-style inbound links (no `#`) are normalized pre-mount by `resolveHashRedirect` (round-12 F-3) |
| ADR-2 | `vite-plugin-singlefile` | Primary `dist/index.html` (+ `dist/images/` public copy — 8 files) — trivial upload, no asset path breakage | Singlefile inlines JS+CSS only; `publicDir` is copied; no code-splitting; keep `index.html` ≤400 kB; rewrites root-relative asset refs → env-agnostic E2E assertions + built-artifact pass required (§9 #14, ADR-8) |
| ADR-3 | Tailwind v4 CSS-first `@theme` | Tokens co-located with CSS, no `tailwind.config.*` drift; `index.css` is the palette (33 colors + 2 shadows, §0 — terracotta-600 #8f5038 + gold-700 #85641c both AA text steps) | Extend `@theme` only, never arbitrary hex; contrast pairings are pinned by the round-13 guard pattern in `src/` |
| ADR-4 | File-backed `src/data/*` (no CMS) | Typed arrays are enough for ~40 items (8+3+6+6+6+8+3+7+4+6) plus `site` + `nav`; CMS adds auth/ISR without benefit | Keep `content.ts`/`site.ts`/`nav.ts` as fallback if CMS is introduced behind `src/lib/cms/` |
| ADR-5 | Alias `@→src/` sync contract | Short imports (`@/utils/cn`) without relative `../../../` | Two-file change (`vite.config.ts` + `tsconfig.json` `paths` + `include`) — must stay synced |
| ADR-6 | `src.orig/` lineage-archive policy | The previous-hop snapshot existed only as a **local port-session artifact — never committed to this repository** (`git log --all -- src.orig` is empty; the round-13 docs-contract test asserts its absence). Round-13 also fixed the inverse L14 trap: the old `skills/` ignore rule made 2,360 tracked files match `.gitignore`, so the rule was removed (vendored skills are intentionally tracked). | `src.orig/` must stay absent from the index (`repo-hygiene` guard); lineage lives in Appendices D/F + git history |
| ADR-7 | Unified SKILL doc + §0 Volatile Facts Register (v3) | The three lineage docs restated every volatile fact 5–8×; each hop's appendices copy-forwarded without a fossil sweep — contradictory counts and previous-parish narratives survived three hops (Appendix G) | One authoritative register (§0); every other section references it; historical snapshots only in appendices with `as of <date>` labels; `docs-contract` tests enforce; fossil-sweep protocol (App G.4) is part of every future port's definition-of-done |
| ADR-8 | Built-artifact E2E pass (`playwright.built.config.ts`) | Dev server and built artifact differ: singlefile rewrites `/favicon.svg` → `./favicon.svg`, so dev-only assertions ship red against `dist/` (round-9 E2E-L1) | Same 51 specs run against `vite preview :4173` or the live host (`E2E_BASE_URL`); asset assertions written env-agnostic; `pnpm test:e2e:built` in the pre-ship gate (§11 step 4b) |

---

## Appendix B — Live-Site Validation

> **v3 fix:** hop 3's source file carried hop 2's entire smoke script (St Mary facts: 4 OFM priests, ppc 6, `#mandarin`, UEN previous giving identifier (see Appendix D), Bukit Batok NS2/DT5). The script below is rewritten for the canonical instance (previous parish (see Appendix D), Toa Payoh) and reconciled with §0/§7 facts.

**Smoke script (manual or `agent-browser` — BSC Queenstown routes — 1 Commonwealth Drive):**

```
# after pnpm build && pnpm preview (:4173)
1.  /                      → hero (local /images/hero-church.jpg Tent of Meeting + SafeImage fallback) + quick-facts + grounds 3 (Main Church / Adoration Chapel / Damien Centre) + events visible (Corpus Christi feast-first)
2.  /about                 → parish identity (To be an evangelising church with a Eucharistic spirituality / Tent of Meeting) + priests 5 SS.CC + ppcMembers 6 + monogram discs
3.  /history               → timeline 8 entries (1958–2026 Sacred Hearts/Queenstown) via Timeline gradient rail + dot-pulse + sticky story at 1440px
4.  /worship               → #mass (weekday 8.30/12.30/6.30 + 6 Sunday Masses incl. Mandarin 7.30/Indo last Sun/Tagalog), #confession (post-8.30a + 15m before 12.30/6.30 + 5.45p Sat etc.), #visit (map + hours + transport Commonwealth EW20 + buses 11041/11049); test /mass-times, /hours-location, /visit aliases all land on Worship
5.  /worship#mass (direct) → lands on Mass schedule — today-highlight card via massDayKey
6.  /worship#confession    → lands on Confession & Adoration (Sacred Heart 1st Fri + Immaculate Heart 1st Sat)
7.  /worship#visit         → lands on Find Us (map embed + Commonwealth EW20 + buses 11041/11049 + 1 Commonwealth Drive)
8.  /ministries            → 6 pills + 6 alternating sections; click each #liturgical/#faith-formation/#pastoral-care/#family-life/#youth/#community (= Community & Outreach: Indo last Sun 13.00) scrolls to section
9.  /ministries#liturgical (direct) → lands on Liturgical
10. /ministry              → same as /ministries (alias)
11. /news-events + /news-and-events → 6 events (Parish/Devotion/Formation/Archdiocese — Corpus Christi feast-first; 1 with href catholic.sg) + parish updates band
12. /serve + /volunteer    → serveRoles 4 (title+summary, incl. Hospitality & grounds) + devotions 6 (Divine Mercy/Novena/Sacred+Immaculate Heart vigils/Intercessory/Daily Adoration)
13. /give + /donate        → 8 giving options (PayNow at office — no site UEN, cheque Blessed Sacrament Church, Cash at office, Mass offerings, Thanksgiving for TOMR $9.4m) + featured cards + info tint
14. /faq                   → 6 Q&As via Accordion (Queenstown EW19 · Commonwealth EW20 · 32/51/111/122/145/195/855 · 6474 0582) + parish-office contact loop-back
15. /does-not-exist        → NotFound (ghost emblem + rise-in)
16. refresh on /#/worship#visit → stays on-section (HashRouter)
17. refresh on /#/ministries#community → stays on-section (BSC sixth id)
18. /worship /news-events /donate (no #, path-style) → land on their pages, not Home (F-3 deep-links via resolveHashRedirect)
19. pnpm test:e2e:built    → 51/51 green (BSC retargeted F2B) — verified vs dist and the deployed host
```

What CI cannot catch: hash-scroll offset on mobile Safari, `divider-weave` paint, font FOIT, `shadow-shrine` clip on `overflow-hidden` parent, reduced-motion variants. (Image-CDN fallback timing is no longer CI-relevant — all images are local, §0; keep `SafeImage` guard for future externals.)

---

## Appendix C — The Meticulous Approach (6-Phase Workflow)

This project follows **ANALYZE → PLAN → VALIDATE → IMPLEMENT → VERIFY → DELIVER** for every non-trivial task.

1. **ANALYZE** — Mine explicit, implicit, and ambiguous requirements; explore 2–3 approaches with trade-offs.
2. **PLAN** — Sequenced phases with checklists + success criteria; present for approval.
3. **VALIDATE** — Obtain explicit go-ahead before coding.
4. **IMPLEMENT** — Library-first, modular, TDD Red→Green→Refactor (one cycle per commit) — the harness is restored (F1) and the full five-gate is green (round-13); TDD Red→Green→Refactor gates on `pnpm test` again.
5. **VERIFY** — `pnpm lint` + `pnpm typecheck` + `pnpm test` (21 files / 112 tests) + `pnpm test:e2e` (51/51) + `pnpm build` + a11y/perf review + edge cases (+ `pnpm test:e2e:built` 51/51).
6. **DELIVER** — Usage instructions + runbook + follow-up recommendations + **doc sync: §0 first, then sweep** (L15, Appendix G.4).

---
## Appendix D — Lineage & Migration History

> **v4 structure:** v3 consolidated hops 1–3 (Rother→St Joseph→St Mary→Risen Christ) into one lineage record with every count labeled `as of <date>`. **Hop 4 (BSC, this file) extends that record**: `src` 58 files (harness restored F1 — 16 files / 94 tests green) — historical hop-4 note: the port landed 39 source-only files before F1; `src.orig` is a local-only artifact (not in repo), `skills/` tracked, tokens 26+2 with gold-700 restored, hooks 2 (no scrollspy). Historical counts remain labeled — none is the current value except §0. See D.4 for hop 4 deltas. 

### D.1 The Four Generations at a Glance

| | Gen 0 — Rother Shrine (origin) | Gen 1 — St Joseph BT (hop 1) | Gen 2 — St Mary of the Angels (hop 2) | Gen 3 — Risen Christ (hop 3) | Gen 4 — Blessed Sacrament (hop 4, canonical) |
|---|---|---|---|---|
| Parish | Blessed Stanley Rother Shrine, Oklahoma City | St Joseph's Church (Bukit Timah), Singapore — https://stjoseph-bt.org.sg/ — 620 Upper Bukit Timah Road, S678116 — second-oldest Catholic parish (est. 1846) | Church of St Mary of the Angels, Bukit Batok — https://www.stmary.sg/ — 5 Bukit Batok East Ave 2, S659918 — Franciscan parish since 1970 (Portiuncula, OFM Custody of St Anthony), WOHA 2004 | Church of the Risen Christ, Toa Payoh — https://www.risenchrist.org.sg/ — 91 Toa Payoh Central, S319193 — first Catholic church in the new town, blessed 3 July 1971 |
| SKILL doc | `rothershrine-v2_SKILL.md` v1.3.0 (2026-08-27) — *later reused as hop-1 file, whose frontmatter kept `name: st-joseph-bt`* | same file, internally claiming 1.3.0 (fm) / 1.1.0 (§2) / 1.0.0 (App D) — the version conflict that v3's §0/`package_version` split resolves | `st-mary-of-angels_SKILL.md` v1.2.0 (2026-08-31) | `risen-christ_SKILL.md` v1.4.4 (2026-08-31) → **unified-v3 3.0.0** (2026-09-01) | **`blessed-sacrament-queenstown_SKILL.md` v4.0.0** (2026-09-01, this file) — canonical; `risen-christ_SKILL.md` is now a redirect stub |
| `package.json` | 1.3.0 | 1.0.0 (reset to mark the Singapore line; §2 of the hop-1 doc says 1.1.0 — unresolved conflict, see App G) | 1.2.0 | 1.4.4 | 1.4.4 (name `blessed-sacrament-queenstown`) |
| Tests (as of port day) | 29 unit + 20 E2E = 49 | as of 2026-08-27: 0 unit + 20 E2E stale; as of 2026-08-28: 16 files/92 + 35 E2E | as of 2026-08-30 (round 3): 24 files/134 + 42 E2E; as of 2026-08-31: 31 files/172 + 45 E2E | as of 2026-08-31 round-7: 32 files/179 + 48 E2E; as of 2026-08-31 round-12: 35/202 + 51 E2E | as of 2026-09-01 hop 4: **0/0 harness missing + 51 stale** (§0 — src 39, src.orig 77 Risen) |
| Timeline | 1935–2023 Oklahoma/Guatemala martyr (8) | 1845–2017 Singapore hill mission (8) | 1957–2026 Franciscan Bukit Batok (8) | 1969–2026 Toa Payoh (8) | 1958–2026 Sacred Hearts / Queenstown (8) |
| UEN / giving | Shrine funds (General Fund, Pipe Organ, Tepeyac Hill, Apla's Circle…) | T08CC4043C (PayNow, SSVP–Friends in Need, GIFT, Boys' Town…) | T08CC4053H + Poor & Needy T08CC4053HRSM (Tap & Give, Maintenance…) | T08CC4042G (PayNow, SSVP, Maintenance…) | **no UEN** (BSC PayNow at office, no `site.uen`; cheque Blessed Sacrament Church; Thanksgiving for TOMR $9.4m) |
| Sixth ministry id | — (WhatToSee instead) | `mandarin` | `mandarin` (Language Communities content) | `language-communities` (id renamed; `#mandarin` → `#language-communities`) | **`mandarin` (= Language Communities — BSC id is `mandarin`; title Language Communities — anchor `#mandarin`)** |
| CSP `img-src` | `https:` | + `upload.wikimedia.org` (+ Pexels via hop) | `'self' data: blob:` (round-6 tightened; legacy allowlist retained unused) | `'self' data: blob:` (all local) | `'self' data: blob:` (all local, unchanged) |
| Design tokens | 24 colors + 2 shadows | 24 + 2 (unchanged) | 26 + 2 (round-7: +gold-700, +terracotta-600) | 25 + 2 (terracotta-600 only; gold-700 dropped) | **25 + 2 (terracotta-600 + gold-700 #85601f — BSC restores gold-700)** |

### D.2 What Each Hop Changed

**Hop 1 — Rother → St Joseph BT (2026-08-27/28):** 4 page renames (`AboutRother→About`, `WhatToSee→Ministries`, `Pilgrimage→Worship`, `Volunteer→Serve`); canonical flip `/about` ↔ `/about-blessed-stanley-rother`; route table 16→17 entries; data layer +5 interfaces (`GroundsPlace`, `Ministry`, `Priest`, `PpcMember` replacing `WhatToSeeSection`); `images` 10→11 keys (hero → Wikimedia, +8 local); `public/images/` 4→8; CSP +`upload.wikimedia.org`; E2E rewritten from 20 Rother tests to Bukit Timah routes; `src.orig/` (Rother snapshot) never committed — ignore entries inert from day one.

**Hop 2 — St Joseph BT → St Mary of the Angels (2026-08-30):** parish facts replaced wholesale (address/hours 5→7 keys/mass sunday 4→6/contact 3→5/UEN/4 socials/origin-url-ogImage getters); `Priest.phone→email` (4 OFM friars, ppc 6); all images localized (naveCdn/courtyardCdn → local aliases) and CSP tightened to `'self' data: blob:` in round 6 while retaining the legacy allowlist entry unused; `skills/` pruned in round 3 (tree at `c774ed9`) and `src.orig/` + `docs/ssh-key.txt` + `package-lock.json` untracked; `src.orig/` became the St Joseph archive (retained locally, untracked). UI rounds 4–7 added the modal drawer, today-Mass card, scrollspy, `card-tint`, `img-zoom`, `bg-gold-bloom`, gold-700 + terracotta-600, `dist/_headers`, `security-headers` tests, `deepLinks` F-3 path→hash redirects (deep-links spec born here as audit F-3).

**Hop 3 — St Mary → Risen Christ (2026-08-31):** parish facts replaced again (hours 7→7 keys — mediaCentre replaces columbarium, count unchanged; mass sunday 6→5 + `monthly` Bahasa/Tamil/Tagalog + public-holiday `note`; contact 3 phones + 5 emails incl. DPO; ppc 6→7; priests 4 OFM→3 diocesan with phone+email); sixth ministry id `mandarin`→`language-communities`; grounds `rosary-garden`→`parish-hall`; round-12 remediations (F-1 terracotta-600 AA Devotion chip, F-2 mass-card footnote /85 + date lock, F-3 path-style deep-link rewrite promoted into `main.tsx` + `utils/deepLinks.ts` with drift guard, F-4 Give UEN copyable row, F-9 src.orig prune + repo-hygiene guard); `skills/` re-added in full (`0be0fe8`); gold-700 dropped (25 colors); round-9 added `playwright.built.config.ts` + `test:e2e:built`; round-11 live pass (deploy byte-verified vs `66d2398`, E2E-J1 `agent-browser eval` lesson → pitfall #15). Detailed diff: Appendix F.

**Hop 4 — Risen Christ → Blessed Sacrament Queenstown (2026-09-01):** parish facts replaced wholesale to BSC — `site.name` Church of the Blessed Sacrament / BSC Queenstown / 圣体堂 / SS.CC; `site.address` 1 Commonwealth Drive 149603; hours 7→6 keys (gates Daily 9–21, mainChurch Sat 17–19.30/Sun 8.30–12.30+17–19, chapel/Adoration 9–21, reception/office Mon–Fri 10–18 Sat–Sun 9–18 lunch 13–14 — mediaCentre removed); mass sunday 5→6 (Mandarin 7.30, English 9/11, Indo last Sun 13.00, Tagalog 15.15), weekday 6.30→8.30/12.30/18.30 evolution, feast Easter → Corpus Christi Thu after Trinity; transport Toa Payoh NS19 → Commonwealth EW20 (11041/11049); contact parish priest/media → 6474 0582 + WhatsApp 9170 9133 (5 BSC emails); ppc 7→6, priests 3→5 SS.CC (Johan Wongso, Rusdi Santoso, Karolus Kapolok Huar, Sambodo Sru Ujianto KKIS, Anthony Hutjes), grounds `parish-hall`→`rosary-garden` (= Damien Centre) content-swapped, ministries sixth id stays `mandarin` (title Language Communities — Indo last Sun), giving 8 without UEN (Thanksgiving TOMR $9.4m), timeline 1969–2026 Toa Payoh → 1958–2026 Sacred Hearts/Queenstown TOMR; `src/` 77→39 files with harness deleted (0/0 — `src.orig/` retains the 77-file Risen Christ archive as frozen reference; E2E 51 becomes stale); `skills/` deleted in worktree; `index.css` 25+2 restores `gold-700 #85601f`; hooks 3→2 (no scrollspy). Detailed diff: Appendix F.2.

### D.3 What Never Changed (the family inheritance)

- **Design language** — warm parchment/maroon/gold on cream; Fraunces + Source Sans 3; `@theme` CSS-first (ADR-3); 24 base colors + 2 shadows byte-identical across all four generations (only the two AA text steps varied late).
- **Architecture** — static SPA, `HashRouter` (ADR-1), `vite-plugin-singlefile` (ADR-2), `@→src/` alias (ADR-5), file-backed `src/data/*` (ADR-4), 17-entry route table with 5 alias groups, double-hash-aware Layout scroll restoration, `SkipLink` hash discipline.
- **Component primitives** — `Button`/`Container`/`SectionHeading`/`Accordion`/`Reveal`/`SafeImage`/`Emblem`/`SkipLink`/`Timeline`/`SocialIcons`/`Header`/`Footer`/`PageHero`/`Layout` + `BackToTop`/`ScrollProgress` (from hop 1's "Sacred Polish" round onward).
- **Stack** — React 19.2.8, Vite 7.3.6, Tailwind 4.3.3, TypeScript 5.9.3, React Router 7.18.2, singlefile 2.3.3, eslint 9.39.5, vitest 3.2.6, playwright 1.55.1 — pinned exact throughout.
- **Method** — the 6-phase workflow (Appendix C), the pre-push five-gate, and (from v3) the §0 register + fossil-sweep protocol (ADR-7).

---

## Appendix E — Hop-2 Validation: St Mary src vs St Joseph src.orig (2026-08-30)

> Preserved from the hop-2 doc (it is the lineage's only *method* template for validating a hop). All numbers are **as of 2026-08-30**. Full report: `docs/validation-src-vs-src.orig-2026-08-30.md` — `lint 0 + typecheck 0 + 16/92 + 35 E2E + 380.19 kB` green at time of audit.

**Scope:** Did `src/` (5 Bukit Batok East Ave 2 / T08CC4053H / 1957–2026, 52 files) adopt every good contract from `src.orig/` (620 Upper Bukit Timah / T08CC4043C / 1845–2017, 52 files) and improve where the port demanded? Parish facts *must* differ; design *must not* regress.

**Verdict — 10/10 adopted, 7 improved, 0 regression:**

| Dimension | Adopted? | Improved? | Evidence |
|---|---|---|---|
| 1. Structure & interfaces | ✅ 52 files, 10 pages, 8 interfaces, 92 tests preserved | — | `find src\|wc -l` 52/52, `grep export interface` 8/8 |
| 2. Design system (`@theme` 24+2, 24 utilities, 8 keyframes) | ✅ Tokens byte-identical, 8 keyframes | ✅ `.skip-link` extracted, `link-underline 300ms→0.35s`, motion kill expanded 1→7 | `diff index.css`, `grep @keyframes` 8/8 |
| 3. Components (Layout/Header/SafeImage/Button/BackToTop/SkipLink/Accordion/ScrollProgress/cn) | ✅ All contracts (HashRouter-safe, hash discipline, 44px, grid-rows+inert) | ✅ Header `solid = scrolled\|\|!isHome\|\|mobileOpen`, `ScrollProgress` decoupled to `Layout`, `SafeImage` typed `delete dataset.fallback`, `Button` types cleaned | `diff -u src.orig/components/*` + per-file tests |
| 4. Routing & nav (17 entries, 5 alias groups/7 aliases, 9 anchors) | ✅ Routes identical, shape `NavItem` identical | ✅ CDN `naveCdn/courtyardCdn` Pexels→local, alias groups preserved | `grep -c Route` 17/17 |
| 5. Data single-source (`content.ts`/`site.ts`/`nav.ts`) | ✅ 8 interfaces preserved | ✅ `Priest.phone→email`, `hours 5→7`, `mass sunday 4→6`, `contact 3→5`, `uen 4043C→4053H`, `images 11 local` | `diff site.ts` |
| 6. Quality gates | ✅ `lint 0 + typecheck 0 + 16/92 + 35 + singlefile` | ✅ `dist/images/ 4→8`, `server.watch.ignored` adds `src.orig/**` | `pnpm lint && typecheck && test && build` |
| 7. A11y/perf | ✅ SkipLink hash, focus ring, landmarks, alt, Accordion inert | ✅ Motion kill 1→7, fewer external fetches (legacy CSP retained unused) | `rg prefers-reduced-motion` |

**7 improvements ledger:** image locality (all local), header solidity (`||mobileOpen`), motion kill expanded, type safety, `ScrollProgress` decoupling, `.skip-link` extraction, parish fidelity. No token drift, no route dropped, no test lost.

> **v3 reuse note:** run this same validation shape at every future hop — and add the two checks hop 2 lacked: (1) **fossil sweep of the doc** (App G.4 — hop 2's own doc shipped 141-vs-172 breakdown sums and a round-3 gate block while claiming current numbers), (2) **tracking audit of ignored paths** (`git ls-files` vs `.gitignore` — hop 3 found `src.orig/` still tracked 64 files, F-9).

Recorded in `README.md` (Current audits + File Hierarchy `docs/`) and `AGENTS.md` (Where to look next) and `CLAUDE.md` (Continuous Improvement + Validation Checklist row 15). Re-run `lint && typecheck && test && test:e2e && build` before claiming regression.

---

## Appendix F — Hop Diffs: St Mary → Risen Christ → Blessed Sacrament

> Hop-3 diff (St Mary → Risen Christ) corrected from the hop-3 doc's Appendix F (whose "current" column was a round-7-era snapshot: 32/179+48, package 1.3.0 — superseded values now labeled or replaced by §0 references). Hop-4 diff (Risen Christ → Blessed Sacrament) is new in v4 (see F.2).

### F.1 — St Mary → Risen Christ (hop 3 history)

| Area | St Mary (`src.orig`, pruned round-12) | Risen Christ (`src`, canonical pre-BSC) |
|---|---|---|
| `package.json` | `st-mary-of-angels` 1.2.0 | `risen-christ-church` **1.4.4** (§0 hop-3) |
| `site.name` | Church of St Mary of the Angels / St Mary's Bukit Batok / 天神之后圣母堂 | Church of the Risen Christ / Risen Christ Toa Payoh / 耶稣复活堂 |
| `site.tagline/vision` | Towards a Prayerful & Missionary Parish. / According to Thy Word. | Grateful, Faithful, and Sent. / He is risen. |
| `site.address` | 5 Bukit Batok East Ave 2 659918 | 91 Toa Payoh Central 319193 |
| `site.hours` | 7 keys (columbarium) | 7 keys (mediaCentre Tue&Fri 12–16…, replaces columbarium) |
| `site.mass` | 7/12.15/18.30, Sat 16/18+Tamil 19.45, Sun 6, confession wknd 7 slots | 6.30a/6p, Sat 6.30a+5.30p, Sun 5, confession approach priest, monthly Bahasa/Tamil/Tagalog |
| `site.transport` | NS2/DT5 + buses Ave 2/3/4/6 | NS19 Exit A + buses 88/157/163 B52261 |
| `site.feast` | Our Lady of the Angels · Portiuncula 2 Aug | The Risen Christ — Easter Sunday |
| `site.uen` | T08CC4053H + HRSM, telegram/whatsapp/franciscans | T08CC4042G (no HRSM), freeMinistry/ssvp/bulletin/cep |
| `priests` | 4 OFM (Esmond/Julian/Justin/Robin, email) | 3 (Brian D'Souza, Arun Bellarmin, Dexter Chua — each phone+email) |
| `ppcMembers` | 6 (friars ex-officio + Custody) | 7 (Secretariat Peter Quek / Admin Audrey Rozario / Youth Calvin Swee / Pastoral Cheryl-Anne Goh) |
| `lifeTimeline` | 1957–2026 Franciscan/WOHA | 1969–2026 Toa Payoh (Ho Ping→first air-con→2003 wing→Simbang Gabi→Jubilee) |
| `grounds` | main-church/chapel/rosary-garden (Garden of Peace) | main-church/Adoration Room/parish-hall & Media Centre |
| `faqs/events/giving` | Portiuncula/columbarium/WOHA… | Velankanni/CEP/F.R.E.E./Adoration Room… |
| Sixth ministry id | `mandarin` | `language-communities` (anchor `#language-communities`) |
| Tests | as of 2026-08-30 round 3: 24 files/141 + 42 E2E | 35 files / 202 + 51 E2E (§0 hop-3; both dev + built passes) |
| `index.html` CSP | img-src wikimedia/pexels legacy + google | img-src `'self' data: blob:` only + google + cloudflareinsights script |
| Tokens | 26 colors + 2 (gold-700 + terracotta-600) | 25 + 2 (terracotta-600 only, §0 hop-3) |
| `skills/`, `src.orig/`, secrets | skills pruned (`c774ed9`); src.orig archived St Joseph, untracked; ssh-key untracked round 6 | skills re-added in full (`0be0fe8`); src.orig pruned + repo-hygiene guard (F-9); ssh key rotation still outstanding (§0 hop-3) |
| Tokens/routing/motion | shrine-* scales, 17 routes, Sacred Motion | unchanged — same tokens/routes/motion |

### F.2 — Risen Christ → Blessed Sacrament Queenstown (hop 4 — this port)

| Area | Risen Christ (`src.orig` — 77 files, retained as frozen BSC reference) | Blessed Sacrament (`src` — 39 files, canonical BSC) |
|---|---|---|
| `package.json` | `risen-christ-church` 1.4.4 | `blessed-sacrament-queenstown` **1.4.4** (§0 — name change only) |
| `site.name` | Church of the Risen Christ / Risen Christ Toa Payoh / 耶稣复活堂 | Blessed Sacrament Church / BSC Queenstown / 圣体堂 / Congregation Sacred Hearts SS.CC |
| `site.tagline/vision` | Grateful, Faithful, and Sent. / He is risen. | To be an evangelising church with a Eucharistic spirituality. / A tent of meeting in Queenstown. |
| `site.address` | 91 Toa Payoh Central 319193 | 1 Commonwealth Drive 149603 |
| `site.hours` | 7 keys (`gates`, `mainChurch`, `chapel`, `reception`, `parishOffice`, `mediaCentre` Tue&Fri…, `adorationRoom`) | 6 keys (`gates` Daily 9–21, `mainChurch` Sat 17–19.30/Sun 8.30–12.30+17–19, `chapel` + `adorationRoom` Daily 9–21, `reception`/`parishOffice` Mon–Fri 10–18 Sat–Sun 9–18 lunch 13–14 — mediaCentre removed) |
| `site.mass` | 6.30a/6p, Sat 6.30a+5.30p, Sun 5, confession approach priest, monthly Bahasa/Tamil/Tagalog | 8.30/12.30/18.30 Mon–Fri, Sat 8.30 + 18.00 sunset + 19.30 Tamil 3rd Sat, Sun **6** (7.30 Mandarin + 9/11 English + 13.00 Indo last Sun + 15.15 Tagalog), confession post-8.30a/before 12.30/18.30 + Sat 5.45p + Sun 7.15/8.45/10.45/17.15, public holiday 8.30 only |
| `site.transport` | Toa Payoh NS19 Exit A + buses 88/157/163 B52261 | Commonwealth **EW20** ~15-min walk + buses 11041 (51/93/100/123/147/153/196/198/855/961) / 11049 (51/61/93/100/123/147/153/196/198/855/961) |
| `site.feast` | The Risen Christ — Easter Sunday | **Corpus Christi · Most Holy Body and Blood of Christ — Thursday after Trinity** |
| `site.uen` | T08CC4042G | **none** — no `site.uen` (BSC PayNow at office; cheque Blessed Sacrament Church) |
| `priests` | 3 (Brian D'Souza, Arun Bellarmin, Dexter Chua — phone+email) | **5** SS.CC: Johan Wongso (PP), Rusdi Santoso, Karolus Kapolok Huar, Sambodo Sru Ujianto (KKIS chaplain), Anthony Hutjes (Residence) |
| `ppcMembers` | 7 (Secretariat/Pastoral/Youth/Admin) | **6** (Victor Leong / Catherine Wong / Mendoza Alyzza Miclat + mission + SS.CC congregation, + Johan Wongso ex-officio) |
| `lifeTimeline` | 1969–2026 Toa Payoh (Ho Ping→first air-con→2003 wing→Simbang Gabi→Jubilee) | **1958–2026 Sacred Hearts/Queenstown** (Sacred Hearts arrive 1958 → Damien Hall 1963 → Tent 1965 Y. Gordon Dowsett → 7,000 → Damien Centre 1982 / conserved 2005 / rebuilt 2007 → TOMR $9.4m 2019–2023) |
| `grounds` | `main-church`/`chapel`/`parish-hall` (Hall & Media Centre) | `main-church`/`chapel`/`rosary-garden` (= Damien Centre — id `rosary-garden` title Damien Centre — Little Shepherds' Schoolhouse) |
| `faqs/events/giving` | Velankanni/CEP/F.R.E.E./Adoration Room…; giving with UEN T08CC4042G | **Corpus Christi feast-first** / First Friday Sacred Heart / KKIS Indo last Sun / Thanksgiving TOMR $9.4m …; **giving without UEN** (PayNow at office) |
| Sixth ministry id | `language-communities` | **`mandarin` (= Language Communities — title Language Communities, id `mandarin`; anchor `#mandarin`)** |
| Tests | 35 files / 202 + 51 E2E (both passes, §0 hop-3) | **0/0 harness missing + 51 stale** (§0 hop 4 — `src/test/setup.ts` absent; E2E inherited Risen specs not yet retargeted) |
| `index.html` CSP | img-src `'self' data: blob:` only + google + cloudflareinsights | **unchanged** — img-src `'self' data: blob:` only + google + cloudflareinsights (all images local) |
| Tokens | 25 + 2 (terracotta-600 only) | **25 + 2 (terracotta-600 + gold-700 #85601f — BSC restores gold-700)** |
| Hooks/utils | 3 hooks (useScrolled + useScrollProgress + useScrollSpy) / 4 utils | **2 hooks** (useScrolled + useScrollProgress — **no useScrollSpy**) / 4 utils unchanged |
| `skills/` | re-added in full (`0be0fe8`) — vendored reference tracked | **deleted in BSC worktree** — no vendored catalog; ignores vacuous |
| `src.orig/` | pruned + repo-hygiene guard (F-9) — absent | **present — 77-file Risen Christ archive retained** as frozen reference; `src/` (39 files) is the new canonical layer |
| Tokens/routing/motion | shrine-* scales, 17 routes (5 alias groups), Sacred Motion | **unchanged** — same tokens (+gold-700)/routes/motion; `card-tint` present |

Skill filenames: `st-mary-of-angels_SKILL.md` and `rothershrine-v2_SKILL.md` are lineage redirect stubs → prior canonical `risen-christ_SKILL.md` (now also a stub) → canonical skill is now **this file** (`blessed-sacrament-queenstown_SKILL.md` v4, 2026-09-01). Do not edit the stubs independently.

---

## Appendix G — Unification & Audit Ledger (v3)

> This appendix records the 2026-09-01 re-audit of the three source files (all findings re-verified at text level against the full documents; repo-state claims remain **Unverifiable** — no repo access, document-internal consistency only) and how each was resolved in this unified doc. It exists so a future reader can trace *why* v3 reads the way it does, and so future ports inherit the checklist instead of the fossils.

### G.1 Findings carried from the comparative audit — all re-validated

**Critical (1) — repo-level, OUTSTANDING:**
- **C-1 SSH key rotation.** `docs/ssh-key.txt` tracked in `0be0fe8`, untracked round 6; history still contains it. Disclosed in hop 3's §2/§3.2/§11. **Resolution:** promoted to the top-of-file notice + §0 row + L13; flagged as the only action requiring the repo owner. *Not fixable by documentation.*

**High (6) — all confirmed, all resolved in v3:**
1. Hop 1 carried three conflicting versions (frontmatter 1.3.0 / §2 1.1.0 / Appendix D 1.0.0). → Resolved: frontmatter `version: 3.0.0` (doc axis) + `package_version: 1.4.4` (repo axis) + §0 row + ADR-7; lineage versions consolidated in D.1 with `as of` labels.
2. Hop 2 §3.1 + §11 step-3 test breakdown summed to 141 while claiming 172 (6 files/28 tests missing; site 7≠8, Header 16≠17, head 13≠14 — the §2 table was the correct one). → Resolved: v3 carries the full per-file breakdown once (§0/§2, sum-verified 202) and other sections reference it.
3. Hop 2 §19 claimed 26 colors but its own table listed 24 (gold-700/terracotta-600 missing from the table while present in §4.1). → Resolved: §19 lists all 25 canonical colors + 2 shadows; gold-700 documented as a lineage note (§4.1/§19/D.1).
4. Hop 3 §10 said "32 files / 184 tests" against 35/202 everywhere else. → Resolved: §10 references §0.
5. Hop 3 §13 said "`src.orig/` is not part of this repository (inert guards)" and §14 said "pruned skills tree at `c774ed9`" — contradicting its own §2 (pruned round-12 + guard; skills re-added in `0be0fe8`). → Resolved: §13/§14 rewritten against §0's policy rows.
6. Hop 3 ADR-6 still described hop-2 semantics ("src.orig is the St Joseph BT intermediate, retained locally"). → Resolved: ADR-6 rewritten (pruned + guard), lineage in D.

**Medium (9) — all confirmed, all resolved:**
7. Hop 2 §5.2 "64 files (38+25+1)" vs its own counts line "61 (36+24+1)" vs §2's 31 test files. → Resolved: single inventory (77 = 41+35+1, §5.2/§0).
8. Hop 2 §11 gate block "24/134 + 42 E2E (round-3)" vs frontmatter 31/172+45. → Resolved: one gate block, §0-dated (§11).
9. Hop 2 §11 CSP row still required wikimedia+pexels while §3.2 documented the round-6 tightening to `'self data: blob:'`. → Resolved: §11 CSP row matches §0/§3.2.
10. Hop 2 §12 L10 "35 green (2026-08-28)" narrative fossil. → Resolved: L10 rewritten as a per-hop lesson with §0 reference.
11. Hop 3 Appendix B was entirely hop 2's smoke script (4 OFM priests, ppc 6, `#mandarin`, T08CC4053H, NS2/DT5). → Resolved: Appendix B rewritten for Risen Christ (18-step script + built pass).
12. Hop 3 ADR-3 "24 colors unchanged from rothershrine" vs its own 25. → Resolved: ADR-3 updated (25 + terracotta-600 note).
13. Hop 3 D.4 "Do not delete it" vs §2 "pruned 2026-08-31". → Resolved: D.4 folded into ADR-6/D (prune policy).
14. Hop 3 Appendix C "25 files/142 + 48 E2E" vs 35/202+51. → Resolved: Appendix C references §0.
15. Hop 3 Appendix F "current" column was round-7-era (32/179+48, package 1.3.0). → Resolved: F corrected with §0 references + labeled snapshots.

**Low (6) — all confirmed, all resolved:**
16. Hop 1 §5.2 "45 files (33+11+1)" vs counts line "52 (35+16+1)". → Resolved by design: §0/§5.2 single inventory.
17. Hop 1 §11 carried three generations of counts (11/67+27 → 9/53+22 → 16/92+35) in one section. → Resolved by design: §0.
18. Hop 2 §20 fossils: SafeImageProps comment "Bukit Timah", tail "3 CDN", PageHero "Wikimedia CDN", missing `fetchPriority`. → Resolved: §20 cleaned + `fetchPriority?` added (20.3/20.4 v3 notes).
19. Hop 3 §20.3 duplicated comment typo ("// src/components/SafeImage.tsx// src/components/SafeImage.tsx"). → Resolved.
20. Hop 3 §5.2 data comments "11 keys, 3 CDN" + "hours(5)" vs §7's all-local + hours 6. → Resolved: §5.2 tree comments match §7/§0.
21. Hop 3 L10 kept hop 2's "Bukit Batok St Mary" e2e narrative. → Resolved (L10).

**New findings surfaced by the v3 re-read (shared structural fossils — all fixed):**
22. §4.3 "Plus keyframes" prose listed 6 keyframes while §3.2 claimed 8 (`drawer-item-in`, `page-in` omitted) — in **all three** files. → Resolved: §4.3 enumerates 8.
23. §4.3 utilities tables listed ~18 classes vs the claimed 27 (counting each `rise-in-d1..d4` individually). → Resolved: §4.3 is a 27-row register.
24. §18 z-index maps omitted the `z-[60]` ScrollProgress rail in **all three** files. → Resolved: §18 rail row.
25. Hop 3 §5.2 tree + §6 said "Two hooks" while its own harness (useScrollSpy 6 tests), Quick Ref, and round-7 E2E proved `useScrollSpy.ts` exists; utils tree likewise omitted `monogram.ts`/`deepLinks.ts` (7+7 tests). → Resolved: §6 three hooks + §5.2 complete tree + §20.5 signatures.
26. Hop 2 Appendix E ("16/92+35 E2E, 2026-08-30") vs hop 2 §11 ("24/134+42, round-3, 2026-08-30") — two different snapshots for the same date, neither matching the frontmatter. → Resolved: E is labeled "as of 2026-08-30 (port-day audit)" and D.1 carries the full count trajectory.

### G.2 The systemic root cause (and the v3 countermeasure)

Every finding above is an instance of one failure mode: **volatile facts restated 5–8× per document + appendices copy-forwarded at each hop without a previous-parish fossil sweep.** Body sections healed hop over hop (hop 3's body was the cleanest) while appendices accreted (hop 3's Appendix B was 100% hop-2 content). The countermeasure is ADR-7: **§0 is the single statement of every volatile fact; everything else references it; historical numbers only exist in appendices with `as of <date>` labels; `docs-contract` tests (16) enforce at CI level.**

### G.3 Provenance of v3's content choices

| v3 section | Base | Best elements merged in |
|---|---|---|
| §0 Volatile Facts Register | **new (v3)** | countermeasure for the audit's root cause |
| §§1–3, 5–11, 13–18 | hop 3 (risen-christ) | hop 1/2 lineage facts folded into §2 environment narrative; hop-3-only `playwright.built.config.ts` + `test:e2e:built` |
| §4 | hop 3 tokens | hop 2's gold-700 as a labeled lineage note; 27-utility register completed from all hops' cumulative rounds (2/4/5/7/12) |
| §6 | hop 2/3 | `useScrollSpy` contract + round-7 tie-break rule |
| §8 | hop 3 | hop-2 round-4 modal drawer contract; hop-3 round-12 `wcag-contrast` row + terracotta-600 AA pair |
| §9 | hop 3 (15 entries) | hop-3-only #14 (dev-only E2E assets) + #15 (agent-browser eval) |
| §12 | L1–L12 (all hops) | **new L13–L15** (secret-in-history, gitignore-does-not-untrack, every-restatement-is-a-fossil) |
| §19–20 | hop 3 | `fetchPriority` + cleaned comments + §20.5 hooks/utils signatures (v3) |
| App A | hop 3's six ADRs | all corrected; **ADR-7 + ADR-8 new** |
| App B | hop 3 §10 route list | rewritten from hop 2's fossil to Risen Christ facts |
| App C | hop 3 | hop-1/2's "(+ once rewritten)" fossil removed; counts via §0 |
| App D | all three docs' migration appendices | consolidated 4-generation lineage with labeled snapshots |
| App E | hop 2 (unique) | v3 reuse note: two checks hop 2 lacked |
| App F | hop 3 (unique) | corrected to §0-referenced values |
| App G | **new (v3)** | this ledger |
| Quick Ref | hop 3 (most complete — incl. audit-ledger row) | hooks/utils rows completed (3 hooks, 4 utils) |

### G.4 Fossil-Sweep Protocol (run before any future port's doc ships)

1. **Register first.** Update §0 (one row per changed fact) *before* touching prose anywhere else.
2. **Sweep the old value.** `rg -n "<old value>"` across the doc, README, AGENTS, CLAUDE — every hit is either updated to a §0 reference or explicitly labeled `as of <date>` in an appendix.
3. **Previous-parish grep.** For every parish-specific token of the *previous* instance (address, UEN, phone numbers, feast date, priest names, ministry ids, MRT station, bus list, parish-specific anchor ids like `#mandarin`), run `rg -n` and verify each remaining hit lives in a labeled lineage appendix: `rg -n "620 Upper|T08CC4053H|T08CC4043C|Bukit Batok|Bukit Timah|Portiuncula|NS2|DT5|Cashew|#mandarin|St Mary|St Joseph"`.
4. **Sum every count you state.** Test counts, file counts, color/utility/keyframe counts, route/alias/anchor counts — recompute; never copy a sum forward.
5. **Reconcile code samples with the tree.** Every file the test harness references must appear in §5.2's tree; every §4.3 row must match the §0 utility count; every §18 layer must match the z-indexes named in §5.5.
6. **Tracking audit.** `git ls-files` vs `.gitignore` for `src.orig/`, secrets, lockfiles — ignore ≠ untracked (L14).
7. **Appendix B is parish-critical.** The smoke script names priests/ppc/UEN/anchors — rewrite it wholesale; it is the single most-fossilized section in the lineage (finding #11).
8. **Gate.** `docs-contract` tests green + a fresh reviewer reads §0 against the frontmatter and Quick Ref in one pass and finds zero unexplained numbers.

---

### G.5 Hop 4 delta (BSC, 2026-09-01) — what changed and why it is not a fossil

> **Round-13 note (2026-09-01):** the "Blessed Sacrament (v4, §0)" column below is the state **as of the hop-4 port** (pre-F1/F2). The F1–F3 follow-ups restored the harness (16 files / 94 tests), restored `useScrollSpy`, and retargeted the 51 E2E specs to BSC — the current values live in §0, re-verified by the round-13 `docs-contract` guard. Treat this table as an `as of hop-4` snapshot.

| Area | Risen Christ (v3, §0) | Blessed Sacrament (v4, §0) | Migration note |
|---|---|---|---|
| Package | `risen-christ-church` 1.4.4 | `blessed-sacrament-queenstown` 1.4.4 (name change only) | Keep `src/` name-aligned — don't reintroduce Risen `site.*` |
| `src/` files | 77 (41 source + 35 tests + 1 setup) | **39 source-only** (harness deleted) | `src.orig/` retains the 77-file Risen archive — restore tests from there, then retarget parish-fact asserts to BSC |
| Tests / harness | 35/202 + 51 E2E green (both passes) | **0/0 harness missing + 51 stale** (Risen specs, not BSC) | Pre-push gate is now **RED** — see §11. BSC is the first hop that did not carry the harness forward — L16. |
| `src/test/setup.ts` | present | **absent** (missing in `src/`, present in `src.orig/`) | `vite.config.ts test.setupFiles` still points there — harness restore is blocking |
| `skills/` | re-added in full (`0be0fe8`) — vendored, tracked | **deleted in worktree** — absent | Ignores in eslint/tsconfig/vite remain but vacuous — don't recreate without ADR |
| `src.orig/` | pruned (F-9, 64 files) — absent | **present — 77 Risen Christ** (frozen reference) | BSC inverts the prune policy — the archive is the diff baseline for hop 4 |
| Tokens | 25 colors + 2 (terracotta-600 only, gold-700 dropped) | **25+2 incl. gold-700 #85601f + terracotta-600** | BSC restores gold-700 (4.72:1 AA text gold) |
| Hooks | 3 (useScrolled + useScrollProgress + useScrollSpy) | **2 (useScrolled + useScrollProgress — no scrollspy)** | Scrollspy pill-highlight absent at hop-4 — restored F2A (see §0) |
| Ministries sixth id | `language-communities` (#language-communities) | **`mandarin` (= Language Communities — title Language Communities, anchor #mandarin)** | BSC data never renamed the id — only the title; anchors/docs must say `#mandarin` |
| Grounds ids | `main-church` / `chapel` / `parish-hall` | `main-church` / `chapel` / `rosary-garden` (= Damien Centre) | `parish-hall` content → `rosary-garden`/Damien Centre (id reused from Garden of Peace line) |
| Timeline | 1969–2026 Toa Payoh (Ho Ping→first air-con→2003 wing→Simbang Gabi) | **1958–2026 Sacred Hearts/Queenstown** (Damien Hall 1963 → Tent 1965 Dowsett → conservation 2005 → TOMR $9.4m 2019–2023) | One breath + §7.2 + site data all retargeted |
| Feast | Easter Sunday (Risen Christ) | **Corpus Christi — Thursday after Trinity (Blessed Sacrament)** | `site.feast` canonical, events feast-first |
| UEN / giving | T08CC4042G + SSVP/bulletin/cep | **no UEN** (site has no `uen`; cheque Blessed Sacrament Church; Thanksgiving TOMR $9.4m) | Don't reintroduce T08CC4042G/H outside lineage appendices |
| Address / transport | 91 Toa Payoh Central 319193 / NS19 / 88,157,163 B52261 | **1 Commonwealth Drive 149603 / Commonwealth EW20 ~15m / 11041+11049** | Every §1/§7/§20 occurrence retargeted; E2E assertions now stale until retargeted |
| Build | 397.52kB | **390.74kB** (wc -c 390739) + `_headers` + images 8 | Singlefile still inlines JS+CSS; publicDir still copied |

---

## Quick Reference Card

| Need | Path |
|---|---|
| Visitor overview | `README.md` |
| 60-sec agent cheat sheet | `AGENTS.md` |
| Deep workflow + parish fidelity | `CLAUDE.md` |
| Intent lineage | `docs/prompts.md` (if present) |
| **Volatile facts (versions, counts, policies) — all gates green (17/98 + 51/51 + built)** | **§0 of this file — the single source; everything else defers to it** |
| Tokens (33 colors + 2 shadows, §0) + utilities (30 + 9 keyframes incl. card-tint + round-17 set, §4.3) | `src/index.css` (sapphire-blue `bsc-*` palette) |
| Route table + aliases + anchors | `src/App.tsx` — 17 Route entries (16 content paths + `*`), 7 alias paths in 5 groups (§5.4), 9 hash anchors (3 on `/worship`, 6 on `/ministries` — sixth is `#community` = Community & Outreach) + path-style deep-link rewrite (`utils/deepLinks.ts` → `main.tsx` pre-mount) |
| Nav single-source | `src/data/nav.ts` (`primaryNav` 6 + `footerNav` 10) |
| Content arrays (10) + images + site | `src/data/content.ts` (per §0/§7.1: `priests` 3 SS.CC, `ppcMembers` 6, `lifeTimeline` 7 [1954–Today], `grounds` 3 (main-church/damien-hall/garden), `ministries` 6 (sixth `community` = Community & Outreach), `faqs` 6, `upcomingEvents` 6, `givingOptions` 6 (PayNow UEN T08CC1234A), `serveRoles` 4, `devotions` 6 + `images` 7 all-local) + `src/data/site.ts` (`site as const`: hours 6 + mass 9 keys (sunday 6) + transport Queenstown EW19 · Commonwealth EW20 / buses 32/51/111/122/145/195/855 + feast Corpus Christi Sunday after Trinity + UEN T08CC1234A + cheque + facebook/instagram/youtube + maps + url/ogImage) |
| Primitives | `src/components/ui/*` (Button/Container/SectionHeading/Accordion/Reveal) + SafeImage/Emblem/SkipLink/Timeline/SocialIcons/PageHero/Layout/Header/Footer/BackToTop/ScrollProgress |
| Hooks (3) | `src/hooks/useScrolled.ts` (threshold 12 default; Header uses 16) + `useScrollProgress.ts` (rAF; BackToTop ring + ScrollProgress rail) + `useScrollSpy.ts` (document-order tie-break; drives the Ministries pills) |
| Utils (5) | `src/utils/cn.ts` (`twMerge(clsx)`) + `massDay.ts` (`massDayKey` — Worship today-highlight) + `monogram.ts` (About discs) + `deepLinks.ts` (`knownRoutePaths` + `resolveHashRedirect`) + `categoryTone.ts` (EventMeta chip colors) |
| Images | `public/images/*.jpg` (9 files → `dist/images/`) — all local + `images` export (7 keys all `/images/*`, `SafeImage` with `hero-church.jpg` fallback) |
| Vite alias + singlefile | `vite.config.ts` (`@→src`, `viteSingleFile()` + `test {globals,jsdom,setupFiles,include,exclude}`) + `server.watch.ignored` [skills,dist,playwright-report,test-results,coverage,src.orig] |
| TS strict + include | `tsconfig.json` (`strict` + `noUnused*` + `noFallthroughCasesInSwitch`/`isolatedModules`/`noEmit` + `include: ["src","vite.config.ts","eslint.config.js","playwright.config.ts","playwright.built.config.ts"]` + `types: ["node","vitest/globals"]` + `paths @/*` + `baseUrl:"."`) |
| E2E (dev + built) | `playwright.config.ts` (vite :5173) + `playwright.built.config.ts` (vite preview :4173; `E2E_BASE_URL` → live host) — same 51 specs (§0 — green, BSC retargeted F2B) |
| Pre-ship gate | `pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build` → counts per §0 (**GREEN** — lint 0, typecheck 0, test 17/98, e2e 51/51, build 381.90kB) → `dist/index.html` + `dist/_headers` + `dist/images/` (9 files) → `pnpm preview` → manual smoke (Appendix B — BSC) |
| Lineage reference | `src.orig/` is **not part of the repository** (local-only port-session artifact; never committed) — lineage lives in Appendices D/F + git history |
| CSP allowlist | `index.html` — `img-src 'self' data: blob:` (all images local), `frame-src https://www.google.com` (maps embed), `script-src` inline (singlefile) + `static.cloudflareinsights.com` — `SafeImage` fallback `/images/hero-church.jpg` |
| **Outstanding security action** | **Rotate the ssh key leaked in git history (`docs/ssh-key.txt`, commit `0be0fe8`) — repo owner action; working-tree guard is `src/repo-hygiene.test.ts`** |
| Audit ledger + remediation | `docs/code-review-audit-round6-2026-08-31.md` + `docs/remediation-plan-round6-2026-08-31.md` (round 6) · `docs/code-review-audit-round7-2026-08-31.md` + `docs/remediation-plan-round7-2026-08-31.md` (round-7 audit of the "Honest Light" commits — zero new C/H/M; scrollspy tie-break + E2E sleep remediation) · `docs/design-enhancement-round7-2026-08-31.md` (round-7 design) · `docs/remediation-plan-round9-2026-08-31.md` (round-9 built-artifact E2E contract — E2E-L1 favicon form + `playwright.built.config.ts`) · `docs/e2e-live-pass-round11-2026-08-31.md` (round-11 live pass vs `66d2398` — byte-verified deploy + tri-env + journey; E2E-J1 `agent-browser eval` backslash lesson → pitfall #15) · `docs/UI-UX-Design-Audit_StMaryOfAngels_vs_RisenChrist.md` + `docs/remediation-plan-round12-2026-08-31.md` + `docs/remediation-round12-2026-08-31.md` (round-12 comparative UI/UX audit remediation — F-1 Devotion chip AA terracotta-600 5.36:1, F-2 mass-card footnote /85 + date lock, F-3 path-style deep-link rewrite, F-4 Give UEN copyable row, F-9 src.orig prune; TDD red→green) · **unification audit 2026-09-01: Appendix G** |

