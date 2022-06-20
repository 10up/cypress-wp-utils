import { classicCreatePost } from './commands/classic-create-post';
import { insertBlock } from './commands/insert-block';
import { closeWelcomeGuide } from './commands/close-welcome-guide';
import { wpCliEval } from './commands/wp-cli-eval';
import { wpCli } from './commands/wp-cli';
import { deactivatePlugin } from './commands/deactivate-plugin';
import { activateAllPlugins } from './commands/activate-all-plugins';
import { deactivateAllPlugins } from './commands/deactivate-all-plugins';
import { activatePlugin } from './commands/activate-plugin';
import { setPermalinkStructure } from './commands/set-permalink-structure';
import { openDocumentSettingsPanel } from './commands/open-document-settings-panel';
import { openDocumentSettingsSidebar } from './commands/open-document-settings-sidebar';
import { deleteAllTerms } from './commands/delete-all-terms';
import { createTerm } from './commands/create-term';
import { logout } from './commands/logout';
import { login } from './commands/login';
import { createPost } from './commands/create-post';
import { uploadMedia } from './commands/upload-media';
declare global {
    namespace Cypress {
        interface Chainable<Subject> {
            classicCreatePost: typeof classicCreatePost;
            insertBlock: typeof insertBlock;
            closeWelcomeGuide: typeof closeWelcomeGuide;
            wpCliEval: typeof wpCliEval;
            wpCli: typeof wpCli;
            deactivatePlugin: typeof deactivatePlugin;
            activateAllPlugins: typeof activateAllPlugins;
            deactivateAllPlugins: typeof deactivateAllPlugins;
            activatePlugin: typeof activatePlugin;
            setPermalinkStructure: typeof setPermalinkStructure;
            openDocumentSettingsPanel: typeof openDocumentSettingsPanel;
            openDocumentSettingsSidebar: typeof openDocumentSettingsSidebar;
            deleteAllTerms: typeof deleteAllTerms;
            createTerm: typeof createTerm;
            createPost: typeof createPost;
            uploadMedia: typeof uploadMedia;
            logout: typeof logout;
            login: typeof login;
        }
    }
}
