/**
 * Wp Cli Eval
 *
 * @example
 * ```
 * cy.wpCliEval()
 * ```
 */
export const wpCliEval = (command: string): void => {
  const fileName = (Math.random() + 1).toString(36).substring(7);

  // this will be written "local" plugin directory
  const escapedCommand = command.replace(/^<\?php /, '');
  cy.writeFile(fileName, `<?php ${escapedCommand}`);

  cy.exec('echo $(basename $(pwd))').then(result => {
    const pluginName = result.stdout;

    // which is read from it's proper location in the plugins directory
    cy.exec(
      `npm --silent run env run tests-cli "eval-file wp-content/plugins/${pluginName}/${fileName}"` // eslint-disable-line @typescript-eslint/restrict-template-expressions
    ).then(result => {
      cy.exec(`rm ${fileName}`);
      cy.wrap(result);
    });
  });
};
