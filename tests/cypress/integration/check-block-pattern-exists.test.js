describe('Command: checkBlockPatternExists', () => {
  before(() => {
    cy.login();
    cy.deactivatePlugin('classic-editor');
  });

  it('Should be able to Check Block Pattern Exists', () => {
    cy.checkBlockPatternExists({
      title: 'Three columns with offset images',
      categoryValue: 'gallery',
    });
  });
});
