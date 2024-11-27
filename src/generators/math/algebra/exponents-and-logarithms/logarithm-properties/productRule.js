/**
 * @file src/generators/math/algebra/exponents-and-logarithms/logarithm-properties/productRule.js
 * @description Generates problems involving the product rule for logarithms. Example: log_b(x) + log_b(y) = log_b(xy).
 */

const {
  randomInt,
  randomBool,
  randomVariable,
} = require("../../../../../utils/random");
const expressionTemplates = require("../../../../../utils/expressionTemplates");

/**
 * @function generateProblem - Generate a problem involving the product rule for logarithms.
 * @param {Object} options - The options for generating the problem.
 * @param {boolean} options.isMCQ - Whether the problem is multiple choice.
 * @param {object} options.baseRange - The range of the base of the logarithms.
 * @param {object} options.valueRange - The range of the values of the logarithms.
 * @param {boolean} options.withVariable - Whether to include a variable in the base and value. (will be automatically set to true if toFactors is true)
 * @param {boolean} options.toProduct - Whether to convert to a product.
 * @param {boolean} options.toFactors - Whether to convert to factors.
 * @returns {Object} - The problem involving the product rule for logarithms.
 */
const generateProblem = (options) => {
  const isOpposite =
    options.toProduct === options.toFactors ? randomBool() : options.toFactors;
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
  const product = options.withVariable ? `${value1}${value2}` : value1 * value2;

  // Product form
  const productForm = expressionTemplates.logarithm.base(base, product);

  // Factors form
  const factorsForm = expressionTemplates.logarithm.product(
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
      value: isOpposite ? productForm : factorsForm,
    },
  ];

  // Prepare steps for solution
  const steps = [
    {
      type: "text",
      value: isOpposite
        ? `To convert a product to factors, rewrite the expression as a sum of logarithms:`
        : `To convert factors to a product, rewrite the expression as a single logarithm:`,
    },
    {
      type: "formula",
      value: isOpposite
        ? `${productForm} = ${factorsForm}`
        : `${factorsForm} = ${productForm}`,
    },
  ];

  // If the problem is multiple choice
  if (options.isMCQ) {
    const choices = [
      {
        type: "formula",
        value: productForm,
        correct: !isOpposite ? true : undefined,
      },
      {
        type: "formula",
        value: factorsForm,
        correct: isOpposite ? true : undefined,
      },
      {
        type: "formula",
        value: expressionTemplates.logarithm.base(product, base),
      },
      {
        type: "formula",
        value: expressionTemplates.logarithm.product(value1, value2, base),
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
        value: isOpposite ? factorsForm : productForm,
      },
    ];

    return { problem, steps, solution };
  }
};

module.exports = generateProblem;
