/**
 * @file src/generators/math/algebra/complex-numbers/addition-subtraction/basicAdditionSubtraction.js
 * @description Generates problems involving basic addition and subtraction of complex numbers. Example: (3 + 2i) - (1 - i).
 */

const { randomInt } = require("../../../../../utils/random");
const formatSigned = require("../../../../../utils/formatSigned");

/**
 * @function generateProblem - Generate a problem involving basic addition or subtraction of complex numbers.
 * @param {Object} options - The options for generating the problem.
 * @param {boolean} options.isMCQ - Whether the problem is multiple choice.
 * @param {number} options.minReal - The minimum value for the real part.
 * @param {number} options.maxReal - The maximum value for the real part.
 * @param {number} options.minImaginary - The minimum value for the imaginary part.
 * @param {number} options.maxImaginary - The maximum value for the imaginary part.
 * @returns {Object} - The addition or subtraction problem for complex numbers.
 */
const generateProblem = (options) => {
  const real1 = randomInt(options.minReal, options.maxReal);
  const imaginary1 = randomInt(options.minImaginary, options.maxImaginary);
  const real2 = randomInt(options.minReal, options.maxReal);
  const imaginary2 = randomInt(options.minImaginary, options.maxImaginary);

  // Randomly determine the operation
  const operation = Math.random() < 0.5 ? "addition" : "subtraction";

  // Create the problem statement using formatSigned
  const problemText =
    operation === "addition"
      ? `(${real1} ${formatSigned(
          `${imaginary1}i`
        )}) + (${real2} ${formatSigned(`${imaginary2}i`)})`
      : `(${real1} ${formatSigned(
          `${imaginary1}i`
        )}) - (${real2} ${formatSigned(`${imaginary2}i`)})`;

  // Calculate the result based on the operation
  const resultReal = operation === "addition" ? real1 + real2 : real1 - real2;
  const resultImaginary =
    operation === "addition"
      ? imaginary1 + imaginary2
      : imaginary1 - imaginary2;

  // Prepare steps for solution
  const steps = [
    {
      type: "text",
      value: `To perform the operation, combine the real parts and the imaginary parts.`,
    },
    {
      type: "formula",
      value: `${real1} ${formatSigned(`${imaginary1}i`)} ${
        operation === "addition" ? "+" : "-"
      } (${real2} ${formatSigned(`${imaginary2}i`)})`,
    },
    {
      type: "text",
      value: `Combine the real parts: ${resultReal}, Combine the imaginary parts: ${resultImaginary}.`,
    },
  ];

  // Prepare the solution with checks
  const formatResult = (real, imaginary) => {
    if (real === 0 && imaginary === 0) return "0";
    if (real === 0) return `${formatSigned(`${imaginary}i`, true)}`;
    if (imaginary === 0) return `${real}`;
    return `${real} ${formatSigned(`${imaginary}i`)}`;
  };

  const solution = [
    { type: "formula", value: formatResult(resultReal, resultImaginary) },
  ];

  // If not multiple choice, return the problem, steps, and solution
  if (!options.isMCQ) {
    return {
      problem: [
        { type: "text", value: `Calculate the following: ${problemText}` },
        { type: "formula", value: problemText },
      ],
      steps,
      solution,
    };
  } else {
    // Generate multiple choice options
    const correctAnswer = formatResult(resultReal, resultImaginary);
    const choices = [
      correctAnswer,
      formatResult(resultReal + randomInt(1, 3), resultImaginary),
      formatResult(resultReal, resultImaginary + randomInt(1, 3)),
      formatResult(resultReal - randomInt(1, 3), resultImaginary),
    ];

    // Shuffle the choices
    const shuffledChoices = choices
      .sort(() => Math.random() - 0.5)
      .map((value) => ({
        type: "formula",
        value,
        correct: value === correctAnswer,
      }));

    const mcqProblem = [
      { type: "text", value: `Calculate the following: ${problemText}` },
      { type: "formula", value: problemText },
      { type: "options", value: shuffledChoices },
    ];

    const mcqSolution = [
      {
        type: "choice",
        choice: shuffledChoices.findIndex((choice) => choice.correct),
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
