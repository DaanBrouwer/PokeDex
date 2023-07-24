/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
module.exports = {
  preset: 'ts-jest',

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    
    '!src/index.tsx',
    '!src/vite-env.d.ts',
    '!src/index.tsx',
    '!src/reportWebVitals.ts',
    '!src/Playground/Playground.tsx',
    
    '!**/node_modules/**',
    '!**/mocks.{js,jsx,ts,tsx}',
    '!**/fixtures.{js,jsx,ts,tsx}',
    '!**/types.{js,jsx,ts,tsx}',
    '!**/*-types.{js,jsx,ts,tsx}'
  ],

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],

  reporters: ['default'],

  setupFiles: ['<rootDir>/src/setupTests.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTestsAfterEnv.ts'],

  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/test/styleMock.js",
  },
};
