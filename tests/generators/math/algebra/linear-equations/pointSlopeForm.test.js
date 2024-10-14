/**
 * @file tests/generators/math/algebra/linear-equations/pointSlopeForm.test.js
 * @description Tests for linear equations in point-slope form problem generator.
 */

const generateProblem = require("../../../../../src/generators/math/algebra/linear-equations/pointSlopeForm");

describe("generateProblem", () => {
  it("should generate a problem with correct slope and point", () => {
    const options = {
      isMCQ: false,
      isSimplified: true,
      minSlope: 1,
      maxSlope: 5,
      minPoint: -10,
      maxPoint: 10,
    };
    const problem = generateProblem(options);

    expect(problem).toHaveProperty("problem");
    expect(problem).toHaveProperty("steps");
    expect(problem).toHaveProperty("solution");
    expect(problem.solution[0].label).toBe("Slope");
    expect(problem.solution[1].label).toBe("Point (x1, y1)");

    const slope = problem.solution[0].decimal;
    const point = problem.solution[1].value;

    expect(slope).toBeDefined();
    expect(point).toBeDefined();

    expect(slope).toBeGreaterThanOrEqual(1);
    expect(slope).toBeLessThanOrEqual(5);
    expect(point.match(/\(-?\d+, -?\d+\)/)).toBeTruthy();
  });

  it("should generate a multiple choice problem with correct options", () => {
    const options = {
      isMCQ: true,
      isSimplified: true,
      minSlope: 1,
      maxSlope: 5,
      minPoint: -10,
      maxPoint: 10,
    };
    const problem = generateProblem(options);
    expect(problem).toHaveProperty("problem");
    expect(problem).toHaveProperty("steps");
    expect(problem).toHaveProperty("solution");
    expect(problem.problem[2].type).toBe("options");
    expect(problem.problem[2].value.length).toBe(4);
  });

  it("should generate a simplified problem", () => {
    const options = {
      isMCQ: false,
      isSimplified: true,
      minSlope: 1,
      maxSlope: 5,
      minPoint: -10,
      maxPoint: 10,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).toMatch(/y [+-] \d+ = \d+\(x [+-] \d+\)/);
  });

  it("should generate a non-simplified problem", () => {
    const options = {
      isMCQ: false,
      isSimplified: false,
      minSlope: 1,
      maxSlope: 5,
      minPoint: -10,
      maxPoint: 10,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).toMatch(
      /\d+y [+-] \d+ = \d+\(x [+-] \d+\)/
    );
  });
});
