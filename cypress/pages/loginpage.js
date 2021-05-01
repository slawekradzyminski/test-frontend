export const loginPageCss = {
    loginField: '[name=username]',
    passwordField: '[name=password]',
    loginButton: '.btn-primary'
}

export const loginPage = {
    login: (username, password) => {
        cy.get(loginPageCss.loginField).type(username)
        cy.get(loginPageCss.passwordField).type(password)
        loginPage.clickLogin()
    },

    clickLogin: () => {
        cy.get(loginPageCss.loginButton).click()
    }
}