/**
 * @file src/generators/math/algebra/complex-numbers/addition-subtraction/multipleComplexNumbers.js
 * @description Generates problems involving the addition and subtraction of multiple complex numbers. Example: (2 + i) + (3 - 2i) - (1 + 4i).
 */

const { randomInt } = require("../../../../../utils/random");
const formatSigned = require("../../../../../utils/formatSigned");

/**
 * @function generateProblem - Generate a problem involving the addition and subtraction of multiple complex numbers.
 * @param {Object} options - The options for generating the problem.
 * @param {boolean} options.isMCQ - Whether the problem is multiple choice.
 * @param {number} options.minReal - The minimum value for the real part.
 * @param {number} options.maxReal - The maximum value for the real part.
 * @param {number} options.minImaginary - The minimum value for the imaginary part.
 * @param {number} options.maxImaginary - The maximum value for the imaginary part.
 * @param {number} options.numComplexNumbers - The number of complex numbers to include.
 * @param {boolean} options.allowAddition - Whether to allow addition.
 * @param {boolean} options.allowSubtraction - Whether to allow subtraction.
 * @returns {Object} - The addition and subtraction problem for multiple complex numbers.
 */
const generateProblem = (options) => {
  const numComplexNumbers = options.numComplexNumbers || randomInt(3, 5); // Default to 3-5 complex numbers
  let complexNumbers = [];
  let operations = [];

  // Generate random complex numbers
  for (let i = 0; i < numComplexNumbers; i++) {
    const real = randomInt(options.minReal, options.maxReal);
    const imaginary = randomInt(options.minImaginary, options.maxImaginary);
    complexNumbers.push({ real, imaginary });

    // Add operation between complex numbers
    if (i > 0) {
      if (
        (options.allowAddition && options.allowSubtraction) ||
        (!options.allowAddition && !options.allowSubtraction)
      ) {
        operations.push(Math.random() < 0.5 ? "+" : "-");
      } else if (options.allowAddition) {
        operations.push("+");
      } else if (options.allowSubtraction) {
        operations.push("-");
      }
    }
  }

  // Generate the problem text
  const problemText = complexNumbers
    .map((cn) => `(${cn.real} ${formatSigned(cn.imaginary)}i)`)
    .reduce((acc, val, index) => {
      return index === 0 ? val : `${acc} ${operations[index - 1]} ${val}`;
    }, "");

  // Calculate the result
  let resultReal = complexNumbers[0].real;
  let resultImaginary = complexNumbers[0].imaginary;

  for (let i = 1; i < numComplexNumbers; i++) {
    if (operations[i - 1] === "+") {
      resultReal += complexNumbers[i].real;
      resultImaginary += complexNumbers[i].imaginary;
    } else {
      resultReal -= complexNumbers[i].real;
      resultImaginary -= complexNumbers[i].imaginary;
    }
  }

  // Generate the steps for the solution
  const steps = [
    {
      type: "text",
      value: `To solve this problem, we combine the real and imaginary parts of the complex numbers step by step.`,
    },
    ...complexNumbers.map((cn) => ({
      type: "formula",
      value: `(${cn.real} ${formatSigned(cn.imaginary)}i)`,
    })),
    {
      type: "text",
      value: `Now, apply the operations in sequence:`,
    },
    ...operations.map((op, index) => ({
      type: "text",
      value: `Operation ${op} between the ${index + 1}th and ${
        index + 2
      }th complex number.`,
    })),
  ];

  // Format the result as a string
  const formatResult = (real, imaginary) => {
    if (real === 0 && imaginary === 0) {
      return "0";
    }
    if (real === 0) {
      return `${formatSigned(imaginary)}i`;
    }
    if (imaginary === 0) {
      return `${real}`;
    }
    return `${real} ${formatSigned(imaginary)}i`;
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
