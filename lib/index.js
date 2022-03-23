"use strict";
/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />
Object.defineProperty(exports, "__esModule", { value: true });
// Import commands.
const open_document_settings_panel_1 = require("./commands/open-document-settings-panel");
const open_document_settings_sidebar_1 = require("./commands/open-document-settings-sidebar");
const delete_all_terms_1 = require("./commands/delete-all-terms");
const create_term_1 = require("./commands/create-term");
const logout_1 = require("./commands/logout");
const login_1 = require("./commands/login");
// Register commands
Cypress.Commands.add('openDocumentSettingsPanel', open_document_settings_panel_1.openDocumentSettingsPanel);
Cypress.Commands.add('openDocumentSettingsSidebar', open_document_settings_sidebar_1.openDocumentSettingsSidebar);
Cypress.Commands.add('deleteAllTerms', delete_all_terms_1.deleteAllTerms);
Cypress.Commands.add('createTerm', create_term_1.createTerm);
Cypress.Commands.add('logout', logout_1.logout);
Cypress.Commands.add('login', login_1.login);
