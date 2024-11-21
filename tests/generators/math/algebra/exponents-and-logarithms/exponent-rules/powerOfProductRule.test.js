/**
 * @file tests/generators/math/algebra/exponents-and-logarithms/exponent-rules/powerOfProductRule.test.js
 * @description Tests for the power of a product rule problem generator.
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/exponents-and-logarithms/exponent-rules/powerOfProductRule");

describe("generateProblem", () => {
  it("generates a problem with a variable base", () => {
    const options = {
      isMCQ: false,
      exponentRange: { min: 2, max: 3 },
      innerExponentRange: { min: 2, max: 3 },
      numFactors: 2,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).toMatch(
      /\([a-z]\^\{\d\}[a-z]\^\{\d\}\)\^\{\d\}/
    );
    expect(problem.solution[0].value).toMatch(/[a-z]\^\{\d+\}/);
  });

  it("generates a multiple choice problem", () => {
    const options = {
      isMCQ: true,
      exponentRange: { min: 2, max: 3 },
      innerExponentRange: { min: 2, max: 3 },
      numFactors: 2,
    };
    const problem = generateProblem(options);
    expect(problem.problem[2].type).toBe("options");
    expect(problem.problem[2].value.length).toBe(4);
    expect(problem.solution[0].type).toBe("choice");
  });

  it("generates a problem with correct steps", () => {
    const options = {
      isMCQ: false,
      exponentRange: { min: 2, max: 3 },
      innerExponentRange: { min: 2, max: 3 },
      numFactors: 2,
    };
    const problem = generateProblem(options);
    const bases = problem.problem[1].value.match(/[a-z]/g);
    const exponents = problem.problem[1].value
      .match(/\^\{(\d+)\}/g)
      .map((exp) => parseInt(exp.replace(/^\^\{|\}$/g, "")));
    expect(problem.steps[2].value).toBe(
      `= ${bases[0]}^{${exponents[0] * exponents[2]}}${bases[1]}^{${
        exponents[1] * exponents[2]
      }}`
    );
  });

  it("generates a problem with a variable base and three factors", () => {
    const options = {
      isMCQ: false,
      exponentRange: { min: 2, max: 3 },
      innerExponentRange: { min: 2, max: 3 },
      numFactors: 3,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).toMatch(
      /\([a-z]\^\{\d\}[a-z]\^\{\d\}[a-z]\^\{\d\}\)\^\{\d\}/
    );
    expect(problem.solution[0].value).toMatch(/[a-z]\^\{\d+\}/);
  });

  it("generates a multiple choice problem with three factors", () => {
    const options = {
      isMCQ: true,
      exponentRange: { min: 2, max: 3 },
      innerExponentRange: { min: 2, max: 3 },
      numFactors: 3,
    };
    const problem = generateProblem(options);
    expect(problem.problem[2].type).toBe("options");
    expect(problem.problem[2].value.length).toBe(4);
    expect(problem.solution[0].type).toBe("choice");
  });

  it("generates a problem with correct steps with three factors", () => {
    const options = {
      isMCQ: false,
      exponentRange: { min: 2, max: 3 },
      innerExponentRange: { min: 2, max: 3 },
      numFactors: 3,
    };
    const problem = generateProblem(options);
    const bases = problem.problem[1].value.match(/[a-z]/g);
    const exponents = problem.problem[1].value
      .match(/\^\{(\d+)\}/g)
      .map((exp) => parseInt(exp.replace(/^\^\{|\}$/g, "")));
    expect(problem.steps[2].value).toBe(
      `= ${bases[0]}^{${exponents[0] * exponents[3]}}${bases[1]}^{${
        exponents[1] * exponents[3]
      }}${bases[2]}^{${exponents[2] * exponents[3]}}`
    );
  });

  it("does not generate a power of 1", () => {
    const options = {
      isMCQ: false,
      exponentRange: { min: 2, max: 3 },
      innerExponentRange: { min: 1, max: 1 },
      numFactors: 2,
    };
    const problem = generateProblem(options);
    expect(problem.problem[1].value).not.toMatch(/\^\{1\}/);
    expect(problem.solution[0].value).not.toMatch(/\^\{1\}/);
  });
});
