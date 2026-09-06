# Remediation Plan — Round 19 "The Merge" (2026-09-02)

> Source findings: two external audit reports, validated per-finding in
> `docs/external-audit-validation-round19-2026-09-02.md` (evidence: live head
> fetch, live browser session, source grep). Baseline: `main` @ `705c593`
> (package 1.5.1, 26 files / 149 unit tests, 59/59 e2e ×2 passes, ~468 kB).
> Round theme: apply the audited queenstown×church **merge** to this repo —
> SEO/social metadata, CSP hardening, favicon identity, global focus ring,
> editorial voice & typography, sharper corner vocabulary, richer motion.

## Constraints & skills applied

- Skills consulted (`skills/skills-catalog.md`): `static-spa-parish-site`
  (§0 volatile-facts register, §9–11 ship gates), `test-driven-development`
  (RED→GREEN, no production change without a failing test first),
  `plan-writing` (this plan), `verification-and-review-protocol`
  (evidence-or-it-didn't-happen), `ui-ux-pro-max` (design-system token work),
  `how-to-git-push-using-ssh-wrapper` (final push), `agent-browser` (live
  verification).
- No new git branch; all commits to `main`.
- Token budget rule (SKILL §4.4): palette stays **33 colors + 2 shadows**;
  this round adds **5 radius overrides + 1 keyframe + 1 utility**, each pinned
  by tests and re-pinned in docs.
- Iron Law: every task below lands as RED test(s) first, then the change, then
  GREEN, then the five-gate pre-push run.

## ToDo list

### T1 — SEO / social metadata completeness (audit R2-F2) — `index.html`
- [ ] T1.1 RED: new `src/head-metadata-contract.test.ts` fails on: `og:image`,
      `og:image:alt`, `twitter:card` = `summary_large_image`, `twitter:title`,
      `twitter:description`, `<link rel="canonical">`,
      `<meta name="theme-color" content="#0a1122">`, `og:site_name`, `og:locale`.
- [ ] T1.2 Add the tags to `index.html` (mirror queenstown's set; image =
      `https://bsc.org.sg/images/hero-church.jpg`, alt names the tent roof;
      canonical/og:url = `https://bsc.org.sg/`, consistent with JSON-LD).
- [ ] T1.3 GREEN + update `README.md` index.html description line.

### T2 — CSP `connect-src` dead entry (R2-F6) — `index.html` + `public-contract.test.ts`
- [ ] T2.1 RED→update: `public-contract` "allowlists Cloudflare Insights connect
      endpoints" must require `https://static.cloudflareinsights.com` in
      `connect-src` and must REJECT the bare `https://cloudflareinsights.com`.
- [ ] T2.2 Fix `index.html` CSP `connect-src` accordingly.

### T3 — Purpose-drawn SVG favicon (R2-F7, R1-F7) — `public/favicon.svg`
- [ ] T3.1 RED: `public-contract` asserts `public/favicon.svg` exists, ships to
      `dist/`, contains sapphire `#0a1122`/`#0f1a33` + gold `#d4ad42`, and that
      `index.html` references `/favicon.svg` with **no** `⛪` emoji data-URI.
- [ ] T3.2 Draw the mark: sapphire rounded field, gold folded-tent-roof chevron
      (three-plane fold motif referencing the Dowsett roof), 100×100 viewBox.
- [ ] T3.3 Replace the `<link rel="icon">` in `index.html`.

### T4 — Global `:focus-visible` ring (R1 merge-03) — `src/index.css`
- [ ] T4.1 RED: css contract asserts `@layer base` declares `:focus-visible`
      with `outline: 2px solid` + `var(--color-bsc-gold-400)` + 3px offset.
- [ ] T4.2 Add the rule under the existing `::selection` block.

### T5 — Hero voice: "A tent of meeting." (R1 merge-02, voice 7.6→) — `Home.tsx` + `site.ts`
- [ ] T5.1 RED: home-hero contract asserts the hero renders an eyebrow line
      carrying `site.name` ("Church of the Blessed Sacrament · since 1958")
      and an `h1` whose display text is "A tent of meeting."
- [ ] T5.2 Implement: eyebrow `p` = `Church of the Blessed Sacrament — since 1958`
      (gold-300, 0.3em tracking); `h1` = `A tent of meeting.` (site name stays
      in `<title>`, header brand, JSON-LD — SEO preserved). Feast eyebrow moves
      into the existing meta strip (it already lives in the page banner).
- [ ] T5.3 Keep `site.feast` consumed somewhere visible (worship page already
      shows it; hero meta strip gains the feast chip only if copy-safe).

### T6 — Welcome overlapping quote card (R1 merge-02) — `Home.tsx` + `index.css`
- [ ] T6.1 RED: home contract asserts a `.welcome-quote` block exists in the
      Welcome section carrying "You are not a visitor here. You are expected."
- [ ] T6.2 Implement: parchment card (`bsc-parchment` fill, `bsc-stone` border,
      gold-rule accent), pulled up over the hero boundary on `lg`
      (`-mt-*` overlap), sapphire-ink Fraunces quote + attribution line
      "The parish of the Sacred Hearts — Queenstown". Centre column relaxed to
      left-rail editorial alignment per report 1 ("centred brochure" critique).

### T7 — Editorial corner vocabulary (R1 merge-04) — `src/index.css` `@theme`
- [ ] T7.1 RED: css contract asserts radius overrides exist and resolve to the
      editorial scale: `--radius-xs/--radius-sm` 0.125rem, `--radius-md`
      0.1875rem, `--radius-lg/--radius-xl` 0.25rem, `--radius-2xl` 0.375rem.
- [ ] T7.2 Add the five `--radius-*` overrides inside `@theme` (Tailwind v4
      CSS-first; utilities recompile automatically; `rounded-full` untouched).
- [ ] T7.3 Visual sanity in the built-artifact re-audit (cards ≤6px, buttons 4px).

### T8 — Typographic inheritance (R1-03) — `src/index.css` + eyebrows
- [ ] T8.1 RED: css contract asserts body `font-feature-settings: "kern" 1, "liga" 1`.
- [ ] T8.2 Add to `body` in `@layer base`.
- [ ] T8.3 RED+GREEN: hero eyebrow tracking `0.2em → 0.3em`;
      `SectionHeading` eyebrow `0.15em → 0.25em`; Welcome eyebrow → `0.25em`.

### T9 — Motion: bloom-drift, centre-drawn hairline, liturgical ease (R1-05) — `src/index.css` + `Home.tsx`
- [ ] T9.1 RED: css contract asserts `@keyframes bloom-drift` (translate3d +
      scale, alternate) and a `.bloom-drift` utility (14s ease-in-out infinite
      alternate, `will-change: transform`).
- [ ] T9.2 Apply `.bloom-drift` to the CTA band's `bg-gold-bloom` layer in
      `Home.tsx`.
- [ ] T9.3 RED: css contract asserts `.gold-rule` is the centre-drawn 1px
      hairline (transparent→gold→transparent gradient, height 1px) and
      `.rule-draw.gold-rule::after` animates from `scaleX(0)`; left variant
      keeps a fade-out edge.
- [ ] T9.4 Rebuild `gold-rule` / `gold-rule-left` accordingly (keep 64px→full
      measure: `width: 96px` center / `width: 64px` left, or full-heading
      hairline — match queenstown: full-width 1px, centre origin).
- [ ] T9.5 RED: css contract asserts `.rise-in` uses
      `cubic-bezier(0.22, 1, 0.36, 1)` and `halo-pulse` runs 2.6s.
- [ ] T9.6 Implement both; extend the `prefers-reduced-motion` flatten list
      with `.bloom-drift`.
- [ ] T9.7 Update pins: `motion-contract` keyframes 9 → **10**
      (`bloom-drift` added); `docs-contract` unchanged unless it pins counts.

### T10 — Hash-based `script-src` CSP at build time (R2-F1) — `scripts/inject-csp-hashes.mjs`
- [ ] T10.1 RED: unit test for the pure helpers in
      `scripts/inject-csp-hashes.mjs` (exported `extractInlineScripts`,
      `sha256Hash`, `rewriteScriptSrc`): fixture HTML with two inline scripts
      (module + JSON-LD) → script-src becomes
      `'sha256-<a>' 'sha256-<b>'` with `'unsafe-inline'` removed; external
      `https://static.cloudflareinsights.com` kept; style-src untouched.
- [ ] T10.2 Implement the script: read `dist/index.html`, hash every inline
      `<script>` body (sha256, base64), rewrite the meta CSP `script-src`,
      write back, **fail non-zero** if any inline script remains unhashed.
- [ ] T10.3 Wire into `package.json`: `"build": "vite build && node scripts/inject-csp-hashes.mjs"`.
- [ ] T10.4 RED: contract test asserts `package.json` build wiring exists and
      the source `index.html` keeps `'unsafe-inline'` in `script-src`
      (dev-mode contract: Vite's react-refresh preamble is inline; the hash
      rewrite is a build artifact concern only) and keeps `'unsafe-inline'` in
      `style-src` (documented rationale: React style attributes —
      ScrollProgress/Reveal/drawer stagger — cannot be hash-pinned).
- [ ] T10.5 Proof: `pnpm build` then grep `dist/index.html` — `script-src`
      contains `sha256-` entries and no `'unsafe-inline`; `test:e2e:built`
      boots the app under the hashed CSP (self-verifying gate).

### T11 — Bundle size (R2-F4): documented rationale, no code change
- [ ] T11.1 README perf note: singlefile contract (host serves one HTML),
      route-splitting counterproductive under `vite-plugin-singlefile`
      (chunks re-inline), image lazy-loading + `fetchPriority=high` already in,
      size re-measured each round (~468 kB @ 1.5.1).

### T12 — Secret-scan guard (R2-F5) — `src/repo-hygiene.test.ts`
- [ ] T12.1 RED: new test scans all tracked files for private-key material
      (`-----BEGIN .*PRIVATE KEY-----`) and fails on any hit.
- [ ] T12.2 Implement scan (git ls-files + read, skip binary); README security
      note: rotation of the historically leaked keys remains an owner-side
      action (audit F5), scanner now guards regressions.

### T13 — Docs alignment + release (all files)
- [ ] T13.1 Version 1.5.1 → **1.6.0** in `package.json` (minor: new visual
      vocabulary + security posture) and `docs-contract` pin.
- [ ] T13.2 Re-pin `README.md` / `AGENTS.md` / `CLAUDE.md` /
      `blessed-sacrament-queenstown_SKILL.md` §0: utilities 30 → **31**
      (+`.bloom-drift`), keyframes 9 → **10**, radius overrides **+5**,
      index.html meta set, CSP contract text, favicon, test counts, round-19
      narrative with doc links.
- [ ] T13.3 `docs/remediation-round19-2026-09-02.md` execution report
      (evidence: RED→GREEN transcript, gate outputs, built-artifact browser
      audit, live deployment status).
- [ ] T13.4 Worklog + final commit(s) to `main` + push via
      `skills/how-to-git-push-using-ssh-wrapper/scripts/ssh_git_wrapper_v3.py`.

## Plan validation (pre-execution alignment check)

Validated against the codebase before execution (2026-09-02):

1. **Files exist & are where the plan says**: `index.html` (CSP line 9, favicon
   line 5, fonts line 16); `src/index.css` (`@theme` 3–44, base 46–76,
   utilities 78–344 incl. `gold-rule` 118, `rise-in` 153, `halo-pulse` 196–210,
   reduced-motion 311–337); `src/pages/Home.tsx` (hero 18–66, welcome 68–91,
   CTA band 170–195); `src/components/ui/SectionHeading.tsx` (eyebrow tracking
   line 20); `src/data/site.ts` (`ogImage` present); `public/_headers` (no CSP
   header — meta CSP is the shipped policy).
2. **Test-pin inventory verified** so RED is real and GREEN is reachable:
   `public-contract.test.ts` pins the *dead* connect-src entry (T2 flips it);
   `motion-contract.test.ts` pins 9 keyframes (T9 flips to 10);
   `docs-contract.test.ts` pins version 1.5.1 (T13 flips to 1.6.0);
   `home-hero.test.tsx` pins `opacity-55`/`hero-ken-burns`/`scrim-hero`
   (unchanged by T5/T6 — additive only).
3. **No conflicts with round-16/17/18 contracts**: drawer contracts
   (`mobile-navigation.spec.ts`, 8) untouched; scrim/token budgets unchanged
   (33+2 holds; radius overrides are a new, separate axis).
4. **Risk register**:
   - Hash-CSP on the live host (T10): the host injects the *external*
     Cloudflare beacon (`static.cloudflareinsights.com`, origin-allowed); worst
     case a host-injected *inline* script would be blocked — page/app still
     boots (app script is hashed); revert path = restore `'unsafe-inline'` in
     the build script constant. Built-artifact e2e proves artifact integrity.
   - Radius shift (T7) is deliberately opinionated (audited merge-04); visually
     re-audited on the built artifact before push; single-point token revert.
   - Hero H1 change (T5): `<title>`, header brand, JSON-LD, og:title all keep
     "Church of the Blessed Sacrament" — SEO/name authority preserved.
5. **Sequencing**: T1→T3 (head) → T4 (css base) → T5/T6 (hero/welcome copy) →
   T7/T8/T9 (css vocabulary) → T10 (build) → T11 (docs note) → T12 (guard) →
   gates → browser re-audit → T13 (docs/release). Each task RED before code.
