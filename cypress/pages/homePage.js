class HomePage {

    header = 'h1'

    verifyHeader(firstName) {
        cy.get(this.header).should('contain.text', `Hi ${firstName}`)
    }

}

export default HomePage