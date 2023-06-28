/* eslint-disable tsdoc/syntax */
/**
 * Check Sitemap Exists.
 *
 * @example
 * Use the command without any argument, sitemap.xml will be used:
 * ```
 * cy.checkSitemap()
 * ```
 *
 * @example
 * Use the command with custom sitemap path:
 * ```
 * cy.checkSitemap( '/alternative-sitemap.xml')
 * ```
 */

export const checkSitemap = (sitemap_url = '/sitemap.xml'): void => {
  cy.request(sitemap_url).then(response => {
    if (response.status === 200) {
      cy.log('Sitemap exists');
    } else {
      cy.log('Sitemap does not exist');
      // Send an alert to the team
      // You can use a messaging service like Slack or email to send an alert
      cy.task('sendAlert', 'Sitemap has disappeared');
    }
  });
};
