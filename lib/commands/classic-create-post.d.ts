import PostData from '../interface/post-data';
/**
 * Create Post in Classic Editor
 *
 * @param postData - Post data.
 *
 * @example
 * ```
 * cy.classicCreatePost({
 *   title: 'Post title',
 *   content: 'Post content',
 *   beforeSave: () => {
 *     // Do something before save.
 *   },
 *   postType: 'page',
 *   status: 'draft'
 * }).then(postID => {
 *   cy.log(postID);
 * })
 * ```
 */
export declare const classicCreatePost: ({ postType, title, content, status, beforeSave, }: PostData) => void;
