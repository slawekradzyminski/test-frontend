export default class EditPage {

    usernameField = '[name=username]'
    passwordField = '[name=password]'
    lastNameField = '[name=lastName]'
    firstNameField = '[name=firstName]'
    saveUserButton = '.btn-primary'

    attemptToEdit(username, firstName, lastName, password) {
        cy.get(this.usernameField).clear().type(username)
        cy.get(this.firstNameField).clear().type(firstName)
        cy.get(this.lastNameField).clear().type(lastName)
        cy.get(this.passwordField).clear().type(password)
        cy.get(this.saveUserButton).click()
    }
}