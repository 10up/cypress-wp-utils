/**
 * Deactivate Plugin
 *
 * @param slug - Plugin name
 *
 * @example
 * Deactivate Classic Editor
 * ```
 * cy.deactivatePlugin('classic-editor')
 * ```
 */
export const deactivatePlugin = (slug: string): void => {
  cy.visit('/wp-admin/plugins.php');
  if ('' !== slug) {
    cy.get('body').then($body => {
      if ($body.find(`#deactivate-${slug}`).length > 0) {
        cy.get(`#deactivate-${slug}`).click();
      }
    });
  }
};
