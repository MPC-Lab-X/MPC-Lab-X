/**
 * @file src/generators/math/algebra/complex-numbers/division/rationalizing.js
 * @description Generates problems involving the rationalization of complex numbers. Example: 1 / (3 + 4i).
 */

const { fraction } = require("mathjs");
const { randomInt } = require("../../../../../utils/random");
const formatSigned = require("../../../../../utils/formatSigned");

/**
 * @function generateProblem - Generate a problem involving the rationalization of complex numbers.
 * @param {Object} options - Options for problem generation.
 * @param {boolean} options.isMCQ - Whether the problem is multiple choice.
 * @param {number} options.minReal - Minimum value for the real part of the denominator.
 * @param {number} options.maxReal - Maximum value for the real part of the denominator.
 * @param {number} options.minImaginary - Minimum value for the imaginary part of the denominator.
 * @param {number} options.maxImaginary - Maximum value for the imaginary part of the denominator.
 * @returns {Object} - A problem involving the rationalization of complex numbers.
 */
const generateProblem = (options) => {
  const real = randomInt(options.minReal, options.maxReal);
  const imaginary = randomInt(options.minImaginary, options.maxImaginary);

  // Format the complex number as a string
  const formatComplex = (real, imaginary) =>
    `${real} ${formatSigned(imaginary)} i`;

  // Create the problem statement
  const problemText = `\\frac{1}{${formatComplex(real, imaginary)}}`;

  // Helper function to rationalize the complex number
  const rationalizeComplex = (a, b) => {
    const denominator = a ** 2 + b ** 2;

    const realPart = fraction(a, denominator);
    const imaginaryPart = fraction(-b, denominator);

    return { real: realPart, imaginary: imaginaryPart };
  };

  // Calculate the rationalized complex number
  const result = rationalizeComplex(real, imaginary);

  // Helper function to format a fraction as a LaTeX string
  const toLatexFraction = (num) => {
    return num.d === 1
      ? `${num.n}` // If denominator is 1, return as integer
      : `\\frac{${num.n}}{${num.d}}`; // LaTeX fraction format
  };

  // Format the result as a string
  const formatResult = (real, imaginary) => {
    const realFormatted = toLatexFraction(real);

    const imaginarySign = imaginary.s < 0 ? "-" : "+";
    const imaginaryAbs = toLatexFraction(
      fraction(Math.abs(imaginary.n), imaginary.d)
    );

    if (imaginary.n === 0) return realFormatted;
    if (real.n === 0) return `${imaginaryAbs}i`;

    const realSign = real.s < 0 ? "-" : "";
    return `${realSign}${realFormatted} ${imaginarySign} ${imaginaryAbs}i`;
  };

  // Format the correct answer
  const correctAnswer = formatResult(result.real, result.imaginary);

  // Prepare steps for solution
  const steps = [
    {
      type: "text",
      value: `Identify the complex denominator:`,
    },
    {
      type: "formula",
      value: formatComplex(real, imaginary),
    },
    {
      type: "text",
      value: `Multiply by the conjugate:`,
    },
    {
      type: "formula",
      value: formatComplex(real, -imaginary),
    },
    {
      type: "formula",
      value: `
        \\frac{1}{${formatComplex(real, imaginary)}} \\cdot 
        \\frac{${formatComplex(real, -imaginary)}}{${formatComplex(
        real,
        -imaginary
      )}}
        = \\frac{${formatComplex(
          real,
          -imaginary
        )}}{${real}^2 + (${imaginary})^2}
      `,
    },
    {
      type: "text",
      value: `Simplify the denominator:`,
    },
    {
      type: "formula",
      value: ` ${real}^2 + (${imaginary})^2 = ${real ** 2 + imaginary ** 2}`,
    },
    {
      type: "text",
      value: `Divide each part of the numerator by the denominator to get:`,
    },
    {
      type: "formula",
      value: `
        \\frac{${real}}{${real ** 2 + imaginary ** 2}} 
        ${imaginary < 0 ? "-" : "+"} 
        \\frac{${Math.abs(imaginary)}}{${real ** 2 + imaginary ** 2}} i
      `,
    },
    {
      type: "text",
      value: `Final simplified form:`,
    },
    {
      type: "formula",
      value: correctAnswer,
    },
  ];

  // If the problem is not multiple choice, return the problem, steps, and solution
  if (!options.isMCQ) {
    return {
      problem: [
        { type: "text", value: `Rationalize the following complex fraction:` },
        { type: "formula", value: problemText },
      ],
      steps,
      solution: [{ type: "formula", value: correctAnswer }],
    };
  } else {
    // Generate multiple choice options, randomizing the order
    const choices = [
      correctAnswer,
      formatResult(
        fraction(result.real.s + randomInt(1, 3), result.real.d),
        result.imaginary
      ),
      formatResult(
        result.real,
        fraction(result.imaginary.s + randomInt(1, 3), result.imaginary.d)
      ),
      formatResult(
        fraction(-result.real.s, result.real.d),
        fraction(-result.imaginary.s, result.imaginary.d)
      ),
    ].sort(() => Math.random() - 0.5);

    const mcqProblem = [
      { type: "text", value: `Rationalize the following complex fraction:` },
      { type: "formula", value: problemText },
      {
        type: "options",
        value: choices.map((value) => ({ type: "formula", value })),
      },
    ];

    const mcqSolution = [
      {
        type: "choice",
        choice: choices.findIndex((choice) => choice === correctAnswer),
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
