"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openDocumentSettingsPanel = void 0;
const capitalize_1 = require("../functions/capitalize");
const uc_first_1 = require("../functions/uc-first");
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
    // WordPress prior to 5.4 is using upper-case-words for panel names
    // WordPress 5.3 and below: "Status & Visibility"
    // WordPress 5.4 and after: "Status & visibility"
    const ucFirstName = (0, uc_first_1.ucFirst)(name);
    const ucWordsName = (0, capitalize_1.capitalize)(name);
    const panelButtonSelector = `.components-panel__body .components-panel__body-title button:contains("${ucWordsName}"),.components-panel__body .components-panel__body-title button:contains("${ucFirstName}")`;
    cy.get(panelButtonSelector).then($button => {
        // Find the panel container
        const $panel = $button.parents('.components-panel__body');
        // Only click the button if the panel is collapsed
        if (!$panel.hasClass('is-opened')) {
            cy.wrap($button)
                .click()
                .parents('.components-panel__body')
                .should('have.class', 'is-opened');
        }
    });
};
exports.openDocumentSettingsPanel = openDocumentSettingsPanel;
