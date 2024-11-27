/**
 * @file tests/generators/math/algebra/exponents-and-logarithms/logarithm-properties/exponentLogarithmConversion.test.js
 * @description Tests for the exponent and logarithm conversion problem generator.
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/exponents-and-logarithms/logarithm-properties/exponentLogarithmConversion");

describe("generateProblem", () => {
  it("generates a problem with a variable base", () => {
    const options = {
      isMCQ: false,
      baseRange: { min: 2, max: 5 },
      exponentRange: { min: 2, max: 5 },
      withVariable: true,
      toLogarithm: true,
      toExponent: true,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).toMatch(
      /[a-z]\^\{\d+\} = [a-z]|\\log_\{\w+\}\{\w+\} = \d+/
    );
    expect(problem.solution[0].value).toMatch(
      /[a-z]\^\{\d+\} = [a-z]|\\log_\{\w+\}\{\w+\} = \d+/
    );
  });

  it("generates a problem with a numeric base", () => {
    const options = {
      isMCQ: false,
      baseRange: { min: 2, max: 5 },
      exponentRange: { min: 2, max: 5 },
      withVariable: false,
      toLogarithm: true,
      toExponent: true,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).toMatch(
      /\d+\^\{\d+\} = \d+|\\log_\{\d+\}\{\d+\} = \d+/
    );
    expect(problem.solution[0].value).toMatch(
      /\d+\^\{\d+\} = \d+|\\log_\{\d+\}\{\d+\} = \d+/
    );
  });

  it("generates a multiple choice problem", () => {
    const options = {
      isMCQ: true,
      baseRange: { min: 2, max: 5 },
      exponentRange: { min: 2, max: 5 },
      withVariable: false,
      toLogarithm: true,
      toExponent: true,
    };
    const problem = generateProblem(options);
    expect(problem.problem[2].type).toBe("options");
    expect(problem.problem[2].value.length).toBe(4);
    expect(problem.solution[0].type).toBe("choice");
  });

  it("generates a problem that converts from exponent to logarithm", () => {
    const options = {
      isMCQ: false,
      baseRange: { min: 2, max: 5 },
      exponentRange: { min: 2, max: 5 },
      withVariable: false,
      toLogarithm: true,
      toExponent: false,
    };
    const problem = generateProblem(options);
    expect(problem.problem[0].value).toBe(
      "Convert the following expression to logarithm form:"
    );
    expect(problem.problem[1].value).toMatch(/\d+\^\{\d+\} = \d+/);
    expect(problem.solution[0].value).toMatch(/\\log_\{\d+\}\{\d+\} = \d+/);
  });

  it("generates a problem that converts from logarithm to exponent", () => {
    const options = {
      isMCQ: false,
      baseRange: { min: 2, max: 5 },
      exponentRange: { min: 2, max: 5 },
      withVariable: false,
      toLogarithm: false,
      toExponent: true,
    };
    const problem = generateProblem(options);
    expect(problem.problem[0].value).toBe(
      "Convert the following expression to exponent form:"
    );
    expect(problem.problem[1].value).toMatch(/\\log_\{\d+\}\{\d+\} = \d+/);
    expect(problem.solution[0].value).toMatch(/\d+\^\{\d+\} = \d+/);
  });

  it("generates a problem with correct steps", () => {
    const options = {
      isMCQ: false,
      baseRange: { min: 2, max: 5 },
      exponentRange: { min: 2, max: 5 },
      withVariable: false,
      toLogarithm: true,
      toExponent: true,
    };
    const problem = generateProblem(options);
    expect(problem.steps[1].value).toMatch(
      /(\d+\^\{\d+\} = \d+ \\implies \\log_\{\d+\}\{\d+\} = \d+|\\log_\{\d+\}\{\d+\} = \d+ \\implies \d+\^\{\d+\} = \d+)/
    );
  });

  it("validates the range of base, exponent, and value of logarithm", () => {
    const options = {
      isMCQ: false,
      baseRange: { min: 2, max: 5 },
      exponentRange: { min: 2, max: 5 },
      withVariable: false,
      toLogarithm: true,
      toExponent: false,
    };
    const problem = generateProblem(options);
    const base = parseInt(problem.problem[1].value.match(/\d+/g)[0]);
    const exponent = parseInt(problem.problem[1].value.match(/\d+/g)[1]);
    const value = parseInt(problem.problem[1].value.match(/\d+/g)[2]);
    expect(base).toBeGreaterThanOrEqual(options.baseRange.min);
    expect(base).toBeLessThanOrEqual(options.baseRange.max);
    expect(exponent).toBeGreaterThanOrEqual(options.exponentRange.min);
    expect(exponent).toBeLessThanOrEqual(options.exponentRange.max);
    expect(value).toBe(base ** exponent);
  });

  it("validates the range of base, exponent, and value of exponent", () => {
    const options = {
      isMCQ: false,
      baseRange: { min: 2, max: 5 },
      exponentRange: { min: 2, max: 5 },
      withVariable: false,
      toLogarithm: false,
      toExponent: true,
    };
    const problem = generateProblem(options);
    const base = parseInt(problem.problem[1].value.match(/\d+/g)[0]);
    const exponent = parseInt(problem.problem[1].value.match(/\d+/g)[2]);
    const value = parseInt(problem.problem[1].value.match(/\d+/g)[1]);
    expect(base).toBeGreaterThanOrEqual(options.baseRange.min);
    expect(base).toBeLessThanOrEqual(options.baseRange.max);
    expect(exponent).toBeGreaterThanOrEqual(options.exponentRange.min);
    expect(exponent).toBeLessThanOrEqual(options.exponentRange.max);
    expect(value).toBe(base ** exponent);
  });

  it("still generates a problem when toLogarithm and toExponent are the same (both false)", () => {
    const options = {
      isMCQ: false,
      baseRange: { min: 2, max: 5 },
      exponentRange: { min: 2, max: 5 },
      withVariable: false,
      toLogarithm: false,
      toExponent: false,
    };
    const problem = generateProblem(options);
    expect(problem.problem[0].value).toMatch(
      /Convert the following expression to (exponent|logarithm) form:/
    );
    expect(problem.problem[1].value).toMatch(
      /\d+\^\{\d+\} = \d+|\\log_\{\d+\}\{\d+\} = \d+/
    );
  });
});
