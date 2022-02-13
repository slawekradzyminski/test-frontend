export default class RegisterPage {

    usernameField = '[name=username]'
    passwordField = '[name=password]'
    lastNameField = '[name=lastName]'
    firstNameField = '[name=firstName]'
    registerButton = '.btn-primary'
    alert = '.alert'
    cancelLink = '.btn-link'

    attemptRegister(username, password, firstName, lastName) {
        if (username !== '') cy.get(this.usernameField).type(username) 
        if (firstName !== '') cy.get(this.firstNameField).type(firstName) 
        if (lastName !== '') cy.get(this.lastNameField).type(lastName) 
        if (password !== '') cy.get(this.passwordField).type(password) 
        cy.get(this.registerButton).click()
    }

    verifyRegistrationFailed() {
        cy.get(this.alert)
            .should('have.text', 'User already exists')
            .should('have.class', 'alert-danger')
    }

    clickCancelLink() {
        cy.get(this.cancelLink).click()
    }

    verifyFrontendValidation(text, selector) {
        cy.get('.invalid-feedback')
            .should('have.text', text)
        cy.get(selector).should('have.class', 'is-invalid')
    }

};
