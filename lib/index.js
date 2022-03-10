"use strict";
/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />
Object.defineProperty(exports, "__esModule", { value: true });
// Import commands.
const delete_all_terms_1 = require("./commands/delete-all-terms");
const create_term_1 = require("./commands/create-term");
const logout_1 = require("./commands/logout");
const login_1 = require("./commands/login");
// Register commands
Cypress.Commands.add('deleteAllTerms', delete_all_terms_1.deleteAllTerms);
Cypress.Commands.add('createTerm', create_term_1.createTerm);
Cypress.Commands.add('logout', logout_1.logout);
Cypress.Commands.add('login', login_1.login);
