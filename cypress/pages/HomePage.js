export default class HomePage {

    header = 'h1'
    userRow = 'ul li'
    editLink = '.edit'

    verifyWelcomeMessage(firstName) {
        cy.get(this.header).should('contain.text', `Hi ${firstName}`)
    }

    editUser(firstName, lastName) {
        cy.get(this.userRow).contains(`${firstName} ${lastName}`).find(this.editLink).click()
    }

    verifyUserDoesNotDisplayed(firstName, lastName) {
        cy.get(this.userRow).contains(`${firstName} ${lastName}`).should('not.exist')
    }

    verifyUserDisplayed(firstName, lastName) {
        cy.get(this.userRow).contains(`${firstName} ${lastName}`).should('be.visible')
    }

}