"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertBlock = void 0;
const get_iframe_1 = require("../functions/get-iframe");
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
    // Remove block patterns
    /* eslint-disable */
    let patterns = [];
    let settings = {};
    cy.window().then(win => {
        settings = win.wp.data.select('core/block-editor').getSettings();
        patterns = (settings === null || settings === void 0 ? void 0 : settings.__experimentalBlockPatterns) || [];
        if (patterns.length > 0) {
            settings.__experimentalBlockPatterns = [];
        }
    });
    cy.wait(500);
    /* eslint-enable */
    // Open blocks panel
    cy.get('.edit-post-header-toolbar__inserter-toggle, .edit-post-header-toolbar .block-editor-inserter__toggle').click();
    cy.get('.block-editor-inserter__search')
        .click()
        .type(search)
        .type('{enter}', { delay: 500 });
    // Insert the block
    cy.get(`.editor-block-list-item-${slug}, .editor-block-list-item-${slugAlt}`)
        .first()
        .click();
    // Close blocks panel
    cy.get('body').then($body => {
        if ($body.find('.edit-post-header-toolbar__inserter-toggle.is-pressed')
            .length > 0) {
            cy.get('.edit-post-header-toolbar__inserter-toggle.is-pressed').click();
        }
    });
    // Add patterns back
    if (patterns.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        settings.__experimentalBlockPatterns = patterns;
    }
    // Remove tailing suffix of sub-blocks
    const blockType = type.replace(/^(.*?)\/(.*?)\/[^/]+$/, '$1/$2');
    const blockTypeAlt = type.replace('/', '-');
    // Get last block of the current type
    // Pull from the iframe editor first, if it exists
    cy.get('body').then($body => {
        if ($body.find('iframe[name="editor-canvas"]').length) {
            (0, get_iframe_1.getIframe)('iframe[name="editor-canvas"]').then($iframe => {
                if ($iframe.find(`.wp-block[data-type="${blockType}"]`).length > 0) {
                    (0, get_iframe_1.getIframe)('iframe[name="editor-canvas"]')
                        .find(`.wp-block[data-type="${blockType}"]`)
                        .last()
                        .then(block => {
                        const id = block.prop('id');
                        cy.wrap(id);
                    });
                }
                else if ($iframe.find(`.wp-block[data-type="${blockTypeAlt}"]`).length) {
                    (0, get_iframe_1.getIframe)('iframe[name="editor-canvas"]')
                        .find(`.wp-block[data-type="${blockTypeAlt}"]`)
                        .last()
                        .then(block => {
                        const id = block.prop('id');
                        cy.wrap(id);
                    });
                }
            });
        }
        else {
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
        }
    });
};
exports.insertBlock = insertBlock;
