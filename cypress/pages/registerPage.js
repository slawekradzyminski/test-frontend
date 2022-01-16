class RegisterPage {

    firstNameField = '[name=firstName]'
    lastNameField = '[name=lastName]'
    usernameField = '[name=username]'
    passwordField = '[name=password]'
    registerButton = 'button'

    register(username, password, firstName, lastName) {
        cy.get(this.firstNameField).type(firstName)
        cy.get(this.lastNameField).type(lastName)
        cy.get(this.usernameField).type(username)
        cy.get(this.passwordField).type(password)
        cy.get(this.registerButton).click()
    }

}

export default RegisterPage