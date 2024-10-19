/**
 * @file src/generators/math/algebra/complex-numbers/power/powersOfComplexNumbers.js
 * @description Generates problems involving the expansion of complex numbers raised to a power. Example: (1 + i)^3.
 */

const { randomInt } = require("../../../../../utils/random");
const formatSigned = require("../../../../../utils/formatSigned");

/**
 * @function generateProblem - Generate a problem involving the expansion of a complex number raised to a power.
 * @param {Object} options - The options for generating the problem.
 * @param {boolean} options.isMCQ - Whether the problem is multiple choice.
 * @param {number} options.minReal - The minimum value for the real part.
 * @param {number} options.maxReal - The maximum value for the real part.
 * @param {number} options.minImaginary - The minimum value for the imaginary part.
 * @param {number} options.maxImaginary - The maximum value for the imaginary part.
 * @param {number} options.power - The power to which the complex number is raised.
 * @returns {Object} - The power expansion problem for a complex number.
 */
const generateProblem = (options) => {
  const real = randomInt(options.minReal, options.maxReal);
  const imaginary = randomInt(options.minImaginary, options.maxImaginary);
  const power = options.power || 2; // Default to square if not provided

  const formatComplex = (real, imaginary) =>
    `(${real} ${formatSigned(`${imaginary}i`)})`;

  const problemText = `${formatComplex(real, imaginary)}^${power}`;

  // Helper function to multiply two complex numbers
  const multiplyComplexNumbers = (z1, z2) => {
    const realPart = z1.real * z2.real - z1.imaginary * z2.imaginary;
    const imaginaryPart = z1.real * z2.imaginary + z1.imaginary * z2.real;
    return { real: realPart, imaginary: imaginaryPart };
  };

  // Calculate (real + imaginary * i)^power
  let result = { real, imaginary };
  for (let i = 1; i < power; i++) {
    result = multiplyComplexNumbers(result, { real, imaginary });
  }

  // Format the result
  const formatResult = (real, imaginary) => {
    if (real === 0 && imaginary === 0) return "0";
    if (real === 0) return `${formatSigned(`${imaginary}i`, true)}`;
    if (imaginary === 0) return `${real}`;
    return `${real} ${formatSigned(`${imaginary}i`)}`;
  };

  const correctAnswer = formatResult(result.real, result.imaginary);

  const steps = [
    {
      type: "text",
      value: `To solve this, expand the complex number ${problemText} by multiplying it ${power} times.`,
    },
    {
      type: "formula",
      value: `${formatComplex(real, imaginary)}^${power} = ${correctAnswer}`,
    },
  ];

  // If not multiple choice, return the problem with the correct answer
  if (!options.isMCQ) {
    return {
      problem: [
        { type: "text", value: `Expand the following complex number:` },
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
      formatResult(result.real - randomInt(1, 3), result.imaginary),
    ].sort(() => Math.random() - 0.5); // Shuffle choices

    const mcqProblem = [
      { type: "text", value: `Expand the following complex number:` },
      { type: "formula", value: problemText },
      {
        type: "options",
        value: choices.map((value) => ({ type: "formula", value })),
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
