# Round-13 Tiered Code Review + Security Audit — Blessed Sacrament Queenstown

> **Date:** 2026-09-01 · **Branch:** `main` · **HEAD audited:** `e30e170` (docs: re-pin to F1–F2 green gate — 16/94 + 51 + 391.57kB F3)
> **Scope:** prove the SPA matches its documented contracts (AGENTS / CLAUDE / README / SKILL) and is safe to ship — tiered review + security audit with evidence, severity-ranked findings, and a remediation backlog (`docs/remediation-plan-round13-2026-09-01.md`).
> **Method:** repo skills `code-quality-standards` (Six-Axis), `code-review-checklist` (12-category scan), `verification-and-review-protocol` (Iron Law gate function), `security-and-hardening`, `webapp-testing-journey` / `agent-browser` (live journeys), `tdd-workflow` (remediation).
> **Environments verified:** fresh clone (`find`/`git ls-files`), local gates (lint / typecheck / vitest / build / playwright dev + built), live host `https://blessed-sacrament.jesspete.shop/` (Playwright 51/51 + agent-browser 15-route journey + mobile-viewport drawer check + header inspection).

---

## 0. Verification Ledger (what was checked, how, result)

| # | Check | Method | Result |
|---|---|---|---|
| V1 | Five local gates | `pnpm lint` / `typecheck` / `test` / `build` / `test:e2e` | lint 0 ✓ · typecheck 0 ✓ · **16 files / 94 tests ✓** · build `dist/index.html` **391,565 B (391.57 kB)** ✓ · **E2E 51/51 ✓** |
| V2 | Built-artifact E2E | `pnpm test:e2e:built` (vite preview :4173) | **51/51 ✓** |
| V3 | Live deployment byte-parity | `curl` content-length vs local build | live `/` = **391,565 B = local `dist/index.html`** (byte-identical) ✓ |
| V4 | Live E2E | `E2E_BASE_URL=https://blessed-sacrament.jesspete.shop/ pnpm test:e2e:built` | **51/51 ✓** |
| V5 | Live asset health | `curl` `/favicon.svg`, `/images/*.jpg` | 200 `image/svg+xml` 320 B ✓ · 8/8 images 200 ✓ |
| V6 | Live console/page errors | agent-browser, 15 routes (all pages + aliases + anchors + NotFound) | **0 console errors, 0 page errors** ✓ |
| V7 | Live hash-scroll + drawer modal | agent-browser `#/ministries#mandarin` scroll + 390×844 drawer | scrolled-to-section ✓ · `role=dialog` `aria-modal=true` ✓ · body scroll locked ✓ |
| V8 | Host security headers | `curl -I` on `/` and image assets | **absent** — no HSTS / XCTO / XFO / Permissions-Policy / CSP header (H1) |
| V9 | Live robots/sitemap | `curl` `/robots.txt`, `/sitemap.xml` | both are SPA-fallback HTML (393,401 B / 391,565 B) — no real files (L7) |
| V10 | Secrets in tree | `rg` secret patterns in `src/` + `git ls-files` key-pattern scan | clean ✓ (guard: `src/repo-hygiene.test.ts`) |
| V11 | Secrets in **history** | `git log --all -- "*ssh-key*"` + `git show 376fcb5:docs/ssh-key.txt \| sha256sum` | **`docs/ssh-key.txt` recoverable at `376fcb5`**; SHA-256 `6aaaf547…` **matches the operational key supplied for this session** (C1) |
| V12 | Dependency vulnerabilities | `pnpm audit --prod` | "No known vulnerabilities found" ✓ |
| V13 | Injection/unsafe patterns | `rg dangerouslySetInnerHTML|eval\(|new Function|as any|: any|console.log` in `src/` | zero hits ✓ |
| V14 | External-link hygiene | review `Footer`/`NewsEvents`/`Button` | all `target="_blank"` carry `rel="noopener noreferrer"` ✓ |
| V15 | Token/utility/keyframe counts | scripted count of `src/index.css` | **26 colors** (not 25) + 2 shadows ✓ · 27 utilities ✓ · 8 keyframes ✓ · scrollbar + print override ✓ |
| V16 | Route table | `rg "<Route" src/App.tsx` | 17 entries (16 paths + `*`) ✓ · 7 aliases in 5 groups ✓ |
| V17 | Unit suite inventory | `find src -name "*.test.*"` | 16 test files + `src/test/setup.ts` ✓ (incl. `ci-workflow`, `repo-hygiene`) |
| V18 | E2E inventory | per-spec `test(` count | 8 spec files + `helpers.ts` = 11+8+4+4+7+6+8+3 = **51** ✓ |
| V19 | CI trigger bytes | byte-level check of `.github/workflows/ci.yml` | `branches: [main]` on both triggers — **valid** (apparent `ain]` corruption is a terminal display artifact of the `[m` byte pair, as pinned by `src/ci-workflow.test.ts`) ✓ |
| V20 | `pnpm install --frozen-lockfile` reproducibility | fresh clone install | clean install from `pnpm-lock.yaml` ✓ |

**Note on the display artifact (V19):** tool output that renders `[main]` can swallow the `[m` pair and display `ain]`. The round-6 guard test already documents this; any future "corruption" sighting must be re-verified byte-level (`od -c`/charCode dump) before filing.

---

## 1. Summary — counts by severity

| Severity | Count | IDs |
|---|---|---|
| **Critical** | 1 | C1 |
| **High** | 1 | H1 |
| **Medium** | 6 | M1–M6 |
| **Low** | 7 | L1–L7 |
| **Informational** | 5 | I1–I5 |

The application source itself is in strong shape: zero unit/E2E failures across three environments, zero console errors live, no vulnerable dependencies, no unsafe patterns, consistent a11y contracts (modal drawer, focus trap, skip link, aria-current, reduced-motion, inert accordion). The backlog is dominated by **documentation↔repository drift** (the SKILL's own "fossil" failure mode, L15/App G) and **two operations-grade issues** (key rotation, host headers).

---

## 2. Findings (ordered by severity)

### C1 — CRITICAL · Leaked SSH private key is recoverable from public git history **and is the key still in use**

- **Location:** git history — `docs/ssh-key.txt` added in `376fcb5` ("add skills"), removed (untracked-only) by `e56156d`; `.gitignore` entry `docs/ssh-key.txt` present.
- **Evidence:** `git cat-file` recovers the file at `376fcb5`; `sha256sum` of the history copy **equals** the SHA-256 (`6aaaf54777df434d…`) of the operational key supplied for this session's push. `git rm --cached` does not scrub history — every clone can extract the private key.
- **Impact:** anyone with repo access can impersonate the deploy identity push to `main`. This is the round-6 C1 finding, still outstanding after three rounds ("Rotation is the only real fix", SKILL L13).
- **Recommended fix (repo owner + this session's hygiene):**
  1. **Rotate** — generate a new deploy key, replace it in GitHub, revoke the leaked one (owner action; cannot be fixed by docs or by this session's commits).
  2. Optionally rewrite history (`git filter-repo --path docs/ssh-key.txt --invert-paths`) + force-push + re-clone, *after* rotation.
  3. Keep `src/repo-hygiene.test.ts` guard (already green).
- **Confidence:** **Verified** (byte-level hash match).

### H1 — HIGH · Production host serves none of the documented host-level security headers

- **Location:** live host `https://blessed-sacrament.jesspete.shop/` (Cloudflare-fronted origin); `public/_headers` → `dist/_headers` is shipped but not honored by this host.
- **Evidence (V8):** `curl -I` on `/` returns only `cache-control: no-cache`, `vary: Origin`, Cloudflare bookkeeping — **no** `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, `Permissions-Policy`, `Referrer-Policy` header, and no header-form CSP (only the meta CSP in the HTML). Same for image assets. README §Deployment explicitly warns: "on Cloudflare Pages only … those headers are not served on generic static hosts."
- **Impact:** clickjacking (no XFO/frame-ancestors), MIME-sniffing, no HSTS downgrade protection — the documented defense-in-depth contract is not actually deployed.
- **Recommended fix:** add the five headers via the host's header config (Cloudflare **Transform Rules → Response Headers**, or Pages `_headers` if the site is migrated to Pages). This is host config, not a code change; `dist/_headers` stays as the Pages-ready artifact.
- **Confidence:** **Verified** (live header inspection).

### M1 — MEDIUM · All four docs describe `src.orig/` as present and git-tracked; it does not exist in the repository

- **Location:** AGENTS L51/L96/L142 · CLAUDE L96–L99/L321/L337 · README L154 · SKILL §0 (`src.orig/ policy`), §2, §5.2, §11, §13, ADR-6, App D/F, G.5, Quick Ref.
- **Evidence (V10/V20):** `find src.orig` → "No such file or directory" on a fresh clone; `git ls-files | grep src.orig` → only a `docs/*.md` filename; `git log --all -- src.orig` → empty (the 77-file Risen Christ archive was **never committed** to this repo — it lived only in the port session's local worktree).
- **Impact:** the documented harness-restore path ("restore `src/test/` from `src.orig/`") is impossible for any fresh clone; future agents will hunt for a directory that isn't there.
- **Recommended fix:** re-pin all four docs: `src.orig/` is a **local-only port-session artifact, not part of the repository**; the harness has since been restored in-repo (F1), so the restore-from-archive narrative is historical. Update §0 rows, tree comments, ADR-6, appendices.
- **Confidence:** **Verified**.

### M2 — MEDIUM · Docs claim `skills/` is "deleted in the worktree"; it is present and tracked (250 entries)

- **Location:** AGENTS L62 · SKILL §0 (`skills/ policy`), §2, §13, App F.2/G.5 · CLAUDE L95–L96/L421 (README is correct).
- **Evidence:** `git status` clean on fresh clone; `git ls-files | grep skills/skills-catalog.md` → tracked; `ls skills | wc -l` → 250. Tooling ignores (`eslint`, `vite watch`, tsconfig scoping) are real and load-bearing on fresh clones — the "vacuously true" narrative is wrong.
- **Impact:** agents following the docs will treat the tree as dirty or skip catalog lookups (`skills-catalog.md`), and lint/watch behavior is misexplained.
- **Recommended fix:** re-pin to "vendored, tracked, ignored by eslint/tsconfig/vite — do not import/lint"; delete the "deleted in worktree" rows.
- **Confidence:** **Verified**.

### M3 — MEDIUM · Three of four docs still carry the pre-F1/F2 gate state (0/0 tests, stale E2E, 39-file src) — SKILL is also internally inconsistent

- **Location:** CLAUDE L50/L61/L86–L88/L156–L172/L185–L204/L293/L347 · README L73–L74/L137–L142/L159/L196–L208/L262–L282 · SKILL frontmatter (`project_state`), §0 rows (unit tests, E2E, src inventory, build size, pre-push gate), §2 table, §3.1, §3.2, §5.2 tree/heading, §11, App C/D.1/F.2/G.5, Quick Ref.
- **Evidence (V1/V2/V17/V18):** actual state is **16 files / 94 tests green** (F1), **9 spec files / 51 E2E green retargeted to BSC** (F2B, verified in V1 + copy grep: assertions now say `1 Commonwealth Drive`), `useScrollSpy` restored and wired (F2A), `src/` = **40 source + 16 tests + 1 setup = 57 files**, build **391.57 kB** (AGENTS/F3 already re-pinned; SKILL still mixes 390.74 kB and 391.57 kB within its own §0/frontmatter; SKILL §2 says lucide-react 1.34.0 vs package.json 1.38.0; SKILL frontmatter v4.0.0 vs body text "doc version 3.0.0"; SKILL §5.2 heading still says "77 files in src").
- **Impact:** any agent onboarding via CLAUDE/README/SKILL will wrongly conclude the gate is red and re-do F1/F2; the SKILL's own §0 "single source of truth" contract is violated by its own stale rows.
- **Recommended fix:** re-pin all three docs to the F3 state (exact numbers above), sweep stale copies with the Appendix G.4 fossil-sweep protocol, and prefer **40 source files** (recount per `find src -type f ! -name "*.test.*" ! -path "src/test/*"`).
- **Confidence:** **Verified**.

### M4 — MEDIUM · Token count wrong in all docs: 26 colors, not 25

- **Location:** AGENTS L36/L59/L73–L74 · CLAUDE L115/L155–L156/L161 · README design table · SKILL §0, §4.1 (its own verbatim block lists 26), §19, ADR-3, Quick Ref.
- **Evidence (V15):** scripted count of `--color-shrine-*` in `src/index.css` = **26** (6 neutrals + 8 maroon + 6 gold incl. `gold-700` + 3 pine + 3 terracotta) + 2 shadows. Docs claim 25 everywhere; README's own table lists only 21.
- **Impact:** contract drift on the "budget" that the docs themselves make load-bearing ("tokens 25+2 are the budget").
- **Recommended fix:** re-pin to 26+2 in all four docs (or state 25 colors *excluding* the `maroon-100`/`terracotta-400` intermediates explicitly — no, simply correct to 26 and enumerate).
- **Confidence:** **Verified**.

### M5 — MEDIUM · Repo hygiene: files tracked despite `.gitignore` (package-lock.json, test-results/.last-run.json, docs/*.zip)

- **Location:** git index — `package-lock.json` (88 kB), `test-results/.last-run.json`, `docs/blessed_sacrament_church_grok4.6.zip`, `docs/blessed_sacrament_church_kimi2.6.zip`, `docs/blessed_sacrament_grok4.6.zip`, `docs/blessed_sacrament_kimi2.6.zip`, `docs/comparison_st-mary_vs_risen-christ.zip`, `docs/st-mary-of-angels-grok4.6.zip`.
- **Evidence:** all present in `git ls-files`; all matched by `.gitignore` entries (`package-lock.json`, `test-results/`, `docs/*.zip`) — the exact "ignore does not untrack" lesson (L14) recorded in the repo's own SKILL.
- **Impact:** zombie lockfile invites accidental `npm` installs against a non-canonical lock (pnpm-lock.yaml is canonical); tracked zips bloat the clone (~2.4 MB of binary docs that the repo explicitly says not to track — ".gitignore: binary docs — do not track zipped image packs"); `test-results/.last-run.json` churns on every local E2E run and pollutes diffs.
- **Recommended fix:** `git rm --cached package-lock.json test-results/.last-run.json docs/*.zip` (keeps local copies), commit as hygiene change. Guard: extend `src/repo-hygiene.test.ts` with a tracked-but-ignored check.
- **Confidence:** **Verified**.

### M6 — MEDIUM · Footer social/link contract wrong in all four docs (2 socials; no WhatsApp/SS.CC/parish-updates links)

- **Location:** AGENTS L37 ("SocialIcons (3: Facebook/Instagram/YouTube)" + "Footer (whatsapp + sacredHearts + parishUpdates links)") · CLAUDE L128/L301 ("Facebook/Instagram + wa.me WhatsApp hotline" / "2-social + WhatsApp hotline + sacredHearts + parishUpdates + archdiocese") · README L117/L162 ("3 socials Facebook/Instagram/WhatsApp" / "WhatsApp/SS.CC/bulletin") · SKILL §5.2 ("Facebook/Instagram, WhatsApp · sacredHearts link"), §7.1 nav row, D.1.
- **Evidence:** `src/components/SocialIcons.tsx` exports exactly `FacebookIcon` + `InstagramIcon`; `Footer.tsx` renders `social = [Facebook, Instagram]` + one text link "Archdiocese of Singapore" (`site.archdiocese`); no WhatsApp/`sacredHearts`/`parishUpdates` anchor is rendered anywhere (the `site.ts` keys exist but are unconsumed).
- **Impact:** agents extending the Footer will "restore" links that were intentionally dropped (or hallucinate icons); the doc contract fails byte-verification.
- **Recommended fix:** re-pin all four docs to the actual 2-icon + archdiocese contract; explicitly note `site.whatsapp/sacredHearts/parishUpdates` are unused keys today.
- **Confidence:** **Verified**.

### L1 — LOW · AGENTS stale: `useScrollSpy` claimed absent; it is restored and wired

- **Location:** AGENTS L38 ("2 hooks only, useScrollSpy ABSENT"), L72 ("No useScrollSpy — pill active state is hash-only").
- **Evidence:** `src/hooks/useScrollSpy.ts` + 6 tests present (F2A, commit `9cfc8d8`); `Ministries.tsx` drives pill `aria-current` from the spy.
- **Fix:** update AGENTS hooks line + Ministries quirk to the 3-hook scrollspy contract. (CLAUDE/SKILL §0 also say 2 hooks — covered by M3 sweep.) **Confidence:** Verified.

### L2 — LOW · AGENTS stale: e2e "STALE / Risen copy" + "CI currently red" lines

- **Location:** AGENTS L47–L48.
- **Evidence:** E2E retargeted (F2B) and green in V1/V4; copy grep shows BSC assertions only.
- **Fix:** re-pin L47/L48 to the green state. **Confidence:** Verified.

### L3 — LOW · Ministries sixth anchor id inconsistent across docs (`mandarin` is correct)

- **Location:** AGENTS L37–L38/L87–L88 (`#language-communities` — wrong) · SKILL §5.4 anchor table (`#language-communities` — contradicts its own §0/§7) · CLAUDE L97/L129 (`#mandarin` — correct).
- **Evidence:** `src/data/content.ts` ministries[5].id = `mandarin` (V-verified); live `#/ministries#mandarin` scrolls (V7).
- **Fix:** replace `language-communities` anchor references with `#mandarin` (keep "Language Communities" as the title). **Confidence:** Verified.

### L4 — LOW · EventMeta category-tone mapping documented wrong for BSC

- **Location:** AGENTS L82 (round-5 paragraph: "terracotta-600 for Devotion").
- **Evidence:** `src/components/EventMeta.tsx` — `Devotion: border-shrine-gold-700 text-shrine-gold-700`, `Archdiocese: terracotta-600`.
- **Fix:** update the mapping note. **Confidence:** Verified.

### L5 — LOW · PageHero API + hero-opacity docs drift

- **Location:** CLAUDE L302 (`variant? (light/dark)`, opacity-35) · SKILL §5.5/§20.4 (no `fallback`/`variant` in the interface; "opacity 45") · AGENTS L37 ("opacity-35" era wording absent but PageHero description stale).
- **Evidence:** actual `PageHeroProps` = `{ eyebrow, title, description?, image, fallback?, children?, compact?, variant?: "dusk" | "light" }`; image opacity 60 (light) / 80 (dusk); PageHero passes `loading="eager"` but **not** `fetchPriority` (only Home hero does).
- **Fix:** re-pin the interface + opacity + fetchPriority notes. **Confidence:** Verified.

### L6 — LOW · SKILL internal version fossils

- **Location:** SKILL §2 table (`lucide-react 1.34.0`) · SKILL §2 note ("SKILL doc version 3.0.0") vs frontmatter `version: 4.0.0`.
- **Evidence:** package.json pins `lucide-react 1.38.0`; frontmatter says 4.0.0.
- **Fix:** sweep to 1.38.0 / 4.0.0. **Confidence:** Verified.

### L7 — LOW · No robots.txt / sitemap.xml; soft-404 behavior; canonical domain points at the ported site

- **Location:** `public/` (no robots.txt/sitemap.xml); live `/robots.txt` = SPA fallback HTML (393,401 B) with Cloudflare content-signal preamble; `/sitemap.xml` = index.html fallback; `index.html` canonical/OG = `https://www.bsc.org.sg/` while the deploy host is `blessed-sacrament.jesspete.shop`.
- **Impact:** crawlers get HTML-as-robots and a 200 for any path; the deploy host cannot rank (canonical points to the canonical parish domain — intentional for a port, but worth documenting).
- **Fix:** add `public/robots.txt` (allow-all + sitemap ref) + a minimal `public/sitemap.xml` listing the 16 canonical paths as `/?#/path` equivalents is **not** useful for hash routing — instead document the HashRouter/canonical tradeoff and ship a robots.txt that disallows nothing and references the canonical domain. Document soft-404 behavior as accepted (ADR-1 consequence). **Confidence:** Verified.

### I1 — INFORMATIONAL · `SafeImage` doesn't sync `current` state when `src` prop changes without remount

- `useState(src)` + no effect sync; latent only because `Layout` keys the page container by pathname (full remount per route). Harden with a `useEffect(() => setCurrent(src), [src])` if the component is ever reused across data changes. **Confidence:** Reasoned.

### I2 — INFORMATIONAL · `BackToTop` performs DOM side effects inside the `setVisible` updater

- `document.querySelector` + `blur()` inside the state updater is idempotent and StrictMode-tolerated here, but a `useEffect` watching `visible` would be purer. **Confidence:** Reasoned.

### I3 — INFORMATIONAL · Home quick-facts hardcode parish strings

- "7.30 a.m.–5.30 p.m." / "Commonwealth" / "Corpus Christi" / "SS.CC" are literals in `Home.tsx` while the convention says pages render from `site.ts`. Low risk (display summary), but a drift risk if Mass times change. **Confidence:** Verified.

### I4 — INFORMATIONAL · `docs-contract.test.ts` (round-6, 16 tests) was not restored with F1

- The guard suite that would have caught M1–M6 automatically is absent from `src/` (only `ci-workflow` + `repo-hygiene` were restored). Restoring/retargeting it is the highest-leverage prevention for the drift class. **Confidence:** Verified.

### I5 — INFORMATIONAL · `test-results/` tracked file is regenerated on every E2E run

- Covered by M5; listed separately so the fix (untrack) is not forgotten when Playwright next writes `.last-run.json`.

---

## 3. What was reviewed and found clean (so nobody re-audits it)

- **Correctness:** route table (17/7/9 verified against `App.tsx` + `deepLinks.knownRoutePaths` + live journeys); `Layout` double-hash resolution + timeout cleanup; `massDayKey` mapping; scrollspy document-order tie-break; Accordion grid-rows + `inert` + keyboard nav; drawer focus trap/restore/outside-tap/Escape; `BackToTop` threshold + blur-on-hide.
- **Security:** no secrets in tree (C1 is history-only); no `dangerouslySetInnerHTML`/`eval`/`new Function`; no `any`; all external anchors `rel="noopener noreferrer"`; meta CSP tight (`default-src 'self'`, `object-src 'none'`, `base-uri 'self'`, no `unsafe-eval`); `pnpm audit` clean; dependency pins exact.
- **A11y:** skip-link hash discipline; 44px hamburger; `aria-current` contract; `aria-expanded` everywhere; inert closed panels; alt text on content images; reduced-motion global kill + print override.
- **Performance:** single-file build 391.57 kB (gzip 113.77 kB) — within the documented ≤400 kB budget; lazy images by default with eager heroes; rAF-throttled scroll listeners.
- **Aesthetic/UX (Axis 6):** bespoke `shrine-*` token system, Fraunces/Source Sans 3 pairing, staged rise-in entrances, woven dividers — no template aesthetics; Anti-Generic litmus passes.

---

## 4. Remediation backlog

Executed in `docs/remediation-plan-round13-2026-09-01.md` (TDD, one logical change per commit):

| ID | Fix | Type | Owner |
|---|---|---|---|
| C1 | Rotate the leaked deploy key (GitHub deploy-key replacement + revoke old); optional `git filter-repo` scrub | ops | **repo owner** |
| H1 | Add HSTS/XCTO/XFO/Referrer-Policy/Permissions-Policy (+CSP header) via Cloudflare Transform Rules or migrate to Pages `_headers` | ops | repo owner |
| M1–M6, L1–L6 | Docs re-pin: AGENTS + CLAUDE + README + SKILL (fossil-sweep per SKILL App G.4) + this session's docs entries | docs | this session |
| M5, I5 | `git rm --cached` package-lock.json, test-results/.last-run.json, docs/*.zip + extend `repo-hygiene` guard with tracked-but-ignored test | repo | this session |
| L7 | Add `public/robots.txt` (+ document soft-404/canonical tradeoff) + SEO docs note | code+docs | this session |
| I4 | Restore a BSC-adapted `src/docs-contract.test.ts` that pins the corrected volatile facts (file counts, token count 26+2, hooks 3, socials 2, footer links, e2e 8 specs/51) so the M-class drift fails CI instead of shipping | code | this session |
| I1–I3 | Optional hardening (SafeImage src sync, BackToTop effect purity, Home facts from site.ts) — deferred, tracked | code | deferred |
