const { jest: jestConfig } = require("kcd-scripts/config");

/**
 *  @type {import('@jest/types').Config.InitialOptions}
 */
const customJestConfig = {
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
