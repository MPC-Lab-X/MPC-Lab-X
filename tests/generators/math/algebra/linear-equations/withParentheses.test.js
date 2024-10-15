/**
 * @file tests/generators/math/algebra/linear-equations/withParentheses.test.js
 * @description Tests for linear equations with parentheses problem generator.
 */

const generateProblem = require("../../../../../src/generators/math/algebra/linear-equations/withParentheses");

describe("generateProblem", () => {
  it("should generate a problem with the correct structure", () => {
    const options = {
      minCoefficient: 1,
      maxCoefficient: 5,
      minConstant: -10,
      maxConstant: 10,
      minSolution: -20,
      maxSolution: 20,
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
      minSolution: -20,
      maxSolution: 20,
    };

    const problem = generateProblem(options);

    const formula = problem.problem.find(
      (item) => item.type === "formula"
    ).value;
    const match = formula.match(/(\d+)\([a-z] [-+] \d+\) = ([-+]?\d+)/);

    expect(match).not.toBeNull();

    const [_, aStr, cStr] = match;
    const a = parseInt(aStr, 10);
    const b = parseInt(formula.match(/[-+] (\d+)/)?.[1] || "0", 10);
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

  it("should generate correct steps for solving the equation", () => {
    const options = {
      minCoefficient: 2,
      maxCoefficient: 2,
      minConstant: 3,
      maxConstant: 3,
      minSolution: 8,
      maxSolution: 8,
    };

    const problem = generateProblem(options);

    expect(problem.steps).toHaveLength(8);
  });

  it("should generate the correct solution", () => {
    const options = {
      minCoefficient: 2,
      maxCoefficient: 2,
      minConstant: 3,
      maxConstant: 3,
      minSolution: 8,
      maxSolution: 8,
    };

    const problem = generateProblem(options);

    const expectedSolution = [
      {
        type: "numeric",
        decimal: 1,
        fraction: null,
      },
    ];

    expect(problem.solution).toEqual(expectedSolution);
  });
});
