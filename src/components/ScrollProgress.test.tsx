import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ScrollProgress } from "@/components/ScrollProgress";

/**
 * Round-2 contract: a GPU-friendly (transform-only) gold rail that mirrors
 * reading progress; invisible to assistive tech; scaleX(0) at rest.
 *
 * OLOL adaptation: dest uses an outer rail (data-testid="scroll-progress")
 * with an inner fill div that carries the scaleX transform (dest hook uses
 * document.documentElement.clientHeight, not window.innerHeight). Helper
 * therefore mocks both clientHeight and innerHeight so the test matches
 * either implementation without diverging from the 0.5 expectation.
 */
function setScrollMetrics(scrollY: number, scrollHeight: number, innerHeight: number) {
  Object.defineProperty(window, "scrollY", { value: scrollY, configurable: true });
  Object.defineProperty(document.documentElement, "scrollHeight", {
    value: scrollHeight,
    configurable: true,
  });
  Object.defineProperty(document.documentElement, "clientHeight", {
    value: innerHeight,
    configurable: true,
  });
  Object.defineProperty(window, "innerHeight", { value: innerHeight, configurable: true });
}

function getProgressFill(rail: HTMLElement): HTMLElement {
  // OLOL: outer rail is the labelled container; inner div carries the transform.
  // Fall back to rail itself for forward-compat if the structure is flattened.
  const inner = rail.firstElementChild as HTMLElement | null;
  return inner && inner.style.transform !== undefined && inner !== rail ? inner : rail;
}

describe("ScrollProgress", () => {
  it("renders hidden from assistive tech, collapsed at the top", () => {
    setScrollMetrics(0, 0, 0);
    render(<ScrollProgress />);
    const rail = screen.getByTestId("scroll-progress");
    expect(rail).toHaveAttribute("aria-hidden", "true");
    expect(getProgressFill(rail).style.transform).toBe("scaleX(0)");
  });

  it("advances scaleX with scroll depth", async () => {
    setScrollMetrics(0, 2000, 800);
    render(<ScrollProgress />);
    const rail = screen.getByTestId("scroll-progress");
    const fill = getProgressFill(rail);
    await waitFor(() => expect(fill.style.transform).toBe("scaleX(0)"));
    setScrollMetrics(600, 2000, 800);
    fireEvent.scroll(window);
    await waitFor(() => expect(getProgressFill(rail).style.transform).toBe("scaleX(0.5)"));
  });
});
