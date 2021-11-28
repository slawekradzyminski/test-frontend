const header = 'h1'
const users = 'ul li'
const editButton = '.edit'

export const homePage = {
    verifyWelcomeMessage: (firstName) => {
        cy.get(header).should('have.text', `Hi ${firstName}!`)
    },

    clickEditUserWithIndex: (index) => {
        cy.get(users).eq(index).find(editButton).click()
    }
}