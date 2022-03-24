/**
 * Activate Plugin
 *
 * @param slug - Plugin slug
 *
 * @example
 * Activate Classic Editor plugin
 * ```
 * cy.activatePlugin('classic-editor')
 * ```
 */
export const activatePlugin = (slug: string): void => {
  cy.visit('/wp-admin/plugins.php');
  if ('' !== slug) {
    cy.get('body').then($body => {
      if ($body.find(`#activate-${slug}`).length > 0) {
        cy.get(`#activate-${slug}`).click();
      }
    });
  }
};
