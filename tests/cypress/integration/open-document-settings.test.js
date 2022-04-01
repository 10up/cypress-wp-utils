describe('Commands: openDocumentSettings*', () => {
  before(() => {
    Cypress.Cookies.defaults({
      preserve: /^wordpress.*?/,
    });

    // Disable Classic Editor if it's enabled
    cy.visit('/wp-admin/options-writing.php');
    cy.get('body').then($body => {
      if (
        $body.find('.classic-editor-options').length !== 0 &&
        $body.find('#classic-editor-classic').is(':checked')
      ) {
        cy.get('#classic-editor-block').click();
        cy.get('#submit').click();
      }
    });
  });

  beforeEach(() => {
    Cypress.Cookies.defaults({
      preserve: /^wordpress.*?/,
    });
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
  it('Should be able to Open Post Settings Sidebar on a new Post', () => {
    cy.visit(`/wp-admin/post-new.php`);
    cy.get('button[aria-label="Close dialog"]').click();
    cy.openDocumentSettingsSidebar();

    // Assertions:
    cy.get('.edit-post-sidebar__panel-tab')
      .contains('Post')
      .should('have.class', 'is-active');
    cy.get('.components-panel .components-panel__body').should('be.visible');
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
    cy.get('.components-panel .components-panel__body').should('be.visible');
  });
});
