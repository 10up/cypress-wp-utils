"use strict";
/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />
Object.defineProperty(exports, "__esModule", { value: true });
// Import commands.
const classic_create_post_1 = require("./commands/classic-create-post");
const insert_block_1 = require("./commands/insert-block");
const close_welcome_guide_1 = require("./commands/close-welcome-guide");
const wp_cli_eval_1 = require("./commands/wp-cli-eval");
const wp_cli_1 = require("./commands/wp-cli");
const deactivate_plugin_1 = require("./commands/deactivate-plugin");
const activate_all_plugins_1 = require("./commands/activate-all-plugins");
const deactivate_all_plugins_1 = require("./commands/deactivate-all-plugins");
const activate_plugin_1 = require("./commands/activate-plugin");
const set_permalink_structure_1 = require("./commands/set-permalink-structure");
const open_document_settings_panel_1 = require("./commands/open-document-settings-panel");
const open_document_settings_sidebar_1 = require("./commands/open-document-settings-sidebar");
const delete_all_terms_1 = require("./commands/delete-all-terms");
const create_term_1 = require("./commands/create-term");
const logout_1 = require("./commands/logout");
const login_1 = require("./commands/login");
const create_post_1 = require("./commands/create-post");
const upload_media_1 = require("./commands/upload-media");
// Register commands
Cypress.Commands.add('classicCreatePost', classic_create_post_1.classicCreatePost);
Cypress.Commands.add('insertBlock', insert_block_1.insertBlock);
Cypress.Commands.add('closeWelcomeGuide', close_welcome_guide_1.closeWelcomeGuide);
Cypress.Commands.add('wpCliEval', wp_cli_eval_1.wpCliEval);
Cypress.Commands.add('wpCli', wp_cli_1.wpCli);
Cypress.Commands.add('deactivatePlugin', deactivate_plugin_1.deactivatePlugin);
Cypress.Commands.add('activateAllPlugins', activate_all_plugins_1.activateAllPlugins);
Cypress.Commands.add('deactivateAllPlugins', deactivate_all_plugins_1.deactivateAllPlugins);
Cypress.Commands.add('activatePlugin', activate_plugin_1.activatePlugin);
Cypress.Commands.add('setPermalinkStructure', set_permalink_structure_1.setPermalinkStructure);
Cypress.Commands.add('openDocumentSettingsPanel', open_document_settings_panel_1.openDocumentSettingsPanel);
Cypress.Commands.add('openDocumentSettingsSidebar', open_document_settings_sidebar_1.openDocumentSettingsSidebar);
Cypress.Commands.add('deleteAllTerms', delete_all_terms_1.deleteAllTerms);
Cypress.Commands.add('createTerm', create_term_1.createTerm);
Cypress.Commands.add('createPost', create_post_1.createPost);
Cypress.Commands.add('uploadMedia', upload_media_1.uploadMedia);
Cypress.Commands.add('logout', logout_1.logout);
Cypress.Commands.add('login', login_1.login);
