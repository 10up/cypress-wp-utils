describe('Plugins commands', () => {
  before(() => {
    cy.login();
  });

  beforeEach(() => {
    Cypress.Cookies.defaults({
      preserve: /^wordpress.*?/,
    });
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

    const plugins = ['classic-editor', 'cypress-wp-utils'];

    plugins.forEach(plugin => {
      cy.activatePlugin(plugin);
      cy.get(`[data-slug="${plugin}"]`).should('have.class', 'active');
      cy.get('#message.updated.notice').should('contain', 'Plugin activated.');

      // Should not fail if activated again
      cy.activatePlugin(plugin);
      cy.get('body').then($body => {
        assert.equal(
          $body.find('#message.updated.notice').length,
          0,
          'No notice output'
        );
      });

      cy.deactivatePlugin(plugin);
      cy.get(`[data-slug="${plugin}"]`).should('have.class', 'inactive');
      cy.get('#message.updated.notice').should(
        'contain',
        'Plugin deactivated.'
      );

      // Should not fail if deactivated again
      cy.deactivatePlugin(plugin);
      cy.get('body').then($body => {
        assert.equal(
          $body.find('#message.updated.notice').length,
          0,
          'No notice output'
        );
      });

      // Bring previously active plugin back
      cy.activatePlugin(plugin);
    });
  });
});
