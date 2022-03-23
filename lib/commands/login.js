"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
/**
 * Log a user in to the WordPress dashboard.
 *
 * @param username - Username of the user
 * @param password - Password of the user
 *
 * @example
 * Use the command without any argument, the admin will be used:
 * ```
 * cy.login()
 * ```
 *
 * @example
 * Use the command with username and password:
 * ```
 * cy.login( 'customer', 'strongpassword')
 * ```
 */
const login = (username = 'admin', password = 'password') => {
    cy.visit('/wp-admin/');
    cy.get('body').then($body => {
        if ($body.find('#wpwrap').length == 0) {
            cy.get('input#user_login').clear();
            cy.get('input#user_login').click().type(username);
            cy.get('input#user_pass').type(`${password}{enter}`);
        }
    });
};
exports.login = login;
