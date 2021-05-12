declare namespace Cypress {
    interface Chainable {
        register(username: string, password: string, firstName: string, lastName: string): Promise<number>
        deleteUser(id: number): Promise<void>
        login(username: string, password: string): Cypress.Chainable
    }
}