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
    const [namespace = '', ...blockNameRest] = type.split('/');
    let blockNames = [
        blockNameRest.join('/').replace(/\//g, '-'),
        blockNameRest.join('/').replace(/\//g, String.raw `\/`),
    ];
    blockNames = blockNames.filter((x, i, a) => a.indexOf(x) == i);
    // let blockName = blockNameRest.join('/').replace( '/', '\\/' );
    let $inserterBtn = null;
    let search = '';
    if (typeof name === 'string' && name.length) {
        search = name;
    }
    else {
        search = type;
    }
    // Start of block inserter toggle button click logic.
    cy.get('body').then($body => {
        const selectors = [
            'button[aria-label="Add block"]', // 5.7
            'button[aria-label="Toggle block inserter"]', // 6.4
            'button[aria-label="Block Inserter"]', // 6.8
        ];
        selectors.forEach(selector => {
            if ($body.find(selector).length) {
                // Keep the element around rather than the chainable, so the inserter can
                // be closed again further down without replaying this command.
                cy.get(selector)
                    .first()
                    .then($button => {
                    $inserterBtn = $button;
                    cy.wrap($button).click();
                });
            }
        });
    });
    // End of block inserter toggle button click logic.
    // Start of Block tab click logic.
    cy.get('button[role="tab"]')
        .contains('Blocks')
        .then($tab => {
        if ($tab.length) {
            cy.wrap($tab).click();
        }
    });
    // End of Block tab click logic.
    // Start of Block search logic.
    cy.get('input[placeholder="Search"]').then($input => {
        if ($input.length) {
            cy.wrap($input).type(search);
        }
    });
    // End of Block search logic.
    const selectorsFor = (blockName) => [
        `.editor-block-list-item-${'core' === namespace ? '' : namespace + '-'}${blockName}`,
        `.editor-block-list-item-${'core' === namespace ? '' : namespace + '-'}${blockName}\\/${blockName}`, // Briefly in 6.9 for default variants.
    ];
    /*
     * The inserter renders its search results asynchronously, and searching also
     * kicks off a block directory request that re-renders the panel afterwards.
     * Reading the list synchronously therefore either finds nothing - silently
     * skipping the insertion - or hands back an element that is detached by the
     * time it gets clicked. Both have to be left to Cypress to retry.
     */
    const blockSelectors = [];
    blockNames.forEach(blockName => {
        blockSelectors.push(...selectorsFor(blockName));
    });
    // Start of Block insertion by click logic.
    // All of the candidate spellings are queried at once so that Cypress keeps
    // retrying - and re-queries the element if the panel re-renders and detaches
    // it - instead of reading the list once and moving on.
    cy.get(blockSelectors.join(',')).first().click();
    // Close the inserter again.
    cy.then(() => {
        if ($inserterBtn) {
            cy.wrap($inserterBtn).click();
        }
    });
    // End of Block insertion by click logic.
    const [ns, rest] = type.split('/'); // namespace = ns, second namespace or block name = rest
    cy.get('body').then($body => {
        if ($body.find('iframe[name="editor-canvas"]').length) {
            // Works with WP 6.4
            (0, get_iframe_1.getIframe)('iframe[name="editor-canvas"]').then($iframe => {
                const blockInIframe = $iframe.find(`.wp-block[data-type="${ns}/${rest}"]`);
                if (blockInIframe.length > 0) {
                    cy.wrap(blockInIframe.last().prop('id'));
                }
            });
        }
        else if ($body.find(`.wp-block[data-type="${ns}/${rest}"]`).length) {
            // Works with WP 5.7
            cy.get(`.wp-block[data-type="${ns}/${rest}"]`).then($blockInEditor => {
                expect($blockInEditor.length).to.equal(1);
                cy.wrap($blockInEditor.prop('id'));
            });
        }
        else {
            throw new Error(`${ns}/${rest} not found.`);
        }
    });
};
exports.insertBlock = insertBlock;
