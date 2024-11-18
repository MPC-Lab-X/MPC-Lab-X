/**
 * @file src/generators/math/algebra/exponents-and-logarithms/exponent-rules/quotientOfPowersRule.js
 * @description Generates problems involving the quotient of powers rule. Example: (a^3)/(a^4) = a^-1.
 */

const { randomInt, randomVariable } = require("../../../../../utils/random");
const expressionTemplates = require("../../../../../utils/expressionTemplates");

/**
 * @function generateProblem - Generate a problem involving the quotient of powers rule.
 * @param {Object} options - The options for generating the problem.
 * @param {boolean} options.isMCQ - Whether the problem is multiple choice.
 * @param {object} options.baseRange - The range of the base of the powers.
 * @param {object} options.exponentRange - The range of the exponents of the powers.
 * @param {boolean} options.withVariable - Whether to include a variable in the base.
 * @returns {Object} - The problem involving the quotient of powers rule.
 */
const generateProblem = (options) => {
  const base = options.withVariable
    ? randomVariable()
    : randomInt(options.baseRange.min, options.baseRange.max, true);
  const exponent1 = randomInt(
    options.exponentRange.min,
    options.exponentRange.max,
    true
  );
  const exponent2 = randomInt(
    options.exponentRange.min,
    options.exponentRange.max,
    true
  );

  // Create the problem statement
  const problem = [
    {
      type: "text",
      value: `Simplify the following expression${
        options.withVariable ? "" : ", keeping the base the same"
      }:`,
    },
    {
      type: "formula",
      value: expressionTemplates.exponent.quotientOfPowers(
        base,
        exponent1,
        exponent2
      ),
    },
  ];

  // Calculate the result exponent
  const resultExponent = exponent1 - exponent2;

  // Prepare steps for solution
  const steps = [
    {
      type: "text",
      value: `To divide the powers, subtract the exponents:`,
    },
    {
      type: "formula",
      value: expressionTemplates.exponent.quotientOfPowers(
        base,
        exponent1,
        exponent2
      ),
    },
    {
      type: "text",
      value: `Subtract the exponents: ${exponent1} - ${exponent2} = ${resultExponent}.`,
    },
  ];

  // If the problem is multiple choice
  if (options.isMCQ) {
    const choices = [
      {
        type: "formula",
        value: expressionTemplates.exponent.power(base, resultExponent),
        correct: true,
      },
      {
        type: "formula",
        value: expressionTemplates.exponent.power(base, exponent1 + exponent2),
      },
      {
        type: "formula",
        value: expressionTemplates.exponent.power(
          base,
          resultExponent +
            randomInt(
              options.exponentRange.min,
              options.exponentRange.max,
              true
            )
        ),
      },
      {
        type: "formula",
        value: expressionTemplates.exponent.power(
          base,
          resultExponent -
            randomInt(
              options.exponentRange.min,
              options.exponentRange.max,
              true
            )
        ),
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
        type: "formula",
        value: expressionTemplates.exponent.power(base, resultExponent),
      },
    ];

    return { problem, steps, solution };
  }
};

module.exports = generateProblem;
