/**
 * @file tests/generators/math/algebra/complex-numbers/properties-and-rules/modulus.test.js
 * @description Tests for modulus of complex numbers problem generator.
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/complex-numbers/properties-and-rules/modulus");

describe("generateProblem", () => {
  it("should generate a problem with correct structure and values within specified range", () => {
    const options = {
      minReal: 1,
      maxReal: 5,
      minImaginary: 1,
      maxImaginary: 5,
    };

    const problem = generateProblem(options);

    expect(problem).toHaveProperty("problem");
    expect(problem).toHaveProperty("steps");
    expect(problem).toHaveProperty("solution");

    const { problem: problemText, steps, solution } = problem;

    expect(problemText).toBeInstanceOf(Array);
    expect(problemText.length).toBe(2);
    expect(problemText[0]).toHaveProperty("type", "text");
    expect(problemText[1]).toHaveProperty("type", "formula");

    expect(steps).toBeInstanceOf(Array);
    expect(steps.length).toBeGreaterThan(0);

    expect(solution).toBeInstanceOf(Array);
    expect(solution.length).toBe(1);
    expect(solution[0]).toHaveProperty("type", "numeric");
    expect(solution[0]).toHaveProperty("decimal");
  });

  it("should calculate the correct modulus for given complex number", () => {
    const options = {
      minReal: 3,
      maxReal: 3,
      minImaginary: 4,
      maxImaginary: 4,
    };

    const problem = generateProblem(options);
    const { solution } = problem;

    expect(solution[0].decimal).toEqual(5);
  });

  it("should format the modulus as a fraction when applicable", () => {
    const options = {
      minReal: 1,
      maxReal: 1,
      minImaginary: 1,
      maxImaginary: 1,
    };

    const problem = generateProblem(options);
    const { solution } = problem;

    expect(solution[0].fraction).toEqual({ s: 1, n: 5488420, d: 3880899 });
  });
});
