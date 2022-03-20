export default class HomePage {

    verifyHeaderContains(firstName) {
        cy.get('h1').should('contain.text', firstName)
    }

}