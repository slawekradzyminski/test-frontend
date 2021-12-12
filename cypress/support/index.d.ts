declare namespace Cypress {
    interface Chainable {
        // commands.js
        login(username: string, password: string): void;
        register(username: string, password: string, firstName: string, lastName: string): Promise<number>;
        deleteUser(id: number): void;
        assertUserNotExists(id: number): void;

        // mocks.js
        mockFailedLogin(): void;
        mockFailedRegister(): void;
        mockSuccessfulLogin(firstName: string): void;
        mockSuccessfulRegister(): void;
        setTokenInLocalStorage(): void
    }
}