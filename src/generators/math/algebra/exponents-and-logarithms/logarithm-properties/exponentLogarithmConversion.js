/**
 * @file src/generators/math/algebra/exponents-and-logarithms/logarithm-properties/exponentLogarithmConversion.js
 * @description Generates problems involving converting between exponents and logarithms. Example: b^y = x <=> log_b(x) = y.
 */

const {
  randomInt,
  randomBool,
  randomVariable,
} = require("../../../../../utils/random");
const expressionTemplates = require("../../../../../utils/expressionTemplates");

/**
 * @function generateProblem - Generate a problem involving converting between exponents and logarithms.
 * @param {Object} options - The options for generating the problem.
 * @param {boolean} options.isMCQ - Whether the problem is multiple choice.
 * @param {object} options.baseRange - The range of the base of the powers.
 * @param {object} options.exponentRange - The range of the exponents of the powers.
 * @param {boolean} options.withVariable - Whether to include a variable in the base and value.
 * @param {boolean} options.toLogarithm - Whether to convert to a logarithm form.
 * @param {boolean} options.toExponent - Whether to convert to an exponent form.
 * @returns {Object} - The problem involving converting between exponents and logarithms.
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
  const value = options.withVariable ? randomVariable() : base ** exponent;
  const isOpposite =
    options.toLogarithm === options.toExponent
      ? randomBool()
      : options.toExponent;

  // Exponent form
  const exponentForm = expressionTemplates.exponent.powerEquality(
    base,
    exponent,
    value
  );

  // Logarithm form
  const logarithmForm = expressionTemplates.logarithm.equality(
    base,
    value,
    exponent
  );

  // Create the problem statement
  const problem = [
    {
      type: "text",
      value: isOpposite
        ? "Convert the following expression to exponent form:"
        : "Convert the following expression to logarithm form:",
    },
    {
      type: "formula",
      value: isOpposite ? logarithmForm : exponentForm,
    },
  ];

  // Prepare steps for solution
  const steps = [
    {
      type: "text",
      value: isOpposite
        ? "To convert a logarithm to exponent form, rewrite the expression as:"
        : "To convert an exponent to logarithm form, rewrite the expression as:",
    },
    {
      type: "formula",
      value: isOpposite
        ? `${logarithmForm} \\implies ${exponentForm}`
        : `${exponentForm} \\implies ${logarithmForm}`,
    },
  ];

  // If the problem is multiple choice
  if (options.isMCQ) {
    const choices = [
      {
        type: "formula",
        value: logarithmForm,
        correct: !isOpposite ? true : undefined,
      },
      {
        type: "formula",
        value: exponentForm,
        correct: isOpposite ? true : undefined,
      },
      {
        type: "formula",
        value: expressionTemplates.exponent.powerEquality(
          value,
          exponent,
          base
        ),
      },
      {
        type: "formula",
        value: expressionTemplates.logarithm.equality(value, base, exponent),
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
        value: isOpposite ? logarithmForm : exponentForm,
      },
    ];

    return { problem, steps, solution };
  }
};

module.exports = generateProblem;
