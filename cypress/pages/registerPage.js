const usernameField = '[name=username]'
const passwordField = '[name=password'
const firstNameField = '[name=firstName]'
const lastNameField = '[name=lastName]'
const registerButton = 'button'
const errorAlert = '.alert-danger'
const spinner = '.spinner-border'

export const registerPage = {
    register: (username, password, firstName, lastName) => {
        cy.get(usernameField).type(username)
        cy.get(passwordField).type(password)
        cy.get(firstNameField).type(firstName)
        cy.get(lastNameField).type(lastName)
        cy.get(registerButton).click()
    },

    verifyErrorMessageContains: (message) => {
        cy.get(errorAlert).should('have.text', message)
    },

    verifySpinner: () => {
        cy.get(spinner).should('be.visible')
    }
}