/**
 * @file tests/generators/math/algebra/exponents-and-logarithms/exponent-rules/productOfPowersRule.test.js
 * @description Tests for the product of powers rule problem generator.
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/exponents-and-logarithms/exponent-rules/productOfPowersRule");

describe("generateProblem", () => {
  it("generates a problem with a variable base", () => {
    const options = {
      isMCQ: false,
      baseRange: { min: 2, max: 5 },
      exponentRange: { min: 2, max: 3 },
      withVariable: true,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).toMatch(
      /[a-z]\^\{\d\} \\cdot [a-z]\^\{\d\}/
    );
    expect(problem.solution[0].value).toMatch(/[a-z]\^\{\d+\}/);
  });

  it("generates a problem with a numeric base", () => {
    const options = {
      isMCQ: false,
      baseRange: { min: 2, max: 5 },
      exponentRange: { min: 2, max: 3 },
      withVariable: false,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).toMatch(/\d+\^\{\d\} \\cdot \d+\^\{\d\}/);
    expect(problem.solution[0].value).toMatch(/\d+\^\{\d+\}/);
  });

  it("generates a multiple choice problem", () => {
    const options = {
      isMCQ: true,
      baseRange: { min: 2, max: 5 },
      exponentRange: { min: 2, max: 3 },
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
      exponentRange: { min: 2, max: 3 },
      withVariable: false,
    };
    const problem = generateProblem(options);
    const exponents = problem.problem[1].value
      .match(/\d+\^\{\d+\}/g)
      .map((exp) => parseInt(exp.split("^")[1].replace(/[{}]/g, "")));
    const resultExponent = parseInt(exponents[0]) + parseInt(exponents[1]);
    expect(problem.steps[2].value).toBe(
      `Add the exponents: ${exponents[0]} + ${exponents[1]} = ${resultExponent}.`
    );
  });

  it("validates the range of base and exponents", () => {
    const options = {
      isMCQ: false,
      baseRange: { min: 2, max: 5 },
      exponentRange: { min: 2, max: 3 },
      withVariable: false,
    };
    const problem = generateProblem(options);
    const base = parseInt(problem.problem[1].value.match(/\d+/)[0]);
    const exponents = problem.problem[1].value
      .match(/\d+\^\{\d+\}/g)
      .map((exp) => parseInt(exp.split("^")[1].replace(/[{}]/g, "")));
    expect(base).toBeGreaterThanOrEqual(options.baseRange.min);
    expect(base).toBeLessThanOrEqual(options.baseRange.max);
    exponents.forEach((exp) => {
      expect(exp).toBeGreaterThanOrEqual(options.exponentRange.min);
      expect(exp).toBeLessThanOrEqual(options.exponentRange.max);
    });
  });

  it("does not generate a power of 1", () => {
    const options = {
      isMCQ: false,
      baseRange: { min: 2, max: 5 },
      exponentRange: { min: 1, max: 1 },
      withVariable: false,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).not.toMatch(/\^\{1\}/);
    expect(problem.solution[0].value).not.toMatch(/\^\{1\}/);
  });
});
