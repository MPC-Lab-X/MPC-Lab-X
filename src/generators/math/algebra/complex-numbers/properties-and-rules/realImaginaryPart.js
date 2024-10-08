/**
 * @file src/generators/math/algebra/complex-numbers/properties-and-rules/realImaginaryPart.js
 * @description Generates problems involving the identification and manipulation of the real and imaginary parts of complex numbers. Example: In 3 + 4i, the real part is 3, and the imaginary part is 4.
 */

const { randomInt } = require("../../../../../utils/random");

/**
 * @function generateProblem - Generate a problem involving real and imaginary parts of a complex number.
 * @param {Object} options - The options for generating the problem.
 * @param {boolean} options.isMCQ - Whether the problem is multiple choice.
 * @param {number} options.minReal - The minimum value for the real part.
 * @param {number} options.maxReal - The maximum value for the real part.
 * @param {number} options.minImaginary - The minimum value for the imaginary part.
 * @param {number} options.maxImaginary - The maximum value for the imaginary part.
 * @returns {Object} - The problem involving real and imaginary parts of a complex number.
 */
const generateProblem = (options) => {
  const realPart = randomInt(options.minReal, options.maxReal);
  const imaginaryPart = randomInt(options.minImaginary, options.maxImaginary);

  const problem = [
    {
      type: "text",
      value: `Identify the real and imaginary parts of the complex number (${realPart} + ${
        imaginaryPart < 0 ? "-" : "+"
      } ${Math.abs(imaginaryPart)}i).`,
    },
    {
      type: "formula",
      value: `(${realPart} + ${imaginaryPart < 0 ? "-" : "+"} ${Math.abs(
        imaginaryPart
      )}i)`,
    },
  ];

  const steps = [
    {
      type: "text",
      value: `In a complex number of the form a + bi, the real part is a and the imaginary part is b.`,
    },
    {
      type: "text",
      value: `Thus, for the complex number (${realPart} + ${
        imaginaryPart < 0 ? "-" : "+"
      } ${Math.abs(imaginaryPart)}i):`,
    },
  ];

  // Create solution
  const solution = [
    {
      type: "text",
      value: `Real part: ${realPart}, Imaginary part: ${imaginaryPart}.`,
    },
  ];

  // If the problem is not multiple choice, return the problem, steps, and solution
  if (!options.isMCQ) {
    return {
      problem,
      steps,
      solution,
    };
  } else {
    // Generate multiple choice options for real and imaginary parts
    const realChoices = [
      realPart,
      realPart + randomInt(1, 3),
      realPart - randomInt(1, 3),
      realPart * -1,
    ];
    const imaginaryChoices = [
      imaginaryPart,
      imaginaryPart + randomInt(1, 3),
      imaginaryPart - randomInt(1, 3),
      imaginaryPart * -1,
    ];

    let choices = [];
    for (let i = 0; i < 4; i++) {
      choices.push({
        type: "text",
        value: `Real part: ${realChoices[i]}, Imaginary part: ${imaginaryChoices[i]}`,
        correct: i === 0,
      });
    }

    // Shuffle the choices
    choices = choices.sort(() => Math.random() - 0.5);

    let mcqProblem = [
      {
        type: "text",
        value: `Which of the following correctly identifies the real and imaginary parts of the complex number?`,
      },
      {
        type: "formula",
        value: `(${realPart} + ${imaginaryPart < 0 ? "-" : "+"} ${Math.abs(
          imaginaryPart
        )}i)`,
      },
      { type: "options", value: choices },
    ];

    const mcqSolution = [
      {
        type: "choice",
        choice: 0,
      },
    ];

    mcqProblem[2].value.forEach((choice, index) => {
      if (choice.correct) {
        mcqSolution[0].choice = index;
      }
      delete choice.correct;
    });

    return {
      problem: mcqProblem,
      steps,
      solution: mcqSolution,
    };
  }
};

module.exports = generateProblem;
