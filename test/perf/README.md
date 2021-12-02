[![Maintainer](https://img.shields.io/badge/Codeowner-Team%20Performance%20Engineering%20-orange)](https://procoretech.slack.com/archives/C01B4AG57QX)

# Overview
This module describes a sample usage of Procore's Load Test Module, which is distributed as a docker container.  Detailed documentation on the Load Test Module is available on the Confluence page [Performance Testing for Procore Services](https://procoretech.atlassian.net/wiki/spaces/CSE/pages/1872855318/Performance+Testing+for+Procore+Services).

## Tooling
Procore has adopted [k6.io](https://k6.io/) for load testing throughout the development cycle, and across the tech stack.  k6 is an API-based tool, utilizing JavaScript syntax to define load tests.  Tests can be executed locally, or remote.

On top of k6, Procore's Performance Engineering team has developed the Load Test Module, which implements a self-service model via streamlining test development and deployment.  The Load Test Module
* centralizes all code required to generate load tests for Web Service APIs.  Consuming projects define tests and configurations as data.
* implements project-level test data affinity.  Consuming projects own the `JSON` for test definitions and configurations.
* handles OAuth2 authentication: users can supply `client_id` and `client_secret` values to be used for OAuth2 authentication of grant type `client_credentials` 
* offers a single point of entry: a shell script, which
  * validates parameters, and enforces required parameters
  * provides overrideable defaults for key parameters
  * generates load locally (for small loads), or via the k6 cloud (for larger loads)
  * can stream load test results to k6 cloud
  * streamlines integration to third-party systems, such as CI/CD
  * provides the caller with meaningful return codes 

The Load Test Module consists of two parts:
* a docker container, which is published on [Procore's quay.io repo](https://quay.io/repository/procoredevops/performance-engineering).  The container contains the Load Test Module code, and the load-generation tool (k6).
* a `run-docker.sh` script in the [performance-engineering](https://github.com/procore/performance-engineering/tree/main/k6) repo.  This script offers a convenient entry point to generate load via the docker container, using a standardized set of parameters.

More in-depth documention on the docker container, the k6 load generation tool, usage, best practices, constraints etc is available in the [Performance Testing Handbook](https://procoretech.atlassian.net/wiki/spaces/CSE/pages/1871904883/Performance+Testing+Handbook).

## Test Data Example
An example k6 test and configuration `JSON` for SBNS are included in this repo: `my-load-test.json` and `config.localhost.json`. 
* *NOTE*: test data (definition and configuration) are owned by, and persisted in, the repo that is being tested.  The Load Test Module adds the ability to execute the test(s), and is used via a docker container.

# Usage
## Syntax
To run the docker container, or obtain help on syntax and parameters, clone the [performance-engineering](https://github.com/procore/performance-engineering/tree/main/k6) repo.  Execute `/k6/run-docker.sh --help` for usage and parameters.

The docker container for the Load Test Module is pulled automatically from Procore's quay.io repo when executing load tests using `run-docker.sh`.


## Run the Sample SBNS Performance Test 
**Pre-requisite:** the unmodified Simple Backend Nest Service (this project) is expected to be running on port 3000 (default).

To run the sample performance test, from within the performance-engineering/k6 directory, issue the command

`./run-docker.sh --test-data-dir <local path to this directory> --url http://host.docker.internal:3000 --queries my-load-test.json --config config.localhost.json`

This will execute the load test defined in `my-load-test.json`, using the configuration in `config.localhost.json`.

* `my-load-test.js`: the test definition, it defines the request(s), and validation of the expected response(s).  A developer can base their performance tests off this sample test definition.
* `config.localhost.json`: the test configuration.  A developer can define different configurations for different tests, purposes and environments.

# Analytics Reporting
For k6, there are many options in which test run results can be visualized. As seen on k6's [Results Visualization documentation](https://k6.io/docs/results-visualization/), there are many platforms to choose from.  For Procore, the Performance Engineering Team recommends utilizing the k6 Cloud, as it is custom-tailored to k6 test results, to optimize visualization and insight of your test run.  k6 cloud accounts may be requested via the [P&T Marketplace](https://procoretech.atlassian.net/wiki/spaces/RDOPS/pages/822837290/P+T+Tool+Support+Marketplace).