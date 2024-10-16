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
    expect(problem.problem[0].type).toBe("text");
    expect(problem.problem[1].type).toBe("formula");
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
    expect(problem.problem[0].type).toBe("text");
    expect(problem.problem[1].type).toBe("formula");
    expect(problem.problem[2].type).toBe("options");
    expect(problem.problem[2].value).toHaveLength(4);
  });

  it("calculates the correct result for given inputs", () => {
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

    expect(problem.solution[0].value).toBe("6 + 8i");
  });

  it("formats the result correctly when real part is zero", () => {
    const options = {
      isMCQ: false,
      minConstant: 2,
      maxConstant: 2,
      minReal: 0,
      maxReal: 0,
      minImaginary: 4,
      maxImaginary: 4,
    };

    const problem = generateProblem(options);

    expect(problem.solution[0].value).toBe("8i");
  });

  it("formats the result correctly when imaginary part is zero", () => {
    const options = {
      isMCQ: false,
      minConstant: 2,
      maxConstant: 2,
      minReal: 3,
      maxReal: 3,
      minImaginary: 0,
      maxImaginary: 0,
    };

    const problem = generateProblem(options);

    expect(problem.solution[0].value).toBe("6");
  });

  it("formats the result correctly when both parts are zero", () => {
    const options = {
      isMCQ: false,
      minConstant: 0,
      maxConstant: 0,
      minReal: 0,
      maxReal: 0,
      minImaginary: 0,
      maxImaginary: 0,
    };

    const problem = generateProblem(options);

    expect(problem.solution[0].value).toBe("0");
  });
});
