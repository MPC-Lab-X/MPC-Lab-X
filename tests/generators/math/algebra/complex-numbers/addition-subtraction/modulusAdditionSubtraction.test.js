/**
 * @file tests/generators/math/algebra/complex-numbers/addition-subtraction/modulusAdditionSubtraction.test.js
 * @description Tests for modulus addition and subtraction of complex numbers problem generator.
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/complex-numbers/addition-subtraction/modulusAdditionSubtraction");

describe("generateProblem", () => {
  it("should generate a problem with modulus addition of complex numbers", () => {
    const options = {
      isMCQ: false,
      minReal: 1,
      maxReal: 5,
      minImaginary: 1,
      maxImaginary: 5,
      allowAddition: true,
      allowSubtraction: false,
    };
    const problem = generateProblem(options);
    expect(problem).toHaveProperty("problem");
    expect(problem).toHaveProperty("steps");
    expect(problem).toHaveProperty("solution");
    expect(problem.problem[1].value).toMatch(
      /\\left\|.*\\right\| \+ \\left\|.*\\right\|/
    );
  });

  it("should generate a problem with modulus subtraction of complex numbers", () => {
    const options = {
      isMCQ: false,
      minReal: 1,
      maxReal: 5,
      minImaginary: 1,
      maxImaginary: 5,
      allowAddition: false,
      allowSubtraction: true,
    };
    const problem = generateProblem(options);
    expect(problem).toHaveProperty("problem");
    expect(problem).toHaveProperty("steps");
    expect(problem).toHaveProperty("solution");
    expect(problem.problem[1].value).toMatch(
      /\\left\|.*\\right\| - \\left\|.*\\right\|/
    );
  });

  it("should generate a multiple choice problem", () => {
    const options = {
      isMCQ: true,
      minReal: 1,
      maxReal: 5,
      minImaginary: 1,
      maxImaginary: 5,
      allowAddition: true,
      allowSubtraction: true,
    };
    const problem = generateProblem(options);
    expect(problem).toHaveProperty("problem");
    expect(problem).toHaveProperty("steps");
    expect(problem).toHaveProperty("solution");
    expect(problem.problem[2].type).toBe("options");
    expect(problem.problem[2].value.length).toBeGreaterThan(0);
  });

  it("should handle edge cases with zero values", () => {
    const options = {
      isMCQ: false,
      minReal: 0,
      maxReal: 0,
      minImaginary: 0,
      maxImaginary: 0,
      allowAddition: true,
      allowSubtraction: true,
    };
    const problem = generateProblem(options);
    expect(problem).toHaveProperty("problem");
    expect(problem).toHaveProperty("steps");
    expect(problem).toHaveProperty("solution");
    expect(problem.problem[1].value).toMatch(
      /\\left\|0 \+ 0i\\right\| [+-] \\left\|0 \+ 0i\\right\|/
    );
  });
});
