/**
 * @file tests/generators/math/algebra/linear-equations/withFractions.test.js
 * @description Tests for linear equations with fractions problem generator.
 */

const generateProblem = require("../../../../../src/generators/math/algebra/linear-equations/withFractions");

describe("generateProblem", () => {
  it("should generate a problem with valid options", () => {
    const options = {
      minCoefficient: 1,
      maxCoefficient: 5,
      minDenominator: 1,
      maxDenominator: 5,
      minSolution: 1,
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

  it("should generate a problem with fractions", () => {
    const options = {
      minCoefficient: 1,
      maxCoefficient: 5,
      minDenominator: 1,
      maxDenominator: 5,
      minSolution: 1,
      maxSolution: 10,
    };

    const problem = generateProblem(options);

    const formula = problem.problem.find((item) => item.type === "formula");
    expect(formula).toBeDefined();
    expect(formula.value).toMatch(/\\frac{\d*[a-z]}{\d+} = \d+/);
  });

  it("should generate correct steps for solving the problem", () => {
    const options = {
      minCoefficient: 1,
      maxCoefficient: 5,
      minDenominator: 1,
      maxDenominator: 5,
      minSolution: 1,
      maxSolution: 10,
    };

    const problem = generateProblem(options);

    const steps = problem.steps.map((step) => step.value);
    expect(steps).toContain(
      "Multiply both sides of the equation by the denominator."
    );
    expect(steps).toContain(
      "Divide both sides of the equation by the coefficient of the variable."
    );
  });

  it("should generate a valid solution", () => {
    const options = {
      minCoefficient: 1,
      maxCoefficient: 5,
      minDenominator: 1,
      maxDenominator: 5,
      minSolution: 1,
      maxSolution: 10,
    };

    const problem = generateProblem(options);

    const solution = problem.solution[0];
    expect(solution).toHaveProperty("type", "numeric");
    expect(solution).toHaveProperty("decimal");
    expect(solution).toHaveProperty("fraction");
  });
});
