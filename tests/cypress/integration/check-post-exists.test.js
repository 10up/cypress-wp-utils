describe('Command: checkPostExists', () => {
  before(() => {
    cy.login();
  });

  it('Should be able to Check if Post Exists', () => {
    cy.checkPostExists({
      title: 'Hello world!',
    });
  });

  it('Should be able to Check if Page Exists', () => {
    cy.checkPostExists({
      title: 'Sample Page',
      postType: 'page',
    });
  });
});
