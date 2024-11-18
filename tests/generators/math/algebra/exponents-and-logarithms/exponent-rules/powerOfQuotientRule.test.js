/**
 * @file tests/generators/math/algebra/exponents-and-logarithms/exponent-rules/powerOfQuotientRule.test.js
 * @description Tests for the power of a quotient rule problem generator.
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/exponents-and-logarithms/exponent-rules/powerOfQuotientRule");

describe("generateProblem", () => {
  it("generates a problem with a variable numerator and denominator", () => {
    const options = {
      isMCQ: false,
      exponentRange: { min: 2, max: 3 },
      innerExponentRange: { min: 2, max: 3 },
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).toMatch(
      /\\left\(\\frac\{[a-z]\^\{\d+\}\}\{[a-z]\^\{\d+\}\}\\right\)\^\{\d+\}/
    );
    expect(problem.solution[0].value).toMatch(
      /\\frac\{[a-z]\^\{\d+\}\}\{[a-z]\^\{\d+\}\}/
    );
  });

  it("generates a multiple choice problem", () => {
    const options = {
      isMCQ: true,
      exponentRange: { min: 1, max: 3 },
      innerExponentRange: { min: 1, max: 3 },
    };
    const problem = generateProblem(options);
    expect(problem.problem[2].type).toBe("options");
    expect(problem.problem[2].value.length).toBe(4);
    expect(problem.solution[0].type).toBe("choice");
  });

  it("generates a problem with correct steps", () => {
    const options = {
      isMCQ: false,
      exponentRange: { min: 2, max: 3 },
      innerExponentRange: { min: 2, max: 3 },
    };
    const problem = generateProblem(options);
    const [numerator, denominator] = problem.problem[1].value
      .match(/\\frac\{([a-z])\^\{\d+\}\}\{([a-z])\^\{\d+\}\}/)
      .slice(1, 3);
    const exponents = problem.problem[1].value
      .match(/\^\{(\d+)\}/g)
      .map((exp) => parseInt(exp.replace(/^\^\{|\}$/g, "")));
    expect(problem.steps[2].value).toBe(
      `= \\frac{${numerator}^{${exponents[0]} \\times ${exponents[2]}}}{${denominator}^{${exponents[1]} \\times ${exponents[2]}}}`
    );
  });

  it("validates the range of the exponents", () => {
    const options = {
      isMCQ: false,
      exponentRange: { min: 2, max: 3 },
      innerExponentRange: { min: 2, max: 3 },
    };
    const problem = generateProblem(options);
    const exponents = problem.problem[1].value
      .match(/\^\{(\d+)\}/g)
      .map((exp) => parseInt(exp.replace(/^\^\{|\}$/g, "")));
    expect(exponents[0]).toBeGreaterThanOrEqual(options.exponentRange.min);
    expect(exponents[0]).toBeLessThanOrEqual(options.exponentRange.max);
    expect(exponents[1]).toBeGreaterThanOrEqual(options.innerExponentRange.min);
    expect(exponents[1]).toBeLessThanOrEqual(options.innerExponentRange.max);
    expect(exponents[2]).toBeGreaterThanOrEqual(options.exponentRange.min);
    expect(exponents[2]).toBeLessThanOrEqual(options.exponentRange.max);
  });
});
