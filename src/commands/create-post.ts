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
  const welcomeGuide =
    '.edit-post-welcome-guide .components-modal__header button';

  // Make sure editor loaded properly.
  cy.get(titleInput).should('exist');

  // Close Welcome Guide.
  cy.get('body').then($body => {
    if ($body.find(welcomeGuide).length > 0) {
      cy.get(welcomeGuide).click();
      // WP 5.2
    } else if ($body.find('.nux-dot-tip__disable').length > 0) {
      cy.get('.nux-dot-tip__disable').click();
    }
  });

  // Fill out data.
  cy.get(titleInput).clear().type(title);
  cy.get(contentInput).click();
  cy.get('.block-editor-rich-text__editable').type(content);

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

    cy.get('.editor-post-publish-button').click();

    cy.get('.components-snackbar, .components-notice.is-success').should(
      'be.visible'
    );
  }
};
