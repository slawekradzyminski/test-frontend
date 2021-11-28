const usernameField = '[name=username]'
const passwordField = '[name=password'
const firstNameField = '[name=firstName]'
const lastNameField = '[name=lastName]'
const registerButton = 'button'

export const registerPage = {
    register: (username, password, firstName, lastName) => {
        cy.get(usernameField).type(username)
        cy.get(passwordField).type(password)
        cy.get(firstNameField).type(firstName)
        cy.get(lastNameField).type(lastName)
        cy.get(registerButton).click()
    }
}