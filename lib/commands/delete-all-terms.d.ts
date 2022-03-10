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
export declare const deleteAllTerms: (taxonomy?: string) => void;
