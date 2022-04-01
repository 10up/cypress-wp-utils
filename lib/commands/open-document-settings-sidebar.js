"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openDocumentSettingsSidebar = void 0;
/**
 * Open Document Settings Sidebar
 *
 * @param tab - Name of the tab
 *
 * @example
 * Open 'Post' tab
 * ```
 * cy.openDocumentSettingsSidebar()
 * ```
 *
 * @example
 * Open 'Block' tab
 * ```
 * cy.openDocumentSettingsSidebar('Block')
 * ```
 */
const openDocumentSettingsSidebar = (tab = 'Post') => {
    // Open the sidebar if it is collapsed
    const button = '.edit-post-header__settings button[aria-label="Settings"][aria-expanded="false"]';
    cy.get('body').then($body => {
        if ($body.find(button).length > 0) {
            cy.get(button).click();
        }
    });
    // Click the tab
    cy.get('body').then($body => {
        let tabSelector = `.edit-post-sidebar__panel-tab[data-label="${tab}"]`;
        if ($body.find(tabSelector).length === 0) {
            // Tab name for WordPress 5.2 is "Document" regardless of the post type
            tabSelector = '.edit-post-sidebar__panel-tab[data-label="Document"]';
        }
        cy.get(tabSelector).click();
    });
};
exports.openDocumentSettingsSidebar = openDocumentSettingsSidebar;
