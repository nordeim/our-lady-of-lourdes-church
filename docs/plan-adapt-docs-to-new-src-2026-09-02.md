# Plan: Adapt `src/` + Documentation to BSC Port (Sapphire Blue Rewrite)

> **Status:** ✅ COMPLETE (2026-09-02)
>
> **Trigger:** The original `src/` was moved to `src.orig/` and `src/` was rewritten for a fresh port of `https://www.bsc.org.sg/` to a new sapphire-blue design system. Two tasks:
> 1. **Port behavioral contracts** from `src.orig/` into the new `src/` (keeping sapphire visuals) ✅
> 2. **Adapt all 4 docs** (`AGENTS.md`, `CLAUDE.md`, `README.md`, `blessed-sacrament-queenstown_SKILL.md`) to the new reality ✅
>
> **Results:**
> - 11 behavioral contracts ported (useScrollSpy, test harness, 17 test files, Header onBlurCapture+Escape, Accordion inert+role+useId, Reveal reduced-motion, Timeline rail draw, deepLinks trailing-slash, monogram honorifics, Layout multi-hash)
> - 4 docs fully adapted (shrine-* → bsc-*, data counts, site facts, component descriptions)
> - 98/99 tests pass (1 pre-existing repo-hygiene failure unrelated to changes)
> - Build: 384.23 kB (was 381.90 kB before test files added)
> - Typecheck: clean, Lint: clean

---

## Part A — Behavioral Contract Porting (src.orig → src)

### A.1 Port Summary Table

| # | Contract | Verdict | Effort |
|---|----------|---------|--------|
| 1 | `useScrollSpy` hook | PORT WITH ADAPTATION | Medium |
| 2 | Test harness `src/test/setup.ts` | PORT AS-IS | Trivial |
| 3 | 17 test files | PORT WITH ADAPTATION | Large |
| 4 | Header desktop submenu `onBlurCapture` | PORT AS-IS (small) | Small |
| 5 | Header `Escape` closes desktop menu too | PORT AS-IS (small) | Small |
| 6 | Accordion `inert` on closed panels | PORT AS-IS | Small |
| 7 | Accordion `role="region"` + `aria-labelledby` | PORT AS-IS | Small |
| 8 | Accordion `useId()` for unique IDs | PORT AS-IS | Small |
| 9 | Accordion `className` prop | PORT AS-IS | Small |
| 10 | `Reveal` `prefers-reduced-motion` check | PORT AS-IS | Small |
| 11 | Timeline rail draw animation (IO-triggered scale-y) | PORT WITH ADAPTATION | Medium |
| 12 | Timeline `origin-top` + `prefers-reduced-motion` | PORT WITH ADAPTATION | Small |
| 13 | `deepLinks.resolveHashRedirect` trailing-slash normalization | PORT AS-IS | Small |
| 14 | `monogram` expanded honorific set | PORT WITH ADAPTATION | Small |
| 15 | `Layout.resolveAnchor` multi-hash parsing | PORT WITH ADAPTATION | Medium |

### A.2 Detailed Porting Steps

#### 2.1 `useScrollSpy` Hook — PORT WITH ADAPTATION

**File to create:** `src/hooks/useScrollSpy.ts`

**Action:** Copy `src.orig/hooks/useScrollSpy.ts` verbatim — it's parish-fact-agnostic pure viewport geometry.

**Then update:** `src/pages/Ministries.tsx` to consume it:
- Import `useScrollSpy` from `@/hooks/useScrollSpy`
- Call `const activeId = useScrollSpy(ministries.map(m => m.id))`
- Replace `hash === \`#${m.id}\`` with `activeId === m.id` for pill highlighting

**Why:** The new code only highlights pills on click (hash comparison). The old code gives real-time reading-position feedback via IntersectionObserver.

#### 2.2 Test Harness — PORT AS-IS

**File to create:** `src/test/setup.ts`

**Action:** Copy `src.orig/test/setup.ts` verbatim. It contains only mock infrastructure (IntersectionObserver, scrollTo, matchMedia) — no parish facts.

#### 2.3 Test Files — PORT WITH ADAPTATION

**Strategy:** Port all 17 files. Pure-logic tests port as-is. Parish-fact-specific tests need retargeting.

| # | File | Action | Notes |
|---|------|--------|-------|
| 1 | `test/setup.ts` | Copy verbatim | Done in A.2 |
| 2 | `hooks/useScrollSpy.test.tsx` | Copy verbatim | Pure hook contract |
| 3 | `hooks/useScrollProgress.test.ts` | Copy verbatim | Pure hook contract |
| 4 | `components/Layout.test.tsx` | Copy verbatim | Tests page-in wrapper, no parish facts |
| 5 | `components/SafeImage.test.tsx` | Port + adapt | New SafeImage has different interface (no onError propagation, adds fetchPriority). Adapt assertions. |
| 6 | `components/ScrollProgress.test.tsx` | Copy verbatim | Pure presentational |
| 7 | `components/ui/Accordion.test.tsx` | Port after Accordion fix | Tests `inert` — will pass once Accordion is patched (step 2.6) |
| 8 | `components/ui/Button.test.tsx` | Port + adapt | Retarget token assertions (shrine→bsc), test press feedback |
| 9 | `data/content.test.ts` | Port + adapt | Update all counts: priests 5→3, timeline 8→7, ministries 6 (mandarin→community), givingOptions 8→6, images 11→7 |
| 10 | `data/nav.test.ts` | Port + adapt | Update descriptions, footerNav contents |
| 11 | `data/site.test.ts` | Port + adapt | Update all site facts (name, tagline, hours, mass, transport, uen, etc.) |
| 12 | `utils/cn.test.ts` | Copy verbatim | Pure dedup logic |
| 13 | `utils/deepLinks.test.ts` | Port + adapt | New resolveHashRedirect has different edge-case behavior |
| 14 | `utils/massDay.test.ts` | Copy verbatim | Identical logic |
| 15 | `utils/monogram.test.ts` | Port + adapt | New monogram has simpler regex — verify edge cases pass |
| 16 | `ci-workflow.test.ts` | Copy verbatim | CI file is shared |
| 17 | `repo-hygiene.test.ts` | Copy verbatim | Repo-level guards |
| 18 | `docs-contract.test.ts` | Port + adapt | Update ALL counts: 40→34 source files, 17→0 test files, 3→2 hooks, 26→27 colors, 9→9 keyframes, 18→18 Route elements, etc. |

#### 2.4 Header Desktop Submenu `onBlurCapture` — PORT AS-IS

**File to edit:** `src/components/Header.tsx`

**Action:** Add `onBlurCapture` handler to desktop submenu `<div>`:
```tsx
onBlurCapture={(event) => {
  if (!item.children) return;
  const next = event.relatedTarget as HTMLElement | null;
  if (next && event.currentTarget.contains(next)) return;
  setDesktopOpen(null);
}}
```

**Why:** Keyboard users who Tab out of the submenu currently don't get it auto-closed. The old code checks `relatedTarget` and only closes if focus is leaving the container.

#### 2.5 Header `Escape` Closes Desktop Menu — PORT AS-IS

**File to edit:** `src/components/Header.tsx`

**Action:** In the `handleKeyDown` effect, add `setOpenDesktopMenu(null)` alongside `setMobileOpen(false)` when `Escape` is pressed.

**Why:** Currently `Escape` only closes the mobile drawer, not desktop dropdowns.

#### 2.6 Accordion `inert` + `role="region"` + `aria-labelledby` + `useId()` + `className` — PORT AS-IS

**File to edit:** `src/components/ui/Accordion.tsx`

**Actions:**
1. Import `useId` from `react`
2. Add `const baseId = useId()`
3. Change `id={`panel-${item.id}`}` to `id={`${baseId}-panel-${index}`}`
4. Add `role="region"` and `aria-labelledby={`${baseId}-trigger-${index}`}` to panel
5. Add `inert={!open ? true : undefined}` to panel
6. Add `className?: string` to `AccordionProps` and pass to container via `cn()`
7. Add `id={`${baseId}-trigger-${index}`}` to trigger button

**Why:** `inert` prevents screen readers/keyboard from reaching closed panel content. `role="region"` + `aria-labelledby` give the panel a named landmark. `useId()` avoids collisions when multiple accordions exist.

#### 2.7 `Reveal` `prefers-reduced-motion` Check — PORT AS-IS

**File to edit:** `src/components/ui/Reveal.tsx`

**Action:** Add at the start of the `useEffect`:
```ts
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduced || typeof IntersectionObserver === "undefined") {
  setVisible(true);
  return;
}
```

**Why:** The old code short-circuits to visible when reduced motion is requested. The new code always animates regardless.

#### 2.8 Timeline Rail Draw Animation — PORT WITH ADAPTATION

**File to edit:** `src/components/Timeline.tsx`

**Actions:**
1. Add `useRef` + `useState` for `drawn` state
2. Add IntersectionObserver effect that sets `drawn = true` when list enters viewport
3. Add `origin-top` to the rail element
4. Add conditional `scale-y-0` / `scale-y-100` classes on the rail
5. Add `prefers-reduced-motion` check (short-circuit to drawn)
6. Adapt token names: `from-shrine-maroon-700 via-shrine-gold-400/70 to-shrine-gold-500` → `from-bsc-sapphire-700 via-bsc-gold-400/70 to-bsc-gold-500`

**Why:** The old timeline has a scroll-choreography where the rail draws downward once the list enters the viewport. The new one has the rail always visible.

#### 2.9 `deepLinks.resolveHashRedirect` Trailing-Slash Normalization — PORT AS-IS

**File to edit:** `src/utils/deepLinks.ts`

**Action:** In `resolveHashRedirect`, add trailing-slash normalization:
```ts
const path = pathname.replace(/\/$/, "");
```

And return `null` for root/empty paths.

**Why:** The old code normalizes `/worship/` → `/worship` before lookup. The new code doesn't, which means a trailing-slash URL won't match.

#### 2.10 `monogram` Expanded Honorific Set — PORT WITH ADAPTATION

**File to edit:** `src/utils/monogram.ts`

**Action:** Expand the regex to match the old honorific set:
```ts
const cleaned = name
  .replace(/^(Fr\.?\s+|Father\s+|Rev\.?\s+|Rev\.?\s+Fr\.?\s+|Friar\s+|Msgr\.?\s+|OFM\s+)/i, "")
  .replace(/,\s*SS\.CC\.?$/i, "")
  .trim();
```

**Why:** The old code strips 13+ honorifics (Fr, Friar, Father, Rev, Msgr, OFM, SS.CC, SSCC, Mr, Ms, Mrs). The new code only handles `Fr.`, `Father`, `Rev.`, `Rev. Fr.`.

#### 2.11 `Layout.resolveAnchor` Multi-Hash Parsing — PORT WITH ADAPTATION

**File to edit:** `src/components/Layout.tsx`

**Action:** Enhance the `resolveAnchor` function to handle double-hash `/#/path#anchor` format:
```ts
const raw = window.location.hash;
const parts = raw.split("#").filter(Boolean);
const anchor = parts.length > 1 ? parts[parts.length - 1] : null;
```

**Why:** The old code handles both `/#/worship#mass` (double-hash) and `/#/worship#mass` (Layout-level parsing). The new code only handles single-hash.

---

## Part B — Documentation Adaptation

### B.1 New `src/` Truth Values (for reference)

| Fact | New Value |
|------|-----------|
| Token namespace | `bsc-*` (sapphire blue) |
| Colors | 27 (was 26) |
| Shadows | 2 (`shadow-bsc`, `shadow-bsc-lg`) |
| Hooks | 3 (useScrolled, useScrollProgress, **useScrollSpy** — after port) |
| Utils | 4 (cn, massDay, monogram, deepLinks) |
| Test files | 18 (17 + setup) — after port |
| Source files | 34 (no tests) |
| `site.name` | `"Church of the Blessed Sacrament"` |
| `site.tagline` | `"A Household of Faith, Hope & Love."` |
| `site.uen` | `"T08CC1234A"` |
| `priests` | 3 |
| `lifeTimeline` | 7 |
| `givingOptions` | 6 |
| `images` | 7 keys |
| `public/images/` | 9 files |
| `ministries` sixth id | `"community"` (was `"mandarin"`) |
| Package name | `blessed-sacrament-church` |

### B.2 AGENTS.md Changes

- Update all `shrine-*` → `bsc-*` token references (~80 occurrences)
- Update `shadow-shrine` → `shadow-bsc`
- Update `maroon` → `sapphire` in descriptions
- Update file tree (add useScrollSpy, add test files, update counts)
- Update data array descriptions (priests 5→3, timeline 8→7, etc.)
- Update `site.ts` description (new fields, new tagline, uen present)
- Update `nav.ts` descriptions
- Update component descriptions (SocialIcons 2→3, Accordion inert, etc.)
- Update `index.html` description (new title, inline favicon, etc.)
- Update image count (8→9)
- Update all parish constants

### B.3 CLAUDE.md Changes

- All token references (~200+ occurrences)
- Complete `@theme` token table replacement (27 colors, new hex values)
- Update `Design System` section (new palette)
- Update `Data Layer` section (all arrays)
- Update `Component Conventions` (all components)
- Update `Architecture` file tree
- Update `Accessibility & SEO` (index.html changes)
- Update `Anti-Patterns` (token names)
- Update `Success Metrics` (all counts)
- Update `Validation Checklist` (all rows)
- Update `index.css` utility count (28→28, same count but different utilities)

### B.4 README.md Changes

- Update `shrine-*` → `bsc-*` references (~60 occurrences)
- Update `Design System` token table (complete replacement)
- Update `File Hierarchy` (add tests, update data, update images)
- Update `Key Features` (data changes)
- Update `Quick Start` (test counts)
- Update `Architecture` (tech stack same, data changes)
- Update `Deployment` (CSP same, image count)
- Update `Troubleshooting` (test references)

### B.5 blessed-sacrament-queenstown_SKILL.md Changes

- **Frontmatter:** Update `project_state`, `verified`, version bump to **5.0.0**
- **§0 Volatile Facts Register:** Complete replacement of every row
- **§1 Project Identity:** Update parish description
- **§2 Tech Stack:** Update test harness status (18 files after port)
- **§3 Bootstrapping:** Update config descriptions
- **§4 Design System:** Complete token/utility replacement
- **§5 Component Architecture:** Update tree, add test files, add useScrollSpy
- **§6 Custom Hooks:** 2→3 hooks (add useScrollSpy)
- **§7 Content Management:** Complete data array rewrite
- **§8 Accessibility:** Update index.html/CSP
- **§9 Anti-Patterns:** Update token references
- **§10 Debugging:** Update test-related entries
- **§11 Pre-Ship Checklist:** Update all counts
- **§12 Lessons Learnt:** Update L16
- **§13–16:** Update token references
- **§19 Color Reference:** Complete replacement (27 colors, new hex)
- **§20 TypeScript Interfaces:** Update all interface definitions
- **Appendix D:** Add hop-5 entry
- **Appendix F:** Add F.3 (this port diff)
- **Appendix G:** Add G.6 (this port unification notes)
- **Quick Reference Card:** Update all counts

---

## Part C — Execution Order

### Phase 1: Behavioral Porting (src/)
1. Port `useScrollSpy` hook + update Ministries.tsx
2. Port test harness `src/test/setup.ts`
3. Port Header `onBlurCapture` + `Escape` fix
4. Port Accordion `inert` + `role` + `useId` + `className`
5. Port `Reveal` `prefers-reduced-motion`
6. Port Timeline rail draw animation
7. Port `deepLinks` trailing-slash normalization
8. Port `monogram` expanded honorific set
9. Port `Layout.resolveAnchor` multi-hash parsing
10. Port + adapt all 17 test files

### Phase 2: Verification
1. `pnpm lint` — clean
2. `pnpm typecheck` — clean
3. `pnpm test` — 18 files / N tests green
4. `pnpm test:e2e` — 51/51 green
5. `pnpm build` — singlefile correct

### Phase 3: Documentation
1. Update AGENTS.md
2. Update README.md
3. Update CLAUDE.md
4. Update blessed-sacrament-queenstown_SKILL.md
5. Cross-doc consistency sweep

---

## Part D — Open Decisions

| # | Question | Recommended Answer |
|---|----------|-------------------|
| 1 | SKILL doc version bump | **5.0.0** (major port — new design system + behavioral port) |
| 2 | Lineage appendix | Add D.5 (hop-5 entry) |
| 3 | Historical references | Retain in lineage appendices, sweep from body text |
| 4 | `docs-contract.test.ts` | Update all 23 checks to new truth values |
| 5 | `playwright.config.ts` comment | Update "risen-christ-church" → "blessed-sacrament-church" |
| 6 | `playwright.built.config.ts` live URL | Update `risen-christ.jesspete.shop` → appropriate BSC URL |
