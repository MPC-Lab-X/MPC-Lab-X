/**
 * @file src/generators/math/algebra/complex-numbers/properties-and-rules/conjugate.js
 * @description Generates problems involving the concept of complex conjugates. Example: The conjugate of (a + bi) is (a - bi).
 */

const { randomInt } = require("../../../../../utils/random");

/**
 * @function generateProblem - Generate a complex conjugate problem.
 * @param {Object} options - The options for generating the problem.
 * @param {number} options.minReal - The minimum value for the real part a.
 * @param {number} options.maxReal - The maximum value for the real part a.
 * @param {number} options.minImaginary - The minimum value for the imaginary part b.
 * @param {number} options.maxImaginary - The maximum value for the imaginary part b.
 * @returns {Object} - The complex conjugate problem.
 */
const generateProblem = (options) => {
  const a = randomInt(options.minReal, options.maxReal);
  const b = randomInt(options.minImaginary, options.maxImaginary);

  const problem = [
    {
      type: "text",
      value: `Find the complex conjugate of (${a} ${
        b < 0 ? "-" : "+"
      } ${Math.abs(b)}i).`,
    },
    { type: "formula", value: `(${a} ${b < 0 ? "-" : "+"} ${Math.abs(b)}i)` },
  ];

  // Determine the sign for the conjugate based on the sign of b (imaginary part)
  const bSign = b < 0 ? "+" : "-";
  const absB = Math.abs(b);
  const conjugate = `${a} ${bSign} ${absB}i`;

  const steps = [
    {
      type: "text",
      value: `The complex conjugate of a complex number is obtained by changing the sign of the imaginary part.`,
    },
    {
      type: "formula",
      value: `(${a} ${b < 0 ? "-" : "+"} ${Math.abs(
        b
      )}i) \\Rightarrow (${a} ${bSign} ${absB}i)`,
    },
  ];

  const solution = [
    {
      type: "formula",
      value: conjugate,
    },
  ];

  return {
    problem,
    steps,
    solution,
  };
};

module.exports = generateProblem;
