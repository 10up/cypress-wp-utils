const { randomName } = require('../support/functions');
const semver = require('semver');

describe('Command: checkBlockPatternExists', () => {
  if (semver.gte(Cypress.env('WORDPRESS_CORE').toString(), '5.5.0')) {
    before(() => {
      cy.login();
      cy.deactivatePlugin('classic-editor');
    });

    const testPatterns = [
      { title: 'Quote', cat: 'text', expected: true },
      { title: randomName(), cat: 'text', expected: false },
      { title: 'Quote', cat: randomName(), expected: false },
    ];

    testPatterns.forEach(testCase => {
      const shouldIt = testCase.expected ? 'should' : 'shoult not';
      it(`Pattern "${testCase.title}" ${shouldIt} exist in category "${testCase.cat}"`, () => {
        cy.checkBlockPatternExists({
          title: testCase.title,
          categoryValue: testCase.cat,
        }).then(exists => {
          assert(
            exists === testCase.expected,
            `Pattern "${testCase.title}" in category "${testCase.cat}": ${testCase.expected}`
          );
        });
      });
    });
  } else {
    it('Skip Block Pattern test, WordPress version too low', () => {
      assert(true);
    });
  }
});
