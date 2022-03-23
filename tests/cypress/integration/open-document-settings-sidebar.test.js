describe('Command: openDocumentSettingsSidebar', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Should be able to Open Post Settings Sidebar on a new Post', () => {
    cy.visit(`/wp-admin/post-new.php`);
    cy.get('button[aria-label="Close dialog"]').click();
    cy.openDocumentSettingsSidebar();

    // Assertions:
    cy.get('.edit-post-sidebar__panel-tab')
      .contains('Post')
      .should('have.class', 'is-active');
    cy.get('.components-panel .components-panel__body').should(
      'be.visible'
    );
  });

  it('Should be able to Open Block tab of the first block on existing post', () => {
    cy.visit(`/wp-admin/edit.php?post_type=post`);
    cy.get('#the-list .row-title').first().click();
    cy.get('button[aria-label="Close dialog"]').click();

    cy.get('.is-root-container.block-editor-block-list__layout > *')
      .first()
      .click();
    cy.openDocumentSettingsSidebar('Block');

    // Assertions:
    cy.get('.edit-post-sidebar__panel-tab')
      .contains('Block')
      .should('have.class', 'is-active');
    cy.get('.components-panel .block-editor-block-inspector').should(
      'be.visible'
    );
  });

  it('Should be able to open Page Settings sidebar on an existing page', () => {
    cy.visit(`/wp-admin/edit.php?post_type=page`);
    cy.get('#the-list .row-title').first().click();
    cy.get('button[aria-label="Close dialog"]').click();

    cy.get('.is-root-container.block-editor-block-list__layout > *')
      .first()
      .click();

    cy.openDocumentSettingsSidebar('Page');

    // Assertions:
    cy.get('.edit-post-sidebar__panel-tab')
      .contains('Page')
      .should('have.class', 'is-active');
    cy.get('.components-panel .components-panel__body').should(
      'be.visible'
    );
  })
});
