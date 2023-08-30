import { getIframe } from '../functions/get-iframe';

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
export const getBlockEditor = (): Cypress.Chainable<unknown> => {
  // Ensure the editor is loaded.
  cy.get('.edit-post-visual-editor').should('exist');

  return cy
    .get('body')
    .then($body => {
      if ($body.find('iframe[name="editor-canvas"]').length) {
        return getIframe('iframe[name="editor-canvas"]');
      }
      return $body;
    })
    .then(cy.wrap); // eslint-disable-line @typescript-eslint/unbound-method
};
