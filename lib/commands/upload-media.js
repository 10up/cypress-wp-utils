"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMedia = void 0;
/**
 * Upload a media file
 *
 * @param filePath - A path to a file within the project root (Eg: 'tests/cypress/fixtures/10up.png').
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
const uploadMedia = (filePath) => {
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
        var _a, _b, _c;
        if (((_a = response.response) === null || _a === void 0 ? void 0 : _a.body) && !isNaN((_b = response.response) === null || _b === void 0 ? void 0 : _b.body)) {
            cy.wrap({
                success: true,
                mediaId: (_c = response.response) === null || _c === void 0 ? void 0 : _c.body,
            });
        }
        else {
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
exports.uploadMedia = uploadMedia;
