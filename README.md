# Blessed Sacrament Church

![version 1.4.4](https://img.shields.io/badge/version-1.4.4-1a2b55)
![React](https://img.shields.io/badge/React-19.2.8-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.3.6-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3.3-06B6D4?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![License Private](https://img.shields.io/badge/license-Private-lightgrey)

> **Static parish site for the Church of the Blessed Sacrament, Queenstown** — 1 Commonwealth Drive, Singapore 149603 — the Tent of Meeting with its folded blue roof by Y. Gordon Dowsett, blessed 8 May 1965 by Archbishop Michel Olçomendy. A conserved house of prayer (URA 2005) served by the Congregation of the Sacred Hearts of Jesus and Mary (SS.CC) since 1958. Ported from [www.bsc.org.sg](https://www.bsc.org.sg/).

A single-file React SPA — warm editorial design (Fraunces + Source Sans 3) on the bespoke `bsc-*` sapphire-blue token palette, `HashRouter` for static-host deep-links, and file-backed content (`src/data/*`) with no backend or CMS. Ships as one `dist/index.html` to GitHub Pages or S3. Queenstown's first satellite town still gathers under one blue tent — Damien Hall in 1963, the tent in 1965, a conserved nave in 2005, and the Tent of Meeting Restoration 2019–2023.

## Key Features

Every row below is implemented — no placeholders. Pages are named exports from `src/pages/` and driven by `src/data/nav.ts` + `content.ts` + `site.ts`.

|  | Feature | What it does |
|---|---|---|
| ☀️ | **Home — A tent of meeting** | Hero (round-19 voice merge): identity eyebrow `site.name — since 1958` at 0.3em tracking, display headline **A tent of meeting.**, `site.tagline` A Household of Faith, Hope & Love., CTAs Mass Times / About Us, icon meta strip (1 Commonwealth Drive · Sunday Masses 7:30 AM – 5:30 PM · SS.CC. since 1958) behind the `scrim-hero` + `hero-ken-burns` roof photography (now meaningfully alt-ed). Welcome: the round-19 overlapping parchment quote card ("You are not a visitor here. You are expected.") straddling the hero boundary, Emblem anchor, `site.vision`, Discover Our Parish CTA, 3-place grounds preview (`grounds` → Main Church / Damien Hall / Parish Grounds) at the round-19 editorial 6px corners, and 6 featured events from `upcomingEvents`. |
| ⛪ | **About — the household** | Parish mission via 3 ghost-numeral pillars (Eucharist / Evangelise / Sacred Hearts SS.CC), priests (`priests` — 3: Fr Johan Wongso SS.CC Parish Priest, Fr William van Soest SS.CC Founding Parish Priest 1958–1970, Fr Odo Tiggeloven SS.CC Co-Founder 1958–), and household (`ppcMembers` — 6: Parish Priest ex-officio + Chairperson / Vice Chairperson / Secretary / Treasurer / Member). |
| 📜 | **History — 1954–Today** | 7-entry `lifeTimeline` via `Timeline` — A Church for Queenstown 1954 (Archbishop Olçomendy applies for a site) → The SS.CC. Arrives 1958 (van Soest & Tiggeloven from Holland) → Damien Hall Opens 1963 → Church Consecrated 1965 (Y. Gordon Dowsett, folded blue roof) → A Growing Community 1970s–80s (7,000+ parishioners) → Conservation Status 2005 (URA, iconic blue roof) → A Household of Faith Today (~1,900 parishioners, 40+ ministries). |
| 🙏 | **Worship — Mass, mercy & Find Us** | Anchor-linked sections with `scroll-mt-28` + `Layout` hash restore: `#mass` (Mass schedule from `site.mass`: weekdays 8.30 a.m./12.30 p.m./6.30 p.m., Sat 8.30 a.m. + 6.00 p.m. + 7.30 p.m. Tamil 3rd Sat only, 6 Sunday Masses — 7.30 Mandarin / 9.00 English / 11.00 English / 1.00 p.m. Indonesian last Sunday / 3.15 Tagalog (English 3rd Sun) / 5.30 English + note public holidays 8.30 only — the card matching today via `massDayKey` carries a gold top rule + "Today" chip), `#confession` (reconciliation after 8.30 + 15 min before 12.30/6.30, Sat after 8.30 & from 5.45, Sun before all Masses + 6 `devotions`: Divine Mercy Fri 20.00 / Novena Sat 17.00 / First Friday Adoration 19.00–05.00 / First Saturday Adoration 09.00 / Intercessory 2nd Fri 19.45 / Eucharistic Adoration daily 9–21), `#visit` (1 Commonwealth Drive S149603, parish office Mon–Fri 9–17.30 / reception Mon–Fri 9–17.30, MRT Queenstown EW19 · Commonwealth EW20 + buses 32/51/111/122/145/195/855, `mapsEmbedSrc` iframe). Aliases: `/mass-times`, `/hours-location`, `/visit` → `/worship`. |
| 🧭 | **Ministries — 6 with jump nav** | Pill-bordered jump nav (`/ministries#<id>`) + alternating `bsc-cream`/`bsc-parchment` sections from `ministries` (6 ids): Liturgical, Faith Formation (catechism/RCIA/adult faith), Pastoral Care (befriending/bereavement/outreach), Family Life (marriage/baptism/family enrichment), Youth & Young Adults (confirmation/retreats/campus), Community & Outreach (Mandarin/Tamil/Indonesian/Tagalog language communities + food drives & social outreach). Canonical `/ministries`, alias `/ministry`. |
| 📰 | **News & Events** | 6 `upcomingEvents` (`NewsEvents` page, compact `PageHero`): First Friday Eucharistic Adoration (1st Fri 19.00 + vigil 22.00–05.00), First Saturday Adoration & Tamil Vigil (1st Sat 09.00 + Tamil vigil 21.00–05.00), Divine Mercy Prayers (Fri 20.00), Novena to Our Lady (Sat 17.00), Intercessory Prayers (2nd Fri 19.45), Parish Feast Day — Corpus Christi (Sunday after Trinity) — categories `Parish`/`Devotion`/`Formation`/`Archdiocese` with `EventMeta` chips. Canonical `/news-events`, alias `/news-and-events`. |
| 🤝 | **Serve — take a place** | 4 `serveRoles` (Liturgical Ministers / Catechists & Facilitators / Pastoral Care / Hospitality & Grounds). No section ids. Canonical `/serve`, alias `/volunteer`. |
| 💛 | **Give · FAQ · NotFound** | **Give** — closes with a dark band (office +65 6474 0582 from `site.ts`). 6 `givingOptions` (PayNow via UEN **T08CC1234A**, Weekend Collection Tap & Give, Cheque payable to `Church of the Blessed Sacrament`, Cash at parish office, General Church Offering, Mass Offerings — icons `globe`/`church`/`book`/`heart`/`flame`/`sprout`). Alias `/donate`. **FAQ** — 6 questions (Mass times incl. languages, confession windows, how to get there Queenstown EW19/Commonwealth EW20/buses 32–855, parking available compound first-come, baptism/marriage via `secretariat@bsc.org.sg` + 6474 0582 six months ahead for weddings, join a ministry via Serve page or parish office) via `Accordion` (single-open) at `/faq`. **NotFound** — `*` catch-all (404, "This path does not lead to the church"). |

## Architecture

### Tech Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| UI | React | `19.2.8` | Functional components + hooks only |
| Routing | React Router | `7.18.2` | `HashRouter` — 17 `Route` entries (16 content paths + `*` → `NotFound`), 5 alias groups / 7 alias paths, hash anchors `#mass`/`#confession`/`#visit` + 6 ministry ids (`HashRouter` + `Layout` outlet) |
| Build | Vite | `7.3.6` | HMR dev, single-file prod build (+ `@vitejs/plugin-react 5.2.0`) |
| Styling | Tailwind CSS + `@tailwindcss/vite` | `4.3.3` / `4.1.17` | CSS-first `@theme` tokens in `src/index.css` |
| Language | TypeScript | `5.9.3` | `strict` + `noUnusedLocals/Params`, `bundler` mode, `@` alias |
| Icons | lucide-react | `1.38.0` | Header/footer + page iconography |
| Utils | clsx + tailwind-merge | `2.1.1` / `3.6.0` | `cn()` class merging — always merge via `cn()` |
| Bundling | vite-plugin-singlefile | `2.3.3` | Inlines JS+CSS into `dist/index.html` (`public/images/` copied to `dist/images/`) |
| Testing | Vitest + Testing Library + jsdom | `3.2.6` / `16.2.0` / `26.1.0` | `vitest run` — **21 files / 112 tests green** (harness `src/test/setup.ts` — F1; BSC fixtures; round-13/16 guard suites included). |
| E2E | Playwright | `1.55.1` | `chromium` (`channel: "chromium"` new headless), `webServer` → `pnpm exec vite --port 5173 --host 127.0.0.1 --strictPort`, `e2e/` — **8 spec files + helpers — 51 tests green — retargeted to BSC copy** (1 Commonwealth Drive, SS.CC. since 1958, Join Us at the Altar); built-artifact pass: `pnpm test:e2e:built` (`playwright.built.config.ts` — `vite preview :4173`, `E2E_BASE_URL` → live host) |
| Linting | ESLint flat + typescript-eslint + react-hooks | `9.39.5` / `8.28.0` / `5.2.0` | `eslint . --max-warnings 0`, `eslint.config.js` (ignores `dist`, `skills`, `src.orig`) |
| Fonts | Google Fonts | — | `Fraunces` (display) + `Source Sans 3` (body) via `index.html` |

Versions pinned exact in `package.json` and match `pnpm-lock.yaml` (`--frozen-lockfile` in CI).

**Routing table — `src/App.tsx` (authoritative):**

| Path | Component | Alias / Canonical |
|---|---|---|
| `/` | `Home` | canonical |
| `/about` | `About` | canonical |
| `/history` | `History` | canonical |
| `/worship` | `Worship` | canonical for `/mass-times`, `/hours-location`, `/visit` |
| `/mass-times` | `Worship` | alias → `/worship` |
| `/hours-location` | `Worship` | alias → `/worship` |
| `/visit` | `Worship` | alias → `/worship` |
| `/ministries` | `Ministries` | canonical for `/ministry` |
| `/ministry` | `Ministries` | alias → `/ministries` |
| `/news-events` | `NewsEvents` | canonical for `/news-and-events` |
| `/news-and-events` | `NewsEvents` | alias → `/news-events` |
| `/serve` | `Serve` | canonical for `/volunteer` |
| `/volunteer` | `Serve` | alias → `/serve` |
| `/give` | `Give` | canonical for `/donate` |
| `/donate` | `Give` | alias → `/give` |
| `/faq` | `FAQ` | canonical |
| `*` | `NotFound` | catch-all |

Hash anchors: `/worship#mass`, `/worship#confession`, `/worship#visit` (Worship, via `primaryNav` children + footer) and `/ministries#liturgical` / `#faith-formation` / `#pastoral-care` / `#family-life` / `#youth` / `#community` (Ministries jump nav — `ministries.map → /ministries#<id>`; language communities id is `community` per `content.ts`). Ministries and Worship use `<Link to="/…#id">` to preserve `HashRouter` route; plain `<a href="#id">` would replace the hash and route to `NotFound`.

### System Diagram

```mermaid
flowchart TB
  B[Browser] --> R[HashRouter — src/App.tsx — 17 entries]
  R --> L[Layout — scroll & hash restore — double-hash aware + 80ms + page-in keyed container]
  L --> H[Header — sticky + useScrolled(16) + primaryNav dropdown + mobile modal drawer + Escape]
  L --> P[Pages — 10: Home / About / History / Worship / Ministries / NewsEvents / Serve / Give / FAQ / NotFound]
  L --> F[Footer — 4-col + divider-weave-thin + 2 socials (Facebook/Instagram custom SVG) + Archdiocese link + site.ts]
  P --> D[src/data — nav.ts + content.ts (1954–Today Tent of Meeting) + site.ts (1 Commonwealth Drive)]
  H & F & P --> S[Tailwind @theme — src/index.css — bsc-* sapphire palette + 2 shadows + gold accents]
  R --> V[Vite 7.3.6 + viteSingleFile 2.3.3]
  V --> O[dist/index.html ~467 kB + dist/_headers + dist/robots.txt + dist/images/ — single file + public assets]
  O --> G[GitHub Pages / S3]
```

`HashRouter` is intentional — static hosts have no SPA fallback, so `/#/worship#mass` works without server rewrites.

## File Hierarchy

```
📂 blessed-sacrament-church/
├── 📄 index.html            # lang, viewport, meta description (Church of the Blessed Sacrament, 1 Commonwealth Drive · Tent of Meeting), CSP (script-src allowlist incl. the beacon origin; build-time sha256 hardening via scripts/inject-csp-hashes.mjs — dist script-src drops 'unsafe-inline'; style-src keeps it for React style attrs; connect-src 'self' https://static.cloudflareinsights.com — round-19 F6 fix), `/favicon.svg` link + theme-color #0a1122 (round-19 F7/F2), full social set (og:image + :alt, twitter:card=summary_large_image + title/description, canonical, og:site_name, og:locale), Google Fonts (Fraunces + Source Sans 3), #root + Church JSON-LD (Church of the Blessed Sacrament, 149603, +65 6474 0582), title "Church of the Blessed Sacrament — Singapore"
├── 📄 eslint.config.js      # flat config (typescript-eslint 8 + react-hooks 5 + react-refresh) — ignores [dist, node_modules, coverage, playwright-report, test-results, skills, src.orig]
├── 📄 playwright.config.ts  # Playwright 1.55 (chromium, webServer → pnpm exec vite :5173, expect timeout 15s)
├── 📄 playwright.built.config.ts  # Playwright vs the built artifact — vite preview :4173 (or E2E_BASE_URL → live host); catches singlefile dev/build divergence
├── 📄 vite.config.ts        # plugins [react, tailwindcss, viteSingleFile] + alias @→src + test {globals, jsdom, setupFiles: src/test/setup.ts (F1), include: src/**/*.{test,spec}.{ts,tsx}, exclude: e2e/** } + server.watch.ignored [skills/**, dist/**, playwright-report/**, test-results/**, coverage/**, src.orig/**]
├── 📄 tsconfig.json         # ES2020 / ESNext / bundler / strict + noUnusedLocals/noUnusedParameters/noFallthroughCasesInSwitch/isolatedModules/noEmit + include [src, vite.config.ts, eslint.config.js, playwright.config.ts, playwright.built.config.ts] + types [node, vitest/globals] + paths @/*
├── 📄 package.json          # name blessed-sacrament-church — scripts: dev / build / preview / typecheck / lint / test / test:e2e / test:e2e:built / test:watch + pnpm@11.0.0 + engines node>=20 (all deps pinned exact)
├── 📄 pnpm-lock.yaml        # committed — deterministic installs via `pnpm install --frozen-lockfile` (CI)
├── 📂 public/
│   ├── 📂 images/           # 9 files: hero-church.jpg, damien-hall.jpg, faith-formation.jpg, family-life.jpg, garden.jpg, liturgical.jpg, pastoral-care.jpg, youth.jpg, community.jpg (Vite publicDir → dist/images/ — upload alongside dist/index.html); all local
│   └── 📄 _headers          # Cloudflare Pages security headers (HSTS/XCTO/XFO/Referrer-Policy/Permissions-Policy) → dist/_headers — honored only on Cloudflare Pages deploys + robots.txt
├── 📂 src/                  # 63 files — 41 source + 21 tests + 1 setup (harness F1)
│   ├── 📄 App.tsx           # HashRouter + 17 Route path entries (16 content paths + * → NotFound inside the Layout wrapper; 5 alias groups / 7 alias paths; hash anchors #mass/#confession/#visit + 6 ministry ids)
│   ├── 📄 main.tsx          # StrictMode + createRoot + resolveHashRedirect pre-mount rewrite
│   ├── 📄 index.css         # @theme bsc-* tokens (sapphire-blue palette + gold accents + 2 shadows) + round-19 --radius-* editorial overrides (xs/sm 2px · md 3px · lg/xl 4px · 2xl 6px) + @layer base (body kern+liga, global :focus-visible gold ring) + @layer utilities (31: text-balance, bg-adobe-texture, bg-gold-bloom, bg-grain, divider-weave, divider-weave-thin, gold-rule, gold-rule-left, hero-ken-burns, img-zoom, mask-fade-b, reveal, reveal-visible, rise-in + rise-in-d1..d4, menu-in, drawer-in, drawer-item-in, page-in, dot-pulse, card-lift, card-tint, link-underline, skip-link, scrim-hero, scrim-page, hero-fade, bloom-drift + 10 keyframes)
│   ├── 📂 components/
│   │   ├── 📄 Layout.tsx    # Outlet + scroll/hash restoration (double-hash aware, split on #, strip /, setTimeout 80ms, fallback window.scrollTo) + ScrollProgress + SkipLink + keyed page-in container
│   │   ├── 📄 Header.tsx    # fixed sapphire-950 bar, useScrolled(16), hover/focus-open dropdown (primaryNav; trigger has no click-toggle — keyboard via onFocusCapture), mobile modal drawer (dialog + aria-modal + focus trap + focus restore; closes on in-drawer link, Escape, outside tap), includes top bar Give link
│   │   ├── 📄 Footer.tsx    # 4-col + divider-weave-thin + 2 socials (Facebook/Instagram custom SVG) + Archdiocese text link + site.ts address 1 Commonwealth Drive
│   │   ├── 📄 PageHero.tsx  # sapphire hero primitive (bg-grain + gradients + rise-in)
│   │   ├── 📄 Emblem.tsx    # inline SVG emblem
│   │   ├── 📄 SafeImage.tsx # local fallback (fallback default /images/hero-church.jpg, lazy, onError dataset.fallback guard, optional fetchPriority)
│   │   ├── 📄 SkipLink.tsx  # skip-to-main-content (preventDefault + focus #main-content; never rewrites hash)
│   │   ├── 📄 SocialIcons.tsx # custom SVG brand glyphs (2 icons: Facebook + Instagram)
│   │   ├── 📄 Timeline.tsx  # gradient rail + display-serif years + Reveal — renders lifeTimeline (1954–Today Tent of Meeting)
│   │   ├── 📄 BackToTop.tsx # threshold 480 + SVG progress ring (stroke-dashoffset via useScrollProgress) + reduced-motion
│   │   ├── 📄 ScrollProgress.tsx # fixed gold rail (scaleX progress, aria-hidden, z-[60])
│   │   └── 📂 ui/           # Button (to/href/button + icon; variants primary|secondary|ghost|outline-light), Container, SectionHeading, Accordion (single-open, inert), Reveal
│   ├── 📂 hooks/            # 3 files — useScrolled + useScrollProgress + useScrollSpy (F2A)
│   │   ├── 📄 useScrolled.ts # scrollY > threshold → scrolled boolean (default 12; Header passes 16)
│   │   ├── 📄 useScrollProgress.ts # 0..1 progress, rAF-throttled, unscrollable guard
│   │   └── 📄 useScrollSpy.ts # active section tracking via IntersectionObserver
│   ├── 📂 pages/            # Home, About, History, Worship, Ministries, NewsEvents, Serve, Give, FAQ, NotFound (10 files, all named exports)
│   ├── 📂 data/
│   │   ├── 📄 nav.ts        # primaryNav (6 top-level: Home / About{The Parish, Our History, FAQ} / Worship{Mass Times, Confession & Adoration, Find Us} / Ministries{Liturgical, Faith Formation, Pastoral Care} / News & Events / Serve) + footerNav 10 links
│   │   ├── 📄 content.ts    # 10 interfaces + images 7 keys (all local) + priests 3 (Johan/William/Odo — SS.CC) + ppcMembers 6 + lifeTimeline 7 (1954–Today) + grounds 3 (main-church/damien-hall/garden) + ministries 6 (liturgical/faith-formation/pastoral-care/family-life/youth/community→Community & Outreach) + faqs 6 + upcomingEvents 6 (Corpus Christi feast-first, Parish/Devotion categories) + givingOptions 6 (UEN T08CC1234A, cheque Church of the Blessed Sacrament) + serveRoles 4 + devotions 6
│   │   └── 📄 site.ts       # canonical single source: name Church of the Blessed Sacrament/shortName Blessed Sacrament Church/tagline A Household of Faith, Hope & Love./vision To be a vibrant Eucharistic community…/congregation SS.CC, address 1 Commonwealth Drive 149603, hours (church/office/reception/adoration/confession), mass (weekdayMorning 8.30+12.30/weekdayEvening 18.30/saturday 8.30+18.00+19.30 Tamil 3rd Sat/sunday×6 incl. Mandarin 7.30 + Indo last Sun 13.00 + Tagalog 15.15/confession/adoration/secondCollection + note public holidays + monthly), contact (6474 0582 / fax 6472 6545 + secretariat@bsc.org.sg), transport (Queenstown EW19 · Commonwealth EW20 + buses 32/51/111/122/145/195/855), feast Corpus Christi Sunday after Trinity, uen T08CC1234A, chequePayee Church of the Blessed Sacrament, socials (facebook/instagram/youtube) + archdiocese + mapsUrl/mapsEmbedSrc — Footer + Worship + About consume it, don't duplicate
│   ├── 📂 utils/            # 5 files — cn + massDay + monogram + deepLinks + categoryTone
│   │   ├── 📄 cn.ts         # twMerge(clsx) — always merge via cn()
│   │   ├── 📄 massDay.ts    # massDayKey(date) — single source for the Worship today-highlight
│   │   ├── 📄 monogram.ts   # monogram(name) — honorific stripping for priest discs
│   │   └── 📄 deepLinks.ts  # knownRoutePaths + resolveHashRedirect — path-style deep links rewrite to hash routes pre-mount + drift guard
│   ├── 📂 test/
│   │   └── 📄 setup.ts      # Vitest harness (F1 — restored)
│   └── 📂 **/*.test.{ts,tsx} # 26 files — green (incl. round-16 public-contract + token-integrity + Header + Layout.anchor; round-17 motion-contract + home-hero + worship-sacraments; round-18 Header drawer contracts)
├── 📂 e2e/                  # 10 spec files + helpers.ts — 67 tests green (BSC retargeted round 16 + mobile drawer contracts round 18 + round-19 merge contracts): smoke.spec.ts (11) + navigation.spec.ts (8) + mobile-navigation.spec.ts (8) + ministries.spec.ts (4) + give-faq.spec.ts (4) + enhancements.spec.ts (7) + enhancements-round5.spec.ts (6) + enhancements-round7.spec.ts (8) + enhancements-round19.spec.ts (8) + deep-links.spec.ts (3)
│   ├── 📄 smoke.spec.ts     # hero + rise-in entrance + Worship/Ministries aliases + hash anchors + NotFound + mobile drawer + event chips + back-to-top (BSC)
│   ├── 📄 navigation.spec.ts# desktop Worship/Ministries dropdown + keyboard + SkipLink + footer 10 links + Give + aria-current (BSC)
│   ├── 📄 ministries.spec.ts# 6 sections + jump nav + imageAlt (BSC)
│   ├── 📄 give-faq.spec.ts  # Give 6 options + FAQ accordion + Worship Find Us + maps (BSC — UEN T08CC1234A)
│   ├── 📄 enhancements.spec.ts + enhancements-round5.spec.ts + enhancements-round7.spec.ts # motion/chip/ring/sticky contracts (BSC)
│   └── 📄 helpers.ts        # gotoHash + expectHash helpers
├── 📄 .github/workflows/ci.yml # CI: lint → typecheck → test → test:e2e → build + artifacts (Node 24, pnpm 11)
├── 📂 docs/                 # historical audits retained for lineage (marked historical) + BSC port docs
│   ├── 📄 prompts.md        # Intent lineage
│   ├── 📄 validation-src-vs-src.orig-2026-08-30.md # (historical)
│   ├── 📄 ui-ux-remediation-plan-2026-08-28.md # (historical)
│   ├── 📄 code-review-audit-2026-08-28.md  # (historical)
│   ├── 📄 code-review-audit-round3-2026-08-30.md # (historical)
│   ├── 📄 remediation-plan-round3-2026-08-30.md # (historical)
│   └── 📄 remediation-round4-2026-08-30.md # (historical — round-4 L-5 drawer→modal — still applies)
├── 📂 skills/               # vendored reference content (skills-catalog.md + per-skill SKILL.md — tracked; lint/build tooling ignores it, do not import)
├── 📄 CLAUDE.md             # Deep conventions (authoritative — update alongside README)
└── 📄 AGENTS.md             # Compact agent cheat sheet
```

Current audits — **round-19 (2026-09-02, `docs/external-audit-validation-round19-2026-09-02.md` + `docs/remediation-plan-round19-2026-09-02.md` + `docs/remediation-round19-2026-09-02.md`)**: "The Merge" — validation of two independent external design audits of both Blessed Sacrament ports (R1 "Two Tents — Visual & UX Audit", R2 "Two Tents, One Parish"), then TDD remediation of every adopted finding (package 1.5.1 → **1.6.0**): **R2-F2** full social-sharing head (og:image + og:image:alt, twitter:card=summary_large_image, twitter:title/description, canonical, theme-color #0a1122, og:site_name, og:locale — SEO gap 6.0/9.0 closed); **R2-F6** CSP `connect-src` dead entry fixed to the real beacon origin `https://static.cloudflareinsights.com` (the old pin allowed a domain Cloudflare never calls); **R2-F7 / R1-F7** the ⛪ emoji data-URI favicon retired for a purpose-drawn `public/favicon.svg` (sapphire field, gold folded-tent-roof mark with a lit facet); **R2-F1** hash-based `script-src` CSP at build time — new `scripts/inject-csp-hashes.mjs` (wired into `pnpm build`) pins every inline script in `dist/index.html` with `sha256-` digests and drops `'unsafe-inline'` from `script-src` (style-src keeps `'unsafe-inline'` — React style attributes for ScrollProgress/Reveal/drawer stagger cannot be hash-pinned; dev keeps the source CSP because Vite's react-refresh preamble is inline); **R1 merge-02 (voice 7.6 → )** the hero leads with the evocative display headline "A tent of meeting." (parish name moves to a 0.3em-tracked eyebrow line; `<title>`/brand/JSON-LD keep the full name) and the Welcome section gains the overlapping parchment quote card carrying "You are not a visitor here. You are expected."; **R1 merge-03** global `:focus-visible` ring (2px `bsc-gold-400`, 3px offset) layered under the per-component rings; **R1 merge-04** editorial corner vocabulary — five `--radius-*` token overrides (xs/sm 2px · md 3px · lg/xl 4px · 2xl 6px; `rounded-full` chips unchanged); **R1-03** typographic inheritance — body `font-feature-settings: "kern" 1, "liga" 1`, eyebrows re-tracked to 0.3em (hero) / 0.25em (sections/welcome); **R1-05 motion** `bloom-drift` joins the vocabulary (14s translate3d+scale alternate on the CTA band's gold bloom — keyframes 9 → **10**, utilities 30 → **31**), `gold-rule` rebuilt as the centre-drawn 1px hairline (transparent→gold→transparent, rule-draw now centre-origin), `rise-in` eased to the liturgical `cubic-bezier(0.22, 1, 0.36, 1)`, timeline halo slowed to the 2.6s rhythm, hero image given a meaningful alt ("…folded blue tent-shaped roof at dusk", aria-hidden removed from the image layer); **R2-F5** `repo-hygiene` gains a private-key-material scan of the tracked executable surface (docs/skills prose exempt — audits deliberately quote the pattern); **R2-F4** documented no-op (singlefile hosting contract — route-splitting re-inlines under `vite-plugin-singlefile`). E2E grew 59 → **67** (new `e2e/enhancements-round19.spec.ts` with 8 contracts: head metadata, favicon, hero voice/alt, quote card, bloom animation, editorial radius, focus ring, drawer regression watch); smoke/navigation pins retargeted to the new hero voice. All gates green — `pnpm lint` 0 + `pnpm typecheck` 0 + `pnpm test` 29 files / 181 tests + `pnpm test:e2e` 67/67 (dev) + `pnpm test:e2e:built` 67/67 (dist — the app boots under the hashed CSP) + `pnpm build` ~470 kB (script-src: 2 sha256-pinned inline scripts, no `'unsafe-inline'`); built artifact re-audited in the browser at 1440×900 + 390×844 (headline, quote card overlap, 6px card corners, focus ring computed 2px rgb(212,173,66) @3px, favicon renders, drawer still 844px with 13 links, console clean). Then **round-18** (2026-09-02, `docs/code-review-audit-round18-2026-09-02.md` + `docs/remediation-plan-round18-2026-09-02.md`): comparative visual/UI-UX audit vs the sibling `blessed-sacrament-queenstown` port + TDD remediation of the mobile navigation (package 1.5.0 → **1.5.1**): **F1 (High)** the mobile drawer collapsed to the 68 px header strip — root cause: `backdrop-filter` on the fixed header made it the containing block for the `fixed inset-y-0` drawer, so the drawer now renders **outside** `<header>` as a sibling and fills the viewport; **F2 (Medium)** outside-click handler ignores the hamburger toggle (pointerdown-then-click no longer reopens the drawer — mirrors queenstown); **F3 (Medium)** the drawer closes only on link taps — parent category labels (About/Worship/Ministries) no longer dismiss it; **F5 (Low)** the Give CTA joined the drawer (gold, after a divider — the desktop top-bar Give is `hidden lg:block`). New `e2e/mobile-navigation.spec.ts` (8 contracts at 390×844: full-height geometry, per-link containment, close paths, label-tap, Give) + 5 `Header` unit contracts (drawer-not-in-header structural guard incl.). All gates green — `pnpm lint` 0 + `pnpm typecheck` 0 + `pnpm test` 26 files / 149 tests + `pnpm test:e2e` 59/59 (dev) + `pnpm test:e2e:built` 59/59 (dist) + `pnpm build` ~468 kB; built artifact re-audited in the browser (drawer full-height with 13 links, label-tap keeps it open, X closes it, console clean). Then **round-17 (2026-09-02, `docs/design-enhancement-round17-2026-09-02.md`)**: visual & UI/UX enhancement "Light on the Tent" — browser audit of the live site (9 severity-ranked findings), then TDD remediation: hero/PageHero imagery made visible (opacity 30/25→55/45) under named bottom-heavy `scrim-hero`/`scrim-page` scrims, `hero-fade` image settle, `rule-draw` animated gold rules, Button hover lift (solid variants), event-card `card-lift`, Welcome Emblem anchor, hero meta weave rule, sacrament icon chips, Grounds "Visit →" affordance. Utilities 27+7 → **30+9** (token budget unchanged 33+2); package 1.4.4 → **1.5.0**. All gates green — 26 files / 144 unit tests + 51/51 e2e dev + 51/51 built + browser re-audit. Then **round-16 (2026-09-02, `docs/code-review-audit-round16-2026-09-02.md` + `docs/remediation-plan-round16-2026-09-02.md`)**: tiered review + security audit + docs re-pin. Repo hygiene restored (leaked `docs/ssh-key.txt`, `src.orig/`, ignored `package-lock.json` + `docs/*.zip` untracked — the round-6/12/13 remediations had regressed); `public/_headers` + `public/robots.txt` restored and shipped to `dist/`; CSP extended with the Cloudflare Insights beacon allowlist (fixes the live console error); four missing design tokens added (`pine-50/300`, `terracotta-50/300`) with a new `token-integrity` guard; Header a11y (stateful "Open menu"/"Close menu" hamburger, window-level Escape for the desktop dropdown, `aria-label="Primary"/"Mobile"` nav landmarks) + `BackToTop` `aria-label="Back to top"` + Footer `nav` landmarks; `useScrollProgress` StrictMode rafRef fix (dev-only freeze); Layout anchor-scroll cleanup; the 8 e2e specs retargeted to the shipped BSC copy. All gates green — `pnpm lint` 0 + `pnpm typecheck` 0 + `pnpm test` 26 files / 144 tests + `pnpm test:e2e` 51/51 (dev) + `pnpm test:e2e:built` 51/51 (dist) + `pnpm build` ~467 kB (round-16 gate; round-17 re-verified); live host re-verified (43/51 pre-deploy — the 8 pending failures are the new a11y contracts, resolved by deploying the rebuilt artifact). `index.html` is Church of the Blessed Sacrament (1 Commonwealth Drive, Corpus Christi — Sunday after Trinity, Queenstown EW19 · Commonwealth EW20, Fraunces + Source Sans 3, CSP `img-src 'self' data: blob:`, inline emoji favicon, title "Church of the Blessed Sacrament — Singapore"). Historical audits are retained in `docs/` and marked **(historical)**.

## Quick Start

**Requirements:** Node.js ≥20 (Vite 7), `pnpm` preferred (`npm` works).

```bash
# 1 — Clone
git clone <repo-url> blessed-sacrament-church && cd blessed-sacrament-church

# 2 — Install (deterministic)
pnpm install --frozen-lockfile
# npm is not a drop-in for these exact pins: typescript-eslint 8.28.0's peer
# range predates TypeScript 5.9, so use `npm ci --legacy-peer-deps` if you
# must use npm (pnpm is the supported path).

# 3 — Run (HMR)
pnpm dev
# → Local: http://localhost:5173

# 4 — Production build (single file + public assets)
pnpm build
# → dist/index.html  JS+CSS inlined; dist/images/ copied from public/

# Preview prod build
pnpm preview
# → http://localhost:4173
```

### Verify Setup

```bash
pnpm lint               # eslint flat — expect no output (clean)
pnpm typecheck         # tsc --noEmit — expect no output (clean)
pnpm build              # expect: "✓ built in ~3s" + "Inlining: index-*.js / style-*.css"
ls -lh dist/index.html  # expect: single HTML file ~466 kB, no separate assets chunk
ls -lh dist/images/     # expect: 9 images (hero-church + damien-hall + faith-formation + family-life + garden + liturgical + pastoral-care + youth + community)
pnpm test               # expect: 21 files / 112 tests green (harness src/test/setup.ts — F1)
pnpm test:e2e           # expect: 51 tests green (BSC retargeted F2B)
```

| Check | Expected |
|---|---|
| `pnpm dev` | Vite ready on `:5173`, HMR active |
| `pnpm lint` | Exit `0`, no warnings (`--max-warnings 0`) |
| `pnpm typecheck` | Exit `0`, no errors |
| `pnpm test` | **29 files / 181 tests green** (`src/test/setup.ts` — F1; round-18 Header drawer contracts; round-19 head-metadata + design-language + csp-build contracts) |
| `pnpm test:e2e` | **67 tests / 10 spec files green** — BSC retargeted (smoke 11 + navigation 8 + ministries 4 + give-faq 4 + enhancements 7 + enhancements-round5 6 + enhancements-round7 8 + deep-links 3) + round-18 mobile-navigation 8 (390×844 drawer contracts) + round-19 enhancements 8 (head metadata, favicon, voice/alt, quote card, bloom, radius, focus ring, drawer watch) |
| `pnpm build` | `dist/index.html` ~470 kB (script-src sha256-pinned) + `dist/images/` (9 files) + `dist/favicon.svg` + `dist/_headers` + `dist/robots.txt` |
| `pnpm preview` | Prod preview on `:4173`, alias routes (`/mass-times`, `/ministry`, `/donate`, `/volunteer`…) + hash anchors (`#/worship#mass`, `#/ministries#liturgical`) navigate |

## Design System

Tokens live in `src/index.css` `@theme`. Extend there — never use arbitrary `bg-[#...]`.

| Token | Hex | Usage |
|---|---|---|
| `bsc-cream` | `#f8f5ef` | Page background |
| `bsc-parchment` | `#efe8d8` | Section bands, card fills |
| `bsc-parchment-dark` | `#e3d8c2` | Dark parchment variant |
| `bsc-stone` | `#d4c9ae` | Borders, dividers |
| `bsc-ink` | `#1e2330` | Primary text |
| `bsc-charcoal` | `#3a3f4d` | Secondary text |
| `bsc-sapphire-50` | `#eef2fb` | Ghost hover bg |
| `bsc-sapphire-300` | `#7a9bdb` | Eyebrow on dark, header accent |
| `bsc-sapphire-500` | `#3458a8` | Links, primary sapphire |
| `bsc-sapphire-600` | `#28458a` | Header icon, secondary button |
| `bsc-sapphire-700` | `#1f366e` | Display heading |
| `bsc-sapphire-800` | `#1a2b55` | Mid-dark sapphire |
| `bsc-sapphire-900` | `#0f1a33` | Hero + footer background |
| `bsc-sapphire-950` | `#0a1122` | Deepest sapphire (header top strip) |
| `bsc-gold-300` | `#dfc06a` | Eyebrow on dark, header accent |
| `bsc-gold-400` | `#d4ad42` | Gold mid, primary button |
| `bsc-gold-500` | `#c49a2c` | Gold primary |
| `bsc-gold-600` | `#a67f22` | Gold hover |
| `bsc-gold-700` | `#85641c` | Deep gold — text on parchment + hover shade |
| `bsc-pine-50` | `#eef4f0` | Pine chip tint (Formation chip bg) |
| `bsc-pine-300` | `#7fa88f` | Pine chip border |
| `bsc-pine-500` | `#2d5a40` | Pine accent |
| `bsc-pine-600` | `#1f422e` | Accent / weave |
| `bsc-terracotta-50` | `#f7ece7` | Terracotta chip tint (Archdiocese chip bg) |
| `bsc-terracotta-300` | `#d19a83` | Terracotta chip border |
| `bsc-terracotta-500` | `#a86545` | Devotion chip border (decorative) |
| `bsc-terracotta-600` | `#8f5038` | Devotion chip text — AA on parchment |
| `shadow-bsc` | `0 20px 60px -20px rgba(15,26,51,.45)` | Hero, cards, emblem |
| `shadow-bsc-lg` | `0 40px 90px -30px rgba(15,26,51,.55)` | Elevated cards, header dropdown |

**Typography:** `Fraunces` (display, quote, `font-display` / `h1–h4`) + `Source Sans 3` (body, `font-sans` / `font-body` alias) — loaded in `index.html`, set in `@theme` + `@layer base`. Utilities (31 + 10 keyframes, round-19 re-pin): `text-balance`, `bg-adobe-texture`, `bg-gold-bloom` (+ `bloom-drift` 14s alternate drift on the CTA band), `bg-grain`, `divider-weave` / `divider-weave-thin`, `gold-rule` / `gold-rule-left` (round-19 centre-drawn 1px hairline), `reveal` / `reveal-visible`, `skip-link`, `mask-fade-b`, `img-zoom`, `hero-ken-burns` (20s Ken Burns), `scrim-hero` / `scrim-page`, `hero-fade`, plus the "Sacred Motion" set: `rise-in` (+ `rise-in-d1..d4` stagger delays, liturgical `cubic-bezier(0.22, 1, 0.36, 1)`) for hero/PageHero entrances, `menu-in` / `drawer-in` / `drawer-item-in` / `page-in` for dropdown/drawer/route entrances, `card-lift` (hover lift + shadow + gold border) for every interactive card, `card-tint` (honest tint) for info cards, `link-underline` (gold underline draws in on hover/focus), `dot-pulse` (2.6s timeline halo). All are transform/opacity-only and gated by the global `prefers-reduced-motion` block in `src/index.css`. Base layer carries the round-19 global `:focus-visible` ring (2px `bsc-gold-400`, 3px offset) and body `font-feature-settings: "kern" 1, "liga" 1`; corners resolve through the round-19 `--radius-*` editorial overrides (xs/sm 2px · md 3px · lg/xl 4px · 2xl 6px).

## Deployment

Primary artifact `dist/index.html` (~466 kB, + `dist/images/` — 9 files, + `dist/_headers` + `dist/robots.txt`) — no server, no env vars, no rewrites needed. The artifact ships a scoped `Content-Security-Policy` meta (`img-src 'self' data: blob:` only, `object-src 'none'`, `base-uri 'self'`, Google Fonts, `frame-src` Google Maps, `script-src` + `connect-src` allow `static.cloudflareinsights.com` for the host-injected analytics beacon) + a `Referrer-Policy` meta. `public/_headers` adds the host-level headers a static file cannot set (HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) — **on Cloudflare Pages only**. The current host is not assumed to be Pages — those headers are not served on generic static hosts (S3, GH Pages, proxied origins) without an explicit host config. Add the five headers via the host's header config (Cloudflare Transform Rules / `_headers` on Pages / S3 metadata) if the deployment target is not Pages.

CSP (current `index.html`): `default-src 'self'` + `script-src 'self' 'unsafe-inline'` + `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com` + `font-src https://fonts.gstatic.com data:` + `img-src 'self' data: blob:` + `frame-src https://www.google.com` + `object-src 'none'` + `base-uri 'self'`; `<meta name="referrer" content="strict-origin-when-cross-origin">`.

```bash
pnpm build                # produces dist/index.html + dist/images/ (publicDir copy — singlefile inlines JS+CSS, not public/)
# GitHub Pages — push dist/index.html + dist/images/ to gh-pages or serve dist/ as artifact
# S3 / CloudFront — upload dist/index.html as index.html + dist/images/ assets
pnpm preview              # smoke-test before publish
```

Why `HashRouter`: deep-links like `/#/worship#mass` or `/#/ministries#liturgical` resolve without host fallback config (GitHub Pages / S3 have no SPA rewrites). Switching to `BrowserRouter` would require a `404.html` redirect shim. Legacy aliases (`/mass-times`, `/hours-location`, `/visit` → `/worship`; `/ministry` → `/ministries`; etc.) preserve old parish bookmarks. Path-style deep links are rewritten pre-mount via `src/utils/deepLinks.ts` (`resolveHashRedirect`) so a bare `/worship` still lands correctly.

## Contributing

This repo follows the six-phase workflow in `CLAUDE.md` (ANALYZE → PLAN → VALIDATE → IMPLEMENT → VERIFY → DELIVER).

- **TDD:** `RED → GREEN → REFACTOR → Commit` — one cycle per commit; write a failing test before fixing a bug. The Vitest harness is restored (F1) — `pnpm test` (21 files / 112 tests) gates again alongside lint/typecheck/build.
- **Commits:** Conventional Commits — `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `style:` — atomic, subject ≤72 chars.
- **Branches:** `feat/<slug>`, `fix/<slug>`, `docs/<slug>` — short-lived (1–3 days), squash-merge.
- **Conventions:** `PascalCase.tsx` for components/pages, `camelCase.ts` for data/utils, `primaryNav` single-source, alias routes preserved, `cn()` for merges, `bsc-*` tokens only (including `bsc-gold-700` `#85641c`).
- **Pre-push gate:** `pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build` — **all five green** (lint 0 + typecheck 0 + 29 test files / 181 tests + 67/67 + ~470 kB; the build now ends with `scripts/inject-csp-hashes.mjs`, which fails the build if any inline script is left unhashed). CI mirrors this in `.github/workflows/ci.yml` (Node 24, pnpm 11). Sixth built-artifact check: `pnpm test:e2e:built` — vs `vite preview`/live (also green — and it boots the app under the hash-pinned script-src CSP).

> `skills/` is vendored reference content — tracked in full; lint/build tooling ignores it — do not import from or lint it. `src.orig/` is **not part of the repository**; lineage lives in `docs/` + git history. See `AGENTS.md` for the compact cheat sheet.

## Troubleshooting

| Issue | Solution |
|---|---|
| `pnpm dev` port in use (`:5173`) | `pnpm dev -- --port 5174` or kill the other Vite process. |
| `Cannot find module '@/…'` or alias error | Ensure `vite.config.ts` alias `@→src` and `tsconfig.json` `paths {"@/*":["src/*"]}` stay in sync; restart dev server. |
| Hash anchor doesn't scroll (`#/worship#mass` or `#/ministries#liturgical` lands at top) | Target `id` missing — verify `id="mass"` / `id="confession"` / `id="visit"` in `Worship.tsx` or `id="liturgical"` etc. in `Ministries.tsx`; `Layout.tsx` is double-hash aware (`split on #` + strip `/`, `setTimeout 80ms`, fallback `window.scrollTo`). |
| Bare `href="#mass"` routes to NotFound | Use `<Link to="/worship#mass">` (or `/ministries#liturgical`) — plain `#id` replaces the `HashRouter` hash and routes to `*`. |
| `tsc --noEmit` fails on unused var | `noUnusedLocals/Params` is `true` — remove or prefix with `_` only if intentionally unused. |
| External image not loading | `SafeImage` falls back to `fallback` (default `/images/hero-church.jpg`) via `dataset.fallback` guard; current `images.*` are all local (7 keys, 9 files). |
| `pnpm test` finds 0 tests | **Not expected since F1** — the harness (`src/test/setup.ts`) is restored; if Vitest finds nothing, check `vite.config.ts` `test.include`/`exclude` and that `*.test.{ts,tsx}` files exist under `src/`. |
| `pnpm test:e2e` fails | E2E is retargeted to BSC and green; if it fails after content changes, check which BSC assertion drifted (run `pnpm test:e2e:ui` to inspect). |
| `vite.config.ts` setupFiles warning | If Vitest warns `setupFiles` not found, confirm `src/test/setup.ts` exists (it does since F1) — a missing file here means the harness was deleted; restore it before expecting `pnpm test` to collect. |

## License

Private — all rights reserved. © Church of the Blessed Sacrament, Archdiocese of Singapore. No `LICENSE` file is published.

---

**Docs:** [`blessed-sacrament-queenstown_SKILL.md`](blessed-sacrament-queenstown_SKILL.md) (canonical) · [`CLAUDE.md`](CLAUDE.md) · [`AGENTS.md`](AGENTS.md) · Live: [www.bsc.org.sg](https://www.bsc.org.sg/) (canonical parish site)
