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

  cy.window().then(win => {
    // @ts-ignore
    const { wp } = win;

    /* eslint-disable */
    const { getSettings } = wp.data.select('core/block-editor');
    const allRegisteredPatterns = getSettings().__experimentalBlockPatterns;

    for (let i = 0; i < allRegisteredPatterns.length; i++) {
      if (
        title === allRegisteredPatterns[i].title &&
        allRegisteredPatterns[i].categories &&
        allRegisteredPatterns[i].categories.includes(categoryValue)
      ) {
        cy.wrap(true);
        return;
      }
    }
    /* eslint-enable */
    cy.wrap(false);
  });
};
