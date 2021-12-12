const loginField = '[name=username]'
const passwordField = '[name=password]'
const loginButton = '.btn-primary'
const alertError = '.alert-danger'
const emptyInputMessage = '.invalid-feedback'
const registerLink = 'a.btn-link'

export const loginPage = {
    attemptLogin: (username, password) => {
        cy.get(loginField).type(username)
        cy.get(passwordField).type(password)
        loginPage.clickLogin()
    },

    verifyErrorMessageWasDisplayed: () => {
        cy.get(alertError).should('contain.text', 'Login failed')
    },

    clickLogin: () => {
        cy.get(loginButton).click()
    },

    assertThatEmptyInputValidationWasDisplayed: () => {
        cy.get(emptyInputMessage).should('have.length', 2)
        cy.get(emptyInputMessage).eq(0).should('have.text', 'Username is required')
        cy.get(emptyInputMessage).eq(1).should('have.text', 'Password is required')
        cy.get(loginField).should('have.class', 'is-invalid')
        cy.get(passwordField).should('have.class', 'is-invalid')
    },

    clickRegister: () => {
        cy.get(registerLink).click()
    }
}

