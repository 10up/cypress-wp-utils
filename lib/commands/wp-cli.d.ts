/**
 * Perform a WP CLI command
 *
 * @param command - WP CLI command. The 'wp ' prefix is optional
 * @param ignoreFailures - Prevent command to fail if CLI command exits with error
 *
 * @example
 * ```
 * cy.wpCli('plugin list --field=name').then(response=>{
 *   const plugins = res.stdout.split('\n');
 *   // Do whatever with plugins list
 * });
 * ```
 */
export declare const wpCli: (command: string, ignoreFailures?: boolean) => void;
