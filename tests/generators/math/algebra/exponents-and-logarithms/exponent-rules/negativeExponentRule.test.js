/**
 * @file tests/generators/math/algebra/exponents-and-logarithms/exponent-rules/negativeExponentRule.test.js
 * @description Tests for the negative exponent rule problem generator.
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/exponents-and-logarithms/exponent-rules/negativeExponentRule");

describe("generateProblem", () => {
  it("generates a problem with a variable base", () => {
    const options = {
      isMCQ: false,
      baseRange: { min: 2, max: 5 },
      exponentRange: { min: -3, max: -2 },
      withVariable: true,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).toMatch(
      /[a-z]\^\{-?\d+\}|\\frac{1}{[a-z]\^\d+}/
    );
    expect(problem.solution[0].value).toMatch(
      /[a-z]\^\{-?\d+\}|\\frac{1}{[a-z]\^\d+}/
    );
  });

  it("generates a problem with a numeric base", () => {
    const options = {
      isMCQ: false,
      baseRange: { min: 2, max: 5 },
      exponentRange: { min: -3, max: -2 },
      withVariable: false,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).toMatch(
      /\d+\^\{-?\d+\}|\\frac{1}{\d+\^\d+}/
    );
    expect(problem.solution[0].value).toMatch(
      /\d+\^\{-?\d+\}|\\frac{1}{\d+\^\d+}/
    );
  });

  it("generates a multiple choice problem", () => {
    const options = {
      isMCQ: true,
      baseRange: { min: 2, max: 5 },
      exponentRange: { min: -3, max: -2 },
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
      exponentRange: { min: -3, max: -2 },
      withVariable: false,
    };
    const problem = generateProblem(options);
    const baseMatch = problem.problem[1].value.match(/[2-9]\d*/);
    const base = baseMatch ? parseInt(baseMatch[0]) : null;
    const exponentMatch = problem.problem[1].value.match(/(?<=\^\{-?)\d+/);
    const exponent = exponentMatch ? -parseInt(exponentMatch[0]) : null;
    expect(base).toBeGreaterThanOrEqual(options.baseRange.min);
    expect(base).toBeLessThanOrEqual(options.baseRange.max);
    expect(exponent).toBeGreaterThanOrEqual(options.exponentRange.min);
    expect(exponent).toBeLessThanOrEqual(options.exponentRange.max);
    const stepValue = problem.steps[1].value;
    expect(stepValue).toMatch(
      new RegExp(
        `\\frac{1}{${base}\\^{${Math.abs(exponent)}}}|${base}\\^{${exponent}}`
      )
    );
  });

  it("validates the range of the exponents", () => {
    const options = {
      isMCQ: false,
      baseRange: { min: 2, max: 5 },
      exponentRange: { min: -3, max: -2 },
      withVariable: false,
    };
    const problem = generateProblem(options);
    const exponentMatch = problem.problem[1].value.match(/(?<=\^\{-?)\d+/);
    const exponent = exponentMatch ? -parseInt(exponentMatch[0]) : null;
    expect(exponent).toBeGreaterThanOrEqual(options.exponentRange.min);
    expect(exponent).toBeLessThanOrEqual(options.exponentRange.max);
  });
});
