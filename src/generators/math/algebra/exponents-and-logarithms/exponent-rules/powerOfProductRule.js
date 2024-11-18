/**
 * @file src/generators/math/algebra/exponents-and-logarithms/exponent-rules/powerOfProductRule.js
 * @description Generates problems involving the power of a product rule. Example: (ab)^3 = a^3b^3.
 */

const { randomInt, randomVariable } = require("../../../../../utils/random");
const expressionTemplates = require("../../../../../utils/expressionTemplates");

/**
 * @function generateProblem - Generate a problem involving the power of a product rule.
 * @param {Object} options - The options for generating the problem.
 * @param {boolean} options.isMCQ - Whether the problem is multiple choice.
 * @param {object} options.exponentRange - The range of the the outer exponent of the power.
 * @param {object} options.innerExponentRange - The range of the inner exponents of the powers.
 * @param {number} options.numFactors - The number of factors in the product.
 * @returns {Object} - The problem involving the power of a product rule.
 */
const generateProblem = (options) => {
  const factors = [];
  const exponent = randomInt(
    options.exponentRange.min,
    options.exponentRange.max,
    true
  );

  // Generate random factors
  for (let i = 0; i < options.numFactors; i++) {
    let base;
    do {
      base = randomVariable();
    } while (factors.some((factor) => factor.base === base));
    const exponent = randomInt(
      options.innerExponentRange.min,
      options.innerExponentRange.max,
      true
    );
    factors.push({ base, exponent });
  }

  // Create the problem statement
  const problem = [
    {
      type: "text",
      value: `Simplify the following expression:`,
    },
    {
      type: "formula",
      value: expressionTemplates.exponent.power(
        `(${factors
          .map(({ base, exponent }) =>
            expressionTemplates.exponent.power(base, exponent)
          )
          .join("")})`,
        exponent
      ),
    },
  ];

  // Calculate the result exponents
  const resultFactors = factors.map(({ base, exponent: innerExponent }) => {
    return { base, exponent: innerExponent * exponent };
  });

  // Prepare steps for solution
  const steps = [
    {
      type: "text",
      value: `To raise a product to a power, raise each factor to the power:`,
    },
    {
      type: "formula",
      value: expressionTemplates.exponent.power(
        `(${factors
          .map(({ base, exponent }) =>
            expressionTemplates.exponent.power(base, exponent)
          )
          .join("")})`,
        exponent
      ),
    },
    {
      type: "formula",
      value: `= ${resultFactors
        .map(({ base, exponent }) =>
          expressionTemplates.exponent.power(base, exponent)
        )
        .join("")}`,
    },
  ];

  // If the problem is multiple choice
  if (options.isMCQ) {
    const choices = [
      {
        type: "formula",
        value: resultFactors
          .map(({ base, exponent }) =>
            expressionTemplates.exponent.power(base, exponent)
          )
          .join(""),
        correct: true,
      },
      {
        type: "formula",
        value: resultFactors
          .map(({ base, exponent }) =>
            expressionTemplates.exponent.power(
              base,
              exponent +
                randomInt(
                  options.exponentRange.min,
                  options.exponentRange.max,
                  true
                )
            )
          )
          .join(""),
      },
      {
        type: "formula",
        value: resultFactors
          .map(({ base, exponent }) =>
            expressionTemplates.exponent.power(
              base,
              exponent -
                randomInt(
                  options.innerExponentRange.min,
                  options.innerExponentRange.max,
                  true
                )
            )
          )
          .join(""),
      },
      {
        type: "formula",
        value: resultFactors
          .map(({ base, exponent }) =>
            expressionTemplates.exponent.power(
              base,
              exponent +
                randomInt(
                  options.innerExponentRange.min,
                  options.innerExponentRange.max,
                  true
                )
            )
          )
          .join(""),
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
    // Calculate the result
    const solution = [
      {
        type: "formula",
        value: resultFactors
          .map(({ base, exponent }) =>
            expressionTemplates.exponent.power(base, exponent)
          )
          .join(""),
      },
    ];

    return { problem, steps, solution };
  }
};

module.exports = generateProblem;
