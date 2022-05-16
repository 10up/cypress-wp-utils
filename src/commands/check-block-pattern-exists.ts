/* eslint-disable tsdoc/syntax */
/**
 * Check Block Pattern Exists. Works only with WordPress \>=5.5
 *
 * \@param postData {
 *          `title` - Patttern name/title,
 *          `categoryValue` - Value of the pattern category,
 *        }
 *
 * @example
 * For WP v5.5
 * ```
 * cy.checkBlockPatternExists({
 *    title: 'Two buttons',
 * });
 * ```
 *
 * @example
 * For WP v5.9
 * ```
 * cy.checkBlockPatternExists({
 *    title: 'Three columns with offset images',
 *    categoryValue: 'gallery',
 * });
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
  cy.closeWelcomeGuide();

  // Open inserter.
  const inserterWPOld =
    '.edit-post-header-toolbar .block-editor-inserter__toggle';
  const inserterWPNew = '.edit-post-header-toolbar__inserter-toggle';
  cy.get('body').then($body => {
    if ($body.find(inserterWPOld).length > 0) {
      cy.get(inserterWPOld).click();
    } else {
      cy.get(inserterWPNew).click();
    }
  });

  // Move to the "Patterns" tab. This will skip further test for lower WP versions.
  cy.get('body').then($body => {
    if (
      $body.find('.components-tab-panel__tabs button:nth-child(2)').length > 0
    ) {
      cy.get('.components-tab-panel__tabs button:nth-child(2)').click();
    }
  });

  // Select pattern category if dropdown available.
  cy.get('body').then($body => {
    if ($body.find('.components-select-control__input').length > 0) {
      console.log(categoryValue);
      cy.get('.components-select-control__input').select(categoryValue);
    }
  });

  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(10000);

  // Check if block pattern exist.
  cy.get('body').then($body => {
    if (
      $body.find(
        '.block-editor-inserter__panel-content [aria-label="' + title + '"]'
      ).length > 0
    ) {
      // Check if block pattern exist, insert if exist.
      cy.wrap(
        '.block-editor-inserter__panel-content [aria-label="' + title + '"]'
      );
      return;
    }
    cy.wrap(false);
  });
};
