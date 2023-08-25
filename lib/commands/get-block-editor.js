"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlockEditor = void 0;
const get_iframe_1 = require("../functions/get-iframe");
/**
 * Get the Block Editor
 *
 * @returns Block Editor element.
 *
 * @example
 * Find the title input and type in it
 * ```
 * cy.getBlockEditor().find('.editor-post-title__input').type('Test Post');
 * ```
 */
const getBlockEditor = () => {
    // Ensure the editor is loaded.
    cy.get('.edit-post-visual-editor').should('exist');
    return cy
        .get('body')
        .then($body => {
        if ($body.find('iframe[name="editor-canvas"]').length) {
            return (0, get_iframe_1.getIframe)('iframe[name="editor-canvas"]');
        }
        return $body;
    })
        .then(cy.wrap); // eslint-disable-line @typescript-eslint/unbound-method
};
exports.getBlockEditor = getBlockEditor;
