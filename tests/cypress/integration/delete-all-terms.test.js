describe('Command: deleteAllTerms', () => {
  beforeEach(() => {
    cy.logout();
    cy.login();
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

  it('Should be able to Delete All Tags', () => {
    cy.createTerm('Tag to delete', 'post_tag');
    cy.createTerm('Tag to delete 2', 'post_tag');
    cy.deleteAllTerms('post_tag');
    cy.get('.notice').should('contain', 'Tags deleted');
    cy.get('#the-list a.row-title').should('have.length', 0);
  });
});
