/**
 * @file tests/generators/math/algebra/complex-numbers/properties-and-rules/conjugate.test.js
 * @description Tests for complex conjugate problem generator.
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/complex-numbers/properties-and-rules/conjugate");

describe("generateProblem", () => {
  it("generates a problem with correct structure and values", () => {
    const options = {
      minReal: -10,
      maxReal: 10,
      minImaginary: -10,
      maxImaginary: 10,
    };

    const problem = generateProblem(options);

    expect(problem).toHaveProperty("problem");
    expect(problem).toHaveProperty("steps");
    expect(problem).toHaveProperty("solution");

    expect(problem.problem).toBeInstanceOf(Array);
    expect(problem.steps).toBeInstanceOf(Array);
    expect(problem.solution).toBeInstanceOf(Array);

    expect(problem.problem[0]).toHaveProperty("type", "text");
    expect(problem.problem[0]).toHaveProperty("value");
    expect(problem.problem[1]).toHaveProperty("type", "formula");
    expect(problem.problem[1]).toHaveProperty("value");

    expect(problem.steps[0]).toHaveProperty("type", "text");
    expect(problem.steps[0]).toHaveProperty("value");
    expect(problem.steps[1]).toHaveProperty("type", "formula");
    expect(problem.steps[1]).toHaveProperty("value");

    expect(problem.solution[0]).toHaveProperty("type", "formula");
    expect(problem.solution[0]).toHaveProperty("value");
  });

  it("generates a problem with correct conjugate", () => {
    const options = {
      minReal: 5,
      maxReal: 5,
      minImaginary: 3,
      maxImaginary: 3,
    };

    const problem = generateProblem(options);

    expect(problem.problem[1].value).toBe("(5 + 3i)");
    expect(problem.solution[0].value).toBe("5 - 3i");
  });

  it("handles zero real part correctly", () => {
    const options = {
      minReal: 0,
      maxReal: 0,
      minImaginary: 4,
      maxImaginary: 4,
    };

    const problem = generateProblem(options);

    expect(problem.problem[1].value).toBe("(4i)");
    expect(problem.solution[0].value).toBe("-4i");
  });

  it("handles zero imaginary part correctly", () => {
    const options = {
      minReal: 7,
      maxReal: 7,
      minImaginary: 0,
      maxImaginary: 0,
    };

    const problem = generateProblem(options);

    expect(problem.problem[1].value).toMatch(/\(\s*7\s*([+-])\s*(\d*i|i)\s*\)/);
    expect(problem.solution[0].value).toMatch(/7\s*([+-])\s*(\d*i|i)/);
  });
});
