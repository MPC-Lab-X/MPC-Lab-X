/**
 * @file tests/generators/math/algebra/complex-numbers/addition-subtraction/multipleComplexNumbers.test.js
 * @description Tests for multiple complex numbers addition and subtraction problem generator.
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/complex-numbers/addition-subtraction/multipleComplexNumbers");

describe("generateProblem", () => {
  it("generates a problem with default options", () => {
    const problem = generateProblem({});
    expect(problem).toHaveProperty("problem");
    expect(problem).toHaveProperty("steps");
    expect(problem).toHaveProperty("solution");
  });

  it("generates a problem with specified number of complex numbers", () => {
    const options = {
      numComplexNumbers: 4,
      minReal: 1,
      maxReal: 5,
      minImaginary: 1,
      maxImaginary: 5,
      allowAddition: true,
      allowSubtraction: true,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value.match(/\(/g).length).toBe(4);
  });

  it("generates a problem with only addition", () => {
    const options = {
      numComplexNumbers: 3,
      minReal: 1,
      maxReal: 5,
      minImaginary: 1,
      maxImaginary: 5,
      allowAddition: true,
      allowSubtraction: false,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).toMatch(/\+/);
    expect(problem.problem[1].value).not.toMatch(/-/);
  });

  it("generates a problem with only subtraction", () => {
    const options = {
      numComplexNumbers: 3,
      minReal: 1,
      maxReal: 5,
      minImaginary: 1,
      maxImaginary: 5,
      allowAddition: false,
      allowSubtraction: true,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).toMatch(/-/);
    expect(problem.problem[1].value).toMatch(/^\(.*\)$/);
  });

  it("generates a multiple choice problem", () => {
    const options = {
      isMCQ: true,
      numComplexNumbers: 3,
      minReal: 1,
      maxReal: 5,
      minImaginary: 1,
      maxImaginary: 5,
      allowAddition: true,
      allowSubtraction: true,
    };
    const problem = generateProblem(options);
    expect(problem.problem[2].type).toBe("options");
    expect(problem.solution[0].type).toBe("choice");
  });
});
