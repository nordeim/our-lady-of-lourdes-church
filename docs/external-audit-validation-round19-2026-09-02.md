# External Audit Validation — Round 19 (2026-09-02)

> Purpose: the owner supplied two independent third-party design audits of the two
> Blessed Sacrament ports (queenstown = maroon "shrine", church = sapphire "tent"):
>
> - **Report 1** — "Two Tents — Visual & UX Audit of Blessed Sacrament"
>   (`https://01a060a4-b00b-738c-acca-8954b943b518.arena.site/`)
> - **Report 2** — "Two Tents, One Parish — A Design & UI/UX Audit"
>   (`https://01a060a4-b00b-7b5a-a637-3ccd163d138a.arena.site/`)
>
> This document records, per finding: the claim, our independent verification
> (live HTML fetch 2026-09-02, live browser session at 390×844 / 1440×900, source
> grep), and the disposition for the round-19 remediation of **this** repo
> (`blessed-sacrament-church`). Precondition verified first: the round-18 mobile
> drawer fix **is live** and all six contracts pass (see §0).

## §0 Precondition — round-18 deployment verification (live, 2026-09-02)

Verified against `https://blessed-sacrament-church.jesspete.shop/` with a real
browser at 390×844, before any audit triage:

| Contract | Result |
|---|---|
| Hamburger opens drawer (`aria-expanded` true, "Close menu" state) | ✅ |
| Drawer fills viewport (`drawerTop 0`, height **844/844**) | ✅ |
| All **13 links** present incl. **Give** CTA | ✅ |
| **X** button closes the drawer | ✅ |
| Tapping a section **label** (e.g. "About") keeps the drawer open | ✅ |
| Click **outside** (page content) closes the drawer | ✅ |
| **Escape** closes the drawer | ✅ |
| Console clean | ✅ |

**Conclusion:** round-18 commit `705c593` is what the live host serves; the
reported defect stays fixed in production.

## §1 Report 2 findings (evidence-based ledger F1–F9)

| # | Severity | Claim | Our verification | Disposition (round 19) |
|---|---|---|---|---|
| F1 | Medium (both) | CSP weakened by `'unsafe-inline'` in `script-src` and `style-src` | **Confirmed live** (2× `unsafe-inline` in served meta CSP) and in `index.html:9` | **ADOPT (T9)** — hash-based `script-src` at build time (sha256 of every inline `<script>` in `dist/index.html`, rewritten by a post-build step). `style-src` keeps `'unsafe-inline'` **with documented rationale**: React style attributes (`ScrollProgress` width, `Reveal`/drawer `animationDelay`) are governed by style-attr CSP and cannot be hashed. |
| F2 | Low (church) | Missing `og:image`, `og:image:alt`, `twitter:card`, `canonical`, `theme-color` | **Confirmed live** — 0 hits for all five in served `<head>`; `site.ogImage` asset already exists in `src/data/site.ts` | **ADOPT (T1)** — add all five tags (+ `og:site_name`, `og:locale`) mirroring the queenstown head, with `theme-color #0a1122` (bsc-sapphire-950) |
| F3 | Medium (queenstown only) | Off-token `purple-600` hover + dark-mode block in shipped CSS | N/A for this repo; **verified clean here** (`grep purple/prefers-color-scheme src/ index.html` → no hits); `token-integrity` guard already pins bsc-* usage | **NO-OP** (guard already in place) |
| F4 | Medium (both) | Single-file inlined bundle; church ~467 kB (+19% vs queenstown) | **Confirmed** (round-18 gate: ~468 kB) | **ADOPT-AS-DOCUMENTED-RATIONALE (T10)** — `vite-plugin-singlefile` inlines *all* chunks, so React.lazy route-splitting is counterproductive under this hosting contract; the cheap wins are already in (hero `fetchPriority=high`); rationale recorded in plan + README perf note. No code change this round. |
| F5 | Medium (both) | Self-reported historical leaked-secret incidents; confirm rotation + add secret scanner | **Confirmed** the repo's own round-16 changelog documents the leaked `docs/ssh-key.txt` removal; rotation is owner-side | **ADOPT (T11)** — extend `repo-hygiene.test.ts` with a tracked-file private-key scan (`-----BEGIN`); README security note added; rotation remains an owner action outside git |
| F6 | Low (church) | CSP `connect-src https://cloudflareinsights.com` doesn't match the beacon origin `https://static.cloudflareinsights.com` | **Confirmed live** (`connect-src 'self' https://cloudflareinsights.com`) and in `index.html:9`; note `public-contract.test.ts` currently *pins the dead entry* | **ADOPT (T2)** — fix the entry to `https://static.cloudflareinsights.com`; update the `public-contract` pin in the same change (TDD) |
| F7 | Info (church) | ⛪ emoji data-URI favicon → replace with purpose-drawn SVG mark | **Confirmed live** (`data:image/svg+xml,…⛪…`) and `index.html:5` | **ADOPT (T3)** — `public/favicon.svg` (sapphire field, gold folded-tent-roof mark), `<link rel="icon" href="/favicon.svg">`; ships via publicDir copy like `images/` |
| F8 | Info (both) | Sapphire palette ties literally to the building | Agreement — no action | **NO-OP** |
| F9 | Info (both) | Church loads wider weight range (300–700) | Confirmed in `index.html:16` | **NO-OP** (audit itself says no action required; Light-300 is used by display type) |

## §2 Report 1 findings (aesthetic ledger, church-relevant rows)

Report 1 scores twelve dimensions (A queenstown 8.63 vs B church 8.50) and issues
a "pick a merge" verdict with five recommended merges. Church-relevant items:

| Report-1 evidence | Our verification | Disposition |
|---|---|---|
| **Voice gap 7.6 vs 9.5** — church hero H1 is the functional name; no pull-quote; welcome closes with "Discover Our Parish" | **Confirmed** — `Home.tsx:35` H1 = `site.name`; no quote block | **ADOPT (T5)** — merge-02: evocative display headline "A tent of meeting." with the parish name carried by a new eyebrow line (+ header brand + `<title>` unchanged for SEO), plus an overlapping parchment quote card in the Welcome section carrying "You are not a visitor here. You are expected." |
| **Global `:focus-visible`** — queenstown 2px gold ring @3px offset on all elements; church is per-component only | **Confirmed** — no `:focus-visible` rule in `src/index.css`; Buttons/Header use per-component `focus:ring-*` | **ADOPT (T4)** — merge-03: global `:focus-visible` in `@layer base` (2px `bsc-gold-400`, 3px offset) layered *under* the existing per-component rings |
| **Hero alt** — queenstown describes the roof; church hero is `alt=""` inside `aria-hidden` wrapper | **Confirmed** — `Home.tsx:20-26` | **ADOPT (T6)** — meaningful alt naming the folded blue tent roof; wrapper `aria-hidden` removed from the image layer (scrims/grain stay hidden) |
| **Corner radius worldview** — rounded-2xl/xl cards vs queenstown rounded-sm; "sharp corner is the more honest material" for a 1965 modernist building | **Confirmed** — radius inventory: `rounded-xl ×11`, `rounded-2xl ×9`, `rounded-md ×7`, `rounded-lg ×2`, `rounded-full ×10` | **ADOPT (T7)** — merge-04: Tailwind v4 `--radius-*` token overrides in `@theme` (editorial scale: xs/sm 2px · md 3px · lg/xl 4px · 2xl 6px; `rounded-full` chips unchanged) — a single-point vocabulary shift |
| **Typography** — queenstown "tracks eyebrows like a missal" (0.35em, kern+liga); church 0.15–0.2em, no feature settings | **Confirmed** — tracking inventory `0.15em ×3, 0.2em ×1`; no `font-feature-settings` in `index.css` | **ADOPT (T8)** — body `font-feature-settings: "kern" 1, "liga" 1`; eyebrows to 0.3em (hero) / 0.25em (sections, welcome) |
| **Motion 8.9 vs 8.6** — queenstown bloom-drift (14s) + centre-drawn gold hairlines + liturgical ease `cubic-bezier(.22,1,.36,1)`; church CTA bloom is a static gradient, gold-rule is a static 64px bar, rise-in uses plain ease-out | **Confirmed** — `bg-gold-bloom` static (`Home.tsx:172`); `gold-rule` = 64px 2px bar (`index.css:118`); `.rise-in` ease-out (`index.css:156`); `halo-pulse` 2s | **ADOPT (T9-motion)** — `.bloom-drift` keyframes + utility on the CTA band bloom layer; gold-rule rebuilt as centre-drawn 1px hairline (draw preserved via `.rule-draw`); rise-in → liturgical bezier; halo-pulse 2s → 2.6s; reduced-motion block extended |
| Access table: nav landmarks / mobile drawer / UEN | Church **leads** (rounds 16/18) | **NO-OP** — regression-watch only (drawer contracts re-run in round-19 e2e) |
| Access table: WhatsApp in footer | No verified parish WhatsApp number exists in `site.ts` | **REJECT** — cannot invent contact data |
| 404 copy | Already the audited poetic line on both sites | **NO-OP** |

## §3 Verification method

- Live `<head>` fetched 2026-09-02 (`curl`, 387,150 bytes) — meta/CSP/favicon greps.
- Live browser session (agent-browser, Chromium) at 390×844 — drawer geometry,
  contracts, console.
- Source grep against `src/index.css`, `Home.tsx`, `Button.tsx`,
  `SectionHeading.tsx`, `index.html`, `public/_headers`, `package.json` 1.5.1.
- Sibling reference read: `blessed-sacrament-queenstown` `src/index.css`
  (`:focus-visible`, `bloom-drift`, centre-drawn `gold-rule`), `index.html`
  (full meta set), `Home.tsx` (eyebrow tracking 0.35em).

Confidence legend: **Confirmed** = directly observed live or in source this
session; **Agreement** = matches repo's own records; dispositions reference the
round-19 plan task IDs (T1–T11).
