# MPC-Lab-X Usage Guide

## Table of Contents

- [Installation](#installation)
- [Creating an Instance](#creating-an-instance)
  - [Constructor](#constructor)
- [Generating Problems](#generating-problems)
  - [`generator.generate(options)`](#generatorgenerateoptions)
  - [Example](#example)
  - [Output](#output)
- [Generating a Single Problem](#generating-a-single-problem)
  - [`generator.generateOne(options)`](#generatorgenerateoneoptions)
  - [Example](#example-1)
  - [Output](#output-1)
- [Customization](#customization)
- [Contributing](#contributing)

## Installation

To install MPC-Lab-X, you can use npm or yarn:

```bash
npm install mpclab
```

or

```bash
yarn add mpclab
```

## Creating an Instance

To create a new instance of the problem generator, you can use the following code:

```javascript
const ProblemGenerator = require("mpclab");

const generator = new ProblemGenerator();
```

### Constructor

#### `new ProblemGenerator(options)`

- `options` (Object): An optional object with configuration options for the problem generator.
- `options.maxCount` (Number): The maximum number of problems to generate in a single topic. Default is `1000`.
- `options.duplicateCheckMode` (String): Determines how to handle duplicate problems. Options: `'silent'`, `'warning'`, `'error'`. Default is `'warning'`.

## Generating Problems

To generate problems, you can use the `generate` method of the problem generator instance.

### `generator.generate(options)`

- `options` (Object): An object with the following properties:
  - `topics` (Array(Object)): An array of topic objects specifying the topics for which problems should be generated.
    - `path` (Array(String)): An array of strings representing the path to the topic in the topic tree. For example, `["math", "algebra", "linear-equations", "standardForm"]`.
    - `options` (Object): An object with additional options for generating problems in this topic.
      - `count` (Number): The number of problems to generate for this topic. Default is `1`. If `count` is greater than `options.maxCount`, `options.maxCount` will be used.
      - ··· (Other options specific to the topic. For example, difficulty level, format, etc. See [index.json](/src/index.json) for available options.)
  - `shuffle` (Boolean): Whether to shuffle the generated problems. Default is `false`.

### Example

```javascript
const options = {
  topics: [
    {
      path: ["math", "algebra", "linear-equations", "standardForm"],
      options: {
        count: 10,
        minCoefficient: -20,
        maxCoefficient: 20,
        minConstant: -10,
        maxConstant: 10,
        minSolution: -100,
        maxSolution: 100,
      },
    },
  ],
  shuffle: true,
};

const problems = generator.generate(options);

console.log(problems);
```

### Output

```json
[
  {
    "problem": [
      {
        "type": "text",
        "value": "Solve for i:"
      },
      {
        "type": "formula",
        "value": "5i + 12 = 2"
      }
    ],
    "steps": [
      {
        "type": "text",
        "value": "Subtract the constant term from both sides of the equation."
      },
      {
        "type": "formula",
        "value": "5i = -10"
      },
      {
        "type": "text",
        "value": "Divide both sides of the equation by the coefficient of the variable."
      },
      {
        "type": "formula",
        "value": "i = \\frac{-10}{5}"
      },
      {
        "type": "text",
        "value": "Calculate the value of i."
      },
      {
        "type": "formula",
        "value": "i = -2"
      }
    ],
    "solution": [
      {
        "type": "numeric",
        "decimal": -2
      }
    ]
  },
  ···
]
```

> **Note**: The output is an array of problem objects, each containing the problem statement, solution steps, and final solution. The format of the output may vary based on the topic and options specified. Check the [index.json](/src/index.json) file, each problem type path in the tree has a corresponding Generator module that defines the `/src/generators` folder.

## Generating a Single Problem

To generate a single problem, you can use the `generateOne` method of the problem generator instance.

### `generator.generateOne(options)`

- `options` (Object): An object with the following properties:
  - `path` (Array(String)): An array of strings representing the path to the topic in the topic tree. For example, `["math", "algebra", "linear-equations", "standardForm"]`.
  - `options` (Object): An object with additional options for generating the problem in this topic.
    - ··· (Other options specific to the topic. For example, difficulty level, format, etc. See [index.json](/src/index.json) for available options.)

### Example

```javascript
const problem = generator.generateOne({
  path: ["math", "algebra", "linear-equations", "standardForm"],
  options: {
    minCoefficient: -20,
    maxCoefficient: 20,
    minConstant: -10,
    maxConstant: 10,
    minSolution: -100,
    maxSolution: 100,
  },
});

console.log(problem);
```

### Output

```json
{
  "problem": [
    {
      "type": "text",
      "value": "Solve for i:"
    },
    {
      "type": "formula",
      "value": "5i + 12 = 2"
    }
  ],
  "steps": [
    {
      "type": "text",
      "value": "Subtract the constant term from both sides of the equation."
    },
    {
      "type": "formula",
      "value": "5i = -10"
    },
    {
      "type": "text",
      "value": "Divide both sides of the equation by the coefficient of the variable."
    },
    {
      "type": "formula",
      "value": "i = \\frac{-10}{5}"
    },
    {
      "type": "text",
      "value": "Calculate the value of i."
    },
    {
      "type": "formula",
      "value": "i = -2"
    }
  ],
  "solution": [
    {
      "type": "numeric",
      "decimal": -2
    }
  ]
}
```

> **Note**: The output is a single problem object containing the problem statement, solution steps, and final solution. The format of the output may vary based on the topic and options specified. Check the [index.json](/src/index.json) file, each problem type path in the tree has a corresponding Generator module that defines the `/src/generators` folder.

## Customization

You can customize the problem generator by adding new generators in the `/src/generators` folder. And you can modify the `index.json` file to add new topics, problem types, and options to the index.

## Contributing

Contributions are welcome! For major changes, please open an issue first to discuss what you would like to change. Please make sure to update tests as appropriate. Check the [CONTRIBUTING.md](/docs/CONTRIBUTING.md) file for more details.
