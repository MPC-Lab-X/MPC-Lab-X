/**
 * @file src/generators/math/algebra/linear-equations/withFractions.js
 * @description Generates problems for linear equations with fractions. In this form, the equation is of the form ax/b = c.
 */

const math = require("mathjs");
const { randomInt, randomVariable } = require("../../../../utils/random");
const expressionTemplates = require("../../../../utils/expressionTemplates");

/**
 * @function generateProblem - Generate a linear equation problem with fractions.
 * @param {Object} options - The options for generating the problem.
 * @param {number} options.minCoefficient - The minimum value for the coefficient a.
 * @param {number} options.maxCoefficient - The maximum value for the coefficient a.
 * @param {number} options.minDenominator - The minimum value for the denominator b.
 * @param {number} options.maxDenominator - The maximum value for the denominator b.
 * @param {number} options.minSolution - The minimum value for the solution c.
 * @param {number} options.maxSolution - The maximum value for the solution c.
 * @returns {Object} - The linear equation problem with fractions.
 */
const generateProblem = (options) => {
  const a = randomInt(options.minCoefficient, options.maxCoefficient, true);
  const b = randomInt(options.minDenominator, options.maxDenominator, true);
  const c = randomInt(options.minSolution, options.maxSolution);

  const x = randomVariable();

  const problem = [
    { type: "text", value: `Solve for ${x}:` },
    {
      type: "formula",
      value: expressionTemplates.equation.linear.withFractions(a, b, c, x),
    },
  ];

  const steps = [
    {
      type: "text",
      value: "Multiply both sides of the equation by the denominator.",
    },
    { type: "formula", value: `${a}${x} = ${b} \\cdot ${c}` },
    {
      type: "text",
      value:
        "Divide both sides of the equation by the coefficient of the variable.",
    },
    { type: "formula", value: `${x} = \\frac{${b} \\cdot ${c}}{${a}}` },
    { type: "text", value: `Calculate the value of ${x}.` },
  ];

  // Calculate the solution
  const numerator = b * c;
  const denominator = a;
  const simplifiedFraction = math.fraction(numerator, denominator);
  const simplified = math.simplify(`${numerator}/${denominator}`);
  const simplifiedString = expressionTemplates.fraction(
    simplifiedFraction.s,
    simplifiedFraction.n,
    simplifiedFraction.d
  );

  steps.push({
    type: "formula",
    value: `${x} = ${simplifiedString}`,
  });

  const solution = [
    {
      type: "numeric",
      decimal: math.evaluate(math.format(simplified)),
      fraction:
        simplifiedFraction.d === 1
          ? null
          : {
              s: simplifiedFraction.s,
              n: simplifiedFraction.n,
              d: simplifiedFraction.d,
            },
    },
  ];

  return {
    problem,
    steps,
    solution,
  };
};

module.exports = generateProblem;
