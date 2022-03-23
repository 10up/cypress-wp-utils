import { openDocumentSettingsPanel } from './commands/open-document-settings-panel';
import { openDocumentSettingsSidebar } from './commands/open-document-settings-sidebar';
import { deleteAllTerms } from './commands/delete-all-terms';
import { createTerm } from './commands/create-term';
import { logout } from './commands/logout';
import { login } from './commands/login';
declare global {
    namespace Cypress {
        interface Chainable<Subject> {
            openDocumentSettingsPanel: typeof openDocumentSettingsPanel;
            openDocumentSettingsSidebar: typeof openDocumentSettingsSidebar;
            deleteAllTerms: typeof deleteAllTerms;
            createTerm: typeof createTerm;
            logout: typeof logout;
            login: typeof login;
        }
    }
}