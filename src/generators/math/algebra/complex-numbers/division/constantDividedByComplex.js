/**
 * @file src/generators/math/algebra/complex-numbers/division/constantDividedByComplex.js
 * @description Generates problems where a constant is divided by a complex number.
 */

const { fraction } = require("mathjs");
const { randomInt } = require("../../../../../utils/random");
const formatSigned = require("../../../../../utils/formatSigned");

/**
 * @function generateProblem - Generate a problem involving the division of a constant by a complex number.
 * @param {Object} options - Options for problem generation.
 * @param {boolean} options.isMCQ - Whether the problem is multiple choice.
 * @param {number} options.minConstant - Minimum value for the constant.
 * @param {number} options.maxConstant - Maximum value for the constant.
 * @param {number} options.minDenomReal - Minimum value for the real part of the denominator.
 * @param {number} options.maxDenomReal - Maximum value for the real part of the denominator.
 * @param {number} options.minDenomImaginary - Minimum value for the imaginary part of the denominator.
 * @param {number} options.maxDenomImaginary - Maximum value for the imaginary part of the denominator.
 * @returns {Object} - A problem involving the division of a constant by a complex number.
 */
const generateProblem = (options) => {
  // Generate a random constant and complex number components
  const constant = randomInt(options.minConstant, options.maxConstant);
  const real = randomInt(options.minDenomReal, options.maxDenomReal);
  const imaginary = randomInt(
    options.minDenomImaginary,
    options.maxDenomImaginary
  );

  // Format the complex number as a string
  const formatComplex = (real, imaginary) =>
    `${real} ${formatSigned(imaginary)} i`;

  // Create the problem statement
  const problemText = `${constant < 0 ? "-" : ""}\\frac{${Math.abs(
    constant
  )}}{${formatComplex(real, imaginary)}}`;

  // Helper function to rationalize the complex number
  const rationalizeComplex = (constant, a, b) => {
    const denominator = a ** 2 + b ** 2;

    const realPart = fraction(constant * a, denominator);
    const imaginaryPart = fraction(-constant * b, denominator);

    return { real: realPart, imaginary: imaginaryPart };
  };

  // Calculate the rationalized complex number
  const result = rationalizeComplex(constant, real, imaginary);

  // Helper function to format a fraction as a LaTeX string
  const formatResult = (real, imaginary) => {
    const realFormatted =
      real.d === 1
        ? `${real.s < 0 ? `-${real.n}` : real.n}`
        : `${real.s < 0 ? "-" : ""}\\frac{${Math.abs(real.n)}}{${real.d}}`;
    const imaginarySign = imaginary.s < 0 ? "-" : "+";
    const imaginaryAbs =
      imaginary.n === 0
        ? ""
        : `\\frac{${Math.abs(imaginary.n)}}{${imaginary.d}}i`;

    return imaginary.n === 0
      ? realFormatted
      : `${realFormatted} ${imaginarySign} ${imaginaryAbs}`;
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
                \\frac{${constant}}{${formatComplex(real, imaginary)}} \\cdot 
                \\frac{${formatComplex(real, -imaginary)}}{${formatComplex(
        real,
        -imaginary
      )}}
                = \\frac{${constant} \\cdot ${formatComplex(
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
                \\frac{${constant * real}}{${real ** 2 + imaginary ** 2}} 
                ${imaginary < 0 ? "-" : "+"} 
                \\frac{${Math.abs(constant * imaginary)}}{${
        real ** 2 + imaginary ** 2
      }} i
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
        {
          type: "text",
          value: `Divide the constant by the following complex number:`,
        },
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
      {
        type: "text",
        value: `Divide the constant by the following complex number:`,
      },
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
