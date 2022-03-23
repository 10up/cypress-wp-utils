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
export declare const createTerm: (name?: string, taxonomy?: string, { slug, parent, description, }?: {
    slug?: string | undefined;
    parent?: string | number | undefined;
    description?: string | undefined;
}) => void;
