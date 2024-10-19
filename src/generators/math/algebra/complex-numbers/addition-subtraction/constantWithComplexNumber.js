/**
 * @file src/generators/math/algebra/complex-numbers/addition-subtraction/constantWithComplexNumber.js
 * @description Generates problems involving the addition or subtraction of real constants and complex numbers. Example: 5 + (3 + 2i).
 */

const { randomInt } = require("../../../../../utils/random");
const formatSigned = require("../../../../../utils/formatSigned");

/**
 * @function generateProblem - Generate a problem involving the addition or subtraction of a real constant and a complex number.
 * @param {Object} options - The options for generating the problem.
 * @param {boolean} options.isMCQ - Whether the problem is multiple choice.
 * @param {number} options.minReal - The minimum value for the real part of the complex number.
 * @param {number} options.maxReal - The maximum value for the real part of the complex number.
 * @param {number} options.minImaginary - The minimum value for the imaginary part of the complex number.
 * @param {number} options.maxImaginary - The maximum value for the imaginary part of the complex number.
 * @param {number} options.constant - The real constant to be added or subtracted.
 * @param {boolean} options.allowAddition - Whether to allow addition.
 * @param {boolean} options.allowSubtraction - Whether to allow subtraction.
 * @returns {Object} - The problem involving a constant and a complex number.
 */
const generateProblem = (options) => {
  const constant = options.constant || randomInt(1, 10); // Default to 1-10
  const real = randomInt(options.minReal, options.maxReal);
  const imaginary = randomInt(options.minImaginary, options.maxImaginary);

  let operation;
  // Choose addition or subtraction based on options
  if (
    (options.allowAddition && options.allowSubtraction) ||
    (!options.allowAddition && !options.allowSubtraction)
  ) {
    operation = Math.random() < 0.5 ? "addition" : "subtraction";
  } else if (options.allowAddition) {
    operation = "addition";
  } else if (options.allowSubtraction) {
    operation = "subtraction";
  }

  // Generate the problem text
  const problemText =
    operation === "addition"
      ? `${constant} + (${real} ${formatSigned(`${imaginary}i`)})`
      : `${constant} - (${real} ${formatSigned(`${imaginary}i`)})`;

  // Calculate the result
  const resultReal =
    operation === "addition" ? constant + real : constant - real;
  const resultImaginary = operation === "addition" ? imaginary : -imaginary;

  // Generate the steps
  const steps = [
    {
      type: "text",
      value: `To perform the operation, combine the real parts and keep the imaginary part as is.`,
    },
    {
      type: "formula",
      value: `${constant} ${formatSigned(real)} ${formatSigned(
        `${imaginary}i`
      )}`,
    },
    {
      type: "text",
      value: `Combine the real part: ${resultReal}, Imaginary part remains the same: ${resultImaginary}.`,
    },
  ];

  // Format the result
  const formatResult = (real, imaginary) => {
    if (real === 0 && imaginary === 0) {
      return "0";
    }
    if (real === 0) {
      return `${formatSigned(`${imaginary}i`, true)}`;
    }
    if (imaginary === 0) {
      return `${real}`;
    }
    return `${real} ${formatSigned(`${imaginary}i`)}`;
  };

  const solution = [
    {
      type: "formula",
      value: formatResult(resultReal, resultImaginary),
    },
  ];

  // Return the problem, steps, and solution
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
        value: value,
        correct: value === correctAnswer,
      }));

    const mcqProblem = [
      {
        type: "text",
        value: `Calculate the following: ${problemText}`,
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
