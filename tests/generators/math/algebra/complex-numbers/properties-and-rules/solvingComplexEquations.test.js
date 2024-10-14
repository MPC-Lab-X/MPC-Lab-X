/**
 * @file tests/generators/math/algebra/complex-numbers/properties-and-rules/solvingComplexEquations.test.js
 * @description Tests for solving complex equations problem generator.
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/complex-numbers/properties-and-rules/solvingComplexEquations");

describe("generateProblem", () => {
  it("should generate a problem with correct structure for non-MCQ", () => {
    const options = {
      isMCQ: false,
      minReal: 1,
      maxReal: 10,
      minImaginary: 1,
      maxImaginary: 10,
    };
    const problem = generateProblem(options);

    expect(problem).toHaveProperty("problem");
    expect(problem).toHaveProperty("steps");
    expect(problem).toHaveProperty("solution");
    expect(problem.problem).toBeInstanceOf(Array);
    expect(problem.steps).toBeInstanceOf(Array);
    expect(problem.solution).toBeInstanceOf(Array);
  });

  it("should generate a problem with correct structure for MCQ", () => {
    const options = {
      isMCQ: true,
      minReal: 1,
      maxReal: 10,
      minImaginary: 1,
      maxImaginary: 10,
    };
    const problem = generateProblem(options);

    expect(problem).toHaveProperty("problem");
    expect(problem).toHaveProperty("steps");
    expect(problem).toHaveProperty("solution");
    expect(problem.problem).toBeInstanceOf(Array);
    expect(problem.steps).toBeInstanceOf(Array);
    expect(problem.solution).toBeInstanceOf(Array);
    expect(problem.problem[2]).toHaveProperty("value");
    expect(problem.problem[2].value).toBeInstanceOf(Array);
    expect(problem.problem[2].value.length).toBe(4);
  });

  it("should generate different problems for different options", () => {
    const options1 = {
      isMCQ: false,
      minReal: 1,
      maxReal: 10,
      minImaginary: 1,
      maxImaginary: 10,
    };
    const options2 = {
      isMCQ: false,
      minReal: 10,
      maxReal: 20,
      minImaginary: 10,
      maxImaginary: 20,
    };
    const problem1 = generateProblem(options1);
    const problem2 = generateProblem(options2);

    expect(problem1.problem[0].value).not.toBe(problem2.problem[0].value);
  });
});
