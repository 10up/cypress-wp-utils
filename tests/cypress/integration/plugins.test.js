describe('Plugins commands', () => {
  beforeEach(() => {
    cy.login();
    // At least one needs to be activated for this test.
    cy.activatePlugin('hello-dolly');
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
    });

    // Activate Hello Dolly
    const plugin = 'hello-dolly';
    cy.activatePlugin(plugin);
    cy.get(`[data-slug="${plugin}"]`).should('have.class', 'active');

    // Should not fail if Hello Dolly activated again
    cy.activatePlugin('hello-dolly');
  });
});
