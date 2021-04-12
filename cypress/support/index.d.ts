declare namespace Cypress {
    interface Chainable {
        checkUserKeyNull(): Cypress.Chainable;
        setTokenInLocalStorage(): Cypress.Chainable;
        login(username: string, password: string): Cypress.Chainable;
        register(firstName: string, lastName: string, username: string, password: string): Cypress.Chainable;
        delete(id: number): Cypress.Chainable
    }
}