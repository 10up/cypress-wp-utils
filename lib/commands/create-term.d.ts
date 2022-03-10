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
export declare const createTerm: (name?: string, taxonomy?: string) => void;
