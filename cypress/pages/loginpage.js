export const loginCss = {
    usernameField: '[name=username]',
    passwordField: '[name=password]',
    loginButton: 'button',
    loginFailedInfo: '.alert-danger',
    registrationSuccesfulInfo: '.alert-success'
}

export const loginPage = {
    loginUser: (username, password) => {
        cy.get(loginCss.usernameField).type(username)
        cy.get(loginCss.passwordField).type(password)
        cy.get(loginCss.loginButton).click()
    },

    verifyErrorMessage: () => {
        cy.get(loginCss.loginFailedInfo).contains('Login failed') 
    },

    verifyRegistrationSuccessful: () => {
        cy.get(loginCss.registrationSuccesfulInfo).contains('Registration successful')
    }
}