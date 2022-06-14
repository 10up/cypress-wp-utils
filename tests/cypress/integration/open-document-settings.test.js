const { randomName } = require('../support/functions');

describe('Commands: openDocumentSettings*', () => {
  before(() => {
    cy.login();

    cy.deactivatePlugin('classic-editor');

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

    // Ignore WP 5.2 Synchronous XHR error.
    Cypress.on('uncaught:exception', (err, runnable) => {
      if (
        err.message.includes(
          "Failed to execute 'send' on 'XMLHttpRequest': Failed to load 'http://localhost:8889/wp-admin/admin-ajax.php': Synchronous XHR in page dismissal"
        )
      ) {
        return false;
      }
    });
  });

  it("Should be able to open (don't close) Status Panel on a new post", () => {
    cy.visit(`/wp-admin/post-new.php`);
    cy.closeWelcomeGuide();

    const name = 'Status & visibility';
    cy.openDocumentSettingsPanel(name);

    // Assertion: Stick to the top checkbox should be visible
    cy.get('.components-panel__body .components-panel__body-title button')
      .contains(name, { matchCase: false })
      .then($button => {
        const $panel = $button.parents('.components-panel__body');
        cy.wrap($panel).should('contain', 'Stick to the top of the blog');
      });
  });

  it('Should be able to open Tags panel on the existing post', () => {
    cy.createPost({
      title: randomName(),
    }).then(post => {
      cy.visit(`/wp-admin/post.php?post=${post.id}&action=edit`);
      cy.closeWelcomeGuide();

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
  });

  it('Should be able to open Discussion panel on the existing page', () => {
    cy.createPost({
      title: randomName(),
      postType: 'page',
    }).then(post => {
      cy.visit(`/wp-admin/post.php?post=${post.id}&action=edit`);
      cy.closeWelcomeGuide();

      const name = 'Discussion';
      cy.openDocumentSettingsPanel(name, 'Page');

      // Assertion: Allow comments checkbox should be visible
      cy.get('.components-panel__body .components-panel__body-title button')
        .contains(name)
        .then($button => {
          const $panel = $button.parents('.components-panel__body');
          cy.wrap($panel)
            .contains('Allow comments', { matchCase: false })
            .should('exist');
        });
    });
  });

  it('Should be able to Open Post Settings Sidebar on a new Post', () => {
    cy.visit(`/wp-admin/post-new.php`);
    cy.closeWelcomeGuide();

    cy.openDocumentSettingsSidebar();

    cy.get('body').then($body => {
      let postTabSelector = '.edit-post-sidebar__panel-tab[data-label="Post"]';
      if (
        $body.find('.edit-post-sidebar__panel-tab[data-label="Post"]')
          .length === 0
      ) {
        // Post tab name for WordPress 5.2
        postTabSelector =
          '.edit-post-sidebar__panel-tab[data-label="Document"]';
      }
      cy.get(postTabSelector).should('have.class', 'is-active');
      cy.get('.components-panel .components-panel__body').should('be.visible');
    });
  });

  it('Should be able to Open Block tab of the first block on existing post', () => {
    cy.createPost({
      title: randomName(),
    }).then(post => {
      cy.visit(`/wp-admin/post.php?post=${post.id}&action=edit`);
      cy.closeWelcomeGuide();

      cy.get('.block-editor-block-list__layout > .wp-block').first().click();
      cy.openDocumentSettingsSidebar('Block');

      // Assertions:
      cy.get('.edit-post-sidebar__panel-tab')
        .contains('Block')
        .should('have.class', 'is-active');
      cy.get(
        '.components-panel .block-editor-block-inspector, .components-panel .edit-post-settings-sidebar__panel-block'
      ).should('be.visible');
    });
  });

  it('Should be able to open Page Settings sidebar on an existing page', () => {
    cy.createPost({
      title: randomName(),
      postType: 'page',
    }).then(post => {
      cy.visit(`/wp-admin/post.php?post=${post.id}&action=edit`);
      cy.closeWelcomeGuide();

      cy.openDocumentSettingsSidebar('Page');

      cy.get('body').then($body => {
        let postTabSelector =
          '.edit-post-sidebar__panel-tab[data-label="Page"]';
        if (
          $body.find('.edit-post-sidebar__panel-tab[data-label="Page"]')
            .length === 0
        ) {
          // Post tab name for WordPress 5.2
          postTabSelector =
            '.edit-post-sidebar__panel-tab[data-label="Document"]';
        }
        cy.get(postTabSelector).should('have.class', 'is-active');
        cy.get('.components-panel .components-panel__body').should(
          'be.visible'
        );
      });
    });
  });
});
