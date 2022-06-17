/**
 * Upload a media file
 *
 * @param file - file path.
 *
 * @returns Media ID with upload status. eg: `{ success: true, mediaId: 123}`,
 *          for failure `{ success: false, errorMessage: '"file" has failed to upload' }`
 *
 * @example
 * Upload a media file.
 * ```
 * cy.uploadMedia('tests/cypress/fixtures/image.png')
 * ```
 */
export const uploadMedia = (filePath: string): void => {
  cy.visit('/wp-admin/media-new.php');

  // wait for drag-drop area become active.
  cy.get('.drag-drop').should('exist');
  cy.get('#drag-drop-area').should('exist');

  // intercept media upload request.
  cy.intercept('POST', '**/async-upload.php').as('uploadMediaRequest');

  // Upload file.
  cy.get('#drag-drop-area').selectFile(filePath, { action: 'drag-drop' });

  // Wait for file upload complete.
  cy.wait('@uploadMediaRequest').then(response => {
    if (response.response?.body && !isNaN(response.response?.body)) {
      cy.wrap({
        success: true,
        mediaId: response.response?.body,
      });
    } else {
      let errorMessage = '';
      cy.get('.media-item .error-div.error').then(ele => {
        if (ele) {
          errorMessage = ele.text().replace('Dismiss', '');
        }
        cy.wrap({
          success: false,
          errorMessage,
        });
      });
    }
  });
};
