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
    cy.get(`#the-list tr[data-slug="${slug}"]`).then($pluginRow => {
      if ($pluginRow.find('.activate > a').length > 0) {
        cy.get(`#the-list tr[data-slug="${slug}"] .activate > a`)
          .should('have.text', 'Activate')
          .click();
      }
    });
  }
};
