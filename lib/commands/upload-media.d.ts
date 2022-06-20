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
export declare const uploadMedia: (filePath: string) => void;
