/**
 * @file src/generators/math/algebra/complex-numbers/multiplication/multipleComplexNumbers.js
 * @description Generates problems involving the multiplication of several complex numbers. Example: (1 + i) * (3 - i) * (2 + 4i).
 */

const { randomInt } = require("../../../../../utils/random");
const formatSigned = require("../../../../../utils/formatSigned");

/**
 * @function generateProblem - Generate a problem involving the multiplication of multiple complex numbers.
 * @param {Object} options - The options for generating the problem.
 * @param {boolean} options.isMCQ - Whether the problem is multiple choice.
 * @param {number} options.minReal - The minimum value for the real part.
 * @param {number} options.maxReal - The maximum value for the real part.
 * @param {number} options.minImaginary - The minimum value for the imaginary part.
 * @param {number} options.maxImaginary - The maximum value for the imaginary part.
 * @param {number} options.numComplexNumbers - The number of complex numbers to include.
 * @returns {Object} - The multiplication problem for multiple complex numbers.
 */
const generateProblem = (options) => {
  const numComplexNumbers = options.numComplexNumbers || randomInt(2, 4); // Default to 2-4 complex numbers
  let complexNumbers = [];

  // Generate random complex numbers
  for (let i = 0; i < numComplexNumbers; i++) {
    const real = randomInt(options.minReal, options.maxReal);
    const imaginary = randomInt(options.minImaginary, options.maxImaginary);
    complexNumbers.push({ real, imaginary });
  }

  // Create the problem statement
  const problemText = complexNumbers
    .map((cn) => {
      return `(${cn.real} ${formatSigned(`${cn.imaginary}i`)})`;
    })
    .join(" \\cdot ");

  // Calculate the result using the formula (a + bi)(c + di) = ac - bd + (ad + bc)i
  let resultReal = complexNumbers[0].real;
  let resultImaginary = complexNumbers[0].imaginary;

  // Multiply two complex numbers
  const multiplyComplexNumbers = (z1, z2) => {
    const realPart = z1.real * z2.real - z1.imaginary * z2.imaginary;
    const imaginaryPart = z1.real * z2.imaginary + z1.imaginary * z2.real;
    return { real: realPart, imaginary: imaginaryPart };
  };

  for (let i = 1; i < numComplexNumbers; i++) {
    const nextComplex = complexNumbers[i];
    const newResult = multiplyComplexNumbers(
      { real: resultReal, imaginary: resultImaginary },
      nextComplex
    );
    resultReal = newResult.real;
    resultImaginary = newResult.imaginary;
  }

  // Prepare steps for solution
  const steps = [
    {
      type: "text",
      value: `To solve this problem, multiply the complex numbers step by step, applying the formula: (a + bi)(c + di) = (ac - bd) + (ad + bc)i.`,
    },
    ...complexNumbers.map((cn) => ({
      type: "formula",
      value: `(${cn.real} ${formatSigned(`${cn.imaginary}i`)})`,
    })),
    {
      type: "text",
      value: `Now, apply the multiplication step by step:`,
    },
  ];

  // Multiply the complex numbers step by step
  for (let i = 1; i < numComplexNumbers; i++) {
    steps.push({
      type: "text",
      value: `Multiplying (${complexNumbers[i - 1].real} ${formatSigned(
        `${complexNumbers[i - 1].imaginary}i`
      )}) * (${complexNumbers[i].real} ${formatSigned(
        `${complexNumbers[i].imaginary}i`
      )})`,
    });
    const tempResult = multiplyComplexNumbers(
      complexNumbers[i - 1],
      complexNumbers[i]
    );
    steps.push({
      type: "formula",
      value: `= ${tempResult.real} ${formatSigned(`${tempResult.imaginary}i`)}`,
    });
  }

  // Add the final result
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

  // If the problem is not multiple choice, return the problem, steps, and solution
  if (!options.isMCQ) {
    return {
      problem: [
        {
          type: "text",
          value: `Calculate the product of the following complex numbers:`,
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
        value: `Calculate the product of the following complex numbers:`,
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
