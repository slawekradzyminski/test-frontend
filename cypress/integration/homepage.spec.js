/// <reference types="cypress" />

context('Login', () => {

    const getRandomString = () => {
        return Math.random().toString(36).substring(7)
    }

    const username = getRandomString()
    const password = getRandomString()
    const firstName = getRandomString()
    const lastName = getRandomString()
    let userId

    before(() => {
        cy.register(username, password, firstName, lastName).then((id) => {
            userId = id
        })
    })

    beforeEach(() => {
        cy.login(username, password)
        cy.visit('/')
    })

    it('should display homepage', () => {
        cy.get('ul li').should('have.length.above', 0)
    })

    after(() => {
        cy.deleteUser(userId)
    })

})
