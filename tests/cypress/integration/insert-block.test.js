const { randomName } = require('../support/functions');

describe('Command: insertBlock', () => {
  before(() => {
    cy.login();
    cy.deactivatePlugin('classic-editor');
  });

  it('Should be able to Insert first paragraph on page', () => {
    const paragraph = 'Paragraph ' + randomName();
    cy.createPost({
      beforeSave: () => {
        // remove the existing paragraph
        cy.get('.edit-post-header-toolbar__list-view-toggle').click();
        cy.get('.block-editor-list-view-tree .block-editor-list-view-leaf')
          .first()
          .find('.components-dropdown-menu__toggle')
          .click();
        cy.get('.components-popover .components-menu-item__button')
          .contains('Remove Paragraph')
          .click();
        cy.get(
          '.edit-post-header-toolbar__list-view-toggle.is-pressed'
        ).click();

        cy.insertBlock('core/paragraph').then(id => {
          cy.get(`#${id}`).click().type(paragraph);
        });
      },
    });

    cy.get('.block-editor-writing-flow')
      .should('not.contain.text', 'Test content')
      .should('contain.text', paragraph);
  });

  it('Should be able to Insert Heading', () => {
    const heading = 'Heading ' + randomName();
    cy.createPost({
      beforeSave: () => {
        cy.insertBlock('core/heading').then(id => {
          cy.get(`#${id}`).click();
          cy.get(
            '.components-popover .components-button[aria-label="Change heading level"]'
          ).click();
          cy.get('.components-button[aria-label="Heading 3"]').click();
          cy.get(`#${id}`).click().type(heading);
        });
      },
    });

    cy.get('.block-editor-writing-flow h3.wp-block').should(
      'contain.text',
      heading
    );
  });

  it('Should be able to insert Pullquote', () => {
    const quote = 'Quote ' + randomName();
    const cite = 'Cite ' + randomName();
    cy.createPost({
      beforeSave: () => {
        cy.insertBlock('core/pullquote').then(id => {
          cy.get(`#${id} [aria-label="Pullquote text"]`).click().type(quote);
          cy.get(`#${id} [aria-label="Pullquote citation text"]`)
            .click()
            .type(cite);
        });
      },
    });

    cy.get('.wp-block-pullquote')
      .should('contain.text', quote)
      .should('contain.text', cite);
  });

  it('Should be able to insert an Embed sub-block', () => {
    cy.createPost({
      beforeSave: () => {
        cy.insertBlock('core/embed/twitter');
      },
    });

    cy.get('.wp-block-embed').should('contain.text', 'Twitter');
  });

  it('Should be able to insert Post-nav sub-block', () => {
    cy.createPost({
      beforeSave: () => {
        cy.insertBlock('core/post-navigation-link/post-next');
      },
    });

    cy.get('.wp-block-post-navigation-link > a')
      .should('have.attr', 'aria-label')
      .and('eq', 'Next post');
  });
});
