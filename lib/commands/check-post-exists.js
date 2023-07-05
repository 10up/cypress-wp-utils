"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPostExists = void 0;
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
const checkPostExists = ({ title, postType = 'post', }) => {
    cy.visit(`/wp-admin/edit.php?post_type=${postType}`);
    cy.get('#posts-filter').then($postsFilter => {
        // If there are no posts, bail early.
        if ($postsFilter.find('.no-items').length > 0) {
            cy.wrap(false);
        }
        else {
            const searchInput = '#post-search-input';
            const searchSubmit = '#search-submit';
            const postLabel = '[aria-label="Move “' + title + '” to the Trash"]';
            // Search for the post title.
            cy.get(searchInput).clear().type(title).get(searchSubmit).click();
            // See if the post is listed in the search result.
            cy.get('body').then($body => {
                if ($body.find(postLabel).length > 0) {
                    cy.wrap(true);
                }
                else {
                    cy.wrap(false);
                }
            });
        }
    });
};
exports.checkPostExists = checkPostExists;
