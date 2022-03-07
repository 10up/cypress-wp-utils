import { logout } from './commands/logout';
import { login } from './commands/login';
declare global {
    namespace Cypress {
        interface Chainable<Subject> {
            logout: typeof logout;
            login: typeof login;
        }
    }
}
