/**
 * @file tests/generators/math/algebra/complex-numbers/roots-radicals/basicSquareRoot.test.js
 * @description Tests for square root of complex numbers problem generator.
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/complex-numbers/roots-radicals/basicSquareRoot");

describe("generateProblem", () => {
  it("generates a problem with a negative real number", () => {
    const options = {
      isMCQ: false,
      minReal: -10,
      maxReal: -1,
      minImaginary: 1,
      maxImaginary: 10,
      decimalPlaces: 2,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).toMatch(/\\sqrt{\(-?\d+ \+ -?\d*i\)}/);
    expect(problem.solution[0].value).toMatch(
      /-?\d+\.?\d* \+ -?\d+\.?\d*i,\s*-?\d+\.?\d* \- -?\d+\.?\d*i/
    );
  });

  it("generates a problem with a complex number", () => {
    const options = {
      isMCQ: false,
      minReal: -10,
      maxReal: 10,
      minImaginary: -10,
      maxImaginary: 10,
      decimalPlaces: 2,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).toMatch(/\\sqrt{\(-?\d+\s*[-+]\s*\d*i\)}/);
    expect(problem.solution[0].value).toMatch(/-?\d+\.?\d* \+ -?\d+\.?\d*i/);
  });

  it("generates a multiple choice problem", () => {
    const options = {
      isMCQ: true,
      minReal: -10,
      maxReal: 10,
      minImaginary: -10,
      maxImaginary: 10,
      decimalPlaces: 2,
    };
    const problem = generateProblem(options);
    expect(problem.problem[2].value).toHaveLength(4);
    expect(problem.solution[0].choice).toBeGreaterThanOrEqual(0);
    expect(problem.solution[0].choice).toBeLessThan(4);
  });
});
