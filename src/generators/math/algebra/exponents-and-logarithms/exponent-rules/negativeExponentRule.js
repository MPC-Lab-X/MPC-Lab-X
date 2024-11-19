/**
 * @file src/generators/math/algebra/exponents-and-logarithms/exponent-rules/negativeExponentRule.js
 * @description Generates problems involving the negative exponent rule. Example: a^-3 = 1/a^3.
 */

const {
  randomInt,
  randomBool,
  randomVariable,
} = require("../../../../../utils/random");
const expressionTemplates = require("../../../../../utils/expressionTemplates");

/**
 * @function generateProblem - Generate a problem involving the negative exponent rule.
 * @param {Object} options - The options for generating the problem.
 * @param {boolean} options.isMCQ - Whether the problem is multiple choice.
 * @param {object} options.baseRange - The range of the base of the powers.
 * @param {object} options.exponentRange - The range of the exponents of the powers.
 * @param {boolean} options.withVariable - Whether to include a variable in the base.
 * @returns {Object} - The problem involving the negative exponent rule.
 */
const generateProblem = (options) => {
  const base = options.withVariable
    ? randomVariable()
    : randomInt(options.baseRange.min, options.baseRange.max, true);
  const exponent = randomInt(
    options.exponentRange.min,
    options.exponentRange.max,
    true
  );
  const isOpposite = randomBool();

  // Negative exponent form
  const negativeExponentForm = expressionTemplates.exponent.power(
    base,
    exponent
  );

  // Reciprocal form
  const reciprocalForm = `\\frac{1}{${expressionTemplates.exponent.power(
    base,
    -exponent
  )}}`;

  // Create the problem statement
  const problem = [
    {
      type: "text",
      value: `${
        isOpposite
          ? "Convert the following expression with a negative exponent"
          : "Simplify the following expression with a reciprocal (using the negative exponent rule)"
      }${options.withVariable ? "" : ", keeping the base the same"}:`,
    },
    {
      type: "formula",
      value: isOpposite ? reciprocalForm : negativeExponentForm,
    },
  ];

  // Prepare steps for solution
  const steps = [
    {
      type: "text",
      value: `${
        isOpposite
          ? "To simplify a reciprocal with a negative exponent, move the base to the opposite side of the fraction bar and change the sign of the exponent:"
          : "To convert a negative exponent to a reciprocal, move the base to the opposite side of the fraction bar and change the sign of the exponent:"
      }`,
    },
    {
      type: "formula",
      value: `${
        isOpposite
          ? `${reciprocalForm} = ${negativeExponentForm}`
          : `${negativeExponentForm} = ${reciprocalForm}`
      }`,
    },
  ];

  // If the problem is multiple choice
  if (options.isMCQ) {
    const options = [
      {
        type: "formula",
        value: isOpposite ? negativeExponentForm : reciprocalForm,
        correct: true,
      },
      {
        type: "formula",
        value: isOpposite
          ? `\\frac{${expressionTemplates.exponent.power(base, exponent)}}{1}`
          : `\\frac{1}{${expressionTemplates.exponent.power(base, exponent)}}`,
      },
      {
        type: "formula",
        value: isOpposite
          ? `\\frac{1}{${expressionTemplates.exponent.power(base, exponent)}}`
          : expressionTemplates.exponent.power(base, -exponent),
      },
      {
        type: "formula",
        value: isOpposite
          ? expressionTemplates.exponent.power(base, -exponent)
          : `\\frac{${expressionTemplates.exponent.power(base, exponent)}}{1}`,
      },
    ];

    // Shuffle the options
    options.sort(() => Math.random() - 0.5);

    // Add the choices to the problem
    problem.push({
      type: "options",
      value: options,
    });

    // Determine the correct choice
    const solution = [
      {
        type: "choice",
        choice: options.findIndex((option) => {
          if (option.correct) {
            delete option.correct;
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
        value: isOpposite ? negativeExponentForm : reciprocalForm,
      },
    ];

    return { problem, steps, solution };
  }
};

module.exports = generateProblem;
