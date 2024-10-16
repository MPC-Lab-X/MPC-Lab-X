/**
 * @file src/index.js
 * @module index - Main entry point for the application
 * @description This file is the entry point for all problem generators. It loads all problem generators from the file system and generates problems for the specified topics.
 */

// Load the required modules
const fs = require("fs");
const path = require("path");

class ProblemGenerator {
  /**
   * @constructor - Create a new ProblemGenerator instance.
   * @param {Object} config - The configuration for the ProblemGenerator.
   * @param {number} config.maxCount - The maximum number of problems to generate in a single topic.
   * @param {string} config.duplicateCheckMode - Determines how to handle duplicate problems.
   */
  constructor(config = {}) {
    this.config = config;
    this.maxCount = config.maxCount || 1000;
    this.duplicateCheckMode = config.duplicateCheckMode || "warning";

    this.index = JSON.parse(
      fs.readFileSync(path.join(__dirname, "index.json"), "utf8")
    );
    this.generators = this.loadGenerators();
    this.parameters = this.loadParameters();
  }

  /**
   * @method loadGenerators - Load all problem generators from the file system.
   * @returns {Object} - The problem generators for the specified topic.
   */
  loadGenerators() {
    const generators = {};

    const loadGenerator = (node, currentPath) => {
      let generators = {};

      if (node.topics) {
        for (const subtopic in node.topics) {
          generators[subtopic] = loadGenerator(node.topics[subtopic], [
            ...currentPath,
            subtopic,
          ]);
        }
      } else {
        const generatorPath = path.join(
          __dirname,
          "generators",
          ...currentPath
        );

        const generator = require(generatorPath);
        generators = generator;
      }

      return generators;
    };

    for (const subject in this.index) {
      generators[subject] = loadGenerator(this.index[subject], [subject]);
    }

    return generators;
  }

  /**
   * @method loadParameters - Load all problem parameters from the file system.
   * @returns {Object} - The problem parameters for the specified topic.
   */
  loadParameters() {
    const generators = {};

    const loadGenerator = (node) => {
      let generators = {};

      if (node.topics) {
        for (const subtopic in node.topics) {
          generators[subtopic] = loadGenerator(node.topics[subtopic]);
        }
      } else {
        const parameters = node.parameters;
        generators = parameters;
      }

      return generators;
    };

    for (const subject in this.index) {
      generators[subject] = loadGenerator(this.index[subject]);
    }

    return generators;
  }

  /**
   * @method generate - Generate problems for the specified topics.
   * @param {Object} options - The options for generating the problems.
   * @param {Array<Object>} options.topics - The topics for generating the problems.
   * @param {boolean} options.shuffle - Whether to shuffle the problems
   * @returns {Array<Object>} - The generated problems.
   */
  generate(options) {
    const problems = [];

    try {
      if (!options.topics || options.topics.length === 0) {
        throw new Error("No topics specified");
      }

      for (const topic of options.topics) {
        const path = topic.path;
        const topicOptions = topic.options || {};

        const count = Math.min(topicOptions.count || 1, this.maxCount);

        const generator = path.reduce((acc, cur) => acc[cur], this.generators);
        const parameters = path.reduce((acc, cur) => acc[cur], this.parameters);

        if (!generator || !parameters) {
          throw new Error("Generator not found");
        }

        for (const key in parameters) {
          if (topicOptions[key] === undefined) {
            topicOptions[key] = parameters[key].default;
          }

          if (parameters[key].type === "number") {
            if (topicOptions[key] < parameters[key].min) {
              topicOptions[key] = parameters[key].min;
            }
            if (topicOptions[key] > parameters[key].max) {
              topicOptions[key] = parameters[key].max;
            }
          }
        }

        for (const key in topicOptions) {
          if (parameters[key] === undefined && key !== "count") {
            delete topicOptions[key];
          }
        }

        const topicProblems = [];
        for (let i = 0; i < count; i++) {
          const problem = generator(topicOptions);
          topicProblems.push(problem);
        }

        problems.push(...topicProblems);
      }

      if (options.shuffle) {
        problems.sort(() => Math.random() - 0.5);
      }
    } catch (error) {
      throw error;
    }

    if (problems.length > 1) {
      if (this.duplicateCheckMode === "error") {
        const duplicateCount = this.testDuplicate(problems);
        if (duplicateCount > 0) {
          throw new Error(`Duplicate problems found: ${duplicateCount}`);
        }
      } else if (this.duplicateCheckMode === "warning") {
        const duplicateCount = this.testDuplicate(problems);
        if (duplicateCount > 0) {
          console.warn(`Duplicate problems found: ${duplicateCount}`);
        }
      }
    }

    return problems;
  }

  /**
   * @method generateOne - Generate a single problem for the specified topics.
   * @param {Object} topic - The topic for generating the problem.
   * @returns {Object} - The generated problem.
   */
  generateOne(topic) {
    const problems = this.generate({ topics: [topic], shuffle: false });
    return problems[0];
  }

  /**
   * @method testDuplicate - Test for duplicate problems in the generated problems.
   * @param {Array<Object>} problems - The generated problems.
   * @returns {number} - The number of duplicate problems.
   */
  testDuplicate(problems) {
    const problemSet = new Set(
      problems.map((problem) => JSON.stringify(problem))
    );
    return problems.length - problemSet.size;
  }
}

module.exports = ProblemGenerator;
