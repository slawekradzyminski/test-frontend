declare namespace Cypress {
    interface Chainable {
        login(username: string, password: string): Promise<number>;
        register(username: string, password: string, firstName: string, lastName: string): void;
        deleteUser(id: number): void;
    }
}