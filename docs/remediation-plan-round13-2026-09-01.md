# Remediation Plan — Round-13 (Blessed Sacrament Queenstown)

> **Date:** 2026-09-01 · **Branch:** `main` · **Prerequisite:** audit `docs/code-review-audit-round13-2026-09-01.md` (C1/H1/M1–M6/L1–L7/I1–I5, verification ledger V1–V20).
> **Method:** TDD (`skills/tdd-workflow` RED→GREEN→REFACTOR, one cycle per commit) + `verification-and-review-protocol` Iron Law (no completion claims without fresh gate evidence) + SKILL App G.4 fossil-sweep for docs.
> **Out of scope for code:** C1 (key rotation — repo owner) and H1 (host security headers — Cloudflare config). Both are ops actions; this session documents them prominently and cannot execute them from the repo.

## Phase R1 — Guard tests first (RED)

| # | Task | Makes red |
|---|---|---|
| R1.1 | Add `src/docs-contract.test.ts` (BSC-adapted restoration of the round-6 suite): pins the **corrected** volatile facts — `src/` inventory (40 source + 16 tests + 1 setup), tokens **26 colors + 2 shadows** (incl. gold-700, terracotta-600), utilities 27 + keyframes 8, hooks **3** (incl. useScrollSpy), e2e **8 spec files + helpers = 51**, routes 17/7/9, sixth ministry id **`mandarin`**, package version 1.4.4, lucide-react **1.38.0**, `src.orig/` **absent** from the repo, `skills/` **present** and ignored by tooling, Footer renders **exactly 2 socials** (Facebook/Instagram) + archdiocese text link and **no** whatsapp/sacredHearts/parishUpdates anchors, `public/robots.txt` exists, docs no longer claim "harness missing"/"stale E2E"/"src.orig present"/"skills deleted" | M1–M6, L1–L6, L7 partially, I4 |
| R1.2 | Extend `src/repo-hygiene.test.ts`: fail when any path matched by `.gitignore` rules is tracked (`git check-ignore`) — catches `package-lock.json`, `test-results/.last-run.json`, `docs/*.zip` regressions | M5 |

## Phase R2 — Repo hygiene + assets (GREEN R1.2, part of R1.1)

| # | Task | Fixes |
|---|---|---|
| R2.1 | `git rm --cached package-lock.json test-results/.last-run.json docs/*.zip` (keep working copies) — commit `chore: untrack ignored artifacts` | M5, I5 |
| R2.2 | Add `public/robots.txt` (`User-agent: *` / `Allow: /` + `Sitemap` note pointing at the canonical domain) — ships via publicDir to `dist/robots.txt` | L7 |
| R2.3 | Document (in docs phase) the accepted soft-404 behavior + canonical-domain tradeoff under ADR-1 consequences — no code change | L7 |

## Phase R3 — Docs fossil sweep (GREEN R1.1)

Apply SKILL App G.4 protocol: update the corrected fact, then `rg` the old value across the four docs; every remaining hit is either corrected or labeled historical-with-date.

| # | Doc | Corrections |
|---|---|---|
| R3.1 | `AGENTS.md` | hooks 3 (scrollspy restored — L1); e2e 8 specs/51 green BSC + CI mirrors green (L2); ministries anchor `#mandarin` (L3); Footer 2 socials + archdiocese, no whatsapp/sacredHearts/parishUpdates (M6); tokens 26+2 (M4); src tree 40 source + 16 tests + 1 setup = 57 files; `skills/` present-tracked (M2); `src.orig/` not in repo (M1); EventMeta Devotion=gold-700 / Archdiocese=terracotta-600 (L4); add "Where to look next" rows for round-13 docs |
| R3.2 | `CLAUDE.md` | Build Commands table re-pinned (16/94 + 51 green + 391.57 kB; test:e2e:built 51); Testing Strategy rewritten to green state (remove F1/F2 porting checklist → historical note); Architecture tree 40 source files + 3 hooks + scrollspy wiring; Footer contract (M6); PageHero API `variant?: "dusk"\|"light"` + `fallback?` + no fetchPriority in PageHero (L5); tokens 26+2 (M4); `#mandarin` anchors; EventMeta mapping; `src.orig` absent / `skills` present; Validation Checklist rows refreshed |
| R3.3 | `README.md` | Tech-stack Testing row (16/94 green, setup present); E2E row (8 specs/51 green BSC, not stale); Architecture tree (57 src files, 3 hooks, favicon, Footer socials); File Hierarchy fixes (src.orig absent, skills present, robots.txt, test counts); Verify-Setup table (all six gates green incl. test:e2e + built); Troubleshooting rows for harness/E2E re-pinned; Current audits paragraph + round-13 |
| R3.4 | `blessed-sacrament-queenstown_SKILL.md` | §0 register re-pinned (tests 16/94 green; E2E 8 specs/51 green; src 57 files; tokens 26+2; hooks 3; src.orig policy = absent-from-repo; skills policy = present-tracked; build 391.57 kB; pre-push gate GREEN); frontmatter `project_state` + `verified`; §2 lucide 1.38.0 + doc-version 4.0.0 (L6); §3.1/§11 gate blocks green; §5.2 tree + heading (57 files, 3 hooks); §5.4 sixth anchor `#mandarin`; §5.5 PageHero row; §7.1 site.ts row de-fossilized (chineseName 圣体堂 / 1 Commonwealth Drive / Corpus Christi / no uen — replace the Risen fossils in that row); §12 L16 resolved-note; §13/§14 skills/src.orig bullets; ADR-6; App D.1/F.2/G.5 "as of" labels kept historical; Quick Ref rows |
| R3.5 | All four | Add round-13 audit + remediation + validation links (`docs/code-review-audit-round13-2026-09-01.md`, this file, `docs/validation-round13-2026-09-01.md`), bump "Current audits" (README) |

## Phase R4 — Validation + gate re-pin

| # | Task |
|---|---|
| R4.1 | Full five-gate run: `pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build` (+ `pnpm test:e2e:built`) — all green with the new guard tests |
| R4.2 | Fresh-clone simulation check: `git status` clean; `git ls-files` vs `.gitignore` empty intersection (R1.2 guard green) |
| R4.3 | Write `docs/validation-round13-2026-09-01.md` (before/after ledger, gate outputs) |
| R4.4 | Re-sweep: `rg` for stale strings across the four docs ("src.orig/ PRESENT", "deleted in worktree", "0 files / 0 tests", "25 colors", "language-communities", "YouTube", "1.34.0", "390.74") — every hit historical-labeled or fixed |

## Phase R5 — Commit + push

| # | Task |
|---|---|
| R5.1 | Conventional Commits, atomic: (1) `test: …docs-contract + repo-hygiene guards (R1)`, (2) `chore: untrack ignored artifacts + add robots.txt (R2)`, (3) `docs: re-pin AGENTS/CLAUDE/README/SKILL to verified BSC state (R3)`, (4) `docs: round-13 audit + remediation + validation (R4)` |
| R5.2 | Push via `skills/how-to-git-push-using-ssh-wrapper/scripts/ssh_git_wrapper_v3.py` + uploaded `ssh-key.txt`, target `main` (no new branches). Flag C1 rotation in the final report |

## Validation of this plan against the codebase (pre-flight, 2026-09-01)

- Every claim re-verified against a fresh clone at `e30e170` (ledger V1–V20): file counts, token counts, hooks, e2e inventory, footer contents, tracked-but-ignored paths, `src.orig`/`skills` state, byte-level CI trigger check.
- TDD order is sound: both guard tests reference only files that exist or are created in R2 (robots.txt) — RED phase will be run immediately after writing each test.
- No `src/` runtime code changes are required by any M/L finding except optional I1–I3 (deferred) — remediation is guards + repo hygiene + docs, keeping the diff surgical (change-sizing rule).
