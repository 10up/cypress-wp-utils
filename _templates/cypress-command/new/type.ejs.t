---
inject: true
to: src/index.ts
after: interface Chainable<Subject> {
skip_if: <%= h.changeCase.camel(name) %>
---
			<%= h.changeCase.camel(name) %>: typeof <%= h.changeCase.camel(name) %>;