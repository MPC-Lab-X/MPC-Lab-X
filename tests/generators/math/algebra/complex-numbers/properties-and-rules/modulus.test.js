/**
 * @file tests/generators/math/algebra/complex-numbers/properties-and-rules/modulus.test.js
 * @description Tests for modulus of complex numbers problem generator.
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/complex-numbers/properties-and-rules/modulus");

describe("generateProblem", () => {
  it("should generate a problem with correct modulus calculation", () => {
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

    const realPart = parseInt(problem.problem[0].value.match(/(\d+)/)[0]);
    const imaginaryPart = parseInt(problem.problem[0].value.match(/(\d+)i/)[1]);

    const expectedModulus = Math.sqrt(
      realPart ** 2 + imaginaryPart ** 2
    ).toFixed(2);

    expect(problem.solution[0].decimal).toBe(parseFloat(expectedModulus));
  });

  it("should generate a problem with correct steps", () => {
    const options = {
      minReal: 1,
      maxReal: 5,
      minImaginary: 1,
      maxImaginary: 5,
    };

    const problem = generateProblem(options);

    expect(problem.steps[0].value).toBe(
      "The modulus of a complex number is calculated as |a + bi| = √(a² + b²)."
    );
    expect(problem.steps[1].value).toMatch(/\\sqrt{\d+\^2 \+ \+?\d+\^2}/);
    expect(problem.steps[2].value).toMatch(/\\sqrt{\d+ \+ \d+}/);
  });
});
