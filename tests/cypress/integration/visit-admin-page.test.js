describe('Command: visitAdminPage', () => {
  it('Can visit Homepage while logged in as admin', () => {
    cy.visitAdminPage('http://localhost:8889/');
    cy.get('#wpadminbar .display-name').should('contain', 'admin');
  });
  it('Can visit Dashboard', () => {
    cy.visitAdminPage();
    cy.get('h1').should('contain', 'Dashboard');
  });
  it('Can visit Reading Settings', () => {
    cy.visitAdminPage('options-reading.php');
    cy.get('h1').should('contain', 'Reading Settings');
  });
  it('Can visit self profile while logged in as author', () => {
    cy.visitAdminPage('profile.php', 'author', 'password');
    cy.get('#user_login').should('have.value', 'author');
  });
});
