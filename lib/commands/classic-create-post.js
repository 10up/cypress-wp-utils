"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classicCreatePost = void 0;
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
const classicCreatePost = ({ postType = 'post', title = 'Test Post', content = 'Test content', status = 'publish', beforeSave, }) => {
    cy.visit(`/wp-admin/post-new.php?post_type=${postType}`);
    cy.get('#title').click().clear().type(title);
    cy.get('#content_ifr').then($iframe => {
        const doc = $iframe.contents().find('body#tinymce');
        cy.wrap(doc).find('p:last-child').type(content);
    });
    if ('undefined' !== typeof beforeSave) {
        beforeSave();
    }
    cy.intercept('POST', '/wp-admin/post.php', req => {
        req.alias = 'savePost';
    });
    if ('draft' === status) {
        cy.get('#save-post').should('not.have.class', 'disabled').click();
    }
    else {
        cy.get('#publish').should('not.have.class', 'disabled').click();
    }
    cy.wait('@savePost').then(response => {
        var _a;
        const body = new URLSearchParams((_a = response.request) === null || _a === void 0 ? void 0 : _a.body);
        const id = body.get('post_ID');
        cy.wrap(id);
    });
};
exports.classicCreatePost = classicCreatePost;
