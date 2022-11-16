/**
 * Check Block Pattern Exists. Works only with WordPress \>=5.5
 *
 * \@param postData {
 *          `title` - Patttern name/title,
 *          `categoryValue` - Value of the pattern category,
 *        }
 *
 * @example
 * For WP v5.5
 * ```
 * cy.checkBlockPatternExists({
 *    title: 'Two buttons',
 * });
 * ```
 *
 * @example
 * For WP v5.9
 * ```
 * cy.checkBlockPatternExists({
 *    title: 'Three columns with offset images',
 *    categoryValue: 'gallery',
 * });
 * ```
 */
declare global {
    interface Window {
        wp: any;
    }
}
export declare const checkBlockPatternExists: ({ title, categoryValue, }: {
    title: string;
    categoryValue?: string | undefined;
}) => void;
