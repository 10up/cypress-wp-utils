const { randomName } = require('../support/functions');
import { compare } from 'compare-versions';

describe('Command: insertBlock', () => {
  before(() => {
    cy.login();
    cy.deactivatePlugin('classic-editor');
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

  it('Should be able to Insert first paragraph on page', () => {
    const paragraph = 'Paragraph ' + randomName();
    cy.createPost({
      beforeSave: () => {
        cy.insertBlock('core/paragraph').then(id => {
          cy.getBlockEditor().find(`#${id}`).click().type(paragraph);
        });
      },
    });

    cy.getBlockEditor()
      .find('.wp-block-post-content')
      .should('contain.text', paragraph);
  });

  it('Should be able to Insert Heading', () => {
    const heading = 'Heading ' + randomName();
    cy.createPost({
      beforeSave: () => {
        cy.insertBlock('core/heading').then(id => {
          cy.getBlockEditor().find(`#${id}`).click().type(heading);
        });
      },
    });

    cy.getBlockEditor()
      .find('.wp-block-post-content h2')
      .should('contain.text', heading);
  });

  it('Should be able to insert Pullquote', () => {
    const quote = 'Quote ' + randomName();
    const cite = 'Cite ' + randomName();
    cy.createPost({
      beforeSave: () => {
        cy.insertBlock('core/pullquote').then(id => {
          cy.getBlockEditor()
            .find(
              `#${id} [aria-label="Pullquote text"], #${id} [aria-label="Write quote…"]`
            )
            .click()
            .type(quote);
          cy.getBlockEditor()
            .find(
              `#${id} [aria-label="Pullquote citation text"], #${id} [aria-label="Write citation…"]`
            )
            .click()
            .type(cite);
        });
      },
    });

    cy.getBlockEditor()
      .find('.wp-block-pullquote')
      .should('contain.text', quote)
      .should('contain.text', cite);
  });

  it('Should be able to insert an Embed sub-block', () => {
    cy.createPost({
      beforeSave: () => {
        cy.insertBlock('core/embed/twitter', 'Twitter');
      },
    });

    cy.getBlockEditor()
      .find('.wp-block-embed')
      .should('contain.text', 'Twitter');
  });

  it('Should be able to insert custom block', () => {
    if (compare(Cypress.env('WORDPRESS_CORE').toString(), '5.9', '<')) {
      // The block was added in WordPress 5.9, skipping the test.
      assert(true, 'Skipping test, WinAmp block does not exist');
      return;
    }

    cy.createPost({
      beforeSave: () => {
        cy.insertBlock('tenup/winamp-block', 'WinAmp');
      },
    });

    cy.getBlockEditor()
      .find('.wp-block-tenup-winamp-block')
      .should('contain.text', 'Add Audio')
      .should('have.attr', 'data-type')
      .and('eq', 'tenup/winamp-block');
  });
});
