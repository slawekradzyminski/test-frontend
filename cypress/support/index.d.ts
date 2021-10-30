declare namespace Cypress {
    interface Chainable {
        login(username: string, password: string): Cypress.Chainable;
        register(username: string, password: string, firstName: string, lastName:string ): void;
    }
}