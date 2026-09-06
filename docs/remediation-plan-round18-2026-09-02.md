# Remediation Plan — Round 18 (2026-09-02): Mobile Navigation Integrity

**Source audit:** `docs/code-review-audit-round18-2026-09-02.md` (comparative live-browser audit vs `blessed-sacrament-queenstown`).
**Approach:** TDD (Red → Green → Refactor) per repo skills `tdd` / `tdd-workflow`; plan shape per `plan-writing`; verification per `verification-and-review-protocol` (Iron Law: evidence before claims). No new branch — all work on `main`.
**Non-goals:** no new colors/tokens/utilities (33+2 / 30+9 budget stays), no copy changes to asserted strings, no route or nav-data-shape changes, no new dependencies, no new hooks (docs-contract pins exactly 3), no redesign of the drawer's visual language.

---

## Goal

Restore a fully usable mobile primary navigation: the drawer opens to full viewport height with every item reachable, the hamburger toggles it reliably, taps behave contextually, and the Give CTA is present — with regression tests that make each defect un-reintroducible.

## Tasks

- [ ] **T1 — E2E RED:** add `e2e/mobile-navigation.spec.ts` (390×844): drawer ≥ 90% viewport height; all links (incl. last, "Serve") visible inside the viewport; hamburger pointerdown+click closes; parent-label tap does not close; link tap navigates + closes; outside tap closes; Give link present. Verify the suite **fails** against current code (RED). → Verify: `pnpm test:e2e -- --project=chromium e2e/mobile-navigation.spec.ts` reports failures for the drawer-contract assertions.
- [ ] **T2 — Unit RED:** extend `src/components/Header.test.tsx`: (a) drawer renders **outside** the `<header>` element (containing-block guard — the structural invariant whose violation caused F1); (b) pointerdown-then-click on the hamburger ends with the drawer closed; (c) clicking a parent label span does not close the drawer; (d) clicking a child link closes it; (e) Give link present in the drawer. Verify these **fail** (RED). → Verify: `pnpm test -- Header` shows new failures.
- [ ] **T3 — Fix F1 (High):** in `src/components/Header.tsx`, hoist the mobile drawer out of `<header>` — return a fragment with `<header>…</header>` followed by the conditional drawer as a sibling, so `fixed inset-y-0` resolves against the viewport (no `backdrop-filter` ancestor). Keep role=dialog/aria-modal/focus-trap/Escape/outside-click/focus-restore wiring intact. → Verify: T1 height/visibility assertions pass.
- [ ] **T4 — Fix F2 (Medium):** outside-click handler gains the toggle guard `if (hamburgerRef.current?.contains(target)) return;` (mirrors queenstown). → Verify: T2b passes.
- [ ] **T5 — Fix F3 (Medium):** drawer-root click becomes `onClickCapture={(e) => { if ((e.target as HTMLElement).closest("a")) setMobileOpen(false); }}`. → Verify: T2c/T2d pass.
- [ ] **T6 — Fix F5 (Low):** append a `Give` link (`/give`, gold tone) as the drawer's final item. → Verify: T2e + T1 Give assertion pass.
- [ ] **T7 — GREEN + full gates:** `pnpm lint` 0 · `pnpm typecheck` 0 · `pnpm test` all green (144 + new) · `pnpm test:e2e` 51 + new green · `pnpm build` succeeds. → Verify: all five gates green.
- [ ] **T8 — Built-artifact + browser re-audit:** `pnpm test:e2e:built` green; re-open local preview at 390×844 with agent-browser: screenshot drawer open (full height), hamburger closes, label-tap doesn't close, Give present, no console errors. → Verify: screenshots + clean console.
- [ ] **T9 — Docs alignment:** package `1.5.0 → 1.5.1` (patch: bug fixes) incl. `src/docs-contract.test.ts` version pin; re-measure and re-pin counts in `README.md`, `AGENTS.md`, `CLAUDE.md` (unit file/test counts, E2E spec count 8 → 9, test totals, gate lines, version badge); add round-18 entries; write `docs/remediation-round18-2026-09-02.md` execution report. → Verify: `pnpm test` docs-contract green; `grep` pins match measured values.
- [ ] **T10 — Commit (main only, atomic):** (1) `test(e2e): mobile drawer contracts at phone viewport` + unit guards, RED state never pushed — combine with fix commit to keep every pushed commit gate-green per repo contract: single `fix(header): restore full-height mobile drawer + toggle/outside-click/label contracts (round-18 F1–F5)` including T1–T6 tests+fix; (2) `chore(release): 1.5.1 + docs re-pin (round-18)`. → Verify: `git log` shows 2 atomic commits, both gate-green.
- [ ] **T11 — Push via SSH wrapper:** `git remote set-url origin git@github.com:nordeim/blessed-sacrament-church.git`; push with `GIT_SSH_COMMAND="…/ssh_git_wrapper_v3.py -i <key> -o StrictHostKeyChecking=accept-new" git push origin main`; verify `git status -sb` shows no ahead/behind. → Verify: wrapper success output + `origin/main` sync.

## Done When

- [ ] At 390×844 the drawer fills the viewport and every nav item (incl. Give) is visible and tappable
- [ ] Hamburger open/close works on the atomic pointerdown+click sequence; Escape, outside-click, link-tap and focus-restore contracts unchanged
- [ ] Parent-label taps no longer dismiss the drawer
- [ ] All five gates green; E2E suite includes mobile-viewport drawer contracts (red before fix, green after)
- [ ] Docs + version re-pinned to measured state; execution report written
- [ ] Two atomic commits on `main` pushed to `origin` via the SSH wrapper

## Notes

- Root cause F1 is the CSS containing block created by `backdrop-filter` on the header — the fix relocates the drawer in the JSX tree; no CSS token/utility changes are needed or made.
- jsdom cannot reproduce layout/containing-block behaviour, so F1's regression guard is layered: a unit-level structural assertion (drawer is not a `<header>` descendant — the violated precondition) plus the authoritative Playwright geometry assertions at a real mobile viewport.
- Deployment of the live host is the owner's pipeline (Cloudflare Pages); this round ships the remediated source + verified gates to `origin/main`.
