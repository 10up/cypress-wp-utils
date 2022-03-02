import { login } from './commands/login';
declare global {
    namespace Cypress {
        interface Chainable<Subject> {
            login: typeof login;
        }
    }
}
