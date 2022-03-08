/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

// Import commands.
import { deleteAllTerms } from './commands/delete-all-terms';
import { createTerm } from './commands/create-term';
import { logout } from './commands/logout';
import { login } from './commands/login';

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      deleteAllTerms: typeof deleteAllTerms;
      createTerm: typeof createTerm;
      logout: typeof logout;
      login: typeof login;
    }
  }
}

// Register commands
Cypress.Commands.add('deleteAllTerms', deleteAllTerms);
Cypress.Commands.add('createTerm', createTerm);
Cypress.Commands.add('logout', logout);
Cypress.Commands.add('login', login);
