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

  describe("exponent.power", () => {
    it("should format a power expression correctly when exponent is 1", () => {
      const result = expressionTemplates.exponent.power(2, 1);
      expect(result).toBe("2");
    });

    it("should format a power expression correctly when exponent is greater than 1", () => {
      const result = expressionTemplates.exponent.power(2, 3);
      expect(result).toBe("2^{3}");
    });
  });

  describe("exponent.productOfPowers", () => {
    it("should format a product of powers expression correctly", () => {
      const result = expressionTemplates.exponent.productOfPowers(2, 3, 4);
      expect(result).toBe("2^{3} \\cdot 2^{4}");
    });
  });

  describe("exponent.quotientOfPowers", () => {
    it("should format a quotient of powers expression correctly", () => {
      const result = expressionTemplates.exponent.quotientOfPowers(2, 3, 4);
      expect(result).toBe("\\frac{2^{3}}{2^{4}}");
    });
  });

  describe("exponent.quotientOfDifferentBases", () => {
    it("should format a quotient of different bases expression correctly", () => {
      const result = expressionTemplates.exponent.quotientOfDifferentBases(
        2,
        3,
        4,
        5
      );
      expect(result).toBe("\\frac{2^{4}}{3^{5}}");
    });
  });

  describe("exponent.powerOfQuotient", () => {
    it("should format a power of quotient expression correctly", () => {
      const result = expressionTemplates.exponent.powerOfQuotient(
        2,
        3,
        4,
        1,
        2
      );
      expect(result).toBe("\\left(\\frac{2}{3^{2}}\\right)^{4}");
    });
  });

  describe("exponent.zeroExponent", () => {
    it("should format a zero exponent expression correctly", () => {
      const result = expressionTemplates.exponent.zeroExponent(2);
      expect(result).toBe("2^{0}");
    });
  });

  describe("exponent.productOfExponents", () => {
    it("should format a product of exponents expression correctly", () => {
      const result = expressionTemplates.exponent.productOfExponents(2, 3, 4);
      expect(result).toBe("2^{3 \\times 4}");
    });
  });

  describe("exponent.fractionOfExponents", () => {
    it("should format a fraction of exponents expression correctly", () => {
      const result = expressionTemplates.exponent.fractionOfExponents(2, 3, 4);
      expect(result).toBe("2^{\\frac{3}{4}}");
    });
  });

  describe("exponent.quotientOfProducts", () => {
    it("should format a quotient of products expression correctly", () => {
      const result = expressionTemplates.exponent.quotientOfProducts(
        2,
        3,
        4,
        5,
        6
      );
      expect(result).toBe("\\frac{2^{5 \\times 4}}{3^{6 \\times 4}}");
    });
  });

  describe("radical.root", () => {
    it("should format a square root expression correctly", () => {
      const result = expressionTemplates.radical.root(2, 16);
      expect(result).toBe("\\sqrt[2]{16}");
    });

    it("should format a cube root expression correctly", () => {
      const result = expressionTemplates.radical.root(3, 27);
      expect(result).toBe("\\sqrt[3]{27}");
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
