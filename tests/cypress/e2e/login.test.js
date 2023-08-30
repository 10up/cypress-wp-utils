describe('Command: login', () => {
  before(() => {
    cy.logout();
  });

  it('Login admin by default', () => {
    cy.login();
    cy.visit('/wp-admin');
    cy.get('h1').should('contain', 'Dashboard');
  });
});
