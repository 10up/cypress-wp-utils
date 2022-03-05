describe('Command: logout', () => {
  it('Logout logged int', () => {
    cy.login();
    cy.logout();
    cy.get('#login .message').should('contain', 'You are now logged out.');
  });

  it('Logout should not fail if not logged int', () => {
    cy.logout();
    cy.visit(`/`);
    cy.logout();
  });
});
