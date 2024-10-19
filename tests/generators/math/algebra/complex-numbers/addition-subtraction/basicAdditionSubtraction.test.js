/**
 * @file tests/generators/math/algebra/complex-numbers/addition-subtraction/basicAdditionSubtraction.test.js
 * @description Tests for basic addition and subtraction of complex numbers problem generator.
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/complex-numbers/addition-subtraction/basicAdditionSubtraction");

describe("generateProblem", () => {
  it("generates a problem with addition or subtraction", () => {
    const problem = generateProblem({});
    expect(problem).toHaveProperty("problem");
    expect(problem).toHaveProperty("steps");
    expect(problem).toHaveProperty("solution");
  });

  it("generates a multiple choice problem", () => {
    const options = {
      isMCQ: true,
      minReal: 1,
      maxReal: 5,
      minImaginary: 1,
      maxImaginary: 5,
    };
    const problem = generateProblem(options);
    expect(problem.problem[2].value).toHaveLength(4);
    expect(problem.problem[2].value[0]).toHaveProperty("type", "formula");
    expect(problem.problem[2].value[0]).toHaveProperty("value");
  });

  it("generates correct steps for addition", () => {
    const options = {
      isMCQ: false,
      minReal: 1,
      maxReal: 5,
      minImaginary: 1,
      maxImaginary: 5,
    };
    const problem = generateProblem(options);
    if (problem.problem[0].value.includes("+")) {
      expect(problem.steps[0].value).toBe(
        "To perform the operation, combine the real parts and the imaginary parts."
      );
      expect(problem.steps[1].value).toMatch(
        /\d+ \+ \d*i [+-] \(\d+ \+ \d*i\)/
      );
      expect(problem.steps[2].value).toMatch(
        /Combine the real parts: -?\d+, Combine the imaginary parts: -?\d+\./
      );
    }
  });

  it("generates correct steps for subtraction", () => {
    const options = {
      isMCQ: false,
      minReal: 1,
      maxReal: 5,
      minImaginary: 1,
      maxImaginary: 5,
    };
    const problem = generateProblem(options);
    if (problem.problem[0].value.includes("-")) {
      expect(problem.steps[0].value).toBe(
        "To perform the operation, combine the real parts and the imaginary parts."
      );
      expect(problem.steps[1].value).toMatch(/\d+ \+ \d*i - \(\d+ \+ \d*i\)/);
      expect(problem.steps[2].value).toMatch(
        /Combine the real parts: -?\d+, Combine the imaginary parts: -?\d+/
      );
    }
  });
});
