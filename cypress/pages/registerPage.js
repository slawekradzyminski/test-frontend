class RegisterPage {

    firstNameField = '[name=firstName]'
    lastNameField = '[name=lastName]'
    usernameField = '[name=username]'
    passwordField = '[name=password]'
    registerButton = 'button'
    alertError = '.alert-danger'
    cancelLink = '.btn-link'
    registerButton = 'button'
    invalidFeedback = '.invalid-feedback'
    invalidInput  = '.is-invalid'

    register(username, password, firstName, lastName) {
        cy.get(this.firstNameField).type(firstName)
        cy.get(this.lastNameField).type(lastName)
        cy.get(this.usernameField).type(username)
        cy.get(this.passwordField).type(password)
        this.clickRegister()
    }

    verifyUserAlreadyExistsError() {
        cy.get(this.alertError).should('contain.text', 'User already exists')
    }

    clickCancel() {
        cy.get(this.cancelLink).click()
    }

    clickRegister() {
        cy.get(this.registerButton).click()
    }

    verifyFrontendValidation() {
        cy.get(this.invalidFeedback).eq(0).should('contain.text', 'First Name is required')        
        cy.get(this.invalidFeedback).eq(1).should('contain.text', 'Last Name is required')        
        cy.get(this.invalidFeedback).eq(2).should('contain.text', 'Username is required')        
        cy.get(this.invalidFeedback).eq(3).should('contain.text', 'Password is required')  
        cy.get(this.invalidInput).should('have.length', 4)
    }
}

export default RegisterPage