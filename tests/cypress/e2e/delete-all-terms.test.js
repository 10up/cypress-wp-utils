describe('Command: deleteAllTerms', () => {
  beforeEach(() => {
    cy.login();
  });

  after(() => {
    cy.login();
    // Restore default 20 items per page
    cy.visit(`/wp-admin/edit-tags.php?taxonomy=category`);
    cy.get('#show-settings-link').click();
    cy.get('input.screen-per-page').click().clear().type(20);
    cy.get('#screen-options-apply').click();

    cy.visit(`/wp-admin/edit-tags.php?taxonomy=post_tag`);
    cy.get('#show-settings-link').click();
    cy.get('input.screen-per-page').click().clear().type(20);
    cy.get('#screen-options-apply').click();
  });

  it('Should be able to Delete All Categories', () => {
    cy.createTerm('Term to delete');
    cy.createTerm('Term to delete 2');
    cy.deleteAllTerms();
    cy.get('.notice').should('contain', 'Categories deleted');
    cy.get('#the-list a.row-title').should('have.length', 1);
    cy.get('#the-list a.row-title')
      .first()
      .should('have.text', 'Uncategorized');
  });

  it('Should be able to delete paginated categories', () => {
    for (let index = 0; index < 10; index++) {
      cy.createTerm('Multi page category ' + index);
    }
    // Set 2 items per page
    cy.get('#show-settings-link').click();
    cy.get('input.screen-per-page').click().clear().type(2);
    cy.get('#screen-options-apply').click();

    cy.deleteAllTerms();
    cy.get('#the-list a.row-title').should('have.length', 1);
    cy.get('#the-list a.row-title')
      .first()
      .should('have.text', 'Uncategorized');
  });

  it('Should be able to Delete All Tags', () => {
    cy.createTerm('Tag to delete', 'post_tag');
    cy.createTerm('Tag to delete 2', 'post_tag');
    cy.deleteAllTerms('post_tag');
    cy.get('.notice').should('contain', 'Tags deleted');
    cy.get('#the-list a.row-title').should('have.length', 0);
  });

  it('Should be able to delete paginated tags', () => {
    for (let index = 0; index < 10; index++) {
      cy.createTerm('Multi page tag ' + index, 'post_tag');
    }
    // Set 2 items per page
    cy.get('#show-settings-link').click();
    cy.get('input.screen-per-page').click().clear().type(2);
    cy.get('#screen-options-apply').click();

    cy.deleteAllTerms('post_tag');
    cy.get('#the-list a.row-title').should('have.length', 0);
  });

  it('Should not fail if trying to delete empty tags list', () => {
    cy.deleteAllTerms('post_tag');

    cy.deleteAllTerms('post_tag');
  });
});
