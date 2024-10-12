/**
 * @file src/generators/math/algebra/complex-numbers/multiplication/constantTimesComplexNumber.js
 * @description Generates problems involving the multiplication of a real constant with a complex number. Example: 4 * (3 + 2i).
 */

const { randomInt } = require("../../../../../utils/random");

/**
 * @function generateProblem - Generate a problem involving the multiplication of a real constant with a complex number.
 * @param {Object} options - Options for the problem.
 * @param {boolean} options.isMCQ - Whether the problem is multiple-choice.
 * @param {number} options.minConstant - The minimum value for the real constant.
 * @param {number} options.maxConstant - The maximum value for the real constant.
 * @param {number} options.minReal - The minimum value for the real part of the complex number.
 * @param {number} options.maxReal - The maximum value for the real part of the complex number.
 * @param {number} options.minImaginary - The minimum value for the imaginary part of the complex number.
 * @param {number} options.maxImaginary - The maximum value for the imaginary part of the complex number.
 * @returns {Object} - A problem object for constant times complex number multiplication.
 */
const generateProblem = (options) => {
  const constant = randomInt(options.minConstant, options.maxConstant);
  const real = randomInt(options.minReal, options.maxReal);
  const imaginary = randomInt(options.minImaginary, options.maxImaginary);

  // Create the problem statement
  const problemText = `${constant} * (${real} ${
    imaginary < 0 ? "-" : "+"
  } ${Math.abs(imaginary)}i)`;

  // Calculate the result
  const resultReal = constant * real;
  const resultImaginary = constant * imaginary;

  // Steps for the solution
  const steps = [
    {
      type: "text",
      value: `To solve this, multiply the constant by both the real part and the imaginary part separately.`,
    },
    {
      type: "formula",
      value: `${constant} \\cdot (${real} ${
        imaginary < 0 ? "-" : "+"
      } ${Math.abs(imaginary)}i)`,
    },
    {
      type: "text",
      value: `This gives:`,
    },
    {
      type: "formula",
      value: `${constant} \\cdot ${real} = ${resultReal}`,
    },
    {
      type: "formula",
      value: `${constant} \\cdot ${imaginary}i = ${
        resultImaginary < 0 ? "-" : "+"
      } ${Math.abs(resultImaginary)}i`,
    },
    {
      type: "text",
      value: `So the final answer is:`,
    },
    {
      type: "formula",
      value: `${resultReal} ${resultImaginary < 0 ? "-" : "+"} ${Math.abs(
        resultImaginary
      )}i`,
    },
  ];

  // Format the result
  const formatResult = (real, imaginary) => {
    if (real === 0 && imaginary === 0) return "0";
    if (real === 0)
      return `${imaginary < 0 ? "-" : "+"} ${Math.abs(imaginary)}i`;
    if (imaginary === 0) return `${real}`;
    return `${real} ${imaginary < 0 ? "-" : "+"} ${Math.abs(imaginary)}i`;
  };

  const solution = [
    {
      type: "formula",
      value: formatResult(resultReal, resultImaginary),
    },
  ];

  // If the problem is multiple choice, return the problem with choices
  if (options.isMCQ) {
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
        type: "text",
        value: value,
        correct: value === correctAnswer,
      }));

    return {
      problem: [
        {
          type: "text",
          value: `Calculate the product of the following constant and complex number: ${problemText}`,
        },
        { type: "options", value: shuffledChoices },
      ],
      steps,
      solution: [
        {
          type: "choice",
          choice: shuffledChoices.findIndex((choice) => choice.correct),
        },
      ],
    };
  } else {
    return {
      problem: [
        {
          type: "text",
          value: `Calculate the product of the following constant and complex number: ${problemText}`,
        },
        { type: "formula", value: problemText },
      ],
      steps,
      solution,
    };
  }
};

module.exports = generateProblem;
