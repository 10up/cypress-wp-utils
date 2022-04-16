/**
 * Create a Post
 *
 * @param postData {
 *          `postType` - Post type,
 *          `title` - Post Title,
 *          `content` - Post Content,
 *          `status` - Post Status,
 *          `beforeSave` - Callable function hook
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
 *
 * @example
 * Perform custom actions before saving the post
 * ```
 * cy.createPost({
 *   title: 'Post Title',
 *   beforeSave: () => {
 *     // Change additional metaboxes.
 *   }
 * })
 * ```
 */
export declare const createPost: ({ postType, title, content, status, beforeSave, }: {
    title: string;
    postType?: string | undefined;
    content?: string | undefined;
    status?: string | undefined;
    beforeSave?: CallableFunction | undefined;
}) => void;
