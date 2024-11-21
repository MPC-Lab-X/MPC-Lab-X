/**
 * @file tests/generators/math/algebra/exponents-and-logarithms/exponent-rules/fractionalExponents.test.js
 * @description Tests for the fractional exponents problem generator.
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/exponents-and-logarithms/exponent-rules/fractionalExponents");

describe("generateProblem", () => {
  it("generates a problem with a variable base", () => {
    const options = {
      isMCQ: false,
      baseRange: { min: 2, max: 5 },
      numeratorExponentRange: { min: 2, max: 3 },
      denominatorExponentRange: { min: 2, max: 3 },
      withVariable: true,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).toMatch(
      /[a-z]\^\{\\frac{\d+}{\d+}\}|\\sqrt\[\d+\]\{[a-z]\^\{\d+\}\}/
    );
    expect(problem.solution[0].value).toMatch(
      /[a-z]\^\{\\frac{\d+}{\d+}\}|\\sqrt\[\d+\]\{[a-z]\^\{\d+\}\}/
    );
  });

  it("generates a problem with a numeric base", () => {
    const options = {
      isMCQ: false,
      baseRange: { min: 2, max: 5 },
      numeratorExponentRange: { min: 2, max: 3 },
      denominatorExponentRange: { min: 2, max: 3 },
      withVariable: false,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).toMatch(
      /\d+\^\{\\frac{\d+}{\d+}\}|\\sqrt\[\d+\]\{\d+\^\{\d+\}\}/
    );
    expect(problem.solution[0].value).toMatch(
      /\d+\^\{\\frac{\d+}{\d+}\}|\\sqrt\[\d+\]\{\d+\^\{\d+\}\}/
    );
  });

  it("generates a multiple choice problem", () => {
    const options = {
      isMCQ: true,
      baseRange: { min: 2, max: 5 },
      numeratorExponentRange: { min: 2, max: 3 },
      denominatorExponentRange: { min: 2, max: 3 },
      withVariable: false,
    };
    const problem = generateProblem(options);
    expect(problem.problem[2].type).toBe("options");
    expect(problem.problem[2].value.length).toBe(4);
    expect(problem.solution[0].type).toBe("choice");
  });

  it("generates a problem with correct steps", () => {
    const options = {
      isMCQ: false,
      baseRange: { min: 2, max: 5 },
      numeratorExponentRange: { min: 2, max: 3 },
      denominatorExponentRange: { min: 2, max: 3 },
      withVariable: false,
    };
    const problem = generateProblem(options);
    expect(problem.steps[1].value).toMatch(
      /[2-5]\^\{\\frac{[2-3]}{[2-3]}\}|\\sqrt\[[2-3]]\{[2-5]\^\{[2-3]}\}/
    );
  });

  it("validates the range of the base", () => {
    const options = {
      isMCQ: false,
      baseRange: { min: 2, max: 5 },
      numeratorExponentRange: { min: 2, max: 3 },
      denominatorExponentRange: { min: 2, max: 3 },
      withVariable: false,
    };
    const problem = generateProblem(options);
    const baseMatch = problem.problem[1].value.match(/[2-5]\d*/);
    const base = baseMatch ? parseInt(baseMatch[0]) : null;
    expect(base).toBeGreaterThanOrEqual(options.baseRange.min);
    expect(base).toBeLessThanOrEqual(options.baseRange.max);
  });
});
