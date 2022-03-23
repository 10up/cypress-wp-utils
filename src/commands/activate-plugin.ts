/**
 * Activate Plugin
 *
 * @param slug - Plugin name. If empty string given, the current plugin name
 *               will be retrieved from CYPRESS_WP_CURRENT_PLUGIN environment
 *               variable
 *
 * @example
 * ```
 * cy.activatePlugin()
 * ```
 */
export const activatePlugin = (slug = ''): void => {
  cy.visit('/wp-admin/plugins.php');
  if ('' === slug) {
    // Try to retrieve current plugin from ENV.
    cy.getCurrentPlugin().then(current => {
      if ('string' === typeof current && '' !== current) {
        cy.get(`#activate-${current}`).click(); // eslint-disable-line @typescript-eslint/restrict-template-expressions
      }
    });
  } else {
    cy.get(`#activate-${slug}`).click();
  }
};
