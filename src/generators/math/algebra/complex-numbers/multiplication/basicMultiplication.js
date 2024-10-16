/**
 * @file src/generators/math/algebra/complex-numbers/multiplication/basicMultiplication.js
 * @description Generates problems involving the multiplication of complex numbers. Example: (2 + i) * (1 - i).
 */

const { randomInt } = require("../../../../../utils/random");
const formatSigned = require("../../../../../utils/formatSigned");

/**
 * @function generateProblem - Generate a problem involving the multiplication of complex numbers.
 * @param {Object} options - The options for generating the problem.
 * @param {boolean} options.isMCQ - Whether the problem is multiple choice.
 * @param {number} options.minReal - The minimum value for the real part.
 * @param {number} options.maxReal - The maximum value for the real part.
 * @param {number} options.minImaginary - The minimum value for the imaginary part.
 * @param {number} options.maxImaginary - The maximum value for the imaginary part.
 * @returns {Object} - The multiplication problem for complex numbers.
 */
const generateProblem = (options) => {
  const real1 = randomInt(options.minReal, options.maxReal);
  const imaginary1 = randomInt(options.minImaginary, options.maxImaginary);
  const real2 = randomInt(options.minReal, options.maxReal);
  const imaginary2 = randomInt(options.minImaginary, options.maxImaginary);

  // Create the problem statement
  const problemText = `(${real1} ${formatSigned(
    imaginary1
  )}i) \\cdot (${real2} ${formatSigned(imaginary2)}i)`;

  // Calculate the result using the formula (a + bi)(c + di) = ac + adi + bci + bdi^2
  const resultReal = real1 * real2 - imaginary1 * imaginary2; // ac - bd
  const resultImaginary = real1 * imaginary2 + imaginary1 * real2; // ad + bc

  // Prepare steps for solution
  const steps = [
    {
      type: "text",
      value: `To perform the multiplication, use the distributive property:`,
    },
    {
      type: "formula",
      value: `${real1} ${formatSigned(
        imaginary1
      )}i \\cdot ${real2} ${formatSigned(imaginary2)}i`,
    },
    {
      type: "text",
      value: `Combine the real and imaginary parts: ${resultReal} + ${
        resultImaginary < 0 ? "-" : "+"
      } ${Math.abs(resultImaginary)}i.`,
    },
  ];

  // Create solution
  const solution = [
    {
      type: "formula",
      value: `${formatSigned(resultReal)} ${formatSigned(resultImaginary)}i`,
    },
  ];

  // If the problem is not multiple choice, return the problem, steps, and solution
  if (!options.isMCQ) {
    return {
      problem: [
        {
          type: "text",
          value: `Calculate the following: ${problemText}`,
        },
        { type: "formula", value: problemText },
      ],
      steps,
      solution,
    };
  } else {
    // Generate multiple choice options
    const choices = [
      {
        type: "formula",
        value: `${resultReal} ${formatSigned(resultImaginary)}i`,
        correct: true,
      },
      {
        type: "formula",
        value: `${resultReal + randomInt(1, 3)} ${formatSigned(
          resultImaginary + randomInt(1, 3)
        )}i`,
        correct: false,
      },
      {
        type: "formula",
        value: `${resultReal - randomInt(1, 3)} ${formatSigned(
          resultImaginary - randomInt(1, 3)
        )}i`,
        correct: false,
      },
      {
        type: "formula",
        value: `${resultReal * -1} ${formatSigned(resultImaginary * -1)}i`,
        correct: false,
      },
    ];

    // Shuffle the choices
    const shuffledChoices = choices.sort(() => Math.random() - 0.5);

    let mcqProblem = [
      {
        type: "text",
        value: `Which of the following is the result of the multiplication?`,
      },
      {
        type: "formula",
        value: problemText,
      },
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
