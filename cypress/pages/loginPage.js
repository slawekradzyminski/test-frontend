const usernameField = '[name=username]'
const passwordField = '[name=password]'
const loginButton = '.btn-primary'
const registerButton = '.btn-link'

export const loginPage = {
    login: (username, password) => {
        cy.get(usernameField).type(username)
        cy.get(passwordField).type(password)
        cy.get(loginButton).click()
    },

    clickRegister: () => {
        cy.get(registerButton).click()
    }

}