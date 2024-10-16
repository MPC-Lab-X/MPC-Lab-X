/**
 * @file src/generators/math/algebra/complex-numbers/properties-and-rules/equatingComplexNumbers.js
 * @description Generates problems involving the equality of two complex numbers, which requires equating their real and imaginary parts separately. Example: If a + bi = c + di, then a = c and b = d.
 */

const { randomInt } = require("../../../../../utils/random");
const formatSigned = require("../../../../../utils/formatSigned");

/**
 * @function generateProblem - Generate a complex number equality problem.
 * @param {Object} options - The options for generating the problem.
 * @param {boolean} options.isMCQ - Whether the problem is multiple choice.
 * @param {number} options.minReal - The minimum value for the real part a.
 * @param {number} options.maxReal - The maximum value for the real part a.
 * @param {number} options.minImaginary - The minimum value for the imaginary part b.
 * @param {number} options.maxImaginary - The maximum value for the imaginary part b.
 * @returns {Object} - The complex number equality problem.
 */
const generateProblem = (options) => {
  const a = randomInt(options.minReal, options.maxReal);
  const b = randomInt(options.minImaginary, options.maxImaginary);
  const c = randomInt(options.minReal, options.maxReal);
  const d = randomInt(options.minImaginary, options.maxImaginary);

  const problem = [
    {
      type: "text",
      value: `If (${a} ${formatSigned(b)}i) = (${c} ${formatSigned(
        d
      )}i), find the values of a, b, c, and d.`,
    },
    {
      type: "formula",
      value: `${a} ${formatSigned(b)}i = ${c} ${formatSigned(d)}i`,
    },
  ];

  const steps = [
    {
      type: "text",
      value: `To equate two complex numbers, set their real parts equal and their imaginary parts equal:`,
    },
    {
      type: "formula",
      value: `a = c \\text{ and } b = d`,
    },
  ];

  // Create solution
  const solution = [
    {
      type: "text",
      value: `a = ${a}, b = ${b}, c = ${c}, d = ${d}.`,
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
    // Generate multiple choice options
    const aChoices = [a, a + randomInt(1, 3), a - randomInt(1, 3), a * -1];
    const bChoices = [b, b + randomInt(1, 3), b - randomInt(1, 3), b * -1];
    const cChoices = [c, c + randomInt(1, 3), c - randomInt(1, 3), c * -1];
    const dChoices = [d, d + randomInt(1, 3), d - randomInt(1, 3), d * -1];

    let choices = [];
    for (let i = 0; i < 4; i++) {
      choices.push({
        type: "text",
        value: `a: ${aChoices[i]}, b: ${bChoices[i]}, c: ${cChoices[i]}, d: ${dChoices[i]}`,
        correct: i === 0,
      });
    }

    // Shuffle the choices
    choices = choices.sort(() => Math.random() - 0.5);

    let mcqProblem = [
      {
        type: "text",
        value: `Which of the following represents the correct values of a, b, c, and d?`,
      },
      {
        type: "formula",
        value: `${a} ${formatSigned(b)}i = ${c} ${formatSigned(d)}i`,
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
