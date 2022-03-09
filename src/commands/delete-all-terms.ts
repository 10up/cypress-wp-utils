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
  cy.get('#cb-select-all-1').click();

  cy.get('body').then($body => {
    if ($body.find('#bulk-action-selector-top').length !== 0) {
      cy.get('#bulk-action-selector-top').select('delete');
      cy.get('#doaction').click();

      cy.get('body').then($updatedBody => {
        if (
          $updatedBody.find(
            '#the-list input[type="checkbox"][name="delete_tags[]"]'
          ).length !== 0
        ) {
          deleteAllTerms(taxonomy);
        }
      });
    }
  });
};
