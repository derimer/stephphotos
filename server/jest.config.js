/**
 * Jest Configuration File
 * Documentation: https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  // Collect coverage information while executing tests
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // Specify the files for which coverage information should be collected
  collectCoverageFrom: [
    "server/**/*.js", // Inclure tous les fichiers JS dans le dossier `server`
    "!server/tests/**", // Exclure les fichiers de tests
    "!server/database/migrations/**", // Exclure les fichiers de migrations
    "!server/**/index.js" // Exclure les fichiers `index.js` si nécessaire
  ],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // The root directory that Jest should scan for tests and modules within
  roots: ["<rootDir>/server"],

  // Setup file to configure the testing environment before each test
  setupFilesAfterEnv: ["<rootDir>/server/tests/setupTests.js"],

  // The test environment that will be used for testing
  testEnvironment: "jest-environment-node",

  // The glob patterns Jest uses to detect test files
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],

  // Skip specific paths during testing
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/client/build/"
  ],

  // Indicates whether each individual test should be reported during the run
  verbose: true,

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,
};

module.exports = config;

