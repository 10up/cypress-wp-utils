const { randomName } = require('../support/functions');

describe('Command: createTerm', () => {
  beforeEach(() => {
    cy.login();
    cy.deleteAllTerms();
    cy.deleteAllTerms('post_tag');
  });

  it('Should be able to Create a category', () => {
    const termName = 'Category ' + randomName();
    cy.createTerm(termName);
    cy.get('body').then($body => {
      if ($body.find('.notice').is(':visible')) {
        cy.get('.notice').should('contain', 'Category added');
      }
    });
    cy.get(`.row-title:contains("${termName}")`).should('exist');
  });

  it('Should be able to Create a tag', () => {
    const termName = 'Tag ' + randomName();
    cy.createTerm(termName, 'post_tag');
    cy.get('body').then($body => {
      if ($body.find('.notice').is(':visible')) {
        cy.get('.notice').should('contain', 'Tag added');
      }
    });
    cy.get(`.row-title:contains("${termName}")`).should('exist');
  });

  it('Duplicate category should not be created', () => {
    const termName = 'Category ' + randomName();
    cy.createTerm(termName);
    cy.get('body').then($body => {
      if ($body.find('.notice').is(':visible')) {
        cy.get('.notice').should('contain', 'Category added');
      }
    });
    cy.get(`.row-title:contains("${termName}")`).should('exist');

    cy.createTerm(termName);
    cy.get('.error').should(
      'contain',
      'A term with the name provided already exists with this parent'
    );
  });

  it('Duplicate tag should not be created', () => {
    const termName = 'Tag ' + randomName();
    cy.createTerm(termName, 'post_tag');
    cy.get('body').then($body => {
      if ($body.find('.notice').is(':visible')) {
        cy.get('.notice').should('contain', 'Tag added');
      }
    });
    cy.get(`.row-title:contains("${termName}")`).should('exist');

    cy.createTerm(termName, 'post_tag');
    cy.get('.error').should(
      'contain',
      'A term with the name provided already exists in this taxonomy'
    );
  });

  it('Should create categories with options', () => {
    const parentCategory = {
      name: 'Parent ' + randomName(),
      description: 'Description ' + randomName(),
      slug: 'parent-slug',
    };

    cy.createTerm(parentCategory.name, 'category', {
      description: parentCategory.description,
      slug: parentCategory.slug,
    });

    // Assertions for parent category
    cy.get('body').then($body => {
      if ($body.find('.notice').is(':visible')) {
        cy.get('.notice').should('contain', 'Category added');
      }
    });

    cy.get(`.row-title:contains("${parentCategory.name}")`).then(
      $parentLink => {
        // Assertions of parent category
        const $parentRow = $parentLink.parents('tr');

        cy.wrap($parentRow)
          .get('.description')
          .should('contain', parentCategory.description);

        cy.wrap($parentRow).get('.slug').should('contain', parentCategory.slug);

        const parentId = $parentRow.find('input[name="delete_tags[]"]').val();

        const childById = 'Child ' + randomName();
        cy.createTerm(childById, 'category', { parent: parentId });
        cy.get(`.row-title:contains("${childById}")`).then($child => {
          cy.wrap($child.parents('tr'))
            .get('.name .parent')
            .should('contain', parentId.toString());
        });

        const childByName = 'Child ' + randomName();
        cy.createTerm(childByName, 'category', {
          parent: parentCategory.name,
        });
        cy.get(`.row-title:contains("${childByName}")`).then($child => {
          cy.wrap($child.parents('tr'))
            .get('.name .parent')
            .should('contain', parentId.toString());
        });
      }
    );
  });

  it('Should retrieve term data from the command', () => {
    const randomSuffix = randomName();
    const termName = 'Category ' + randomSuffix;
    const expectedSlug = 'category-' + randomSuffix;
    cy.createTerm(termName).then(term => {
      assert(term.name === termName, 'Term name is the same');
      assert(term.term_id > 0, 'Term ID should be greater than 0');
      assert(term.slug === expectedSlug, 'Should have correct term slug');
    });
  });
});
