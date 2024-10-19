const formatSigned = require("../../src/utils/formatSigned");

/**
 * @file tests/utils/formatSigned.test.js
 * @description Tests for formatSigned utility function.
 */

describe("formatSigned", () => {
  it("formats positive number at start", () => {
    expect(formatSigned(5, true)).toBe("5");
  });

  it("formats negative number at start", () => {
    expect(formatSigned(-5, true)).toBe("-5");
  });

  it("formats zero at start", () => {
    expect(formatSigned(0, true)).toBe("0");
  });

  it("formats positive number not at start", () => {
    expect(formatSigned(5)).toBe("+ 5");
  });

  it("formats negative number not at start", () => {
    expect(formatSigned(-5)).toBe("- 5");
  });

  it('formats zero with zeroSign "none"', () => {
    expect(formatSigned(0)).toBe("");
  });

  it('formats zero with zeroSign "plus"', () => {
    expect(formatSigned(0, false, "plus")).toBe("+ 0");
  });

  it('formats zero with zeroSign "minus"', () => {
    expect(formatSigned(0, false, "minus")).toBe("- 0");
  });

  it("formats positive string number with character", () => {
    expect(formatSigned("3i")).toBe("+ 3i");
  });

  it("formats negative string number with character", () => {
    expect(formatSigned("-2x")).toBe("- 2x");
  });

  it("formats positive string number with character at start", () => {
    expect(formatSigned("3i", true)).toBe("3i");
  });

  it("formats negative string number with character at start", () => {
    expect(formatSigned("-2x", true)).toBe("-2x");
  });

  it("formats zero string number with character at start", () => {
    expect(formatSigned("0z", true)).toBe("0z");
  });

  it('formats zero string number with character and zeroSign "none"', () => {
    expect(formatSigned("0z")).toBe("");
  });

  it('formats zero string number with character and zeroSign "plus"', () => {
    expect(formatSigned("0z", false, "plus")).toBe("+ 0z");
  });

  it('formats zero string number with character and zeroSign "minus"', () => {
    expect(formatSigned("0z", false, "minus")).toBe("- 0z");
  });
});
