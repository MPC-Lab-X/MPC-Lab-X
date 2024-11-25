/**
 * @file tests/generators/math/algebra/exponents-and-logarithms/logarithm-properties/productRule.test.js
 * @description Tests for the product rule for logarithms problem generator.
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/exponents-and-logarithms/logarithm-properties/productRule");

describe("generateProblem", () => {
  it("generates a problem with a variable base and values", () => {
    const options = {
      isMCQ: false,
      baseRange: { min: 2, max: 5 },
      valueRange: { min: 2, max: 5 },
      withVariable: true,
      toProduct: true,
      toFactors: true,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).toMatch(
      /\\log_\{[a-z]\}\{[a-z]\} \+ \\log_\{[a-z]\}\{[a-z]\}|\\log_\{[a-z]\}\{[a-z][a-z]\}/
    );
    expect(problem.solution[0].value).toMatch(
      /\\log_\{[a-z]\}\{[a-z]\} \+ \\log_\{[a-z]\}\{[a-z]\}|\\log_\{[a-z]\}\{[a-z][a-z]\}/
    );
  });

  it("generates a problem with a numeric base and values", () => {
    const options = {
      isMCQ: false,
      baseRange: { min: 2, max: 5 },
      valueRange: { min: 2, max: 5 },
      withVariable: false,
      toProduct: true,
      toFactors: false,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).toMatch(
      /\\log_\{\d+\}\{\d+\} \+ \\log_\{\d+\}\{\d+\}|\\log_\{\d+\}\{\d+\}/
    );
    expect(problem.solution[0].value).toMatch(
      /\\log_\{\d+\}\{\d+\} \+ \\log_\{\d+\}\{\d+\}|\\log_\{\d+\}\{\d+\}/
    );
  });

  it("generates a problem with variables if toFactors are true", () => {
    const options = {
      isMCQ: false,
      baseRange: { min: 2, max: 5 },
      valueRange: { min: 2, max: 5 },
      withVariable: false,
      toProduct: true,
      toFactors: true,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).toMatch(
      /\\log_\{[a-z]\}\{[a-z]\} \+ \\log_\{[a-z]\}\{[a-z]\}|\\log_\{[a-z]\}\{[a-z][a-z]\}/
    );
    expect(problem.solution[0].value).toMatch(
      /\\log_\{[a-z]\}\{[a-z]\} \+ \\log_\{[a-z]\}\{[a-z]\}|\\log_\{[a-z]\}\{[a-z][a-z]\}/
    );
  });

  it("generates a multiple choice problem", () => {
    const options = {
      isMCQ: true,
      baseRange: { min: 2, max: 5 },
      valueRange: { min: 2, max: 5 },
      withVariable: false,
      toProduct: true,
      toFactors: false,
    };
    const problem = generateProblem(options);
    expect(problem.problem[2].type).toBe("options");
    expect(problem.problem[2].value.length).toBe(4);
    expect(problem.solution[0].type).toBe("choice");
  });

  it("generates a problem with correct steps", () => {
    const options = {
      isMCQ: false,
      baseRange: { min: 2, max: 5 },
      valueRange: { min: 2, max: 5 },
      withVariable: false,
      toProduct: true,
      toFactors: false,
    };
    const problem = generateProblem(options);
    const [base, value1, , value2] = problem.problem[1].value
      .match(/\\log_\{(\d+)\}\{(\d+)\} \+ \\log_\{(\d+)\}\{(\d+)\}/)
      .slice(1, 5);
    expect(problem.steps[1].value).toBe(
      `\\log_{${base}}{${value1}} + \\log_{${base}}{${value2}} = \\log_{${base}}{${
        value1 * value2
      }}`
    );
  });

  it("validates the range of the values", () => {
    const options = {
      isMCQ: false,
      baseRange: { min: 2, max: 5 },
      valueRange: { min: 2, max: 5 },
      withVariable: false,
      toProduct: true,
      toFactors: false,
    };
    const problem = generateProblem(options);
    const values = problem.problem[1].value
      .match(/\\log_\{\d+\}\{\d+\}/g)
      .map((val) => parseInt(val.match(/\d+/)[0]));
    expect(values[0]).toBeGreaterThanOrEqual(options.valueRange.min);
    expect(values[0]).toBeLessThanOrEqual(options.valueRange.max);
    expect(values[1]).toBeGreaterThanOrEqual(options.valueRange.min);
    expect(values[1]).toBeLessThanOrEqual(options.valueRange.max);
  });

  it("still generates a problem when toProduct and toFactors are the same (both false)", () => {
    const options = {
      isMCQ: false,
      baseRange: { min: 2, max: 5 },
      valueRange: { min: 2, max: 5 },
      withVariable: false,
      toProduct: false,
      toFactors: false,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).toMatch(
      /\\log_\{[a-z\d]+\}\{[a-z\d]+\} \+ \\log_\{[a-z\d]+\}\{[a-z\d]+\}|\\log_\{[a-z\d]+\}\{[a-z\d]+\}/
    );
    expect(problem.solution[0].value).toMatch(
      /\\log_\{[a-z\d]+\}\{[a-z\d]+\} \+ \\log_\{[a-z\d]+\}\{[a-z\d]+\}|\\log_\{[a-z\d]+\}\{[a-z\d]+\}/
    );
  });
});
