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
        cy.get('body').then($body => {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          if ($body.find(`#activate-${current}`).length > 0) {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            cy.get(`#activate-${current}`).click();
          }
        });
      }
    });
  } else {
    cy.get('body').then($body => {
      if ($body.find(`#activate-${slug}`).length > 0) {
        cy.get(`#activate-${slug}`).click();
      }
    });
  }
};
