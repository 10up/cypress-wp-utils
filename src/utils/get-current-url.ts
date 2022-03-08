/**
 * Get the current URL.
 * @returns The current URL or an empty string if failed.
 */
export const getCurrentUrl = (): string => {
  let currentUrl = '';
  cy.url().then(url => {
    currentUrl = url;
  });
  return currentUrl;
};
