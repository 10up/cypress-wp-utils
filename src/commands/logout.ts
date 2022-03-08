/**
 * Logout
 *
 * @example
 * ```
 * cy.logout()
 * ```
 */
export const logout = (): void => {
  cy.visit('/wp-admin');
  cy.get('body').then($body => {
    if ($body.find('#wpadminbar').length !== 0) {
      cy.get('#wp-admin-bar-my-account').invoke('addClass', 'hover');
      cy.get('#wp-admin-bar-logout > a').click();
    }
  });
};
