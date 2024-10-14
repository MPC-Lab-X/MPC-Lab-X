/**
 * @file tests/generators/math/algebra/complex-numbers/division/constantDividedByComplex.test.js
 * @description Tests for constant divided by complex number problem generator.
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/complex-numbers/division/constantDividedByComplex");

describe("generateProblem", () => {
  it("should generate a problem with correct structure for non-MCQ", () => {
    const options = {
      isMCQ: false,
      minConstant: 1,
      maxConstant: 10,
      minDenomReal: 1,
      maxDenomReal: 10,
      minDenomImaginary: 1,
      maxDenomImaginary: 10,
    };

    const problem = generateProblem(options);

    expect(problem).toHaveProperty("problem");
    expect(problem).toHaveProperty("steps");
    expect(problem).toHaveProperty("solution");
    expect(problem.problem).toBeInstanceOf(Array);
    expect(problem.steps).toBeInstanceOf(Array);
    expect(problem.solution).toBeInstanceOf(Array);
  });

  it("should generate a problem with correct structure for MCQ", () => {
    const options = {
      isMCQ: true,
      minConstant: 1,
      maxConstant: 10,
      minDenomReal: 1,
      maxDenomReal: 10,
      minDenomImaginary: 1,
      maxDenomImaginary: 10,
    };

    const problem = generateProblem(options);

    expect(problem).toHaveProperty("problem");
    expect(problem).toHaveProperty("steps");
    expect(problem).toHaveProperty("solution");
    expect(problem.problem).toBeInstanceOf(Array);
    expect(problem.steps).toBeInstanceOf(Array);
    expect(problem.solution).toBeInstanceOf(Array);
  });

  it("should generate different problems for different options", () => {
    const options1 = {
      isMCQ: false,
      minConstant: 1,
      maxConstant: 10,
      minDenomReal: 1,
      maxDenomReal: 10,
      minDenomImaginary: 1,
      maxDenomImaginary: 10,
    };

    const options2 = {
      isMCQ: false,
      minConstant: 11,
      maxConstant: 20,
      minDenomReal: 11,
      maxDenomReal: 20,
      minDenomImaginary: 11,
      maxDenomImaginary: 20,
    };

    const problem1 = generateProblem(options1);
    const problem2 = generateProblem(options2);

    expect(problem1.problem).not.toEqual(problem2.problem);
  });
});
