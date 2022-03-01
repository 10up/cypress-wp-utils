/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

// Import commands.
import { login } from './commands/login';

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      login: typeof login;
    }
  }
}

// Register commands
Cypress.Commands.add('login', login);
