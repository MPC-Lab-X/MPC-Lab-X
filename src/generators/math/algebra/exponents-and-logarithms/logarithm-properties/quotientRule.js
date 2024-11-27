/**
 * @file src/generators/math/algebra/exponents-and-logarithms/logarithm-properties/quotientRule.js
 * @description Generates problems involving the quotient rule for logarithms. Example: log_b(x) - log_b(y) = log_b(x/y).
 */

const math = require("mathjs");
const {
  randomInt,
  randomBool,
  randomVariable,
} = require("../../../../../utils/random");
const expressionTemplates = require("../../../../../utils/expressionTemplates");

/**
 * @function generateProblem - Generate a problem involving the quotient rule for logarithms.
 * @param {Object} options - The options for generating the problem.
 * @param {boolean} options.isMCQ - Whether the problem is multiple choice.
 * @param {object} options.baseRange - The range of the base of the logarithms.
 * @param {object} options.valueRange - The range of the values of the logarithms.
 * @param {boolean} options.withVariable - Whether to include a variable in the base and value. (will be automatically set to true if toTerms is true)
 * @param {boolean} options.toQuotient - Whether to convert to a quotient.
 * @param {boolean} options.toTerms - Whether to convert to terms.
 * @returns {Object} - The problem involving the quotient rule for logarithms.
 */
const generateProblem = (options) => {
  const isOpposite =
    options.toQuotient === options.toTerms ? randomBool() : options.toTerms;
  if (isOpposite) options.withVariable = true;
  const base = options.withVariable
    ? randomVariable()
    : randomInt(options.baseRange.min, options.baseRange.max, true);
  const value1 = options.withVariable
    ? randomVariable()
    : randomInt(options.valueRange.min, options.valueRange.max, true);
  const value2 = options.withVariable
    ? randomVariable()
    : randomInt(options.valueRange.min, options.valueRange.max, true);

  // Quotient form
  const fraction = !(options.withVariable || isOpposite)
    ? math.fraction(value1, value2)
    : undefined;
  const quotientForm = expressionTemplates.logarithm.base(
    base,
    options.withVariable || isOpposite
      ? `\\frac{${value1}}{${value2}}`
      : expressionTemplates.fraction(fraction.s, fraction.n, fraction.d)
  );

  // Terms form
  const termsForm = expressionTemplates.logarithm.quotient(
    base,
    value1,
    value2
  );

  // Create the problem statement
  const problem = [
    {
      type: "text",
      value: isOpposite
        ? "Convert the following to multiple logarithms:"
        : "Convert the following to a single logarithm:",
    },
    {
      type: "formula",
      value: isOpposite ? quotientForm : termsForm,
    },
  ];

  // Prepare steps for solution
  const steps = [
    {
      type: "text",
      value: isOpposite
        ? "To convert the expression to terms form, rewrite it as the difference of the two logarithms:"
        : "To convert the expression to quotient form, rewrite it as the logarithm of the quotient:",
    },
  ];
  if (options.withVariable || options.isOpposite) {
    steps.push({
      type: "formula",
      value: isOpposite
        ? `${quotientForm} = ${termsForm}`
        : `${termsForm} = ${quotientForm}`,
    });
  } else {
    steps.push(
      {
        type: "formula",
        value: `${termsForm} = ${expressionTemplates.logarithm.fraction(
          base,
          value1,
          value2
        )}`,
      },
      {
        type: "text",
        value: `Simplify the fraction:`,
      },
      {
        type: "formula",
        value: `${expressionTemplates.logarithm.fraction(
          base,
          value1,
          value2
        )} = ${quotientForm}`,
      }
    );
  }

  // If the problem is multiple choice
  if (options.isMCQ) {
    const choices = [
      {
        type: "formula",
        value: quotientForm,
        correct: !isOpposite ? true : undefined,
      },
      {
        type: "formula",
        value: termsForm,
        correct: isOpposite ? true : undefined,
      },
      {
        type: "formula",
        value: expressionTemplates.logarithm.base(
          base,
          options.withVariable ? `${value1} - ${value2}` : value1 - value2
        ),
      },
      {
        type: "formula",
        value: expressionTemplates.logarithm.quotient(value1, base, value2),
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
        value: isOpposite ? termsForm : quotientForm,
      },
    ];

    return { problem, steps, solution };
  }
};

module.exports = generateProblem;
