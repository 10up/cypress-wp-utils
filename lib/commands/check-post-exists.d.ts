/**
 * Check Post Exists
 *
 * @param postData {
 *          `title` - Post Title,
 *          `postType` - Post type,
 *        }
 *
 * @example
 * Check for the `post`, without spefifying second parameer.
 * ```
 * cy.checkPostExists({
 *    title: 'Hello world!',
 * })
 * ```
 *
 * @example
 * Check for the `page`.
 * ```
 * cy.checkPostExists({
 *    title: 'Sample Page',
 *    postType: 'page',
 * })
 * ```
 */
export declare const checkPostExists: ({ title, postType, }: {
    title: string;
    postType?: string | undefined;
}) => void;
