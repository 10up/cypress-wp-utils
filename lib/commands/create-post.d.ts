/**
 * Create a Post
 *
 * @param postData {
 *          `postType` - Post type,
 *          `title` - Post Title,
 *          `content` - Post Content,
 *          `status` - Post Status
 *        }
 *
 * @example
 * Create a Post
 * ```
 * cy.createPost({
 *   title: 'Test Post',
 *   content: 'Test Content'
 * })
 * ```
 *
 * @example
 * Create a Post with draft status.
 * ```
 * cy.createPost({
 *   title: 'Test Post',
 *   content: 'Test Content',
 *   status: 'draft'
 * })
 * ```
 *
 * @example
 * Create a Page
 * ```
 * cy.createPost({
 *   postType: 'page'
 *   title: 'Test page',
 *   content: 'Page Content'
 * })
 * ```
 */
export declare const createPost: ({ postType, title, content, status, }: {
    title: string;
    postType?: string | undefined;
    content?: string | undefined;
    status?: string | undefined;
}) => void;
