/**
 * @file tests/generators/math/algebra/linear-equations/standardForm.test.js
 * @description Tests for linear equations in standard form problem generator.
 */

const generateProblem = require("../../../../../src/generators/math/algebra/linear-equations/standardForm");

describe("generateProblem", () => {
  it("should generate a problem with valid options", () => {
    const options = {
      minCoefficient: 1,
      maxCoefficient: 10,
      minConstant: -10,
      maxConstant: 10,
      minSolution: -10,
      maxSolution: 10,
    };

    const problem = generateProblem(options);

    expect(problem).toHaveProperty("problem");
    expect(problem).toHaveProperty("steps");
    expect(problem).toHaveProperty("solution");
    expect(problem.problem).toBeInstanceOf(Array);
    expect(problem.steps).toBeInstanceOf(Array);
    expect(problem.solution).toBeInstanceOf(Array);
  });

  it("should generate a problem with integer solution", () => {
    const options = {
      minCoefficient: 1,
      maxCoefficient: 10,
      minConstant: -10,
      maxConstant: 10,
      minSolution: -10,
      maxSolution: 10,
    };

    const problem = generateProblem(options);
    const solution = problem.solution[0].decimal;

    expect(Number.isInteger(solution)).toBe(true);
  });

  it("should generate different problems for different options", () => {
    const options1 = {
      minCoefficient: 1,
      maxCoefficient: 5,
      minConstant: -5,
      maxConstant: 5,
      minSolution: -5,
      maxSolution: 5,
    };

    const options2 = {
      minCoefficient: 6,
      maxCoefficient: 10,
      minConstant: -10,
      maxConstant: 10,
      minSolution: -10,
      maxSolution: 10,
    };

    const problem1 = generateProblem(options1);
    const problem2 = generateProblem(options2);

    expect(problem1).not.toEqual(problem2);
  });
});
