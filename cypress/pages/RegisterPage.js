export default class RegisterPage {

    verifyHeader() {
        cy.get('h2').should('have.text', 'Register')
    }

}