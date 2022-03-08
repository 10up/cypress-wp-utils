describe('Command: createTerm', () => {
  beforeEach(() => {
    cy.logout();
    cy.login();
    cy.deleteAllTerms();
	cy.deleteAllTerms('post_tag');	
  });

  it('Should be able to Create a category', () => {
    const termName = 'My category';
    cy.createTerm(termName);
    cy.get('.notice').should('contain', 'Category added');
    cy.get('.row-title').first().should('have.text', termName);
  });

  it('Should be able to Create a tag', () => {
    const termName = 'My tag';
    cy.createTerm(termName, 'post_tag');
    cy.get('.notice').should('contain', 'Tag added');
    cy.get('.row-title').first().should('have.text', termName);
  });

  it('Duplicate category should not be created', () => {
    const termName = 'My category';
    cy.createTerm(termName);
    cy.get('.notice').should('contain', 'Category added');
    cy.get('.row-title').first().should('have.text', termName);

    cy.createTerm(termName);
    cy.get('.error').should(
      'contain',
      'A term with the name provided already exists with this parent'
    );
  });

  it('Duplicate tag should not be created', () => {
    const termName = 'My tag';
    cy.createTerm(termName, 'post_tag');
    cy.get('.notice').should('contain', 'Tag added');
    cy.get('.row-title').first().should('have.text', termName);

    cy.createTerm(termName, 'post_tag');
    cy.get('.error').should(
      'contain',
      'A term with the name provided already exists in this taxonomy'
    );
  });
});
