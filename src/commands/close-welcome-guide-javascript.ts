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
declare global {
  interface Window {
    wp: any;
  }
}

export const closeWelcomeGuideJavascript = (): void => {
  cy.window()
    .then(win => {
      /* eslint-disable */
      let elapsed = 0;
      console.log('hello');

      setInterval(function () {
        if (elapsed > 2500) {
          return;
        }

        const { wp } = win;

        const { isFeatureActive } = wp.data.select('core/edit-post');
        const { toggleFeature } = wp.data.dispatch('core/edit-post');
        const isWelcomeGuideActive = isFeatureActive('welcomeGuide');

        if (!!isWelcomeGuideActive) {
          toggleFeature('welcomeGuide');
          return;
        }

        elapsed += 100;
      }, 100);




      /* eslint-enable */
    })
};
