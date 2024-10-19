/**
 * @file tests/utils/expressionTemplates.test.js
 * @description Tests for expression templates.
 */

const expressionTemplates = require("../../src/utils/expressionTemplates");

describe("expressionTemplates", () => {
  describe("equation.linear.standard", () => {
    it("should format a standard linear equation correctly", () => {
      const result = expressionTemplates.equation.linear.standard(2, 3, 5, "x");
      expect(result).toBe("2x + 3 = 5");
    });
  });

  describe("equation.linear.slopeIntercept", () => {
    it("should format a slope-intercept form equation correctly", () => {
      const result = expressionTemplates.equation.linear.slopeIntercept(
        2,
        3,
        "x"
      );
      expect(result).toBe("y = 2x + 3");
    });
  });

  describe("equation.linear.pointSlope", () => {
    it("should format a point-slope form equation correctly", () => {
      const result = expressionTemplates.equation.linear.pointSlope(
        2,
        1,
        3,
        "x"
      );
      expect(result).toBe("y - 3 = 2(x - 1)");
    });
  });

  describe("equation.linear.withAbsoluteValue", () => {
    it("should format an equation with absolute value correctly", () => {
      const result = expressionTemplates.equation.linear.withAbsoluteValue(
        2,
        3,
        5,
        "x"
      );
      expect(result).toBe("|2x + 3| = 5");
    });
  });

  describe("equation.linear.withFractions", () => {
    it("should format an equation with fractions correctly", () => {
      const result = expressionTemplates.equation.linear.withFractions(
        2,
        3,
        5,
        "x"
      );
      expect(result).toBe("\\frac{2x}{3} = 5");
    });
  });

  describe("equation.linear.withParentheses", () => {
    it("should format an equation with parentheses correctly", () => {
      const result = expressionTemplates.equation.linear.withParentheses(
        2,
        3,
        5,
        "x"
      );
      expect(result).toBe("2(x + 3) = 5");
    });
  });

  describe("fraction", () => {
    it("should format a fraction correctly when denominator is 1", () => {
      const result = expressionTemplates.fraction(1, 3, 1);
      expect(result).toBe("3");
    });

    it("should format a fraction correctly when denominator is not 1", () => {
      const result = expressionTemplates.fraction(1, 3, 4);
      expect(result).toBe("\\frac{3}{4}");
    });

    it("should format a negative fraction correctly", () => {
      const result = expressionTemplates.fraction(-1, 3, 4);
      expect(result).toBe("-\\frac{3}{4}");
    });
  });
});
