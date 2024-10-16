/**
 * @file src/utils/formatSigned.js
 * @description Utility function for formatting numbers with signs.
 */

/**
 * @function formatSigned - Formats a number with its appropriate sign.
 * @param {number} number - The number to format.
 * @param {boolean} [showPlus=true] - Whether to show a plus sign for positive numbers.
 * @returns {string} - The formatted string with the appropriate sign.
 */
const formatSigned = (number, showPlus = true) => {
  if (number === 0) return "0"; // Handle special case for 0
  const sign = number < 0 ? "-" : showPlus ? "+" : "";
  return `${sign} ${Math.abs(number)}`;
};

module.exports = formatSigned;
