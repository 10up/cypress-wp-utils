"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllTerms = void 0;
/**
 * Delete All Terms of a given taxonomy
 *
 * @param taxonomy - Taxonomy to empty
 *
 * @example
 * Delete all categories (note that Uncategorized term is protected)
 * ```
 * cy.deleteAllTerms()
 * ```
 *
 * @example
 * Delete all tags
 * ```
 * cy.deleteAllTerms('post_tag')
 * ```
 */
const deleteAllTerms = (taxonomy = 'category') => {
    cy.visit(`/wp-admin/edit-tags.php?taxonomy=${taxonomy}`);
    cy.get('body').then($body => {
        if ($body.find('#cb-select-all-1').length !== 0) {
            cy.get('#cb-select-all-1').click();
        }
        if ($body.find('#bulk-action-selector-top').length !== 0) {
            cy.get('#bulk-action-selector-top').select('delete');
            cy.get('#doaction').click();
            /**
             * Check if the result page contain any terms
             * available to delete by searching for individual
             * checkboxes and perform recursive call.
             *
             * The 'Uncategorized' item could not be deleted
             * and does not have the checkbox.
             */
            cy.get('body').then($updatedBody => {
                if ($updatedBody.find('#the-list input[type="checkbox"][name="delete_tags[]"]').length !== 0) {
                    (0, exports.deleteAllTerms)(taxonomy);
                }
            });
        }
    });
};
exports.deleteAllTerms = deleteAllTerms;
