export const loginPageCss = {
    username: '[name=username]',
    password: '[name=password]'
}

export const loginPage = {
    login: (username, password) => {
        cy.get(loginPageCss.username).type(username)
        cy.get(loginPageCss.password).type(password)
        cy.get('button').click()
    },

    clickRegister: () => {

    }
}