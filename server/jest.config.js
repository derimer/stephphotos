/** @type {import('jest').Config} */
const config = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "server/**/*.js",
    "!server/tests/**",
    "!server/database/migrations/**",
    "!server/**/index.js"
  ],
  coverageProvider: "v8",
  roots: ["<rootDir>/tests"], // Correction : pointer vers le répertoire des tests
  setupFilesAfterEnv: ["<rootDir>/tests"], // Ajout pour le code avant/après les tests
  testEnvironment: "jest-environment-node",
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/client/build/"
  ],
  verbose: true,
  clearMocks: true,
};

module.exports = config;
