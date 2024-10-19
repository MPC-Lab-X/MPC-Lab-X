/**
 * @file tests/generators/math/algebra/complex-numbers/division/constantDividedByComplex.test.js
 * @description Tests for constant divided by complex number problem generator.
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/complex-numbers/division/constantDividedByComplex");

describe("generateProblem", () => {
  it("generates a problem with correct structure for non-MCQ", () => {
    const options = {
      isMCQ: false,
      minConstant: 1,
      maxConstant: 5,
      minDenomReal: 1,
      maxDenomReal: 5,
      minDenomImaginary: 1,
      maxDenomImaginary: 5,
    };

    const problem = generateProblem(options);

    expect(problem).toHaveProperty("problem");
    expect(problem).toHaveProperty("steps");
    expect(problem).toHaveProperty("solution");

    expect(problem.problem).toBeInstanceOf(Array);
    expect(problem.steps).toBeInstanceOf(Array);
    expect(problem.solution).toBeInstanceOf(Array);
  });

  it("generates a problem with correct structure for MCQ", () => {
    const options = {
      isMCQ: true,
      minConstant: 1,
      maxConstant: 5,
      minDenomReal: 1,
      maxDenomReal: 5,
      minDenomImaginary: 1,
      maxDenomImaginary: 5,
    };

    const problem = generateProblem(options);

    expect(problem).toHaveProperty("problem");
    expect(problem).toHaveProperty("steps");
    expect(problem).toHaveProperty("solution");

    expect(problem.problem).toBeInstanceOf(Array);
    expect(problem.steps).toBeInstanceOf(Array);
    expect(problem.solution).toBeInstanceOf(Array);

    const optionsField = problem.problem.find(
      (item) => item.type === "options"
    );
    expect(optionsField).toBeDefined();
    expect(optionsField.value).toBeInstanceOf(Array);
    expect(optionsField.value.length).toBe(4);
  });
});
