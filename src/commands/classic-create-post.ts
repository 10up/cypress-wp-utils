/**
 * Classic Create Post
 *
 * @example
 * ```
 * cy.classicCreatePost()
 * ```
 */
export const classicCreatePost = ({
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
    cy.get('#save-post').click();
  } else {
    cy.get('#publish').click();
  }

  cy.wait('@savePost').then(response => {
    const body = new URLSearchParams(response.request?.body);
    const id = body.get('post_ID');
    cy.wrap(id);
  });
};
