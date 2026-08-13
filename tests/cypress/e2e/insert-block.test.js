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

  beforeEach(() => {
    cy.login();
  });

  it('Should be able to Insert code block on page', () => {
    const code = 'code ' + randomName();
    cy.createPost({
      beforeSave: () => {
        cy.insertBlock('core/code').then(id => {
          cy.getBlockEditor().find(`#${id}`).click().type(code);
        });
      },
    });

    cy.getBlockEditor()
      .find('.wp-block-post-content, .block-editor-writing-flow')
      .should('contain.text', code);
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
      .find('.wp-block-post-content h2, .block-editor-writing-flow h2')
      .should('contain.text', heading);
  });

  it('Should be able to insert List', () => {
    const itemOne = 'Item One ' + randomName();
    const itemTwo = 'Item Two ' + randomName();
    cy.createPost({
      beforeSave: () => {
        cy.insertBlock('core/list').then(id => {
          cy.getBlockEditor()
            .find(
              `#${id} [aria-label="List text"], #${id}[aria-label="Block: List"]`
            )
            .first()
            .click()
            .type(`${itemOne}{enter}${itemTwo}`);
        });
      },
    });

    cy.getBlockEditor()
      .find('.wp-block-list, [data-type="core/list"]') // [data-type="core/list"] can be removed once the minimum is above WP 5.7.
      .first()
      .should('contain.text', itemOne)
      .should('contain.text', itemTwo);
  });

  it('Should be able to insert an Embed sub-block', () => {
    cy.createPost({
      beforeSave: () => {
        cy.insertBlock('core/embed/youtube', 'YouTube');
      },
    });

    cy.getBlockEditor()
      .find('.wp-block-embed')
      .should('contain.text', 'YouTube');
  });

  it('Should be able to insert custom block', () => {
    const wordpressCore = Cypress.env('WORDPRESS_CORE')
      ? Cypress.env('WORDPRESS_CORE').toString()
      : 'trunk';

    if ('trunk' !== wordpressCore && compare(wordpressCore, '6.1', '<')) {
      // WinAmp block does not support this version of WordPress.
      assert(true, 'Skipping test, WinAmp block does not exist');
      return;
    }

    cy.activatePlugin('retro-winamp-block');

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

    cy.deactivatePlugin('retro-winamp-block');
  });
});
