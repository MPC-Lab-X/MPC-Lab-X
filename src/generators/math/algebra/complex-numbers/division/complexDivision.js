/**
 * @file src/generators/math/algebra/complex-numbers/division/complexDivision.js
 * @description Generates problems involving the division of complex numbers.
 */

const { fraction } = require("mathjs");
const { randomInt } = require("../../../../../utils/random");
const formatSigned = require("../../../../../utils/formatSigned");

/**
 * @function generateProblem - Generate a problem involving the division of complex numbers.
 * @param {Object} options - Options for problem generation.
 * @param {boolean} options.isMCQ - Whether the problem is multiple choice.
 * @param {number} options.minReal - Minimum value for the real part of the numerator.
 * @param {number} options.maxReal - Maximum value for the real part of the numerator.
 * @param {number} options.minImaginary - Minimum value for the imaginary part of the numerator.
 * @param {number} options.maxImaginary - Maximum value for the imaginary part of the numerator.
 * @param {number} options.minDenomReal - Minimum value for the real part of the denominator.
 * @param {number} options.maxDenomReal - Maximum value for the real part of the denominator.
 * @param {number} options.minDenomImaginary - Minimum value for the imaginary part of the denominator.
 * @param {number} options.maxDenomImaginary - Maximum value for the imaginary part of the denominator.
 * @returns {Object} - A problem involving the division of complex numbers.
 */
const generateProblem = (options) => {
  const realNumerator = randomInt(options.minReal, options.maxReal);
  const imaginaryNumerator = randomInt(
    options.minImaginary,
    options.maxImaginary
  );
  const realDenominator = randomInt(options.minDenomReal, options.maxDenomReal);
  const imaginaryDenominator = randomInt(
    options.minDenomImaginary,
    options.maxDenomImaginary
  );

  // Format the complex number as a string
  const formatComplex = (real, imaginary) =>
    `${real} ${formatSigned(`${imaginary}i`)}`;

  // Create the problem statement
  const problemText = `\\frac{${formatComplex(
    realNumerator,
    imaginaryNumerator
  )}}{${formatComplex(realDenominator, imaginaryDenominator)}}`;

  // Helper function to rationalize the complex number
  const rationalizeComplex = (a, b, c, d) => {
    const denominator = c ** 2 + d ** 2; // Calculate the denominator
    const realPart = (a * c + b * d) / denominator; // Calculate the real part
    const imaginaryPart = (b * c - a * d) / denominator; // Calculate the imaginary part

    return {
      real: fraction(realPart),
      imaginary: fraction(imaginaryPart),
    };
  };

  // Calculate the rationalized complex number
  const result = rationalizeComplex(
    realNumerator,
    imaginaryNumerator,
    realDenominator,
    imaginaryDenominator
  );

  // Helper function to format a fraction as a LaTeX string
  const formatResult = (real, imaginary) => {
    // Check if real part is zero
    const realFormatted =
      real.n === 0
        ? ""
        : real.d === 1
        ? `${real.s < 0 ? `-${real.n}` : real.n}`
        : `${real.s < 0 ? "-" : ""}\\frac{${Math.abs(real.n)}}{${real.d}}`;

    // Check if imaginary part is zero
    const imaginaryFormatted =
      imaginary.n === 0
        ? ""
        : `\\frac{${Math.abs(imaginary.n)}}{${imaginary.d}}i`;
    // Determine the sign for the imaginary part
    const imaginarySign = imaginary.s < 0 ? "-" : "+";

    // Build the final formatted result
    if (realFormatted && imaginaryFormatted) {
      return `${realFormatted} ${imaginarySign} ${imaginaryFormatted}`;
    } else if (realFormatted) {
      return realFormatted;
    } else if (imaginaryFormatted) {
      // Only display the imaginary part without the "+" if it's positive
      return imaginary.s < 0
        ? `${imaginarySign} ${imaginaryFormatted}`
        : imaginaryFormatted; // Return only the imaginary part for positive
    } else {
      return "0"; // Handle case where both parts are zero
    }
  };

  // Format the correct answer
  const correctAnswer = formatResult(result.real, result.imaginary);

  // Prepare steps for solution
  const steps = [
    { type: "text", value: `Identify the complex numbers to divide:` },
    {
      type: "formula",
      value: `${formatComplex(
        realNumerator,
        imaginaryNumerator
      )} \\div ${formatComplex(realDenominator, imaginaryDenominator)}`,
    },
    {
      type: "text",
      value: `Multiply numerator and denominator by the conjugate of the denominator:`,
    },
    {
      type: "formula",
      value: `\\frac{${formatComplex(
        realNumerator,
        imaginaryNumerator
      )}}{${formatComplex(
        realDenominator,
        imaginaryDenominator
      )}} \\cdot \\frac{${formatComplex(
        realDenominator,
        -imaginaryDenominator
      )}}{${formatComplex(realDenominator, -imaginaryDenominator)}}`,
    },
    { type: "text", value: `This gives:` },
    {
      type: "formula",
      value: `\\frac{(${formatComplex(
        realNumerator,
        imaginaryNumerator
      )})(${formatComplex(
        realDenominator,
        -imaginaryDenominator
      )})}{(${formatComplex(
        realDenominator,
        imaginaryDenominator
      )})(${formatComplex(realDenominator, -imaginaryDenominator)})}`,
    },
    { type: "text", value: `Final result:` },
    { type: "formula", value: correctAnswer },
  ];

  // If the problem is not multiple choice, return the problem with steps and solution
  if (!options.isMCQ) {
    return {
      problem: [
        {
          type: "text",
          value: `Calculate the following division of complex numbers:`,
        },
        { type: "formula", value: problemText },
      ],
      steps,
      solution: [{ type: "formula", value: correctAnswer }],
    };
  } else {
    // Generate multiple choice options
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
        value: `Calculate the following division of complex numbers:`,
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
