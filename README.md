# MPC-Lab-X

MPC-Lab-X is a powerful problem generation module for educational purposes. It enables developers and educators to create, customize, and generate a variety of problems in subjects like mathematics, physics, and chemistry. With flexible, dynamic generation and parameterized controls, it scales easily from simple exercises to complex assessments.

## Features

- **Problem Generation**: Generate problems with a variety of parameters and constraints.
- **Customization**: Customize problems with different types, formats, and difficulty parameters.
- **Scalability**: Scale from simple exercises to complex assessments with ease.
- **Subjects**: Generate problems in mathematics, physics, and chemistry.
- **Dynamic Generation**: Generate problems dynamically with randomization and parameterization.

## Installation

```bash
npm install mpclab
```

## Usage

- **Step 1**: Import the module.

  ```javascript
  const ProblemGenerator = require("mpclab");
  ```

- **Step 2**: Create a new instance of the problem generator.

  ```javascript
  const generator = new ProblemGenerator();
  ```

- **Step 3**: Generate a problem with specific parameters.

  ```javascript
  const problem = generator.generateOne([
    "math",
    "algebra",
    "linear-equations",
    "standardForm",
  ]);

  console.log(problem);
  ```

- **Step 4**: Enjoy the generated problem!

  > **Note**: This is a basic example. You can customize and generate problems with a wide range of parameters and constraints. Check the [USAGE.md](/docs/USAGE.md) file for detailed usage instructions.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
