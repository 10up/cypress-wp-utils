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
    cy.deactivatePlugin('classic-editor');

    // Ignore WP 5.2 Synchronous XHR error.
    Cypress.on('uncaught:exception', (err, runnable) => {
      if (
        err.message.includes(
          "Failed to execute 'send' on 'XMLHttpRequest': Failed to load 'http://localhost:8889/wp-admin/admin-ajax.php': Synchronous XHR in page dismissal"
        )
      ) {
        return false;
      }
    });

    // Run the tests before seeding any posts to ensure we get false.
    tests.forEach(test => {
      it(`${test.postTitle} should not exist`, () => {
        const args = {
          title: test.postTitle,
        };

        // make 'postType' argument optional to test default value
        if ('post' !== test.postType) {
          args.postType = test.postType;
        }
        cy.checkPostExists(args).then(exists => {
          assert(exists === false, `Post should not exist`);
        });
      });
    });

    // Create posts which expected to exist during tests
    tests.forEach(test => {
      if (test.expected) {
        cy.createPost({
          postType: test.postType,
          title: test.postTitle,
        });
      }
    });
  });

  // Run the tests again after seeding posts to ensure we get the correct response.
  tests.forEach(test => {
    const shouldIt = test.expected ? 'should' : 'should not';
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
