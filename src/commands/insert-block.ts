/**
 * Inserts Block
 *
 * The resulting block id is yielded
 *
 * @param type - Block type
 *
 * @example
 * ```
 * cy.insertBlock('core/heading').then(id => {
 *   cy.get(`#${id}`).click().type('A quick brown fox');
 * });
 * ```
 */
export const insertBlock = (type: string): void => {
  // replace first occurence only to keep sub-blocks work
  let slug = type.replace('/', '-');

  // Remove core blocks prefix
  slug = slug.replace(/^core-/, '');

  // Escape "/" to allow selectors for sub-blocks
  slug = slug.replace(/\//, '\\/');

  // Open blocks panel
  cy.get('.edit-post-header-toolbar__inserter-toggle').click();

  // Insert the block
  cy.get(`.editor-block-list-item-${slug}`).click();

  // Close blocks panel
  cy.get('.edit-post-header-toolbar__inserter-toggle.is-pressed').click();

  // Remove tailing suffix of sub-blocks
  type = type.replace(/^(.*?)\/(.*?)\/[^/]+$/, '$1/$2');

  // Get last block of the current type
  cy.get(`.wp-block[data-type="${type}"]`)
    .last()
    .then(block => {
      const id = block.prop('id');
      cy.wrap(id);
    });
};
