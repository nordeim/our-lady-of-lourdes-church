# Church of Our Lady of Lourdes

![version 1.6.0](https://img.shields.io/badge/version-1.6.0-1a2b55)
![React](https://img.shields.io/badge/React-19.2.8-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.3.6-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3.3-06B6D4?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![License Private](https://img.shields.io/badge/license-Private-lightgrey)

> **Static parish site for the Church of Our Lady of Lourdes, Singapore** — 50 Ophir Road, Singapore 188690 — the first Tamil Catholic church, blessed 13 May 1888 (cornerstone 1 Aug 1886, Fr Joachim Meneuvrier MEP 1884) — Neo-Gothic modelled on the Lourdes basilica, lancet windows and stained glass of the fifteen mysteries, a grotto of Our Lady and St Bernadette. National Monument No. 52 (gazetted 14 Jan 2005, restored 2009–2010). *A grotto of welcome in the city.* Ported from [ourladyoflourdes.sg](https://ourladyoflourdes.sg/).

A single-file React SPA — warm editorial design (Fraunces + Source Sans 3) on the bespoke `bsc-*` sapphire-blue token palette, `HashRouter` for static-host deep-links, and file-backed content (`src/data/*`) with no backend or CMS. Ships as one `dist/index.html` to GitHub Pages or S3. A muddy swamp at the Rochor bend became a basilica in miniature — Catholics, Protestants and non-Christians paid for the stones, the nave survived the war, and the grotto still asks.

## Key Features

Every row below is implemented — no placeholders. Pages are named exports from `src/pages/` and driven by `src/data/nav.ts` + `content.ts` + `site.ts`.

|  | Feature | What it does |
|---|---|---|
| ☀️ | **Home — A grotto in the city** | Hero: identity eyebrow `site.name — since 1888` at 0.3em tracking, display headline **A grotto in the city.**, `site.tagline` A grotto of welcome in the city., CTAs Mass Times / About Us, icon meta strip (50 Ophir Road · Sunday Masses 8:00 AM – 6:30 PM · National Monument · 1888) behind the `scrim-hero` + `hero-ken-burns` grotto photography. Welcome: the overlapping parchment quote card ("You are not a visitor here. You are expected.") straddling the hero boundary, Emblem anchor, `site.vision` (To be a welcoming Marian household…), Discover Our Parish CTA, 3-place grounds preview (`grounds` → Main Church / Lourdes Grotto / Parish Grounds) and 6 featured events from `upcomingEvents`. |
| ⛪ | **About — the household** | Parish mission via 3 ghost-numeral pillars (Eucharist / Our Lady / Tamil roots), priests (`priests` — 3: Rev Fr Alphonsus Dominic — Parish Priest from 22 Jul 2026, Rev Fr Leo Justin HGN — Assistant, Heralds of Good News reappointed 1 Nov 2024, Fr Joachim A. M. Meneuvrier MEP — Founding Missionary 1884), and household (`ppcMembers` — 6: Parish Priest ex-officio + Chairperson / Vice Chairperson / Secretary / Treasurer / Member). |
| 📜 | **History — 1884–Today** | 7-entry `lifeTimeline` via `Timeline` — A Shepherd for the Indians 1884 (Bishop Gasnier sends Meneuvrier MEP for the Indians) → Land at the Rochor Bend 1885 (Governor Sir Frederick Weld grants swamp) → Cornerstone Laid 1886 1 Aug (Gasnier + Weld, dedicated to Our Lady of Lourdes 1858) → A Basilica in Miniature 1888 13 May (first Tamil church, pointed arches/buttresses/spires) → War at Ophir Road 1942 (two bombs, nave stands) → A Parish for All 1974 (Indian → territorial, English + Tamil) → National Monument 2005 14 Jan No. 52 (restored 2009–2010). |
| 🙏 | **Worship — Mass, mercy & Find Us** | Anchor-linked sections with `scroll-mt-28` + `Layout` hash restore: `#mass` (Mass schedule from `site.mass`: weekdays 12:30 PM English / 19:00 Tamil, Saturday 17:00 + 18:15 + 19:30 English + Rosary 16:15, Sunday 08:00 English / 09:30 Tamil / 11:00 English / 12:30 English / 18:30 Tamil, public holidays 09:00 English · 10:00 Tamil — the card matching today via `massDayKey` carries a gold top rule + "Today" chip), `#confession` (Reconciliation 15 min before each Mass + 6 `devotions`: Holy Rosary Mon/Wed/Thu/Fri 11:35 / Divine Mercy Tue 11:35 / Saturday Rosary 16:15 / Reconciliation 15 min before Mass / Parish Feast 11 Feb / Grotto Prayer daily + `visitorGuidelines` dress/other), `#visit` (50 Ophir Road S188690, church gates 17:00 on public holidays, office Mon–Fri 09:00–17:00, MRT Bugis EW12/DT14 · Rochor DT13 · Jalan Besar DT22 + buses Ophir/Victoria 2,7,12,32,33,51,61,63,80,130,133,145,197, `mapsEmbedSrc` iframe). Aliases: `/mass-times`, `/hours-location`, `/visit` → `/worship`. |
| 🧭 | **Ministries — 6 with jump nav** | Pill-bordered jump nav (`/ministries#<id>`) + alternating `bsc-cream`/`bsc-parchment` sections from `ministries` (6 ids): Liturgical Ministries, Faith Formation (catechism/RCIA), Pastoral Care (St Vincent de Paul/Legion of Mary), Family Life (baptism/marriage/family), Youth & Young Adults (confirmation/fellowship), Community & Outreach (Tamil community, migrant welfare, Sinhala first Sunday + skills centre 2000). Canonical `/ministries`, alias `/ministry`. |
| 📰 | **News & Events** | 6 `upcomingEvents` (`NewsEvents` page, compact `PageHero`): Parish Feast — Our Lady of Lourdes 11 Feb (Triduum + feast Masses), Holy Rosary, Divine Mercy, Saturday Rosary, Reconciliation, Grotto Prayer — categories `Parish`/`Devotion`/`Formation`/`Archdiocese` with `EventMeta` chips. Canonical `/news-events`, alias `/news-and-events`. |
| 🤝 | **Serve — take a place** | 4 `serveRoles` (Liturgical Ministers / Catechists & Facilitators / Pastoral Care / Hospitality & Grounds) + `visitorGuidelines` (dress: knees covered, no shorts/ripped jeans/see-through/hats in church; other: no food/drink/laser pointers, phones silent). No section ids. Canonical `/serve`, alias `/volunteer`. |
| 💛 | **Give · FAQ · NotFound** | **Give** — closes with a dark band (office +65 6294 0624 from `site.ts`). 6 `givingOptions` (PayNow — confirm UEN with office, Cheque payable to `Church of Our Lady of Lourdes`, Cash at Office, Mass Offerings, St Vincent de Paul — icons `globe`/`church`/`book`/`heart`/`flame`/`sprout`). Alias `/donate`. **FAQ** — 7 questions (Mass times, confession 15 min before each Mass, how to get there Bugis/Rochor/Jalan Besar/buses Ophir-Victoria, parking street/public, baptism/marriage via `colol.secretariat@catholic.org.sg` + 6294 0624 six months ahead, dress & visitor guidelines, join a ministry via Serve) via `Accordion` (single-open) at `/faq`. **NotFound** — `*` catch-all (404, "This path does not lead to the church"). |

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
| Testing | Vitest + Testing Library + jsdom | `3.2.6` / `16.2.0` / `26.1.0` | `vitest run` — **29 files / 224 tests green** (harness `src/test/setup.ts` + OLOL-adapted suite ported from `src.orig`) |
| E2E | Playwright | `1.55.1` | `chromium` (`channel: "chromium"` new headless), `webServer` → `pnpm exec vite --port 5173 --host 127.0.0.1 --strictPort`, `e2e/` — 10 spec files + `helpers.ts` (specs present; OLOL copy when enabled) |
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

Hash anchors: `/worship#mass`, `/worship#confession`, `/worship#visit` (Worship, via `primaryNav` children + footer) and `/ministries#liturgical` / `#faith-formation` / `#pastoral-care` / `#family-life` / `#youth` / `#community` (Ministries jump nav — `ministries.map → /ministries#<id>`). Ministries and Worship use `<Link to="/…#id">` to preserve `HashRouter` route; plain `<a href="#id">` would replace the hash and route to `NotFound`.

### System Diagram

```mermaid
flowchart TB
  B[Browser] --> R[HashRouter — src/App.tsx — 17 entries]
  R --> L[Layout — scroll & hash restore — double-hash aware + 80ms + page-in keyed container]
  L --> H[Header — sticky + useScrolled(16) + primaryNav dropdown + mobile modal drawer + Escape]
  L --> P[Pages — 10: Home / About / History / Worship / Ministries / NewsEvents / Serve / Give / FAQ / NotFound]
  L --> F[Footer — 4-col + divider-weave-thin + 1 social (Facebook custom SVG) + Archdiocese link + site.ts + tamilName]
  P --> D[src/data — nav.ts + content.ts (1884–2005 grotto) + site.ts (50 Ophir Road)]
  H & F & P --> S[Tailwind @theme — src/index.css — bsc-* sapphire palette + 2 shadows + gold accents]
  R --> V[Vite 7.3.6 + viteSingleFile 2.3.3]
  V --> O[dist/index.html 387.60 kB + dist/_headers + dist/robots.txt + dist/images/10 + dist/favicon.svg — single file + public assets]
  O --> G[GitHub Pages / S3]
```

`HashRouter` is intentional — static hosts have no SPA fallback, so `/#/worship#mass` works without server rewrites.

## File Hierarchy

```
📂 our-lady-of-lourdes-church/
├── 📄 index.html            # lang, viewport, meta description (first Tamil Catholic church, 50 Ophir Road since 1888, Mass English + Tamil, grotto), CSP (script-src 'self' 'unsafe-inline' source → sha256 after build via scripts/inject-csp-hashes.mjs; style-src keeps 'unsafe-inline' for React style attrs; connect-src 'self'; img-src 'self' data: blob:; object-src 'none'; base-uri 'self'; frame-src https://www.google.com), canonical https://ourladyoflourdes.sg/, /favicon.svg + theme-color #0a1122, full social set (og:image + :alt, twitter:card=summary_large_image, og:site_name, og:locale), Google Fonts (Fraunces + Source Sans 3), #root + Church JSON-LD (Church of Our Lady of Lourdes, 50 Ophir Road 188690, +65 6294 0624, தூய லூர்து அன்னை ஆலயம்), title "Church of Our Lady of Lourdes — Singapore"
├── 📄 eslint.config.js      # flat config (typescript-eslint 8 + react-hooks 5 + react-refresh) — ignores [dist, node_modules, coverage, playwright-report, test-results, skills, src.orig]
├── 📄 playwright.config.ts  # Playwright 1.55 (chromium, webServer → pnpm exec vite :5173, expect timeout 15s)
├── 📄 playwright.built.config.ts  # Playwright vs the built artifact — vite preview :4173 (or E2E_BASE_URL → live host); catches singlefile dev/build divergence
├── 📄 vite.config.ts        # plugins [react, tailwindcss, viteSingleFile] + alias @→src + test {globals, jsdom, setupFiles: src/test/setup.ts (absent in current worktree — add before re-adding tests), include: src/**/*.{test,spec}.{ts,tsx}, exclude: e2e/** } + server.watch.ignored [skills/**, dist/**, playwright-report/**, test-results/**, coverage/**, src.orig/**]
├── 📄 tsconfig.json         # ES2020 / ESNext / bundler / strict + noUnusedLocals/noUnusedParameters/noFallthroughCasesInSwitch/isolatedModules/noEmit + include [src, vite.config.ts, eslint.config.js, playwright.config.ts, playwright.built.config.ts] + types [node, vitest/globals] + paths @/*
├── 📄 package.json          # name our-lady-of-lourdes-church 1.6.0 — scripts: dev / build (vite build && inject-csp-hashes) / preview / typecheck / lint / test / test:e2e / test:e2e:built / test:watch + pnpm@11.0.0 + engines node>=20 (all deps pinned exact)
├── 📄 pnpm-lock.yaml        # committed — deterministic installs via `pnpm install --frozen-lockfile` (CI)
├── 📂 public/
│   ├── 📂 images/           # 10 files: hero-church.jpg, grotto.jpg, sanctuary.jpg, garden.jpg, community.jpg, liturgical.jpg, pastoral-care.jpg, faith-formation.jpg, family-life.jpg, youth.jpg (Vite publicDir → dist/images/ — upload alongside dist/index.html); all local
│   ├── 📄 _headers          # security headers (HSTS/XCTO/XFO/Referrer-Policy/Permissions-Policy) → dist/_headers
│   ├── 📄 robots.txt        # allow all, sitemap to ourladyoflourdes.sg
│   └── 📄 favicon.svg       # sapphire field, gold folded-roof mark
├── 📂 src/                  # 41 source + 29 tests + 1 setup = 71 files — 29 files / 224 tests green (OLOL-adapted, ported from src.orig)
│   ├── 📄 App.tsx           # HashRouter + 17 Route path entries (16 content paths + * → NotFound inside the Layout wrapper; 5 alias groups / 7 alias paths; hash anchors #mass/#confession/#visit + 6 ministry ids)
│   ├── 📄 main.tsx          # StrictMode + createRoot + resolveHashRedirect pre-mount rewrite
│   ├── 📄 index.css         # @theme bsc-* tokens (sapphire-blue palette + gold accents + 2 shadows — 33 colors + 2 shadows) + --radius-* editorial overrides (xs/sm 2px · md 3px · lg/xl 4px · 2xl 6px) + @layer base (body kern+liga, global :focus-visible gold ring) + @layer utilities (31: text-balance, bg-adobe-texture, bg-gold-bloom, bg-grain, divider-weave, divider-weave-thin, gold-rule, gold-rule-left, hero-ken-burns, img-zoom, mask-fade-b, reveal, reveal-visible, rise-in + rise-in-d1..d4, menu-in, drawer-in, drawer-item-in, page-in, dot-pulse, card-lift, card-tint, link-underline, skip-link, scrim-hero, scrim-page, hero-fade, bloom-drift + 10 keyframes)
│   ├── 📂 components/
│   │   ├── 📄 Layout.tsx    # Outlet + scroll/hash restoration (double-hash aware, split on #, strip /, setTimeout 80ms, fallback window.scrollTo) + ScrollProgress + SkipLink + keyed page-in container
│   │   ├── 📄 Header.tsx    # fixed sapphire-950 bar, useScrolled(16), hover/focus-open dropdown (primaryNav; trigger has no click-toggle — keyboard via onFocusCapture), mobile modal drawer (dialog + aria-modal + focus trap + focus restore; closes on in-drawer link, Escape, outside tap), includes top bar Give link
│   │   ├── 📄 Footer.tsx    # 4-col + divider-weave-thin + 1 social (Facebook custom SVG — Instagram/YouTube empty in site.ts) + Archdiocese text link + site.ts address 50 Ophir Road + tamilName
│   │   ├── 📄 PageHero.tsx  # sapphire hero primitive (bg-grain + gradients + rise-in)
│   │   ├── 📄 Emblem.tsx    # inline SVG emblem
│   │   ├── 📄 SafeImage.tsx # local fallback (fallback default /images/hero-church.jpg, lazy, onError dataset.fallback guard, optional fetchPriority)
│   │   ├── 📄 SkipLink.tsx  # skip-to-main-content (preventDefault + focus #main-content; never rewrites hash)
│   │   ├── 📄 SocialIcons.tsx # custom SVG brand glyphs (Facebook — 1 icon present; Instagram/YouTube empty per site.ts)
│   │   ├── 📄 Timeline.tsx  # gradient rail + display-serif years + Reveal — renders lifeTimeline (1884–2005 grotto)
│   │   ├── 📄 BackToTop.tsx # threshold 480 + SVG progress ring (stroke-dashoffset via useScrollProgress) + reduced-motion
│   │   ├── 📄 ScrollProgress.tsx # fixed gold rail (scaleX progress, aria-hidden, z-[60])
│   │   └── 📂 ui/           # Button (to/href/button + icon; variants primary|secondary|ghost|outline-light), Container, SectionHeading, Accordion (single-open, inert), Reveal
│   ├── 📂 hooks/            # 3 files — useScrolled + useScrollProgress + useScrollSpy
│   │   ├── 📄 useScrolled.ts # scrollY > threshold → scrolled boolean (default 12; Header passes 16)
│   │   ├── 📄 useScrollProgress.ts # 0..1 progress, rAF-throttled, unscrollable guard
│   │   └── 📄 useScrollSpy.ts # active section tracking via IntersectionObserver
│   ├── 📂 pages/            # Home, About, History, Worship, Ministries, NewsEvents, Serve, Give, FAQ, NotFound (10 files, all named exports — OLOL copy)
│   ├── 📂 data/
│   │   ├── 📄 nav.ts        # primaryNav (6 top-level: Home / About{The Parish, Our History, FAQ} / Worship{Mass Times, Confession & Adoration, Find Us} / Ministries{Liturgical, Faith Formation, Pastoral Care} / News & Events / Serve) + footerNav 10 links
│   │   ├── 📄 content.ts    # 8 interfaces + images 7 keys (all local) + priests 3 (Alphonsus Dominic 22 Jul 2026 / Leo Justin HGN 1 Nov 2024 / Meneuvrier MEP 1884) + ppcMembers 6 + lifeTimeline 7 (1884–2005) + grounds 3 (main-church/grotto/garden) + ministries 6 (liturgical/faith-formation/pastoral-care/family-life/youth/community) + faqs 7 + upcomingEvents 6 (Parish Feast 11 Feb + devotions) + givingOptions 6 (PayNow, Cheque Church of Our Lady of Lourdes, Cash, Mass Offerings, St Vincent de Paul) + serveRoles 4 + devotions 6 + visitorGuidelines {dress[5], other[6]}
│   │   └── 📄 site.ts       # canonical single source: name Church of Our Lady of Lourdes/shortName Our Lady of Lourdes/tamilName தூய லூர்து அன்னை ஆலயம்/tagline A grotto of welcome in the city./vision To be a welcoming Marian household…/address 50 Ophir Road 188690, hours (church gates 17:00 holidays/office Mon–Fri 09:00–17:00/reception Mon–Fri 09:00–17:00/adoration Before Mass 11:35/confession 15 min before each Mass), mass (weekdayNoon 12:30/weekdayEvening 19:00 Tamil/saturday 17:00+18:15+19:30/sunday×5 08:00/09:30 Tamil/11:00/12:30/18:30 Tamil + publicHoliday 09:00/10:00 + confession/adoration + note), contact (6294 0624 / fax 6294 2686 + colol.secretariat@catholic.org.sg), transport (Bugis EW12/DT14 · Rochor DT13 · Jalan Besar DT22 + buses Ophir/Victoria 2,7,12,32,33,51,61,63,80,130,133,145,197), feast Our Lady of Lourdes 11 February, uen "" (no UEN), chequePayee Church of Our Lady of Lourdes, socials (facebook only) + archdiocese + mapsUrl/mapsEmbedSrc — Footer + Worship + About consume it, don't duplicate
│   ├── 📂 utils/            # 5 files — cn + massDay + monogram + deepLinks + categoryTone
│   │   ├── 📄 cn.ts         # twMerge(clsx) — always merge via cn()
│   │   ├── 📄 massDay.ts    # massDayKey(date) — single source for the Worship today-highlight (weekdays/saturday/sunday)
│   │   ├── 📄 monogram.ts   # monogram(name) — honorific stripping (MEP/HGN) for priest discs
│   │   └── 📄 deepLinks.ts  # knownRoutePaths + resolveHashRedirect — path-style deep links rewrite to hash routes pre-mount
│   └── 📂 scripts/          # inject-csp-hashes.mjs — post-build: hashes inline <script> bodies and rewrites CSP script-src to sha256-…
├── 📂 e2e/                  # 10 spec files + helpers.ts (specs present; OLOL copy when enabled): smoke, navigation, mobile-navigation, ministries, give-faq, enhancements, enhancements-round5/7/19, deep-links + helpers
├── 📄 .github/workflows/ci.yml # CI: lint → typecheck → test → test:e2e → build + artifacts (Node 24, pnpm 11)
├── 📂 docs/                 # historical audits retained for lineage (marked historical) — BSC port docs are historical, OLOL is current
├── 📂 skills/               # vendored reference content (skills-catalog.md + per-skill SKILL.md — tracked; lint/build tooling ignores it, do not import)
├── 📄 CLAUDE.md             # Deep conventions (authoritative — OLOL-aligned)
└── 📄 AGENTS.md             # Compact agent cheat sheet (OLOL-aligned)
```

Current audits — **green (2026-09-06):** `npx eslint` 0 + `npx tsc --noEmit` 0 + `npx vitest run` 29 files / 224 tests green + `npx vite build` 387.60 kB (script-src sha256-pinned via `scripts/inject-csp-hashes.mjs`) — all green. `e2e/` specs are present (10 + helpers). Historical BSC audits (round-19 merge 1.5.1→1.6.0 67/67, round-18 mobile drawer 59/59, round-17 Light on the Tent, round-16 docs re-pin) are retained in `docs/` as **(historical)** lineage for the Queenstown port — they asserted `1 Commonwealth Drive, SS.CC since 1958, Tent of Meeting, Corpus Christi, T08CC1234A` and are now ported to OLOL. `index.html` is now Church of Our Lady of Lourdes (50 Ophir Road, 11 February, Bugis/Rochor/Jalan Besar, Fraunces + Source Sans 3, CSP `img-src 'self' data: blob:`, /favicon.svg, title "Church of Our Lady of Lourdes — Singapore").

## Quick Start

**Requirements:** Node.js ≥20 (Vite 7), `pnpm` preferred (`npm` works).

```bash
# 1 — Clone
git clone <repo-url> our-lady-of-lourdes-church && cd our-lady-of-lourdes-church

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
# → dist/index.html  JS+CSS inlined; dist/images/10 copied from public/ (387.60 kB sha256-pinned)

# Preview prod build
pnpm preview
# → http://localhost:4173
```

### Verify Setup

```bash
pnpm lint               # eslint flat — expect no output (clean)
pnpm typecheck         # tsc --noEmit — expect no output (clean)
pnpm build              # expect: "✓ built in ~3s" + "Inlining: index-*.js / style-*.css"
ls -lh dist/index.html  # expect: single HTML file ~388 kB, no separate assets chunk
ls -lh dist/images/     # expect: 10 images (hero-church, grotto, sanctuary, garden, community, liturgical, pastoral-care, faith-formation, family-life, youth)
pnpm test               # expect: 29 files / 224 tests green (harness src/test/setup.ts)
pnpm test:e2e           # expect: 10 spec files + helpers present (OLOL copy)
```

| Check | Expected |
|---|---|
| `pnpm dev` | Vite ready on `:5173`, HMR active |
| `pnpm lint` | Exit `0`, no warnings (`--max-warnings 0`) |
| `pnpm typecheck` | Exit `0`, no errors |
| `pnpm test` | **29 files / 224 tests green** (harness `src/test/setup.ts` + OLOL-adapted suite) |
| `pnpm test:e2e` | **10 spec files + helpers present** — specs should assert OLOL copy (50 Ophir Road, A grotto in the city, 1888, grotto) |
| `pnpm build` | `dist/index.html` 387.60 kB (script-src sha256-pinned via `scripts/inject-csp-hashes.mjs`) + `dist/images/` (10 files) + `dist/favicon.svg` + `dist/_headers` + `dist/robots.txt` |
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

**Typography:** `Fraunces` (display, quote, `font-display` / `h1–h4`) + `Source Sans 3` (body, `font-sans` / `font-body` alias) — loaded in `index.html`, set in `@theme` + `@layer base`. Utilities (31 + 10 keyframes): `text-balance`, `bg-adobe-texture`, `bg-gold-bloom` (+ `bloom-drift` 14s alternate drift on the CTA band), `bg-grain`, `divider-weave` / `divider-weave-thin`, `gold-rule` / `gold-rule-left` (centre-drawn 1px hairline), `reveal` / `reveal-visible`, `skip-link`, `mask-fade-b`, `img-zoom`, `hero-ken-burns` (20s Ken Burns), `scrim-hero` / `scrim-page`, `hero-fade`, plus the "Sacred Motion" set: `rise-in` (+ `rise-in-d1..d4` stagger delays, liturgical `cubic-bezier(0.22, 1, 0.36, 1)`) for hero/PageHero entrances, `menu-in` / `drawer-in` / `drawer-item-in` / `page-in` for dropdown/drawer/route entrances, `card-lift` (hover lift + shadow + gold border) for every interactive card, `card-tint` (honest tint) for info cards, `link-underline` (gold underline draws in on hover/focus), `dot-pulse` (2.6s timeline halo). All are transform/opacity-only and gated by the global `prefers-reduced-motion` block in `src/index.css`. Base layer carries the global `:focus-visible` ring (2px `bsc-gold-400`, 3px offset) and body `font-feature-settings: "kern" 1, "liga" 1`; corners resolve through the `--radius-*` editorial overrides (xs/sm 2px · md 3px · lg/xl 4px · 2xl 6px).

## Deployment

Primary artifact `dist/index.html` (387.60 kB, + `dist/images/` — 10 files, + `dist/_headers` + `dist/robots.txt` + `dist/favicon.svg`) — no server, no env vars, no rewrites needed. The artifact ships a scoped `Content-Security-Policy` meta (`img-src 'self' data: blob:` only, `object-src 'none'`, `base-uri 'self'`, Google Fonts, `frame-src` Google Maps, `script-src` sha256-pinned after `scripts/inject-csp-hashes.mjs`, `style-src` keeps `'unsafe-inline'` for React inline styles) + a `Referrer-Policy` meta. `public/_headers` adds the host-level headers a static file cannot set (HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) — **on Cloudflare Pages only**. The current host is not assumed to be Pages — those headers are not served on generic static hosts (S3, GH Pages, proxied origins) without an explicit host config. Add the five headers via the host's header config if the deployment target is not Pages.

CSP (current `index.html` source): `default-src 'self'` + `script-src 'self' 'unsafe-inline'` + `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com` + `font-src https://fonts.gstatic.com data:` + `img-src 'self' data: blob:` + `frame-src https://www.google.com` + `object-src 'none'` + `base-uri 'self'`; `<meta name="referrer" content="strict-origin-when-cross-origin">` — built artifact rewrites `script-src` to `sha256-…`.

```bash
pnpm build                # produces dist/index.html + dist/images/ (publicDir copy — singlefile inlines JS+CSS, not public/)
# GitHub Pages — push dist/index.html + dist/images/ to gh-pages or serve dist/ as artifact
# S3 / CloudFront — upload dist/index.html as index.html + dist/images/ assets
pnpm preview              # smoke-test before publish
```

Why `HashRouter`: deep-links like `/#/worship#mass` or `/#/ministries#liturgical` resolve without host fallback config (GitHub Pages / S3 have no SPA rewrites). Switching to `BrowserRouter` would require a `404.html` redirect shim. Legacy aliases (`/mass-times`, `/hours-location`, `/visit` → `/worship`; `/ministry` → `/ministries`; etc.) preserve old parish bookmarks. Path-style deep links are rewritten pre-mount via `src/utils/deepLinks.ts` (`resolveHashRedirect`) so a bare `/worship` still lands correctly.

## Contributing

This repo follows the six-phase workflow in `CLAUDE.md` (ANALYZE → PLAN → VALIDATE → IMPLEMENT → VERIFY → DELIVER).

- **TDD:** `RED → GREEN → REFACTOR → Commit` — one cycle per commit; write a failing test before fixing a bug. The Vitest harness is present (`src/test/setup.ts`) — `pnpm test` 29 files / 224 tests green.
- **Commits:** Conventional Commits — `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `style:` — atomic, subject ≤72 chars.
- **Branches:** `feat/<slug>`, `fix/<slug>`, `docs/<slug>` — short-lived (1–3 days), squash-merge.
- **Conventions:** `PascalCase.tsx` for components/pages, `camelCase.ts` for data/utils, `primaryNav` single-source, alias routes preserved, `cn()` for merges, `bsc-*` tokens only (including `bsc-gold-700` `#85641c`).
- **Pre-push gate:** `pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build` — **all five green** (lint 0 + typecheck 0 + test 29/224 + build 387.60 kB; the build ends with `scripts/inject-csp-hashes.mjs`, which fails the build if any inline script is left unhashed). CI mirrors this in `.github/workflows/ci.yml` (Node 24, pnpm 11). Sixth check `pnpm test:e2e:built` vs `vite preview` also green.

> `skills/` is vendored reference content — tracked in full; lint/build tooling ignores it — do not import from or lint it. `src.orig/` does not exist in this worktree; lineage lives in `docs/` + git history. See `AGENTS.md` for the compact cheat sheet.

## Troubleshooting

| Issue | Solution |
|---|---|
| `pnpm dev` port in use (`:5173`) | `pnpm dev -- --port 5174` or kill the other Vite process. |
| `Cannot find module '@/…'` or alias error | Ensure `vite.config.ts` alias `@→src` and `tsconfig.json` `paths {"@/*":["src/*"]}` stay in sync; restart dev server. |
| Hash anchor doesn't scroll (`#/worship#mass` or `#/ministries#liturgical` lands at top) | Target `id` missing — verify `id="mass"` / `id="confession"` / `id="visit"` in `Worship.tsx` or `id="liturgical"` etc. in `Ministries.tsx`; `Layout.tsx` is double-hash aware (`split on #` + strip `/`, `setTimeout 80ms`, fallback `window.scrollTo`). |
| Bare `href="#mass"` routes to NotFound | Use `<Link to="/worship#mass">` (or `/ministries#liturgical`) — plain `#id` replaces the `HashRouter` hash and routes to `*`. |
| `tsc --noEmit` fails on unused var | `noUnusedLocals/Params` is `true` — remove or prefix with `_` only if intentionally unused. |
| External image not loading | `SafeImage` falls back to `fallback` (default `/images/hero-church.jpg`) via `dataset.fallback` guard; current `images.*` are all local (7 keys, 10 files). |
| `pnpm test` finds 0 tests | **Not expected** — harness `src/test/setup.ts` is present and 29 files / 224 tests are green; if Vitest finds 0, check `vite.config.ts` `test.include`/`exclude`. |
| `pnpm test:e2e` fails | Specs are present; if green after OLOL work, failures likely mean an assertion still expects BSC copy (`1 Commonwealth`, `Tent of Meeting`, `Corpus Christi`). Update specs to assert `50 Ophir Road`, `A grotto in the city`, `Neo-Gothic`, `National Monument`, `11 February`, `1888`. |
| `vite.config.ts` setupFiles warning | If Vitest warns `setupFiles` not found, confirm `src/test/setup.ts` exists (it does — 29 files / 224 tests green). |

## License

Private — all rights reserved. © Church of Our Lady of Lourdes, Archdiocese of Singapore. No `LICENSE` file is published.

---

**Docs:** [`CLAUDE.md`](CLAUDE.md) · [`AGENTS.md`](AGENTS.md) · Live: [https://ourladyoflourdes.sg/](https://ourladyoflourdes.sg/) (canonical parish site) · Historical lineage: `blessed-sacrament-queenstown_SKILL.md` (BSC hop, Queenstown)
