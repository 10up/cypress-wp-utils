/**
 * Run PHP code as WP CLI eval-file command
 *
 * @param command - PHP code to execute with WP CLI. The '<?php ' prefix is optional.
 *
 * @example
 * ```
 * cy.wpCliEval('<?php for($i=0; $i<10; $i++) { echo $i; }').then(response=>{
 *   const output = response.stdout;
 *   // Do whatever with the output.
 * })
 * ```
 */
export declare const wpCliEval: (command: string) => void;
