const { randomName } = require('../support/functions');

describe('Command: classicCreatePost', () => {
  before(() => {
    cy.login();
    cy.activatePlugin('classic-editor');
  });

  it('Should be able to Classic Create Post', () => {
    const title = 'Title ' + randomName();
    const content = 'Content ' + randomName();
    cy.classicCreatePost({
      title: title,
      content: content,
    });

    cy.get('.notice-success').should('contain.text', 'Post published');
    cy.get('#title').should('have.value', title);
    cy.get('#content_ifr').then($iframe => {
      const doc = $iframe.contents().find('body#tinymce');
      cy.wrap(doc).should('contain.text', content);
    });
  });

  it('Should wrap post ID', () => {
    const title = 'Title ' + randomName();
    const content = 'Content ' + randomName();
    cy.classicCreatePost({
      title: title,
      content: content,
    }).then(id => {
      cy.visit(`/wp-admin/post.php?post=${id}&action=edit`);
      cy.get('#title').should('have.value', title);
    });
  });

  it('Should perform beforeSave', () => {
    const title = 'Title ' + randomName();
    const content = 'Content ' + randomName();
    const additional = 'Content ' + randomName();
    cy.classicCreatePost({
      title: title,
      content: content,
      beforeSave: () => {
        cy.get('#content_ifr').then($iframe => {
          const doc = $iframe.contents().find('body#tinymce');
          cy.wrap(doc)
            .find('p:last-child')
            .type('{enter}' + additional);
        });
      },
    });

    cy.get('.notice-success').should('contain.text', 'Post published');
    cy.get('#title').should('have.value', title);
    cy.get('#content_ifr').then($iframe => {
      const doc = $iframe.contents().find('body#tinymce');
      cy.wrap(doc)
        .should('contain.text', content)
        .should('contain.text', additional);
    });
  });

  it('Should save draft', () => {
    const title = 'Title ' + randomName();
    const content = 'Content ' + randomName();
    cy.classicCreatePost({
      title: title,
      content: content,
      status: 'draft',
    });

    cy.get('.notice-success').should('contain.text', 'Post draft updated');
  });

  it('Should be able to create page', () => {
    const title = 'Title ' + randomName();
    const content = 'Content ' + randomName();
    cy.classicCreatePost({
      title: title,
      content: content,
      postType: 'page',
    });

    cy.get('.notice-success').should('contain.text', 'Page published');
  });
});
