/**
 * @file tests/generators/math/algebra/linear-equations/graphingLinearEquations.test.js
 * @description Tests for graphing linear equations problem generator.
 */

const generateProblem = require("../../../../../src/generators/math/algebra/linear-equations/graphingLinearEquations");

describe("generateProblem", () => {
  const problemPatterns = {
    standard: /([-+]?\d+)[a-z]\s*([-+]\s*\d+)\s*=\s*([-+]?\d+)/,
    slopeIntercept: /y = ([-+]?\d+)[a-z]\s*([-+]\s*\d+)/,
    pointSlope:
      /y\s*([-+]\s*\d+)\s*=\s*([-+]?\d+)\s*\(\s*[a-z]\s*([-+]\s*\d+)\s*\)/,
    any: /([-+]?\d+)[a-z]\s*([-+]\s*\d+)\s*=\s*([-+]?\d+)|y = ([-+]?\d+)[a-z]\s*([-+]\s*\d+)|y\s*([-+]\s*\d+)\s*=\s*([-+]?\d+)\s*\(\s*[a-z]\s*([-+]\s*\d+)\s*\)/,
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
