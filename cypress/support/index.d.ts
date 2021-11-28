declare namespace Cypress {
    interface Chainable {
        login(username: string, password: string): void;
        register(username: string, password: string, firstName: string, lastName: string): Promise<number>;
        deleteUser(id: number): void;
        checkUser(id: number): Promise<number>;
        mockSuccessfulLogin(firstName: string): void;
        verifyCorrectLoginRequestBody(username: string, password: string): void;
        mockSuccessfulLoginRegister(): void;
        verifyCorrectRegisterRequestBody(username: string, password: string, firstName: string, lastName: string): void;
        setTokenInLocalStorage(): void;
        mockEditUser(user: { id: number; firstName: string; lastName: string; username: string; password: string; }): void;
    }
}