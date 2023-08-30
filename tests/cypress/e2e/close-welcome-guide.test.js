describe('Command: closeWelcomeGuide', () => {
  before(() => {
    cy.login();

    cy.deactivatePlugin('classic-editor');

    // Disable Classic Editor if it's enabled
    cy.visit('/wp-admin/options-writing.php');
    cy.get('body').then($body => {
      if (
        $body.find('.classic-editor-options').length !== 0 &&
        $body.find('#classic-editor-classic').is(':checked')
      ) {
        cy.get('#classic-editor-block').click();
        cy.get('#submit').click();
      }
    });

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
  });

  beforeEach(() => {
    cy.login();
  });

  it('Should be able to Close Welcome Guide', () => {
    const welcomeGuideWindow = '.edit-post-welcome-guide';

    cy.visit('/wp-admin/post-new.php');
    cy.closeWelcomeGuide();
    cy.get(welcomeGuideWindow).should('not.exist');
  });

  it('Should not fail closing Welcome Guide', () => {
    const welcomeGuideWindow = '.edit-post-welcome-guide';

    cy.visit('/wp-admin/post-new.php');
    cy.closeWelcomeGuide();
    cy.get(welcomeGuideWindow).should('not.exist');

    cy.visit('/wp-admin/post-new.php');
    cy.closeWelcomeGuide();
    cy.get(welcomeGuideWindow).should('not.exist');
  });
});
