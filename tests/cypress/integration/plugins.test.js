describe('Plugins commands', () => {
  beforeEach(() => {
    cy.login();
    // At least one needs to be activated for this test.
    cy.activatePlugin('hello-dolly');
  });

  it('Test plugins commands', () => {
    cy.deactivateAllPlugins();
    cy.get('#message.updated.notice').should(
      'contain',
      'Selected plugins deactivated.'
    );

    // Activate current plugin
    cy.getCurrentPlugin().then(plugin => {
      cy.activatePlugin();
      cy.get(`[data-slug="${plugin}"]`).should('have.class', 'active');
    });

    // Activate Hello Dolly
    const plugin = 'hello-dolly';
    cy.activatePlugin(plugin);
    cy.get(`[data-slug="${plugin}"]`).should('have.class', 'active');

    // Should not fail if Hello Dolly activated again
    cy.activatePlugin('hello-dolly');
  });
});
