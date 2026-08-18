/**
 * Delete All Terms of a given taxonomy
 *
 * @param taxonomy - Taxonomy to empty
 *
 * @example
 * Delete all categories (note that Uncategorized term is protected)
 * ```
 * cy.deleteAllTerms()
 * ```
 *
 * @example
 * Delete all tags
 * ```
 * cy.deleteAllTerms('post_tag')
 * ```
 */
export const deleteAllTerms = (taxonomy = 'category'): void => {
  cy.visit(`/wp-admin/edit-tags.php?taxonomy=${taxonomy}`);

  /**
   * Only attempt the bulk delete when there is at least one deletable term.
   *
   * WP 7.1 hides the bulk actions controls (`display: none`) while the list is
   * empty, so relying on the presence of `#bulk-action-selector-top` is not
   * enough - it exists in the DOM but cannot be interacted with.
   *
   * The 'Uncategorized' item could not be deleted and does not have a checkbox,
   * which makes the row checkboxes a reliable signal on every version.
   */
  const deletableTerms =
    '#the-list input[type="checkbox"][name="delete_tags[]"]';

  cy.get('body').then($body => {
    if ($body.find(deletableTerms).length !== 0) {
      cy.get('#cb-select-all-1').click();
      cy.get('#bulk-action-selector-top').select('delete');
      cy.get('#doaction').click();

      // Paginated lists need another pass to clear the remaining pages.
      cy.get('body').then($updatedBody => {
        if ($updatedBody.find(deletableTerms).length !== 0) {
          deleteAllTerms(taxonomy);
        }
      });
    }
  });
};
