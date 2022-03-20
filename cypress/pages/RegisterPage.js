export default class RegisterPage {

    verifyHeader(text) {
        cy.get('h2').should('have.text', text)
    }

    clickCancel() {
        cy.get('a').contains('Cancel').click()
    }

}