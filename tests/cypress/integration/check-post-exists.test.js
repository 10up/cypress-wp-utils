const { randomName } = require('../support/functions');

describe('Command: checkPostExists', () => {
  const tests = [
    {
      postType: 'post',
      postTitle: 'Post ' + randomName(),
      expected: true,
    },
    {
      postType: 'post',
      postTitle: 'Post ' + randomName(),
      expected: false,
    },
    {
      postType: 'page',
      postTitle: 'Page ' + randomName(),
      expected: true,
    },
    {
      postType: 'page',
      postTitle: 'Post ' + randomName(),
      expected: false,
    },
  ];

  before(() => {
    cy.login();
    cy.activatePlugin('classic-editor');

    // Create posts which expected to exist during tests
    tests.forEach(test => {
      if (test.expected) {
        cy.classicCreatePost({
          postType: test.postType,
          title: test.postTitle,
        });
      }
    });
  });

  tests.forEach(test => {
    const shouldIt = test.exists ? 'should' : 'should not';
    it(`${test.postTitle} ${shouldIt} exist`, () => {
      const args = {
        title: test.postTitle,
      };

      // make 'postType' argument optional to test default value
      if ('post' !== test.postType) {
        args.postType = test.postType;
      }
      cy.checkPostExists(args).then(exists => {
        assert(exists === test.expected, `Post ${shouldIt} exist`);
      });
    });
  });
});
