/**
 * @file tests/generators/math/algebra/complex-numbers/multiplication/multipleComplexNumbers.test.js
 * @description Tests for multiple complex numbers multiplication problem generator.
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/complex-numbers/multiplication/multipleComplexNumbers");

describe("generateProblem", () => {
  it("generates a problem with default options", () => {
    const problem = generateProblem({});
    expect(problem).toHaveProperty("problem");
    expect(problem).toHaveProperty("steps");
    expect(problem).toHaveProperty("solution");
  });

  it("generates a problem with specified number of complex numbers", () => {
    const problem = generateProblem({ numComplexNumbers: 3 });
    expect(problem.problem[1].value.split(" \\cdot ").length).toBe(3);
  });

  it("generates a problem with specified range for real and imaginary parts", () => {
    const problem = generateProblem({
      minReal: 1,
      maxReal: 2,
      minImaginary: 1,
      maxImaginary: 2,
    });
    problem.problem[1].value.split(" \\cdot ").forEach((complex) => {
      const [real, imaginary] = complex.match(/-?\d+/g).map(Number);
      expect(real).toBeGreaterThanOrEqual(1);
      expect(real).toBeLessThanOrEqual(2);
      expect(imaginary).toBeGreaterThanOrEqual(1);
      expect(imaginary).toBeLessThanOrEqual(2);
    });
  });

  it("generates a multiple choice problem when isMCQ is true", () => {
    const problem = generateProblem({ isMCQ: true });
    expect(problem.problem[2].type).toBe("options");
    expect(problem.solution[0].type).toBe("choice");
  });

  it("generates correct steps for the solution", () => {
    const problem = generateProblem({
      numComplexNumbers: 2,
      minReal: 1,
      maxReal: 1,
      minImaginary: 1,
      maxImaginary: 1,
    });
    expect(problem.steps.length).toBeGreaterThan(0);
  });
});
