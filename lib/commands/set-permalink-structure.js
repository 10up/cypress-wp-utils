"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPermalinkStructure = void 0;
/**
 * Set Permalink Structure
 *
 * @param type - Permalink structure, should contain structure tags or be an empty string (which means "Plain" structure)
 *
 * @example
 * ```
 * cy.setPermalinkStructure('/%year%/%postname%/')
 * ```
 */
const setPermalinkStructure = (type) => {
    cy.visit('/wp-admin/options-permalink.php');
    cy.get('#permalink_structure').click().clear();
    if ('' !== type) {
        cy.get('#permalink_structure').click().type(type);
    }
    cy.get('#submit').click();
};
exports.setPermalinkStructure = setPermalinkStructure;
