/**
 * @file src/generators/math/algebra/complex-numbers/properties-and-rules/solvingComplexEquations.js
 * @description Generates problems involving solving for an unknown complex number, typically using basic algebraic techniques. Example: Solve for z in z + (3 - 2i) = 5 + i.
 */

const { randomInt } = require("../../../../../utils/random");

/**
 * @function generateProblem - Generate a problem for solving complex equations.
 * @param {Object} options - The options for generating the problem.
 * @param {boolean} options.isMCQ - Whether the problem is multiple choice.
 * @param {number} options.minReal - The minimum value for the real part of the constant.
 * @param {number} options.maxReal - The maximum value for the real part of the constant.
 * @param {number} options.minImaginary - The minimum value for the imaginary part of the constant.
 * @param {number} options.maxImaginary - The maximum value for the imaginary part of the constant.
 * @returns {Object} - The problem involving solving for an unknown complex number.
 */
const generateProblem = (options) => {
  // Generate random complex constant (a + bi)
  const constantReal = randomInt(options.minReal, options.maxReal);
  const constantImaginary = randomInt(
    options.minImaginary,
    options.maxImaginary
  );

  // Formulate the problem: z + (constantReal + constantImaginary i) = (targetReal + targetImaginary i)
  const targetReal = randomInt(options.minReal, options.maxReal);
  const targetImaginary = randomInt(options.minImaginary, options.maxImaginary);

  const problem = [
    {
      type: "text",
      value: `Solve for z in z + (${constantReal} ${
        constantImaginary < 0 ? "-" : "+"
      } ${Math.abs(constantImaginary)}i) = ${targetReal} ${
        targetImaginary < 0 ? "-" : "+"
      } ${Math.abs(targetImaginary)}i.`,
    },
    {
      type: "formula",
      value: `z + (${constantReal} ${
        constantImaginary < 0 ? "-" : "+"
      } ${Math.abs(constantImaginary)}i) = ${targetReal} ${
        targetImaginary < 0 ? "-" : "+"
      } ${Math.abs(targetImaginary)}i`,
    },
  ];

  // Calculate the solution
  const zReal = targetReal - constantReal;
  const zImaginary = targetImaginary - constantImaginary;
  const solution = `${zReal} ${zImaginary < 0 ? "-" : "+"} ${Math.abs(
    zImaginary
  )}i`;

  // Steps to solve the equation
  const steps = [
    {
      type: "text",
      value: `To solve for z, isolate z by subtracting (${constantReal} ${
        constantImaginary < 0 ? "-" : "+"
      } ${Math.abs(constantImaginary)}i) from both sides.`,
    },
    {
      type: "formula",
      value: `z = (${targetReal} ${targetImaginary < 0 ? "-" : "+"} ${Math.abs(
        targetImaginary
      )}i) - (${constantReal} ${constantImaginary < 0 ? "-" : "+"} ${Math.abs(
        constantImaginary
      )}i)`,
    },
    {
      type: "text",
      value: `This simplifies to z = ${solution}.`,
    },
  ];

  // If the problem is not multiple choice, return the problem, steps, and solution
  if (!options.isMCQ) {
    return {
      problem,
      steps,
      solution: [{ type: "text", value: `Solution: z = ${solution}` }],
    };
  } else {
    // Generate multiple choice options
    const solutionChoices = [
      solution,
      `${zReal + randomInt(1, 3)} ${zImaginary < 0 ? "-" : "+"} ${Math.abs(
        zImaginary + randomInt(1, 3)
      )}i`,
      `${zReal - randomInt(1, 3)} ${zImaginary < 0 ? "-" : "+"} ${Math.abs(
        zImaginary - randomInt(1, 3)
      )}i`,
      `${zReal * -1} ${zImaginary < 0 ? "-" : "+"} ${Math.abs(
        zImaginary * -1
      )}i`,
    ];

    let choices = [];
    for (let i = 0; i < 4; i++) {
      choices.push({
        type: "text",
        value: `z = ${solutionChoices[i]}`,
        correct: i === 0,
      });
    }

    // Shuffle the choices
    choices = choices.sort(() => Math.random() - 0.5);

    let mcqProblem = [
      {
        type: "text",
        value: `Which of the following is the solution for z?`,
      },
      {
        type: "formula",
        value: `z + (${constantReal} ${
          constantImaginary < 0 ? "-" : "+"
        } ${Math.abs(constantImaginary)}i) = ${targetReal} ${
          targetImaginary < 0 ? "-" : "+"
        } ${Math.abs(targetImaginary)}i`,
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