/**
 * @file src/generators/math/algebra/exponents-and-logarithms/exponent-rules/powerOfQuotientRule.js
 * @description Generates problems involving the power of a quotient rule. Example: (a/b)^3 = a^3/b^3.
 */

const { randomInt, randomVariable } = require("../../../../../utils/random");
const expressionTemplates = require("../../../../../utils/expressionTemplates");

/**
 * @function generateProblem - Generate a problem involving the power of a quotient rule.
 * @param {Object} options - The options for generating the problem.
 * @param {boolean} options.isMCQ - Whether the problem is multiple choice.
 * @param {object} options.exponentRange - The range of the the outer exponent of the power.
 * @param {object} options.innerExponentRange - The range of the inner exponents of the powers.
 * @returns {Object} - The problem involving the power of a quotient rule.
 */

const generateProblem = (options) => {
  const numerator = randomVariable();
  const denominator = randomVariable();
  const exponent = randomInt(
    options.exponentRange.min,
    options.exponentRange.max,
    true
  );
  const numeratorExponent = randomInt(
    options.innerExponentRange.min,
    options.innerExponentRange.max,
    true
  );
  const denominatorExponent = randomInt(
    options.innerExponentRange.min,
    options.innerExponentRange.max,
    true
  );

  // Create the problem statement
  const problem = [
    {
      type: "text",
      value: `Simplify the following expression:`,
    },
    {
      type: "formula",
      value: expressionTemplates.exponent.powerOfQuotient(
        numerator,
        denominator,
        exponent,
        numeratorExponent,
        denominatorExponent
      ),
    },
  ];

  // Calculate the result exponents
  const resultNumeratorExponent = numeratorExponent * exponent;
  const resultDenominatorExponent = denominatorExponent * exponent;

  // Prepare steps for solution
  const steps = [
    {
      type: "text",
      value: `To simplify the expression, apply the power of a quotient rule:`,
    },
    {
      type: "formula",
      value: expressionTemplates.exponent.powerOfQuotient(
        numerator,
        denominator,
        exponent,
        numeratorExponent,
        denominatorExponent
      ),
    },
    {
      type: "formula",
      value: `= ${expressionTemplates.exponent.quotientOfProducts(
        numerator,
        denominator,
        exponent,
        numeratorExponent,
        denominatorExponent
      )}`,
    },
    {
      type: "formula",
      value: `= ${expressionTemplates.exponent.quotientOfDifferentBases(
        numerator,
        denominator,
        resultNumeratorExponent,
        resultDenominatorExponent
      )}`,
    },
  ];

  // If the problem is multiple choice
  if (options.isMCQ) {
    const choices = [
      {
        type: "formula",
        value: expressionTemplates.exponent.quotientOfDifferentBases(
          numerator,
          denominator,
          resultNumeratorExponent,
          resultDenominatorExponent
        ),
        correct: true,
      },
      {
        type: "formula",
        value: expressionTemplates.exponent.quotientOfDifferentBases(
          numerator,
          denominator,
          numeratorExponent + exponent,
          denominatorExponent + exponent
        ),
      },
      {
        type: "formula",
        value: expressionTemplates.exponent.quotientOfDifferentBases(
          numerator,
          denominator,
          exponent,
          numeratorExponent * denominatorExponent
        ),
      },
      {
        type: "formula",
        value: expressionTemplates.exponent.quotientOfDifferentBases(
          numerator,
          denominator,
          numeratorExponent + exponent,
          denominatorExponent + exponent
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
        value: expressionTemplates.exponent.quotientOfDifferentBases(
          numerator,
          denominator,
          resultNumeratorExponent,
          resultDenominatorExponent
        ),
      },
    ];

    return { problem, steps, solution };
  }
};

module.exports = generateProblem;
