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
    const $settingButtonIds = [
        'button[aria-expanded="false"][aria-label="Settings"]',
    ];
    const $tabSelectors = [
        `div[role="tablist"] button:contains("${tab}")`,
        `.edit-post-sidebar__panel-tabs button:contains("${tab}")`,
    ];
    // Open the sidebar in its own command so the tab lookup below runs against
    // the DOM as it is *after* the sidebar has been rendered. The tabs do not
    // exist while the sidebar is closed, so looking them up in the same callback
    // would always come up empty and leave the `selectedTab` alias unset.
    cy.get('body').then($body => {
        $settingButtonIds.forEach($settingButtonId => {
            if ($body.find($settingButtonId).length) {
                cy.get($settingButtonId).first().as('sidebarButton');
                cy.get('@sidebarButton').click();
            }
        });
    });
    cy.get('body').then($body => {
        $tabSelectors.forEach($tabSelector => {
            if ($body.find($tabSelector).length) {
                cy.get($tabSelector).first().as('selectedTab');
                cy.get('@selectedTab').click();
            }
        });
    });
};
exports.openDocumentSettingsSidebar = openDocumentSettingsSidebar;
