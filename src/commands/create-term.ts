/**
 * Create a Term of a given taxonomy
 *
 * @param name - Term name
 * @param taxonomy - Taxonomy
 * @param options {
 *          slug - Taxonomy slug
 *          parent - Parent taxonomy (ID or name)
 *          description - Taxonomy description
 *        }
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
 *
 * @example
 * Create child category for existing Parent with custom description and slug
 * ```
 * cy.createTerm('Child', 'category', {
 *   parent: 'Parent',
 *   slug: 'child-slug',
 *   description: 'Custom description'
 * })
 * ```
 */
export const createTerm = (
  name = 'Test category',
  taxonomy = 'category',
  {
    slug = '',
    parent = -1,
    description = '',
  }: { slug?: string; parent?: number | string; description?: string } = {}
): void => {
  cy.visit(`/wp-admin/edit-tags.php?taxonomy=${taxonomy}`);
  cy.get('#tag-name').click().type(`${name}`);

  if (slug) {
    cy.get('#tag-slug').click().type(`${slug}`);
  }

  if (description) {
    cy.get('#tag-description').click().type(`${description}`);
  }

  cy.get('body').then($body => {
    if ($body.find('#parent').length !== 0) {
      cy.get('#parent').select(parent.toString());
    }
  });

  cy.get('#submit').click();
};
