const usernameField = '[name=username]'
const passwordField = '[name=password]'
const loginButton = 'button'
const errorAlert = '.alert-danger'
const spinner = '.spinner-border'

export const loginPage = {
    login: (username, password) => {
        cy.get(usernameField).type(username)
        cy.get(passwordField).type(password)
        cy.get(loginButton).click()
    },

    verifyLoginFailedErrorMessage: (message) => {
        cy.get(errorAlert).should('have.text', message)
    },

    verifySpinner: () => {
        cy.get(spinner).should('be.visible')
    }
}