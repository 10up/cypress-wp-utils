---
inject: true
to: src/index.ts
after: Import commands. 
skip_if: <%= h.changeCase.camel(name) %>
---
import { <%= h.changeCase.camel(name) %> } from './commands/<%= h.changeCase.param(name) %>';