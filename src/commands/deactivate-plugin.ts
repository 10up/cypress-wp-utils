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
  cy.get(`#the-list tr[data-slug="${slug}"]`).then($pluginRow => {
    if ($pluginRow.find('.deactivate > a').length > 0) {
      cy.get(`#the-list tr[data-slug="${slug}"] .deactivate > a`)
        .should('have.text', 'Deactivate')
        .click();
    }
  });
};
