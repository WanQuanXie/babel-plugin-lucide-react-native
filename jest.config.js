const { jest: jestConfig } = require("kcd-scripts/config");

/**
 *  @type {import('@jest/types').Config.InitialOptions}
 */
const customJestConfig = {
  coverageReporters: ["clover", "json", "json-summary", "lcov", "text"],
};

module.exports = Object.assign(jestConfig, customJestConfig);
