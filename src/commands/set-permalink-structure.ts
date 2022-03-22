/**
 * Set Permalink Structure
 *
 * @param type - Permalink structure, should contain structure tags if not empty string
 *
 * @example
 * ```
 * cy.setPermalinkStructure('/%year%/%postname%/')
 * ```
 */
export const setPermalinkStructure = (type = ''): void => {
  cy.visit('/wp-admin/options-permalink.php');
  cy.get('#permalink_structure').click().clear();
  if ('' !== type) {
    cy.get('#permalink_structure').click().type(type);
  }
  cy.get('#submit').click();
};
