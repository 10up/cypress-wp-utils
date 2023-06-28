/**
 * Check Sitemap Exists.
 *
 * @example
 * Use the command without any argument, sitemap.xml will be used:
 * ```
 * cy.checkSitemap()
 * ```
 *
 * @example
 * Use the command with custom sitemap path:
 * ```
 * cy.checkSitemap( '/alternative-sitemap.xml')
 * ```
 */
export declare const checkSitemap: (sitemap_url?: string) => void;
