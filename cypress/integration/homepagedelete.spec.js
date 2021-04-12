/// <reference types="cypress" />

context('Home page full wypas', () => {

    const username = getRandomString()
    const password = getRandomString()
    const firstName = getRandomString()
    const lastName = getRandomString()

    before(() => {
        cy.register(firstName, lastName, username, password)
    })

    beforeEach(() => {
        cy.login(username, password)
        cy.visit('/')
    })

    it('Should delete user', () => {
        cy.get('li').contains(firstName).find('.delete').click()
        cy.get('li').contains(firstName).should('not.exist')
    })

    function getRandomString() {
        return Math.random().toString(36).substring(7)
    }

})
