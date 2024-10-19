/**
 * @file tests/generators/math/algebra/complex-numbers/multiplication/basicMultiplication.test.js
 * @description Tests for basic multiplication of complex numbers problem generator.
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/complex-numbers/multiplication/basicMultiplication");

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
  });

  it("generates correct problem text for non-MCQ", () => {
    const options = {
      isMCQ: false,
      minReal: 1,
      maxReal: 1,
      minImaginary: 1,
      maxImaginary: 1,
    };
    const problem = generateProblem(options);

    expect(problem.problem[0].value).toContain(
      "Calculate the following: (1 + i) \\cdot (1 + i)"
    );
  });

  it("generates correct solution for non-MCQ", () => {
    const options = {
      isMCQ: false,
      minReal: 1,
      maxReal: 1,
      minImaginary: 1,
      maxImaginary: 1,
    };
    const problem = generateProblem(options);

    expect(problem.solution[0].value).toBe("0 + 2i");
  });

  it("generates correct choices for MCQ", () => {
    const options = {
      isMCQ: true,
      minReal: 1,
      maxReal: 1,
      minImaginary: 1,
      maxImaginary: 1,
    };
    const problem = generateProblem(options);

    const correctChoice = problem.problem[2].value.find(
      (choice) => choice.correct
    );
    expect(correctChoice.value).toBe("0 + 2i");
  });
});
