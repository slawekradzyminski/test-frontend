const welcomeHeader = 'h1'
const userRow = 'ul li'
const addMoreUsersLink = '#addmore'
const logoutLink = '#logout'

export const homePage = {
    verifyWelcomeMessage: (firstName) => {
        cy.get(welcomeHeader).should('contain.text', firstName)
    },

    verifyNumberOfUsers: (userCount) => {
        cy.get(userRow).should('have.length', userCount)
    },

    clickAddMoreUsers: () => {
        cy.get(addMoreUsersLink).click()
    },

    clickLogout: () => {
        cy.get(logoutLink).click()
    }

}