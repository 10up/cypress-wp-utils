/**
 * Deactivate All Plugins
 *
 * @example
 * ```
 * cy.deactivateAllPlugins()
 * ```
 */
export const deactivateAllPlugins = (): void => {
  cy.visit('/wp-admin/plugins.php');
  cy.get('#cb-select-all-1').click();
  cy.get('#bulk-action-selector-top').select('deactivate-selected');
  cy.get('#doaction').click();
};
