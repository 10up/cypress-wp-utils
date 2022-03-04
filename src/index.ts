/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

// Import commands.
import { visitAdminPage } from './commands/visit-admin-page';
import { login } from './commands/login';

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      visitAdminPage: typeof visitAdminPage;
      login: typeof login;
    }
  }
}

// Register commands
Cypress.Commands.add('visitAdminPage', visitAdminPage);
Cypress.Commands.add('login', login);
