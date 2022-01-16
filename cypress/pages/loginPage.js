class LoginPage {
    
    formGroup = '.form-group'
    input = 'input'
    button = 'button'

    login(username, password) {
        cy.get(this.formGroup).within(() => {
            cy.get(this.input).eq(0).type(username)
            cy.get(this.input).eq(1).type(password)
            cy.get(this.button).click()
        })
    }
}

export default LoginPage