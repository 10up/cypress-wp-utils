"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeWelcomeGuide = void 0;
/**
 * Close Welcome Guide
 *
 * @example
 * ```
 * cy.closeWelcomeGuide()
 * ```
 */
const closeWelcomeGuide = () => {
    const titleInput = 'h1.editor-post-title__input, #post-title-0';
    const closeButtonSelector = '.edit-post-welcome-guide .components-modal__header button';
    // Wait for edit page to load
    cy.getBlockEditor().find(titleInput).should('exist');
    cy.get('body').then($body => {
        if ($body.find(closeButtonSelector).length > 0) {
            cy.get(closeButtonSelector).click();
        }
    });
};
exports.closeWelcomeGuide = closeWelcomeGuide;
