/**
 * Deactivate Plugin
 *
 * @param slug - Plugin name. If empty string given, the current plugin name
 *               will be retrieved from CYPRESS_WP_CURRENT_PLUGIN environment
 *               variable
 *
 * @example
 * Deactivate currently tested plugin
 * ```
 * cy.deactivatePlugin()
 * ```
 *
 * @example
 * Deactivate Classic Editor
 * ```
 * cy.deactivatePlugin('classic-editor')
 * ```
 */
export const deactivatePlugin = (slug = ''): void => {
  cy.visit('/wp-admin/plugins.php');
  if ('' === slug) {
    // Try to retrieve current plugin from ENV.
    cy.getCurrentPlugin().then(current => {
      if ('string' === typeof current && '' !== current) {
        cy.get('body').then($body => {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          if ($body.find(`#deactivate-${current}`).length > 0) {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            cy.get(`#deactivate-${current}`).click();
          }
        });
      }
    });
  } else {
    cy.get('body').then($body => {
      if ($body.find(`#deactivate-${slug}`).length > 0) {
        cy.get(`#deactivate-${slug}`).click();
      }
    });
  }
};
