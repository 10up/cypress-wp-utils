describe('Command: checkBlockPatternExists', () => {
  before(() => {
    cy.login();
    cy.deactivatePlugin('classic-editor');
  });

  it('Should be able to Check Block Pattern Exists', () => {
    cy.checkBlockPatternExists({
      title: 'Quote',
      categoryValue: 'text',
    }).then(exists => {
      if (exists) {
        // The block patter exists!
      } else {
        // The block pattern does not exist!
      }
    });
  });
});
