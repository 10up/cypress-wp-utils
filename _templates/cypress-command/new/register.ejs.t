---
inject: true
to: src/index.ts
after: Register commands
skip_if: <%= h.changeCase.camel(name) %>
---
Cypress.Commands.add('<%= h.changeCase.camel(name) %>', <%= h.changeCase.camel(name) %>);