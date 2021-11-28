const usernameField = '[name=username]'
const passwordField = '[name=password]'
const loginButton = 'button'
const errorAlert = '.alert-danger'

export const loginPage = {
    login: (username, password) => {
        cy.get(usernameField).type(username)
        cy.get(passwordField).type(password)
        cy.get(loginButton).click()
    },

    verifyLoginFailedErrorMessage: () => {
        cy.get(errorAlert).should('have.text', 'Login failed - bad username or password')
    }
}