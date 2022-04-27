describe('Command: checkBlockPatternExists', () => {
  before(() => {
    cy.login();
    cy.deactivatePlugin('classic-editor');
  });

  // For WP v5.5
  it('Should be able to Check Block Pattern Exists', () => {
    cy.checkBlockPatternExists({
      title: 'Two buttons',
    });
  });

  // For WP v5.9
  it('Should be able to Check Block Pattern Exists', () => {
    cy.checkBlockPatternExists({
      title: 'Three columns with offset images',
      categoryValue: 'gallery',
    });
  });
});
