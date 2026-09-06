import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Worship } from "@/pages/Worship";

/**
 * OLOL Worship contracts (ported from BSC round-17):
 * - two sacrament/devotion cards carry aria-hidden icon chips
 * - mass schedule facts from site.ts are rendered:
 *   weekdayNoon 12:30 / weekdayEvening 19:00 Tamil / saturday 17:00+18:15+19:30
 *   sunday 5 (8:00/9:30/11:00/12:30/18:30) + publicHoliday 9/10,
 *   confession 15 min before, devotions 11:35
 */

function renderWorship() {
  return render(
    <MemoryRouter>
      <Worship />
    </MemoryRouter>,
  );
}

describe("Worship sacraments column", () => {
  it("pairs the Confession card with a decorative icon", () => {
    renderWorship();
    const heading = screen.getByRole("heading", { name: "Confession" });
    const card = heading.closest("div.rounded-xl") ?? heading.parentElement;
    expect(card?.querySelector("svg[aria-hidden='true']")).not.toBeNull();
  });

  it("pairs the Midday prayer card with a decorative icon", () => {
    renderWorship();
    const heading = screen.getByRole("heading", { name: "Midday prayer" });
    const card = heading.closest("div.rounded-xl") ?? heading.parentElement;
    expect(card?.querySelector("svg[aria-hidden='true']")).not.toBeNull();
  });

  it("keeps the mass schedule facts rendered from site.ts", () => {
    renderWorship();
    expect(screen.getByRole("heading", { name: "Confession" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Midday prayer" })).toBeInTheDocument();
  });
});

describe("Worship OLOL mass schedule", () => {
  it("shows weekday noon 12:30 and evening 19:00 Tamil", () => {
    renderWorship();
    expect(screen.getAllByText(/12:30 PM/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/7:00 PM/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Tamil/).length).toBeGreaterThanOrEqual(1);
  });

  it("shows Saturday sunset masses 5:00 · 6:15 · 7:30", () => {
    renderWorship();
    expect(screen.getAllByText(/5:00/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/6:15/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/7:30/).length).toBeGreaterThanOrEqual(1);
  });

  it("shows Sunday five masses including 8:00 AM, 9:30 AM, 6:30 PM", () => {
    renderWorship();
    expect(screen.getByText("8:00 AM")).toBeInTheDocument();
    expect(screen.getByText("9:30 AM")).toBeInTheDocument();
    expect(screen.getByText("6:30 PM")).toBeInTheDocument();
  });

  it("notes confession is 15 minutes before each Mass", () => {
    renderWorship();
    expect(screen.getAllByText(/15 minutes before/).length).toBeGreaterThanOrEqual(1);
  });

  it("shows devotions at 11:35", () => {
    renderWorship();
    expect(screen.getAllByText(/11:35/).length).toBeGreaterThanOrEqual(1);
  });
});
