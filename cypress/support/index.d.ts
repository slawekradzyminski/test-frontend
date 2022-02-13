declare namespace Cypress {
    interface Chainable {
        // commands.js
        login(username: string, password: string): Promise<number>;
        register(username: string, password: string, firstName: string, lastName: string): Promise<number>;
        deleteUser(id: number): void;
        verifyUserExistsViaApi(username: string, password: string, firstName: string, lastName: string, id: number): void;

        // mockCommands.js
        setFakeTokenInLocalStorage(): void;
    }
}