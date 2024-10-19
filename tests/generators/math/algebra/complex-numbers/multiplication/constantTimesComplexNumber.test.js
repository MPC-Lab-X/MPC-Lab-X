/**
 * @file tests/generators/math/algebra/complex-numbers/multiplication/constantTimesComplexNumber.test.js
 * @description Tests for constant times complex number multiplication problem generator.
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/complex-numbers/multiplication/constantTimesComplexNumber");

describe("generateProblem", () => {
  it("generates a problem with correct structure for non-MCQ", () => {
    const options = {
      isMCQ: false,
      minConstant: 1,
      maxConstant: 5,
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
      minConstant: 1,
      maxConstant: 5,
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

  it("calculates correct result for given inputs", () => {
    const options = {
      isMCQ: false,
      minConstant: 2,
      maxConstant: 2,
      minReal: 3,
      maxReal: 3,
      minImaginary: 4,
      maxImaginary: 4,
    };

    const problem = generateProblem(options);

    const expectedProblemText = "2 * (3 + 4i)";
    const expectedSolution = "6 + 8i";

    expect(problem.problem[0].value).toContain(expectedProblemText);
    expect(problem.solution[0].value).toBe(expectedSolution);
  });
});
