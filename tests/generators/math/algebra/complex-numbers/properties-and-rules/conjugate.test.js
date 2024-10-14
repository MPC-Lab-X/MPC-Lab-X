/**
 * @file tests/generators/math/algebra/complex-numbers/properties-and-rules/conjugate.test.js
 * @description Tests for complex conjugate problem generator.
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/complex-numbers/properties-and-rules/conjugate");

describe("generateProblem", () => {
  it("should generate a problem with correct structure", () => {
    const options = {
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

  it("should generate a problem with correct conjugate", () => {
    const options = {
      minReal: 2,
      maxReal: 2,
      minImaginary: 3,
      maxImaginary: 3,
    };
    const problem = generateProblem(options);

    expect(problem.solution[0].value).toBe("2 - 3i");
  });

  it("should handle negative imaginary parts correctly", () => {
    const options = {
      minReal: 2,
      maxReal: 2,
      minImaginary: -3,
      maxImaginary: -3,
    };
    const problem = generateProblem(options);

    expect(problem.solution[0].value).toBe("2 + 3i");
  });
});
