/**
 * @file src/utils/formatSigned.js
 * @description Utility function for formatting numbers with signs.
 */

/**
 * Formats a number with the appropriate sign.
 * @param {number|string} number - The input to format. Can be a number or string (e.g., 3, -2, "3i", "-2x", "-3.14159z").
 * @param {boolean} [isStart=false] - Whether this is the first element in an expression.
 * @param {string} [zeroSign="none"] - The sign to use for zero. Options: "none", "plus", "minus".
 * @returns {string} - The formatted string with the correct sign.
 */
const formatSigned = (number, isStart = false, zeroSign = "none") => {
  const isString = typeof number === "string";
  const match = isString ? number.match(/[a-z]/i) : null;
  const character = match ? match[0] : "";
  const numericValue = isString ? parseFloat(number) : number;

  // Helper function to format positive/negative numbers.
  const formatNumber = (num, prefix = "") =>
    `${prefix}${
      Math.abs(num) === 1
        ? `${character ? character : Math.abs(num)}`
        : Math.abs(num) + character
    }`;

  // Handle start of expression.
  if (isStart) {
    if (numericValue === 0) return `0${character}`;
    return numericValue > 0
      ? formatNumber(numericValue)
      : formatNumber(numericValue, "-");
  }

  // Handle non-start positions.
  if (numericValue === 0) {
    if (zeroSign === "none") return "";
    return `${zeroSign === "plus" ? "+" : "-"} 0${character}`;
  }

  return numericValue > 0
    ? `+ ${formatNumber(numericValue)}`
    : `- ${formatNumber(numericValue)}`;
};

module.exports = formatSigned;
