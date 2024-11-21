/**
 * @file tests/utils/random.test.js
 * @description Tests for random utility functions.
 */

const {
  randomInt,
  randomVariable,
  randomBool,
  randomElement,
} = require("../../src/utils/random");

describe("randomInt", () => {
  it("should generate a random integer between min and max (inclusive)", () => {
    const min = 1;
    const max = 10;
    const result = randomInt(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });

  it("should exclude zero if noZero is true", () => {
    const min = -5;
    const max = 5;
    const result = randomInt(min, max, true);
    expect(result).not.toBe(0);
  });

  it("should include zero if noZero is false", () => {
    const min = -5;
    const max = 5;
    const results = new Set();
    for (let i = 0; i < 1000; i++) {
      results.add(randomInt(min, max));
    }
    expect(results.has(0)).toBe(true);
  });

  it("should handle negative ranges correctly", () => {
    const min = -10;
    const max = -1;
    const result = randomInt(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });

  it("should handle single value range correctly", () => {
    const min = 5;
    const max = 5;
    const result = randomInt(min, max);
    expect(result).toBe(5);
  });
});

describe("randomVariable", () => {
  it("should generate a random lowercase letter", () => {
    const result = randomVariable();
    expect(result).toMatch(/^[a-z]$/);
  });

  it("should generate a random uppercase letter when isUpperCase is true", () => {
    const result = randomVariable(true);
    expect(result).toMatch(/^[A-Z]$/);
  });

  it("should generate different letters on multiple calls", () => {
    const results = new Set();
    for (let i = 0; i < 100; i++) {
      results.add(randomVariable());
    }
    expect(results.size).toBeGreaterThan(1);
  });

  it("should generate different uppercase letters on multiple calls", () => {
    const results = new Set();
    for (let i = 0; i < 100; i++) {
      results.add(randomVariable(true));
    }
    expect(results.size).toBeGreaterThan(1);
  });
});

describe("randomBool", () => {
  it("should return a boolean value", () => {
    const result = randomBool();
    expect(typeof result).toBe("boolean");
  });

  it("should return true or false", () => {
    const results = new Set();
    for (let i = 0; i < 1000; i++) {
      results.add(randomBool());
    }
    expect(results.has(true)).toBe(true);
    expect(results.has(false)).toBe(true);
  });

  it("should return true approximately 50% of the time", () => {
    let trueCount = 0;
    const iterations = 10000;
    for (let i = 0; i < iterations; i++) {
      if (randomBool()) {
        trueCount++;
      }
    }
    const truePercentage = (trueCount / iterations) * 100;
    expect(truePercentage).toBeGreaterThan(45);
    expect(truePercentage).toBeLessThan(55);
  });
});

describe("randomElement", () => {
  it("should return an element from the array", () => {
    const array = [1, 2, 3, 4, 5];
    const result = randomElement(array);
    expect(array).toContain(result);
  });

  it("should return undefined for an empty array", () => {
    const array = [];
    const result = randomElement(array);
    expect(result).toBeUndefined();
  });

  it("should return the only element for a single-element array", () => {
    const array = [42];
    const result = randomElement(array);
    expect(result).toBe(42);
  });

  it("should return different elements on multiple calls", () => {
    const array = ["a", "b", "c", "d", "e"];
    const results = new Set();
    for (let i = 0; i < 100; i++) {
      results.add(randomElement(array));
    }
    expect(results.size).toBeGreaterThan(1);
  });

  it("should handle arrays with different types of elements", () => {
    const array = [1, "two", { three: 3 }, [4], null];
    const result = randomElement(array);
    expect(array).toContain(result);
  });
});
