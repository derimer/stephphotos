require("dotenv").config();

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
  roots: ["<rootDir>/tests"],
  setupFilesAfterEnv: ["<rootDir>/tests/config/install.test/test.js"], 
  testEnvironment: "node",
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
  testTimeout: 20000, // Augmentez le délai global
};

module.exports = config;
