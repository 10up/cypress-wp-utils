const { randomName } = require('../support/functions');

const testPatterns = [
  { title: 'Quote', cat: 'text', expected: true },
  { title: randomName(), cat: 'text', expected: false },
  { title: 'Quote', cat: randomName(), expected: false },
];

describe('Command: checkBlockPatternExists', () => {
  before(() => {
    cy.login();
    cy.deactivatePlugin('classic-editor');
  });

  testPatterns.forEach(testCase => {
    const shouldIt = testCase.expected ? 'should' : 'shoult not';
    it(`Pattern "${testCase.title}" ${shouldIt} exist in category "${testCase.cat}"`, () => {
      cy.checkBlockPatternExists({
        title: 'Quote',
        categoryValue: 'text',
      }).then(exists => {
        assert(
          exists === testCase.expected,
          `Pattern "${testCase.title}" in category "${testCase.cat}": ${testCase.expected}`
        );
      });
    });
  });
});
