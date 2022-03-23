/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

// Import commands.
import { deactivatePlugin } from './commands/deactivate-plugin';
import { activateAllPlugins } from './commands/activate-all-plugins';
import { deactivateAllPlugins } from './commands/deactivate-all-plugins';
import { activatePlugin } from './commands/activate-plugin';
import { getCurrentPlugin } from './helpers/get-current-plugin';
import { openDocumentSettingsPanel } from './commands/open-document-settings-panel';
import { openDocumentSettingsSidebar } from './commands/open-document-settings-sidebar';
import { deleteAllTerms } from './commands/delete-all-terms';
import { createTerm } from './commands/create-term';
import { logout } from './commands/logout';
import { login } from './commands/login';

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      deactivatePlugin: typeof deactivatePlugin;
      activateAllPlugins: typeof activateAllPlugins;
      deactivateAllPlugins: typeof deactivateAllPlugins;
      activatePlugin: typeof activatePlugin;
      getCurrentPlugin: typeof getCurrentPlugin;
      openDocumentSettingsPanel: typeof openDocumentSettingsPanel;
      openDocumentSettingsSidebar: typeof openDocumentSettingsSidebar;
      deleteAllTerms: typeof deleteAllTerms;
      createTerm: typeof createTerm;
      logout: typeof logout;
      login: typeof login;
    }
  }
}

// Register commands
Cypress.Commands.add('deactivatePlugin', deactivatePlugin);
Cypress.Commands.add('activateAllPlugins', activateAllPlugins);
Cypress.Commands.add('deactivateAllPlugins', deactivateAllPlugins);
Cypress.Commands.add('activatePlugin', activatePlugin);
Cypress.Commands.add('getCurrentPlugin', getCurrentPlugin);
Cypress.Commands.add('openDocumentSettingsPanel', openDocumentSettingsPanel);
Cypress.Commands.add(
  'openDocumentSettingsSidebar',
  openDocumentSettingsSidebar
);
Cypress.Commands.add('deleteAllTerms', deleteAllTerms);
Cypress.Commands.add('createTerm', createTerm);
Cypress.Commands.add('logout', logout);
Cypress.Commands.add('login', login);
