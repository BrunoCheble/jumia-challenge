const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/services/*.ts'
  ],
  coverageReporters: [
     "text-summary",
     "lcov",
  ],
  preset: 'ts-jest',
  testEnvironment: "node",
  testMatch: [
    "**/*.spec.ts"
  ],
};
