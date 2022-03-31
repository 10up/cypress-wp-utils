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
    const closeButtonSelector = 'button[aria-label="Close dialog"], button[aria-label="Disable tips"]';
    // Wait for edit page to load
    cy.get(titleInput).should('exist');
    cy.get('body').then($body => {
        if ($body.find(closeButtonSelector).length > 0) {
            cy.get(closeButtonSelector).click();
        }
    });
};
exports.closeWelcomeGuide = closeWelcomeGuide;
