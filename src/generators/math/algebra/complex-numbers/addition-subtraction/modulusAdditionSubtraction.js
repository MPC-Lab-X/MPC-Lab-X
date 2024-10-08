/**
 * @file src/generators/math/algebra/complex-numbers/addition-subtraction/modulusAdditionSubtraction.js
 * @description Generates problems involving the modulus (absolute value) of complex numbers in addition and subtraction. Example: |3 + 4i| + |1 - i|.
 */

const { randomInt } = require("../../../../../utils/random");

/**
 * @function simplifySqrt - Simplifies the square root expression.
 * @param {number} value - The value under the square root.
 * @returns {string} - The simplified square root in LaTeX form.
 */
const simplifySqrt = (value) => {
  const sqrtValue = Math.sqrt(value);
  if (Number.isInteger(sqrtValue)) {
    return `${sqrtValue}`;
  } else {
    return `\\sqrt{${value}}`;
  }
};

/**
 * @function generateProblem - Generate a problem involving modulus addition or subtraction of complex numbers.
 * @param {Object} options - The options for generating the problem.
 * @param {boolean} options.isMCQ - Whether the problem is multiple choice.
 * @param {number} options.minReal - The minimum value for the real part of the complex numbers.
 * @param {number} options.maxReal - The maximum value for the real part of the complex numbers.
 * @param {number} options.minImaginary - The minimum value for the imaginary part of the complex numbers.
 * @param {number} options.maxImaginary - The maximum value for the imaginary part of the complex numbers.
 * @param {boolean} options.allowAddition - Whether to allow addition.
 * @param {boolean} options.allowSubtraction - Whether to allow subtraction.
 * @returns {Object} - The problem involving modulus addition and subtraction of complex numbers.
 */
const generateProblem = (options) => {
  const real1 = randomInt(options.minReal, options.maxReal);
  const imaginary1 = randomInt(options.minImaginary, options.maxImaginary);
  const real2 = randomInt(options.minReal, options.maxReal);
  const imaginary2 = randomInt(options.minImaginary, options.maxImaginary);

  let operation;
  // Choose addition or subtraction based on options
  if (
    (options.allowAddition && options.allowSubtraction) ||
    (!options.allowAddition && !options.allowSubtraction)
  ) {
    operation = Math.random() < 0.5 ? "addition" : "subtraction"; //
  } else if (options.allowAddition) {
    operation = "addition";
  } else if (options.allowSubtraction) {
    operation = "subtraction";
  }

  // Calculate the square of the modulus for each complex number
  const modulusSquared1 = real1 ** 2 + imaginary1 ** 2;
  const modulusSquared2 = real2 ** 2 + imaginary2 ** 2;

  // Create the problem statement
  const problemText =
    operation === "addition"
      ? `\\left|${real1} ${imaginary1 < 0 ? "-" : "+"} ${Math.abs(
          imaginary1
        )}i\\right| + \\left|${real2} ${imaginary2 < 0 ? "-" : "+"} ${Math.abs(
          imaginary2
        )}i\\right|`
      : `\\left|${real1} ${imaginary1 < 0 ? "-" : "+"} ${Math.abs(
          imaginary1
        )}i\\right| - \\left|${real2} ${imaginary2 < 0 ? "-" : "+"} ${Math.abs(
          imaginary2
        )}i\\right|`;

  // Calculate the square root of the modulus for each complex number
  const modulus1 = simplifySqrt(modulusSquared1);
  const modulus2 = simplifySqrt(modulusSquared2);

  // Prepare steps for solution
  const steps = [
    {
      type: "text",
      value: `To perform the operation, calculate the modulus of each complex number first.`,
    },
    {
      type: "formula",
      value: `\\left|${real1} ${imaginary1 < 0 ? "-" : "+"} ${Math.abs(
        imaginary1
      )}i\\right| = \\sqrt{${real1}^2 + ${imaginary1}^2} = \\sqrt{${modulusSquared1}} = ${modulus1}`,
    },
    {
      type: "formula",
      value: `\\left|${real2} ${imaginary2 < 0 ? "-" : "+"} ${Math.abs(
        imaginary2
      )}i\\right| = \\sqrt{${real2}^2 + ${imaginary2}^2} = \\sqrt{${modulusSquared2}} = ${modulus2}`,
    },
    {
      type: "text",
      value: `Now, perform the operation:`,
    },
    {
      type: "formula",
      value: `${modulus1} ${operation === "addition" ? "+" : "-"} ${modulus2}`,
    },
  ];

  // Calculate the result based on the operation
  const solution = [
    {
      type: "formula",
      value: `${modulus1} ${operation === "addition" ? "+" : "-"} ${modulus2}`,
    },
  ];

  // Return the problem, steps, and solution
  if (!options.isMCQ) {
    return {
      problem: [
        {
          type: "text",
          value: `Calculate the following:`,
        },
        { type: "formula", value: problemText },
      ],
      steps,
      solution,
    };
  } else {
    // Generate multiple choice options
    const correctAnswer = `${modulus1} ${
      operation === "addition" ? "+" : "-"
    } ${modulus2}`;
    const choices = [
      correctAnswer,
      `\\sqrt{${modulusSquared1 + modulusSquared2}}`,
      `\\sqrt{${modulusSquared1 - modulusSquared2}}`,
      `\\sqrt{${modulusSquared1 + 2 * modulusSquared2}}`,
    ];

    // Shuffle the choices
    const shuffledChoices = choices
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        type: "formula",
        value: value,
        correct: value === correctAnswer,
      }));

    const mcqProblem = [
      {
        type: "text",
        value: `Calculate the following:`,
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
