# Round 18 Execution Report — Mobile Navigation Integrity (2026-09-02)

**Plan:** `docs/remediation-plan-round18-2026-09-02.md` · **Audit:** `docs/code-review-audit-round18-2026-09-02.md`
**Method:** TDD (Red → Green) per `skills/tdd` + `skills/test-driven-development`; verification per `skills/verification-and-review-protocol`. All work on `main`. Package 1.5.0 → **1.5.1** (patch: bug fixes only).

---

## ToDo completion

- [x] **T1 — E2E RED:** `e2e/mobile-navigation.spec.ts` added (8 contracts at 390×844). Verified RED before the fix: 5 failed / 2 passed (F1 geometry ×2, F2 toggle race, F3 label-tap, F5 Give missing; the two then-working behaviours — link-tap navigate+close, outside-tap close — passed as predicted).
- [x] **T2 — Unit RED:** `Header.test.tsx` extended (+5). Verified RED: 4 failed / 1 passed (F1 structural guard, F2 race, F3 label-tap, F5 Give failed; child-link-close passed as predicted).
- [x] **T3 — Fix F1 (High):** drawer hoisted out of `<header>` as a fragment sibling in `src/components/Header.tsx` — `fixed inset-y-0` now resolves against the viewport instead of the backdrop-filtered header. Verified: drawer bounding box 844/844 px at 390×844 (was 68/844); all 13 links inside the drawer box.
- [x] **T4 — Fix F2 (Medium):** outside-click handler returns early when the pointerdown target is inside the hamburger (`hamburgerRef.current?.contains(target)`) — mirrors queenstown's toggle guard. Verified: atomic pointerdown+click on the hamburger ends with the drawer closed (unit + browser-level `page.evaluate` contract).
- [x] **T5 — Fix F3 (Medium):** drawer-root `onClickCapture` closes only when the tap target is inside an `<a>`; parent category labels (About/Worship/Ministries) and the drawer heading no longer dismiss the menu. Verified in unit + built artifact.
- [x] **T6 — Fix F5 (Low):** Give CTA appended to the drawer (gold-300 link after a `border-bsc-cream/10` divider, staggered entrance). Verified: link present, visible, inside the drawer box.
- [x] **T7 — Full gates green:** `pnpm lint` 0 · `pnpm typecheck` 0 · `pnpm test` 26 files / **149/149** · `pnpm test:e2e` **59/59** · `pnpm build` 467.72 kB.
- [x] **T8 — Built artifact + browser re-audit:** `pnpm test:e2e:built` **59/59**; `vite preview` + agent-browser at 390×844: drawer full-height with 13 links (incl. Give), label-tap keeps it open, drawer X closes it, outside-tap closes, console clean, no page errors.
- [x] **T9 — Docs alignment:** README/AGENTS/CLAUDE re-pinned to measured state (26 files / 149 unit, 9 spec files / 59 E2E incl. `mobile-navigation` 8, gate lines, version badge 1.5.1, `docs-contract` version pin updated, Header component description + success-metrics bullets now describe the round-18 contracts); this report written.
- [x] **T10 — Commits (main only):** atomic, conventional-commit style, every pushed commit gate-green.
- [x] **T11 — Push:** SSH wrapper (`skills/how-to-git-push-using-ssh-wrapper/scripts/ssh_git_wrapper_v3.py`) with the owner key; `origin/main` in sync after push.

## Plan-validation notes (deviations and why)

- **F2's user-facing severity was downgraded during execution — honestly reclassified.** In the real UI the open drawer (320 px sheet, `z-50`) fully overlays the hamburger on phone widths, so the pointerdown/click race was not reachable by an ordinary tap; the drawer's own X button, Escape, outside-tap and link-tap are the actual close paths. The first E2E draft tried to click the covered hamburger and timed out in Playwright's hit-target check — which *is* the proof of occlusion. The race remains real in the component logic (guarded now, matching queenstown) and is pinned by the unit test + a browser-level `page.evaluate` contract; the E2E asserts the real close paths instead. F2's fix is kept as robustness hardening, not a user-visible repair.
- **T2 unit selector:** `getByRole("button", { name: "Close menu" })` matches twice while the drawer is open (hamburger + drawer's own X); the test selects the hamburger via `expanded: true`. Raw `dispatchEvent`/`click` are wrapped in `act()` because React 18+ defers updates from non-React events.
- No other deviations: no new hooks (docs-contract still pins exactly 3), no token/utility changes (33+2 / 30+9 intact), no asserted copy changes (all 51 pre-existing E2E still green), single spec file added to `e2e/`.

## Verification ledger

| Gate / check | Command | Result |
|---|---|---|
| Lint | `pnpm lint` | 0 errors, 0 warnings |
| Types | `pnpm typecheck` | 0 errors |
| Unit | `pnpm test` | 26 files / 149 tests passed |
| E2E (dev) | `pnpm test:e2e` | 59/59 passed (51 prior + 8 round-18) |
| E2E (built) | `pnpm test:e2e:built` | 59/59 passed |
| Build | `pnpm build` | dist/index.html 467.72 kB |
| Browser re-audit | agent-browser @ 390×844 vs `vite preview` | drawer 844/844 px, 13 links contained, label-tap keeps open, X closes, outside-tap closes, console clean |
| RED evidence | `pnpm test:e2e -- mobile-navigation` (pre-fix) | 5 failed / 2 passed |
| RED evidence | `pnpm test -- Header` (pre-fix) | 4 failed / 1 passed |
| Docs pins | `pnpm test` (`docs-contract`) | version 1.5.1 + inventory invariants green |

## What was intentionally not done

- Live-host redeploy: the jesspete.shop host is deployed by the owner's pipeline (Cloudflare Pages per `_headers`/CSP); this round ships the remediated source + green gates to `origin/main`. Until redeploy, the live site still exhibits F1.
- Informational items I1–I3 from the audit (child descriptions in the desktop dropdown, emblem-led brand block) — content/design-owner decisions, not defects; not scheduled.
