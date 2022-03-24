describe('Command: wpCli', () => {
  it('Perform tests of cli commands', () => {
    // cy.wpCli('cli version')
    //   .its('stdout')
    //   .should('match', /^WP-CLI \d+\.\d+/);

    cy.wpCliEval(`<?php echo 'Test Eval Command';`).then(response => {
      console.log(response);
    });
  });
});
