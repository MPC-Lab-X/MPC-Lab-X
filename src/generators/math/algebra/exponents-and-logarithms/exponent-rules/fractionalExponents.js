/**
 * @file src/generators/math/algebra/exponents-and-logarithms/exponent-rules/fractionalExponents.js
 * @description Generates problems involving fractional exponents. Example: a^(m/n) = n√(a^m).
 */

const {
  randomInt,
  randomBool,
  randomVariable,
} = require("../../../../../utils/random");
const expressionTemplates = require("../../../../../utils/expressionTemplates");

/**
 * @function generateProblem - Generate a problem involving fractional exponents.
 * @param {Object} options - The options for generating the problem.
 * @param {boolean} options.isMCQ - Whether the problem is multiple choice.
 * @param {object} options.baseRange - The range of the base of the powers.
 * @param {object} options.numeratorExponentRange - The range of the numerator exponents.
 * @param {object} options.denominatorExponentRange - The range of the denominator exponents.
 * @param {boolean} options.withVariable - Whether to include a variable in the base.
 * @returns {Object} - The problem involving fractional exponents.
 */
const generateProblem = (options) => {
  const base = options.withVariable
    ? randomVariable()
    : randomInt(options.baseRange.min, options.baseRange.max, true);
  const numerator = randomInt(
    options.numeratorExponentRange.min,
    options.numeratorExponentRange.max,
    true
  );
  const denominator = randomInt(
    options.denominatorExponentRange.min,
    options.denominatorExponentRange.max,
    true
  );
  const isOpposite = randomBool();

  // Fractional exponent form
  const fractionalExponentForm =
    expressionTemplates.exponent.fractionOfExponents(
      base,
      numerator,
      denominator
    );

  // Radical form
  const radicalForm = expressionTemplates.radical.root(
    denominator,
    expressionTemplates.exponent.power(base, numerator)
  );

  // Create the problem statement
  const problem = [
    {
      type: "text",
      value: `${
        isOpposite
          ? "Convert the following expression to a fractional exponent"
          : "Convert the following expression to a radical"
      }${options.withVariable ? "" : ", keeping the base the same"}:`,
    },
    {
      type: "formula",
      value: isOpposite ? radicalForm : fractionalExponentForm,
    },
  ];

  // Prepare steps for solution
  const steps = [
    {
      type: "text",
      value: isOpposite
        ? `To convert a radical to a fractional exponent, the index of the radical becomes the denominator and the exponent of the radicand becomes the numerator:`
        : `To convert a fractional exponent to a radical, the denominator becomes the index of the radical and the numerator becomes the exponent of the radicand:`,
    },
    {
      type: "formula",
      value: isOpposite
        ? `${radicalForm} = ${fractionalExponentForm}`
        : `${fractionalExponentForm} = ${radicalForm}`,
    },
  ];

  // If the problem is multiple choice
  if (options.isMCQ) {
    const choices = [
      {
        type: "formula",
        value: radicalForm,
        correct: !isOpposite ? true : undefined,
      },
      {
        type: "formula",
        value: fractionalExponentForm,
        correct: isOpposite ? true : undefined,
      },
      {
        type: "formula",
        value: expressionTemplates.radical.root(
          numerator,
          expressionTemplates.exponent.power(base, denominator)
        ),
      },
      {
        type: "formula",
        value: expressionTemplates.exponent.fractionOfExponents(
          base,
          denominator,
          numerator
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
        value: isOpposite ? fractionalExponentForm : radicalForm,
      },
    ];

    return { problem, steps, solution };
  }
};

module.exports = generateProblem;
