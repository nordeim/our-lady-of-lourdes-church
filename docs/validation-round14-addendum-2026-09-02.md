# Validation Round 14 — Addendum (independent re-validation, 2026-09-02)

> **Scope:** independently re-verify every load-bearing claim in `docs/validation-round14-2026-09-02.md` against a clean checkout of `main` @ `6e0e991`, reproduce-or-refute each drift-ledger item, and re-run the gates round-14 skipped (`test:e2e`, `test:e2e:built`). Evidence-first; every verdict carries the command that produced it.

**Environment:** fresh `git pull` to `6e0e991` on `main`; pnpm 11.0.0 / Node ≥20; `chromium_headless_shell-1193` installed for Playwright 1.55.1. Working tree clean except an explicit `core.fileMode false` (the sandbox checks out 1359 files mode `100755` — byte content identical, `git diff` shows 0 insertions/deletions).

---

## 1. Gates — re-run at `6e0e991`

| Gate | Command | Result | Round-14 claim | Verdict |
|------|---------|--------|----------------|---------|
| lint | `pnpm lint` (`--max-warnings 0`) | **EXIT 0 / 0 warnings** | EXIT 0 | ✓ reproduced |
| typecheck | `pnpm typecheck` | **EXIT 0 / 0 errors** | EXIT 0 | ✓ reproduced |
| test | `pnpm test` | **17 files / 115 tests — 3 FAILED** (`src/docs-contract.test.ts` doc-pin assertions: CLAUDE / README / SKILL frontmatter must contain `17 files / 115 tests` — docs still say `16 files / 94`) | 17 files / 115 — 1 FAILED (src.orig existsSync) | ✗ **superseded** — commit `6e0e991` (shipped together with the round-14 doc) already (a) fixed L1 (Accordion fixture → 1 Commonwealth Drive), (b) retargeted the M4 guard to `git ls-files src.orig`, and (c) retargeted 3 doc-pin assertions to `17 files / 115 tests`. The doc's gate row describes the pre-`6e0e991` tree. Post-commit RED is the **3 unmet doc pins**, not src.orig. |
| build | `pnpm build` | **EXIT 0 — `dist/index.html` 391,565 B (391.57 kB, gzip 113.77 kB)** | 474,660 B (474.66 kB, gzip 125.95 kB) | ✗ **NOT REPRODUCED — M1 refuted** (see §2) |
| e2e dev | `pnpm test:e2e` | **51/51 passed (1.3m)** | not re-run in round-14 | ✓ L4 closed |
| e2e built | `pnpm test:e2e:built` | **51/51 passed (1.1m)** vs `vite preview` | not re-run in round-14 | ✓ L4 closed |

---

## 2. M1 dissection — the 474.66 kB claim is environment-contaminated

Round-14 §1/§4-M1 asserts the build "inflated" 391.57 → 474.66 kB and instructs re-pinning every doc to 474.66 kB. Three controlled experiments refute that:

| Experiment | Tree state | `dist/index.html` | gzip |
|------------|-----------|-------------------|------|
| A — clean checkout @ `6e0e991` | as committed | **391,565 B (391.57 kB)** | 113.77 kB |
| B — A + `src.orig/` on disk (full copy of `src/`, 58 files — replicating round-14 §2 "EXISTS on disk") | unchanged (`src.orig/` gitignored) | **391,565 B — byte-identical** | 113.77 kB |
| C — A with `@source not "../skills/**";` deleted from `src/index.css` | one-line CSS delta | **473,650 B (473.65 kB)** | 125.82 kB |

**Reading:** Tailwind v4 automatic source detection honors `.gitignore` — `src.orig/` contributes **zero** bytes (B). The entire +82 kB class of bloat is the `skills/` content scan that round-13 already fixed with the `@source not` guard (C reproduces round-13's R-1 exactly). Round-14's 474,660 B / 125.95 kB sits ~1 kB above C — consistent with a tree whose `src/index.css` predated (or lost) the `@source not` pin, plus minor extra scanned local content. **The committed source tree cannot produce 474.66 kB.** Re-pinning docs to an unreproducible number would be wrong; the correct remediation is a **build-size budget guard** (added this round, see remediation plan R-1) so the C-class regression fails CI loudly instead of being discovered on one machine.

---

## 3. Drift ledger — item-by-item re-verdict at `6e0e991`

| ID | Round-14 verdict | Re-verdict (evidence) |
|----|------------------|------------------------|
| M1 | build size stale → re-pin docs to 474.66 kB | **REFUTED** — §2 above; docs' 391.57 kB / 391,565 B is correct and byte-stable; add size-budget guard instead |
| M2 | SKILL §0 hooks = 2, code = 3 | **CONFIRMED** — `blessed-sacrament-queenstown_SKILL.md:50` (`**2** … **NO `useScrollSpy`**`) and `:465` (§6 header "Two hooks") vs `ls src/hooks` → 3; `README.md:124` ("2 files … no useScrollSpy") additionally stale; AGENTS:38 and CLAUDE:106/308 already correct |
| M3 | test counts stale (16/94 vs 17/115) | **CONFIRMED and sharpened** — stale `16 files / 94` (or `16/94`) in AGENTS ×3 (L22/33/61), CLAUDE ×7 (L61/164/225/293/347/410/451), README ×6 (L43/159/196/205/262/266), SKILL ×16 current-state (L5/12/13/43/59/152/170/181/364/658/700/714/729/1385/1626/1638); SKILL ×4 historical F1/labeled rows stay (L730/756/1391/1596). Guard expects `17 files / 115 tests` → 3 RED. With the R-1 size-budget check the green count becomes **17 files / 117 tests** — guard + docs move in the same commit |
| M4 | src.orig guard red (existsSync) | **ALREADY FIXED in `6e0e991`** — guard now `git ls-files src.orig` → `""`; `src.orig/` absent in this workspace; test green |
| M5 | README hooks tree stale + AGENTS "no favicon" | **PARTIAL** — README:124 confirmed stale (fixed with M2); AGENTS "(no favicon)" at L116 is inside the round-9 **historical** narrative (labeled, describes state at `8e4f811`) — no edit required; round-14 doc refs added to AGENTS Where-to-look-next / README Current audits instead |
| L1 | Toa Payoh fixture in Accordion test | **ALREADY FIXED in `6e0e991`** — fixture is `1 Commonwealth Drive, Singapore 149603` |
| L2 | route-count phrasing (18 tags vs 17 entries) | **CONFIRMED OPEN** — guard asserts 18 `<Route` + 17 `path="` (both pass); SKILL §0 Routes row gets the one-line footnote |
| L3 | SKILL §6 header vs body contradiction | **CONFIRMED OPEN** — L465 header "Two hooks … NO `useScrollSpy`" vs L469 "Contracts (BSC — 3 hooks)"; Appendix F.2 Hooks row (L1607) carries a labeled hop-4 snapshot — add a "restored F2A — see §0" marker to its Fix cell |
| L4 | e2e not re-run | **CLOSED** — 51/51 dev + 51/51 built (§1) |
| I1–I4 | informational | re-affirmed (skills/ tracked + tool-ignored; `public/` extras ship to `dist/`; images 11 all-local; src.orig absent here and untracked-by-guard) |

---

## 4. What the round-14 doc got right (verified without reservation)

- §2 inventory: 58 src files (40 + 17 + 1), `public/images/` 8, tokens 26 + 2 (incl. gold-700 / terracotta-600), 27 utilities + 8 keyframes, utils 4, routes 18 tags / 17 path entries, CSP `img-src 'self' data: blob:`, data arrays (priests 5 / ppc 6 / timeline 8 / grounds 3 / ministries 6 `mandarin` / faqs 6 / events 6 / giving 8 / images 11 / nav 6+10), parish constants — all reproduce (pinned by the passing `docs-contract` code invariants + `content`/`site` unit suites).
- §3 config sync: `vite.config.ts`, `tsconfig.json`, `eslint.config.js`, both Playwright configs, `index.html` CSP/OG/fonts, `ci.yml` trigger/steps — all match (ci-workflow guard 4/4).
- §5 aligned-list — no discrepancies found.
- The verdict "ALIGNED with drift" is fair; the amber-gate characterization was accurate at its timestamp and the prescribed fix order (§0 first, then sweep) is exactly what the remediation plan executes.

## 5. Addendum verdict

**Docs-vs-code drift at `6e0e991` is narrower than round-14 reports and different in kind:** one false positive (M1, refuted with byte-level evidence), two items already remediated by the round-14 commit itself (M4, L1), and one deliberate RED (M3's three doc pins) awaiting the docs re-pin. The pre-push gate is **amber**: lint 0 + typecheck 0 + build 391.57 kB + e2e 51/51 (dev & built) green; `pnpm test` red on the 3 doc-pin assertions only. Remediation plan: `docs/remediation-plan-round14-2026-09-02.md`.
