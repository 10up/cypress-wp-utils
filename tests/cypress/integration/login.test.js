describe('Command: login', () => {
  before(() => {
    cy.logout();
  });

  it('Login admin by default', () => {
    cy.login();
    cy.get('h1').should('contain', 'Dashboard');
  });
});
