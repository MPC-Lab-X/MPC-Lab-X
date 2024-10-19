/**
 * @file tests/generators/math/algebra/complex-numbers/division/rationalizing.test.js
 * @description Tests for rationalizing complex numbers problem generator.
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/complex-numbers/division/rationalizing");

describe("generateProblem", () => {
  it("generates a problem with correct structure for non-MCQ", () => {
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

  it("generates a problem with correct structure for MCQ", () => {
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

    const optionsField = problem.problem.find(
      (item) => item.type === "options"
    );
    expect(optionsField).toBeDefined();
    expect(optionsField.value).toBeInstanceOf(Array);
    expect(optionsField.value.length).toBe(4);
  });

  it("generates a problem with valid complex number", () => {
    const options = {
      isMCQ: false,
      minReal: 1,
      maxReal: 5,
      minImaginary: 1,
      maxImaginary: 5,
    };
    const problem = generateProblem(options);

    const problemText = problem.problem.find(
      (item) => item.type === "formula"
    ).value;

    expect(problemText).toMatch(/\\frac\{1\}\{\d+\s*\+\s*(\d+)?i\}/);
  });

  it("generates correct steps for rationalizing complex number", () => {
    const options = {
      isMCQ: false,
      minReal: 1,
      maxReal: 5,
      minImaginary: 1,
      maxImaginary: 5,
    };
    const problem = generateProblem(options);

    const steps = problem.steps.map((step) => step.value);
    expect(steps).toContain("Identify the complex denominator:");
    expect(steps).toContain("Multiply by the conjugate:");
    expect(steps).toContain("Simplify the denominator:");
    expect(steps).toContain(
      "Divide each part of the numerator by the denominator to get:"
    );
    expect(steps).toContain("Final simplified form:");
  });
});
