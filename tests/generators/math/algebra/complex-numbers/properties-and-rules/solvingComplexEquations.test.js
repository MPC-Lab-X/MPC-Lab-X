/**
 * @file tests/generators/math/algebra/complex-numbers/properties-and-rules/solvingComplexEquations.test.js
 * @description Tests for solving complex equations problem generator.
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/complex-numbers/properties-and-rules/solvingComplexEquations");

describe("generateProblem", () => {
  it("should generate a problem with correct solution for non-MCQ", () => {
    const options = {
      isMCQ: false,
      minReal: -5,
      maxReal: 5,
      minImaginary: -5,
      maxImaginary: 5,
    };
    const problem = generateProblem(options);

    expect(problem).toHaveProperty("problem");
    expect(problem).toHaveProperty("steps");
    expect(problem).toHaveProperty("solution");
    expect(problem.solution[0].type).toBe("formula");
  });

  it("should generate a problem with correct solution for MCQ", () => {
    const options = {
      isMCQ: true,
      minReal: -5,
      maxReal: 5,
      minImaginary: -5,
      maxImaginary: 5,
    };
    const problem = generateProblem(options);

    expect(problem).toHaveProperty("problem");
    expect(problem).toHaveProperty("steps");
    expect(problem).toHaveProperty("solution");
    expect(problem.problem[2].type).toBe("options");
    expect(problem.solution[0].type).toBe("choice");
  });

  it("should generate different problems for different options", () => {
    const options1 = {
      isMCQ: false,
      minReal: -5,
      maxReal: 5,
      minImaginary: -5,
      maxImaginary: 5,
    };
    const options2 = {
      isMCQ: false,
      minReal: 1,
      maxReal: 10,
      minImaginary: 1,
      maxImaginary: 10,
    };
    const problem1 = generateProblem(options1);
    const problem2 = generateProblem(options2);

    expect(problem1.problem).not.toEqual(problem2.problem);
  });
});
