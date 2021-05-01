declare namespace Cypress {
    interface Chainable {
        deleteUser(id: number)
        register(firstName: string, lastName: string, username: string, password: string): Promise<number> & Cypress.Chainable
        login(username: string, password: string): Promise<string>
    }
}