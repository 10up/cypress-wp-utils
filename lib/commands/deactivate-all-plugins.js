"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivateAllPlugins = void 0;
/**
 * Deactivate All Plugins
 *
 * @example
 * ```
 * cy.deactivateAllPlugins()
 * ```
 */
const deactivateAllPlugins = () => {
    cy.visit('/wp-admin/plugins.php');
    cy.get('#cb-select-all-1').click();
    cy.get('#bulk-action-selector-top').select('deactivate-selected');
    cy.get('#doaction').click();
};
exports.deactivateAllPlugins = deactivateAllPlugins;
