/**
 * @file tests/generators/math/algebra/complex-numbers/addition-subtraction/basicAdditionSubtraction.test.js
 * @description Tests for basic addition and subtraction of complex numbers problem generator.
 */

const generateProblem = require("../../../../../../src/generators/math/algebra/complex-numbers/addition-subtraction/basicAdditionSubtraction");

describe("generateProblem", () => {
  it("generates a problem with addition of complex numbers", () => {
    const options = {
      isMCQ: false,
      minReal: 1,
      maxReal: 5,
      minImaginary: 1,
      maxImaginary: 5,
      allowAddition: true,
      allowSubtraction: false,
    };

    const problem = generateProblem(options);
    expect(problem.problem[0].value).toMatch(
      /Calculate the following: \(\d+ \+ \d+i\) \+ \(\d+ \+ \d+i\)/
    );
    expect(problem.solution[0].value).toMatch(/\d+(\s\+\s\d+i)?/);
  });

  it("generates a problem with subtraction of complex numbers", () => {
    const options = {
      isMCQ: false,
      minReal: 1,
      maxReal: 5,
      minImaginary: 1,
      maxImaginary: 5,
      allowAddition: false,
      allowSubtraction: true,
    };

    const problem = generateProblem(options);
    expect(problem.problem[0].value).toMatch(
      /Calculate the following: \(\d+ \+ \d+i\) - \(\d+ \+ \d+i\)/
    );
    expect(problem.solution[0].value).toMatch(/\d+(\s\+\s\d+i)?/);
  });

  it("generates a multiple choice problem", () => {
    const options = {
      isMCQ: true,
      minReal: 1,
      maxReal: 5,
      minImaginary: 1,
      maxImaginary: 5,
      allowAddition: true,
      allowSubtraction: true,
    };

    const problem = generateProblem(options);
    expect(problem.problem[2].type).toBe("options");
    expect(problem.problem[2].value.length).toBe(4);
    expect(problem.solution[0].type).toBe("choice");
  });

  it("generates a problem with both addition and subtraction allowed", () => {
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
      /Calculate the following: \(\d+ \+ \d+i\) [+-] \(\d+ \+ \d+i\)/
    );
    expect(problem.solution[0].value).toMatch(/\d+(\s[+-]\s\d+i)?/);
  });
});
