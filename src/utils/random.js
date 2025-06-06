/**
 * @file src/utils/random.js
 * @description Random utility functions.
 */

/**
 * @function randomInt - Generate a random integer between min and max (inclusive).
 * @param {number} min - The minimum value (inclusive).
 * @param {number} max - The maximum value (inclusive).
 * @param {boolean} noZero - Whether to exclude zero from the range.
 * @returns {number} - A random integer between min and max.
 */
const randomInt = (min, max, noZero = false) => {
  let result;
  do {
    result = Math.floor(Math.random() * (max - min + 1)) + min;
    min--;
    max++;
  } while (noZero && result === 0);
  return result;
};

/**
 * @function randomBool - Generate a random boolean.
 * @returns {boolean} - A random boolean.
 */
const randomBool = () => {
  return Math.random() < 0.5;
};

/**
 * @function randomVariable - Generate a random variable. (a-z)
 * @param {boolean} isUpperCase - Whether the variable should be uppercase. (A-Z)
 * @returns {string} - A random variable.
 */
const randomVariable = (isUpperCase = false) => {
  const min = isUpperCase ? 65 : 97;
  const max = isUpperCase ? 90 : 122;
  return String.fromCharCode(randomInt(min, max));
};

/**
 * @function randomElement - Get a random element from an array.
 * @param {Array} array - The array to get a random element from.
 * @returns {*} - A random element from the array.
 */
const randomElement = (array) => {
  return array[randomInt(0, array.length - 1)];
};

module.exports = { randomInt, randomVariable, randomBool, randomElement };
