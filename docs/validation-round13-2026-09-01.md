# Round-13 Validation Report — Blessed Sacrament Queenstown

> **Date:** 2026-09-01 · **Branch:** `main` · **Baseline:** `e30e170` · **Plan:** `docs/remediation-plan-round13-2026-09-01.md` · **Audit:** `docs/code-review-audit-round13-2026-09-01.md`
> **Method:** Iron-Law gate function — every claim below is backed by a fresh command run in this session (environment: Node 24.19.0, pnpm 11.0.0, fresh clone of `e30e170` then in-session remediation).

## 1. Gate ledger (before → after)

| Gate | Before remediation (audit V1) | After remediation | Evidence |
|---|---|---|---|
| `pnpm lint` | 0 warnings | **0 warnings** | `eslint . --max-warnings 0` clean |
| `pnpm typecheck` | 0 errors | **0 errors** | `tsc --noEmit` clean |
| `pnpm test` | 16 files / 94 tests | **17 files / 115 tests green** | +20 `docs-contract` checks, +1 `repo-hygiene` tracked-vs-ignored check |
| `pnpm test:e2e` | 51/51 | **51/51** | BSC suite unchanged |
| `pnpm build` | 391,565 B | **391,565 B (byte-identical)** | `dist/index.html` + `_headers` + `favicon.svg` + `robots.txt` + `images/8` |
| `pnpm test:e2e:built` | 51/51 | **51/51** | vs `vite preview :4173` serving the new `dist/` |
| Live E2E | 51/51 (V4) | **51/51** | `E2E_BASE_URL=https://blessed-sacrament.jesspete.shop/ pnpm test:e2e:built` |

The build is **byte-identical** to the pre-remediation artifact (391,565 B) — remediation changed tests, docs, repo hygiene and one Tailwind source-exclusion comment (stripped by the minifier), zero runtime behavior change.

## 2. Remediation outcomes per finding

| ID | Outcome | Evidence |
|---|---|---|
| C1 (rotate key) | **OPS — documented, not executable from the repo.** Flagged at the top of AGENTS/CLAUDE/SKILL Quick Ref + audit §C1 | history copy SHA-256 `6aaaf547…` == operational key (audit V11) |
| H1 (host headers) | **OPS — documented** (Cloudflare Transform Rules or Pages migration). `dist/_headers` artifact unchanged | audit V8 live header inspection |
| M1 src.orig claims | **Fixed** — all four docs re-pinned to "not part of the repository"; `docs-contract` asserts `src.orig` absent | `rg "PRESENT (77 files"` → 0 hits in current-state prose |
| M2 skills claims | **Fixed** — docs re-pinned to "vendored, tracked, tooling-ignored"; `.gitignore` rule removed (2,360 tracked files no longer match it) | `repo-hygiene` tracked-vs-ignored check green |
| M3 stale gate state | **Fixed** — frontmatter/§0/§2/§3/§11/App C/Quick Ref + README/CLAUDE tables re-pinned to 16→17 files / 94→115 tests / 51 green | `docs-contract` 20/20 |
| M4 token count | **Fixed** — 26 colors + 2 shadows everywhere (28 `@theme` entries); `docs-contract` pins the count against `src/index.css` | `docs-contract` token checks |
| M5 tracked-but-ignored | **Fixed** — untracked `package-lock.json`, `test-results/.last-run.json`, 6×`docs/*.zip` (working copies kept); `.gitignore` rules root-anchored (`/scripts/`, `/plan/`, `/backup/`, `/upload/`, `/package-lock.json`, `/*.zip`, `/docs/*.zip`); guard added | `git ls-files` ∩ `git check-ignore --no-index` = ∅ |
| M6 footer contract | **Fixed** — all four docs re-pinned to 2 socials (Facebook/Instagram) + Archdiocese text link, no whatsapp/sacredHearts/parishUpdates anchors; `docs-contract` pins `Footer.tsx` | `docs-contract` footer checks |
| L1–L6 | **Fixed** — scrollspy restored wording, e2e green wording, `#mandarin` anchors, EventMeta mapping (Devotion=gold-700 / Archdiocese=terracotta-600), PageHero `variant: dusk\|light` + no fetchPriority note, lucide 1.38.0 / doc-version 4.0.0 | per-doc `rg` sweeps → 0 stale hits |
| L7 robots/SEO | **Fixed** — `public/robots.txt` added (allow-all + canonical-domain + soft-404 ADR-1 note), ships to `dist/robots.txt`; canonical tradeoff documented | build output |
| I4 docs-contract | **Fixed** — `src/docs-contract.test.ts` (20 checks) restored BSC-adapted | `npx vitest run src/docs-contract.test.ts` → 20/20 |
| I1–I3, I5 | I5 fixed with M5; I1–I3 deferred (tracked in audit §4) | — |

## 3. New finding discovered and fixed during remediation (R-1)

- **R-1 (Medium, build)** — Tailwind v4 automatic content detection scans **every non-gitignored file**, so (a) un-ignoring the vendored `skills/` tree (M2/M5 fix) made Tailwind scan 250 skill docs whose code samples mention utility names, and (b) the new `docs-contract` test lists all 27 utility names. Either alone re-emits tree-shaken custom utilities (incl. data-URI SVG backgrounds) into the single-file bundle: the gate caught the regression as **391.57 → 473.65 kB (+21%)**.
- **Fix:** `@source not "../skills/**";` + `@source not "src/**/*.{test,spec}.{ts,tsx}";` at the top of `src/index.css` (paths resolve relative to the CSS file). Rebuild → **391,565 B byte-identical**.
- **Lesson (extends L15):** content-driven CSS emission is coupled to *repository tracking policy* — any `.gitignore`/tracking change must be followed by a `pnpm build` size check, and contract tests must never be style consumers.

## 4. Fresh-clone / tracking simulation (R4.2)

- `git status` after all edits: only intended changes (tests, docs, `.gitignore`, `robots.txt`, untracked artifacts).
- `git ls-files | git check-ignore --stdin --verbose --no-index` → **empty intersection** (was 2,368 files).
- `pnpm install --frozen-lockfile` clean on the fresh clone (V20).

## 5. Doc sweep (R4.4) — stale-string census after re-pin

| Stale string | AGENTS | CLAUDE | README | SKILL |
|---|---|---|---|---|
| `useScrollSpy ABSENT` / `NO useScrollSpy` / `2 hooks` | 0 | 0 | 0 | 0 (history-appendix hits only, as-of-labeled) |
| `STALE` / `stale Risen` / `currently red` | 0 | 0 | 0 | 0 (appendix as-of-labeled only) |
| `25 colors` / `25+2` | 0 | 0 | 0 | 0 (appendix as-of-labeled only) |
| `src.orig … PRESENT / 77 files` | 0 | 0 | 0 | 0 (appendix as-of-labeled only) |
| `skills deleted` | 0 | 0 | 0 | 0 |
| `#language-communities` | 0 | 0 | 0 | 0 (appendix lineage rows only, as-of-labeled) |
| `Facebook/Instagram/YouTube` / `3 socials` | 0 | 0 | 0 | 0 |
| `1.34.0` / doc-version `3.0.0` | — | — | — | 0 |
| `390.74` | 0 | 0 | 0 | 0 (appendix as-of-labeled only) |

Remaining appendix hits are explicitly `as of <date>`-labeled lineage history (Appendix D/F/G per the SKILL's own fossil-sweep protocol), including a round-13 superseded-note on G.5.

## 6. Live-site state (unchanged, verified)

- Deployed artifact byte-identical to the repo build (V3) — the remediation ships docs/tests only, so no redeploy is required to stay in sync; the next deploy will additionally publish `robots.txt`.
- E2E vs live 51/51 (this session, post-remediation suite).
- Outstanding ops items (owner): **C1 key rotation**, **H1 host security headers**.

## 7. Verdict

The documented contracts (AGENTS / CLAUDE / README / SKILL) and the repository are now aligned and **continuously guarded** (`docs-contract` + `repo-hygiene` + `ci-workflow` in CI). All five gates + built-artifact pass + live pass are green; the deploy artifact is byte-identical to `main`'s build. Ship-safe from the repository side; the two owner-level ops actions (C1, H1) remain the only open items.
