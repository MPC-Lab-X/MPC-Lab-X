/**
 * @file tests/generators/math/algebra/complex-numbers/properties-and-rules/realImaginaryPart.test.js
 * @description Tests for real and imaginary parts of complex numbers problem generator.
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/complex-numbers/properties-and-rules/realImaginaryPart");

describe("generateProblem", () => {
  it("should generate a problem with correct real and imaginary parts", () => {
    const options = {
      isMCQ: false,
      minReal: 1,
      maxReal: 5,
      minImaginary: 1,
      maxImaginary: 5,
    };
    const problem = generateProblem(options);
    const realPart = problem.problem[0].value.match(/(\d+) \+/)[1];
    const imaginaryPart = problem.problem[0].value.match(/\+ (\d+)i/)[1];

    expect(problem.problem[0].value).toContain(
      `(${realPart} + ${imaginaryPart}i)`
    );
    expect(problem.solution[0].value).toBe(
      `Real part: ${realPart}, Imaginary part: ${imaginaryPart}.`
    );
  });

  it("should generate a multiple choice problem with correct options", () => {
    const options = {
      isMCQ: true,
      minReal: 1,
      maxReal: 5,
      minImaginary: 1,
      maxImaginary: 5,
    };
    const problem = generateProblem(options);
    const realPart = problem.problem[1].value.match(/(\d+) \+/)[1];
    const imaginaryPart = problem.problem[1].value.match(/\+ (\d+)i/)[1];

    expect(problem.problem[1].value).toContain(
      `(${realPart} + ${imaginaryPart}i)`
    );
    expect(
      problem.problem[2].value.some((choice) =>
        choice.value.includes(
          `Real part: ${realPart}, Imaginary part: ${imaginaryPart}`
        )
      )
    ).toBe(true);
  });
});
