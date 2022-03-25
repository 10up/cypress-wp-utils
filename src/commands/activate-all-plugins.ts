/**
 * Activate All Plugins
 *
 * @example
 * ```
 * cy.activateAllPlugins()
 * ```
 */
export const activateAllPlugins = (): void => {
  cy.visit('/wp-admin/plugins.php');
  cy.get('#cb-select-all-1').click();
  cy.get('#bulk-action-selector-top').select('activate-selected');
  cy.get('#doaction').click();
};
