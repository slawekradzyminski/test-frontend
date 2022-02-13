export default class HomePage {

    header = 'h1'

    verifyWelcomeMessage(firstName) {
        cy.get(this.header).should('contain.text', `Hi ${firstName}`)
    }

}