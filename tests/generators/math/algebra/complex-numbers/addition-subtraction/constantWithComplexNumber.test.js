/**
 * @file src/generators/math/algebra/complex-numbers/addition-subtraction/constantWithComplexNumber.js
 * @description Generates problems involving the addition or subtraction of real constants and complex numbers. Example: 5 + (3 + 2i).
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/complex-numbers/addition-subtraction/constantWithComplexNumber");

describe("generateProblem", () => {
  it("generates a problem with addition", () => {
    const options = {
      isMCQ: false,
      minReal: 1,
      maxReal: 5,
      minImaginary: 1,
      maxImaginary: 5,
      constant: 3,
      allowAddition: true,
      allowSubtraction: false,
    };
    const problem = generateProblem(options);
    expect(problem.problem[0].value).toMatch(
      /Calculate the following: 3 \+ \(\d+ \+ \d+i\)/
    );
    expect(problem.solution[0].value).toMatch(/\d+ \+ \d+i/);
  });

  it("generates a problem with subtraction", () => {
    const options = {
      isMCQ: false,
      minReal: 1,
      maxReal: 5,
      minImaginary: 1,
      maxImaginary: 5,
      constant: 3,
      allowAddition: false,
      allowSubtraction: true,
    };
    const problem = generateProblem(options);
    expect(problem.problem[0].value).toMatch(/^Calculate the following:/);
    expect(problem.solution[0].value).toMatch(/-?\d* ?- \d+i/);
  });

  it("generates a multiple choice problem", () => {
    const options = {
      isMCQ: true,
      minReal: 1,
      maxReal: 5,
      minImaginary: 1,
      maxImaginary: 5,
      constant: 3,
      allowAddition: true,
      allowSubtraction: true,
    };
    const problem = generateProblem(options);
    expect(problem.problem[2].value).toHaveLength(4);
    expect(problem.solution[0].choice).toBeGreaterThanOrEqual(0);
    expect(problem.solution[0].choice).toBeLessThan(4);
  });

  it("generates a problem with default constant", () => {
    const options = {
      isMCQ: false,
      minReal: 1,
      maxReal: 5,
      minImaginary: 1,
      maxImaginary: 5,
      allowAddition: true,
      allowSubtraction: true,
    };
    const problem = generateProblem(options);
    expect(problem.problem[0].value).toMatch(
      /Calculate the following: \d+ [+-] \(\d+ [+-] \d+i\)/
    );
  });
});
