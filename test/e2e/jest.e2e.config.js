// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultConfig = require('../../jest.config');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getReporters } = require('../helpers/jest/reporter');

const testType = 'e2e-tests';
module.exports = {
  ...defaultConfig,
  displayName: testType,
  rootDir: '.',
  testRegex: '.e2e-spec.ts$',
  setupFilesAfterEnv: ['<rootDir>/../jest_setup.ts'],
  roots: ['<rootDir>/'],
  reporters: getReporters(process.env.CI, testType),
};
