const header = 'h1'

export const homePage = { 
    verifyWelcomeMessageContains: (firstName) => {
        cy.get(header).should('contain.text', firstName)
    }
}