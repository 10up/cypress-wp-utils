/**
 * Retrieves current plugin slug from the CYPRESS_WP_CURRENT_PLUGIN environment variable
 *
 * @example
 * ```
 * cy.getCurrentPlugin().then(slug => {
 *   console.log(slug);
 * })
 * ```
 */
export const getCurrentPlugin = () => {
  return cy.wrap(
    Cypress.env('WP_CURRENT_PLUGIN') ? Cypress.env('WP_CURRENT_PLUGIN') : ''
  );
};
