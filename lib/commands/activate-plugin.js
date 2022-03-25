"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activatePlugin = void 0;
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
const activatePlugin = (slug) => {
    cy.visit('/wp-admin/plugins.php');
    cy.get(`#the-list tr[data-slug="${slug}"]`).then($pluginRow => {
        if ($pluginRow.find('.activate > a').length > 0) {
            cy.get(`#the-list tr[data-slug="${slug}"] .activate > a`)
                .should('have.text', 'Activate')
                .click();
        }
    });
};
exports.activatePlugin = activatePlugin;
