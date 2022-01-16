class LoginPage {
    
    formGroup = '.form-group'
    input = 'input'
    button = 'button'
    alert = '.alert'
    registerButton = '.btn-link'
    invalidFeedback = '.invalid-feedback'

    login(username, password) {
        cy.get(this.formGroup).within(() => {
            cy.get(this.input).eq(0).type(username)
            cy.get(this.input).eq(1).type(password)
            this.clickLogin()
        })
    }

    verifyErrorMessage() {
        cy.get(this.alert).should('contain.text', 'Login failed - bad username or password')
    }

    verifyRegisterSuccessfulAlert() {
        cy.get(this.alert).should('contain.text', 'Registration successful')
    }

    clickRegister() {
        cy.get(this.registerButton).click()
    }

    clickLogin() {
        cy.get(this.button).click()
    }

    verifyFrontendValidation() {
        cy.get(this.formGroup).within(() => {
            cy.get(this.input).eq(0).should('have.class', 'is-invalid')
            cy.get(this.input).eq(1).should('have.class', 'is-invalid')
        })

        cy.get(this.invalidFeedback).eq(0).should('have.text', 'Username is required')
        cy.get(this.invalidFeedback).eq(1).should('have.text', 'Password is required')
    }
}

export default LoginPage