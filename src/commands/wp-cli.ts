/**
 * Wp Cli
 *
 * @example
 * ```
 * cy.wpCli()
 * ```
 */
export const wpCli = (command: string, ignoreFailures = false): void => {
  const escapedCommand = command.replace(/"/g, '\\"').replace(/^wp /, '');
  const options = {
    failOnNonZeroExit: !ignoreFailures,
  };
  cy.exec(
    `npm --silent run env run tests-cli "${escapedCommand}"`,
    options
  ).then(result => {
    cy.wrap(result);
  });
};
