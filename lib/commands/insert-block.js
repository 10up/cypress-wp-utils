"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertBlock = void 0;
const assert_1 = require("assert");
/**
 * Inserts Block
 *
 * The resulting block id is yielded
 *
 * @param type - Block type
 * @param name - Block name (used to search)
 *
 * @example
 * ```
 * cy.insertBlock('core/heading').then(id => {
 *   cy.get(`#${id}`).click().type('A quick brown fox');
 * });
 * ```
 */
const insertBlock = (type, name) => {
    // replace first occurence only to keep sub-blocks work
    let slug = type.replace('/', '-');
    // Remove core blocks prefix
    slug = slug.replace(/^core-/, '');
    // old gutenberg selector
    const slugAlt = slug.replace(/\//, '-');
    // Escape "/" to allow selectors for sub-blocks
    slug = slug.replace(/\//, '\\/');
    let search;
    if (name) {
        search = name;
    }
    else {
        search = type.split('/').pop();
        if ('undefined' === typeof search) {
            search = type;
        }
    }
    // Open blocks panel
    cy.get('.edit-post-header-toolbar__inserter-toggle, .edit-post-header-toolbar .block-editor-inserter__toggle').click();
    cy.get('.block-editor-inserter__search').click().type(search);
    // Insert the block
    cy.get('body').then($body => {
        if ($body.find(`.editor-block-list-item-${slug}`).length > 0) {
            cy.get(`.editor-block-list-item-${slug}`).click();
        }
        else if ($body.find(`.editor-block-list-item-${slugAlt}`).length > 0) {
            cy.get(`.editor-block-list-item-${slugAlt}`).click();
        }
        else {
            (0, assert_1.fail)(`Could not find '${type}' block`);
        }
    });
    // Close blocks panel
    cy.get('body').then($body => {
        if ($body.find('.edit-post-header-toolbar__inserter-toggle.is-pressed')
            .length > 0) {
            cy.get('.edit-post-header-toolbar__inserter-toggle.is-pressed').click();
        }
    });
    // Remove tailing suffix of sub-blocks
    const blockType = type.replace(/^(.*?)\/(.*?)\/[^/]+$/, '$1/$2');
    const blockTypeAlt = type.replace('/', '-');
    // Get last block of the current type
    cy.get('body').then($body => {
        if ($body.find(`.wp-block[data-type="${blockType}"]`).length > 0) {
            cy.get(`.wp-block[data-type="${blockType}"]`)
                .last()
                .then(block => {
                const id = block.prop('id');
                cy.wrap(id);
            });
        }
        else if ($body.find(`.wp-block[data-type="${blockTypeAlt}"]`)) {
            cy.get(`.wp-block[data-type="${blockTypeAlt}"]`)
                .last()
                .then(block => {
                const id = block.prop('id');
                cy.wrap(id);
            });
        }
    });
};
exports.insertBlock = insertBlock;
