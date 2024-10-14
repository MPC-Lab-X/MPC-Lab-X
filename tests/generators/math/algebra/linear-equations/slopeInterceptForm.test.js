/**
 * @file tests/generators/math/algebra/linear-equations/slopeInterceptForm.test.js
 * @description Tests for linear equations in slope-intercept form problem generator.
 */

const generateProblem = require("../../../../../src/generators/math/algebra/linear-equations/slopeInterceptForm");

describe("generateProblem", () => {
  test("generates a simplified problem", () => {
    const options = {
      isMCQ: false,
      isSimplified: true,
      minSlope: 1,
      maxSlope: 5,
      minYIntercept: -5,
      maxYIntercept: 5,
    };
    const problem = generateProblem(options);

    expect(problem.problem).toHaveLength(2);
    expect(problem.steps).toHaveLength(3);
    expect(problem.solution).toHaveLength(2);
  });

  test("generates a non-simplified problem", () => {
    const options = {
      isMCQ: false,
      isSimplified: false,
      minSlope: 1,
      maxSlope: 5,
      minYIntercept: -5,
      maxYIntercept: 5,
    };
    const problem = generateProblem(options);

    expect(problem.problem).toHaveLength(2);
    expect(problem.steps).toHaveLength(3);
    expect(problem.solution).toHaveLength(2);
  });

  test("generates a multiple choice problem", () => {
    const options = {
      isMCQ: true,
      isSimplified: true,
      minSlope: 1,
      maxSlope: 5,
      minYIntercept: -5,
      maxYIntercept: 5,
    };
    const problem = generateProblem(options);

    expect(problem.problem).toHaveLength(3);
    expect(problem.steps).toHaveLength(3);
    expect(problem.solution).toHaveLength(1);
  });

  test("generates a multiple choice problem with non-simplified equation", () => {
    const options = {
      isMCQ: true,
      isSimplified: false,
      minSlope: 1,
      maxSlope: 5,
      minYIntercept: -5,
      maxYIntercept: 5,
    };
    const problem = generateProblem(options);

    expect(problem.problem).toHaveLength(3);
    expect(problem.steps).toHaveLength(3);
    expect(problem.solution).toHaveLength(1);
  });
});
