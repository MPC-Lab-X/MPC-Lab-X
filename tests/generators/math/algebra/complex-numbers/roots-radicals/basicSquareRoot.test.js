/**
 * @file tests/generators/math/algebra/complex-numbers/roots-radicals/basicSquareRoot.test.js
 * @description Tests for square root of complex numbers problem generator.
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/complex-numbers/roots-radicals/basicSquareRoot");

describe("generateProblem", () => {
  it("generates problem for negative real number", () => {
    const options = {
      isMCQ: false,
      minReal: -9,
      maxReal: -9,
      minImaginary: 0,
      maxImaginary: 0,
      decimalPlaces: 2,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).toBe("\\sqrt{-9}");
    expect(problem.solution[0].value).toBe("3i, -3i");
  });

  it("generates problem for complex number", () => {
    const options = {
      isMCQ: false,
      minReal: 4,
      maxReal: 4,
      minImaginary: 9,
      maxImaginary: 9,
      decimalPlaces: 2,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).toBe("\\sqrt{(4 + 9i)}");
    expect(problem.solution[0].value).toMatch(
      /^\d+\.\d+ \+ \d+\.\d+i, -\d+\.\d+ - \d+\.\d+i$/
    );
  });

  it("generates multiple choice problem", () => {
    const options = {
      isMCQ: true,
      minReal: 1,
      maxReal: 1,
      minImaginary: 1,
      maxImaginary: 1,
      decimalPlaces: 2,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).toBe("\\sqrt{(1 + 1i)}");
    expect(problem.problem[2].value).toHaveLength(4);
    expect(problem.solution[0].choice).toBeGreaterThanOrEqual(0);
    expect(problem.solution[0].choice).toBeLessThan(4);
  });
});
