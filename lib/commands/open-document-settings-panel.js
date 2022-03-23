"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openDocumentSettingsPanel = void 0;
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
const openDocumentSettingsPanel = (name, tab = 'Post') => {
    // Open Settings tab
    cy.openDocumentSettingsSidebar(tab);
    cy.get('.components-panel__body .components-panel__body-title button')
        .contains(name)
        .then($button => {
        // Find the panel container
        const $panel = $button.parents('.components-panel__body');
        // Only click the button if the panel is collapsed
        if (!$panel.hasClass('is-opened')) {
            cy.wrap($button).click();
            cy.wrap($button)
                .parents('.components-panel__body')
                .should('have.class', 'is-opened');
        }
    });
};
exports.openDocumentSettingsPanel = openDocumentSettingsPanel;
