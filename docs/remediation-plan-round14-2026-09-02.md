# Remediation Plan — Round 14 (2026-09-02) — docs re-pin + build-size guard (TDD)

> **Input:** `docs/validation-round14-2026-09-02.md` as independently re-verified by `docs/validation-round14-addendum-2026-09-02.md` (evidence for every accept/reject decision below).
> **Method:** TDD — the `docs-contract` guard is the failing test suite. Retarget + extend the guard **first** (RED), then re-pin the four docs (GREEN), then full gate re-run. No `src/` behavior change; the only src edits are the guard file itself. Single branch: `main`.
> **Scope guard:** historical, `as of`-labeled statements (SKILL L730/756/1391/1596, AGENTS round-9 narrative, README historical audits) stay untouched by design (guard header: "Historical, as-of-labeled appendix statements are out of scope").

---

## A. ToDo list

### R-1 — guard: build-size budget (round-14 §6.6; M1-class protection) — `src/docs-contract.test.ts`
- [x] New describe `code invariants — built artifact budget`:
  - if `dist/index.html` exists → assert `statSync(dist).size < 420 * 1024` (391,565 B today; the 473,650 B skills-scan bloat must fail loudly)
  - if `dist/` absent (fresh clone / CI test phase precedes build) → return (vacuous pass; the budget still bites on every pre-push local run and `test:e2e:built` flow)
- [x] Ledger comment citing addendum §2 (391,565 B clean / 473,650 B without `@source not "../skills/**"`)

### R-2 — guard: retarget doc-pin strings — `src/docs-contract.test.ts`
- [x] 3 × `"17 files / 115 tests"` → `"17 files / 117 tests"` (CLAUDE / README / SKILL-frontmatter pins) — R-1 + the R-2 hooks pin make the true total 117 (115 + 2 new checks; guard file carries 22 `it()` blocks)
- [x] New doc contracts (M2 regression pins): SKILL must **not** contain `` NO `useScrollSpy` `` and must contain `Three hooks`; README must **not** contain `no useScrollSpy` and must contain `useScrollSpy`

### R-3 — docs re-pin: test counts → `17 files / 117 tests` (M3; sweep per Appendix G.4)
- [x] `AGENTS.md` L22, L28, L33, L61, L99
- [x] `CLAUDE.md` L61, L164, L187, L189, L225, L269, L293, L347, L410, L451
- [x] `README.md` L43, L124, L159, L196, L205, L262, L266
- [x] `blessed-sacrament-queenstown_SKILL.md` current-state rows: L5, L12, L13, L43, L59, L152, L170, L181, L364, L658, L700, L714, L729, L1385, L1626, L1638 + §0 as-of label (L39 → 2026-09-02)
- [x] SKILL guard-count strings: L195 `(round-13, 20)` → `(round-13/14, 22)`, L723 `20 checks` → `22 checks`, L802 `(20)` → `(22)`

### R-4 — docs: hooks truth (M2 / L3)
- [x] SKILL §0 Hooks row (L50) → `**3** — useScrolled, useScrollProgress, useScrollSpy (restored F2A — drives the Ministries pill aria-current)`
- [x] SKILL §6 header (L465) → `Three hooks — scrollspy restored F2A (see §0)`
- [x] README file-tree hooks line (L124) → `3 files — useScrolled + useScrollProgress + useScrollSpy (restored F2A)`
- [x] SKILL Appendix F.2 Hooks row Fix cell (L1607) → `restored F2A (see §0)` (row remains a labeled hop-4 snapshot)

### R-5 — docs: route-count footnote (L2)
- [x] SKILL §0 Routes row (L52) → append `(18 `<Route>` tags incl. the Layout wrapper — 17 path entries)`

### R-6 — docs: round-14 references + verified-date bump (round-14 §6.5)
- [x] README Current audits (L159) → append round-14 sentence (validation doc + addendum + plan; M1 rejected with evidence; gates re-run)
- [x] AGENTS Where-to-look-next (after L123–125) → add the three round-14 doc entries
- [x] SKILL L13 `verified:` → `(re-verified 2026-09-02, round-14)` with 17/117 + e2e 51/51 both suites + build 391.57kB

### R-7 — explicit non-actions (rejected findings)
- [x] **M1 rejected** — do NOT re-pin any build-size string to 474.66 kB; all `391.57 kB` / `391565` pins stay (addendum §2: clean build is byte-identical; 473,650 B reproduces only without the `@source not` skills exclusion)
- [x] Historical/labeled strings keep `16/94` (SKILL L730/756/1391/1596) and AGENTS round-9 "(no favicon)" narrative stays

### R-8 — gates + record
- [x] `pnpm lint && pnpm typecheck && pnpm test` → **17 files / 117 tests, 0 failed**
- [x] `pnpm build` → `dist/index.html` **391,565 B** (byte-stable) → size-budget guard green
- [x] `pnpm test:e2e` + `pnpm test:e2e:built` → **51/51 each**
- [x] Execution log (§C) written with real outputs; commit to `main`; push via SSH wrapper

---

## B. Plan re-validation (pre-execution alignment check)

| Plan item | Target string verified in tree? | Evidence |
|-----------|--------------------------------|----------|
| R-1 | `dist/index.html` = 391,565 B at HEAD build | addendum §2 exp. A |
| R-2 | guard contains exactly 3 × `"17 files / 115 tests"` (L186/192/201); `` NO `useScrollSpy` `` exists only at SKILL L50 + L465; `no useScrollSpy` only at README L124 | `rg` sweeps (worklog Task 2) |
| R-3 | stale counts at the lines listed by the `rg` sweep (`16 files / 94` / `16/94` current-state hits in the four docs; stubs clean). Initial sweep: 32 lines; the re-pin script's hard-assert post-conditions caught 5 more truncated by `head`-limited greps (AGENTS L28/L99, CLAUDE L187/L189/L269) — final total 47 line-edits + 2 anchor insertions | `rg -c` per file + script post-checks (§C.2) |
| R-4 | SKILL L50/L465/L1607 + README L124 strings confirmed | addendum §3 M2/L3 rows |
| R-5 | SKILL L52 row confirmed; guard pins 18 `<Route` / 17 `path="` | docs-contract L86–91 |
| R-6 | README L159 + AGENTS L101–125 sections located | `rg -n "Current audits|Where to look next"` |
| R-7 | build-size pins (`391.57`/`391565`) intact at AGENTS/README/CLAUDE/SKILL | `rg -n "391.57\|391,565\|391565"` sweep |

**Alignment verdict:** every planned edit maps 1:1 onto a verified stale string or a guard recommendation from round-14/addendum; no edit touches `src/` behavior, CI workflow, or data. Plan is aligned — execute.

---

## C. Execution log (TDD)

### C.1 RED — guard retargeted/extended first (R-1 + R-2)
- `src/docs-contract.test.ts`: added built-artifact-budget describe (+1 check) and a combined README/SKILL scrollspy doc-contract (+1 check) — 20 → **22 checks**; retargeted 3 doc pins to `17 files / 117 tests`.
- `pnpm test` → **17 files / 117 tests — 4 failed / 113 passed**, all four inside `doc contracts` (CLAUDE count pin, README count pin, SKILL-frontmatter count pin, README/SKILL scrollspy pin). RED confirms the guards bind the docs, not the code; every code invariant (files, tokens, hooks, routes, e2e inventory, budget) already green.
- Mid-execution catch: the plan originally projected one new check (→116). The hooks pin made it two (→117); all pins were re-targeted 116 → 117 via `scripts/repin_round14b.py` before the docs sweep was declared green — the final committed number matches the runner exactly.

### C.2 GREEN — docs re-pin (R-3..R-6)
- Edits applied via persisted script `scripts/repin_round14.py` (line-targeted replacements with hard asserts + idempotent post-conditions; build-size strings untouched) and the 116→117 correction sweep via `scripts/repin_round14b.py`.
- The script's post-conditions caught 5 stale lines the initial `rg` sweep had truncated (AGENTS L28/L99, CLAUDE L187/L189/L269) — all re-pinned before GREEN.
- `pnpm test` → **17 files / 117 tests — 0 failed** (see §C.3 gate table).

### C.3 Final gate outputs (post-remediation)

| Gate | Result |
|------|--------|
| `pnpm lint` | EXIT 0 — 0 warnings |
| `pnpm typecheck` | EXIT 0 — 0 errors |
| `pnpm test` | **17 files / 117 tests — all green** (`docs-contract` 22 + `repo-hygiene` 4 + `ci-workflow` 4 + BSC suite 87) |
| `pnpm build` | EXIT 0 — `dist/index.html` **391.57 kB (391,565 B)**, gzip 113.77 kB — budget guard green |
| `pnpm test:e2e` | **51/51 passed** (dev) |
| `pnpm test:e2e:built` | **51/51 passed** (built artifact) |

### C.4 Commits (main only — no new branches)
1. `test+docs: round-14 remediation — build-size budget guard, doc-pins to 17/117, hooks truth, route footnote, round-14 refs`
2. `docs: round-14 addendum (M1 refuted with byte-level evidence) + remediation plan/execution record`

Pushed to `https://github.com/nordeim/blessed-sacrament-queenstown.git` `main` via `ssh_git_wrapper_v3.py` + deployed key.
