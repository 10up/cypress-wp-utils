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
export const openDocumentSettingsSidebar = (tab = 'Post'): void => {
  // Open the sidebar if it is collapsed
  const button =
    '.edit-post-header__settings button[aria-label="Settings"][aria-expanded="false"]';
  cy.get('body').then($body => {
    if ($body.find(button).length > 0) {
      cy.get(button).click();
    }
  });

  // Click the tab
  cy.get('.edit-post-sidebar__panel-tab').contains(tab).click();
};
