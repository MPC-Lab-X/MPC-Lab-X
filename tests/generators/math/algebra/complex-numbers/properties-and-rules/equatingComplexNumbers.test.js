/**
 * @file tests/generators/math/algebra/complex-numbers/properties-and-rules/equatingComplexNumbers.test.js
 * @description Tests for equating complex numbers problem generator.
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/complex-numbers/properties-and-rules/equatingComplexNumbers");

describe("generateProblem", () => {
  it("should generate a problem with correct structure when isMCQ is false", () => {
    const options = {
      isMCQ: false,
      minReal: 1,
      maxReal: 5,
      minImaginary: 1,
      maxImaginary: 5,
    };
    const problem = generateProblem(options);

    expect(problem).toHaveProperty("problem");
    expect(problem).toHaveProperty("steps");
    expect(problem).toHaveProperty("solution");

    expect(problem.problem).toBeInstanceOf(Array);
    expect(problem.steps).toBeInstanceOf(Array);
    expect(problem.solution).toBeInstanceOf(Array);
  });

  it("should generate a problem with correct structure when isMCQ is true", () => {
    const options = {
      isMCQ: true,
      minReal: 1,
      maxReal: 5,
      minImaginary: 1,
      maxImaginary: 5,
    };
    const problem = generateProblem(options);

    expect(problem).toHaveProperty("problem");
    expect(problem).toHaveProperty("steps");
    expect(problem).toHaveProperty("solution");

    expect(problem.problem).toBeInstanceOf(Array);
    expect(problem.steps).toBeInstanceOf(Array);
    expect(problem.solution).toBeInstanceOf(Array);

    const mcqProblem = problem.problem.find((item) => item.type === "options");
    expect(mcqProblem).toBeDefined();
    expect(mcqProblem.value).toBeInstanceOf(Array);
    expect(mcqProblem.value.length).toBe(4);
  });

  it("should generate correct values for a, b, c, and d", () => {
    const options = {
      isMCQ: false,
      minReal: 1,
      maxReal: 1,
      minImaginary: 1,
      maxImaginary: 1,
    };
    const problem = generateProblem(options);

    const solutionText = problem.solution.find(
      (item) => item.type === "text"
    ).value;
    expect(solutionText).toBe("a = 1, b = 1, c = 1, d = 1.");
  });
});
