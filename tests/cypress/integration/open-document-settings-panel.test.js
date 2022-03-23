describe('Command: openDocumentSettingsPanel', () => {
  beforeEach(() => {
    cy.login();
  });

  it("Should be able to open (don't close) Status Panel on a new post", () => {
    cy.visit(`/wp-admin/post-new.php`);
    cy.get('button[aria-label="Close dialog"]').click();

    const name = 'Status & visibility';
    cy.openDocumentSettingsPanel(name);

    // Assertion: Stick to the top checkbox should be visible
    cy.get('.components-panel__body .components-panel__body-title button')
      .contains(name)
      .then($button => {
        const $panel = $button.parents('.components-panel__body');
        cy.wrap($panel).should('contain', 'Stick to the top of the blog');
      });
  });

  it('Should be able to open Tags panel on the existing post', () => {
    cy.visit(`/wp-admin/edit.php?post_type=post`);
    cy.get('#the-list .row-title').first().click();
    cy.get('button[aria-label="Close dialog"]').click();

    cy.get('.is-root-container.block-editor-block-list__layout > *')
      .first()
      .click();

    const name = 'Tags';
    cy.openDocumentSettingsPanel(name);

    // Assertion: Add new tag input should be visible
    cy.get('.components-panel__body .components-panel__body-title button')
      .contains(name)
      .then($button => {
        const $panel = $button.parents('.components-panel__body');
        cy.wrap($panel).should('contain', 'Add New Tag');
      });
  });

  it('Should be able to open Discussion panel on the existing page', () => {
    cy.visit(`/wp-admin/edit.php?post_type=page`);
    cy.get('#the-list .row-title').first().click();
    cy.get('button[aria-label="Close dialog"]').click();

    cy.get('.is-root-container.block-editor-block-list__layout > *')
      .first()
      .click();

    const name = 'Discussion';
    cy.openDocumentSettingsPanel(name, 'Page');

    // Assertion: Allow comments checkbox should be visible
    cy.get('.components-panel__body .components-panel__body-title button')
      .contains(name)
      .then($button => {
        const $panel = $button.parents('.components-panel__body');
        cy.wrap($panel).should('contain', 'Allow comments');
      });
  });

});
