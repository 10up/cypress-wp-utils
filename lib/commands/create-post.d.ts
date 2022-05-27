/**
 * Create a Post
 *
 * @param postData - Post data
 *
 * @returns Wraps post data object. See WP_REST_Posts_Controller::prepare_item_for_response
 *          for the reference of post object contents:
 *          https://github.com/WordPress/WordPress/blob/master/wp-includes/rest-api/endpoints/class-wp-rest-posts-controller.php
 *
 * @example
 * Create a Post and get ID
 * ```
 * cy.createPost({
 *   title: 'Test Post',
 *   content: 'Test Content'
 * }).then(post => {
 *   const id = post.id;
 * });
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
