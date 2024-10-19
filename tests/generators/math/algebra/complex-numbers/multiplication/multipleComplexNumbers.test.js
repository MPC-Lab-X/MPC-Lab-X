/**
 * @file tests/generators/math/algebra/complex-numbers/multiplication/multipleComplexNumbers.test.js
 * @description Tests for multiple complex numbers multiplication problem generator.
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/complex-numbers/multiplication/multipleComplexNumbers");

describe("generateProblem", () => {
  it("should generate a problem with default options", () => {
    const problem = generateProblem({});
    expect(problem).toHaveProperty("problem");
    expect(problem).toHaveProperty("steps");
    expect(problem).toHaveProperty("solution");
  });

  it("should generate a problem with specified options", () => {
    const options = {
      isMCQ: false,
      minReal: 1,
      maxReal: 5,
      minImaginary: 1,
      maxImaginary: 5,
      numComplexNumbers: 3,
    };
    const problem = generateProblem(options);
    expect(problem).toHaveProperty("problem");
    expect(problem).toHaveProperty("steps");
    expect(problem).toHaveProperty("solution");
  });

  it("should generate a multiple choice problem when isMCQ is true", () => {
    const options = {
      isMCQ: true,
      minReal: 1,
      maxReal: 5,
      minImaginary: 1,
      maxImaginary: 5,
      numComplexNumbers: 3,
    };
    const problem = generateProblem(options);
    expect(problem).toHaveProperty("problem");
    expect(problem.problem).toEqual(
      expect.arrayContaining([expect.objectContaining({ type: "options" })])
    );
    expect(problem).toHaveProperty("steps");
    expect(problem).toHaveProperty("solution");
  });

  it("should generate correct steps for the problem", () => {
    const options = {
      isMCQ: false,
      minReal: 1,
      maxReal: 5,
      minImaginary: 1,
      maxImaginary: 5,
      numComplexNumbers: 2,
    };
    const problem = generateProblem(options);
    expect(problem.steps).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: "text" }),
        expect.objectContaining({ type: "formula" }),
      ])
    );
  });

  it("should generate correct solution for the problem", () => {
    const options = {
      isMCQ: false,
      minReal: 1,
      maxReal: 5,
      minImaginary: 1,
      maxImaginary: 5,
      numComplexNumbers: 2,
    };
    const problem = generateProblem(options);
    expect(problem.solution).toEqual(
      expect.arrayContaining([expect.objectContaining({ type: "formula" })])
    );
  });
});
