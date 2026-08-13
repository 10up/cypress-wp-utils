import { getIframe } from '../functions/get-iframe';

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
export const insertBlock = (
  type: string,
  name?: string
): Cypress.Chainable<string> => {
  const [namespace = '', ...blockNameRest] = type.split('/');
  const blockNames = [
    blockNameRest.join('/').replace(/\//g, '-'),
    blockNameRest.join('/').replace(/\//g, String.raw`\/`),
  ].filter((x, i, a) => a.indexOf(x) === i);

  const search =
    typeof name === 'string' && name.length
      ? name
      : typeof type === 'string'
      ? type
      : '';

  const insertedType = `${namespace}/${blockNameRest[0] || ''}`;
  const insertedTypeSelector = `.wp-block[data-type="${insertedType}"], .wp-block[data-type="${type}"]`;
  const inserterSelectors = [
    'button[aria-label="Add block"]', // 5.7
    'button[aria-label="Toggle block inserter"]', // 6.4
    'button[aria-label="Block Inserter"]', // 6.8
  ];
  const searchInputSelector =
    'input[placeholder="Search"], input[aria-label="Search"], input[aria-label="Search for blocks and patterns"]';

  const resolveBlockId = ($block: JQuery<HTMLElement>): string => {
    const existingId = String($block.prop('id') || $block.attr('id') || '');
    if (existingId.length) {
      return existingId;
    }

    const dataBlock = String($block.attr('data-block') || '');
    if (!dataBlock.length) {
      throw new Error(`Unable to resolve block id for ${type}.`);
    }

    const generatedId = `block-${dataBlock}`;
    $block.attr('id', generatedId);

    return generatedId;
  };

  return cy.get('body').then($body => {
    const inserterSelector = inserterSelectors.find(
      selector => $body.find(selector).length > 0
    );

    if (!inserterSelector) {
      throw new Error('Block inserter toggle button not found.');
    }

    cy.get(inserterSelector).first().as('inserterBtn').click({ force: true });

    cy.get('body').then($openBody => {
      const blocksTab = $openBody
        .find('button[role="tab"]')
        .filter((_, el) => (el.textContent || '').trim() === 'Blocks');

      if (blocksTab.length) {
        cy.wrap(blocksTab.first()).click({ force: true });
      }
    });

    cy.get('body').then($openBody => {
      if ($openBody.find(searchInputSelector).length) {
        cy.get(searchInputSelector).first().clear();
        cy.get(searchInputSelector).first().type(search);
      }
    });

    return cy.get('body').then($openBody => {
      const blockSelectors = [
        `[data-type="${type}"]`,
        ...blockNames.map(
          blockName =>
            `.editor-block-list-item-${
              'core' === namespace ? '' : `${namespace}-`
            }${blockName}`
        ),
      ];
      const blockSelector = blockSelectors.find(
        selector => $openBody.find(selector).length > 0
      );

      if (!blockSelector) {
        throw new Error(`Block ${type} not found in inserter.`);
      }

      cy.get(blockSelector).first().click({ force: true });
      cy.get('@inserterBtn').click({ force: true });

      return cy.get('body').then($editorBody => {
        if ($editorBody.find('iframe[name="editor-canvas"]').length) {
          // WP >= 6.4 can render blocks in the editor-canvas iframe.
          return getIframe('iframe[name="editor-canvas"]').then($iframe => {
            const blockInIframe = $iframe.find(insertedTypeSelector).last();
            if (!blockInIframe.length) {
              throw new Error(`${insertedType} not found in iframe.`);
            }

            return cy.wrap(resolveBlockId(blockInIframe));
          });
        }

        return cy
          .get(insertedTypeSelector)
          .last()
          .then($blockInEditor => {
            if (!$blockInEditor.length) {
              throw new Error(`${insertedType} not found.`);
            }

            return cy.wrap(resolveBlockId($blockInEditor));
          });
      });
    });
  });
};
