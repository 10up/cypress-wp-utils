describe('Command: wpCli', () => {
  it('Perform tests of cli commands', () => {
    cy.visit('/');

    cy.wpCli('cli version')
      .its('stdout')
      .should('match', /^WP-CLI \d+\.\d+/);

    cy.wpCli('plugin list --field=name')
      .its('stdout')
      .should('contain', 'cypress-wp-utils');

    // Should not fail of the cli command exit with error
    const randomCommand =
      'command' + (Math.random() + 1).toString(16).substring(3);
    cy.wpCli(randomCommand, true).its('code').should('equal', 1);

    const evalSting = (Math.random() + 1).toString(16);
    cy.wpCliEval(`<?php echo 'Test Eval Command ${evalSting}';`)
      .its('stdout')
      .should('contain', evalSting);
  });
});
