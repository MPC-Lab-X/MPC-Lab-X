/**
 * @file tests/generators/math/algebra/exponents-and-logarithms/logarithm-properties/quotientRule.test.js
 * @description Tests for the quotient rule for logarithms problem generator.
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/exponents-and-logarithms/logarithm-properties/quotientRule");

describe("generateProblem", () => {
  it("generates a problem with a variable base and values", () => {
    const options = {
      isMCQ: false,
      baseRange: { min: 2, max: 5 },
      valueRange: { min: 2, max: 5 },
      withVariable: true,
      toQuotient: true,
      toTerms: true,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).toMatch(
      /\\log_\{[a-z]\}\{[a-z]\} - \\log_\{[a-z]\}\{[a-z]\}|\\log_\{[a-z]\}\{\\frac\{[a-z]\}\{[a-z]\}\}/
    );
    expect(problem.solution[0].value).toMatch(
      /\\log_\{[a-z]\}\{[a-z]\} - \\log_\{[a-z]\}\{[a-z]\}|\\log_\{[a-z]\}\{\\frac\{[a-z]\}\{[a-z]\}\}/
    );
  });

  it("generates a problem with a numeric base and values", () => {
    const options = {
      isMCQ: false,
      baseRange: { min: 2, max: 5 },
      valueRange: { min: 2, max: 5 },
      withVariable: false,
      toQuotient: true,
      toTerms: false,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).toMatch(
      /\\log_\{\d+\}\{\d+\} - \\log_\{\d+\}\{\d+\}|\\log_\{\d+\}\{\\frac\{\d+\}\{\d+\}\}/
    );
    expect(problem.solution[0].value).toMatch(
      /\\log_\{\d+\}\{\d+\} - \\log_\{\d+\}\{\d+\}|\\log_\{\d+\}\{\\frac\{\d+\}\{\d+\}\}|\\log_\{\d+\}\{\d+\}/
    );
  });

  it("generates a problem with variables if toTerms are true", () => {
    const options = {
      isMCQ: false,
      baseRange: { min: 2, max: 5 },
      valueRange: { min: 2, max: 5 },
      withVariable: false,
      toQuotient: false,
      toTerms: true,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).toMatch(
      /\\log_\{[a-z]\}\{[a-z]\} - \\log_\{[a-z]\}\{[a-z]\}|\\log_\{[a-z]\}\{\\frac\{[a-z]\}\{[a-z]\}\}/
    );
    expect(problem.solution[0].value).toMatch(
      /\\log_\{[a-z]\}\{[a-z]\} - \\log_\{[a-z]\}\{[a-z]\}|\\log_\{[a-z]\}\{\\frac\{[a-z]\}\{[a-z]\}\}/
    );
  });

  it("generates a multiple choice problem", () => {
    const options = {
      isMCQ: true,
      baseRange: { min: 2, max: 5 },
      valueRange: { min: 2, max: 5 },
      withVariable: false,
      toQuotient: true,
      toTerms: false,
    };
    const problem = generateProblem(options);
    expect(problem.problem[2].type).toBe("options");
    expect(problem.problem[2].value.length).toBe(4);
    expect(problem.solution[0].type).toBe("choice");
  });

  it("generates a problem that converts from terms to quotient", () => {
    const options = {
      isMCQ: false,
      baseRange: { min: 2, max: 5 },
      valueRange: { min: 2, max: 5 },
      withVariable: false,
      toQuotient: true,
      toTerms: false,
    };
    const problem = generateProblem(options);
    expect(problem.problem[0].value).toBe(
      "Convert the following to a single logarithm:"
    );
    expect(problem.problem[1].value).toMatch(
      /\\log_\{\d+\}\{\d+\} - \\log_\{\d+\}\{\d+\}/
    );
    expect(problem.solution[0].value).toMatch(
      /\\log_\{\d+\}\{\\frac\{\d+\}\{\d+\}\}|\\log_\{\d+\}\{\d+\}/
    );
  });

  it("generates a problem that converts from quotient to terms", () => {
    const options = {
      isMCQ: false,
      baseRange: { min: 2, max: 5 },
      valueRange: { min: 2, max: 5 },
      withVariable: false,
      toQuotient: false,
      toTerms: true,
    };
    const problem = generateProblem(options);
    expect(problem.problem[0].value).toBe(
      "Convert the following to multiple logarithms:"
    );
    expect(problem.problem[1].value).toMatch(
      /\\log_\{[a-z]\}\{\\frac\{[a-z]\}\{[a-z]\}\}/
    );
    expect(problem.solution[0].value).toMatch(
      /\\log_\{[a-z]\}\{[a-z]\} - \\log_\{[a-z]\}\{[a-z]\}/
    );
  });

  it("generates a problem with correct steps", () => {
    const options = {
      isMCQ: false,
      baseRange: { min: 2, max: 5 },
      valueRange: { min: 2, max: 5 },
      withVariable: false,
      toQuotient: true,
      toTerms: false,
    };
    const problem = generateProblem(options);
    const [base, value1, , value2] = problem.problem[1].value
      .match(/\\log_\{(\d+)\}\{(\d+)\} - \\log_\{(\d+)\}\{(\d+)\}/)
      .slice(1, 5);
    expect(problem.steps[1].value).toBe(
      `\\log_{${base}}{${value1}} - \\log_{${base}}{${value2}} = \\log_{${base}}{\\frac{${value1}}{${value2}}}`
    );
  });

  it("validates the range of the values", () => {
    const options = {
      isMCQ: false,
      baseRange: { min: 2, max: 5 },
      valueRange: { min: 2, max: 5 },
      withVariable: false,
      toQuotient: true,
      toTerms: false,
    };
    const problem = generateProblem(options);
    const values = problem.problem[1].value
      .match(/\\log_\{\d+\}\{\d+\}/g)
      .map((value) => parseInt(value.match(/\d+/g)[0]));
    expect(values[0]).toBeGreaterThanOrEqual(options.valueRange.min);
    expect(values[0]).toBeLessThanOrEqual(options.valueRange.max);
    expect(values[1]).toBeGreaterThanOrEqual(options.valueRange.min);
    expect(values[1]).toBeLessThanOrEqual(options.valueRange.max);
  });

  it("still generates a problem when toQuotient and toTerms are the same (both false)", () => {
    const options = {
      isMCQ: false,
      baseRange: { min: 2, max: 5 },
      valueRange: { min: 2, max: 5 },
      withVariable: false,
      toQuotient: false,
      toTerms: false,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).toMatch(
      /\\log_\{\d+\}\{\d+\} - \\log_\{\d+\}\{\d+\}|\\log_\{[a-z]\}\{\\frac\{[a-z]\}\{[a-z]\}\}/
    );
    expect(problem.solution[0].value).toMatch(
      /\\log_\{[a-z]\}\{[a-z]\} - \\log_\{[a-z]\}\{[a-z]\}|\\log_\{\d+\}\{\\frac\{\d+\}\{\d+\}\}|\\log_\{\d+\}\{\d+\}/
    );
  });
});
