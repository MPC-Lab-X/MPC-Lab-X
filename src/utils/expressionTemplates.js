/**
 * @file src/utils/expressionTemplates.js
 * @description Expression templates for formatting math expressions.
 */

const expressionTemplates = {
  equation: {
    linear: {
      standard: (a, b, c, x) => {
        const bStr = b === 0 ? "" : `${b < 0 ? "-" : "+"} ${Math.abs(b)}`;
        return `${a}${x} ${bStr} = ${c}`;
      },
      slopeIntercept: (m, b, x) => {
        const bStr = b === 0 ? "" : `${b < 0 ? "-" : "+"} ${Math.abs(b)}`;
        return `y = ${m}${x} ${bStr}`;
      },
      pointSlope: (m, x1, y1, x) => {
        return `y ${y1 < 0 ? "+" : "-"} ${Math.abs(y1)} = ${m}(${x} ${
          x1 < 0 ? "+" : "-"
        } ${Math.abs(x1)})`;
      },
      withAbsoluteValue: (a, b, c, x) => {
        return `|${a}${x} ${b < 0 ? "-" : "+"} ${Math.abs(b)}| = ${c}`;
      },
      withFractions: (a, b, c, x) => {
        return `\\frac{${a}${x}}{${b}} = ${c}`;
      },
      withParentheses: (a, b, c, x) => {
        return `${a}(${x} ${b < 0 ? "-" : "+"} ${Math.abs(b)}) = ${c}`;
      },
    },
  },
  fraction: (s, n, d) => {
    return d === 1
      ? `${s < 0 ? "-" : ""}${n}`
      : `${s < 0 ? "-" : ""}\\frac{${n}}{${d}}`;
  },
};

module.exports = expressionTemplates;
