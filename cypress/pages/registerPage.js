const header = 'h2'

export const registerPage = {
    verifyHeaderDisplayed: () => {
        cy.get(header).should('have.text', 'Register')
    }
}