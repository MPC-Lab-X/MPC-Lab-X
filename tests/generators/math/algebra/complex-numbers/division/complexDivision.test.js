/**
 * @file tests/generators/math/algebra/complex-numbers/division/complexDivision.test.js
 * @description Tests for the complex number division problem generator.
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/complex-numbers/division/complexDivision");

describe("generateProblem", () => {
  const options = {
    isMCQ: false,
    minReal: -10,
    maxReal: 10,
    minImaginary: -10,
    maxImaginary: 10,
    minDenomReal: -10,
    maxDenomReal: 10,
    minDenomImaginary: -10,
    maxDenomImaginary: 10,
  };

  it("should generate a problem with correct structure", () => {
    const problem = generateProblem(options);
    expect(problem).toHaveProperty("problem");
    expect(problem).toHaveProperty("steps");
    expect(problem).toHaveProperty("solution");
    expect(problem.problem).toBeInstanceOf(Array);
    expect(problem.steps).toBeInstanceOf(Array);
    expect(problem.solution).toBeInstanceOf(Array);
  });

  it("should generate a multiple choice problem when isMCQ is true", () => {
    const mcqOptions = { ...options, isMCQ: true };
    const problem = generateProblem(mcqOptions);
    expect(problem).toHaveProperty("problem");
    expect(problem).toHaveProperty("steps");
    expect(problem).toHaveProperty("solution");
    expect(problem.problem).toBeInstanceOf(Array);
    expect(problem.steps).toBeInstanceOf(Array);
    expect(problem.solution).toBeInstanceOf(Array);
    expect(
      problem.problem.find((item) => item.type === "options")
    ).toBeTruthy();
  });

  it("should generate a problem with valid LaTeX formulas", () => {
    const problem = generateProblem(options);
    problem.problem.forEach((item) => {
      if (item.type === "formula") {
        expect(item.value).toMatch(/\\frac|\\cdot|\\div|i/);
      }
    });
    problem.steps.forEach((item) => {
      if (item.type === "formula") {
        expect(item.value).toMatch(/\\frac|\\cdot|\\div|i/);
      }
    });
    problem.solution.forEach((item) => {
      if (item.type === "formula") {
        expect(item.value).toMatch(/\\frac|\\cdot|\\div|i/);
      }
    });
  });
});
