"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeWelcomeGuide = void 0;
/**
 * Whether an editor load has already been waited on.
 *
 * The guide is only ever shown on the first editor load for a user, so the wait
 * below only needs to happen until one load has been given the chance to show
 * it. Every load after that just needs the cheap look at the DOM.
 */
let guideWaitedFor = false;
/**
 * Close Welcome Guide
 *
 * @example
 * ```
 * cy.closeWelcomeGuide()
 * ```
 */
const closeWelcomeGuide = () => {
    const titleInput = 'h1.editor-post-title__input, #post-title-0';
    const guideSelector = '.edit-post-welcome-guide';
    const closeButtonSelector = `${guideSelector} .components-modal__header button`;
    // How long to give the guide to turn up, and how often to look for it.
    const guideTimeout = 1000;
    const pollInterval = 50;
    // Wait for edit page to load
    cy.getBlockEditor().find(titleInput, { timeout: 10000 }).should('exist');
    /*
     * Poll for the guide rather than checking for it once.
     *
     * The guide is rendered into a portal, so it can land in the DOM a moment
     * after the title it covers. Reading the DOM a single time can therefore run
     * too early, find nothing, and leave the modal open - which then fails
     * whatever tries to interact with the editor next, well away from here.
     *
     * The poll returns as soon as the guide shows up, so the wait is only ever
     * paid in full on the one editor load that has no guide to close.
     */
    cy.document()
        .then(doc => {
        // Read inside the callback: a test queues all of its commands up front,
        // so checking this while the queue is being built would always see the
        // value it had before any of the commands ran.
        const timeout = guideWaitedFor ? 0 : guideTimeout;
        guideWaitedFor = true;
        return new Cypress.Promise(resolve => {
            let waited = 0;
            const pollForGuide = () => {
                if (doc.querySelector(closeButtonSelector)) {
                    resolve(true);
                }
                else if (waited >= timeout) {
                    resolve(false);
                }
                else {
                    waited += pollInterval;
                    setTimeout(pollForGuide, pollInterval);
                }
            };
            pollForGuide();
        });
    })
        .then(isGuideOpen => {
        if (isGuideOpen) {
            cy.get(closeButtonSelector).click();
            // Make sure it is gone before handing back to the caller.
            cy.get(guideSelector).should('not.exist');
        }
    });
};
exports.closeWelcomeGuide = closeWelcomeGuide;
