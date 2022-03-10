/**
 * Create a Term of a given taxonomy
 *
 * @param name - Term name
 * @param taxonomy - Taxonomy
 *
 * @example
 * Create new category with default name "Test category"
 * ```
 * cy.createTerm()
 * ```
 *
 * @example
 * Create new category with given name
 * ```
 * cy.createTerm('Category')
 * ```
 *
 * @example
 * Create new term in a product taxonomy
 * ```
 * cy.createTerm('Product name', 'product')
 * ```
 */
export const createTerm = (
  name = 'Test category',
  taxonomy = 'category'
): void => {
  cy.visit(`/wp-admin/edit-tags.php?taxonomy=${taxonomy}`);
  cy.get('#tag-name').click().type(`${name}{enter}`);
};
