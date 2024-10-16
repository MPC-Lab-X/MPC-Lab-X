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
    )?.value;
    expect(formula).not.toBeUndefined();

    const regex =
      /([-+]?\d*)\s*\(\s*([a-zA-Z])\s*([-+])\s*(\d+)\s*\)\s*=\s*([-+]?\d+)/;
    const match = formula.match(regex);
    expect(match).not.toBeNull();

    const [
      _,
      coefficientStr,
      variableStr,
      operatorStr,
      constantStr,
      solutionStr,
    ] = match;

    const parseCoefficient = (str) => (str ? parseInt(str, 10) : 1);
    const coefficient = parseCoefficient(coefficientStr);
    const constant = parseInt(constantStr, 10);
    const solution = parseInt(solutionStr, 10);

    expect(!isNaN(coefficient)).toBe(true);
    expect(!isNaN(constant)).toBe(true);
    expect(!isNaN(solution)).toBe(true);

    expect(coefficient).toBeGreaterThanOrEqual(options.minCoefficient);
    expect(coefficient).toBeLessThanOrEqual(options.maxCoefficient);
    expect(constant).toBeGreaterThanOrEqual(options.minConstant);
    expect(constant).toBeLessThanOrEqual(options.maxConstant);
    expect(solution).toBeGreaterThanOrEqual(options.minSolution);
    expect(solution).toBeLessThanOrEqual(options.maxSolution);
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
