---
to: src/commands/<%= h.changeCase.param(name) %>.ts
---
/**
 * <%= h.changeCase.title(name) %>
 *
 * @example
 * ```
 * cy.<%= h.changeCase.camel(name) %>()
 * ```
 */
export const <%= h.changeCase.camel(name) %> = (): void => {};