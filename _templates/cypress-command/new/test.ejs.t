---
to: tests/cypress/integration/<%= h.changeCase.param(name) %>.test.js
---
describe('Command: <%= h.changeCase.camel(name) %>', () => {
  it('Should be able to <%= h.changeCase.title(name) %>', () => {
    cy.<%= h.changeCase.camel(name) %>();
  });
});
