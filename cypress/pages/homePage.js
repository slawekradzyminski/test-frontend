

export const homePage = {
    verifyTitleContains: (firstName) => {
        cy.get('h1').should('contain.text', firstName)
    }
}