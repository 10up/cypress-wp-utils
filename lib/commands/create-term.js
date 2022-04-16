"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTerm = void 0;
/**
 * Create a Term of a given taxonomy
 *
 * @param name - Term name
 * @param taxonomy - Taxonomy
 * @param options {
 *          slug - Taxonomy slug
 *          parent - Parent taxonomy (ID or name)
 *          description - Taxonomy description
 * 			beforeSave - Callable function hook
 *        }
 *
 * @example
 * Create new category with default name "Test category"
 * ```
 * cy.createTerm()
 * ```
 *
 * @example
 * Create new category with given name
 * ```
 * cy.createTerm('Category')
 * ```
 *
 * @example
 * Create a category and use it's ID
 * ```
 * cy.createTerm('Category').then(term => {
 *   cy.log(term.term_id);
 * });
 * ```
 *
 * @example
 * Create new term in a product taxonomy
 * ```
 * cy.createTerm('Product name', 'product')
 * ```
 *
 * @example
 * Create child category for existing Parent with custom description and slug
 * ```
 * cy.createTerm('Child', 'category', {
 *   parent: 'Parent',
 *   slug: 'child-slug',
 *   description: 'Custom description'
 * })
 * ```
 */
const createTerm = (name = 'Test category', taxonomy = 'category', { slug = '', parent = -1, description = '', beforeSave, } = {}) => {
    cy.visit(`/wp-admin/edit-tags.php?taxonomy=${taxonomy}`);
    cy.intercept('POST', '/wp-admin/admin-ajax.php', req => {
        if ('string' === typeof req.body && req.body.includes('action=add-tag')) {
            req.alias = 'ajaxAddTag';
        }
    });
    cy.get('#tag-name').click().type(`${name}`);
    if (slug) {
        cy.get('#tag-slug').click().type(`${slug}`);
    }
    if (description) {
        cy.get('#tag-description').click().type(`${description}`);
    }
    if (parent !== -1) {
        cy.get('body').then($body => {
            if ($body.find('#parent').length !== 0) {
                cy.get('#parent').select(parent.toString());
            }
        });
    }
    if ('undefined' !== typeof beforeSave) {
        beforeSave();
    }
    cy.get('#submit').click();
    cy.wait('@ajaxAddTag').then(response => {
        var _a;
        // WordPress AJAX result for add tag is XML document, so we parse it with jQuery.
        const body = Cypress.$.parseXML((_a = response.response) === null || _a === void 0 ? void 0 : _a.body);
        // Find term data.
        const term_data = Cypress.$(body).find('response term supplemental > *');
        if (term_data.length === 0) {
            cy.wrap(false);
            return;
        }
        // Extract term data into the object.
        const term = term_data.toArray().reduce((map, el) => {
            const $el = Cypress.$(el);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            map[$el.prop('tagName')] = $el.text();
            return map;
        }, {});
        // Sanitize numeric values.
        ['term_id', 'count', 'parent', 'term_group', 'term_taxonomy_id'].forEach(index => {
            term[index] = parseInt(term[index]);
        });
        cy.wrap(term);
    });
};
exports.createTerm = createTerm;
