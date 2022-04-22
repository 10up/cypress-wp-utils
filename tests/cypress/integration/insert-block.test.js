const { randomName } = require('../support/functions');

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
          cy.get(`#${id}`).click().type(paragraph);
        });
      },
    });

    cy.get('.block-editor-writing-flow').should('contain.text', paragraph);
  });

  it('Should be able to Insert Heading', () => {
    const heading = 'Heading ' + randomName();
    cy.createPost({
      beforeSave: () => {
        cy.insertBlock('core/heading').then(id => {
          cy.get(`#${id}`).click().type(heading);
        });
      },
    });

    cy.get('.block-editor-writing-flow h2').should('contain.text', heading);
  });

  it('Should be able to insert Pullquote', () => {
    const quote = 'Quote ' + randomName();
    const cite = 'Cite ' + randomName();
    cy.createPost({
      beforeSave: () => {
        cy.insertBlock('core/pullquote').then(id => {
          cy.get(
            `#${id} [aria-label="Pullquote text"], #${id} [aria-label="Write quote…"]`
          )
            .click()
            .type(quote);
          cy.get(
            `#${id} [aria-label="Pullquote citation text"], #${id} [aria-label="Write citation…"]`
          )
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
        cy.insertBlock('core/embed/twitter', 'Twitter');
      },
    });

    cy.get('.wp-block-embed').should('contain.text', 'Twitter');
  });

  it('Should be able to insert Post-nav sub-block', () => {
    cy.visit('/wp-admin/post-new.php');
    cy.closeWelcomeGuide();
    const titleInput = 'h1.editor-post-title__input, #post-title-0';
    cy.get(titleInput).should('exist');
    cy.get(
      '.edit-post-header-toolbar__inserter-toggle, .edit-post-header-toolbar .block-editor-inserter__toggle'
    ).click();

    // Detect if the block exist (added in 5.9)
    cy.get('.block-editor-inserter__search').click().type('Next post');
    cy.get('body').then($body => {
      const slug = 'post-navigation-link\\/post-next';
      if ($body.find(`.editor-block-list-item-${slug}`).length > 0) {
        cy.createPost({
          beforeSave: () => {
            cy.insertBlock('core/post-navigation-link/post-next', 'Next');

            cy.get('.wp-block-post-navigation-link > a')
              .should('have.attr', 'aria-label')
              .and('eq', 'Next post');
          },
        });
      } else {
        expect(true, 'Skipping test, Next Page block does not exist');
      }
    });
  });

  it('Should be able to insert custom block', () => {
    cy.createPost({
      beforeSave: () => {
        cy.insertBlock('tenup/winamp-block').then(id => {
          cy.get(`#${id}`)
            .should('contain.text', 'Add Audio')
            .should('have.attr', 'data-type')
            .and('eq', 'tenup/winamp-block');
        });
      },
    });
  });
});
