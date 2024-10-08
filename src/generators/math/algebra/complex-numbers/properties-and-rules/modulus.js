/**
 * @file src/generators/math/algebra/complex-numbers/properties-and-rules/modulus.js
 * @description Generates problems involving the modulus (absolute value) of complex numbers. Example: |3 + 4i| = √(3² + 4²) = 5.
 */

const { randomInt } = require("../../../../../utils/random");

/**
 * @function generateProblem - Generate a modulus problem for complex numbers.
 * @param {Object} options - The options for generating the problem.
 * @param {number} options.minReal - The minimum value for the real part a.
 * @param {number} options.maxReal - The maximum value for the real part a.
 * @param {number} options.minImaginary - The minimum value for the imaginary part b.
 * @param {number} options.maxImaginary - The maximum value for the imaginary part b.
 * @returns {Object} - The modulus problem.
 */
const generateProblem = (options) => {
  const a = randomInt(options.minReal, options.maxReal);
  const b = randomInt(options.minImaginary, options.maxImaginary);

  const problem = [
    {
      type: "text",
      value: `Find the modulus of (${a} ${b < 0 ? "-" : "+"} ${Math.abs(b)}i).`,
    },
    { type: "formula", value: `|${a} ${b < 0 ? "-" : "+"} ${Math.abs(b)}i|` },
  ];

  // Calculate modulus of the complex number
  const modulus = Math.sqrt(a ** 2 + b ** 2);

  const steps = [
    {
      type: "text",
      value: `The modulus of a complex number is calculated as |a + bi| = √(a² + b²).`,
    },
    {
      type: "formula",
      value: `|${a} ${b < 0 ? "-" : "+"} ${Math.abs(b)}i| = \\sqrt{${a}^2 + ${
        b < 0 ? "-" : "+"
      } ${Math.abs(b)}^2}`,
    },
    {
      type: "formula",
      value: `= \\sqrt{${a ** 2} + ${b ** 2}}`,
    },
  ];

  const solution = [
    {
      type: "formula",
      value: `${modulus}`,
    },
  ];

  return {
    problem,
    steps,
    solution,
  };
};

module.exports = generateProblem;
