# Plan — Adapt Project Documentations to the Current `src/` (Blessed Sacrament Queenstown Port)

> **Scope:** rewrite `AGENTS.md`, `CLAUDE.md`, `README.md`, and `risen-christ_SKILL.md` so they
> truthfully describe the **current** `src/` (port of https://bsc.org.sg — Blessed Sacrament Church,
> 1 Commonwealth Drive, Queenstown) instead of the archived `src.orig/` (Risen Christ, Toa Payoh).
> No `src/` code changes in this task — surgical doc edits only. A follow-up code task (`useScrollSpy`
> restore, e2e rewrite, test harness) is flagged but not executed here unless the user approves.

**Date:** 2026-09-02 · **Author:** Claw Code (Frontend Architect) · **Branch:** `main` (no new branch)
**Inputs audited:** `src/` (39 files, 0 tests, hooks 2, utils 4), `src.orig/` (77 files, 35 tests),
`package.json` (`blessed-sacrament-queenstown` 1.4.4), `index.html` (already BSC), `src/data/site.ts`,
`src/data/content.ts`, `src/data/nav.ts`, `src/hooks/*`, `src/utils/*`, `vite.config.ts`, `tsconfig.json`,
`AGENTS.md` / `CLAUDE.md` / `README.md` / `risen-christ_SKILL.md`, `e2e/*.spec.ts`, `docs/` lineage,
`git status` (vendored `skills/` deleted).

---

## 0. Context & Provenance (why this exists)

- **Lineage:** `Rother Shrine → St Joseph BT → St Mary of the Angels (src.orig, pruned round-12) → Risen Christ (src.orig as of this repo’s last doc sync) → Blessed Sacrament Queenstown (current src/)`.
- **What changed:** `src/` was moved to `src.orig/` and a fresh port of **https://bsc.org.sg** was written
  into `src/`. The four doc files were **not** re-synced — they still state the Risen Christ facts
  (`91 Toa Payoh Central`, `He is risen`, `Grateful/Faithful/Sent`, UEN T08CC4042G, Velankanni, Toa Payoh
  NS19, priests 3 (Brian/Arun/Dexter), ppc 7, `useScrollSpy`, 35 files/202 tests, 51 E2E, etc.).
- **Ground truth for this port:**
  - **Parish:** Blessed Sacrament Church (Church of the Blessed Sacrament), Queenstown — `1 Commonwealth Drive, Singapore 149603`,
    Sacred Hearts of Jesus and Mary (SS.CC), since 1965, conserved “Tent of Meeting” (folded blue roof,
    Y. Gordon Dowsett / Van Sitteren & Partners), Damien Hall 1963, conservation 2005, TOMR 2019–2023.
  - **Contacts:** `bsc.secretariat@catholic.org.sg`, phones `+65 6474 0582` (office/parish priest) + `+65 9170 9133` (WhatsApp hotline),
    `bsc.comms/pastoral/youth` + `cathy.bsc@catholic.org.sg` (Chinese pastoral), MRT **Commonwealth EW20** (15-min walk),
    buses 11041/11049, feast **Corpus Christi — Thursday after Trinity** (`https://www.bsc.org.sg`, og:title
    `Blessed Sacrament Church · Queenstown` — verified in `index.html`).
  - **src/ is correct for BSC** — but the docs are not. Every stale parish fact is a **documentation bug**
    that will mislead onboarding agents and break `docs-contract` style guards if they are ever re-enabled.

---

## 1. ANALYZE — Multi-Dimensional Requirement Mining

### 1.1 Current `src/` ground truth (verified `2026-09-02`, `find src -type f` run)

| Facet | Current `src/` (BSC) | `src.orig/` (Risen) | Delta |
|---|---|---|---|
| **`src/` inventory** | **39 files** (no `src/test/` subtree) | **77 files** (41 source + 35 tests + 1 setup) | −38 files (all tests + `useScrollSpy`, coverage scaffolding gone) |
| **`components/`** | `BackToTop, Emblem, EventMeta, Footer, Header, Layout, PageHero, SafeImage, ScrollProgress, SkipLink, SocialIcons, Timeline` + `ui/Accordion,Button,Container,Reveal,SectionHeading` (13) | same 13 components | identical layout — **content copy differs** |
| **`hooks/`** | **`useScrolled`, `useScrollProgress` (2)** — `useScrollSpy` absent | `useScrolled, useScrollProgress, useScrollSpy` (3) | −1 hook (round-7 scrollspy lost) |
| **`utils/`** | `cn, deepLinks, massDay, monogram` (4) — `deepLinks` stripped of JSDoc/comment, `massDay` simplified to `getDay()->switch`, `monogram` adds `ss.cc/sscc/mr/ms/mrs` honorifics | same 4 utils but richer comments + monogram without ss.cc/mr set | commentary + a11y nuance reduced |
| **`pages/`** | 10 pages, **all BSC copy** (`About` pillars Eucharist/Evangelise/Sacred Hearts, `Worship` mass 8.30/12.30/6.30 + Sat 6pm + Sun 5 + Tagalog/Tamil, `History` 1958–2026 TOMR, `Give` chequePayee BSC etc.) | 10 pages, Risen copy | every page diff — same file names, different data bindings |
| **`data/nav.ts`** | Risen Christ wording replaced: `"Vision, SS.CC fathers…"` / `"From Damien Hall…"` etc. | `"Priests, household…"` / `"From Ho Ping Centre…"` | description strings only — structure identical (primary 6 + footer 10, ministries children 3) |
| **`data/site.ts`** | **no `uen`**, no `bulletin/cep/free/ssvp/youtube`, new `whatsapp`, `sacredHearts`, `parishUpdates`, `whatsappHotline`, `feast={Corpus Christi, Thursday after Trinity}` + BSC mass/transport/hours | `uen T08CC4042G`, `youtube`, `free/ssvp/bulletin/cep`, feast `The Risen Christ — Easter Sunday`, mass `6.30a/6p …` | site contract reshaped — UEN removed is intentional for BSC |
| **`data/content.ts`** | `priests[5]` (Johan/Rusdi/Karolus/Sambodo/Anthony SS.CC), `ppcMembers[6]` (+ Sacred Hearts mission entry), `lifeTimeline[8]` (1958 Sacred Hearts arrive → 2023 Eucharistic spirituality), `grounds[3]` (Main Church/Adoration Chapel/Damien Centre), `ministries[6]` (last = Language Communities w/ Indonesian 1pm last Sun), `givingOptions[8]` (PayNow without UEN, Mass offerings wording differs), `events[6]` (Corpus Christi feast-first) | `priests[3]` (Brian/Arun/Dexter), `ppcMembers[7]`, `lifeTimeline[8]` (1969 Ho Ping …), `ministries[6]` (last = language-communities Mand 8.15/Tamil 2nd Sun etc.) | counts preserved (8/3/6/6/6/8) but **identities swapped** |
| **`index.css`** | `@theme` 27 entries (25 colors incl. `gold-700 #85601f` retained + `terracotta-600 #8f4c30`, 2 shadows), 27 utilities + 8 keyframes + themed scrollbar | `@theme` w/ `terracotta-600` comment F-1 + missing `gold-700` in some lineage copies | token set is **actually 25+2=27** in BSC — `gold-700` present (lineage ledger says Risen line “does not carry it” — BSC does) |
| **`index.html`** | ✅ already BSC (`title Blessed Sacrament Church · Queenstown`, `og:url bsc.org.sg`, `description Tent of Meeting…`, JSON-LD `1 Commonwealth Drive 149603`, fonts Fraunces+Source Sans 3, CSP `img-src 'self' data: blob:`) | same file (docs said Risen — but file is BSC) | **no doc–code drift here** |
| **`package.json`** | `name blessed-sacrament-queenstown`, v `1.4.4`, same dep pins (React 19.2.8, Vite 7.3.6, Tailwind 4.3.3 …) | same version | name changed — docs still say `risen-christ-church` |
| **`vite/tsconfig`** | alias `@→src`, `test.include src/**/*.{test,spec}` + `setupFiles src/test/setup.ts` but **no `src/test/setup.ts` exists** → `pnpm test` will fail / 0 tests | `src/test/setup.ts` exists, 202 tests | **harness contract broken** |
| **`e2e/`** | 9 specs (smoke 11, navigation 8, ministries 4, give-faq 4, enhancements 7, round5 6, round7 8, deep-links 3 + helpers) — **assertions still Risen copy** (`/He is risen/`, `/Toa Payoh/`, `/Take a place in the household/`, `/Mass, mercy/` mismatched) | same e2e against Risen | e2e will fail on BSChero (`A tent of meeting.`), ministry copy, worship heading |
| **`public/images/`** | 8 images (hero-church, chapel-interior, sanctuary, rosary-garden, stained-glass, parish-hall, cemetery, feast) + `_headers` + `favicon.svg` — all local | same | no delta |
| **`skills/`** | **deleted** in working tree (git status `D` 100s of files) — vendored catalog removed | tracked full | tooling ignores `skills/` but `AGENTS/CLAUDE` still document it as present at `0be0fe8` |

### 1.2 Per-document staleness audit (what each file claims vs `src/` reality)

#### `AGENTS.md` — compact cheat sheet (currently 100% Risen Christ)

| Line/section | Stale claim (Risen) | Truth (BSC) | Severity |
|---|---|---|---|
| Title `# AGENTS — risen-christ-church` + blockquote | `91 Toa Payoh Central 319193`, 3 July 1971 first air-con $450k, `Grateful/Faithful/Sent` | `1 Commonwealth Drive 149603`, 8 May 1965 Tent of Meeting, Damien Hall 1963, `To be an evangelising church with a Eucharistic spirituality` + SS.CC | **H** — identity fossil |
| Stack line | generic — OK | same stack (versions match) | — |
| Commands table `pnpm test` row | `35 files / 202 tests` + enumerated suites + `src/test/setup.ts` | **0 test files** (no `src/test/setup.ts`, 39 src files total) | **H** |
| `pnpm test:e2e` row | `8 specs — 51 tests … Risen Christ copy (91 Toa Payoh … Velankanni … NS19)` | e2e specs reference both parishes; reality is BSC copy but tests still Risen | **H** |
| Structure tree `src/ (35 files / 202 tests …)` | 41 source + 35 tests + 1 setup, `useScrollSpy`, `massDayKey` doc, `EventMeta` R5-M1, footer SSVP/Free/CEP/bulletin | 39 files, **no tests**, **2 hooks**, `monogram` handles SS.CC, `site` has no UEN | **H** |
| `vite.config.ts` docs | still lists `src/test/setup.ts` | file missing — `pnpm test` broken | **M** |
| `playwright.config.ts` + `e2e/` | Risen assertions | BSC assertions needed | **M** |
| `public/` | UEN-era `cdn` legacy note | all local (same) | ok |
| `index.html` | says `www.risenchrist.org.sg` | file is `bsc.org.sg` — doc wrong | **M** |
| `src.orig/` note | “pruned round-12 … 64 files … lineage → Risen Christ (src)” | **No longer accurate:** `src.orig/` still exists in worktree (see §1.1 77 files) but `git status` shows it is again untracked/deleted — the story is now BCS is `src`, Risen is the immediate predecessor `src.orig`, not St Mary | **M** |
| Quirks bullets | `useScrollSpy` (round-7 scrollspy), `Worship today highlight`, `Round-5 Light of the Portiuncula`, `aria-current`, priests/ppc members lists | `useScrollSpy` absent — bullets referencing it will be false; priests 5 vs 3, ppc 6, lifeTimeline 1958–2026, UEN, transport NS19 vs EW20, hours, mass slots, monthly languages, feast | **H** |
| Conventions → Routing/Data/Components/Styling | Risen data arrays (priests[3] Brian…, lifeTimeline 1969 …, ministries language-communities Mand 8.15 …) + `site` UEN/buses NS19/mass etc. | BSC arrays (priests[5] Johan…, ppc 6, timeline 1958→2023, ministry Indonesian last Sun, site no UEN, transport EW20, feast Corpus Christi) | **H** |
| Don’t (parish facts) | lists Risen facts as canonical; warns not to reintroduce Bukit Batok | must list **BSC facts** as canonical; warn not to reintroduce Risen/Toa Payoh facts | **H** |
| Where to look next | curated per round (round-12, round-7, remediation plans…) all Risen | must either retain as historical lineage or mark `(historical — Risen Christ)` and add BSC lineage note + new round | **M** |

**Outcome if not fixed:** any agent reading `AGENTS.md` will be confidently wrong about every parish fact and every test count.

#### `CLAUDE.md` — deep workflow (71kB, authoritative)

Same fossils as `AGENTS.md` but spread over ~180 sections. Highest-risk slices:

- Header block: `Port of https://www.risenchrist.org.sg/` → `Port of https://bsc.org.sg/`.
- `Foundational Principles → Parish fidelity` — currently a word-perfect list of Risen Singapore facts (1969 Ho Ping, 1971 Olçomendy $450k first air-con, Toa Payoh new town, NS19, UEN…); must be replaced with BSC fidelity paragraph (1958 SS.CC arrival, 1963 Damien Hall, 1965 Olçomendy “Tent of Meeting”, 2005 conservation, 2019–2023 TOMR $9.4m, 2023 Corpus Christi Eucharistic spirituality, 1 Commonwealth Drive 149603, Commonwealth EW20, corpus christi feast, no UEN).
- `Implementation Standards → Routing table` — alias groups are correct (7 aliases/5 groups) but canonical descriptions reference Risen wording.
- `Development Workflow → Build Commands table` — `pnpm test 35/202`, `test:watch watches 28 files`, `test:e2e 51`, `test:e2e:built 51` — all must become `0 / broken harness` or be updated after the follow-up test port.
- `Testing Strategy` — the entire “porting checklist for Risen Christ” and “historical St Mary — 25 files / 141” blocks are lineage fossils; must be replaced with “porting checklist for BSC” and current BSC `0 tests` state + a **BSC coverage table** (priests 5, ppc 6, timeline 8 1958–2026, etc.).
- `Code Quality / Type Safety` — `Priest` phone+email description is still Risen (3 priests phone+email) — BSC `Priest` has no email typed as required? Actually BSC `Priest` has `email?` no phone; check — must audit.
- `Project-Specific Standards → Architecture` tree — the most dangerous page: it lists the **exact file tree** an agent will try to patch. Every `src/data` line, `src/hooks 3`, `pages Home/Worship` paragraph with `site.mass` details, `utils/monogram` note — all Risen.
- Any `index.html` OG/JSON-LD description that quotes `91 Toa Payoh / 319193 / Risen Christ` — the real file is already BSC.
- `src.orig/` policy paragraph (pruned, lineage Rother→St Mary) — must be updated to `BSC is current src/; immediate predecessor is Risen Christ at src.orig/; St Mary is the earlier hop`.

#### `README.md` — visitor-facing overview

| Slice | Risen claim | BSC truth |
|---|---|---|
| Title + badges + blockquote | `Church of the Risen Christ` 1.4.4 + `91 Toa Payoh … He is risen … Grateful/Faithful/Sent` | `Blessed Sacrament Church · Queenstown` 1.4.4 + `1 Commonwealth Drive … Tent of Meeting … To be an evangelising church with a Eucharistic spirituality` |
| Key Features table (8 rows) | Each row describes Risen copy (Home hero `He is risen`, About priests 3 + ppc 7, History 1969–2026 first air-con, Worship 6.30a/6p + Mand 8.15, Ministries language-communities Mand 8.15 …, News 54th Velankanni + CEP + F.R.E.E., Serve 4 roles pasted) | Must describe BSC copy (Home `A tent of meeting` + quickFacts Commonwealth/Corpus/SS.CC + grounds Main Church/Adoration Chapel/Father Damien Centre + events Corpus Christi/Sacred Heart …; About pillars Eucharist/Evangelise/Sacred Hearts + priests 5 + ppc 6; History 1958→2023 TOMR; Worship mass 8.30/12.30/6.30 + Sat 6pm + Sun 7.30 Mand + Tamil 3rd Sat …, devotions Divine Mercy Novena Sacred Heart vigil …; Ministries language-communities Indo last Sun 1pm + Tag 3.15pm English 3rd Sun; etc.) |
| Tech Stack table + routing table + system diagram | All good structurally — row copy/stock strings (Risen Christ) + diagram nodes referencing `1969–2026 first air-con` + `91 Toa Payoh` | Rename node labels to `1958–2026 Tent of Meeting` + `1 Commonwealth Drive` |
| File Hierarchy tree | The single most impactful artifact — every path, count, and annotated line is Risen (`35 files/202 tests`, `hooks 3 inc useScrollSpy`, `data priests 3`, `images 11`, `index.css 24+2 shadows 27 utilities+8 keyframes`, `e2e 8 specs 51`, `scr/test/setup.ts missing`) | Must be regenerated from `find src -type f` + `cat src/data/*` (39 files, 2 hooks, priests 5, ppc 6, images 11 but all local, index.css gold-700 present, e2e 9 specs but assertions stale, `src/test/setup.ts` missing) |
| Quick Start / Verify Setup / Deployment / Troubleshooting | `pnpm test expect 35/202`, `ls dist/images 8 files … hero-church + chapel-interior …`, hash anchors correct — but expected strings (Risen) must become BSC; deployment Host H1 `risen-christ.jesspete.shop` must become `bsc` host note | Verify commands still 0-tests until harness repaired |
| Design System token table + utility sentence | Lists Risen token nuance (`terracotta-600 #8f4c30 F-1`, `gold-700` note) but omits `gold-700` in table — BSC has `gold-700`; keep truthfully | Pin BSC tokens (25+2=27 incl gold-700) |
| Docs / version footer | Links to `risen-christ_SKILL.md`, lineage stubs, live `www.risenchrist.org.sg`; `Current audits` paragraph last-reverified 2026-08-31 Risen 397.52kB | Links become `blessed-sacrament_SKILL.md`, live `www.bsc.org.sg`, last-reverified “BSC port — harness broken, docs stale” |

#### `risen-christ_SKILL.md` — canonical distillate (156kB, §§0–20 + Appendices, unified v3)

The biggest single risk: its **§0 Volatile Facts Register** is currently the *single source of truth* every other section references — and every row is Risen.

Rows that will be wrong on ship if not fixed:

- Canonical instance `Risen Christ Toa Payoh — risen-christ-church repo 1.4.4` → `Blessed Sacrament Queenstown — blessed-sacrament-queenstown repo 1.4.4`
- Unit tests `35 files / 202` → `0 files / 0 tests — harness missing (src/test/setup.ts absent); 39 src files`
- E2E `51 / 8 specs` → same 51 but **stale assertions** — BSC copy not asserted (or note “51 e2e NOT green on BSC copy”)
- `src/` inventory `77 = 41+35+1` → `39 = 39 source + 0 tests + 0 setup` + `src.orig 77`
- Build artifact `397.52kB` — unreverified on BSC; run `pnpm build` to re-pin
- Design tokens `25+2` — BSC still `25+2` (same count, but `gold-700` now present — note)
- Utilities/keyframes `27+8` — unchanged (verify `card-tint` still in BSC `index.css`)
- Hooks `3 inc useScrollSpy` → `2 (useScrolled, useScrollProgress); useScrollSpy removed — see Decision D1`
- Routes `17 entries / 7 aliases / 9 anchors` → **unchanged** (still 17/7/9 — BSC preserved the same routing contract)
- CSP `img-src 'self' data: blob:` → unchanged
- `src.orig/` policy `PRUNED … St Mary` → `PRESENT (77 files, Risen Christ) — BSC archive; not pruned`
- `skills/` policy `re-added in full at 0be0fe8` → `DELETED in working tree — vendored catalog removed; tooling still ignores`
- Data arrays `lifeTimeline 8 (1969–2026) / priests 3 / ppc 7 / grounds 3 (main-church/chapel/parish-hall) / ministries 6 lang-comm Mand 8.15 …` → `lifeTimeline 8 (1958–2026 TOMR) / priests 5 / ppc 6 / grounds 3 (main-church/chapel/rosary-garden → Damien Centre) / ministries 6 lang-comm Indo last Sun … / events 6 (Corpus Christi feast-first) / giving 8 (no UEN) / serve 4 / devotions 6 (Divine Mercy/Novena/Sacred Heart vigils)`
- Parish constants `91 Toa Payoh 319193 / UEN T08CC4042G / Easter Sunday / NS19 / buses 88/157/163 B52261 / office 6253 2166 / priest 6255 7509 / media 6356 5958` → `1 Commonwealth Drive 149603 / no UEN / Corpus Christi Thu after Trinity / Commonwealth EW20 / buses 11041/11049 / office 6474 0582 / emerg/WhatsApp 9170 9133 / no media centre`
- Pre-push gate `green 2026-08-31` → **red** until `pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build` re-run on BSC

Every other § that says “see §0” is currently referencing the wrong parish — fixing §0 first fixes the graph.

Also: the skill doc’s frontmatter `name: static-spa-parish-site` (unified v3 wrapper) and `project_state: 77 src files … Risen Christ canonical` + `port_provenance: Singapore port of https://www.risenchrist.org.sg/` + appendices lineage stubs (`rothershrine-v2`, `st-mary-of-angels`, `risen-christ`) + Appendix G fossil-sweep protocol must be extended for hop 4 (BSC).

### 1.3 `src/` vs `src.orig` — adoption & improvement ledger (what the BSC port kept / improved / lost)

| Contract | `src.orig` (Risen) | Current `src/` (BSC) | Verdict |
|---|---|---|---|
| **HashRouter + 17 Route alias groups** | canonical 17 entries, 7 aliases/5 groups | preserved 1:1 (verified `App.tsx` diff null) | ✅ adopted |
| **vite-plugin-singlefile single-file build** | `dist/index.html + dist/images/` | same `vite.config.ts` plugins | ✅ adopted |
| **Tailwind v4 CSS-first @theme tokens** | 25 colors + 2 shadows, 2x8 keyframes, 27 utilities, themed scrollbar | same token set (BSC adds `gold-700` back) + utilities intact | ✅ adopted, minor improvement |
| **Layout double-hash scroll + page-in keyed container + SkipLink hash discipline** | `Layout.tsx` double-hash `split('#') + 80ms + fallback` + `data-testid page-container` | `Header` still `h-11 w-11`, `Layout` still double-hash — need byte-diff check but structure preserved | ✅ adopted (verify with `diff src/components/Layout.tsx src.orig/components/Layout.tsx`) |
| **Modal drawer (round-4 L-5: dialog/aria-modal/focus-trap/restore/outside pointerdown)** | present | `Header.tsx` still modal dialog — verify trap still present | ✅ adopted (spot-check) |
| **SafeImage fallback (lazy + fetchPriority high + dataset.fallback guard)** | present | present (Home hero + PageHero use `fetchPriority="high"`) | ✅ adopted |
| **MassCard today-highlight via `massDayKey`** | present | present (`Worship.tsx` MassCard) | ✅ adopted |
| **Sacred Motion (rise-in stagger, menu-in/drawer-in, grid-rows accordion, card-lift, link-underline, dot-pulse)** | present in `index.css` | utilities present (verify count 27 vs src.orig 27) | ✅ adopted |
| **EventMeta chip + categoryTone (round-5)** | `components/EventMeta.tsx` shared | still present | ✅ adopted |
| **monogram SS.CC-aware** | stripped Fr/Friar only | BSC **improves**: adds `ss.cc/sscc/mr/ms/mrs` → `Fr Johan … → JW` correctly | ✅ improved |
| **`useScrollProgress` rAF + clamp** | present | BSC improves: `raf` var naming + cleaner ternary `max>0 ? … : 0` | ✅ improved (trivial) |
| **`deepLinks` pre-mount rewrite + drift guard** | full JSDoc + `knownRoutePaths` + `resolveHashRedirect` | BSC **regresses**: stripped comments/JSDoc, body identical — guard comments lost | □ lost polish (restore or keep minimal) |
| **`useScrollSpy` (round-7)** | present (ministries scrollspy IO) | **absent** | ❌ lost — ministries pill `aria-current` still static on hash only |
| **Test harness `src/test/setup.ts` + 35 files/202 tests + docs-contract guards** | present, green | **absent** — `pnpm test` broken | ❌ lost — highest remediation priority after docs |
| **E2E deep-link path→hash rewrite coverage** | `e2e/deep-links.spec.ts` + `head`/`security-headers` tests | e2e still 9 specs but assertions Risen-stale | □ stale (tests exist, facts wrong) |
| **Content fidelity** | Risen Christ facts correct to `www.risenchrist.org.sg` | BSC facts correct to `www.bsc.org.sg` (new parish) — correct for new identity | ✅ correct (but docs call it wrong) |

**Net:** BSC `src/` adopted **10/13** hard-won contracts, improved **2**, lost polish on **1**, and lost **2** (useScrollSpy + test harness). The doc task should (a) truthfully record this ledger and (b) not silently erase the two losses — flag them.

### 1.4 Constraints & non-goals

- **Surgical edits only** — touch only what the BSC port requires; match existing doc style (markdown, tables, mermaid) exactly; no adjacent refactors.
- **No SSR/CMS, no new routes, no BrowserRouter, no new hex colors, no `cn()` bypass** — invariants from CLAUDE.md still hold.
- **Out of scope for this doc task:** fixing `pnpm test` harness, rewriting e2e to BSC copy, restoring `useScrollSpy`, re-pinning `dist/index.html` size, deploying to `bsc.org.sg` host. Each is flagged as a **follow-up** with a decision gate.

---

## 2. PLAN — Structured Execution Roadmap

> **Approach chosen (of 3 considered):** *Docs-first, fossil-sweep discipline* — single-pass rewrite of all four docs
> against a freshly verified Volatile Facts Register, rather than (a) piecemeal per-doc patches (leaves
> cross-doc drift) or (b) regenerating docs from scratch (destroys lineage appendices). This matches the
> unified v3 method that fixed the Rother→St Joseph→St Mary→Risen drift (see `risen-christ_SKILL.md` App G).

### Phase 0 — Ground Truth Verification (before any doc edit)

**Goal:** pin the numbers that will populate every doc — no “trust the old header”.

| # | Task | How to verify | Success criteria |
|---|---|---|---|
| 0.1 | Re-run `find src -type f \| wc -l` + `find src.orig -type f \| wc -l` + `ls -R src` + `grep -n export src/data/content.ts` + `grep -n transport/mass src/data/site.ts` + `cat index.html \| grep og:` | `bash` in working tree | `39` / `77` / parish constants / image counts confirmed |
| 0.2 | `pnpm typecheck` + `pnpm lint` + `pnpm build` (no `pnpm test` until harness exists) — record `dist/index.html` bytes + `_headers` | bash | lint 0, typecheck 0, build size re-pinned — or failures recorded as known gaps |
| 0.3 | Verify `src/index.css` token/util/keyframe counts (`rg -c "shrine-" …`, `rg -c "keyframes"`) + `rg "useScroll" src/hooks` | bash | 25+2 tokens, 27 utils, 8 keyframes, 2 hooks — or drift noted |
| 0.4 | Snapshot `e2e/` spec counts + `git log --oneline -5` + `git status --short` (skills deletion) | bash | doc-input facts frozen in §0 draft |

**Exit gate:** a single `Volatile Facts Register` row set that all four docs will share. Checked by reviewer as “`rg -n "35 files" ` no longer appears outside history sections”.

### Phase 1 — `risen-christ_SKILL.md` (do this first — it is the source of truth the other docs reference)

**Rationale:** every other doc says “see SKILL §§ …” — fix the SKILL’s §0 first, then the others become trivial.

| # | Edit | Detail | File region |
|---|---|---|---|
| 1.1 | Rename + stub | Create **`blessed-sacrament-queenstown_SKILL.md`** (or `blessed-sacrament_SKILL.md`) as the canonical v4 instance; turn `risen-christ_SKILL.md` into a **redirect stub** (like `st-mary-of-angels_SKILL.md` already is) — `> Superseded by blessed-sacrament-queenstown_SKILL.md — see there.` Keep `rothershrine-v2_SKILL.md` as historical stub. | new file + stub |
| 1.2 | Frontmatter | `name: static-spa-parish-site` unchanged, `description` parish-template, `version: 4.0.0` (hop 4), `project_state: 39 src files / 0 tests — BSC port of www.bsc.org.sg …`, `port_provenance: https://www.bsc.org.sg/ — 1 Commonwealth Drive …` + lineage `Rother → St Joseph → St Mary → Risen Christ (src.orig) → Blessed Sacrament (src)` | frontmatter |
| 1.3 | **§0 Volatile Facts Register** — rewrite every row | Canonical instance BSC, SKILL version 4.0.0, unit tests `0 files / 0 tests — harness absent`, E2E `9 specs — Risen assertions stale (51)`, `src/` `39`, `src.orig` `77 (Risen)`, build `To re-pin in Phase 0.2`, tokens `25+2`, utils/keyframes `27+8`, hooks `2`, utils `4`, routes `17/7/9`, CSP `self data blob`, `src.orig` policy `PRESENT (Risen)`, `skills/` `DELETED`, data arrays `priests 5 / ppc 6 / timeline 8 1958–2026 / grounds 3 …`, parish constants `1 Commonwealth 149603 / Corpus Christi / EW20 / 6474 0582`, pre-push gate `RED — harness broken` | §0 table |
| 1.4 | §§1–4 (Identity, Stack, Bootstrapping, Design System) | §1 parish fidelity → BSC 1958–2023 TOMR facts; §2 stack — same pins, update “Canonical instance” pointer to BSC; §3 bootstrapping — note `skills/` deleted, `src/test/setup.ts` missing; §4 tokens/utilities — add `gold-700` to token table, keep `terracotta-600 F-1` note but note BSC still passes AA | §§1–4 |
| 1.5 | §§5–8 (Architecture, Hooks, Data, A11y) | §5 tree → regenerate from `find src -type f`; §6 → hooks 2 (drop `useScrollSpy` row, add “absent — see decision D1”); §7 data arrays → priests 5 etc. + images still local; §8 quirks double-hash etc. — keep but update any `91 Toa Payoh` anchor text | §§5–8 |
| 1.6 | §§9–14 (Anti-patterns, Debugging, Pre-ship, Lessons, Pitfalls, Best Practices) | Pre-ship gate → mark `pnpm test` red + action “restore harness”; Pitfalls → add fossil-sweep failure that produced this drift (Risen facts survived BSC port) | §§9–14 |
| 1.7 | §§15–20 + Appendices + Quick Ref | Type tables: `Priest {name, role, email?}` (no phone), `PpcMember` 6, `site.ts` shape (no `uen`, has `whatsapp`, `sacredHearts`), `monogram` honorifics incl `ss.cc`; App D/F lineage → add hop 4; App G ledger → new entry “BSC port doc drift”; Quick Ref → `pnpm test → 0 / e2e assertions stale / skills deleted` | §§15–20, Apps |
| 1.8 | Fossil sweep | `rg -n "91 Toa Payoh|319193|Grateful.*Sent|He is risen|UEN T08CC|Velankanni|Toa Payoh NS19|Brian.*Arun.*Dexter|Peter Quek.*Audrey"` across new SKILL — every hit must be either removed or explicitly tagged `as of Risen (historical)` in an appendix only | pass 1 |

**Success:** `rg -n "Risen Christ" new-skill | wc -l` is 0 outside lineage appendices; `npx tsc --noEmit` still passes (skill is markdown — no type gate, but no broken links).

### Phase 2 — `AGENTS.md` (compact agent cheat sheet)

| # | Edit | File region |
|---|---|---|
| 2.1 | Title + blockquote: `blessed-sacrament-queenstown` + `1 Commonwealth Drive 149603, blessed 8 May 1965, folded blue Tent of Meeting, Sacred Hearts SS.CC, “To be an evangelising church …”` | header |
| 2.2 | Stack line: keep pins; add `skills symlink → vendored (deleted in worktree — see § skills)` note is optional — keep same as SKILL §0 | Stack |
| 2.3 | Commands table: `pnpm test` row → `0 files / 0 tests — harness missing (src/test/setup.ts absent; see Follow-up F1)`; `pnpm test:e2e` row → `9 specs — 51 tests — assertions still Risen Christ copy (stale on BSC)` + note `skills` deletion in the “harness” bullet | Commands |
| 2.4 | Structure tree: regenerate from real `find src -type f` (39 files, no test tree), hooks 2, `data priests[5] / ppc[6] / lifeTimeline 8 1958–2026 / grounds 3 (Main Church/Chapel/Damien Centre) / ministries 6 (Language Communities Indo last Sun)`, `site` (no UEN, has whatsapp/sacredHearts), `index.css` gold-700 present | Structure |
| 2.5 | Quirks bullets: keep `useScrolled(16)`/`ScrollProgress`/`SafeImage`/`SkipLink`/`Drawer`/`useScrolled`/`ScrollProgress`/`BackToTop`/`massDay` truthfully; **strike or soften** `useScrollSpy` + `Light of the Portiuncula` parish-specific bullets that assert Risen facts — or retag as historical | Quirks |
| 2.6 | Conventions → Routing (unchanged 17/7/9) / Data (full rewrite to BSC arrays + BSC site constants: `1 Commonwealth 149603`, `uens none`, `feast Corpus Christi`, `transport EW20`, `mass 8.30/12.30/6.30 + Sat 6pm + Sun 7.30 Mand`, `monthly` absent) / Components / Styling | Conventions |
| 2.7 | Don’t: replace Risen parish facts block with BSC canonical facts + warning not to reintroduce Risen/Toa Payoh facts | Don’t |
| 2.8 | Where to look next: mark pre-BSC audits as `(historical — Risen Christ)` and add `docs/plan-adapt-docs-to-bsc-2026-09-02.md` + new `dist` pin | Where to look next |
| 2.9 | Fossil sweep of `AGENTS.md` | pass 2 |

### Phase 3 — `CLAUDE.md` (authoritative agent onboarding — longest edit, but mechanical after SKILL+AGENTS)

Approach: **section-by-section mirror of AGENTS fixes** — same parish-constant swaps, but every occurrence (not just summary tables).

| # | Section | What to change |
|---|---|---|
| 3.1 | Header block | `https://www.bsc.org.sg — Blessed Sacrament Church, Queenstown — 1 Commonwealth Drive 149603 — 8 May 1965 Tent of Meeting — conserved 2005 — TOMR 2019–2023 — Sacred Hearts SS.CC — Eucharistic spirituality` |
| 3.2 | Stack pill line + `README → CLAUDE` pointer | same as AGENTS |
| 3.3 | Foundational Principles → Parish fidelity | full paragraph rewrite → BSC facts (1958 Dutch SS.CC, 1963 Damien Hall, 1965 Olçomendy tent, 2005 conservation, 2019 TOMR $9.4m, 2023 Corpus Christi + Oliver Wihardja Stations, 5 languages Mand 7.30/Tamil 3rd Sat 19.30/Indo last Sun 13.00/Tag 15.15) + warning not to reintroduce Toa Payoh/Velankanni/UEN |
| 3.4 | Implementation Standards → Routing table | structure unchanged; update canonical description strings to BSC `nav.ts` descriptions |
| 3.5 | Vite / React+Router / Layout / Navigation single source | no structural change; update any inline parish-string examples |
| 3.6 | Development Workflow → Build Commands | `pnpm test 0 / broken`, `test:watch none`, `test:e2e 51 but stale`, add footnote `F1: harness missing` |
| 3.7 | Testing Strategy | Replace Risen “35 files/202 historical + porting checklist for Risen” with BSC `0 / harness missing` + BSC porting checklist (priests 5, ppc 6, timeline 1958–2026, mass slots, transport EW20, no UEN) + note e2e assertions stale |
| 3.8 | Code Quality → Type Safety | `Priest {name, role, email?}` (BSC) not `email+phone`; `serveRoles {title+summary}` unchanged |
| 3.9 | Git & Version Control → Branching/Commits | no change |
| 3.10 | Project-Specific Standards → Architecture tree | **Full regeneration** from `src/` (mirrors AGENTS 2.4 but expanded prose per component/page); hooks 2; pages 10 with BSC prose (`Home` Tent + Damien, `Worship` 8.30/12.30/6.30 + divine mercy/novena, `About` Eucharist/Evangelise/Sacred Hearts, etc.) |
| 3.11 | File Organization & beyond | minor parish-string updates |
| 3.12 | Fossil sweep of `CLAUDE.md` | pass 3 |

### Phase 4 — `README.md` (visitor-facing — most visible)

| # | Section | What to change |
|---|---|---|
| 4.1 | Title + shields + blockquote | `Blessed Sacrament Church` + `1 Commonwealth Drive … Tent of Meeting … SS.CC … Sacred Hearts …` |
| 4.2 | Intro paragraph + “still gathers” sentence → Damien Hall → tent | BSC welcome copy |
| 4.3 | **Key Features table** — rewrite all 8 rows with BSC copy (see §1.1 deltas: Home `A tent of meeting` + quickFacts Commonwealth/Corpus/SS.CC + grounds Damien Centre + events Corpus/Sacred Heart vigilance; About pillars Eucharist/Evangelise/Sacred Hearts + priests 5 + ppc 6; History 1958→2023; Worship `site.mass` BSC slots + `devotions` Divine Mercy/Novena/Sacred Heart vigil/Immaculate Heart/Adoration; Ministries 6 w/ Indo last Sun; etc.) | Key Features |
| 4.4 | Tech Stack table | `pnpm test — 0 files / 0 tests (harness missing)` + E2E footnote `assertions still Risen`; versions unchanged |
| 4.5 | Routing table | same 17 entries (unchanged) — keep |
| 4.6 | System Diagram (mermaid) | node labels `1958–2026 Tent of Meeting` + `1 Commonwealth Drive` (replace `1969–2026 first air-con` + `91 Toa Payoh`) |
| 4.7 | File Hierarchy tree | regenerate from real `src/` (39, 2 hooks, priests 5 …, no test tree, `src/test/setup.ts` missing note) + `public/_headers`, `index.html` BSC OG, `e2e/ 9 specs — assertions stale`, `.github/ci.yml` still triggers but `pnpm test` will fail — note |
| 4.8 | Quick Start / Verify Setup / Deployment / Troubleshooting | `pnpm test expect 0 / harness missing`, `ls dist/images 8 …`, host ⚠️ paragraph `risen-christ.jesspete.shop` → generic “static host (no Pages headers)” or BSC deploy host if known; troubleshooting `pnpm test finds 0 tests → expected until harness restored` |
| 4.9 | Design System token table + utility sentence | add `gold-700 #85601f` row (present in BSC `index.css`), keep `terracotta-600 F-1` |
| 4.10 | Contributing / License / Docs footer | update skill link `blessed-sacrament-queenstown_SKILL.md`, live `www.bsc.org.sg`, lineage stubs, “Current audits 2026-09-02 BSC: lint ? / typecheck ? / tests 0 / E2E stale / build ?kB” |
| 4.11 | Fossil sweep of `README.md` | pass 4 |

### Phase 5 — Cross-Cutting Polish (after the four files are draft-complete)

| # | Task | How to verify |
|---|---|---|
| 5.1 | **Grep sweep for stragglers** — `rg -n "Risen|Toa Payoh|319193|T08CC4042G|Grateful, Faithful|He is risen|Velankanni|F.R.E.E|NS19|Brian D.Souza|Arun Bellarmin|Dexter Chua|Peter Quek.*Audrey"` across `AGENTS.md`, `CLAUDE.md`, `README.md`, `blessed-sacrament*-SKILL.md` — every hit must be either removed or explicitly labelled `(historical — Risen Christ, as of 2026-08-31)` in lineage only | `rg` zero outside lineage |
| 5.2 | Pin `vite.config.ts` docs line: note `setupFiles: ["src/test/setup.ts"]` points to a **missing file** — intentionally, with follow-up ref | `rg -n "setup.ts"` across docs |
| 5.3 | Sync `package.json` `name`/`version` with doc shields (`1.4.4`) | `rg -n "1.4.4"` |
| 5.4 | Ensure `index.html` BSC facts (og:url `bsc.org.sg`, address `1 Commonwealth`, image alt `folded blue tent`) match doc claims | `rg -n "1 Commonwealth|Tent of Meeting|folded blue"` |
| 5.5 | `pnpm lint && pnpm typecheck && pnpm build` green (or recorded as known gap) — _not_ `pnpm test` until follow-up restores harness | bash |
| 5.6 | Write `docs/validation-src-vs-src.orig-2026-09-02.md` stub (optional appendix — BSC vs Risen adoption ledger from §1.3) | file exists |

---

## 3. VALIDATE — Explicit Confirmation Checkpoint

> **Nothing is committed until you approve this plan.**

### Decisions required from you (please answer before implementation)

| # | Decision | Options | Preferred (default) |
|---|---|---|---|
| **D1** | **SKILL filename** | (A) Keep `risen-christ_SKILL.md` as canonical and overwrite it to BSC (simplest) · (B) Create `blessed-sacrament-queenstown_SKILL.md` + turn `risen-christ_SKILL.md` into redirect stub (preserves history, recommended) · (C) Rename to `blessed-sacrament_SKILL.md` | **(B)** |
| **D2** | **`useScrollSpy` missing** | (A) Docs truthfully state “2 hooks — useScrollSpy absent (lost in port)” + flag restore as follow-up · (B) Restore `useScrollSpy.ts` + ministries scrollspy wiring in this same doc task (scope creep — not recommended) | **(A)** |
| **D3** | **Test harness** | (A) Docs state “0 tests — harness missing (`src/test/setup.ts` absent, `pnpm test` broken) — follow-up F1” · (B) Restore minimal `src/test/setup.ts` + port a smoke `content/site/nav` test slice in this task | **(A)** (docs-first); offer (B) as Phase-6 follow-up |
| **D4** | **E2E stale assertions** | (A) Docs note “9 specs / 51 — assertions still Risen Christ copy (stale)” — out of scope for doc task · (B) Also retarget e2e specs to BSC copy in this task | **(A)** |
| **D5** | **Lineage history** | (A) Mark every pre-BSC audit/remediation paragraph as `(historical — Risen Christ, as of 2026-08-31)` and retain · (B) Prune historical paragraphs aggressively (loses lineage) | **(A)** |
| **D6** | **Commit scope** | (A) 1 atomic docs-only commit: `docs: sync AGENTS/CLAUDE/README/SKILL to Blessed Sacrament (bsc.org.sg) port` · (B) 4 commits (one per doc) for bisectability | **(A)** unless you prefer (B) |

If you agree with the defaults, reply **“approved — defaults”** and implementation starts immediately.
If you prefer other options, reply with your picks (e.g. `D1=B D2=A D3=A D4=A D5=A D6=B`).

### Success criteria (the task is done when all pass)

- [ ] `AGENTS.md`, `CLAUDE.md`, `README.md`, and the canonical SKILL doc contain **no** Risen Christ parish facts outside explicitly labelled historical sections (`rg` sweep 0).
- [ ] Every mutable fact in all four docs **agrees** with the single Volatile Facts Register in the canonical SKILL §0 (and `package.json` / `src/data/*` / `index.html` / `find src -type f`).
- [ ] `src/` tree in docs = **39 files**, `src.orig` = **77**, hooks **2**, utils **4**, prizes/priests/ppc/timeline/grounds/ministries/events/giving/serve/devotions counts are BSC-true.
- [ ] `pnpm lint` 0 and `pnpm typecheck` 0 still green (or a gap is explicitly flagged); `pnpm build` size re-pinned in docs (or flagged).
- [ ] Markdown tables + mermaid still render; no broken internal links; LSP `markdown` lint clean.
- [ ] `git status` shows only the 4 doc files (+ new SKILL + redirect stub) changed — no `src/` code churn.

---

## 4. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| **Doc numbers drift again** (copy-forward without re-verifying `find src`) | High (this is how the Risen drift happened) | H — agents ship wrong parish facts | Mitigated by Phase 0 — single verified register + grep-sweep protocol (App G.4 style) |
| **Scope creep — fixing `src/test/setup.ts`, `useScrollSpy`, e2e in same commit** | Medium | M — dilutes the docs-only commit + hides code regressions | Mitigated by decisions D2–D4 — code fixes become a separate follow-up (Phase 6) |
| **Skill rename confuses tooling that `import`s from `risen-christ_SKILL.md`** | Low | L | Mitigated by D1 option B — keep Risen as redirect stub, so old links resolve |
| **Forgetting `skills/` deletion in docs** | Medium | M — onboarding agent tries to `read skills/…` and fails | Mitigated by Phase 1.3/5.1 — explicit `skills/` policy row + grep |
| **Accidental copy of Risen strings back into BSC pages when an agent reads old docs mid-edit** | Low | H | Mitigated by editing SKILL first (Phase 1) so the earliest-read doc is correct |

---

## 5. Effort & Sequencing

| Phase | Wall time | Can parallelize? |
|---|---|---|
| Phase 0 Verification | ~20 min | blocks 1–4 |
| Phase 1 SKILL | ~60–90 min (largest doc, 156kB) | no — gates 2–4 |
| Phase 2 AGENTS | ~20 min | after Phase 1 |
| Phase 3 CLAUDE | ~60 min | after Phase 1 |
| Phase 4 README | ~40 min | after Phase 1 |
| Phase 5 Cross-cutting polish + greps | ~20 min | after 2–4 |
| **Total docs-only task** | **~3–4 hours** (TDD not needed — docs have no runtime tests, but grep-sweep is the acceptance test) |  |

**Follow-up (not in this task, but queued):**

| Follow-up | Trigger if D3/D4 says “restore” | Effort |
|---|---|---|
| F1 `src/test/setup.ts` + minimal unit suite (cn, nav, content, site, massDay, monogram) ported to BSC fixtures | D3=B | ~2 hours |
| F2 `useScrollSpy` restore + `Ministries` wiring + `e2e` assertion retarget to BSC copy | D2=B or D4=B | ~2–3 hours |
| F3 `pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build` full gate re-green | after F1+F2 | ~1 hour |

---

## 6. What we will NOT do in this task (surgical discipline)

- No `src/` component/page/data edits (except if you pick D2/D3/D4 = B).
- No new npm deps, no `package.json` version bump (stay `1.4.4`), no Tailwind/Router/Vite upgrades.
- No `404.html` redirect — `HashRouter` stays (docs reaffirm rationale).
- No `git push` until you approve and until Phase 5 greps are green.

---

## 7. Appendix — File manifest to verify against

```
src/ (BSC, 39 files)
  App.tsx              # HashRouter 17 Route entries (16 + * NotFound; 7 aliases / 5 groups)
  main.tsx             # StrictMode + createRoot + resolveHashRedirect pre-mount
  index.css            # @theme 25+2 + 27 utilities + 8 keyframes + themed scrollbar (verify gold-700 present)
  components/Layout (+SkipLink +BackToTop +ScrollProgress), Header (useScrolled(16) + modal drawer), Footer (whatsapp + sacredHearts), PageHero, Emblem, Timeline, SocialIcons, SafeImage, BackToTop, ui/{Button,Container,SectionHeading,Accordion,Reveal}
  hooks/               # useScrolled(12 default; Header 16) + useScrollProgress(rAF)
  pages/               # Home, About, History, Worship, Ministries, NewsEvents, Serve, Give, FAQ, NotFound (BSC copy)
  data/                # nav.ts (primary 6 + footer 10, description wording), content.ts (priests[5] + ppc[6] + lifeTimeline[8 1958–2026] + grounds[3] + ministries[6] + faqs[6] + upcomingEvents[6] + givingOptions[8] + serveRoles[4] + devotions[6] + images 11 local), site.ts (no uen, feast Corpus Christi Thu after Trinity, 1 Commonwealth 149603, MRT Commonwealth EW20, buses 11041/11049, whatsapp/sacredHearts/chequePayee BSC)
  utils/               # cn(tsMerge) + massDayKey + monogram(ss.cc-aware) + deepLinks (knownRoutePaths + resolveHashRedirect)
  # NO src/test/setup.ts — harness absent (flagged in docs)
```

---

**Next step:** please reply **“approved — defaults”** (D1–D6 = B/A/A/A/A/A) or your alternate picks. On approval the four doc rewrites execute in Phases 1→5 exactly as above.
