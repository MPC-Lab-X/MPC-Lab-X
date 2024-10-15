/**
 * @file tests/generators/math/algebra/linear-equations/withAbsoluteValue.test.js
 * @description Tests for linear equations with absolute value problem generator.
 */

const generateProblem = require("../../../../../src/generators/math/algebra/linear-equations/withAbsoluteValue");

describe("generateProblem", () => {
  it("should generate a problem with the correct structure", () => {
    const options = {
      minCoefficient: 1,
      maxCoefficient: 5,
      minConstant: -10,
      maxConstant: 10,
      minSolution: 1,
      maxSolution: 10,
    };

    const problem = generateProblem(options);

    expect(problem).toHaveProperty("problem");
    expect(problem).toHaveProperty("steps");
    expect(problem).toHaveProperty("solution");

    expect(Array.isArray(problem.problem)).toBe(true);
    expect(Array.isArray(problem.steps)).toBe(true);
    expect(Array.isArray(problem.solution)).toBe(true);
  });

  it("should generate a problem with valid coefficients and constants", () => {
    const options = {
      minCoefficient: 1,
      maxCoefficient: 5,
      minConstant: -10,
      maxConstant: 10,
      minSolution: 1,
      maxSolution: 10,
    };

    const problem = generateProblem(options);

    const formula = problem.problem.find(
      (item) => item.type === "formula"
    ).value;
    const match = formula.match(/\|(-?\d+)[a-z] ([+-]) (\d+)\| = (\d+)/);

    expect(match).not.toBeNull();
    const [, aStr, sign, bStr, cStr] = match;

    const a = parseInt(aStr, 10);
    const b = parseInt(bStr, 10);
    const c = parseInt(cStr, 10);

    expect(!isNaN(a)).toBe(true);
    expect(!isNaN(b)).toBe(true);
    expect(!isNaN(c)).toBe(true);

    expect(a).toBeGreaterThanOrEqual(options.minCoefficient);
    expect(a).toBeLessThanOrEqual(options.maxCoefficient);
    expect(b).toBeGreaterThanOrEqual(options.minConstant);
    expect(b).toBeLessThanOrEqual(options.maxConstant);
    expect(c).toBeGreaterThanOrEqual(options.minSolution);
    expect(c).toBeLessThanOrEqual(options.maxSolution);
  });

  it("should generate correct solutions", () => {
    const options = {
      minCoefficient: 1,
      maxCoefficient: 1,
      minConstant: 0,
      maxConstant: 0,
      minSolution: 2,
      maxSolution: 2,
    };

    const problem = generateProblem(options);

    const solution = problem.solution.map((sol) => sol.decimal);
    expect(solution).toContain(2);
    expect(solution).toContain(-2);
  });
});
