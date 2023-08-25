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
export declare const getBlockEditor: () => Cypress.Chainable<unknown>;
