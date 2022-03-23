describe('Plugins commands', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Test plugins commands', () => {
    cy.activateAllPlugins();
    cy.visit('/wp-admin/plugins.php');
    cy.get('body').then($body => {
      assert.equal(
        $body.find('#the-list tr.inactive').length,
        0,
        'No inactive plugins'
      );
    });

    cy.deactivateAllPlugins();
    cy.get('#message.updated.notice').should(
      'contain',
      'Selected plugins deactivated.'
    );
    cy.get('body').then($body => {
      assert.equal(
        $body.find('#the-list tr.active').length,
        0,
        'No active plugins'
      );
    });

    // Activate current plugin
    cy.getCurrentPlugin().then(plugin => {
      cy.activatePlugin();
      cy.get(`[data-slug="${plugin}"]`).should('have.class', 'active');
      cy.get('#message.updated.notice').should('contain', 'Plugin activated.');
    });

    // Activate Hello Dolly
    cy.activatePlugin('hello-dolly');
    cy.get('[data-slug="hello-dolly"]').should('have.class', 'active');
    cy.get('#message.updated.notice').should('contain', 'Plugin activated.');

    // Should not fail if Hello Dolly activated again
    cy.activatePlugin('hello-dolly');
    cy.get('body').then($body => {
      assert.equal(
        $body.find('#message.updated.notice').length,
        0,
        'No notice output'
      );
    });

    // Deactivate current plugin
    cy.getCurrentPlugin().then(plugin => {
      cy.deactivatePlugin();
      cy.get(`[data-slug="${plugin}"]`).should('have.class', 'inactive');
    });

    // Activate Hello Dolly
    cy.deactivatePlugin('hello-dolly');
    cy.get('[data-slug="hello-dolly"]').should('have.class', 'inactive');
    cy.get('#message.updated.notice').should('contain', 'Plugin deactivated.');

    // Should not fail if Hello Dolly activated again
    cy.deactivatePlugin('hello-dolly');
    cy.get('body').then($body => {
      assert.equal(
        $body.find('#message.updated.notice').length,
        0,
        'No notice output'
      );
    });

    // Bring previously active plugins back
    cy.activatePlugin();
    cy.activatePlugin('classic-editor');
  });
});
