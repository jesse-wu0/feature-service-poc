// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getReporters } = require('./test/helpers/jest/reporter');

const testType = 'unit-tests';
module.exports = {
  displayName: testType,
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: './reports/coverage',
  coverageReporters: ['lcov', 'text'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  setupFilesAfterEnv: ['<rootDir>/test/jest_setup.ts', 'jest-extended/all'],
  testEnvironment: 'node',
  roots: ['<rootDir>/src/'],
  reporters: getReporters(process.env.CI, testType),
};
