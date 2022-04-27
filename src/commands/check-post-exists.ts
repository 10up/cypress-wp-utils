/**
 * Check Post Exists
 *
 * @example
 * ```
 * cy.checkPostExists()
 * ```
 */
export const checkPostExists = ({
  title,
  postType = 'post',
}: {
  title: string;
  postType?: string;
}): void => {
  cy.visit(`/wp-admin/edit.php?post_type=${postType}`);

  const searchInput = '#post-search-input';
  const searchSubmit = '#search-submit';
  const postLabel = '[aria-label="Move “' + title + '” to the Trash"]';

  // Search for the post title.
  cy.get(searchInput).clear().type(title).get(searchSubmit).click();

  // See if the post is listed in the search result.
  cy.get(postLabel).should('exist');
};
