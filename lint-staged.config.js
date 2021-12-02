/*
 * lint-staged documentation (https://www.npmjs.com/package/lint-staged).
 *
 * Writing the configuration file in JavaScript is the most powerful way to configure the tool.
 *
 * With module.exports as an object, keys are defined as glob patterns, where:
 *   1. Key values can be assigned a single command or sequence of commands in the form of an array,
 *   where each will receive staged files as arguments.
 *
 *   2. Key values can be defined as individual functions, which also receive staged files as arguments,
 *      but offer greater flexibility for custom logic.
 *
 * The typescript compiler does not observe the tsconfig.json file when individual files are passed as arguments.
 * In order to ensure the "tsc -p tsconfig.json" command runs, it must be executed againist ALL files matching the associated glob pattern.
 * The assigned function below overrides the lint-staged default behavior of passing staged files as arguments to the command.
 *
 * To bypass type-checking on commit, please run "git commit --no-verify"
 *
 * NOTE:
 *   Use of the "--no-verify" option on commit will bypass ALL linting operations.
 */

module.exports = {
  '*.ts': () => 'npm run typecheck',
  '*.{js,ts}': ['eslint --cache --fix', 'prettier --write'],
  '*.{yml, md, json}': 'prettier --write',
};
