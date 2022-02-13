export default class LoginPage {

    alert = '.alert'
    form = '.form-control'
    loginButton = '.btn-primary'

    verifyRegistrationSucceeded(username) {
        cy.get(this.alert)
            .should('have.text', 'Registration successful')
            .should('not.have.class', 'alert-danger')

        return cy.request('http://localhost:4000/users').then(resp => {
            return resp.body.find(entry => entry.username === username).id;
        })
    }

    attemptLogin(username, password) {
        cy.get(this.form).eq(0).type(username)
        cy.get(this.form).eq(1).type(password)
        cy.get(this.loginButton).click()
    }

}