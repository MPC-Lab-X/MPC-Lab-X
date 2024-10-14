/**
 * @file tests/generators/math/algebra/complex-numbers/properties-and-rules/equatingComplexNumbers.test.js
 * @description Tests for equating complex numbers problem generator.
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/complex-numbers/properties-and-rules/equatingComplexNumbers");

describe("generateProblem", () => {
  it("should generate a problem with correct structure when isMCQ is false", () => {
    const options = {
      isMCQ: false,
      minReal: 1,
      maxReal: 10,
      minImaginary: 1,
      maxImaginary: 10,
    };

    const result = generateProblem(options);

    expect(result).toHaveProperty("problem");
    expect(result).toHaveProperty("steps");
    expect(result).toHaveProperty("solution");
    expect(result.problem).toBeInstanceOf(Array);
    expect(result.steps).toBeInstanceOf(Array);
    expect(result.solution).toBeInstanceOf(Array);
  });

  it("should generate a problem with correct structure when isMCQ is true", () => {
    const options = {
      isMCQ: true,
      minReal: 1,
      maxReal: 10,
      minImaginary: 1,
      maxImaginary: 10,
    };

    const result = generateProblem(options);

    expect(result).toHaveProperty("problem");
    expect(result).toHaveProperty("steps");
    expect(result).toHaveProperty("solution");
    expect(result.problem).toBeInstanceOf(Array);
    expect(result.steps).toBeInstanceOf(Array);
    expect(result.solution).toBeInstanceOf(Array);
    expect(result.problem[2]).toHaveProperty("value");
    expect(result.problem[2].value).toBeInstanceOf(Array);
    expect(result.problem[2].value.length).toBe(4);
  });

  it("should generate different problems for different options", () => {
    const options1 = {
      isMCQ: false,
      minReal: 1,
      maxReal: 10,
      minImaginary: 1,
      maxImaginary: 10,
    };

    const options2 = {
      isMCQ: true,
      minReal: 5,
      maxReal: 15,
      minImaginary: 5,
      maxImaginary: 15,
    };

    const result1 = generateProblem(options1);
    const result2 = generateProblem(options2);

    expect(result1.problem).not.toEqual(result2.problem);
  });
});
