/// <reference types="cypress" />

context('Home page', () => {


    const firstName = getRandomString()
    const lastName = getRandomString()
    const username = getRandomString()
    const password = getRandomString()

    let id

    beforeEach(() => {
        cy.login(username, password)
        cy.visit('/')
    })

    before(() => {
        cy.register(firstName, lastName, username, password).then((userId) => {
            id = userId
        })
    })

    after(() => {
        cy.deleteUser(id)
    })

    it('should display homepage', () => {
        cy.get('ul li').should('have.length.above', 0)
    })

    function getRandomString() {
        return Math.random().toString(36).substring(7)
    }

})
