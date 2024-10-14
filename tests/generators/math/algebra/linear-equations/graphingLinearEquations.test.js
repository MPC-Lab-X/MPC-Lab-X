/**
 * @file tests/generators/math/algebra/linear-equations/graphingLinearEquations.test.js
 * @description Tests for graphing linear equations problem generator.
 */

const generateProblem = require("../../../../../src/generators/math/algebra/linear-equations/graphingLinearEquations");

describe("generateProblem", () => {
  const problemPatterns = {
    standard: /^-?\d+x [+-] -?\d+y = -?\d+$/,
    slopeIntercept: /^y = -?\d+x [+-] -?\d+$/,
    pointSlope: /^y [+-] -?\d+ = -?\d+\(x [+-] -?\d+\)$/,
    any: /^(y = -?\d+x [+-] -?\d+|y [+-] -?\d+ = -?\d+\(x [+-] -?\d+\)|-?\d+x [+-] -?\d+y = -?\d+)$/,
  };

  test.each([
    [
      {
        includeStandard: true,
        includeSlopeIntercept: false,
        includePointSlope: false,
      },
      problemPatterns.standard,
    ],
    [
      {
        includeStandard: false,
        includeSlopeIntercept: true,
        includePointSlope: false,
      },
      problemPatterns.slopeIntercept,
    ],
    [
      {
        includeStandard: false,
        includeSlopeIntercept: false,
        includePointSlope: true,
      },
      problemPatterns.pointSlope,
    ],
    [
      {
        includeStandard: true,
        includeSlopeIntercept: true,
        includePointSlope: true,
      },
      problemPatterns.any,
    ],
    [{}, problemPatterns.any],
  ])(
    "should generate a problem for options: %o",
    (options, expectedPattern) => {
      const result = generateProblem(options);
      expect(result.problem).toBeDefined();
      expect(result.problem[1].value).toMatch(expectedPattern);
    }
  );
});
