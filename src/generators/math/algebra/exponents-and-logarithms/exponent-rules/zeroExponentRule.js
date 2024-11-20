/**
 * @file src/generators/math/algebra/exponents-and-logarithms/exponent-rules/zeroExponentRule.js
 * @description Generates problems involving the zero exponent rule. Example: a^0 = 1.
 */

const { randomInt, randomVariable } = require("../../../../../utils/random");
const expressionTemplates = require("../../../../../utils/expressionTemplates");

/**
 * @function generateProblem - Generate a problem involving the zero exponent rule.
 * @param {Object} options - The options for generating the problem.
 * @param {boolean} options.isMCQ - Whether the problem is multiple choice.
 * @param {object} options.baseRange - The range of the base of the powers.
 * @param {boolean} options.withVariable - Whether to include a variable in the base.
 * @returns {Object} - The problem involving the zero exponent rule.
 */
const generateProblem = (options) => {
  const base = options.withVariable
    ? randomVariable()
    : randomInt(options.baseRange.min, options.baseRange.max, true);

  // Create the problem statement
  const problem = [
    {
      type: "text",
      value: `Simplify the following expression:`,
    },
    {
      type: "formula",
      value: expressionTemplates.exponent.zeroExponent(base),
    },
  ];

  // Prepare steps for solution
  const steps = [
    {
      type: "text",
      value: `Any non-zero number raised to the power of 0 is equal to 1:`,
    },
    {
      type: "formula",
      value: `${expressionTemplates.exponent.zeroExponent(base)} = 1`,
    },
  ];

  // If the problem is multiple choice
  if (options.isMCQ) {
    const choices = [
      {
        type: "formula",
        value: "1",
        correct: true,
      },
      {
        type: "formula",
        value: "0",
      },
      {
        type: "formula",
        value: expressionTemplates.exponent.zeroExponent(base),
      },
      {
        type: "formula",
        value: expressionTemplates.exponent.power(base, 1),
      },
    ];

    // Shuffle the choices
    choices.sort(() => Math.random() - 0.5);

    // Add the choices to the problem
    problem.push({
      type: "options",
      value: choices,
    });

    // Determine the correct choice
    const solution = [
      {
        type: "choice",
        choice: choices.findIndex((choice) => {
          if (choice.correct) {
            delete choice.correct;
            return true;
          }
        }),
      },
    ];

    return { problem, steps, solution };
  } else {
    // Prepare solution
    const solution = [
      {
        type: "numeric",
        decimal: 1,
      },
    ];

    return { problem, steps, solution };
  }
};

module.exports = generateProblem;
