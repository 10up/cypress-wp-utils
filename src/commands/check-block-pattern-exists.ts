/**
 * Check Block Pattern Exists. Works only with WordPress >=5.5
 *
 * @example
 * ```
 * cy.checkBlockPatternExists()
 * ```
 */
export const checkBlockPatternExists = ({
  title,
  categoryValue = 'featured',
}: {
  title: string;
  categoryValue?: string;
}): void => {
  cy.visit('/wp-admin/post-new.php');

  // Close Welcome Guide.
  const welcomeGuide =
    '.edit-post-welcome-guide .components-modal__header button';
  cy.get('body').then($body => {
    if ($body.find(welcomeGuide).length > 0) {
      cy.get(welcomeGuide).click();
      // WP 5.2
    } else if ($body.find('.nux-dot-tip__disable').length > 0) {
      cy.get('.nux-dot-tip__disable').click();
    }
  });

  // Open inerter.
  const inserterWPOld =
    '.edit-post-header-toolbar .block-editor-inserter__toggle';
  const inserterWPNew = '.edit-post-header-toolbar__inserter-toggle';
  cy.get('body').then($body => {
    if ($body.find(inserterWPOld).length > 0) {
      cy.get(inserterWPOld).click({ force: true });
    } else {
      cy.get(inserterWPNew).click({ force: true });
    }
  });

  // Move to the "Patterns" tab.
  cy.get('.components-tab-panel__tabs button:nth-child(2)').click();

  // Select pattern category if dropdown available (in a few WP versions).
  cy.get('body').then($body => {
    if ($body.find('.components-select-control__input').length > 0) {
      cy.get('.components-select-control__input').select(categoryValue, {
        force: true,
      });
    }
  });

  // Check if block pattern exist, insert if exist.
  cy.get('.block-editor-inserter__panel-content [aria-label="' + title + '"]')
    .should('exist')
    .click();
};
