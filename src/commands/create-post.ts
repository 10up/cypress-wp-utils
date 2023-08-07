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
export const createPost = ({
  postType = 'post',
  title = 'Test Post',
  content = 'Test content',
  status = 'publish',
  beforeSave,
}: {
  title: string;
  postType?: string;
  content?: string;
  status?: string;
  beforeSave?: CallableFunction;
}): void => {
  cy.visit(`/wp-admin/post-new.php?post_type=${postType}`);

  const titleInput = 'h1.editor-post-title__input, #post-title-0';
  const contentInput = '.block-editor-default-block-appender__content';

  // Make sure editor loaded properly.
  cy.get(contentInput).should('exist');

  // Close Welcome Guide.
  cy.closeWelcomeGuide();

  // Fill out data.
  if (title.length > 0) {
    cy.get(titleInput).clear().type(title);
  }

  if (content.length > 0) {
    cy.get(contentInput).click();
    cy.get('.block-editor-rich-text__editable').first().type(content);
  }

  if ('undefined' !== typeof beforeSave) {
    beforeSave();
  }

  // Save/Publish Post.
  if (status === 'draft') {
    cy.get('.editor-post-save-draft').click();
    cy.get('.editor-post-saved-state').should('have.text', 'Saved');
  } else {
    cy.get('.editor-post-publish-panel__toggle').should('be.enabled');
    cy.get('.editor-post-publish-panel__toggle').click();

    cy.intercept({ method: 'POST' }, req => {
      const body: {
        status: string;
        title: string;
      } = req.body;
      if (body.status === 'publish' && body.title === title) {
        req.alias = 'publishPost';
      }
    });

    cy.get('.editor-post-publish-button').click();

    cy.get('.components-snackbar, .components-notice.is-success').should(
      'be.visible'
    );

    cy.wait('@publishPost').then(response => {
      cy.wrap(response.response?.body);
    });
  }
};
