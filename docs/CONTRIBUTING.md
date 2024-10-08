# Contributing to MPC-Lab-X

Thank you for considering contributing to the MPC-Lab-X project! This guide outlines how to get involved, how to contribute, and some basic guidelines to follow.

- [How to Contribute](#how-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Requesting Features](#requesting-features)
  - [Contributing Code](#contributing-code)
- [Writing Tests](#writing-tests)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [License](#license)

## How to Contribute

### Reporting Bugs

If you encounter any bugs while using MPC-Lab-X, please help us improve by submitting an issue in the [GitHub Issues](https://github.com/mpc-lab-x/mpclab/issues) section. Make sure to include:

1. A clear and descriptive title.
2. A detailed description of the issue, including the environment and version of the package you are using.
3. Steps to reproduce the issue.
4. Any relevant screenshots, logs, or error messages.

### Requesting Features

We welcome feature requests! If there is a new feature you'd like to see, please submit an issue with:

1. A clear and descriptive title.
2. A detailed explanation of why the feature is necessary or what problem it solves.
3. Any additional context or examples that could be helpful.

### Contributing Code

1. Fork the repository to your own GitHub account.
2. Create a branch from `main` (e.g., `feature/my-new-feature`).
3. Make your changes on your branch.
4. Write tests to cover your changes (see [Writing Tests](#writing-tests)).
5. Submit a pull request to merge your changes into the `main` branch.

## Writing Tests

We use [Jest](https://jestjs.io/) for testing. You can run the tests with:

```bash
npm test
```

Make sure to write tests for any new features or changes you make. This helps ensure that the code is working as expected and prevents regressions.

## Pull Request Process

1. Ensure that your code is well-tested and follows the [coding standards](#coding-standards).
2. Make sure your branch is up-to-date with the `main` branch.
3. Submit a pull request with a clear title and description.
4. Wait for feedback and be prepared to make changes if requested.
5. Once your pull request is approved, it will be merged into the `main` branch.

## Coding Standards

- Naming conventions: Use descriptive names for variables, functions, and classes.
  - Variables: `const myVariable = ...;`
  - Functions: `function myFunction() { ... }`
  - Classes: `class MyClass { ... }`
- Indentation: Use 2 spaces for indentation.
- Comments: Add comments to explain complex logic or functions.
- Error handling: Always handle errors and exceptions gracefully.

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](/LICENSE) file for details.
