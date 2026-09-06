import { describe, expect, it, vi, afterEach } from "vitest";
import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Header } from "@/components/Header";

/**
 * OLOL Header a11y contract (ported from BSC round-16):
 * - hamburger carries a stateful accessible name ("Open menu"/"Close menu")
 *   alongside aria-expanded;
 * - Escape anywhere dismisses an open desktop dropdown;
 * - mobile drawer is a modal dialog and returns focus to the hamburger
 *   when closed; outside pointerdown closes it (ignoring the toggle).
 * Parish copy updated to OLOL: 50 Ophir Road, 11 February / Our Lady of Lourdes.
 */
function renderHeader() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <Header />
    </MemoryRouter>,
  );
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Header hamburger stateful label", () => {
  it('reads "Open menu" when closed and "Close menu" when open', async () => {
    const user = userEvent.setup();
    renderHeader();
    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await user.click(toggle);
    const hamburger = screen
      .getAllByRole("button", { name: "Close menu" })
      .find((b) => b.getAttribute("aria-expanded") !== null);
    expect(hamburger).toBeTruthy();
    expect(hamburger).toHaveAttribute("aria-expanded", "true");
  });
});

describe("Header desktop dropdown Escape", () => {
  it("closes an open dropdown when Escape is pressed anywhere", async () => {
    const user = userEvent.setup();
    renderHeader();
    await user.hover(screen.getByRole("button", { name: /About/i }));
    expect(screen.getByText("Our parish, our priests, and our story")).toBeTruthy();
    await user.keyboard("{Escape}");
    expect(screen.queryByText("Our parish, our priests, and our story.")).toBeNull();
  });
});

describe("Header mobile drawer modal contract", () => {
  it("opens a dialog, and closing it restores focus to the hamburger", async () => {
    const user = userEvent.setup();
    renderHeader();
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const drawer = screen.getByRole("dialog", { name: "Site menu" });
    expect(drawer).toHaveAttribute("aria-modal", "true");
    await waitFor(() => expect(drawer).toHaveFocus());
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog", { name: "Site menu" })).toBeNull();
    await waitFor(() =>
      expect(document.activeElement).toBe(screen.getByRole("button", { name: "Open menu" })),
    );
  });
});

describe("Header mobile drawer — modal contracts", () => {
  it("renders the drawer outside the <header> element (containing-block guard)", async () => {
    const user = userEvent.setup();
    const { container } = renderHeader();
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const drawer = screen.getByRole("dialog", { name: "Site menu" });
    expect(drawer.closest("header")).toBeNull();
    expect(container.querySelector("header")?.contains(drawer)).toBe(false);
  });

  it("closes when the hamburger receives pointerdown followed by click", async () => {
    const user = userEvent.setup();
    renderHeader();
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("dialog", { name: "Site menu" })).toBeInTheDocument();
    const hamburger = screen.getByRole("button", { name: "Close menu", expanded: true });
    act(() => {
      hamburger.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true, composed: true }));
      hamburger.click();
    });
    expect(screen.queryByRole("dialog", { name: "Site menu" })).toBeNull();
  });

  it("keeps the drawer open when a parent category label is clicked", async () => {
    const user = userEvent.setup();
    renderHeader();
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const drawer = screen.getByRole("dialog", { name: "Site menu" });
    await user.click(within(drawer).getByText("About", { exact: true }));
    expect(screen.getByRole("dialog", { name: "Site menu" })).toBe(drawer);
  });

  it("closes the drawer when a child link is clicked", async () => {
    const user = userEvent.setup();
    renderHeader();
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.click(
      within(screen.getByRole("dialog", { name: "Site menu" })).getByRole("link", {
        name: "The Parish",
      }),
    );
    expect(screen.queryByRole("dialog", { name: "Site menu" })).toBeNull();
  });

  it("offers the Give CTA in the drawer", async () => {
    const user = userEvent.setup();
    renderHeader();
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const drawer = screen.getByRole("dialog", { name: "Site menu" });
    expect(within(drawer).getByRole("link", { name: "Give" })).toHaveAttribute("href", "/give");
  });
});

describe("Header OLOL parish copy", () => {
  it("shows 50 Ophir Road in the top bar", () => {
    renderHeader();
    expect(screen.getByText(/50 Ophir Road/)).toBeInTheDocument();
  });

  it("shows the feast name Our Lady of Lourdes in the top bar", () => {
    renderHeader();
    expect(screen.getAllByText(/Our Lady of Lourdes/).length).toBeGreaterThanOrEqual(1);
  });
});
