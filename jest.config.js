const { jest: jestConfig } = require("kcd-scripts/config");

/**
 *  @type {import('@jest/types').Config.InitialOptions}
 */
const customJestConfig = {
  coverageReporters: ["clover", "json", "json-summary", "lcov", "text"],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      lines: 90,
      functions: 90,
    },
  },
};

module.exports = Object.assign(jestConfig, customJestConfig);
