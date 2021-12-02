// This file manages reporter selection for jest.

// Returns local or CI reporters (when CI=true) for the given test type.
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function getReporters(ci, testType) {
  return ci ? getCiReporters(testType) : getLocalReporters();
}

// Returns 'default' reporter for local execution
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function getLocalReporters() {
  return ['default']; // prints to console
}

// Returns 'default' and 'jest-junit' reporters for CI execution
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function getCiReporters(testType) {
  const reportsDir = './reports';
  const junitFile = `jest-${testType}-junit.xml`;
  return [
    'default', // prints to console
    [
      'jest-junit',
      {
        outputDirectory: reportsDir,
        outputName: junitFile,
        addFileAttribute: true,
        ancestorSeparator: ' › ',
        includeShortConsoleOutput: true,
        reportTestSuiteErrors: true,
      },
    ],
  ];
}

module.exports = {
  getReporters,
};
