/**
 * @file tests/generators/math/algebra/exponents-and-logarithms/exponent-rules/zeroExponentRule.test.js
 * @description Tests for the zero exponent rule problem generator.
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/exponents-and-logarithms/exponent-rules/zeroExponentRule");

describe("generateProblem", () => {
  it("generates a problem with a variable base", () => {
    const options = {
      isMCQ: false,
      baseRange: { min: 2, max: 5 },
      withVariable: true,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).toMatch(/[a-z]\^{0}/);
    expect(problem.solution[0].decimal).toBe(1);
  });

  it("generates a problem with a numeric base", () => {
    const options = {
      isMCQ: false,
      baseRange: { min: 2, max: 5 },
      withVariable: false,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).toMatch(/\d+\^{0}/);
    expect(problem.solution[0].decimal).toBe(1);
  });

  it("generates a multiple choice problem", () => {
    const options = {
      isMCQ: true,
      baseRange: { min: 2, max: 5 },
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
      withVariable: false,
    };
    const problem = generateProblem(options);
    expect(problem.steps[1].value).toBe(`${problem.problem[1].value} = 1`);
  });

  it("validates the range of the base", () => {
    const options = {
      isMCQ: false,
      baseRange: { min: 2, max: 5 },
      withVariable: false,
    };
    const problem = generateProblem(options);
    const base = parseInt(problem.problem[1].value.match(/\d+/g)[0]);
    expect(base).toBeGreaterThanOrEqual(options.baseRange.min);
    expect(base).toBeLessThanOrEqual(options.baseRange.max);
  });
});
