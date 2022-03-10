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
    cy.visit('wp-login.php');
    cy.get('input#user_login').click().clear().type(username);
    cy.get('input#user_pass').click().clear().type(`${password}{enter}`);
};
exports.login = login;
