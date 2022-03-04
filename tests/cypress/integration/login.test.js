describe('Command: login', () => {
  it('Login admin by default', () => {
    cy.login();
    cy.get('h1').should('contain', 'Dashboard');
  });
});
