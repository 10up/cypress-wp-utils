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
  let blockNames = [
    blockNameRest.join('/').replace(/\//g, '-'),
    blockNameRest.join('/').replace(/\//g, String.raw`\/`),
  ];

  blockNames = blockNames.filter((x, i, a) => a.indexOf(x) === i);

  let inserterBtnSelector = '';
  let insertedBlockId = '';

  const search =
    typeof name === 'string' && name.length
      ? name
      : typeof type === 'string'
      ? type
      : '';

  const inserterSelectors = [
    'button[aria-label="Add block"]', // 5.7
    'button[aria-label="Toggle block inserter"]', // 6.4
    'button[aria-label="Block Inserter"]', // 6.8
  ];
  const searchInputSelector =
    'input[placeholder="Search"], input[aria-label="Search"], input[aria-label="Search for blocks and patterns"]';

  const resolveBlockId = (
    $block: JQuery<HTMLElement>,
    blockType: string
  ): string => {
    const existingId = String($block.prop('id') || $block.attr('id') || '');
    if (existingId.length) {
      return existingId;
    }

    const dataBlock = String($block.attr('data-block') || '');
    const generatedId = dataBlock.length
      ? `block-${dataBlock}`
      : `cypress-${blockType.replace(/\//g, '-')}-${Date.now()}-${Math.floor(
          Math.random() * 10000
        )}`;
    $block.attr('id', generatedId);

    return generatedId;
  };

  cy.get('body').then($body => {
    inserterSelectors.forEach(selector => {
      if ($body.find(selector).length) {
        cy.get(selector).then($button => {
          if ($button.length) {
            inserterBtnSelector = selector;
            cy.get(selector).first().click();
          }
        });
      }
    });
  });

  cy.get('button[role="tab"]')
    .contains('Blocks')
    .then($tab => {
      if ($tab.length) {
        cy.wrap($tab).click();
      }
    });

  cy.get('body').then($body => {
    if ($body.find(searchInputSelector).length) {
      cy.get(searchInputSelector).first().clear();
      cy.get(searchInputSelector).first().type(search);
    }
  });

  blockNames.forEach(blockName => {
    const blockSelector = `.editor-block-list-item-${
      'core' === namespace ? '' : namespace + '-'
    }${blockName}`;

    cy.get('body').then($body => {
      const modernInserterSelector = `.block-editor-inserter__menu [data-type="${type}"], .block-editor-inserter__results [data-type="${type}"]`;
      const selectorToUse = $body.find(blockSelector).length
        ? blockSelector
        : $body.find(modernInserterSelector).length
        ? modernInserterSelector
        : '';

      if (selectorToUse.length) {
        cy.get(selectorToUse).then($block => {
          if ($block.length) {
            cy.wrap($block).first().click();
            if (inserterBtnSelector.length) {
              cy.get(inserterBtnSelector).first().click();
            }

            const [ns, rest] = type.split('/');
            const blockType = `${ns}/${rest}`;
            const blockSelectorByType = `.wp-block[data-type="${blockType}"]`;

            cy.get('body').then($editorBody => {
              if ($editorBody.find('iframe[name="editor-canvas"]').length) {
                getIframe('iframe[name="editor-canvas"]').then($iframe => {
                  const blockInIframe = $iframe.find(blockSelectorByType);
                  if (blockInIframe.length > 0) {
                    insertedBlockId = resolveBlockId(
                      blockInIframe.last(),
                      blockType
                    );
                    cy.wrap(insertedBlockId);
                  }
                });
              } else if ($editorBody.find(blockSelectorByType).length) {
                cy.get(blockSelectorByType).then($blockInEditor => {
                  insertedBlockId = resolveBlockId(
                    $blockInEditor.last(),
                    blockType
                  );
                  cy.wrap(insertedBlockId);
                });
              } else {
                throw new Error(`${blockType} not found.`);
              }
            });
          }
        });
      }
    });
  });

  return cy.wrap(null).then(() => insertedBlockId);
};
