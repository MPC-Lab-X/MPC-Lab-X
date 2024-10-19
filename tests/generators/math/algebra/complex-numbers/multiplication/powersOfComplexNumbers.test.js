/**
 * @file tests/generators/math/algebra/complex-numbers/multiplication/powersOfComplexNumbers.test.js
 * @description Tests for powers of complex numbers problem generator.
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/complex-numbers/multiplication/powersOfComplexNumbers");

describe("generateProblem", () => {
  it("generates a problem with default options", () => {
    const options = {
      minReal: 1,
      maxReal: 1,
      minImaginary: 1,
      maxImaginary: 1,
      power: 2,
      isMCQ: false,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).toBe("(1 + i)^2");
    expect(problem.solution[0].value).toBe("2i");
  });

  it("generates a problem with custom options", () => {
    const options = {
      minReal: 2,
      maxReal: 2,
      minImaginary: 3,
      maxImaginary: 3,
      power: 3,
      isMCQ: false,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).toBe("(2 + 3i)^3");
    expect(problem.solution[0].value).toBe("-46 + 9i");
  });

  it("generates a multiple choice problem", () => {
    const options = {
      minReal: 1,
      maxReal: 1,
      minImaginary: 1,
      maxImaginary: 1,
      power: 2,
      isMCQ: true,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).toBe("(1 + i)^2");
    expect(problem.problem[2].type).toBe("options");
    expect(problem.solution[0].type).toBe("choice");
  });
});
