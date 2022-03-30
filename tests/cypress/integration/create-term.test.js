describe('Command: createTerm', () => {
  beforeEach(() => {
    cy.login();
    cy.deleteAllTerms();
    cy.deleteAllTerms('post_tag');
  });

  it('Should be able to Create a category', () => {
    const termName = 'My category';
    cy.createTerm(termName);
    cy.get('body').then($body => {
      if ( $body.find('.notice').is(':visible') ) {
        cy.get('.notice').should('contain', 'Category added');
      }
    });
    cy.get('.row-title').first().should('have.text', termName);

  });

  it('Should be able to Create a tag', () => {
    const termName = 'My tag';
    cy.createTerm(termName, 'post_tag');
    cy.get('body').then($body => {
      if ( $body.find('.notice').is(':visible') ) {
        cy.get('.notice').should('contain', 'Tag added');
      }
    });
    cy.get('.row-title').first().should('have.text', termName);
  });

  it('Duplicate category should not be created', () => {
    const termName = 'My category';
    cy.createTerm(termName);
    cy.get('body').then($body => {
      if ( $body.find('.notice').is(':visible') ) {
        cy.get('.notice').should('contain', 'Category added');
      }
    });
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
    cy.get('body').then($body => {
      if ( $body.find('.notice').is(':visible') ) {
        cy.get('.notice').should('contain', 'Tag added');
      }
    });
    cy.get('.row-title').first().should('have.text', termName);

    cy.createTerm(termName, 'post_tag');
    cy.get('.error').should(
      'contain',
      'A term with the name provided already exists in this taxonomy'
    );
  });

  it('Should create categories with options', () => {
    const parentCategory = {
      name: 'Parent category',
      description: 'Parent description',
      slug: 'parent-slug',
    };

    cy.createTerm(parentCategory.name, 'category', {
      description: parentCategory.description,
      slug: parentCategory.slug,
    });

    // Assertions for parent category
    cy.get('body').then($body => {
      if ( $body.find('.notice').is(':visible') ) {
        cy.get('.notice').should('contain', 'Category added');
      }
    });

    cy.get('#the-list .row-title')
      .contains(parentCategory.name)
      .then($parentLink => {
        // Assertions of parent category
        const $parentRow = $parentLink.parents('tr');

        cy.wrap($parentRow)
          .get('.description')
          .should('contain', parentCategory.description);

        cy.wrap($parentRow).get('.slug').should('contain', parentCategory.slug);

        const parentId = $parentRow.find('input[name="delete_tags[]"]').val();

        cy.createTerm('Child by parent id', 'category', { parent: parentId });
        cy.wait(100);
        cy.get('#the-list .row-title')
          .contains('Child by parent id')
          .then($child => {
            cy.wrap($child.parents('tr'))
              .get('.name .parent')
              .should('contain', parentId.toString());
          });

        cy.createTerm('Child by parent name', 'category', {
          parent: parentCategory.name,
        });
        cy.wait(100);
        cy.get('#the-list .row-title')
          .contains('Child by parent name')
          .then($child => {
            cy.wrap($child.parents('tr'))
              .get('.name .parent')
              .should('contain', parentId.toString());
          });
      });
  });

  it('Should retrieve term data from the command', () => {
    const termName = 'Retrieval Category';
    const expectedSlug = 'retrieval-category';
    cy.createTerm(termName).then(term => {
      assert(term.name === termName, 'Term name is the same');
      assert(term.term_id > 0, 'Term ID should be greater than 0');
      assert(term.slug === expectedSlug, 'Should have correct term slug');
    });
  });
});
