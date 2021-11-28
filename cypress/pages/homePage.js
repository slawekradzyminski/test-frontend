const header = 'h1'

export const homePage = {
    verifyWelcomeMessage: (firstName) => {
        cy.get(header).should('have.text', `Hi ${firstName}!`)
    }
}