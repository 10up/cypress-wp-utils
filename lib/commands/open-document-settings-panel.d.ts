/**
 * Open Document Settings Panel
 *
 * @param name - Panel name
 * @param tab - Settings tab
 *
 * @example
 * Open featured image panel of the Post editor
 * ```
 * cy.openDocumentSettingsPanel('Featured image')
 * ```
 *
 * @example
 * Open Permalink panel of the Page editor
 * ```
 * cy.openDocumentSettingsPanel('Permalink', 'Page')
 * ```
 */
export declare const openDocumentSettingsPanel: (name: string, tab?: string) => void;
