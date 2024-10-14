/**
 * @file tests/generators/math/algebra/complex-numbers/division/rationalizing.test.js
 * @description Tests for rationalizing complex numbers problem generator.
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/complex-numbers/division/rationalizing");

describe("generateProblem", () => {
  it("should generate a problem with correct structure for non-MCQ", () => {
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
    expect(problem.problem).toBeInstanceOf(Array);
    expect(problem.steps).toBeInstanceOf(Array);
    expect(problem.solution).toBeInstanceOf(Array);
  });

  it("should generate a problem with correct structure for MCQ", () => {
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
    expect(problem.problem).toBeInstanceOf(Array);
    expect(problem.steps).toBeInstanceOf(Array);
    expect(problem.solution).toBeInstanceOf(Array);
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
