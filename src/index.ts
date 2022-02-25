/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

import { login } from './commands/login';

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      login: typeof login;
    }
  }
}

Cypress.Commands.add('login', login);
