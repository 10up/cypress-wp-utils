/* eslint-disable tsdoc/syntax */
/**
 * Check Sitemap Exists.
 *
 * ```
 * cy.checkSitemap();
 * ```
 */

export const checkSitemap = (): void => {
  cy.request('/sitemap.xml').then(response => {
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
