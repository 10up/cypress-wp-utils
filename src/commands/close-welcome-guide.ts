/**
 * Close Welcome Guide
 *
 * @example
 * ```
 * cy.closeWelcomeGuide()
 * ```
 */
export const closeWelcomeGuide = (): void => {
  const titleInput = 'h1.editor-post-title__input, #post-title-0';
  const closeButtonSelector =
    'button[aria-label="Close dialog"], button[aria-label="Disable tips"]';

  // Wait for edit page to load
  cy.get(titleInput).should('exist');

  cy.get('body').then($body => {
    if ($body.find(closeButtonSelector).length > 0) {
      cy.get(closeButtonSelector).click();
    }
  });
};
