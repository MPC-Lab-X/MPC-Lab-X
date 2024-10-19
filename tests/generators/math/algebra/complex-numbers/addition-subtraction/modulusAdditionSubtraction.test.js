/**
 * @file tests/generators/math/algebra/complex-numbers/addition-subtraction/modulusAdditionSubtraction.test.js
 * @description Tests for modulus addition and subtraction of complex numbers problem generator.
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/complex-numbers/addition-subtraction/modulusAdditionSubtraction");

describe("generateProblem", () => {
  it("generates a problem with modulus addition or subtraction", () => {
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
    expect(problem.problem[1].value).toMatch(
      /\\left\|.*\\right\| ?[+-] ?\\left\|.*\\right\|/
    );
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
    expect(problem).toHaveProperty("problem");
    expect(problem).toHaveProperty("steps");
    expect(problem).toHaveProperty("solution");
    expect(problem.problem[2].value).toHaveLength(4);
    expect(problem.problem[2].value[0]).toHaveProperty("type", "formula");
  });

  it("generates correct steps for modulus addition", () => {
    const options = {
      isMCQ: false,
      minReal: 1,
      maxReal: 1,
      minImaginary: 1,
      maxImaginary: 1,
    };
    const problem = generateProblem(options);
    expect(problem.steps[1].value).toBe(
      "\\left|1 + i\\right| = \\sqrt{1^2 + 1^2} = \\sqrt{2} = \\sqrt{2}"
    );
    expect(problem.steps[2].value).toBe(
      "\\left|1 + i\\right| = \\sqrt{1^2 + 1^2} = \\sqrt{2} = \\sqrt{2}"
    );
  });
});
