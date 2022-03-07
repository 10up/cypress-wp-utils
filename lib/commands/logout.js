"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
/**
 * Logout
 *
 * @example
 * ```
 * cy.logout()
 * ```
 */
const logout = () => {
    cy.visit('/wp-admin');
    cy.get('body').then($body => {
        if ($body.find('#wpadminbar').length !== 0) {
            cy.get('#wp-admin-bar-my-account').invoke('addClass', 'hover');
            cy.get('#wp-admin-bar-logout > a').click();
        }
    });
};
exports.logout = logout;
