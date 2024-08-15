const { jest: jestConfig } = require("kcd-scripts/config");

/**
 *  @type {import('@jest/types').Config.InitialOptions}
 */
const customJestConfig = {
  // for test written in Typescript, add:
  transform: {
    "\\.(ts|tsx)$": "<rootDir>/node_modules/ts-jest/preprocessor.js",
  },
};

module.exports = Object.assign(jestConfig, customJestConfig);
