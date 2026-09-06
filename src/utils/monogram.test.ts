import { describe, expect, it } from "vitest";
import { monogram } from "@/utils/monogram";

describe("monogram", () => {
  it("strips Fr. honorific and MEP/HGN post-nominals", () => {
    expect(monogram("Fr Joachim A. M. Meneuvrier, MEP")).toBe("JM");
    expect(monogram("Rev Fr Leo Justin, HGN")).toBe("LJ");
    expect(monogram("Rev Fr Leo Justin HGN")).toBe("LJ");
  });

  it("strips Father/Rev. variants", () => {
    expect(monogram("Father John Doe")).toBe("JD");
    expect(monogram("Rev. Jane Smith")).toBe("JS");
  });

  it("handles names without honorifics", () => {
    expect(monogram("Esmond Chua")).toBe("EC");
    expect(monogram("Julian Mariaratnam")).toBe("JM");
  });

  it("handles single-word names", () => {
    expect(monogram("Francis")).toBe("FR");
    expect(monogram("OFM")).toBe("OF");
  });

  it("returns empty string for empty input", () => {
    expect(monogram("")).toBe("");
    expect(monogram("   ")).toBe("");
  });

  it("handles hyphenated and multi-word names", () => {
    expect(monogram("John-Paul Smith")).toBe("JS");
    expect(monogram("Mary Anne Lee")).toBe("ML");
  });

  it("strips Alphonsus Dominic correctly (OLOL parish priest)", () => {
    expect(monogram("Rev Fr Alphonsus Dominic")).toBe("AD");
    expect(monogram("Alphonsus Dominic")).toBe("AD");
  });
});
