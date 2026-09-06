# Church of Our Lady of Lourdes — `our-lady-of-lourdes-church`

Port of the **Church of Our Lady of Lourdes, Singapore** — 50 Ophir Road, Singapore 188690 — first Tamil Catholic church, blessed 13 May 1888 (cornerstone 1 Aug 1886, Fr Joachim Alexandre Marie Meneuvrier MEP 1884) — Neo-Gothic modelled on the Lourdes basilica with pointed arches, buttresses and spires, lancet windows and stained glass of the fifteen mysteries of the Rosary, Lourdes grotto with life-sized Our Lady and St Bernadette. Two bombs in 1942, territorial parish 1974, National Monument No. 52 (gazetted 14 Jan 2005, restored 2009–2010). *A grotto of welcome in the city.* Static parish site — reverent, editorial, welcoming. No backend, no DB, no SSR.

**Stack:** React 19.2.8 + Vite 7.3.6 + Tailwind CSS 4.3.3 (`@tailwindcss/vite 4.1.17`) + TypeScript 5.9.3 (strict) + React Router 7.18.2 (HashRouter) + `vite-plugin-singlefile 2.3.3` (primary `dist/index.html` + `dist/images/` for GH Pages / S3) + `tailwind-merge 3.6.0` + `clsx 2.1.1` + `lucide-react 1.38.0` + `eslint 9.39.5` flat (`typescript-eslint 8.28.0` + `eslint-plugin-react-hooks 5.2.0` + `eslint-plugin-react-refresh 0.4.19` + `globals 16.1.0`) + `vitest 3.2.6` (`jsdom 26.1.0`) + `@testing-library/react 16.2.0` + `@testing-library/jest-dom 6.6.3` + `playwright 1.55.1` (chromium) · pnpm 11.0.0 (`packageManager` + `engines node>=20`, `--frozen-lockfile` in CI) · Alias `@` → `src/` · all deps pinned exact — no `^` in `package.json`

> `README.md` is the visitor-facing overview; this file is the authoritative agent onboarding doc. Keep both in sync with `package.json`, `vite.config.ts`, and `tsconfig.json`. `AGENTS.md` is the 60-sec cheat sheet — keep it in sync with this file.

## Foundational Principles

### Meticulous Approach (Six-Phase Workflow)

Apply to every non-trivial task. Do not skip VALIDATE.

1. **ANALYZE** — Mine requirements in depth. Surface ambiguities, implicit needs, and trade-offs. Explore 2–3 approaches; assess feasibility and long-term cost.
2. **PLAN** — Produce a sequenced plan with phases, checklists, success criteria, and effort estimate. Present it.
3. **VALIDATE** — Obtain explicit user approval before coding. Address concerns.
4. **IMPLEMENT** — Build modular, tested, documented increments. Use library-first selection. Follow TDD Red→Green→Refactor (one commit per cycle).
5. **VERIFY** — Run typecheck / build / tests. Review against best-practice, security, performance, and WCAG AAA criteria. Cover edge cases.
6. **DELIVER** — Hand off complete solution with usage instructions, runbook, and follow-up recommendations.

### Project-Specific Principles

- **Reverent, not austere** — warm parchment/sapphire/gold palette, editorial typography (Fraunces / Source Sans 3), ample whitespace. Every page is a welcome from 50 Ophir Road — Rosary or Divine Mercy at 11:35 before weekday Mass, English at noon, Tamil at seven, Saturday Rosary at 16:15, grotto prayer daily — not a brochure.
- **Parish fidelity** — Singapore content is canonical. Keep dates, place names, and liturgical facts exact: 1884 Fr Joachim Alexandre Marie Meneuvrier MEP sent for Singapore's Catholic Indians (sixty souls → three hundred in two years) → 1885 land at the Rochor bend (Governor Sir Frederick Weld grants swamp plot after river straightened, bullock carts of earth) → 1886 cornerstone laid 1 August (Bishop Édouard Gasnier + Sir Frederick Weld, dedicated to Our Lady of Lourdes 1858 Massabielle) → 1888 blessed 13 May — first Tamil Catholic church, basilica in miniature with pointed arches/buttresses/spires, Catholics/Protestants/non-Christians all contributed, parish school opens → 1942 two bombs fall on compound (nave stands, used as Japanese army HQ) → 1974 expands from Indian to territorial parish (English + Tamil kept) → 2005 gazetted 14 January as National Monument No. 52, restored 2009–2010 S$1.75m, grotto still shows Our Lady to St Bernadette. Feast: Our Lady of Lourdes — 11 February. Address 50 Ophir Road Singapore 188690, Bugis EW12/DT14 · Rochor DT13 · Jalan Besar DT22 + buses Ophir/Victoria 2,7,12,32,33,51,61,63,80,130,133,145,197. No UEN on site (uen `""`), cheque payable *Church of Our Lady of Lourdes*. `site.ts` has `tamilName`/`visitorGuidelines` — do not remove them; has no `sacredHearts`/`whatsapp` — do not invent them. Do not reintroduce Blessed Sacrament / Queenstown Tent / SS.CC / Damien Hall or Risen Christ / Toa Payoh / St Mary / Bukit Batok narratives — those belonged to earlier ports and are now forbidden reintroduction targets (see Anti-Patterns).
- **Single-file deployability** — Must remain a standalone artifact (`index.html` + `dist/images/`) shippable to GitHub Pages or S3. No SSR, no server. `vite-plugin-singlefile` inlines JS+CSS; `public/images/` is copied verbatim — upload both.
- **Accessibility is doctrinal** — WCAG AAA intent: keyboard-navigable header, color contrast over texture, meaningful alt text, `SkipLink` hash discipline under `HashRouter`, reduced-motion respect.
- **Static-first data** — Parish content lives in `src/data/content.ts` and canonical facts in `src/data/site.ts` with nav in `src/data/nav.ts`; no CMS or API until explicitly requested. Pages render from data — do not inline copy that belongs in `data/`.

## Implementation Standards

### General Coding Practices

- **Early returns** over deeply nested conditionals.
- **Composition over inheritance.** Small, focused components.
- **Self-documenting code.** Intentional names; comments explain _why_, not _what_.
- **TDD where logic exists.** Write a failing test before fixing a bug or adding a pure function.
- **No `any`.** Prefer `unknown` + narrowing. Lean on inference; add explicit types only at public boundaries.
- **Prefer `interface` for shapes, `type` for unions/intersections.**
- **Library discipline:** Use existing primitives (Radix/shadcn if adopted); do not rebuild `Dialog`/`Dropdown` from scratch.
- **Handle all UI states:** `loading`, `error`, `empty`, `success`. Disable buttons during async ops; show feedback.

### Language & Framework Guidelines

#### TypeScript Strict (`tsconfig.json`)

- `strict: true`, `noUnusedLocals: true`, `noUnusedParameters: true`, `noFallthroughCasesInSwitch: true`, `isolatedModules: true`, `noEmit: true`, `skipLibCheck: true`.
- `moduleResolution: "bundler"`, `jsx: "react-jsx"`, `target: ES2020`, `lib: [ES2020, DOM, DOM.Iterable]`.
- Path alias: `@/*` → `src/*` (`baseUrl: "."` + `paths: { "@/*": ["src/*"] }` mirrored in `vite.config.ts` via `path.resolve(__dirname, "src")`). Always import via `@/` for cross-directory imports. Keep both files in sync.
- `types: ["node", "vitest/globals"]` — required for `describe/it/expect` globals if a harness is added.
- Include is `["src", "vite.config.ts", "eslint.config.js", "playwright.config.ts", "playwright.built.config.ts"]` (so `eslint.config.js` + `playwright.config.ts` + `playwright.built.config.ts` are type-checked). Add future config files to `include` only if they should be type-checked.
- Unused locals/params will fail the type gate — clean before commit.
- **Current worktree note:** `vite.config.ts` `test.setupFiles` references `src/test/setup.ts` but no `src/test/` dir exists and no `*.test.*` files are present — `npx vitest run` reports `No test files found`. Create the setup file before re-adding tests.

#### Vite 7 Specific

- Plugins: `@vitejs/plugin-react 5.2.0` + `@tailwindcss/vite 4.1.17` + `vite-plugin-singlefile 2.3.3`. Order matters — keep as configured.
- HMR enabled by default; do not add a separate dev server abstraction.
- **Env vars:** `VITE_*` prefix for client-exposed vars. Access via `import.meta.env.VITE_*`.
- Import alias configured in `vite.config.ts` via `path.resolve(__dirname, "src")`. Keep `tsconfig.json` `paths` + `baseUrl` in sync.
- Build is single-file: `viteSingleFile()` inlines JS+CSS (not `publicDir`). Avoid dynamic `import()` that assumes code-splitting unless you remove the plugin intentionally. `public/images/` is copied verbatim to `dist/images/` — upload both `dist/index.html` + `dist/images/` on deploy. Post-build `scripts/inject-csp-hashes.mjs` hashes inline `<script>` bodies and rewrites the CSP `script-src` to `sha256-…` (source keeps `unsafe-inline` for Vite dev preamble; `style-src` keeps `unsafe-inline` for React inline styles).
- `test` in `vite.config.ts` — `{ globals: true, environment: "jsdom", setupFiles: ["src/test/setup.ts"], include: ["src/**/*.{test,spec}.{ts,tsx}"], exclude: ["e2e/**", "node_modules/**", "playwright-report/**", "test-results/**"] }` — keeps `e2e/**` out of unit runs. **Current worktree:** `setupFiles` target is absent and no tests are present — this is intentional scaffolding state, not a broken config.
- `server.watch.ignored: ["**/skills/**","**/dist/**","**/playwright-report/**","**/test-results/**","**/coverage/**","**/src.orig/**"]` — prevents `ENOSPC` from `skills` / `dist` / `src.orig/` trees.

#### React 19 + React Router 7

- Functional components only; hooks for all state/effects. No class components.
- **Routing:** `HashRouter` is intentional at `src/App.tsx` with `Layout` outlet — static hosts (GH Pages / S3) have no SPA fallback; deep links are `/#/worship`, `/#/ministries#liturgical`, etc. Do not switch to `BrowserRouter` without adding a `404.html` redirect. Keep routing declarative in `App.tsx`; do not scatter `createBrowserRouter` elsewhere.
- **Route table (authoritative — 17 entries: 16 content paths + `*` NotFound, 5 alias groups / 7 alias paths, 10 page components):**

  | path | component | role |
  |------|-----------|------|
  | `/` | `Home` | canonical |
  | `/about` | `About` | canonical |
  | `/history` | `History` | canonical |
  | `/worship` | `Worship` | canonical for `/mass-times` + `/hours-location` + `/visit` |
  | `/mass-times` | `Worship` | `aliasOf: /worship` |
  | `/hours-location` | `Worship` | `aliasOf: /worship` |
  | `/visit` | `Worship` | `aliasOf: /worship` |
  | `/ministries` | `Ministries` | canonical for `/ministry` |
  | `/ministry` | `Ministries` | `aliasOf: /ministries` |
  | `/news-events` | `NewsEvents` | canonical for `/news-and-events` |
  | `/news-and-events` | `NewsEvents` | `aliasOf: /news-events` |
  | `/serve` | `Serve` | canonical for `/volunteer` |
  | `/volunteer` | `Serve` | `aliasOf: /serve` |
  | `/give` | `Give` | canonical for `/donate` |
  | `/donate` | `Give` | `aliasOf: /give` |
  | `/faq` | `FAQ` | canonical |
  | `*` | `NotFound` | catch-all — "This path does not lead to the church." |

  Preserve alias routes — bookmarks and printed material depend on them. When adding a canonical path, keep `aliasOf` → canonical pairs in `App.tsx` and update `src/data/nav.ts` accordingly.

- **Hash anchors (Layout double-hash aware):**

  | route | ids | nav |
  |-------|-----|-----|
  | `/worship` | `mass`, `confession`, `visit` | `primaryNav` Worship dropdown + `footerNav` + page sections (`scroll-mt-28`) |
  | `/ministries` | `liturgical`, `faith-formation`, `pastoral-care`, `family-life`, `youth`, `community` | `Ministries` jump nav (`<Link to="/ministries#id">` → 6 pill links, `aria-label="Jump to ministry"`) |
  | `/serve` | _none_ | `serveRoles`/`devotions` rendered without section ids |

  Note: the last ministry id is `community` titled "Community". `Worship` anchors and `Ministries` ids both scroll with `Layout`'s `useEffect` (`setTimeout 80ms` + `scrollIntoView`).

- **Layout behavior:** `Layout.tsx` handles double-hash scroll (`window.location.hash` split on `#` + strip `/`) + `80ms` timeout + fallback `window.scrollTo({ top: 0 })`. `Header` + `Ministries` jump nav must use `<Link to="/path#id">`, never plain `<a href="#id">` (which would replace the hash and route to `NotFound` under `HashRouter`). Layout also wraps outlet in a keyed `page-in` container (`data-testid="page-container"` + `data-route`) so route changes replay entrance while hash-only updates keep the node.

- **Navigation single source:** `primaryNav: NavItem[]` (6 — `Home`, `About` with 3 children + `description`, `Worship` with 3 children + `description`, `Ministries` with 3 children + `description` — OLOL wording, `News & Events`, `Serve`) and `footerNav: NavLink[]` (10) in `src/data/nav.ts`. Update nav there; `Header`/`Footer` render from it.

- Colocation: `components/` for layout primitives, `pages/` for route components, `data/` for typed content, `utils/` for pure helpers (`cn`, `categoryTone`), `hooks/` for `useScrolled` + `useScrollProgress` + `useScrollSpy` (3).
- Custom hooks → `src/hooks/` when extracted (currently `useScrolled` threshold 12 default / `Header` passes 16 + `useScrollProgress` rAF-throttled 0..1 + `useScrollSpy` IntersectionObserver band-tracking).
- Server state (future): TanStack Query; global client state: Zustand. Neither is installed yet — add only when traversal proves need.
- Handle all UI states where data is async or conditional: `loading`, `error`, `empty`, `success`. Disable buttons during async ops; show feedback.
- Use library primitives when available (no UI library locked in yet; `shadcn/ui` with Radix is the intended direction per project instructions).

#### Tailwind CSS v4 — CSS-First `@theme`

- Tokens live in `src/index.css` `@theme` block. Extend there; do not introduce arbitrary `bg-[#...]` values.
- Palette: `bsc-cream / parchment(+dark) / stone / ink / charcoal / sapphire-{50,100,200,300,400,500,600,700,800,900,950} / gold-{100,200,300,400,500,600,700} / terracotta-{50,300,400,500,600} / pine-{50,300,500,600}` plus `shadow-bsc/bsc-lg` (33 colors + 2 shadows — `terracotta-50/300` + `pine-50/300` for chip tones). Use semantic names (`bsc-sapphire-600`) not hex. `terracotta-600` (#8f5038) is the AA text-bearing step — chip labels and other 10–14 px text on parchment must compute ≥ 4.5:1.
- Display = `Fraunces`, body = `Source Sans 3`; heading styles set on `h1–h4, .font-display`. Google Fonts loaded in `index.html` — add weights only with purpose. CSP in `index.html` whitelists `fonts.googleapis.com`/`fonts.gstatic.com` + `google.com` for the maps iframe (no `upload.wikimedia.org`/`images.pexels.com`).
- Utilities (31 + 10 keyframes): `text-balance`, `bg-adobe-texture`, `bg-gold-bloom`, `bg-grain`, `divider-weave`, `divider-weave-thin`, `gold-rule`/`gold-rule-left`, `hero-ken-burns`, `img-zoom`, `mask-fade-b`, `reveal`+`reveal-visible`, `rise-in`+`rise-in-d1..d4`, `menu-in`, `drawer-in`, `drawer-item-in`, `page-in`, `dot-pulse`, `card-lift`, `card-tint` (info-card hover tint — lift stays on interactive cards), `link-underline`, `skip-link` + `scrim-hero`/`scrim-page`, `hero-fade`, `rule-draw`, `bloom-drift` + 10 keyframes `hero-ken-burns`/`rise-in`/`menu-in`/`drawer-in`/`drawer-item-in`/`page-in`/`halo-pulse`/`hero-fade`/`rule-draw`/`bloom-drift` + themed scrollbar (sapphire thumb on parchment track, webkit + `scrollbar-color`) + `@media print` reveal override. Document new utilities alongside them.
- Mobile-first, responsive (`sm:` / `lg:`), and dark-mode tolerant even though the parish theme is light-first.

#### Component Conventions

- `Button` (`components/ui/Button.tsx`): discriminated `to`/`href`/native `button` + `icon`; variants `primary|secondary|ghost|outline-light` via `variantClasses` record and `cn()` merge + `active` press feedback (`active:translate-y-0 active:scale-[0.98]`). Use `to` for internal navigation, `href` for external. Keep variant styles centralized there.
- `Container` (`components/ui/Container.tsx`): `max-w-7xl mx-auto px-5 sm:px-8`. All sections should wrap in `Container`.
- `SectionHeading` (`components/ui/SectionHeading.tsx`): `eyebrow? / title / description` with `align` and `light` props + `gold-rule` line.
- `PageHero` (`components/PageHero.tsx`): `sapphire-950` hero with low-opacity image (`alt=""`), dual gradient overlays + `bg-grain` + `rise-in` staged content; accepts `compact?` + `children` slot. Used by most pages; above-the-fold heroes use `fetchPriority="high"`.
- `Header` (`components/Header.tsx`): desktop `<nav aria-label="Primary">` + drawer `<nav aria-label="Mobile">`; stateful hamburger `aria-label` ("Open menu" closed / "Close menu" open); window-level `Escape` closes an open desktop dropdown; fixed + `useScrolled(16)` (hook default 12 — intentional mismatch to delay transparent→solid on Home) → `sapphire-950/92` translucent + blur; transparent at the top of Home. Solid when `scrolled || !isHome || mobileOpen`. Top bar (`lg` only) shows `site.address.street · site.feast.name` + `Give` link-underline. Desktop dropdown opens on hover + focus (`openDesktopMenu`, `menu-in` entrance; the trigger button has no click-toggle — keyboard/touch users get it through `onFocusCapture`, so document it as hover/focus-open, closes on child-link click via `onClickCapture`), mobile drawer (`drawer-in` entrance + `drawer-item-in` 40ms stagger) is a **modal dialog** (`role="dialog"` + `aria-modal="true"` + `aria-label="Site menu"` + `tabIndex={-1}` panel focused on open, `Tab`/`Shift+Tab` focus-trap via `handleDrawerKeyDown`, focus restored to the hamburger on every close path via `drawerWasOpenRef`, outside `pointerdown` closes), whose drawer closes on any in-drawer link activation (`onClickCapture` on drawer `<nav>` — a link to the current route never changes `pathname`, so the pathname effect alone cannot close it), and `Escape` handler to close menus/drawer. Parent links carry `aria-current="page"`/`"true"` when a child route is active (e.g. `/history` → About parent current); hamburger is `h-11 w-11` (44px). `ScrollProgress` is **not** inside Header — it is decoupled and rendered by `Layout` as a fixed `h-[3px]` rail at `z-[60]`.
- `ScrollProgress` (`components/ScrollProgress.tsx`): fixed `h-[3px]` rail at `z-[60]` (`data-testid="scroll-progress"`, `aria-hidden`, `scaleX(progress)` transform-only, gradient `bsc-gold-500→300→500`). Rendered by `Layout`, not by `Header`.
- `Footer` (`components/Footer.tsx`): 4-col (`Explore` + `Get involved` as `<nav aria-label>` landmarks from `footerNav` split + parish/visit/contact blocks), `divider-weave-thin`, and consumes `site.ts` + `nav.ts`. Copy is OLOL-specific (Neo-Gothic 1888, grotto, 50 Ophir Road, National Monument 52, Tamil + English). Social icons from `site.ts` (Facebook via custom SVG in `SocialIcons` — Instagram/YouTube empty) + `archdiocese` + `mapsUrl`/`mapsEmbedSrc` (50 Ophir Road); address `50 Ophir Road`; office hours `Mon–Fri 9–17:00`; phone `+65 6294 0624`; copyright. Tagline: site.tagline "A grotto of welcome in the city." / tamilName.
- `SafeImage` (`components/SafeImage.tsx`): wraps `<img>` with `fallback` default `/images/hero-church.jpg`, `loading="lazy"` default plus `useState` for `current`/`loaded`, optional `fetchPriority` (`"high"` on above-the-fold heroes — Home hero + PageHero), `onError` → `dataset.fallback="1"` guard (swap `src` once), and `transition-opacity` fade-in. All current `images.*` are local (`hero`/`heroFallback`/`chapel→grotto`/`sanctuary`/`garden`/`hall→community`/`feast→grotto`); CDN keys `naveCdn`/`courtyardCdn` now alias local `sanctuary`/`garden` if referenced. Use `SafeImage` for any future external image; don't use bare `<img>` for CDN sources.
- `SkipLink` (`components/SkipLink.tsx`): `href="#main-content"` but `preventDefault`s and imperatively focuses `#main-content` (`<main>` in `Layout`) — a native jump would rewrite the hash and route to `NotFound` under `HashRouter`. Preserve this pattern.
- `Reveal` (`components/ui/Reveal.tsx`): `delay`/`as` + `IntersectionObserver` (`0.15` threshold), `reveal` → `reveal-visible` with `prefers-reduced-motion` fallback.
- `Accordion` (`components/ui/Accordion.tsx`): single-open, `aria-expanded`/`aria-controls`, keyboard `ArrowDown`/`ArrowUp`/`Home`/`End`, animated `grid-template-rows 0fr→1fr` collapse. Closed panels carry `aria-hidden="true"` + `inert` (open: `aria-hidden` undefined + `inert` undefined/false) so screen readers/keyboard skip them; `aria-expanded` on the button is the single source of truth. Testing Library note: `aria-hidden`/`hidden` elements need `{ hidden: true }` queries.
- `BackToTop` (`components/BackToTop.tsx`, mounted in `Layout` before `<Footer>`): appears when `window.scrollY > 480`, hides below (`aria-hidden` + `tabIndex -1` + `pointer-events-none` when hidden — a11y-tree queries need `data-testid="back-to-top"`; it also **blurs itself when hiding while focused** so focus never rests inside an `aria-hidden` subtree), click → `window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)') ? 'auto' : 'smooth' })`. Never touches the hash (HashRouter-safe). Carries `aria-label="Back to top"` and a progress ring (`data-testid="back-to-top-progress"` + inner `circle[data-progress]`) whose `stroke-dashoffset` fills with `useScrollProgress` (shared source with `ScrollProgress` rail).
- `cn` (`utils/cn.ts`): `twMerge(clsx(...))` — always merge classes through `cn()`.
- `massDay` (`utils/massDay.ts`): `massDayKey(date): MassDayKey` — simplified helper mapping `getDay()` 0→sunday / 6→saturday / rest→weekdays. Single source for Worship today-highlight.
- `monogram` (`utils/monogram.ts`): `monogram(name): string` — honorific stripping. Handles `Fr`, `Friar`, `Rev`, `Msgr`, `MEP`, `HGN`, `OFM`, `Mr`/`Ms`/`Mrs`, strips commas, takes first two surviving initials (fallback `name.slice(0,2)` uppercased). Used for priest discs in About.
- `deepLinks` (`utils/deepLinks.ts`): `knownRoutePaths` + `resolveHashRedirect(pathname, hash): string | null` — path-style deep-link rewrite executed pre-mount in `main.tsx`. JSDoc intentionally stripped/simplified; do not re-add verbose TSDoc without cause.
- `categoryTone` (`utils/categoryTone.ts`): `categoryTone(category): string` — maps `EventItem.category` union (`Parish|Devotion|Formation|Archdiocese`) to semantic `bsc-*` tone classes for chip labels. Extracted from `EventMeta` so the tone logic is independently testable.

## Development Workflow

### Environment Setup

```bash
# Node 20+ required (Vite 7.3.6). pnpm is the supported package manager.
pnpm install --frozen-lockfile  # deterministic (versions pinned exact in package.json)
# npm is not drop-in for these pins (typescript-eslint 8.28.0 peer predates TS 5.9):
# use `npm ci --legacy-peer-deps` if you must; pnpm is the supported path.
cp .env.example .env.local 2>/dev/null || true  # no env vars required yet
pnpm dev              # http://localhost:5173
```

No backend, no DB, no `.env` contract yet. If env vars are added, document them in "Environment Variables" below.

### Build Commands

| Command | Purpose | Verified (2026-09-06) | Notes |
|---------|---------|------------------------|-------|
| `pnpm dev` / `npm run dev` | Vite dev server with HMR (default http://localhost:5173) | ✅ |  |
| `pnpm build` / `npm run build` | Production single-file build (`vite build && node scripts/inject-csp-hashes.mjs`) → `dist/index.html` + `dist/images/` | ✅ | `viteSingleFile` inlines JS+CSS only; `publicDir` is copied verbatim — upload both `dist/index.html` + `dist/images/`; verified `387.60kB` (script-src sha256-pinned by `scripts/inject-csp-hashes.mjs`) + `dist/favicon.svg` + `dist/_headers` + `dist/robots.txt` |
| `pnpm preview` / `npm run preview` | Preview `dist` build locally | ✅ | |
| `pnpm typecheck` / `npm run typecheck` | Type gate `tsc --noEmit` | ✅ | **Run before every push.** Strict flags will fail on unused locals/params. Currently 0 errors. |
| `pnpm lint` / `npm run lint` | ESLint flat `eslint . --max-warnings 0` (`eslint.config.js`) | ✅ | 0 warnings. Ignores `dist`, `node_modules`, `coverage`, `playwright-report`, `test-results`, `skills`, `src.orig` |
| `pnpm lint:fix` / `npm run lint:fix` | ESLint auto-fix (`eslint . --fix`) | ✅ | |
| `pnpm test` / `npm run test` | Vitest `jsdom` — `vitest run` | ✅ **29 files / 224 tests green** | Harness `src/test/setup.ts` (jest-dom + IO mock + scroll stubs + matchMedia) + OLOL-adapted suite (data 26 + utils 22 + components 49 + hooks 10 + pages 21 + contracts 96) — BSC suite ported from `src.orig` |
| `pnpm test:watch` | Vitest watch mode (`vitest`) | ✅ |  |
| `pnpm test:coverage` | Vitest with coverage (`vitest run --coverage`) | ✅ |  |
| `pnpm test:e2e` / `npm run test:e2e` | Playwright `chromium` — `playwright test` (10 spec files + helpers — `e2e/`: smoke, navigation, mobile-navigation, ministries, give-faq, enhancements, enhancements-round5/7/19, deep-links) | ✅ | Specs are present; update OLOL-specific assertions (50 Ophir, 1888, grotto) when re-adding E2E. |
| `pnpm test:e2e:built` | Playwright vs the **built artifact** — `playwright test --config=playwright.built.config.ts` (`vite preview :4173` serving `dist/`; set `E2E_BASE_URL` to target the live host instead — webServer is skipped) | ✅ | Catches dev/build divergence (singlefile rewrites `/favicon.svg` → `./favicon.svg`). |
| `pnpm test:e2e:ui` | Playwright UI mode (`playwright test --ui`) | ✅ | |
| `pnpm test:e2e:report` | Open last Playwright HTML report (`playwright show-report`) | ✅ | |
| `pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build` | **Pre-push gate — all five green** | ✅ | `pnpm lint` 0 + `pnpm typecheck` 0 + `pnpm test` 29/224 + `pnpm build` 387.60 kB (e2e 10 spec + helpers present) |

> Before documenting a command as available, verify it in `package.json` scripts. All five gates (`lint`, `typecheck`, `test`, `test:e2e`, `build`) are green (re-verified 2026-09-06 — 29 files / 224 tests).

### Adding Tooling

Tooling is already wired (`eslint 9.39.5` flat + `vitest 3.2.6` + `@testing-library/react 16.2.0` + `playwright 1.55.1`). When adding new tooling, verify `package.json` scripts and update this table. Previous bootstrap (for reference):

```bash
pnpm add -D eslint @eslint/js typescript-eslint eslint-plugin-react-hooks eslint-plugin-react-refresh globals
pnpm add -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
pnpm add -D @playwright/test && npx playwright install chromium
```

## Testing Strategy

Current status: **green — 29 files / 224 tests (OLOL-adapted suite ported from `src.orig` BSC 29/181)** + `src/test/setup.ts` harness. `vitest 3.2.6` (jsdom) + `@testing-library/react 16.2.0` + `jsdom 26.1.0` are installed and `vite.config.ts` `test` is configured for `{ globals: true, environment: "jsdom", setupFiles: ["src/test/setup.ts"], include: ["src/**/*.{test,spec}.{ts,tsx}"], exclude: ["e2e/**", "node_modules/**", "playwright-report/**", "test-results/**"] }` with `src/test/setup.ts` (jest-dom + IntersectionObserver mock + scroll stubs + matchMedia). `playwright 1.55.1` (chromium, 10 spec files + `helpers.ts` in `e2e/`) is present — specs assert OLOL copy when enabled. Historical BSC suite was **29 files / 181 tests + 67 E2E** (round-18/19) — now ported to OLOL (50 Ophir, 1888, 11 February, no UEN).

Run `pnpm test` (unit — 29 files / 224 tests green), `pnpm test:watch`, `pnpm test:coverage`, `pnpm test:e2e` (E2E, `webServer` → `pnpm exec vite --port 5173 --host 127.0.0.1 --strictPort` with `reuseExistingServer: !CI`), `pnpm test:e2e:built` (built-artifact pass via `playwright.built.config.ts` — `vite preview :4173` serving `dist/`; `E2E_BASE_URL` retargets to the live host and skips the webServer), `pnpm test:e2e:ui` (UI mode), `pnpm test:e2e:report` (HTML report). `vite.config.ts` `server.watch.ignored` lists `skills`/`dist`/`coverage`/`src.orig` (plus report dirs).

**Ported OLOL fixtures (from `src.orig` BSC):**

- `lifeTimeline` 7 entries **1884–2005** (1884 Shepherd → 1885 Rochor land → 1886 cornerstone 1 Aug → 1888 Basilica 13 May → 1942 War → 1974 Parish for All → 2005 Monument No. 52), `priests` 3 (Alphonsus Dominic / Leo Justin HGN / Meneuvrier MEP — `email` optional, no `phone`), `ppcMembers` 6, `grounds` 3 (main-church/grotto/garden), `site` (no UEN, `uen ""`, feast 11 Feb, transport Bugis/Rochor/Jalan Besar, buses Ophir list), `ministries` 6, `faqs` 7, `givingOptions` 6 (PayNow/Cheque OLOL/Cash/Mass Offerings/SVDP).
- `e2e` smoke/navigation/ministries/give-faq hashes and copy: assert `50 Ophir Road`, `A grotto in the city`, `Neo-Gothic`, `National Monument`, `11 February`, `Meneuvrier`, `1888` etc., not `1 Commonwealth Drive` / `Tent of Meeting` / `Corpus Christi`.

Coverage — **historical (BSC, as of 2026-09-02 — 29 files / 181 tests):** `utils/cn` (5), `data/nav` (7), `data/content` (10), `data/site` (8), `utils/massDay` (5), `utils/monogram` (7), `utils/deepLinks` (7), `ui/Button` (11), `SkipLink` (3), `ui/Accordion` (6), `SafeImage` (6), `Header` (17), `BackToTop` (7), `ui/Reveal` (2), `components/wcag-contrast` (5), `pages/Ministries` (3), `pages/cta-bands` (6), `pages/worship-mass` (6), `pages/about-visuals` (4), `pages/event-chips` (3), `pages/give-featured` (2), `pages/give-uen` (3), `pages/card-affordances` (6), `components/Timeline` (3), `pages/NotFound` (2), `pages/History` (2), `Layout` (2), `hooks/useScrollProgress` (4), `hooks/useScrollSpy` (6), `ScrollProgress` (2), `head` (13), `security-headers` (6) via `src/test/setup.ts`. Those fixtures were BSC (1 Commonwealth/UEN T08CC1234A); the OLOL port must replace them with OLOL fixtures above.

**E2E (historical — BSC, 10 specs / 67):** smoke, navigation, mobile-navigation, ministries, give-faq, enhancements, enhancements-round5/7/19, deep-links — all asserting `1 Commonwealth Drive`, `A tent of meeting`, `Queenstown`, `Corpus Christi` etc. OLOL port must re-assert `50 Ophir Road`, `A grotto in the city`, `Neo-Gothic`, `National Monument`, `11 February` etc.

Conventions: `*.test.tsx` adjacent to source, `__mocks__` only when isolating `react-router-dom`, and `src/data/content.ts` factories for fixtures. `vite.config.ts` `test.exclude` keeps `e2e/**` out of unit runs; `e2e/*.spec.ts` is Playwright only.

### When to Add More Tests (beyond the rewrite)

- Harness is absent — new tests slot into `src/**/*.test.{ts,tsx}` after creating `src/test/setup.ts`.
- Follow the OLOL fixtures in `src/data/*.test.ts` as the shape reference once created — highest value, lowest churn.
- Routing contract — `App.tsx` alias routes + hash anchors integration — covered by `e2e/smoke.spec.ts` + `e2e/navigation.spec.ts` once OLOL-retargeted.
- Critical journeys — expand `e2e/` beyond smoke: devotion flows, map embed (`50 Ophir Road`), grotto, stained glass, National Monument, 11 Feb feast, Tamil 09:30 / English 08:00 etc.
- Visual / a11y — add `axe` scan + `playwright` trace/video (already `on-first-retry`).

## Code Quality Standards

### Linting & Formatting (wired)

`eslint 9.39.5` flat config (`eslint.config.js`) — `typescript-eslint 8.28.0` + `eslint-plugin-react-hooks 5.2.0` + `eslint-plugin-react-refresh 0.4.19` + `globals 16.1.0` (ignores `dist`, `node_modules`, `coverage`, `playwright-report`, `test-results`, `skills`, `src.orig`). Run `pnpm lint` (`eslint . --max-warnings 0`) and `pnpm lint:fix` (`eslint . --fix`) for auto-fix. Verified 2026-09-06: **0 warnings**.

Gate for pre-ship (verified 2026-09-06):

```bash
pnpm lint               # eslint flat — no warnings (0)
pnpm typecheck          # tsc --noEmit (0)
pnpm test               # vitest run — 29 files / 224 tests green
pnpm build              # vite build — singlefile inlines correctly (387.60kB)
# pnpm test:e2e runs 10 specs + helpers
```

### Type Safety

- No `any`; `as any` is a last resort with a `// ponytail:` ceiling comment.
- `unknown` + narrowing at trust boundaries (URL params, external JSON).
- Keep `tsconfig.json` strict flags on; do not relax to silence errors.
- Prefer `interface` for shapes, `type` for unions/intersections. `EventItem.category` is a string union (`Parish|Devotion|Formation|Archdiocese`); `GivingOption.icon` is a union of 6 icon names (`globe|church|book|heart|flame|sprout`); `Priest` has `name` + `role` + optional `email?: string` + `bio` and **no phone** (OLOL priests are Alphonsus/Leo/Meneuvrier); `PpcMember` has `role` + `name` (OLOL: 6 — ex-officio + Chairperson / Vice Chairperson / Secretary / Treasurer / Member); `serveRoles` items have `title` + `summary` (not `description`); `GroundsPlace`/`Ministry` have `id` + `title` + `summary`/`description` + `details[]` + `image`/`imageFallback`/`imageAlt`.

### Styling Discipline

- Use existing `bsc-*` tokens before introducing new colors. Tokens 33 colors + 2 shadows are the budget — frame the OLOL grotto / Neo-Gothic nave / stained glass imagery with them, don't add arbitrary `bg-[#...]`.
- No redundant CSS: extend `@theme` or add a named `@utility`; do not duplicate utilities across components.
- Keep bespoke CSS to `src/index.css` `@layer` blocks. Document new utilities (`text-balance`, `bg-adobe-texture`, `bg-grain`, `divider-weave`, `gold-rule`, `hero-ken-burns`, `rise-in`+`-d1..d4`, `menu-in`, `drawer-in`, `dot-pulse`, `card-lift`, `link-underline`, `reveal`, `skip-link`, `mask-fade-b`, `page-in`, `scrim-hero`, `scrim-page`, `hero-fade`, `rule-draw`, `bloom-drift` etc.) alongside them.

## Git & Version Control

### Branching

- `main` is the deploy branch (single-file artifact).
- Feature branches: `feat/<slug>`, fixes: `fix/<slug>`, docs: `docs/<slug>`. Short-lived (1–3 days), rebase or squash-merge.
- Do not commit `node_modules/`, `.next/`, `dist/`. `skills/` is **vendored, git-tracked reference content** (catalog at `skills/skills-catalog.md` + per-skill SKILL.md + scripts); `eslint.config.js` ignores and `vite.config.ts` watch-ignores it — never import or lint it. **`src.orig/` does not exist in this worktree** (historical Risen Christ archive, not checked out — `git log --all -- src.orig` is empty). Do not import or lint it; the tooling ignores apply regardless. Never commit secrets.

### Commit Standards

- Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `style:`.
- Atomic commits (one logical change). Subject ≤ 72 chars; body explains why.

### Push / Deploy

Gate before pushing `main` (mirrored in CI — `.github/workflows/ci.yml`):

```bash
pnpm lint && pnpm typecheck && pnpm build   # green today (2026-09-06)
# target gate once tests are restored:
# pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build
git push origin main
```

**CI (`.github/workflows/ci.yml`)** — triggers on `push`/`pull_request` to `main`, `concurrency: group: ci-${{ github.ref }}, cancel-in-progress: true`, `runs-on: ubuntu-latest`, `timeout-minutes: 15`:
`actions/checkout@v4` → `pnpm/action-setup@v4` (`version: 11`) → `actions/setup-node@v4` (`node-version: 24`, `cache: pnpm`) → `pnpm install --frozen-lockfile` → `pnpm lint` → `pnpm typecheck` → `pnpm test` → `npx playwright install --with-deps chromium` → `pnpm test:e2e` → `pnpm build` → artifacts: `dist/` (always, `retention-days: 7`) + `playwright-report/` (on failure, `retention-days: 14`). CI mirrors the gate — `pnpm test` currently reports `No test files found` (scaffolding snapshot), `pnpm build` is `387.60kB`.

Primary artifact `dist/index.html` (+ `dist/images/` copied from `public/` — `viteSingleFile` inlines JS+CSS, not `publicDir`) deploys directly to GitHub Pages (via `gh-pages` branch or `dist` artifact — upload both) or S3 — `HashRouter` avoids 404s on static hosts (deep links `/#/worship`, `/#/ministries#liturgical` resolve without a `404.html` redirect).

## Error Handling & Debugging

- SPA has no server failures; handle: broken image fallbacks (`SafeImage` → `/images/hero-church.jpg` fallback default, `dataset.fallback` guard), unknown routes → `NotFound` (`pages/NotFound.tsx` — "This path does not lead to the church." + `Return home` / `Mass times`), and empty content states per page (every list has an empty state if data is async in future).
- `Layout` scroll logic should degrade gracefully when a `#hash` target is missing (current behavior: falls back to `window.scrollTo({ top: 0 })`). Preserve the `resolveAnchor` double-hash handling when extending layout concerns. Layout is `ScrollProgress` + `SkipLink` + `Header` + keyed `page-in` outlet + `Footer` + `BackToTop`.
- `SafeImage` fallback pattern: guards `onError` with `dataset.fallback="1"` so the swap to `/images/hero-church.jpg` (or explicit `fallback`) fires once. Current `images.*` are all local but keep `SafeImage` for any future external image — use it instead of bare `<img>` for CDN sources. E2E `route.abort` fallback exercise remains valid when ported.
- For future data fetching (CMS/API): wrap with error boundaries and show user-friendly messages; never leak raw errors.
- Debugging: Vite HMR overlay + React DevTools. For `HashRouter` issues, inspect `location.pathname` + `location.hash` in `Layout`'s `useEffect` (log `window.location.hash` and `resolveAnchor` output).

## Communication & Documentation

- Explain _why_ behind parish-specific choices (historical wording — Meneuvrier 1884 / Rochor land 1885 / cornerstone 1 Aug 1886 / blessed 13 May 1888 Neo-Gothic / War 1942 / territorial 1974 / Monument 2005 restored 2009–10; liturgical — 11 February Our Lady of Lourdes; pastoral — grotto, Tamil + English, stained glass).
- Keep `docs/prompts.md` for lineage prompts; update when intent shifts. Lineage: Rother Shrine → St Joseph BT → St Mary of the Angels → Risen Christ (archive — local-only, not in repo) → Blessed Sacrament Queenstown (BSC, historical) → Our Lady of Lourdes (OLOL, current `src` — 41 files).
- Document new routes, tokens, or images in this file and in `src/data/nav.ts` / `src/data/content.ts` / `src/data/site.ts` comments where applicable.
- Preserve dual-route aliases when renaming legacy paths (external links and printed bulletins exist — keep `/volunteer`→`/serve`, `/donate`→`/give`, `/hours-location`→`/worship`, etc. or add explicit redirects).

## Project-Specific Standards

### Architecture

```
src/ (41 source + 29 tests + 1 setup = 71 files; 29 files / 224 tests green — OLOL-adapted suite ported from src.orig)
  App.tsx                # HashRouter + route table: 17 Route entries (16 content paths + * NotFound), 5 alias groups / 7 alias paths + 9 hash anchors (Layout outlet)
  main.tsx               # StrictMode + createRoot + resolveHashRedirect pre-mount rewrite (deepLinks: path-style routes land on their hash)
  index.css              # Tailwind v4 @theme (33 colors + 2 shadows) + @layer base/utilities (31 utilities + 10 keyframes: text-balance, bg-adobe-texture, bg-gold-bloom, bg-grain, divider-weave, divider-weave-thin, gold-rule, gold-rule-left, hero-ken-burns, img-zoom, mask-fade-b, reveal, reveal-visible, rise-in + rise-in-d1..d4, menu-in, drawer-in, drawer-item-in, page-in, dot-pulse, card-lift, card-tint, link-underline, skip-link + scrim-hero, scrim-page, hero-fade, rule-draw, bloom-drift + themed scrollbar (sapphire thumb on parchment track, webkit + scrollbar-color) + @media print reveal override)
  components/
    Layout.tsx           # SkipLink + ScrollProgress (fixed rail z-[60] scaleX) + Header + Outlet in a keyed-by-pathname `page-in` wrapper (route changes remount + replay entrance; hash-only updates keep the same node so anchor scroll is undisturbed; data-testid page-container, data-route) + Footer + BackToTop + double-hash scroll/hash restoration (split on # + strip / + 80ms setTimeout + fallback window.scrollTo)
    Header.tsx           # fixed + useScrolled(16) (hook default 12) → sapphire-950/92 translucent + blur; transparent at top of Home, solid = scrolled||!isHome||mobileOpen + top bar (lg: site.address.street·site.feast.name + Give link-underline) + desktop hover (openDesktopMenu, menu-in entrance, closes on child-link click, aria-current parent/link states) + mobile modal drawer (role=dialog + aria-modal + Site menu label + tabIndex=-1 panel focused on open + handleDrawerKeyDown Tab/Shift+Tab trap + focus restore to hamburger via drawerWasOpenRef + outside pointerdown close; drawer-in entrance + drawer-item-in 40ms stagger) whose drawer closes on any in-drawer link activation (onClickCapture on drawer nav — same-route taps never change pathname) + drawer aria-current (leaf `page`, parent section `true` when a child route is active, both gold) + hash-aware + Escape handler + h-11 w-11 (44px) hamburger
    ScrollProgress.tsx   # decoupled hairline rail fixed at z-[60] h-[3px]; scaleX(progress) transform-only, aria-hidden, data-testid scroll-progress (Layout renders it, not Header)
    Footer.tsx           # 4-col (parish blurb: 1888 Neo-Gothic, grotto of St Bernadette, stained glass, National Monument No. 52 — Tamil + English at 50 Ophir Road + Explore/Get involved from footerNav + visit/contact) + divider-weave-thin + OLOL copy + 1 social icon (Facebook via custom SVG — Instagram/YouTube empty in site.ts) + "Archdiocese of Singapore" text link + address 50 Ophir Road + office hours Mon–Fri 9–17:00 + phone 6294 0624 + copyright
    PageHero.tsx         # sapphire-950 hero + SafeImage (opacity-35, fetchPriority="high") + dual gradients + bg-grain + rise-in staged eyebrow/title/description/children; props: eyebrow/title/description/image/fallback/compact?/variant? (light/dark) (compact tightens pt/pb)
    SafeImage.tsx        # <img> wrapper: fallback="/images/hero-church.jpg", loading="lazy" default, state for current/loaded, fade-in, onError→dataset.fallback guard (once), optional fetchPriority ("high" on above-the-fold heroes), transition-opacity
    SkipLink.tsx         # preventDefault + imperative focus on #main-content (never rewrites hash under HashRouter)
    BackToTop.tsx        # fixed bottom-right (44px target, sapphire-900 + gold ring + SVG progress ring sharing useScrollProgress — gold stroke-dashoffset fills with reading depth): appears when scrollY > 480, data-testid back-to-top + data-testid back-to-top-progress + circle[data-progress] dashoffset, aria-hidden + tabIndex -1 + pointer-events-none when hidden (+ blurs itself when hiding while focused), click → window.scrollTo (behavior auto under prefers-reduced-motion via matchMedia; never touches the hash)
    Emblem.tsx / Timeline.tsx (left rail with draw animation — scale-y-0→100 on viewport entry, dot-pulse halos) / SocialIcons.tsx (custom SVG — Facebook 1 icon, Instagram/YouTube empty) / EventMeta.tsx (categoryTone chip via separate util)
    ui/                  # Button (discriminated to/href/button + primary/secondary/ghost/outline-light + icon + active press feedback) / Container (max-w-7xl px-5 sm:px-8) / SectionHeading (eyebrow/title/description + align/light + gold-rule) / Accordion (single-open, aria-expanded, keyboard Arrow/Home/End, animated grid-rows 0fr→1fr collapse with aria-hidden inert closed panels) / Reveal (delay/as + IntersectionObserver 0.15 + prefers-reduced-motion)
  hooks/ (3)
    useScrolled.ts       # threshold 12 default; Header passes 16 — intentional mismatch (delayed transparent→solid on Home)
    useScrollProgress.ts # reading progress 0..1 (scrollY / (scrollHeight - innerHeight)), rAF-throttled, guarded against unscrollable docs (max <= 0 → 0), clamped — shared by ScrollProgress rail + BackToTop ring
    useScrollSpy.ts      # IntersectionObserver band-tracking (-45%/-50% rootMargin) — returns the deepest section id crossing the viewport's middle band; Ministries scrollspy
  pages/ (10, named exports — OLOL copy)
    Home.tsx             # hero (local) rise-in staged + quickFacts (site.mass/MRT/feast) + welcome (site.tagline "A grotto of welcome in the city." / tamilName / vision) + grounds preview (3: Main Church Neo-Gothic / Grotto / Parish Grounds) → /worship anchors + events (6 from upcomingEvents)
    About.tsx            # pillars + clergy (priests[3] Alphonsus Dominic / Leo Justin HGN / Meneuvrier MEP — email-only) with monogram discs + household (ppcMembers[6] ex-officio + Chairperson / Vice Chairperson / Secretary / Treasurer / Member)
    History.tsx          # lifeTimeline (7, 1884–2005) via Timeline: 1884 Shepherd → 1885 Land → 1886 Cornerstone 1 Aug → 1888 Basilica 13 May → 1942 War → 1974 Parish for All → 2005 Monument No. 52
    Worship.tsx          # #mass (site.mass: weekdayNoon 12:30 English / weekdayEvening 19:00 Tamil / saturday 17:00+18:15+19:30 / sunday[5] 08:00 English / 09:30 Tamil / 11:00 English / 12:30 English / 18:30 Tamil + publicHoliday 09:00/10:00 + confession 15 min before Mass + adoration Rosary/Divine Mercy/Sat Rosary) + #confession + #visit (address 50 Ophir Road 188690 / hours church gates 17:00 holidays + MRT Bugis/Rochor/Jalan Besar + buses Ophir/Victoria + mapsEmbedSrc iframe + mapsUrl)
    Ministries.tsx       # jump nav (<Link to="/ministries#id"> 6 pills: liturgical/faith-formation/pastoral-care/family-life/youth/community) + ministries[6] alternating bsc-cream/parchment sections
    NewsEvents.tsx (compact PageHero) / Serve.tsx (serveRoles[4] summary: Liturgical/Catechists/Pastoral Care/Hospitality & Grounds + no section ids + visitorGuidelines dress/other) / Give.tsx (givingOptions[6]: PayNow / Cheque "Church of Our Lady of Lourdes" / Cash / Mass Offerings / St Vincent de Paul + icon union globe|church|book|heart|flame|sprout) / FAQ.tsx (faqs[7]: Mass/confession/how to get there/parking/dress & visitor guidelines/baptism-marriage-volunteer/office hours via Accordion grid-rows + inert) / NotFound.tsx ("This path does not lead to the church." + Return home / Mass times)
  data/
    nav.ts               # primaryNav (6, 3 with children+description: About[3]/Worship[3]/Ministries[3] — OLOL wording) / footerNav (10) (single source; Header/Footer render from it)
    content.ts           # Typed data layer: 8 interfaces + 11 exports — priests[3] (Alphonsus Dominic from 22 Jul 2026 / Leo Justin HGN HGN reappointed 1 Nov 2024 / Meneuvrier MEP 1884) + ppcMembers[6] (ex-officio + Chairperson / Vice Chairperson / Secretary / Treasurer / Member) + lifeTimeline[7] 1884–2005 (1884 Shepherd, 1885 Rochor land, 1886 cornerstone, 1888 basilica, 1942 war, 1974 territorial, 2005 monument No. 52 restored 2009–10) + grounds[3] (main-church/grotto/garden → Main Church/Grotto/Parish Grounds + image/imageFallback/imageAlt — all local) + ministries[6] (liturgical/faith-formation/pastoral-care/family-life/youth/community + imageFallback) + faqs[7] (Mass/confession/how to get there/parking/dress & visitor guidelines/baptism-marriage-volunteer) + upcomingEvents[6] (Parish Feast 11 Feb + Rosary/Divine Mercy/Novena etc. + optional href) + givingOptions[6] (PayNow / Cheque Church of Our Lady of Lourdes / Cash / Mass Offerings / St Vincent de Paul + icon union globe|church|book|heart|flame|sprout) + serveRoles[4] (title+summary) / devotions[6] (title+when+where: Holy Rosary Mon/Wed/Thu/Fri 11:35 / Divine Mercy Tue 11:35 / Saturday Rosary 16:15 / Reconciliation 15 min before Mass / Parish Feast 11 Feb / Grotto Prayer daily) + visitorGuidelines {dress[5], other[6]} + images {hero/heroFallback/chapel→grotto/sanctuary/garden/hall→community/feast→grotto local} (7 keys, all local, each grounds/ministry item carries imageFallback)
    site.ts              # canonical single source (as const): name "Church of Our Lady of Lourdes" / shortName "Our Lady of Lourdes" / tamilName "தூய லூர்து அன்னை ஆலயம்" / tagline "A grotto of welcome in the city." / vision / address 50 Ophir Road Singapore 188690 (street/city/zip/full+query getters) + hours (church gates 17:00 holidays / office Mon–Fri 9–17 / reception Mon–Fri 9–17 / adoration Before weekday Mass 11:35 / confessionWeekday/confessionWeekend 15 min before each Mass) + mass (weekdayNoon Mon–Fri 12:30 / weekdayEvening Mon–Fri 19:00 Tamil / saturday 17:00+18:15+19:30 / sunday[5] 08:00 English / 09:30 Tamil / 11:00 English / 12:30 English / 18:30 Tamil + publicHoliday 09:00 English · 10:00 Tamil / confession 15 min before Mass / adoration Rosary/Divine Mercy/Sat Rosary 16:15 / note office closed gates 17:00) + contact (officePhone +65 6294 0624 / fax +65 6294 2686 / email colol.secretariat@catholic.org.sg) + transport (MRT Bugis EW12/DT14 · Rochor DT13 · Jalan Besar DT22 / buses Ophir/Victoria 2,7,12,32,33,51,61,63,80,130,133,145,197) + feast Our Lady of Lourdes 11 February + uen "" (no UEN) + chequePayee "Church of Our Lady of Lourdes" + facebook ChurchOfOurLadyOfLourdes / instagram "" / youtube "" / archdiocese catholic.sg / mapsUrl/mapsEmbedSrc (50 Ophir Road) + url/ogImage ourladyoflourdes.sg — Footer + Worship + About consume it, don't duplicate
  utils/ (5)
    cn.ts                # twMerge(clsx) — always merge via cn()
    massDay.ts           # massDayKey(date): MassDayKey = weekdays|saturday|sunday — maps getDay 0→sunday/6→saturday/rest→weekdays, single source for Worship today-highlight
    monogram.ts          # monogram(name): "Fr Alphonsus Dominic" → "AD" — honorific stripping (MEP/HGN + Fr/Friar/Rev/Msgr/Mr/Ms/Mrs), comma-split, first two initials
    deepLinks.ts         # knownRoutePaths (16 paths incl. aliases) + resolveHashRedirect(pathname, hash): string|null — path-style → hash rewrite before mount (main.tsx); JSDoc stripped
    categoryTone.ts      # categoryTone(category): string — maps EventItem.category (Parish|Devotion|Formation|Archdiocese) to bsc-* tone classes for chip labels
public/
  images/ (10)           # hero-church.jpg, grotto.jpg, sanctuary.jpg, garden.jpg, community.jpg, liturgical.jpg, pastoral-care.jpg, faith-formation.jpg, family-life.jpg, youth.jpg (Vite publicDir → dist/images/ — upload alongside dist/index.html); all images local; + `_headers` (host security headers) + `robots.txt`; favicon is /favicon.svg + inline emoji in index.html
  _headers               # security headers (HSTS/XCTO/XFO/Referrer-Policy/Permissions-Policy) → dist/_headers
vite.config.ts           # alias @→src + test { globals, jsdom, setupFiles: src/test/setup.ts (absent in current worktree — add before re-adding tests), include: src/**/*.{test,spec}.{ts,tsx}, exclude: e2e/** } + server.watch.ignored [skills/**, dist/**, playwright-report/**, test-results/**, coverage/**, src.orig/**] + viteSingleFile()
tsconfig.json            # strict + noUnusedLocals/noUnusedParameters/noFallthroughCasesInSwitch/isolatedModules/noEmit + include [src, vite.config.ts, eslint.config.js, playwright.config.ts, playwright.built.config.ts] + types [node, vitest/globals] + paths @/*
eslint.config.js         # flat config (typescript-eslint 8 + react-hooks 5 + react-refresh); ignores [dist, node_modules, coverage, playwright-report, test-results, skills, src.orig]
playwright.config.ts     # Playwright 1.55.1 (chromium, webServer → pnpm exec vite :5173, expect timeout 15s; CSP is a meta tag in index.html, post-build sha256-pinned by scripts/inject-csp-hashes.mjs)
playwright.built.config.ts # Playwright vs the built artifact — extends the base config; vite preview :4173 (or E2E_BASE_URL → live host, webServer skipped); catches singlefile dev/build divergence
index.html               # title "Church of Our Lady of Lourdes — Singapore"; meta description "first Tamil Catholic church, national monument at 50 Ophir Road since 1888. Mass in English and Tamil. A grotto in the city."; theme-color #0a1122; CSP meta tag (default-src 'self', script-src 'self' 'unsafe-inline' source → sha256 after build via inject-csp-hashes.mjs, style-src 'self' 'unsafe-inline' https://fonts.googleapis.com, font-src https://fonts.gstatic.com data:, img-src 'self' data: blob:, frame-src https://www.google.com, connect-src 'self', object-src 'none', base-uri 'self'); canonical https://ourladyoflourdes.sg/; favicon /favicon.svg + inline emoji; OG (url https://ourladyoflourdes.sg/ / title / description); Church JSON-LD (name "Church of Our Lady of Lourdes" / alternateName [Our Lady of Lourdes Singapore, OLOL, தூய லூர்து அன்னை ஆலயம்] / address 50 Ophir Road/188690 / telephone +65 6294 0624 / email colol.secretariat@catholic.org.sg / url / sameAs facebook); Google Fonts Fraunces + Source Sans 3; viewport + #root + /src/main.tsx
e2e/ (10 spec files + helpers.ts — specs present, OLOL copy when assertions are re-enabled) # smoke + navigation + mobile-navigation + ministries + give-faq + enhancements + enhancements-round5 + enhancements-round7 + enhancements-round19 + deep-links + helpers.ts — should assert OLOL copy (50 Ophir Road, A grotto in the city, Neo-Gothic, National Monument, 11 February, Meneuvrier) + drawer full-height/toggle/label-tap/Give contracts at 390×844
src.orig/ # present on disk (71 files — BSC source, local-only, not committed) — fixture source for the OLOL test port; git log shows no src.orig tree. Historical docs describing a 77-file Risen Christ snapshot refer to earlier lineage
.github/workflows/ci.yml # CI: lint → typecheck → test → test:e2e → build + artifacts (Node 24, pnpm 11, pnpm-lock committed, --frozen-lockfile)
scripts/                # inject-csp-hashes.mjs — post-build: hashes inline <script> bodies and rewrites CSP script-src to sha256-… list
```

### File Organization & Naming

- Components: `PascalCase.tsx` (e.g., `PageHero.tsx`, `SafeImage.tsx`); hooks: `useThing.ts` (`hooks/useScrolled.ts` threshold `12` default, `16` in `Header` — intentional delay; `hooks/useScrollProgress.ts` rAF; `hooks/useScrollSpy.ts` IntersectionObserver band).
- Data/utils: `camelCase.ts` (`content.ts`, `site.ts`, `nav.ts`, `cn.ts`, `massDay.ts`, `monogram.ts`, `deepLinks.ts`, `categoryTone.ts`).
- Pages: `PascalCase.tsx` matching route intent (`About.tsx`, `History.tsx`, `Worship.tsx`, `Ministries.tsx`, `NewsEvents.tsx`, `Serve.tsx`, `Give.tsx`, `FAQ.tsx`, `NotFound.tsx`) — 10 pages, all named exports (`Home`, `About`, `History`, `Worship`, `Ministries`, `NewsEvents`, `Serve`, `Give`, `FAQ`, `NotFound`).
- Assets: `public/images/<slug>.jpg` (10 files) — reference as `/images/<slug>.jpg` (absolute from root, Vite `publicDir` → `dist/images/` — upload alongside `dist/index.html`; singlefile inlines JS+CSS, not `public/`). Local keys: `hero`/`heroFallback`/`chapel→grotto`/`sanctuary`/`garden`/`hall→community`/`feast→grotto`; `naveCdn`/`courtyardCdn` now alias local `sanctuary`/`garden` if referenced.
- Tests: `*.test.{ts,tsx}` adjacent to source — **29 files / 224 tests green (OLOL-adapted, ported from src.orig BSC 29/181)**. `vite.config.ts` `test.exclude` keeps `e2e/**` out; `e2e/*.spec.ts` is Playwright only (10 spec + helpers, OLOL copy).

### Design System

- Tokens: see `src/index.css` `@theme`. Additions require design rationale in PR description. Tokens 33 colors + 2 shadows: `bsc-cream/parchment/parchment-dark/stone/ink/charcoal` (6), `sapphire-50..950` (11), `gold-100..700` (7), `terracotta-50/300/400/500/600` (5), `pine-50/300/500/600` (4) + `shadow-bsc/bsc-lg`. Imagery they frame is OLOL's Neo-Gothic grotto (1888 lancet nave, grotto of St Bernadette, stained glass rosary, garden at 50 Ophir Road) — keep tokens stable.
- **Color Reference (exact hex values):**

  | Token | Hex | Role |
  |-------|-----|------|
  | `--color-bsc-cream` | `#f8f5ef` | page background |
  | `--color-bsc-parchment` | `#efe8d8` | card/section surfaces |
  | `--color-bsc-parchment-dark` | `#e3d8c2` | hover state |
  | `--color-bsc-stone` | `#d4c9ae` | borders, dividers |
  | `--color-bsc-ink` | `#1e2330` | body text |
  | `--color-bsc-charcoal` | `#3a3f4d` | secondary text |
  | `--color-bsc-sapphire-50` | `#eef2fb` | lightest sapphire tint |
  | `--color-bsc-sapphire-100` | `#d6e0f5` | Parish chip bg |
  | `--color-bsc-sapphire-200` | `#b0c4eb` | selection bg |
  | `--color-bsc-sapphire-300` | `#7a9bdb` | |
  | `--color-bsc-sapphire-400` | `#4a72c4` | focus ring, rail gradient start |
  | `--color-bsc-sapphire-500` | `#3458a8` | |
  | `--color-bsc-sapphire-600` | `#28458a` | |
  | `--color-bsc-sapphire-700` | `#1f366e` | year text, scrollbar thumb |
  | `--color-bsc-sapphire-800` | `#1a2b55` | social icon bg |
  | `--color-bsc-sapphire-900` | `#0f1a33` | dropdown bg |
  | `--color-bsc-sapphire-950` | `#0a1122` | header solid, hero bg |
  | `--color-bsc-gold-100` | `#f5eacc` | Devotion chip bg |
  | `--color-bsc-gold-200` | `#ebd599` | |
  | `--color-bsc-gold-300` | `#dfc06a` | |
  | `--color-bsc-gold-400` | `#d4ad42` | gold-rule gradient start, dot-pulse halo |
  | `--color-bsc-gold-500` | `#c49a2c` | gold-rule gradient end |
  | `--color-bsc-gold-600` | `#a67f22` | |
  | `--color-bsc-gold-700` | `#85641c` | Devotion chip text |
  | `--color-bsc-terracotta-400` | `#c07a5a` | |
  | `--color-bsc-terracotta-500` | `#a86545` | |
  | `--color-bsc-terracotta-600` | `#8f5038` | Archdiocese chip text (AA on parchment) |
  | `--color-bsc-pine-500` | `#2d5a40` | |
  | `--color-bsc-pine-600` | `#1f422e` | Formation chip text |
  | `--shadow-bsc` | `0 20px 60px -20px rgba(15, 26, 51, 0.45)` | card lift, dropdown |
  | `--shadow-bsc-lg` | `0 40px 90px -30px rgba(15, 26, 51, 0.55)` | drawer, dropdown |

- Typography scale: `Fraunces` for display/quote, `Source Sans 3` for body. Use `font-display` class for intentional display turns. `index.html` loads both with `preconnect`.
- Elevation: `shadow-bsc` (`0 20px 60px -20px rgba(15, 26, 51, 0.45)`) and `shadow-bsc-lg` (`0 40px 90px -30px rgba(15, 26, 51, 0.55)`). Use sparingly (hero, cards, emblem).
- Utilities (31 + 10 keyframes): `text-balance`, `bg-adobe-texture`, `bg-gold-bloom`, `bg-grain`, `divider-weave`/`divider-weave-thin`, `gold-rule`/`gold-rule-left`, `hero-ken-burns`, `img-zoom`, `reveal`/`reveal-visible`, `rise-in`+`-d1..d4`, `menu-in`, `drawer-in`, `drawer-item-in`, `page-in`, `dot-pulse` (+ `halo-pulse` 2.6s), `card-lift`, `card-tint`, `link-underline`, `skip-link`, `mask-fade-b`, `scrim-hero`/`scrim-page`, `hero-fade`, `rule-draw`, `bloom-drift` + themed scrollbar. `prefers-reduced-motion: reduce` disables `reveal` + `hero-ken-burns` + `hero-fade` + `rule-draw` + all entrance animations + smooth scroll via `@layer base`/`@layer utilities` overrides.
- Do not introduce purple gradients, `Inter` defaults, or generic card-grid templates — anti-generic enforcement.
- Reference skill: `avant-garde-design-v4` for direction when adding new sections.

### State & Data Layer

- No API or DB. Content arrays in `src/data/content.ts` (plus `site.ts` canonical facts, `nav.ts` nav) are the data layer. Validate shape with TypeScript interfaces (`TimelineEntry`, `GroundsPlace`, `Ministry`, `FaqItem`, `EventItem`, `GivingOption`, `Priest` with `email?: string` + `bio`, `PpcMember`) and the `images` const; add Zod schemas only if external data arrives.
- `EventItem` shape is `{ title, date, summary, category: Parish|Devotion|Formation|Archdiocese, href?: string }` — currently `href` is optional and 1 of the 6 upcoming events carries it. Do not reintroduce `location`.
- `GivingOption` icons are 6 options `globe` (PayNow), `church` (Weekend Collection), `book` (Cheque to Church of Our Lady of Lourdes), `heart` (Cash), `flame` (Mass Offerings), `sprout` (St Vincent de Paul) — cheque payee is OLOL, no UEN.
- `serveRoles` shape is `{ title, summary }` (`summary` not `description`); `devotions` shape is `{ title, when, where }` (6: Holy Rosary Mon/Wed/Thu/Fri 11:35 / Divine Mercy Tue 11:35 / Saturday Rosary 16:15 / Reconciliation 15 min before Mass / Parish Feast 11 Feb / Grotto Prayer daily) + `visitorGuidelines` { `dress[5]` / `other[6]` }.
- For future CMS integration (e.g., Sanity), isolate fetch + Portable Text rendering behind a `lib/cms` boundary and keep `content.ts` as the local fallback.

### Environment Variables

| Variable | Purpose | Example | Status |
|----------|---------|---------|--------|
| `VITE_*` | Client-exposed Vite vars (prefix required for `import.meta.env` exposure) | `VITE_MAPS_KEY=...` | None required yet — no `.env` contract; `site.ts` hard-codes `mapsUrl`/`mapsEmbedSrc` with `https://www.google.com/maps?q=50+Ophir+Road,+Singapore+188690&output=embed` |
| _none_ | _No backend, no DB, no SSR_ | — | — |

When adding vars, document them here and in `.env.example`, and guard with `import.meta.env` typing in `src/env.d.ts`. `VITE_*` is the only prefix Vite exposes to the client. Never duplicate `site.ts` address/hours/mass across pages when a var is added — keep `site.ts` canonical.

### Accessibility & SEO

- `index.html` ships `lang="en"`, `viewport`, CSP meta tag, Referrer-Policy meta, `description` ("Church of Our Lady of Lourdes, Singapore — the first Tamil Catholic church, a national monument at 50 Ophir Road since 1888. Mass in English and Tamil. A grotto in the city."), preconnected Google Fonts (Fraunces + Source Sans 3), and Open Graph (`og:title`/`og:description` = Church of Our Lady of Lourdes · Singapore + ourladyoflourdes.sg). CSP allowlist: `default-src 'self'`, `script-src 'self' 'unsafe-inline'` source → `sha256-…` after `scripts/inject-csp-hashes.mjs`, `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`, `font-src https://fonts.gstatic.com data:`, `img-src 'self' data: blob:` (all `images.*` local — no wikimedia/pexels), `frame-src https://www.google.com` (maps embed), `connect-src 'self'`, `object-src 'none'`, `base-uri 'self'`. `<meta name="referrer" content="strict-origin-when-cross-origin">`. `theme-color` `#0a1122`, `canonical` `https://ourladyoflourdes.sg/`.
- CSP maps embed: `frame-src https://www.google.com` for `site.mapsEmbedSrc` (`https://www.google.com/maps?q=50+Ophir+Road,+Singapore+188690&output=embed`); host-level headers that a meta tag cannot express (HSTS, `X-Content-Type-Options`, `X-Frame-Options`) ship via `public/_headers` (host security headers; historical `src/security-headers.test.ts` guarded the directives).
- Header mobile toggle uses `aria-label` + `aria-expanded`; dropdowns expose `aria-expanded` + `description` on children via `primaryNav`. Mobile drawer is a **modal dialog**: `role="dialog"` + `aria-modal="true"`, initial focus on the panel, `Tab`/`Shift+Tab` focus trap, focus restored to the hamburger on close, outside `pointerdown` closes; body scroll locked via `document.body.style.overflow` + `Escape` handler. Hamburger `h-11 w-11` (44px). `aria-current` contract: Header plain links `aria-current="page"` when `pathname === to`; dropdown parent buttons `aria-current="true"` when any child route matches; dropdown children `aria-current="page"` on exact `pathname+hash`; Ministries pills `aria-current="true"` on scrollspy active; mobile drawer parents `aria-current="page"` when child active.
- Images: `alt` for content (`chapel→grotto`, `sanctuary`, `garden`, etc. all have `imageAlt`; `grounds`/`ministries` cards preserve `imageAlt`), `alt=""` for decorative hero overlays where `PageHero` does. All `images.*` now local but still carry `imageAlt`.
- Skip link: `SkipLink.tsx` `preventDefault`s and focuses `#main-content` with `tabindex="-1"` + `scrollIntoView` — it never rewrites the hash (route loss under `HashRouter`).
- `Accordion` provides `aria-expanded`/`aria-controls`/`role="region"` + keyboard `ArrowDown`/`ArrowUp`/`Home`/`End` navigation + `aria-hidden`/`inert` toggling (closed `aria-hidden="true"` + `inert`, open `aria-hidden` undefined).
- Keep color contrast ≥ 4.5:1 for body text (`bsc-ink` on `bsc-cream` meets it; verify new pairings — `bsc-cream/75` on `sapphire-950` and `bsc-charcoal/80` on `cream` are the critical checks).
- `prefers-reduced-motion: reduce` disables `reveal`, `hero-ken-burns`, `rise-in`, `menu-in`, `drawer-in`, `page-in`, `dot-pulse` + smooth scroll via `@layer base`/`@layer utilities` overrides.
- SEO: `index.html` OG `og:url` = `https://ourladyoflourdes.sg/` + Church JSON-LD `name` "Church of Our Lady of Lourdes" / `alternateName` [Our Lady of Lourdes Singapore, OLOL, தூய லூர்து அன்னை ஆலயம்] / `address` 50 Ophir Road 188690 / `telephone` +65 6294 0624 / `email` colol.secretariat@catholic.org.sg / `sameAs` facebook — `site.ogImage`/`site.url` is `ourladyoflourdes.sg`.

## Anti-Patterns to Avoid

- **Copy-paste from templates as truth** — verify every command in `package.json` before documenting it.
- **Extending `@theme` with one-off hex values** — add a named `bsc-*` token or reuse an existing one. Tokens 33+2 shadows are the budget.
- **Prop-drilling nav arrays** — consume `primaryNav` / `footerNav` directly from `data/nav.ts`; Header/Footer already do.
- **Converting `HashRouter` to `BrowserRouter` without a static-host fallback** — breaks deep-links on GitHub Pages/S3 unless you add a `404.html` redirect (e.g., `https://github.com/rafgraph/spa-github-pages`). Hash links must stay `/#/worship`, `/#/ministries#liturgical`.
- **Breaking alias routes** — external parish/school/programme links + printed bulletins depend on legacy paths (`/mass-times`, `/hours-location`, `/visit` → `/worship`; `/ministry` → `/ministries`; `/news-and-events` → `/news-events`; `/volunteer` → `/serve`; `/donate` → `/give`); keep aliases or add explicit redirects. The 7 aliases exist for this reason.
- **Alias desync** — changing `App.tsx` routes without updating `src/data/nav.ts` nav children/dropdown `Link to=` targets, or vice versa. Keep `to: "/worship#mass"` etc. in sync with `Worship` section `id`s and `Ministries` `id`s.
- **Using `<a href="#id">` instead of `<Link to="/path#id">`** — plain `#id` replaces the hash and routes to `NotFound` under `HashRouter`; `Ministries` jump nav and `Header` dropdowns must preserve the route.
- **Importing Google Fonts imperatively in components** — fonts belong in `index.html` + `@theme`; do not add runtime font loaders. CSP already whitelists `fonts.googleapis.com`/`fonts.gstatic.com`.
- **Bypassing `cn()` for conditional classes** — always merge via `cn()` so `tailwind-merge` deduplicates correctly (e.g., `variantClasses` in `Button`).
- **Adding a UI library without adopting its primitives** — if `shadcn/ui` (Radix) is introduced, use its primitives; do not rebuild Dialog/Dropdown from scratch.
- **Over-hydrating or adding SSR** — this is a static SPA; do not introduce server rendering or API routes without a deliberate architecture decision (`CLAUDE.md` isolates future CMS behind `lib/cms`).
- **Reintroducing Blessed Sacrament / Queenstown or Risen Christ / Toa Payoh-era content or reassigning `site.ts` facts** — hours (church gates 17:00 holidays / office Mon–Fri 9–17 / reception Mon–Fri 9–17 / adoration Before Mass 11:35), mass (weekdayNoon 12:30 / weekdayEvening 19:00 Tamil / saturday 17:00+18:15+19:30 / sunday[5] 08:00/09:30 Tamil/11:00/12:30/18:30 Tamil / publicHoliday 09:00+10:00), address 50 Ophir Road 188690, transport Bugis/Rochor/Jalan Besar, feast 11 February, and `images` are the single source — don't duplicate them across pages or swap in 1 Commonwealth Drive / Tent of Meeting / SS.CC / Damien Hall / Corpus Christi / Queenstown or 91 Toa Payoh Central / Ho Ping Centre / first air-con / $450k / Toa Payoh NS19 / UEN T08CC4042G or St Mary Bukit Batok 5 East Ave 2 / Portiuncula / OFM / WOHA imagery. `site.ts` is canonical; pages render from it. OLOL has **no UEN** (`uen ""`); chequePayee is *Church of Our Lady of Lourdes*; priests are Alphonsus Dominic / Leo Justin HGN / Meneuvrier MEP.
- **Bare `<img>` for CDN sources** — any future external CDN image must go through `SafeImage` with `fallback` to `/images/hero-church.jpg`; don't use bare `<img>` for CDN sources even though current images are local.
- **Ignoring `noUnusedLocals`/`noUnusedParameters`** — `tsc --noEmit` will fail on dead code; clean before commit.
- **Forgetting `ScrollProgress` is decoupled** — it lives in `Layout` at `z-[60]` (not inside `Header`). Don't re-nest it.
- **Reintroducing St Mary / Bukit Batok-era content** — same rule: 5 Bukit Batok East Ave 2 / Portiuncula / OFM / WOHA / Garden of Peace / 天神之后圣母堂 are not OLOL facts.

## Success Metrics

You are done when:

- Gates are green: `pnpm lint` (0) + `pnpm typecheck` (0) + `pnpm build` (387.60kB); `pnpm test` reports `No test files found` (scaffolding snapshot — add harness before claiming green), `pnpm test:e2e` specs present (10 + helpers) once OLOL-retargeted. Sixth check `pnpm test:e2e:built` serves built artifact.
- All 10 pages + 7 alias paths in 5 groups (`/worship`↔`/mass-times`↔`/hours-location`↔`/visit`; `/ministries`↔`/ministry`; `/news-events`↔`/news-and-events`; `/serve`↔`/volunteer`; `/give`↔`/donate`) + 9 hash anchors (`#mass`/`#confession`/`#visit` on `/worship` + `#liturgical`/`#faith-formation`/`#pastoral-care`/`#family-life`/`#youth`/`#community` on `/ministries`; plus `/serve` has no anchors) navigate correctly, including direct hash URLs on static hosts (HashRouter, no 404.html needed, `Layout`'s double-hash `resolveAnchor` survives `/#/ministries#liturgical`).
- Header is fixed, `useScrolled(16)` translucency works (transparent at top of Home → `sapphire-950/92` blur on scroll; `solid = scrolled||!isHome||mobileOpen`), top bar (`lg`) shows `50 Ophir Road · Our Lady of Lourdes 11 February` + `Give →/give`; the mobile drawer renders **outside** `<header>` (containing-block guard), opens as a modal dialog with trapped focus (dialog/aria-modal/initial-focus/focus-restore/outside-tap ignoring the hamburger toggle), closes only on in-drawer **link** taps via `onClickCapture` (+ `Escape`), carries the Give CTA, desktop Worship/Ministries dropdowns show children + `aria-current` parent/child states, hamburger `h-11 w-11` (44px), and keyboard + `SkipLink` (`#main-content`, hash-preserving, `tabindex="-1"`) covers all nav items. `ScrollProgress` decoupled rail at `z-[60]` tracks `useScrollProgress`.
- Content renders from `src/data/*` without inline duplication: `content.ts` 8 interfaces (1884–2005 timeline 7, `grounds` 3 Main Church/Grotto/Parish Grounds, `ministries` 6, `faqs` 7, `upcomingEvents` 6 Parish/Devotion/Formation/Archdiocese with 1 href, `givingOptions` 6, `priests` 3 email-only, `ppcMembers` 6, `serveRoles` 4 `summary`, `devotions` 6 with `visitorGuidelines`, `images` 7 all local) + `site.ts` hours 6 keys + mass (weekdayNoon/weekdayEvening/saturday/sunday[5]/publicHoliday/confession/adoration/note) + address 50 Ophir Road / phones 6294 0624 / transport Bugis/Rochor/Jalan Besar + buses Ophir list / feast 11 February / no UEN / chequePayee (no `whatsapp`/`sacredHearts` keys) + nav `primaryNav` 6 / `footerNav` 10; new tokens live in `src/index.css` `@theme` (33 colors + 2 shadows).
- `SafeImage` fallback verified (guard via `dataset.fallback` to `/images/hero-church.jpg`), no `any`, no unused locals/params, no missing `imageAlt`/`alt` on content images, every `PageHero` supplies `image`+`fallback`, `NotFound` reads "This path does not lead to the church" + offers `Return home` → `/` and `Mass times` → `/worship`, CI artifacts green. `BackToTop` threshold 480 + SVG ring `data-progress` + `ScrollProgress` rail both track `useScrollProgress`.

## System Integration

### Available Tools (in this workspace)

- `read` / `write` / `edit` / `bash` / `fd` / `rg` / `agent_browser` (prefer native `agent_browser` tool — do not run direct `agent-browser` bash unless debugging) / `subagent_spawn` / `workflow` — standard Pi harness.
- `skills` is vendored, git-tracked reference content (catalog at `skills/skills-catalog.md`); `src.orig/` does not exist in this worktree (scaffolding snapshot). Do not import from either.

### Related Skills

- `framework-templates` — companion to `claude-md` for framework sections (Vite+React used here).
- `avant-garde-design-v4` / `super-frontend-design` / `claude-design` — when refining parish aesthetics (warm editorial, Neo-Gothic grotto, 1888, stained glass — not Queenstown Tent / first air-con).
- `webapp-testing-journey` / `agent-browser` / `playwright-cli` — when exercising journeys or visual QA (use `agent_browser` native tool for `HashRouter` hash-aware navigation).
- `verification-and-review-protocol` — before claiming work done.
- `lint-and-validate` / `clean-code` / `testing-patterns` / `tdd-workflow` — quality gates (Red→Green→Refactor).

## Continuous Improvement

- When a command is added to `package.json` scripts, update the Build Commands table and note if it is hollow/stale.
- When a token or utility is added to `src/index.css`, document its intent in this file and in a code comment (`@theme` or `@layer`). Current utilities count is 31 + 10 keyframes + themed scrollbar.
- When a route alias or hash anchor is added or removed, update `App.tsx`, `src/data/nav.ts` nav children, the Routing Contract table, and the Architecture hash-anchor rows together.
- When a new `GivingOption` icon or `EventItem` category is added, update the `GivingOption.icon` / `EventItem.category` union and this file's Data section.
- Re-audit this file after any framework bump (React 19, Vite 7, Tailwind 4) or after restoring tests/lint/CMS — verify counts via `fd` and grep `src/App.tsx` for `Route` entries.
- When a validation report is added (`docs/validation-*.md`), link it from `README.md` File Hierarchy + `AGENTS.md` Where to look next + this checklist, and bump `Current audits` in `README.md`.
- Keep `README.md` + `AGENTS.md` + this file in sync on version, routing, and data shape after every port/validation change. OLOL package is `our-lady-of-lourdes-church` 1.6.0; do not carry BSC package name forward. `blessed-sacrament-queenstown_SKILL.md` is historical lineage (BSC hop) — not current canonical.

---

### Validation Checklist (for maintainers)

| # | Section | Required | Present |
|---|---------|----------|---------|
| 1 | Core Identity & Purpose (OLOL, 50 Ophir Road 188690, 13 May 1888 Meneuvrier MEP, Neo-Gothic grotto, National Monument 52, 11 February) | Yes | ✅ |
| 2 | Foundational Principles (Six-Phase) | Yes | ✅ |
| 3 | Implementation Standards (General + TS Strict + Vite 7 + React 19 + Tailwind v4 CSS-first + Components incl. ScrollProgress decoupled + BackToTop ring + Accordion inert + Timeline rail draw + SocialIcons + categoryTone util + massDay/monogram/deepLinks) | Yes | ✅ |
| 4 | Development Workflow (Env Setup + Build Commands — lint/typecheck/build green, test 0 scaffolding, re-verified 2026-09-06) | Yes | ✅ |
| 5 | Testing Strategy (scaffolding snapshot — 0 tests, harness absent; historical BSC 29/181 + 67 E2E for lineage; OLOL porting checklist for re-adding) | Yes | ✅ |
| 6 | Code Quality Standards (Lint + Type Safety — Priest email only no phone + Styling) | Yes | ✅ |
| 7 | Git & Version Control (branching + Conventional Commits + CI Node 24/pnpm 11 + HashRouter deploy + src.orig absent + skills vendored/tracked) | Yes | ✅ |
| 8 | Error Handling & Debugging (SafeImage fallback default / NotFound "does not lead to the church" / Layout ScrollProgress+keyed page-in) | Yes | ✅ |
| 9 | Communication & Documentation (parish-specific why — Meneuvrier/Rochor/cornerstone/Neo-Gothic/War 1942/territorial 1974/Monument 2005/11 Feb/grotto, lineage Rother→St Joseph BT→St Mary→Risen Christ→BSC→OLOL) | Yes | ✅ |
| 10 | Project-Specific Standards (Architecture 41 source tree — no tests + Data ownership 8 interfaces/7 images all local + Routing 17/7/9 + File Org + Design System 33+2) | Yes | ✅ |
| 11 | Success Metrics (10 pages + 7 aliases + 9 anchors + OLOL content from data/* + tokens 33+2 + Header solid logic + no UEN, facebook only) | — | ✅ |
| 12 | System Integration (tools + skills vendored/tracked note) | — | ✅ |
| 13 | Anti-Patterns to Avoid (13 incl. ScrollProgress decoupled + no UEN + no BSC/Risen/St Mary reintroduction) | — | ✅ |
| 14 | Continuous Improvement (re-audit after bumps/tests/CMS, 31 utilities + 10 keyframes) | — | ✅ |
| 15 | Validation Report `docs/validation-src-vs-src.orig-2026-08-30.md` (historical — St Mary 10/10 contracts adopted) | — | ✅ (historical) |
| 16 | Round-3 audit + remediation `docs/code-review-audit-round3-2026-08-30.md` + `docs/remediation-plan-round3-2026-08-30.md` (historical — St Mary) | — | ✅ (historical) |
| 17 | Round-4 remediation `docs/remediation-round4-2026-08-30.md` (historical — drawer modal, still applies) | — | ✅ |
| 18 | Round-5 design enhancement `docs/design-enhancement-round5-2026-08-30.md` (historical — St Mary "Light of the Portiuncula"; motion system retained) | — | ✅ |
| 19 | Risen Christ snapshot `src.orig/` (historical — 35/202 + 51 as of 2026-08-31; not present in this worktree) | — | ✅ (historical) |
