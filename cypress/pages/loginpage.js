export const loginCss = {
    usernameField: '[name=username]',
    passwordField: '[name=password]',
    registerButton: '.btn-link',
    loginButton: 'button',
    registrationSuccessfulAlert: '.alert-success'
}

export const loginPage = {
    loginUser: (username, password) => {
        cy.get(loginCss.usernameField).type(username)
        cy.get(loginCss.passwordField).type(password)
        cy.get(loginCss.loginButton).click()
    },

    clickRegister: () => {
        cy.get(loginCss.registerButton).click()
    },

    verifyRegistrationSuccessfulAlert: () => {
        cy.get(loginCss.registrationSuccessfulAlert).contains('Registration successful')
    }

}