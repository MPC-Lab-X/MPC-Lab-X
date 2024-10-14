/**
 * @file tests/generators/math/algebra/complex-numbers/multiplication/powersOfComplexNumbers.test.js
 * @description Tests for powers of complex numbers problem generator.
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/complex-numbers/multiplication/powersOfComplexNumbers");

describe("generateProblem", () => {
  it("should generate a problem with default power of 2", () => {
    const options = {
      isMCQ: false,
      minReal: 1,
      maxReal: 1,
      minImaginary: 1,
      maxImaginary: 1,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).toBe("(1 + 1i)^2");
    expect(problem.solution[0].value).toBe("2i");
  });

  it("should generate a problem with specified power", () => {
    const options = {
      isMCQ: false,
      minReal: 1,
      maxReal: 1,
      minImaginary: 1,
      maxImaginary: 1,
      power: 3,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).toBe("(1 + 1i)^3");
    expect(problem.solution[0].value).toBe("-2 + 2i");
  });

  it("should generate a multiple choice problem", () => {
    const options = {
      isMCQ: true,
      minReal: 1,
      maxReal: 1,
      minImaginary: 1,
      maxImaginary: 1,
      power: 2,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).toBe("(1 + 1i)^2");
    expect(problem.problem[2].type).toBe("options");
    expect(problem.solution[0].choice).toBeGreaterThanOrEqual(0);
    expect(problem.solution[0].choice).toBeLessThanOrEqual(3);
  });
});
