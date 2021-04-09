export const registerPageCss = {
    firstNameField: '[name=firstName]',
    lastNameField: '[name=lastName',
    usernameField: '[name=username]',
    passwordField: '[name=password]',
    registerButton: '.btn-primary'
}

export const registerPage = {
    register: (firstName, lastName, username, password) => {
        cy.get(registerPageCss.firstNameField).type(firstName)
        cy.get(registerPageCss.lastNameField).type(lastName)
        cy.get(registerPageCss.usernameField).type(username)
        cy.get(registerPageCss.passwordField).type(password)
        cy.get(registerPageCss.registerButton).click() 
    }

}