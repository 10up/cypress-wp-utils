/**
 * Open Document Settings Panel
 *
 * @param name - Panel name
 * @param tab - Settings tab
 *
 * @example
 * Open featured image panel of the Post editor
 * ```
 * cy.openDocumentSettingsPanel('Featured image')
 * ```
 *
 * @example
 * Open Permalink panel of the Page editor
 * ```
 * cy.openDocumentSettingsPanel('Permalink', 'Page')
 * ```
 */
export const openDocumentSettingsPanel = (name: string, tab = 'Post'): void => {
  cy.openDocumentSettingsSidebar(tab);
  cy.get('.components-panel__body .components-panel__body-title button')
    .contains(name)
    .then($button => {
      const $panel = $button.parents('.components-panel__body');
      if (!$panel.hasClass('is-opened')) {
        cy.wrap($button).click();
        cy.wrap($button)
          .parents('.components-panel__body')
          .should('have.class', 'is-opened');
      }
    });
};
