import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Link, MemoryRouter, Route, Routes } from "react-router-dom";
import { Layout } from "@/components/Layout";

/**
 * Round-16 Layout anchor-scroll cleanup contract (audit L1): the anchor effect
 * schedules `scrollIntoView` on an 80ms timer. When the route changes inside
 * that window, the effect cleanup must cancel the pending scroll — otherwise a
 * stale anchor scroll fires against the previous route (the resolver closure
 * already holds the old element).
 *
 * Real timers are used deliberately: ScrollProgress runs a requestAnimationFrame
 * loop, and fake timers stall it. The 150ms sleeps comfortably exceed the 80ms
 * scheduling window, so a surviving (uncancelled) timer always fires.
 *
 * OLOL port: worship anchors are #mass/#confession/#visit on /worship and
 * ministries anchors #liturgical/#faith-formation/#pastoral-care/#family-life/
 * #youth/#community on /ministries — both use the same double-hash
 * `#/path#anchor` form handled by Layout (split on "#", last segment is anchor).
 */
function WorshipStub() {
  return (
    <div>
      <div id="mass" data-testid="mass-target" />
      <Link to="/about">go-about</Link>
    </div>
  );
}

function AboutStub() {
  return <div>about-page</div>;
}

function renderRouting() {
  return render(
    <MemoryRouter initialEntries={["/worship"]}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/worship" element={<WorshipStub />} />
          <Route path="/about" element={<AboutStub />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

afterEach(() => {
  window.location.hash = "";
  vi.restoreAllMocks();
});

describe("Layout stale anchor-scroll cleanup (audit L1)", () => {
  it("cancels the pending anchor scroll when the route changes inside 80ms", async () => {
    const scrollSpy = vi.spyOn(Element.prototype, "scrollIntoView").mockImplementation(() => {});
    window.location.hash = "#/worship#mass";
    renderRouting();
    // fireEvent is synchronous, guaranteeing navigation inside the 80ms window
    // (userEvent adds pointer delays that can exceed 80ms under load).
    fireEvent.click(screen.getByRole("link", { name: "go-about" }));
    await sleep(150);
    expect(scrollSpy).not.toHaveBeenCalled();
    expect(screen.getByText("about-page")).toBeTruthy();
  });

  it("still scrolls to the anchor when no navigation interferes", async () => {
    const scrollSpy = vi.spyOn(Element.prototype, "scrollIntoView").mockImplementation(() => {});
    window.location.hash = "#/worship#mass";
    renderRouting();
    await sleep(150);
    expect(scrollSpy).toHaveBeenCalledTimes(1);
  });
});
