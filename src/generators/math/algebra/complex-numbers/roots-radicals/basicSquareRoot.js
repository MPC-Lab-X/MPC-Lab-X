/**
 * @file src/generators/math/algebra/complex-numbers/roots-radicals/squareRootComplex.js
 * @description Generates problems involving square roots of complex or negative numbers. Example: √(-9) or √(4 + 9i).
 */

const { randomInt } = require("../../../../../utils/random");

/**
 * @function generateProblem - Generate a problem involving the square root of a complex or negative number.
 * @param {Object} options - Options for problem generation.
 * @param {boolean} options.isMCQ - Whether the problem is multiple choice.
 * @param {number} options.minReal - Minimum value for the real part.
 * @param {number} options.maxReal - Maximum value for the real part.
 * @param {number} options.minImaginary - Minimum value for the imaginary part.
 * @param {number} options.maxImaginary - Maximum value for the imaginary part.
 * @param {number} options.decimalPlaces - Number of decimal places for the answer.
 * @returns {Object} - A problem involving the square root of a complex or negative number.
 */
const generateProblem = (options) => {
  const real = randomInt(options.minReal, options.maxReal);
  const imaginary = randomInt(options.minImaginary, options.maxImaginary);

  const formatComplex = (real, imaginary) =>
    `(${real} ${imaginary < 0 ? "-" : "+"} ${Math.abs(imaginary)}i)`;

  const problemText =
    imaginary === 0 && real < 0
      ? `\\sqrt{${real}}`
      : `\\sqrt{${formatComplex(real, imaginary)}}`;

  // Helper function to calculate the square root of a complex number
  const sqrtComplex = (a, b) => {
    const modulus = Math.sqrt(a ** 2 + b ** 2);
    const realPart = Math.sqrt((a + modulus) / 2);
    const imaginaryPart = Math.sqrt((-a + modulus) / 2) * Math.sign(b);
    return { real: realPart, imaginary: imaginaryPart };
  };

  // Calculate the square root
  const result =
    imaginary === 0 && real < 0
      ? { real: 0, imaginary: Math.sqrt(-real) } // Handle negative real numbers
      : sqrtComplex(real, imaginary);

  // Format the result
  const formatResult = (real, imaginary) => {
    if (real === 0) return `${imaginary < 0 ? "-" : ""}${Math.abs(imaginary)}i`;
    if (imaginary === 0) return `${real}`;
    return `${real.toFixed(options.decimalPlaces)} ${
      imaginary < 0 ? "-" : "+"
    } ${Math.abs(imaginary).toFixed(options.decimalPlaces)}i`;
  };

  const correctAnswer = `${formatResult(
    result.real,
    result.imaginary
  )}, ${formatResult(-result.real, -result.imaginary)}`;

  // Create steps
  const steps = [
    {
      type: "text",
      value: `To solve this, find the square root of the complex number.`,
    },
    {
      type: "formula",
      value: `\\sqrt{${formatComplex(real, imaginary)}} = ±(${formatResult(
        result.real,
        result.imaginary
      )})`,
    },
  ];

  // If the problem is not multiple choice, return the problem, steps, and solution
  if (!options.isMCQ) {
    return {
      problem: [
        {
          type: "text",
          value: `Find the square root of the following number, rounding to ${options.decimalPlaces} decimal places:`,
        },
        { type: "formula", value: problemText },
      ],
      steps,
      solution: [{ type: "formula", value: correctAnswer }],
    };
  } else {
    // Generate multiple choice options
    const choices = [
      correctAnswer,
      formatResult(result.real + randomInt(1, 3), result.imaginary),
      formatResult(result.real, result.imaginary + randomInt(1, 3)),
      formatResult(-result.real, -result.imaginary + randomInt(1, 3)),
    ].sort(() => Math.random() - 0.5); // Shuffle choices

    const mcqProblem = [
      { type: "text", value: `Find the square root of the following number:` },
      { type: "formula", value: problemText },
      {
        type: "options",
        value: choices.map((value) => ({ type: "text", value })),
      },
    ];

    const mcqSolution = [
      {
        type: "choice",
        choice: choices.findIndex((choice) => choice === correctAnswer),
      },
    ];

    return {
      problem: mcqProblem,
      steps,
      solution: mcqSolution,
    };
  }
};

module.exports = generateProblem;
