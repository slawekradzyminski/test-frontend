export default class LoginPage {

    alert = '.alert'

    verifyRegistrationSucceeded(username) {
        cy.get(this.alert)
            .should('have.text', 'Registration successful')
            .should('not.have.class', 'alert-danger')

        return cy.request('http://localhost:4000/users').then(resp => {
            return resp.body.find(entry => entry.username === username).id;
        })
    }

}