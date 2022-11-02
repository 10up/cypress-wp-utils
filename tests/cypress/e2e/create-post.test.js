const { randomName } = require('../support/functions');

describe('Command: createPost', () => {
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

  it('Should be able to create Post', () => {
    const title = 'Test Post';
    cy.createPost({
      title,
      content: 'Test Content',
    });

    cy.visit('/wp-admin/edit.php?orderby=date&order=desc');
    cy.get('#the-list td.title a.row-title').first().should('have.text', title);
  });

  it('Should be able to create Draft Post', () => {
    const title = 'Test Draft Post';
    cy.createPost({
      title,
      status: 'draft',
      content: 'Test Draft Content',
    });

    cy.visit('/wp-admin/edit.php?orderby=date&order=desc');
    cy.get('#the-list td.title')
      .first()
      .then($row => {
        cy.wrap($row).find('a.row-title').should('have.text', title);
        cy.wrap($row).find('span.post-state').should('have.text', 'Draft');
      });
  });

  it('Should be able to create Page', () => {
    const title = 'Test page';
    cy.createPost({
      title,
      content: 'page Content',
      postType: 'page',
    });

    cy.visit('/wp-admin/edit.php?post_type=page&orderby=date&order=desc');
    cy.get('#the-list td.title a.row-title').first().should('have.text', title);
  });

  it('Should be able to create Draft Page', () => {
    const title = 'Test Draft Page';
    cy.createPost({
      title,
      status: 'draft',
      content: 'Test Draft Content',
      postType: 'page',
    });

    cy.visit('/wp-admin/edit.php?post_type=page&orderby=date&order=desc');
    cy.get('#the-list td.title')
      .first()
      .then($row => {
        cy.wrap($row).find('a.row-title').should('have.text', title);
        cy.wrap($row).find('span.post-state').should('have.text', 'Draft');
      });
  });

  it('Should be able to use beforeSave hook', () => {
    const postTitle = 'Post ' + randomName();
    const postContent = 'Content ' + randomName();
    cy.createPost({
      title: postTitle,
      content: postContent,
      beforeSave: () => {
        cy.openDocumentSettingsPanel('Status & visibility');
        cy.get('label')
          .contains('Stick to the top of the blog')
          .click()
          .parent()
          .find('input[type="checkbox"]')
          .should('be.checked');
      },
    });

    cy.visit('/wp-admin/edit.php?post_type=post');
    cy.get('td.title')
      .contains(postTitle)
      .parent()
      .find('.post-state')
      .should('contain.text', 'Sticky');
  });

  it('Should be able to get published post details', () => {
    const postTitle = 'Post ' + randomName();
    const postContent = 'Content ' + randomName();
    cy.createPost({
      title: postTitle,
      content: postContent,
    }).then(post => {
      assert(post.title.raw === postTitle, 'Post title is the same');
      assert(
        post.content.rendered.includes(postContent),
        'Post content is the same'
      );
    });
  });
});
