export default class LoginPage {

    #invalidFeedback = '.invalid-feedback'
    #usernameInput = "input[name='username']"
    #passwordInput = "input[name='password']"

    attemptLogin(username, password) {
        cy.get(this.#usernameInput).type(username)
        cy.get(this.#passwordInput).type(password)
        this.clickLogin()
    }

    clickLogin() {
        cy.get('.btn-primary').click()
    }

    clickRegister() {
        cy.get('a').contains('Register').click()
    }

    verifyValidationErrorDisplayed() {
        cy.get(this.#invalidFeedback).should('have.length', 2)
        cy.get(this.#invalidFeedback).eq(0).should('have.text', 'Username is required')
        cy.get(this.#invalidFeedback).eq(1).should('have.text', 'Password is required')
        cy.get(this.#usernameInput).should('have.class', 'is-invalid')
        cy.get(this.#passwordInput).should('have.class', 'is-invalid')
    }

    verifyLoginFailedMessage() {
        cy.get('.alert')
            .should('have.text', 'Login failed - bad username or password')
            .should('have.class', 'alert-danger')
    }

}