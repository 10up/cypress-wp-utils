"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activateAllPlugins = void 0;
/**
 * Activate All Plugins
 *
 * @example
 * ```
 * cy.activateAllPlugins()
 * ```
 */
const activateAllPlugins = () => {
    cy.visit('/wp-admin/plugins.php');
    cy.get('#cb-select-all-1').click();
    cy.get('#bulk-action-selector-top').select('activate-selected');
    cy.get('#doaction').click();
};
exports.activateAllPlugins = activateAllPlugins;
