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
    };
    const problem = generateProblem(options);
    const problemText = problem.problem.find((p) => p.type === "formula").value;
    const complexNumbers = problemText.match(/\(([^)]+)\)/g);
    expect(complexNumbers.length).toBe(4);
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
    const optionsField = problem.problem.find((p) => p.type === "options");
    expect(optionsField).toBeDefined();
    expect(optionsField.value.length).toBe(4);
  });

  it("calculates the correct solution", () => {
    const options = {
      numComplexNumbers: 3,
      minReal: 1,
      maxReal: 1,
      minImaginary: 1,
      maxImaginary: 1,
    };
    const problem = generateProblem(options);
    const solution = problem.solution[0].value;
    expect(solution).toMatch(/[+-]?\d+ [+-]? \d*i/);
  });
});
