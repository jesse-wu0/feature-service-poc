[![Maintainer](https://img.shields.io/badge/Maintainer-Test%20Tooling%20and%20Frameworks-orange)](https://procoretech.slack.com/archives/C01GMQP7TT2)
[![Issues](https://img.shields.io/badge/Issues-TTF-blue)](https://procoretech.atlassian.net/secure/RapidBoard.jspa?projectKey=TTF)
[![CircleCI](https://circleci.com/gh/procore/simple-backend-nest-service.svg?style=shield&circle-token=32223b3028829fc9b84372ed7b6f1cdc12e7b187)](https://app.circleci.com/pipelines/github/procore/simple-backend-nest-service)

# Overview

The test folder contains a suggested structure for test categories (excluding unit tests)
implemented within the Simple Backend Nest Service. Unit tests are not included within this
folder as they should live closely to the code as defined below.

# Test Categories

## Unit Tests

These tests must only test small units of code, and not reference any external resources.
This is absolutely critical to help ensure these can execute quickly to help catch issues
early and often.

Command:
`$ npm run test` or `$ npm run test:watch` to run tests on file change.

Unit tests should not live within this folder. Unit tests should live closely to the code. An
example of unit tests within the Simple Backend Nest Service can be seen in `src/demo` where
`demo.controller.ts` is unit tested by `demo.controller.spec.ts`. Notice the consistent name
usage. These tests should only test the code within the associated file and should never rely
on any exernal resources (such as database connections, external services, etc.). Mocking
through Jest is sufficient to use when needed as these tests need to execute quickly.

The base Jest config `jest.config.js` is used to execute unit tests.

These tests must contain the `.spec.ts` suffix.

## End-to-End Tests

These tests should cover full user flows within the application and can be expensive to run.

Command:
`$ npm run test:e2e`

E2E tests should live within this folder within the test/e2e subfolder. An example of E2E
tests within the Simple Backend Nest Service can be seen in `test/e2e/demo` where
`demo.e2e-spec.ts` is used to test the demo controller flows for code stored within `src/demo`.
Configuration for these tests lives within `test/e2e/jest.e2e.config.js`.

The `.e2e-spec.ts` suffix is suggested for use with E2E tests. If another convention is
to be used, this will need to be updated within the `test/e2e/jest.e2e.config.js`
configuration.

# Reporting

### Jest

All test results and code coverage reports from `jest` live in `./reports`.

* **Local**: Uses the `default` reporter for local execution.
* **CI**: Uses both the `default` reporter and `jest-junit` to output JUnit XML reports for each test type.

In CI, contents of  `./reports` are made available in the *Artifacts* tab for each of the `test_*` jobs.

# Code Coverage

### Usage

Command:
`$ npm run test:cov`

Generates a coverage report based on your unit test coverage and configuration. Output and
settings can be reviewed and configured via the Jest settings within the `jest.config.js`
configuration file. Default code coverage threshold for passing is set to 80%. LCOV and
HTML reports are output in your `./reports/coverage` directory.
These are also output as artifacts in CircleCI when ran in CI.

# Test Helpers

### Assertion Chaining

This test framework makes use of jest-chain which allows chaining of assertions to prevent
repetitive `expect` calls.
`calculator.controller.spec.ts` uses this feature within its
assertions. For more details and examples, see the jest-chain GitHub page
found [here](https://github.com/mattphillips/jest-chain).

### Additional Matchers

This test framework is enhanced with `jest-extended`, which adds additional matching syntax
to Jest's default assertion library. The package allows developers to be explicit in their
testing logic, improve test readability, and can be used harmoniously with `jest-chain`.
Both `demo.controller.spec.ts` and `calculator.controller.spec.ts` use this feature within its
assertions. For more details and examples, see the jest-extended GitHub page
found [here](https://github.com/jest-community/jest-extended).
