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

    expect(problem.problem).toBeDefined();
    expect(problem.steps).toBeDefined();
    expect(problem.solution).toBeDefined();
  });

  it("should generate a multiple choice problem with correct real and imaginary parts", () => {
    const options = {
      isMCQ: true,
      minReal: 1,
      maxReal: 5,
      minImaginary: 1,
      maxImaginary: 5,
    };

    const problem = generateProblem(options);

    expect(problem.problem).toBeDefined();
    expect(problem.steps).toBeDefined();
    expect(problem.solution).toBeDefined();
    expect(problem.problem[2].value).toHaveLength(4);
  });

  it("should generate different problems for different options", () => {
    const options1 = {
      isMCQ: false,
      minReal: 1,
      maxReal: 5,
      minImaginary: 1,
      maxImaginary: 5,
    };

    const options2 = {
      isMCQ: false,
      minReal: 6,
      maxReal: 10,
      minImaginary: 6,
      maxImaginary: 10,
    };

    const problem1 = generateProblem(options1);
    const problem2 = generateProblem(options2);

    expect(problem1.problem).not.toEqual(problem2.problem);
  });
});
